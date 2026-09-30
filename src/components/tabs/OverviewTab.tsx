import React, { useState } from 'react';
import { ReceiverNode, SystemTelemetry } from '../../types/farm';
import { TabId } from '../Sidebar';
import {
  RotateCw,
  Sliders,
  Check,
  Droplet,
  Thermometer,
  CloudRain,
  Sun,
  Fan,
  Radio,
  Share2,
  TrendingUp,
} from 'lucide-react';

interface OverviewTabProps {
  receivers: ReceiverNode[];
  telemetry: SystemTelemetry;
  onNavigateTab: (tab: TabId) => void;
  onToggleReceiver: (id: string, active: boolean) => void;
  onRefreshData: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  receivers,
  telemetry,
  onNavigateTab,
  onToggleReceiver,
  onRefreshData,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<{
    time: string;
    moisture: number;
    pulse?: string;
  } | null>(null);

  const activeValves = receivers.filter((r) => r.active);
  const ch1Receivers = receivers.filter((r) => r.channel === 1);
  const ch2Receivers = receivers.filter((r) => r.channel === 2);

  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefreshData();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const graphPoints = [
    { x: 0, y: 60, time: '00:00 (Midnight)', moisture: 44 },
    { x: 150, y: 82, time: '06:00 (Morning Pulse)', moisture: 33, pulse: 'Drip & Sprinkler (15m)' },
    { x: 300, y: 50, time: '12:00 (Noon Peak Sun)', moisture: 48 },
    { x: 450, y: 78, time: '18:00 (Evening Pulse)', moisture: 34, pulse: 'Sprinkler Pulse (15m)' },
    { x: 600, y: 48, time: 'Now (Live)', moisture: 42 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Welcoming Top Banner matching screenshot */}
      <div className="bg-white rounded-2xl p-5 lg:p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono">
              Today's Farm Status
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
              {activeValves.length} {activeValves.length === 1 ? 'Valve' : 'Valves'} Currently Watering
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Green Valley 2.0-Acre Overview</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Automated soil moisture balance and active RF wireless irrigation pipeline.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('irrigation-control')}
            className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Sliders className="w-4 h-4" />
            <span>Manage Valves</span>
          </button>
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-all cursor-pointer ${
              isRefreshing ? 'animate-spin text-emerald-700' : ''
            }`}
            title="Refresh Live Field Data"
            aria-label="Refresh Live Data"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 7 Clean Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3.5">
        {/* Card 1: Soil Moisture */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Soil Moisture</span>
            <Droplet className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-bold text-slate-900 font-mono">{telemetry.soilMoistureAvg}%</span>
            <span className="text-xs text-emerald-600 font-semibold block mt-0.5">Good (Loam band)</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${telemetry.soilMoistureAvg}%` }}
            />
          </div>
        </div>

        {/* Card 2: Temperature */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Temperature</span>
            <Thermometer className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-bold text-slate-900 font-mono">{telemetry.temperatureC}°C</span>
            <span className="text-xs text-slate-500 font-medium block mt-0.5">
              Normal (Peak: {telemetry.tempPeakC}°)
            </span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: '55%' }}
            />
          </div>
        </div>

        {/* Card 3: Air Humidity */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Air Humidity</span>
            <span className="material-symbols-outlined text-[18px] text-sky-500">humidity_mid</span>
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-bold text-slate-900 font-mono">{telemetry.humidityRh}%</span>
            <span className="text-xs text-sky-600 font-medium block mt-0.5">Normal RH</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-sky-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${telemetry.humidityRh}%` }}
            />
          </div>
        </div>

        {/* Card 4: Rain Sensor */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Rain Sensor</span>
            <Sun className="w-4 h-4 text-sky-600" />
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-bold text-emerald-700">{telemetry.rainStatus}</span>
            <span className="text-xs text-slate-500 font-medium block mt-0.5">
              {telemetry.rainAmountMm.toFixed(1)} mm (No Rain)
            </span>
          </div>
          <div className="flex items-center gap-1 mt-3 text-[11px] text-emerald-600 font-medium">
            <Check className="w-3.5 h-3.5" /> Solar ok
          </div>
        </div>

        {/* Card 5: Solar Battery */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Solar Battery</span>
            <span className="material-symbols-outlined text-[18px] text-amber-500">solar_power</span>
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-bold text-slate-900 font-mono">{telemetry.solarBatteryPct}%</span>
            <span className="text-xs text-amber-600 font-semibold block mt-0.5">
              Charging (+{telemetry.solarCurrentAmps}A)
            </span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${telemetry.solarBatteryPct}%` }}
            />
          </div>
        </div>

        {/* Card 6: Pump Station */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pump Station</span>
            <span
              className={`material-symbols-outlined text-[18px] text-emerald-600 ${
                telemetry.pumpStatus === 'Running' ? 'animate-spin' : ''
              }`}
            >
              cyclone
            </span>
          </div>
          <div className="mt-2.5">
            <span
              className={`text-2xl font-bold ${
                telemetry.pumpStatus === 'Running' ? 'text-emerald-700' : 'text-slate-600'
              }`}
            >
              {telemetry.pumpStatus}
            </span>
            <span className="text-xs text-slate-500 font-medium block mt-0.5">5HP Submersible</span>
          </div>
          <div className="flex items-center gap-1 mt-3 text-[11px] text-slate-500 font-mono font-medium">
            <span>{telemetry.pumpPressureBar} Bar Stable</span>
          </div>
        </div>

        {/* Card 7: Wireless RF */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all col-span-2 md:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Wireless RF</span>
            <Radio className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-bold text-emerald-700">Active</span>
            <span className="text-xs text-slate-500 font-medium block mt-0.5">
              {telemetry.wirelessConnectedCount}/{telemetry.wirelessTotalCount} Connected
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-3 text-[11px] text-emerald-600 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 433 MHz OK
          </div>
        </div>
      </div>

      {/* FARM SUMMARY HIERARCHY TREE DIAGRAM matching screenshot */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-700">account_tree</span>
              <span>Farm Summary: 2-Acre Architecture Tree</span>
            </h2>
            <p className="text-xs text-slate-500">
              Clear overview of all 8 field receivers divided across Channel 1 and Channel 2
            </p>
          </div>
          <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-mono text-xs font-semibold">
            2.0 ACRES TOTAL
          </span>
        </div>

        {/* Clean Tree Layout Card matching screenshot */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-mono text-xs md:text-sm text-slate-800 overflow-x-auto leading-relaxed">
          <div className="font-bold text-emerald-950 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block"></span>
            <span>2-ACRE FARM (Green Valley Master Gateway)</span>
          </div>

          {/* Branch Channel 1 */}
          <div className="ml-4 pl-4 border-l-2 border-slate-300 mt-2 space-y-1">
            <div className="font-bold text-sky-900 flex items-center gap-1.5">
              <span>├── CHANNEL 1 (Field A — 1.0 Acre)</span>
              <span className="text-[10px] font-sans font-medium px-2 py-0.2 rounded bg-sky-100 text-sky-700">
                433.92 MHz
              </span>
            </div>
            <div className="ml-6 space-y-1 text-slate-700">
              {ch1Receivers.map((r, i) => {
                const isLast = i === ch1Receivers.length - 1;
                const prefix = isLast ? '└──' : '├──';
                return (
                  <div key={r.id} className="flex items-center gap-2 group">
                    <span className="text-slate-500">│ {prefix}</span>
                    <span className="font-semibold text-slate-800">
                      {r.code} – {r.method.toUpperCase()} ({r.crop.split(' ')[0]})
                    </span>
                    <button
                      onClick={() => onToggleReceiver(r.id, !r.active)}
                      className={`px-1.5 py-0.2 rounded font-bold text-[10px] cursor-pointer transition-all ${
                        r.active
                          ? 'bg-emerald-100 text-emerald-800 animate-pulse hover:bg-emerald-200'
                          : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                      }`}
                      title={`Click to ${r.active ? 'turn OFF' : 'turn ON'} valve`}
                    >
                      {r.active ? '● ACTIVE / ON' : 'STANDBY / OFF'}
                    </button>
                    <span className="text-[11px] text-slate-400 font-sans">({r.moisture}% VWC)</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Branch Channel 2 */}
          <div className="ml-4 pl-4 border-l-2 border-slate-300 mt-3 space-y-1">
            <div className="font-bold text-amber-900 flex items-center gap-1.5">
              <span>└── CHANNEL 2 (Field B — 1.0 Acre)</span>
              <span className="text-[10px] font-sans font-medium px-2 py-0.2 rounded bg-amber-100 text-amber-800">
                433.42 MHz
              </span>
            </div>
            <div className="ml-6 space-y-1 text-slate-700">
              {ch2Receivers.map((r, i) => {
                const isLast = i === ch2Receivers.length - 1;
                const prefix = isLast ? '└──' : '├──';
                return (
                  <div key={r.id} className="flex items-center gap-2 group">
                    <span className="text-slate-500">{prefix}</span>
                    <span className="font-semibold text-slate-800">
                      {r.code} – {r.method.toUpperCase()} ({r.crop.split(' ')[0]})
                    </span>
                    <button
                      onClick={() => onToggleReceiver(r.id, !r.active)}
                      className={`px-1.5 py-0.2 rounded font-bold text-[10px] cursor-pointer transition-all ${
                        r.active
                          ? 'bg-emerald-100 text-emerald-800 animate-pulse hover:bg-emerald-200'
                          : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                      }`}
                      title={`Click to ${r.active ? 'turn OFF' : 'turn ON'} valve`}
                    >
                      {r.active ? '● ACTIVE / ON' : 'STANDBY / OFF'}
                    </button>
                    <span className="text-[11px] text-slate-400 font-sans">({r.moisture}% VWC)</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* LINE GRAPH: SOIL MOISTURE OVER TIME & WATERING ACTIVITY */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600">show_chart</span>
              <span>24-Hour Soil Moisture Trend &amp; Watering Activity Pulses</span>
            </h3>
            <p className="text-xs text-slate-500">Green shaded band indicates optimal crop moisture (35% - 55%)</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-emerald-100 border border-emerald-300"></span> Optimal Zone
              (35-55%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-emerald-700"></span> Moisture %
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span> Watering Pulse
            </span>
          </div>
        </div>

        {/* Clean SVG Graph */}
        <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 relative">
          {hoveredPoint && (
            <div className="absolute top-2 right-4 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-md z-10 font-mono">
              <span className="text-emerald-400 font-bold">{hoveredPoint.moisture}% VWC</span> at{' '}
              {hoveredPoint.time}
              {hoveredPoint.pulse && (
                <span className="block text-[11px] text-sky-300 font-sans">
                  Active Pulse: {hoveredPoint.pulse}
                </span>
              )}
            </div>
          )}

          <svg className="w-full h-36" preserveAspectRatio="none" viewBox="0 0 600 130">
            {/* Optimal Band Rectangle (35% to 55%) */}
            <rect fill="#ecfdf5" height="50" opacity="0.9" width="600" x="0" y="35" />
            <line stroke="#a7f3d0" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="600" y1="35" y2="35" />
            <line stroke="#a7f3d0" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="600" y1="85" y2="85" />
            {/* Subtle Grid lines */}
            <line stroke="#e2e8f0" strokeWidth="1" x1="0" x2="600" y1="110" y2="110" />

            {/* Watering Activity Bars / Pulses */}
            {/* Morning watering 06:00 */}
            <rect fill="#bae6fd" height="65" opacity="0.8" rx="3" width="12" x="145" y="45" />
            <circle cx="151" cy="45" fill="#0284c7" r="4" />

            {/* Afternoon watering 17:30 */}
            <rect fill="#bae6fd" height="70" opacity="0.8" rx="3" width="12" x="445" y="40" />
            <circle cx="451" cy="40" fill="#0284c7" r="4" />

            {/* Moisture Curve Path */}
            <path
              d="M0,60 Q75,55 150,82 T300,50 T450,78 T600,48"
              fill="none"
              stroke="#155e38"
              strokeLinecap="round"
              strokeWidth="3"
            />

            {/* Interactive Data points */}
            {graphPoints.map((pt, i) => (
              <g
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <circle cx={pt.x} cy={pt.y} fill="#155e38" r={i === 4 ? 4.5 : 3.5} />
                <circle cx={pt.x} cy={pt.y} fill="transparent" r="14" />
              </g>
            ))}
          </svg>

          {/* Time Labels matching screenshot */}
          <div className="flex justify-between font-mono text-[11px] text-slate-500 mt-2 px-1 overflow-x-auto">
            <span>00:00 (Midnight)</span>
            <span>06:00 (Morning Pulse)</span>
            <span>12:00 (Noon Peak Sun)</span>
            <span>18:00 (Evening Pulse)</span>
            <span>Now ({telemetry.soilMoistureAvg}% Balanced)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
