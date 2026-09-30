import React from 'react';
import { SystemTelemetry } from '../../types/farm';
import { Sun, BatteryCharging, Cpu, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SolarPowerTabProps {
  telemetry: SystemTelemetry;
}

export const SolarPowerTab: React.FC<SolarPowerTabProps> = ({ telemetry }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-5 lg:p-6 border border-slate-200 shadow-xs">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono">
          Energy Independence
        </span>
        <h2 className="text-2xl font-bold text-slate-900 mt-1">Solar &amp; Power Subsystem</h2>
        <p className="text-sm text-slate-500">
          Autonomous solar charging and LiFePO4 battery storage driving the master controller &amp; solenoids.
        </p>
      </div>

      {/* HORIZONTAL VISUAL POWER FLOW DIAGRAM matching prototype */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>Energy Distribution Chain</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Node 1: Solar Panel */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold text-amber-800 uppercase">Power Source</span>
              <h4 className="font-bold text-slate-900 text-sm mt-1">Solar Panel (100W PV)</h4>
              <p className="text-xs text-amber-900 mt-1 font-medium">18.4V Generation • Bright Sun</p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] text-amber-700 font-semibold">
              <span>Active Generation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Node 2: Battery */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold text-emerald-800 uppercase">Energy Storage</span>
              <h4 className="font-bold text-slate-900 text-sm mt-1">12V LiFePO4 Battery</h4>
              <p className="text-xs text-emerald-900 mt-1 font-medium">
                {telemetry.solarBatteryPct}% Capacity • 13.6V Healthy
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
              <span>Regulated 5V/12V</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Node 3: ESP32 Controller */}
          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold text-sky-800 uppercase">Master Brain</span>
              <h4 className="font-bold text-slate-900 text-sm mt-1">ESP32 Controller</h4>
              <p className="text-xs text-sky-900 mt-1 font-medium">Dual-core 240MHz • 3.3V Logic</p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] text-sky-700 font-semibold">
              <span>Pulse Drivers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Node 4: Field Actuation & Pump */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold text-slate-500 uppercase">Field Loads</span>
              <h4 className="font-bold text-slate-900 text-sm mt-1">Sensors, Valves &amp; 5HP Pump</h4>
              <p className="text-xs text-slate-600 mt-1 font-medium">Bi-stable latch pulses &amp; Contactor</p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
              <span>Operational</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Clean Power Status Cards matching prototype */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 font-mono uppercase">Battery Percentage</span>
          <div className="mt-2 text-2xl font-bold text-slate-900 font-mono">{telemetry.solarBatteryPct}%</div>
          <p className="text-xs text-emerald-600 font-semibold mt-1">13.6V — Healthy LiFePO4</p>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full"
              style={{ width: `${telemetry.solarBatteryPct}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 font-mono uppercase">Charging Status</span>
          <div className="mt-2 text-2xl font-bold text-amber-600 font-mono">Charging</div>
          <p className="text-xs text-slate-600 font-medium mt-1">
            +{telemetry.solarCurrentAmps}A from 100W Solar PV
          </p>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: '82%' }} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 font-mono uppercase">Solar Intensity</span>
          <div className="mt-2 text-2xl font-bold text-slate-900">Active</div>
          <p className="text-xs text-slate-600 font-medium mt-1">Bright Direct Sunlight (840 W/m²)</p>
          <div className="flex items-center gap-1 mt-3 text-xs text-emerald-700 font-semibold">
            <span>PV Voltage: 18.4V</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 font-mono uppercase">Pump Status</span>
          <div
            className={`mt-2 text-2xl font-bold ${
              telemetry.pumpStatus === 'Running' ? 'text-emerald-700' : 'text-slate-600'
            }`}
          >
            {telemetry.pumpStatus}
          </div>
          <p className="text-xs text-slate-600 font-medium mt-1">5HP Submersible (Normal Draw)</p>
          <div className="flex items-center gap-1 mt-3 text-xs text-slate-500 font-mono">
            <span>Pressure: {telemetry.pumpPressureBar} Bar</span>
          </div>
        </div>
      </div>
    </div>
  );
};
