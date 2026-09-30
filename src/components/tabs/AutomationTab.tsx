import React from 'react';
import { SystemMode, AutomationConfig } from '../../types/farm';
import { Bot, SlidersHorizontal, Brain, Timer, StopCircle, Clock, Check, Sparkles } from 'lucide-react';

interface AutomationTabProps {
  systemMode: SystemMode;
  onSetSystemMode: (mode: SystemMode) => void;
  config: AutomationConfig;
  onUpdateConfig: (newConfig: AutomationConfig) => void;
  onRunPresetDrip: () => void;
  onRunPresetSprinklers: () => void;
  onEmergencyStop: () => void;
}

export const AutomationTab: React.FC<AutomationTabProps> = ({
  systemMode,
  onSetSystemMode,
  config,
  onUpdateConfig,
  onRunPresetDrip,
  onRunPresetSprinklers,
  onEmergencyStop,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-5 lg:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono">
            Smart Decision Engine
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Irrigation Rules &amp; Overrides</h2>
          <p className="text-sm text-slate-500">
            Configure automated watering thresholds or execute immediate manual field presets.
          </p>
        </div>

        {/* Mode Switcher matching prototype */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => onSetSystemMode('auto')}
            className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              systemMode === 'auto'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>AUTO MODE</span>
          </button>
          <button
            onClick={() => onSetSystemMode('manual')}
            className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              systemMode === 'manual'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>MANUAL OVERRIDE</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AUTO MODE CARD matching prototype */}
        <div className="bg-white rounded-2xl p-6 border-2 border-emerald-500/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Smart Autonomous Rule</h3>
                <p className="text-xs text-emerald-700 font-semibold">
                  {systemMode === 'auto' ? 'Active & Monitoring' : 'Suspended in Manual Mode'}
                </p>
              </div>
            </div>
            <span
              className={`w-3 h-3 rounded-full ${
                systemMode === 'auto' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'
              }`}
            />
          </div>

          {/* Plain English Rule Statement */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-slate-800 text-sm leading-relaxed">
            <p className="font-medium text-emerald-950">
              "The system automatically waters when soil moisture drops below{' '}
              <strong className="text-emerald-800 font-bold">{config.autoTriggerMoisture}%</strong> and no rain
              is detected. Stops automatically when moisture reaches{' '}
              <strong className="text-emerald-800 font-bold">{config.autoCutoffMoisture}%</strong> or if rain
              begins."
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {/* Lower threshold adjustment */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">Lower Trigger Threshold:</span>
                <span className="font-bold text-rose-600 font-mono">
                  &lt; {config.autoTriggerMoisture}% Soil VWC
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="45"
                value={config.autoTriggerMoisture}
                onChange={(e) =>
                  onUpdateConfig({ ...config, autoTriggerMoisture: Number(e.target.value) })
                }
                className="w-full accent-emerald-700 cursor-pointer"
              />
            </div>

            {/* Upper cutoff adjustment */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">Upper Cutoff Target:</span>
                <span className="font-bold text-emerald-700 font-mono">
                  {config.autoCutoffMoisture}% Soil VWC
                </span>
              </div>
              <input
                type="range"
                min="45"
                max="70"
                value={config.autoCutoffMoisture}
                onChange={(e) =>
                  onUpdateConfig({ ...config, autoCutoffMoisture: Number(e.target.value) })
                }
                className="w-full accent-emerald-700 cursor-pointer"
              />
            </div>

            {/* Rain override */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-600 font-medium">Rain Sensor Override:</span>
              <span className="font-bold text-sky-700 font-mono">Instant Stop if rain &gt; 0.2mm</span>
            </div>
          </div>
        </div>

        {/* MANUAL OVERRIDE CARD & PRESETS matching prototype */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">touch_app</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Manual Presets &amp; Direct Control</h3>
              <p className="text-xs text-slate-500">Run quick routine cycles without adjusting individual valves</p>
            </div>
          </div>

          <p className="text-xs text-slate-600">Select an instant preset for farm-wide operations:</p>

          <div className="space-y-3">
            {/* Preset 1: Drip 15 mins */}
            <button
              onClick={onRunPresetDrip}
              className="w-full p-3.5 rounded-xl border border-sky-200 bg-sky-50/60 hover:bg-sky-100 text-left flex items-center justify-between transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Timer className="w-5 h-5 text-sky-700 shrink-0" />
                <div>
                  <h4 className="font-bold text-xs text-sky-950">Water all Drip Lines for 15 mins</h4>
                  <p className="text-[11px] text-sky-700">Opens R1 &amp; R3 on Channel 1 + R1 &amp; R3 on Channel 2</p>
                </div>
              </div>
              <span className="text-xs font-bold text-sky-800 bg-sky-200/80 px-2 py-1 rounded">START</span>
            </button>

            {/* Preset 2: Sprinklers 10 mins */}
            <button
              onClick={onRunPresetSprinklers}
              className="w-full p-3.5 rounded-xl border border-purple-200 bg-purple-50/60 hover:bg-purple-100 text-left flex items-center justify-between transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Timer className="w-5 h-5 text-purple-700 shrink-0" />
                <div>
                  <h4 className="font-bold text-xs text-purple-950">Water all Sprinklers for 10 mins</h4>
                  <p className="text-[11px] text-purple-700">Opens R2 &amp; R4 on Channel 1 + R2 &amp; R4 on Channel 2</p>
                </div>
              </div>
              <span className="text-xs font-bold text-purple-800 bg-purple-200/80 px-2 py-1 rounded">START</span>
            </button>

            {/* Preset 3: Emergency All Valves OFF */}
            <button
              onClick={onEmergencyStop}
              className="w-full p-3.5 rounded-xl border border-rose-200 bg-rose-50/60 hover:bg-rose-100 text-left flex items-center justify-between transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <StopCircle className="w-5 h-5 text-rose-700 shrink-0" />
                <div>
                  <h4 className="font-bold text-xs text-rose-950">Emergency All Valves OFF</h4>
                  <p className="text-[11px] text-rose-700">Instantly transmits latch-off pulse to all 8 solenoids</p>
                </div>
              </div>
              <span className="text-xs font-bold text-rose-800 bg-rose-200 px-2 py-1 rounded">HALT</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
