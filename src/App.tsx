import React, { useState, useEffect } from 'react';
import { SystemMode, ReceiverNode, SystemTelemetry, FarmAlert, AutomationConfig } from './types/farm';
import {
  INITIAL_RECEIVERS,
  INITIAL_TELEMETRY,
  INITIAL_ALERTS,
  INITIAL_AUTOMATION_CONFIG,
} from './data/initialData';
import { Header } from './components/Header';
import { Sidebar, TabId } from './components/Sidebar';
import { Toast, ToastMessage } from './components/Toast';
import { EmergencyModal } from './components/EmergencyModal';

// Tabs
import { OverviewTab } from './components/tabs/OverviewTab';
import { IrrigationControlTab } from './components/tabs/IrrigationControlTab';
import { FieldZonesTab } from './components/tabs/FieldZonesTab';
import { SensorsTab } from './components/tabs/SensorsTab';
import { AutomationTab } from './components/tabs/AutomationTab';
import { SolarPowerTab } from './components/tabs/SolarPowerTab';
import { WirelessNetworkTab } from './components/tabs/WirelessNetworkTab';
import { SystemAlertsTab } from './components/tabs/SystemAlertsTab';
import { Esp32SettingsTab } from './components/tabs/Esp32SettingsTab';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabId>('overview');
  const [systemMode, setSystemMode] = useState<SystemMode>('auto');
  const [receivers, setReceivers] = useState<ReceiverNode[]>(INITIAL_RECEIVERS);
  const [telemetry, setTelemetry] = useState<SystemTelemetry>(INITIAL_TELEMETRY);
  const [alerts, setAlerts] = useState<FarmAlert[]>(INITIAL_ALERTS);
  const [automationConfig, setAutomationConfig] = useState<AutomationConfig>(INITIAL_AUTOMATION_CONFIG);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-dismiss toast helper
  const showToast = (text: string, type: 'success' | 'warning' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, text, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Recalculate average moisture and pump status whenever receivers change
  useEffect(() => {
    const activeCount = receivers.filter((r) => r.active).length;
    const avgMoisture = Math.round(
      receivers.reduce((sum, r) => sum + r.moisture, 0) / receivers.length
    );

    setTelemetry((prev) => ({
      ...prev,
      soilMoistureAvg: avgMoisture,
      pumpStatus: activeCount > 0 ? 'Running' : 'Standby',
      pumpPressureBar: activeCount > 0 ? 2.8 : 0.4,
    }));
  }, [receivers]);

  // Handle single receiver toggle
  const handleToggleReceiver = (id: string, active: boolean) => {
    const target = receivers.find((r) => r.id === id);
    if (!target) return;

    setReceivers((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return {
            ...r,
            active,
            flowRateLpm: active ? (r.method === 'Drip' ? 22.4 : 28.6) : 0,
            lastWateredTime: active ? 'Now (Active)' : 'Just closed',
            wateringMinutesToday: active ? r.wateringMinutesToday + 1 : r.wateringMinutesToday,
          };
        }
        return r;
      })
    );

    if (active) {
      showToast(`${target.name} turned ON (Watering)`, 'success');
    } else {
      showToast(`${target.name} turned OFF (Closed)`, 'info');
    }
  };

  // Handle toggle channel
  const handleToggleChannel = (channel: 1 | 2, active: boolean) => {
    setReceivers((prev) =>
      prev.map((r) => {
        if (r.channel === channel) {
          return {
            ...r,
            active,
            flowRateLpm: active ? (r.method === 'Drip' ? 22.4 : 28.6) : 0,
          };
        }
        return r;
      })
    );

    showToast(
      `Channel ${channel === 1 ? '1 (Field A)' : '2 (Field B)'} - all valves set to ${
        active ? 'ON' : 'OFF'
      }`,
      active ? 'success' : 'info'
    );
  };

  // Emergency stop
  const handleEmergencyStop = () => {
    setReceivers((prev) =>
      prev.map((r) => ({
        ...r,
        active: false,
        flowRateLpm: 0,
      }))
    );

    const newAlert: FarmAlert = {
      id: `alt-${Date.now()}`,
      title: 'EMERGENCY STOP EXECUTED',
      description: 'Operator triggered instant emergency stop. All 8 valves closed, pump placed on standby.',
      timestamp: 'Just now',
      severity: 'critical',
      resolved: false,
    };

    setAlerts((prev) => [newAlert, ...prev]);
    showToast('EMERGENCY STOP EXECUTED: All 8 valves closed', 'warning');
  };

  // Change system mode
  const handleSetSystemMode = (mode: SystemMode) => {
    setSystemMode(mode);
    if (mode === 'auto') {
      showToast('System set to Automatic Heuristic Control', 'success');
    } else {
      showToast('System set to Manual Operator Override', 'info');
    }
  };

  // Presets
  const handleRunPresetDrip = () => {
    setReceivers((prev) =>
      prev.map((r) => {
        if (r.method === 'Drip') {
          return { ...r, active: true, flowRateLpm: 22.4 };
        }
        return r;
      })
    );
    showToast('Preset Active: 4 Drip lines running for 15 minutes', 'success');
  };

  const handleRunPresetSprinklers = () => {
    setReceivers((prev) =>
      prev.map((r) => {
        if (r.method === 'Sprinkler') {
          return { ...r, active: true, flowRateLpm: 28.6 };
        }
        return r;
      })
    );
    showToast('Preset Active: 4 Sprinklers running for 10 minutes', 'success');
  };

  // Simulate rain event
  const handleSimulateRain = () => {
    if (telemetry.rainStatus === 'Dry') {
      setTelemetry((prev) => ({
        ...prev,
        rainStatus: 'Raining',
        rainAmountMm: 4.6,
      }));

      // In auto mode, rain locks out valves
      if (systemMode === 'auto') {
        setReceivers((prev) =>
          prev.map((r) => ({
            ...r,
            active: false,
            flowRateLpm: 0,
          }))
        );
      }

      const rainAlert: FarmAlert = {
        id: `alt-${Date.now()}`,
        title: 'Rain Lockout Triggered',
        description: 'Optical rain sensor detected 4.6 mm precipitation. Active watering cycles paused.',
        timestamp: 'Just now',
        severity: 'warning',
        resolved: false,
      };
      setAlerts((prev) => [rainAlert, ...prev]);
      showToast('Rain Sensor Triggered (4.6 mm) — Irrigation Locked Out', 'warning');
    } else {
      setTelemetry((prev) => ({
        ...prev,
        rainStatus: 'Dry',
        rainAmountMm: 0.0,
      }));
      showToast('Rain Sensor Cleared (0.0 mm) — Irrigation Lockout Lifted', 'success');
    }
  };

  // Poll sensor data refresh
  const handleRefreshData = () => {
    showToast('All 8 sensors polled: 42% avg soil moisture (Optimal)', 'success');
  };

  // Ping node test
  const handlePingNode = (id: string) => {
    const node = receivers.find((r) => r.id === id);
    showToast(
      `Receiver ${node ? node.name : id} ACK: ${node?.rssi || -75} dBm (Latency 14ms)`,
      'success'
    );
  };

  // Reboot gateway
  const handleRebootGateway = () => {
    showToast('ESP32 Master Gateway successfully rebooted & synchronized', 'success');
  };

  // Alert actions
  const handleToggleResolveAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, resolved: !a.resolved } : a))
    );
    showToast('Alert status updated', 'info');
  };

  const handleClearResolvedAlerts = () => {
    setAlerts((prev) => prev.filter((a) => !a.resolved));
    showToast('Resolved alerts cleared', 'info');
  };

  const handleAddTestAlert = () => {
    const newAlert: FarmAlert = {
      id: `alt-${Date.now()}`,
      title: 'Diagnostic Field Node Check',
      description: 'Routine automated telemetry self-test completed with 100% signal parity.',
      timestamp: 'Just now',
      severity: 'info',
      resolved: false,
    };
    setAlerts((prev) => [newAlert, ...prev]);
    showToast('Diagnostic alert generated', 'info');
  };

  const activeValvesCount = receivers.filter((r) => r.active).length;
  const unresolvedAlertCount = alerts.filter((a) => !a.resolved).length;

  return (
    <div className="text-slate-800 antialiased min-h-screen flex flex-col bg-[#f8faf9]">
      {/* Top Header */}
      <Header
        systemMode={systemMode}
        onSetSystemMode={handleSetSystemMode}
        onEmergencyStop={() => setEmergencyModalOpen(true)}
        telemetry={telemetry}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Main Layout Container */}
      <div className="flex flex-1 pt-16">
        {/* Left Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          unresolvedAlertCount={unresolvedAlertCount}
          mobileMenuOpen={mobileMenuOpen}
          onCloseMobileMenu={() => setMobileMenuOpen(false)}
          activeValvesCount={activeValvesCount}
        />

        {/* Content Viewport */}
        <main className="flex-1 ml-0 lg:ml-60 p-4 lg:p-8 min-h-[calc(100vh-64px)] overflow-x-hidden">
          {currentTab === 'overview' && (
            <OverviewTab
              receivers={receivers}
              telemetry={telemetry}
              onNavigateTab={setCurrentTab}
              onToggleReceiver={handleToggleReceiver}
              onRefreshData={handleRefreshData}
            />
          )}

          {currentTab === 'irrigation-control' && (
            <IrrigationControlTab
              receivers={receivers}
              onToggleReceiver={handleToggleReceiver}
              onToggleChannel={handleToggleChannel}
              onEmergencyStop={() => setEmergencyModalOpen(true)}
            />
          )}

          {currentTab === 'field-zones' && (
            <FieldZonesTab receivers={receivers} onToggleReceiver={handleToggleReceiver} />
          )}

          {currentTab === 'sensors' && (
            <SensorsTab
              telemetry={telemetry}
              receivers={receivers}
              onSimulateRain={handleSimulateRain}
              onRefreshSensors={handleRefreshData}
            />
          )}

          {currentTab === 'automation' && (
            <AutomationTab
              systemMode={systemMode}
              onSetSystemMode={handleSetSystemMode}
              config={automationConfig}
              onUpdateConfig={setAutomationConfig}
              onRunPresetDrip={handleRunPresetDrip}
              onRunPresetSprinklers={handleRunPresetSprinklers}
              onEmergencyStop={() => setEmergencyModalOpen(true)}
            />
          )}

          {currentTab === 'solar-power' && <SolarPowerTab telemetry={telemetry} />}

          {currentTab === 'wireless-network' && (
            <WirelessNetworkTab receivers={receivers} onPingNode={handlePingNode} />
          )}

          {currentTab === 'alerts' && (
            <SystemAlertsTab
              alerts={alerts}
              onToggleResolve={handleToggleResolveAlert}
              onClearResolved={handleClearResolvedAlerts}
              onAddTestAlert={handleAddTestAlert}
            />
          )}

          {currentTab === 'settings' && (
            <Esp32SettingsTab
              systemMode={systemMode}
              onToggleSystemMode={() =>
                handleSetSystemMode(systemMode === 'auto' ? 'manual' : 'auto')
              }
              onRebootGateway={handleRebootGateway}
              receivers={receivers}
            />
          )}
        </main>
      </div>

      {/* Footer matching prototype */}
      <footer className="ml-0 lg:ml-60 bg-white border-t border-slate-200 py-4 px-6 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>
          <span className="font-bold text-slate-700">AgriLink</span> — Smart irrigation made simple for
          farmers. Less water, less effort.
        </div>
        <div className="font-mono text-[11px] text-slate-400">
          ESP32 • LoRa • 433 MHz RF • Solar LiFePO4
        </div>
      </footer>

      {/* Floating Action Feedback Toast */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />

      {/* Emergency Stop Confirmation Modal */}
      <EmergencyModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
        onConfirmHalt={handleEmergencyStop}
        activeValvesCount={activeValvesCount}
      />
    </div>
  );
}
