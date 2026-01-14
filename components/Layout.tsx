import React, { useState, useEffect } from 'react';
import { ShieldCheck, FileText, BookOpen, History, Globe, Settings, Users, Lock, SwitchCamera, LayoutDashboard, Menu, X } from 'lucide-react';
import { AppView, UserRole } from '../types';
import { cn } from '../utils';

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  setView: (view: AppView) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, setView, userRole, setUserRole }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when view changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentView]);

  const NavButton = ({ view, icon: Icon, label }: { view: AppView, icon: any, label: string }) => (
    <button
      onClick={() => setView(view)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${currentView === view || (view === AppView.UPLOAD && currentView === AppView.RESULTS)
        ? 'bg-[#E2000F] text-white shadow-lg shadow-red-900/20 font-medium'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }`}
    >
      <Icon className={`h-5 w-5 transition-colors ${currentView === view ? 'text-white' : 'text-slate-400 group-hover:text-[#E2000F]'
        }`} />
      <span>{label}</span>
      {/* Active Indicator for Mobile */}
      {currentView === view && (
        <div className="md:hidden ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
      )}
    </button>
  );

  const toggleRole = () => {
    const newRole = userRole === UserRole.GENERAL_USER ? UserRole.ADMIN : UserRole.GENERAL_USER;
    setUserRole(newRole);
  };

  return (
    <div className="min-h-screen flex bg-brand-base relative overflow-hidden selection:bg-brand-primary/20 selection:text-brand-primary">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-primary/5 blur-[120px] animate-blob" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-accent/5 blur-[120px] animate-blob animation-delay-2000" />
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-brand-text-main/20 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Floating Sidebar */}
      <aside className={cn(
        "fixed top-4 bottom-4 w-72 glass-panel rounded-2xl flex flex-col z-50 transition-transform duration-300 shadow-glass border border-white/40",
        // Mobile: Slide in from left
        isMobileMenuOpen ? "left-4 translate-x-0" : "-translate-x-[120%] left-4",
        // Desktop: Always visible
        "md:translate-x-0 md:left-4"
      )}>
        <div className="p-6 flex items-center justify-between border-b border-brand-border/50 bg-white/30 backdrop-blur-sm rounded-t-2xl">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-accent rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className={`relative p-2.5 rounded-xl bg-gradient-to-br from-brand-primary to-brand-danger shadow-lg flex items-center justify-center`}>
                <ShieldCheck className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <span className="text-lg font-display font-bold tracking-tight block leading-none text-brand-text-main">
                BrandAlign
              </span>
              <span className="text-[10px] text-brand-text-muted font-bold tracking-[0.2em] uppercase mt-1.5 block">
                {userRole === UserRole.ADMIN ? 'Admin Console' : 'Governance'}
              </span>
            </div>
          </div>
          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden p-2 text-brand-text-muted hover:text-brand-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-6 scrollbar-hide">
          {userRole === UserRole.GENERAL_USER && (
            <>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="px-4 mb-3 text-[10px] font-bold text-brand-text-light uppercase tracking-widest">
                  Workspace
                </div>
                <div className="space-y-1">
                  <NavButton view={AppView.UPLOAD} icon={FileText} label="New Analysis" />
                  <NavButton view={AppView.HISTORY} icon={History} label="Activity History" />
                </div>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="px-4 mb-3 text-[10px] font-bold text-brand-text-light uppercase tracking-widest flex justify-between items-center">
                  <span>Resources</span>
                </div>
                <div className="space-y-1">
                  <NavButton view={AppView.KNOWLEDGE_BASE} icon={BookOpen} label="Knowledge Hub" />
                </div>
              </div>
            </>
          )}

          {userRole === UserRole.ADMIN && (
            <>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="px-4 mb-3 text-[10px] font-bold text-brand-primary uppercase tracking-widest">
                  Insights
                </div>
                <div className="space-y-1">
                  <NavButton view={AppView.ANALYTICS} icon={LayoutDashboard} label="Dashboard" />
                </div>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="px-4 mb-3 text-[10px] font-bold text-brand-primary uppercase tracking-widest">
                  Configuration
                </div>
                <div className="space-y-1">
                  <NavButton view={AppView.BRAND_GUIDELINES} icon={Settings} label="Brand Guidelines" />
                  <NavButton view={AppView.USER_MANAGEMENT} icon={Users} label="Team Access" />
                </div>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="px-4 mb-3 text-[10px] font-bold text-brand-primary uppercase tracking-widest">
                  Governance
                </div>
                <div className="space-y-1">
                  <NavButton view={AppView.HISTORY} icon={Lock} label="Global Audit" />
                </div>
              </div>
            </>
          )}
        </nav>

        <div className="p-4 mt-auto">
          <button
            onClick={toggleRole}
            className="flex items-center gap-3 w-full p-3 rounded-xl bg-white/40 hover:bg-white/70 border border-white/50 backdrop-blur-md shadow-sm transition-all group relative overflow-hidden"
          >
            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md transition-all z-10 ${userRole === UserRole.ADMIN ? 'bg-slate-800' : 'bg-gradient-to-br from-brand-primary to-brand-danger'}`}>
              {userRole === UserRole.ADMIN ? 'AD' : 'JD'}
            </div>
            <div className="text-sm text-left overflow-hidden flex-1 z-10">
              <div className="font-semibold text-brand-text-main truncate group-hover:text-brand-primary transition-colors">
                {userRole === UserRole.ADMIN ? 'Admin User' : 'Jane Doe'}
              </div>
              <div className="text-brand-text-muted text-xs truncate flex items-center gap-1">
                <SwitchCamera className="h-3 w-3" />
                Switch Role
              </div>
            </div>
            {/* Hover Shine Effect */}
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent z-0"></div>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full md:ml-[calc(19rem)] relative flex flex-col min-h-screen transition-all duration-300">
        {/* Floating Header */}
        <header className="sticky top-4 mx-4 md:mx-8 z-40 glass-panel rounded-2xl px-4 md:px-8 py-4 md:py-5 flex justify-between items-center shadow-glass border border-white/40 mb-6 transition-all duration-300">

          <div className="flex items-center gap-4 animate-slide-in-left">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg -ml-2 text-brand-text-main hover:bg-black/5 active:scale-95 transition-all"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div>
              <h1 className="text-xl md:text-2xl font-display font-bold text-brand-text-main tracking-tight line-clamp-1">
                {currentView === AppView.HISTORY && (userRole === UserRole.ADMIN ? 'Global Audit' : 'Activity History')}
                {currentView === AppView.BRAND_GUIDELINES && 'Brand Guidelines'}
                {currentView === AppView.ANALYTICS && 'Analytics Dashboard'}
                {currentView === AppView.USER_MANAGEMENT && 'User Management'}
                {(currentView === AppView.UPLOAD || currentView === AppView.RESULTS) && 'Content Analysis'}
                {currentView === AppView.KNOWLEDGE_BASE && 'Knowledge Hub'}
              </h1>
              <p className="hidden md:block text-brand-text-muted text-sm font-medium mt-0.5">
                {currentView === AppView.HISTORY && 'Monitor and track system compliance events.'}
                {currentView === AppView.BRAND_GUIDELINES && 'Manage voice, tone, and visual standards.'}
                {currentView === AppView.ANALYTICS && 'Real-time performance metrics and insights.'}
                {currentView === AppView.USER_MANAGEMENT && 'Control access and permissions.'}
                {(currentView === AppView.UPLOAD || currentView === AppView.RESULTS) && 'AI-powered verification against standards.'}
                {currentView === AppView.KNOWLEDGE_BASE && 'Explore resources and best practices.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <div className="hidden lg:flex items-center text-xs font-medium text-brand-text-muted bg-brand-base/50 px-3 py-1.5 rounded-lg border border-brand-border/50">
              <Globe className="h-3.5 w-3.5 mr-2 text-brand-secondary" />
              Region: <span className="text-brand-text-main ml-1 font-semibold">Global</span>
            </div>

            <div className="flex items-center gap-2 pl-2 md:pl-4 border-l border-brand-border/50">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-success"></span>
              </div>
              <span className="text-xs font-bold text-brand-success tracking-wide uppercase">Active</span>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="px-4 md:px-8 pb-8 flex-1 z-10 overflow-y-auto">
          <div className="animate-scale-in origin-top">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
