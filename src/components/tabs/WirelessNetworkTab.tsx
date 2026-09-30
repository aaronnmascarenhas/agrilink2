import React, { useState } from 'react';
import { ReceiverNode } from '../../types/farm';
import { Radio, Wifi, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';

interface WirelessNetworkTabProps {
  receivers: ReceiverNode[];
  onPingNode: (id: string) => void;
}

export const WirelessNetworkTab: React.FC<WirelessNetworkTabProps> = ({ receivers, onPingNode }) => {
  const [pingingId, setPingingId] = useState<string | null>(null);

  const handlePing = (id: string) => {
    setPingingId(id);
    onPingNode(id);
    setTimeout(() => setPingingId(null), 800);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-5 lg:p-6 border border-slate-200 shadow-xs">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono">
          Sub-GHz Mesh
        </span>
        <h2 className="text-2xl font-bold text-slate-900 mt-1">Dual-Band Wireless Architecture</h2>
        <p className="text-sm text-slate-500">
          Long-range, zero-fee telemetry pipeline linking the farmer's console with 8 field receivers.
        </p>
      </div>

      {/* SIMPLE CLEAN WIRELESS TOPOLOGY DIAGRAM matching prototype */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Radio className="w-4 h-4 text-sky-600" />
          <span>Wireless Communication Flow</span>
        </h3>

        <div className="max-w-2xl mx-auto bg-slate-50 p-6 rounded-xl border border-slate-200 text-center font-mono text-xs sm:text-sm space-y-3">
          {/* Box 1 */}
          <div className="p-3 bg-white rounded-xl border border-slate-300 font-bold text-slate-800 shadow-xs flex items-center justify-center gap-2">
            <Wifi className="w-4 h-4 text-emerald-700" />
            <span>[ FARMER'S PHONE / WEB DASHBOARD ]</span>
          </div>

          <div className="text-slate-400 font-bold">↓ (Local Wi-Fi / Remote Link)</div>

          {/* Box 2 */}
          <div className="p-3 bg-emerald-50 rounded-xl border-2 border-emerald-500 font-bold text-emerald-950 shadow-xs flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>[ ESP32 MASTER GATEWAY &amp; TRANSMITTER ]</span>
          </div>

          <div className="text-slate-400 font-bold">↓ (Sub-GHz LoRa &amp; 433 MHz RF Carrier)</div>

          {/* Channels Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-sky-50 rounded-xl border border-sky-300 text-sky-950 font-bold">
              [ CHANNEL 1 — 433.92 MHz ]
              <div className="text-slate-400 font-normal mt-1">↓</div>
              <div className="text-xs mt-1 text-slate-700 font-semibold">[ 4 FIELD RECEIVERS (R1-R4) ]</div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-300 text-amber-950 font-bold">
              [ CHANNEL 2 — 433.42 MHz ]
              <div className="text-slate-400 font-normal mt-1">↓</div>
              <div className="text-xs mt-1 text-slate-700 font-semibold">[ 4 FIELD RECEIVERS (R1-R4) ]</div>
            </div>
          </div>
        </div>

        {/* Highlight Note matching prototype */}
        <div className="mt-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-900 leading-relaxed font-medium">
            <strong>Zero cellular fees in the field:</strong> The gateway communicates directly with 8
            wireless receivers across the 2-acre farm using license-free sub-GHz RF. No SIM cards required
            on field nodes, providing 3+ year battery life.
          </p>
        </div>
      </div>

      {/* 8 Receivers Health List matching prototype */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4">
          Receiver Nodes Health Check (All 8 Connected)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {receivers.map((r) => {
            const isStrong = r.rssi > -85;
            const qualityLabel = isStrong ? 'Strong' : 'Good';
            const isPinging = pingingId === r.id;

            return (
              <div
                key={r.id}
                className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-bold text-slate-800">
                    CH{r.channel} - {r.code} ({r.crop.split(' ')[0]} {r.method})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700 font-semibold font-mono">
                    Connected • {r.rssi} dBm ({qualityLabel})
                  </span>
                  <button
                    onClick={() => handlePing(r.id)}
                    className={`p-1 text-slate-400 hover:text-emerald-700 rounded transition-all cursor-pointer ${
                      isPinging ? 'animate-spin text-emerald-700' : ''
                    }`}
                    title="Ping Node"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
