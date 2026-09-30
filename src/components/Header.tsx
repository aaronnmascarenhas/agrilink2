import React, { useState } from 'react';
import { SystemMode, SystemTelemetry } from '../types/farm';
import { Bot, SlidersHorizontal, Power, Menu, X, Sun, Droplets, CheckCircle, UserCheck } from 'lucide-react';

interface HeaderProps {
  systemMode: SystemMode;
  onSetSystemMode: (mode: SystemMode) => void;
  onEmergencyStop: () => void;
  telemetry: SystemTelemetry;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  systemMode,
  onSetSystemMode,
  onEmergencyStop,
  telemetry,
  mobileMenuOpen,
  onToggleMobileMenu,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 z-50 px-4 lg:px-6 flex items-center justify-between shadow-xs">
      {/* Brand & Farm Tag */}
      <div className="flex items-center gap-3 lg:gap-6">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-1.5 -ml-1 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-emerald-800 flex items-center justify-center text-white shadow-xs">
            <span className="material-symbols-outlined text-[22px]">nest_eco_leaf</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-emerald-950 tracking-tight leading-none font-sans">AgriLink</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold tracking-wide">
                SMART FARM
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-none mt-1">Green Valley Farm (2.0 Acres)</p>
          </div>
        </div>

        {/* Live Indicators Pills (Desktop) */}
        <div className="hidden md:flex items-center gap-2 pl-4 border-l border-slate-200 text-xs">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {telemetry.gatewayOnline ? 'Gateway Online' : 'Gateway Offline'}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-medium border border-amber-200">
            <Sun className="w-3.5 h-3.5 text-amber-600" />
            Battery {telemetry.solarBatteryPct}%
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 text-sky-800 font-medium border border-sky-200">
            <Droplets className="w-3.5 h-3.5 text-sky-600" />
            Rain: {telemetry.rainStatus}
          </span>
        </div>
      </div>

      {/* Actions & Quick Controls */}
      <div className="flex items-center gap-2.5">
        {/* Auto / Manual Badge Toggle */}
        <div className="inline-flex p-1 bg-slate-100 rounded-lg text-xs font-semibold">
          <button
            onClick={() => onSetSystemMode('auto')}
            className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-all text-xs font-semibold ${
              systemMode === 'auto'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Switch to autonomous soil-moisture irrigation mode"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AUTO</span>
          </button>
          <button
            onClick={() => onSetSystemMode('manual')}
            className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-all text-xs font-semibold ${
              systemMode === 'manual'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Switch to manual farmer operator override mode"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>MANUAL</span>
          </button>
        </div>

        {/* Emergency Stop Button */}
        <button
          onClick={onEmergencyStop}
          className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-colors border border-rose-200 shadow-xs cursor-pointer active:scale-95"
          title="Instantly close all 8 irrigation valves and halt the pump"
        >
          <Power className="w-4 h-4" />
          <span className="hidden sm:inline">EMERGENCY STOP</span>
        </button>

        {/* Farmer Profile Pill */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs border border-emerald-300 hover:ring-2 hover:ring-emerald-400 cursor-pointer transition-all"
            title="Farmer Account: Green Valley Farm"
          >
            GV
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3.5 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">Green Valley Agro Facility</p>
                <p className="text-[11px] text-slate-500 font-mono">ID: AGRI-ESP-9844</p>
                <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                  <CheckCircle className="w-3 h-3 text-emerald-600" /> Active Farm Operator
                </div>
              </div>
              <div className="px-3.5 py-2 text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Plot:</span>
                  <span className="font-semibold text-slate-800">2.0 Acres (8 Sectors)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Main Gateway:</span>
                  <span className="font-mono text-slate-800">ESP32 LoRa v2.4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">RF Carrier:</span>
                  <span className="font-mono text-slate-800">433.92 / 433.42 MHz</span>
                </div>
              </div>
              <div className="pt-2 px-3 border-t border-slate-100">
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-center py-1 text-xs text-emerald-700 hover:text-emerald-900 font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
