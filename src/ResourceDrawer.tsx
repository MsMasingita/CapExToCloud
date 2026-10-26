// src/ResourceDrawer.tsx
import React from 'react';
import { X, BookOpen, ExternalLink, PlaySquare, Award } from 'lucide-react';

interface ResourceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResourceDrawer: React.FC<ResourceDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const resources = [
    // Official & Practice Exams
    {
      type: 'official',
      title: 'Official Microsoft Azure Fundamentals Practice Exam',
      description: 'Take the official Microsoft practice assessment to test your readiness for the AZ-900 exam.',
      url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/?practice-assessment-type=certification',
      badge: 'Practice Exam'
    },
    {
      type: 'official',
      title: 'Microsoft Learn: Describe Cloud Concepts',
      description: 'Official Microsoft AZ-900 learning path covering cloud models, shared responsibility, and economic benefits.',
      url: 'https://learn.microsoft.com/en-gb/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/',
      badge: 'Official Guide'
    },
    // Exam Prep
    {
      type: 'video',
      title: 'AZ-900 Full Exam Prep & Cram Session',
      description: 'Comprehensive exam preparation walkthrough with tips and targeted practice questions.',
      url: 'https://www.youtube.com/watch?v=LpEG9RMNm90&t=13s',
      badge: 'Exam Prep'
    },
    // Cloud Concepts & Masterclasses
    {
      type: 'video',
      title: 'AZ-900 Cloud Concepts Masterclass (Part 1)',
      description: 'Comprehensive video breakdown of cloud computing fundamentals for exam prep.',
      url: 'https://www.youtube.com/watch?v=orwWx0_KEcA&list=PLahhVEj9XNTd6H2vpsvm_kBSMsMw9EMUL',
      badge: 'Cloud Concepts'
    },
    {
      type: 'video',
      title: 'AZ-900 Core Cloud Services & Architecture',
      description: 'Deep dive into Azure core architectural components and concepts.',
      url: 'https://www.youtube.com/watch?v=lVccy2Nw70M&list=PLahhVEj9XNTd6H2vpsvm_kBSMsMw9EMUL&index=2',
      badge: 'Cloud Concepts'
    },
    {
      type: 'video',
      title: 'Cloud Computing Architecture Overview',
      description: 'Visual walkthrough of cloud infrastructure and high availability.',
      url: 'https://www.youtube.com/watch?v=TMynEWIE3SM',
      badge: 'Cloud Concepts'
    },
    {
      type: 'video',
      title: 'Azure Fundamentals Exam Prep: Cloud Models',
      description: 'Focused breakdown of Public, Private, and Hybrid cloud deployment models.',
      url: 'https://www.youtube.com/watch?v=7KEygnLtRyE',
      badge: 'Cloud Concepts'
    },
    {
      type: 'video',
      title: 'CapEx vs OpEx in Cloud Economics',
      description: 'Detailed analysis of capital expenditure versus operational expenditure.',
      url: 'https://www.youtube.com/watch?v=NdqncsMtryY',
      badge: 'Economics'
    },
    {
      type: 'video',
      title: 'Azure Global Infrastructure Explained',
      description: 'Regions, availability zones, and datacenters overview for AZ-900.',
      url: 'https://www.youtube.com/watch?v=9CVBohl6w0Q',
      badge: 'Infrastructure'
    },
    {
      type: 'video',
      title: 'Cloud Concepts Final Review & Summary',
      description: 'Rapid review session covering all key concepts for the AZ-900 exam.',
      url: 'https://www.youtube.com/watch?v=XlNR7myQydI',
      badge: 'Review'
    },
    // Architecture Links
    {
      type: 'video',
      title: 'Azure Architecture Components & Services (Part 3)',
      description: 'Detailed walkthrough of Azure architectural components and core services.',
      url: 'https://www.youtube.com/watch?v=OWmC6K1O6lo&list=PLahhVEj9XNTd6H2vpsvm_kBSMsMw9EMUL&index=3',
      badge: 'Architecture'
    },
    {
      type: 'video',
      title: 'Azure Regions, Zones & Resource Groups (Part 4)',
      description: 'Understanding geographic distribution, availability zones, and resource grouping.',
      url: 'https://www.youtube.com/watch?v=EDE7auxyeX8&list=PLahhVEj9XNTd6H2vpsvm_kBSMsMw9EMUL&index=4',
      badge: 'Architecture'
    },
    {
      type: 'video',
      title: 'Azure Architecture Deep Dive (Session 17)',
      description: 'Advanced structural breakdown of enterprise cloud architecture patterns.',
      url: 'https://www.youtube.com/watch?v=aNK0C9Oj2sg&list=PLlVtbbG169nED0_vMEniWBQjSoxTsBYS3&index=17',
      badge: 'Architecture'
    },
    {
      type: 'video',
      title: 'Azure Architecture Deep Dive (Session 19)',
      description: 'Further exploration of scalable architecture and resilient cloud design.',
      url: 'https://www.youtube.com/watch?v=AI2XoRFwqYE&list=PLlVtbbG169nED0_vMEniWBQjSoxTsBYS3&index=19',
      badge: 'Architecture'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-white font-bold text-base">My Files &amp; Tutorials</h2>
              <p className="text-xs text-slate-400">AZ-900 Resource Hub &amp; Exam Prep</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Resources List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Curated Learning &amp; Practice Materials
          </div>

          {resources.map((res, index) => (
            <a
              key={index}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-slate-950/50 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 rounded-xl p-4 transition-all shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-emerald-400">
                    {res.badge === 'Practice Exam' ? <Award className="w-4 h-4" /> : res.type === 'official' ? <BookOpen className="w-4 h-4" /> : <PlaySquare className="w-4 h-4" />}
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {res.title}
                    </span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {res.description}
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-shrink flex-shrink-0 mt-1" />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700">
                  {res.badge}
                </span>
                <span className="text-[10px] text-emerald-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Open Resource →
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 text-center">
          <p className="text-xs text-slate-500">
            CapExToCloud • Built for SoleSpace Hackathon Demo
          </p>
        </div>

      </div>
    </div>
  );
};

export default ResourceDrawer;