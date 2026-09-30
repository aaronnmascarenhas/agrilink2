import React, { useState } from 'react';
import { FarmAlert } from '../../types/farm';
import { Bell, CheckCircle2, AlertTriangle, Info, Check, Plus, Trash2 } from 'lucide-react';

interface SystemAlertsTabProps {
  alerts: FarmAlert[];
  onToggleResolve: (id: string) => void;
  onClearResolved: () => void;
  onAddTestAlert: () => void;
}

export const SystemAlertsTab: React.FC<SystemAlertsTabProps> = ({
  alerts,
  onToggleResolve,
  onClearResolved,
  onAddTestAlert,
}) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all');

  const filteredAlerts = alerts.filter((a) => {
    if (filter === 'active') return !a.resolved;
    if (filter === 'resolved') return a.resolved;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-5 lg:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono">
            Event Log
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Farm System Alerts</h2>
          <p className="text-sm text-slate-500">
            Plain-language notifications on irrigation cycles, equipment, and sensors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Segmented Filter */}
          <div className="inline-flex p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                filter === 'all' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({alerts.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                filter === 'active'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Active ({alerts.filter((a) => !a.resolved).length})
            </button>
            <button
              onClick={() => setFilter('resolved')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                filter === 'resolved'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Resolved ({alerts.filter((a) => a.resolved).length})
            </button>
          </div>

          <button
            onClick={onAddTestAlert}
            className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
            title="Generate Diagnostic Test Alert"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Alerts Container matching prototype */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
            <p className="font-semibold text-slate-700">No alerts match the selected filter</p>
            <p className="text-xs text-slate-500 mt-1">All farm systems are operating nominally.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isWarning = alert.severity === 'warning';
            const isInfo = alert.severity === 'info';
            const isSuccess = alert.severity === 'success';

            let cardBg = 'bg-emerald-50 border-emerald-200 text-emerald-950';
            let dotBg = 'bg-emerald-600';
            let descColor = 'text-emerald-800';

            if (isWarning) {
              cardBg = 'bg-amber-50 border-amber-200 text-amber-950';
              dotBg = 'bg-amber-500';
              descColor = 'text-amber-800';
            } else if (isInfo) {
              cardBg = 'bg-slate-50 border-slate-200 text-slate-900';
              dotBg = 'bg-slate-400';
              descColor = 'text-slate-600';
            }

            return (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border flex items-start justify-between gap-3 transition-all ${cardBg} ${
                  alert.resolved ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${dotBg}`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm">{alert.title}</h4>
                      <span className="text-[11px] opacity-70 font-mono">({alert.timestamp})</span>
                      {alert.resolved && (
                        <span className="px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 text-[10px] font-bold">
                          Resolved
                        </span>
                      )}
                    </div>
                    <p className={`text-xs mt-0.5 ${descColor}`}>{alert.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => onToggleResolve(alert.id)}
                  className="px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-xs font-semibold text-slate-700 hover:text-slate-900 shadow-2xs border border-slate-200 shrink-0 cursor-pointer transition-all"
                >
                  {alert.resolved ? 'Reopen' : 'Acknowledge'}
                </button>
              </div>
            );
          })
        )}

        {alerts.some((a) => a.resolved) && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={onClearResolved}
              className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1 font-medium transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear resolved events</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
