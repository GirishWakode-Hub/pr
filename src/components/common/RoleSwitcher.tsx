import React from 'react';
import { usePR } from '../../context/PRContext';
import { ShieldCheck, UserCheck, Briefcase, Globe, Sparkles } from 'lucide-react';
import { UserRole } from '../../types';

export const RoleSwitcher: React.FC = () => {
  const { currentRole, setCurrentRole, currentPage, navigateTo } = usePR();

  const roles: { role: UserRole; label: string; shortLabel: string; icon: any; page?: any }[] = [
    { role: 'PUBLIC', label: 'Public Website', shortLabel: 'Website', icon: Globe, page: 'home' },
    { role: 'CLIENT', label: 'Client Portal', shortLabel: 'Portal', icon: Briefcase, page: 'client-portal' },
  ];

  return (
    <div id="role-switcher-bar" className="bg-[#060F22] text-white/80 border-b border-blue-900/40 text-xs py-1.5 px-3 sm:px-4 sticky top-0 z-50 pt-[max(0.375rem,env(safe-area-inset-top))]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 font-medium shrink-0">
          <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-sm bg-blue-600/20 text-blue-400 text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest border border-blue-500/30">
            PR Platform
          </span>
          <span className="text-white/40 hidden md:inline text-xs font-light">Active Environment:</span>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 overflow-x-auto no-scrollbar">
          {roles.map((item) => {
            const Icon = item.icon;
            const isActive = currentRole === item.role;
            return (
              <button
                key={item.role}
                id={`role-btn-${item.role.toLowerCase()}`}
                onClick={() => {
                  setCurrentRole(item.role);
                  if (item.page) {
                    navigateTo(item.page);
                  }
                }}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-1 rounded-sm transition-all text-[10px] sm:text-[11px] font-bold uppercase tracking-wider min-h-[30px] sm:min-h-[28px] whitespace-nowrap active:scale-[0.98] ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">{item.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
