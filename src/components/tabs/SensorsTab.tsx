import React from 'react';
import { SystemTelemetry, ReceiverNode } from '../../types/farm';
import { Droplets, Thermometer, CloudRain, Wind, Activity, RefreshCw } from 'lucide-react';

interface SensorsTabProps {
  telemetry: SystemTelemetry;
  receivers: ReceiverNode[];
  onSimulateRain: () => void;
  onRefreshSensors: () => void;
}

export const SensorsTab: React.FC<SensorsTabProps> = ({
  telemetry,
  receivers,
  onSimulateRain,
  onRefreshSensors,
}) => {
  const fieldAAverage = (
    receivers.filter((r) => r.channel === 1).reduce((acc, r) => acc + r.moisture, 0) / 4
  ).toFixed(1);

  const fieldBAverage = (
    receivers.filter((r) => r.channel === 2).reduce((acc, r) => acc + r.moisture, 0) / 4
  ).toFixed(1);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-5 lg:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono">
            Telemetry Station
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Farm Sensors &amp; Microclimate</h2>
          <p className="text-sm text-slate-500">
            Live readings transmitted wirelessly from field capacitive probes and weather modules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSimulateRain}
            className="px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold flex items-center gap-1.5 transition-all border border-sky-200 cursor-pointer"
            title="Simulate optical rain detection to test lockout"
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>{telemetry.rainStatus === 'Dry' ? 'Simulate Rain Event' : 'Clear Rain Event'}</span>
          </button>
          <button
            onClick={onRefreshSensors}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-all cursor-pointer"
            title="Poll Sensors Now"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Primary Sensor Cards matching prototype */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Sensor 1: Soil Moisture Probes */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-all">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono uppercase">Capacitive Probes</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                OPTIMAL
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900 font-mono">{telemetry.soilMoistureAvg}%</span>
              <span className="text-xs text-slate-500 font-medium">Avg Across 8 Zones</span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Ideal loam balance. Zone A1 is currently at 28% and actively receiving water to reach 45%.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Field A Average:</span>
              <span className="font-bold text-slate-800 font-mono">{fieldAAverage}%</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Field B Average:</span>
              <span className="font-bold text-slate-800 font-mono">{fieldBAverage}%</span>
            </div>
          </div>
        </div>

        {/* Sensor 2: Temperature Sensor */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-amber-300 transition-all">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono uppercase">Ambient Temp</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                NORMAL
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900 font-mono">{telemetry.temperatureC}°C</span>
              <span className="text-xs text-slate-500 font-medium">Field Ambient</span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Air temperature is moderate. Evaporation rate is standard; no heat stress warning for seedlings.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Today's High:</span>
              <span className="font-bold text-slate-800 font-mono">{telemetry.tempPeakC}°C (13:30)</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Today's Low:</span>
              <span className="font-bold text-slate-800 font-mono">19°C (05:15)</span>
            </div>
          </div>
        </div>

        {/* Sensor 3: Humidity Sensor */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-sky-300 transition-all">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono uppercase">Air Humidity</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                NORMAL
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900 font-mono">{telemetry.humidityRh}%</span>
              <span className="text-xs text-slate-500 font-medium">Relative Humidity</span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Healthy air moisture. Prevents excessive transpiration from foliage while keeping fungal risk low.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Dew Point:</span>
              <span className="font-bold text-slate-800 font-mono">21.8°C</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Sensor Probe:</span>
              <span className="font-mono text-slate-800 font-medium">SHT31 (OK)</span>
            </div>
          </div>
        </div>

        {/* Sensor 4: Optical Rain Sensor */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-sky-300 transition-all">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono uppercase">Optical Rain</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  telemetry.rainStatus === 'Dry'
                    ? 'bg-sky-100 text-sky-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {telemetry.rainStatus.toUpperCase()}
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-emerald-700 font-mono">
                {telemetry.rainAmountMm.toFixed(1)} mm
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {telemetry.rainStatus === 'Dry' ? 'No Rain Detected' : 'Rain Detected (Lockout)'}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {telemetry.rainStatus === 'Dry'
                ? 'Optical sensor glass is clear and dry. Irrigation logic is permitted to run without rain lockout.'
                : 'Rain detected! Irrigation routines are automatically locked out to conserve water.'}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Rain Lockout:</span>
              <span
                className={`font-bold ${
                  telemetry.rainStatus === 'Dry' ? 'text-emerald-700' : 'text-amber-700'
                }`}
              >
                {telemetry.rainStatus === 'Dry' ? 'INACTIVE (Clear)' : 'ACTIVE (Locked Out)'}
              </span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Forecast:</span>
              <span className="text-slate-800 font-medium">Sunny / Clear Skies</span>
            </div>
          </div>
        </div>
      </div>

      {/* Individual Node Probe Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Individual Field Capacitive Probes (8 Locations)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-mono uppercase">
                <th className="py-2.5 px-3">Node / Zone</th>
                <th className="py-2.5 px-3">Crop Type</th>
                <th className="py-2.5 px-3">Root Depth (15cm)</th>
                <th className="py-2.5 px-3">Subsoil (30cm)</th>
                <th className="py-2.5 px-3">Effective VWC</th>
                <th className="py-2.5 px-3">State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {receivers.map((r) => {
                const isWatering = r.active;
                return (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-800">
                      CH{r.channel}-{r.code} ({r.parcel})
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">{r.crop}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-700">{r.moisture}% VWC</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">{r.moisture + 4}% VWC</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{r.moisture}%</td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          isWatering
                            ? 'bg-emerald-100 text-emerald-800'
                            : r.moisture < 35
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {isWatering ? 'WATERING' : r.moisture < 35 ? 'DRY' : 'OPTIMAL'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
