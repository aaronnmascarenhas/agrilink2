import React from 'react';
import { AlertOctagon, Power, X } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmHalt: () => void;
  activeValvesCount: number;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  onConfirmHalt,
  activeValvesCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-rose-200 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-rose-100">
          <div className="flex items-center gap-2.5 text-rose-700">
            <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center">
              <AlertOctagon className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Emergency Irrigation Stop</h3>
              <p className="text-xs text-rose-600 font-semibold">Immediate Field Halt Protocol</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          This command will send an instant RF latch-off pulse to all 8 bi-stable solenoids across{' '}
          <strong className="text-slate-900 font-semibold">Field A and Field B</strong>, and halt the 5HP
          submersible pump station.
        </p>

        <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs space-y-1">
          <div className="flex justify-between font-semibold text-rose-950">
            <span>Currently Active Valves:</span>
            <span className="font-mono text-rose-700 font-bold">{activeValvesCount} Valves Watering</span>
          </div>
          <p className="text-rose-700 text-[11px]">
            Pressure will relieve safely from 2.8 Bar to 0.0 Bar in approx 3 seconds.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-xs cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirmHalt();
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/20 cursor-pointer transition-colors"
          >
            <Power className="w-4 h-4" />
            <span>HALT ALL (SHUT OFF)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
