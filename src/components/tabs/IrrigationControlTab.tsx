import React from 'react';
import { ReceiverNode } from '../../types/farm';
import { StopCircle, Droplets, ShowerHead } from 'lucide-react';

interface IrrigationControlTabProps {
  receivers: ReceiverNode[];
  onToggleReceiver: (id: string, active: boolean) => void;
  onToggleChannel: (channel: 1 | 2, active: boolean) => void;
  onEmergencyStop: () => void;
}

export const IrrigationControlTab: React.FC<IrrigationControlTabProps> = ({
  receivers,
  onToggleReceiver,
  onToggleChannel,
  onEmergencyStop,
}) => {
  const ch1Receivers = receivers.filter((r) => r.channel === 1);
  const ch2Receivers = receivers.filter((r) => r.channel === 2);

  const renderValveCard = (r: ReceiverNode) => {
    const isWatering = r.active;

    let moistureLabel = `${r.moisture}% (Good)`;
    if (r.active) {
      moistureLabel = `${r.moisture}% (Watering)`;
    } else if (r.moisture < 35) {
      moistureLabel = `${r.moisture}% (Low)`;
    } else if (r.moisture >= 50) {
      moistureLabel = `${r.moisture}% (Optimal)`;
    }

    return (
      <div
        key={r.id}
        className={`p-4 rounded-xl flex flex-col justify-between transition-all ${
          isWatering
            ? 'border-2 border-emerald-500 bg-emerald-50/40 shadow-xs'
            : 'border border-slate-200 bg-white shadow-xs hover:border-slate-300'
        }`}
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-slate-600">
              RECEIVER {r.index} ({r.code})
            </span>
            <span
              className={`px-2 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1 ${
                r.method === 'Drip' ? 'bg-sky-100 text-sky-800' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {r.method === 'Drip' ? (
                <Droplets className="w-3 h-3 text-sky-600" />
              ) : (
                <ShowerHead className="w-3 h-3 text-purple-600" />
              )}
              {r.method}
            </span>
          </div>

          <h4 className="font-bold text-slate-900 text-base mt-2">{r.name}</h4>

          <div className="mt-2 text-xs flex items-center justify-between">
            <span className="text-slate-500">Moisture:</span>
            <span className={`font-bold ${isWatering ? 'text-emerald-700' : 'text-slate-700'}`}>
              {moistureLabel}
            </span>
          </div>

          {/* Status Badge */}
          <div className="mt-2">
            {isWatering ? (
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>WATERING ACTIVE (ON)</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                <span>STANDBY (OFF)</span>
              </div>
            )}
          </div>

          {/* Telemetry info */}
          <div className="mt-2 text-[11px] text-slate-400 flex justify-between font-mono">
            <span>Flow: {isWatering ? `${r.flowRateLpm} L/m` : '0.0 L/m'}</span>
            <span>RSSI: {r.rssi} dBm</span>
          </div>
        </div>

        {/* Action Toggle Buttons matching prototype */}
        <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center gap-2">
          <button
            onClick={() => onToggleReceiver(r.id, true)}
            className={`flex-1 py-2 rounded-lg font-bold text-xs cursor-pointer transition-all ${
              isWatering
                ? 'bg-emerald-800 text-white shadow-xs hover:bg-emerald-900'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            ON
          </button>
          <button
            onClick={() => onToggleReceiver(r.id, false)}
            className={`flex-1 py-2 rounded-lg font-bold text-xs cursor-pointer transition-all ${
              !isWatering
                ? 'bg-slate-700 text-white shadow-xs hover:bg-slate-800'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            OFF
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Controller Header */}
      <div className="bg-white rounded-2xl p-5 lg:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono">
              Real-Time Wireless Actuation
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Multi-Zone Valve Controller</h2>
          <p className="text-sm text-slate-500">
            Tap any ON / OFF toggle button below to instantly actuate the bi-stable field solenoids.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onEmergencyStop}
            className="px-3.5 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <StopCircle className="w-4 h-4" />
            <span>Turn All Off</span>
          </button>
        </div>
      </div>

      {/* CHANNEL 1: FIELD A (1.0 ACRE) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 font-mono font-bold flex items-center justify-center">
              CH1
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">Channel 1 – Field Sector A</h3>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  1.0 Acre
                </span>
                <span className="px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 text-xs font-mono font-bold">
                  433.92 MHz
                </span>
              </div>
              <p className="text-xs text-slate-500">North Parcel • Drip laterals &amp; Orchard micro-sprinklers</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleChannel(1, true)}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-all cursor-pointer"
            >
              CH1 Open All
            </button>
            <button
              onClick={() => onToggleChannel(1, false)}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              CH1 Close All
            </button>
          </div>
        </div>

        {/* 4 Receivers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ch1Receivers.map(renderValveCard)}
        </div>
      </div>

      {/* CHANNEL 2: FIELD B (1.0 ACRE) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-mono font-bold flex items-center justify-center">
              CH2
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">Channel 2 – Field Sector B</h3>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  1.0 Acre
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-mono font-bold">
                  433.42 MHz
                </span>
              </div>
              <p className="text-xs text-slate-500">South Parcel • Legumes, Fodder crop &amp; Chillies</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleChannel(2, true)}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-all cursor-pointer"
            >
              CH2 Open All
            </button>
            <button
              onClick={() => onToggleChannel(2, false)}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              CH2 Close All
            </button>
          </div>
        </div>

        {/* 4 Receivers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ch2Receivers.map(renderValveCard)}
        </div>
      </div>
    </div>
  );
};
