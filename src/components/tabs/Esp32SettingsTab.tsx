import React, { useState } from 'react';
import { SystemMode, ReceiverNode } from '../../types/farm';
import { Cpu, Radio, RotateCcw, Download, Terminal, CheckCircle2 } from 'lucide-react';

interface Esp32SettingsTabProps {
  systemMode: SystemMode;
  onToggleSystemMode: () => void;
  onRebootGateway: () => void;
  receivers: ReceiverNode[];
}

export const Esp32SettingsTab: React.FC<Esp32SettingsTabProps> = ({
  systemMode,
  onToggleSystemMode,
  onRebootGateway,
  receivers,
}) => {
  const [rebooting, setRebooting] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([
    '[BOOT] ESP32-WROOM-32D Dual-Core 240MHz initialized',
    '[RADIO] SX1278 Sub-GHz LoRa frontend locked on CH1=433.92MHz CH2=433.42MHz',
    '[ADC] 8x Capacitive soil moisture channels calibrated (0-3.3V)',
    '[PUMP] 5HP Submersible Contactor interlock armed (Relay Pin D22)',
    '[READY] Gateway running loop @ 100Hz with zero packet loss',
  ]);

  const handleReboot = () => {
    setRebooting(true);
    onRebootGateway();
    setConsoleOutput((prev) => [
      ...prev,
      `[CMD] Soft reboot signal transmitted at ${new Date().toLocaleTimeString()}`,
      `[BOOT] ESP32 self-test passed: 8/8 receivers re-synchronized`,
    ]);
    setTimeout(() => setRebooting(false), 1200);
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(receivers, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `agrilink-farm-nodes-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-5 lg:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono">
            Hardware Diagnostics
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">ESP32 Settings &amp; Configuration</h2>
          <p className="text-sm text-slate-500">
            Firmware status, channel frequencies, and operational mode management.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportData}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Download field telemetry as JSON"
          >
            <Download className="w-4 h-4" />
            <span>Export Configuration</span>
          </button>
          <button
            onClick={handleReboot}
            disabled={rebooting}
            className={`px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5 transition-all border border-rose-200 cursor-pointer ${
              rebooting ? 'opacity-50 animate-pulse' : ''
            }`}
          >
            <RotateCcw className={`w-4 h-4 ${rebooting ? 'animate-spin' : ''}`} />
            <span>{rebooting ? 'Rebooting...' : 'Restart Gateway'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hub Status matching prototype */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base pb-2 border-b border-slate-100 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-700" />
            <span>Master Controller Status</span>
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Device Status:</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                ESP32 Master Hub Online
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Firmware Version:</span>
              <span className="font-mono font-bold text-slate-800">v2.4 (Production Build)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">System Uptime:</span>
              <span className="font-bold text-slate-800">19 Days, 4 Hours</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Microcontroller:</span>
              <span className="font-mono text-slate-800">ESP32 Dual-Core Tensilica Xtensa @ 240MHz</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Connected Sensors:</span>
              <span className="font-semibold text-slate-800">
                8 Soil probes, 1 Rain sensor, 1 Temp/Humidity (All OK)
              </span>
            </div>
          </div>
        </div>

        {/* Channel & Receiver Setup matching prototype */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base pb-2 border-b border-slate-100 flex items-center gap-2">
            <Radio className="w-4 h-4 text-sky-600" />
            <span>Radio Channels &amp; Modes</span>
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Channel 1 Frequency:</span>
              <span className="font-mono font-bold text-sky-800">433.92 MHz (Active)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Channel 2 Frequency:</span>
              <span className="font-mono font-bold text-amber-800">433.42 MHz (Active)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Paired Receivers:</span>
              <span className="font-bold text-slate-800">8 Paired Wireless Field Nodes</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Modulation &amp; Power:</span>
              <span className="font-mono text-slate-800">FSK / OOK Pulse Latch (+14 dBm)</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500">Operation Mode:</span>
              <button
                onClick={onToggleSystemMode}
                className={`px-2.5 py-1 rounded font-bold cursor-pointer transition-all ${
                  systemMode === 'auto'
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                }`}
                title="Click to toggle system mode"
              >
                {systemMode === 'auto' ? 'Automatic (Heuristic)' : 'Manual Operator Override'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Live Diagnostics Box */}
      <div className="bg-slate-900 rounded-2xl p-5 shadow-xs text-xs font-mono space-y-2 border border-slate-800">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 font-bold">UART Telemetry Serial Console</span>
          </div>
          <span className="text-[11px] text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            115200 BAUD LIVE
          </span>
        </div>
        <div className="space-y-1 text-slate-300 max-h-40 overflow-y-auto custom-scrollbar pt-1">
          {consoleOutput.map((line, idx) => (
            <div key={idx} className="leading-relaxed">
              <span className="text-emerald-400 select-none mr-1">$</span>
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
