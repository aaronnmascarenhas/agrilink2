import React, { useState } from 'react';
import { ReceiverNode } from '../../types/farm';
import { MapPin, Droplets, ShowerHead, CheckCircle2, Play, Square } from 'lucide-react';

interface FieldZonesTabProps {
  receivers: ReceiverNode[];
  onToggleReceiver: (id: string, active: boolean) => void;
}

export const FieldZonesTab: React.FC<FieldZonesTabProps> = ({ receivers, onToggleReceiver }) => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('ch1-r1');

  const selectedReceiver = receivers.find((r) => r.id === selectedZoneId) || receivers[0];

  const ch1Zones = receivers.filter((r) => r.channel === 1);
  const ch2Zones = receivers.filter((r) => r.channel === 2);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Cadastral Header */}
      <div className="bg-white rounded-2xl p-5 lg:p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono">
              Cadastral View
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">2-Acre Interactive Farm Parcel</h2>
            <p className="text-sm text-slate-500">
              Click any zone rectangle below to view details and control its valve in the side inspector.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-3 h-3 rounded bg-emerald-500"></span> Currently Watering
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-3 h-3 rounded bg-slate-100 border border-slate-300"></span> Standby
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Parcel Drawing Canvas (8 Columns) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Field A Parcel (1.0 Acre) */}
            <div className="p-4 rounded-xl bg-sky-50/50 border border-sky-100 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-sky-200">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-sky-900">CHANNEL 1 — FIELD A</span>
                  <span className="text-[11px] font-mono bg-sky-100 text-sky-800 px-1.5 py-0.2 rounded font-bold">
                    1.0 ACRE
                  </span>
                </div>
                <span className="text-xs text-sky-700 font-medium">North Parcel</span>
              </div>

              {/* 4 Rectangular Zones in Field A */}
              <div className="grid grid-cols-2 gap-3">
                {ch1Zones.map((z) => {
                  const isSelected = z.id === selectedZoneId;
                  const isWatering = z.active;

                  return (
                    <div
                      key={z.id}
                      onClick={() => setSelectedZoneId(z.id)}
                      className={`cursor-pointer p-3.5 rounded-xl transition-all relative ${
                        isSelected ? 'ring-2 ring-emerald-600 ring-offset-2' : ''
                      } ${
                        isWatering
                          ? 'border-2 border-emerald-500 bg-emerald-100/70 hover:shadow-md'
                          : 'border border-slate-200 bg-white hover:border-slate-400 hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-mono text-xs font-bold ${
                            isWatering ? 'text-emerald-900' : 'text-slate-600'
                          }`}
                        >
                          {z.code}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded font-bold text-[9px] ${
                            isWatering ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {isWatering ? 'ON' : 'OFF'}
                        </span>
                      </div>
                      <p className="font-bold text-slate-900 text-sm mt-1.5 truncate">{z.crop.split(' ')[0]}</p>
                      <div className="flex items-center justify-between mt-2 text-xs">
                        <span className={isWatering ? 'text-emerald-800 font-medium' : 'text-slate-500'}>
                          {z.method}
                        </span>
                        <span className={`font-bold ${isWatering ? 'text-emerald-900' : 'text-slate-800'}`}>
                          {z.moisture}% VWC
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Field B Parcel (1.0 Acre) */}
            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-amber-900">CHANNEL 2 — FIELD B</span>
                  <span className="text-[11px] font-mono bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-bold">
                    1.0 ACRE
                  </span>
                </div>
                <span className="text-xs text-amber-800 font-medium">South Parcel</span>
              </div>

              {/* 4 Rectangular Zones in Field B */}
              <div className="grid grid-cols-2 gap-3">
                {ch2Zones.map((z) => {
                  const isSelected = z.id === selectedZoneId;
                  const isWatering = z.active;

                  return (
                    <div
                      key={z.id}
                      onClick={() => setSelectedZoneId(z.id)}
                      className={`cursor-pointer p-3.5 rounded-xl transition-all relative ${
                        isSelected ? 'ring-2 ring-emerald-600 ring-offset-2' : ''
                      } ${
                        isWatering
                          ? 'border-2 border-emerald-500 bg-emerald-100/70 hover:shadow-md'
                          : 'border border-slate-200 bg-white hover:border-slate-400 hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-mono text-xs font-bold ${
                            isWatering ? 'text-emerald-900' : 'text-slate-600'
                          }`}
                        >
                          {z.code}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded font-bold text-[9px] ${
                            isWatering ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {isWatering ? 'ON' : 'OFF'}
                        </span>
                      </div>
                      <p className="font-bold text-slate-900 text-sm mt-1.5 truncate">{z.crop.split(' ')[0]}</p>
                      <div className="flex items-center justify-between mt-2 text-xs">
                        <span className={isWatering ? 'text-emerald-800 font-medium' : 'text-slate-500'}>
                          {z.method}
                        </span>
                        <span className={`font-bold ${isWatering ? 'text-emerald-900' : 'text-slate-800'}`}>
                          {z.moisture}% VWC
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Central Water Pipeline Reference matching prototype */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-600">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-sky-600">valve</span>
              <span>Main 63mm HDPE Line: 5HP Submersible Borewell Station feeding both Field A &amp; B manifolds</span>
            </div>
            <span className="font-mono font-bold text-emerald-700 shrink-0">2.8 BAR STABLE</span>
          </div>
        </div>

        {/* Zone Inspector Card (4 Columns) matching prototype */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Zone Details
            </span>
            <span
              className={`px-2 py-0.5 rounded-full font-bold text-xs ${
                selectedReceiver.active
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {selectedReceiver.active ? 'ACTIVE / WATERING' : 'STANDBY / OFF'}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900">{selectedReceiver.parcel} ({selectedReceiver.name})</h3>
            <p className="text-sm text-slate-500 mt-0.5">Crop: {selectedReceiver.crop}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 uppercase font-mono text-[10px]">Method</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">
                {selectedReceiver.method} Laterals
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 uppercase font-mono text-[10px]">Current Moisture</span>
              <p
                className={`font-bold text-sm mt-0.5 ${
                  selectedReceiver.moisture < 35
                    ? 'text-rose-600'
                    : selectedReceiver.moisture > 50
                    ? 'text-emerald-700'
                    : 'text-slate-800'
                }`}
              >
                {selectedReceiver.moisture}% {selectedReceiver.moisture < 35 ? '(Needs water)' : '(Optimal)'}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-emerald-900 font-semibold">Heuristic Target:</span>
              <span className="font-bold text-emerald-800">{selectedReceiver.targetMoisture}% VWC</span>
            </div>
            <p className="text-emerald-700 text-[11px]">
              Solenoid {selectedReceiver.code} automatically scheduled for 15-minute pulse cycle.
            </p>
          </div>

          {/* Quick telemetry summary */}
          <div className="space-y-1.5 text-xs text-slate-500">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Channel / Frequency:</span>
              <span className="font-mono text-slate-800 font-medium">CH{selectedReceiver.channel} ({selectedReceiver.frequency})</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Watered Today:</span>
              <span className="font-semibold text-slate-800">{selectedReceiver.wateringMinutesToday} mins (~{selectedReceiver.wateringMinutesToday * 20}L)</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Signal Strength (RSSI):</span>
              <span className="font-mono font-bold text-emerald-700">{selectedReceiver.rssi} dBm (Healthy)</span>
            </div>
          </div>

          {/* Zone Quick Override */}
          <div className="pt-2">
            <p className="text-xs font-semibold text-slate-600 mb-2">Zone Quick Override:</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleReceiver(selectedReceiver.id, true)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>START WATERING</span>
              </button>
              <button
                onClick={() => onToggleReceiver(selectedReceiver.id, false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>STOP</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
