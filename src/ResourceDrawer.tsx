// src/ResourceDrawer.tsx
import React, { useState } from 'react';
import { X, BookOpen } from 'lucide-react';

interface ResourceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResourceDrawer: React.FC<ResourceDrawerProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'domain1' | 'domain2' | 'domain3'>('domain1');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-xl bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">AZ-900 Certification Syllabus</h2>
              <p className="text-xs text-slate-400">Complete Study Companion &amp; Reference Notes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Domain Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 p-2 gap-2">
          <button
            onClick={() => setActiveTab('domain1')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'domain1'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Domain 1: Cloud Concepts
          </button>
          <button
            onClick={() => setActiveTab('domain2')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'domain2'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Domain 2: Architecture
          </button>
          <button
            onClick={() => setActiveTab('domain3')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'domain3'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Domain 3: Governance
          </button>
        </div>

        {/* Drawer Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {activeTab === 'domain1' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                <h3 className="text-sm font-bold text-emerald-400">CapEx vs. OpEx Financial Models</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Capital Expenditure (CapEx):</strong> High upfront costs for physical servers, infrastructure, and real estate. Value depreciates over time.
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Operational Expenditure (OpEx):</strong> Pay-as-you-go subscription model with zero upfront costs. Expenses match live traffic dynamically.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                <h3 className="text-sm font-bold text-amber-400">High Availability &amp; Elasticity</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Elasticity:</strong> The ability to automatically scale up hardware resources during spikes (like flash sales in Nairobi) and scale down when traffic normalizes.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'domain2' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                <h3 className="text-sm font-bold text-emerald-400">Azure Architecture Components</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Regions &amp; Availability Zones:</strong> Azure Regions (e.g., South Africa North) contain multiple isolated data centers ensuring fault tolerance.
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Virtual Machines &amp; App Services:</strong> IaaS vs PaaS hosting tradeoffs for backend e-commerce workloads.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'domain3' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                <h3 className="text-sm font-bold text-emerald-400">Azure Management &amp; Cost Tools</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Cost Management &amp; Budgets:</strong> Setting spending caps and alerts in KSh/USD to prevent operational cost runaways.
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Azure Policy &amp; RBAC:</strong> Governance frameworks enforcing data residency laws across African jurisdictions.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default ResourceDrawer;