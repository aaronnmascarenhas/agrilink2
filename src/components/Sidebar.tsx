import React from 'react';
import {
  LayoutGrid,
  Pipette,
  Map,
  Activity,
  GitBranch,
  Sun,
  Radio,
  Bell,
  Cpu,
} from 'lucide-react';

export type TabId =
  | 'overview'
  | 'irrigation-control'
  | 'field-zones'
  | 'sensors'
  | 'automation'
  | 'solar-power'
  | 'wireless-network'
  | 'alerts'
  | 'settings';

interface SidebarProps {
  currentTab: TabId;
  onSelectTab: (tab: TabId) => void;
  unresolvedAlertCount: number;
  mobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
  activeValvesCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  unresolvedAlertCount,
  mobileMenuOpen,
  onCloseMobileMenu,
  activeValvesCount,
}) => {
  const navItems: { id: TabId; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <span className="material-symbols-outlined text-[20px]">grid_view</span>,
    },
    {
      id: 'irrigation-control',
      label: 'Irrigation Control',
      icon: <span className="material-symbols-outlined text-[20px]">valve</span>,
      badge: activeValvesCount > 0 ? activeValvesCount : undefined,
    },
    {
      id: 'field-zones',
      label: 'Field Zones',
      icon: <span className="material-symbols-outlined text-[20px]">map</span>,
    },
    {
      id: 'sensors',
      label: 'Sensors',
      icon: <span className="material-symbols-outlined text-[20px]">sensors</span>,
    },
    {
      id: 'automation',
      label: 'Automation',
      icon: <span className="material-symbols-outlined text-[20px]">schema</span>,
    },
    {
      id: 'solar-power',
      label: 'Solar & Power',
      icon: <span className="material-symbols-outlined text-[20px]">solar_power</span>,
    },
    {
      id: 'wireless-network',
      label: 'Wireless Network',
      icon: <span className="material-symbols-outlined text-[20px]">podcasts</span>,
    },
    {
      id: 'alerts',
      label: 'System Alerts',
      icon: <span className="material-symbols-outlined text-[20px]">notifications</span>,
      badge: unresolvedAlertCount > 0 ? unresolvedAlertCount : undefined,
    },
    {
      id: 'settings',
      label: 'ESP32 Settings',
      icon: <span className="material-symbols-outlined text-[20px]">settings_input_component</span>,
    },
  ];

  const handleNavClick = (id: TabId) => {
    onSelectTab(id);
    onCloseMobileMenu();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobileMenu}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed left-0 top-16 bottom-0 w-60 bg-white border-r border-slate-200 z-40 flex flex-col justify-between py-4 shadow-xs transition-transform duration-200 lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-3 overflow-y-auto custom-scrollbar flex-1">
          <p className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Farm Control
          </p>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="shrink-0 flex items-center justify-center">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`px-1.5 py-0.2 min-w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.id === 'alerts'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom System Quick Info matching screenshot */}
        <div className="px-4 pt-3 border-t border-slate-100">
          <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-100 text-xs">
            <div className="flex items-center justify-between font-semibold text-emerald-900">
              <span>2.0 Acre Setup</span>
              <span className="font-mono text-[11px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded font-bold">
                8 NODES
              </span>
            </div>
            <p className="text-[11px] text-emerald-700 mt-1">4 Drip Lines • 4 Sprinklers</p>
          </div>
        </div>
      </aside>
    </>
  );
};
