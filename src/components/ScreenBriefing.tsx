// src/components/ScreenBriefing.tsx
import React, { useState } from 'react';
import { ArrowRight, BookOpen, RotateCw } from 'lucide-react';

interface ScreenBriefingProps {
  onProceed: () => void;
  xp: number;
  domain?: string;
}

export const ScreenBriefing: React.FC<ScreenBriefingProps> = ({ onProceed, domain }) => {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const isEduBridge = domain === 'edubridge';

  const briefingData = isEduBridge
    ? {
        stageTag: 'STAGE 1: SOVEREIGN CLOUD GOVERNANCE CHARTER',
        initials: 'DO',
        name: 'Dean Ochieng',
        role: 'Chief Academic & Technology Officer',
        subject: 'UNMANAGED ACCESS, SUBSCRIPTION DRIFT & REGIONAL COMPLIANCE',
        badge: 'Domain 3: Governance',
        leadText: (
          <>
            &ldquo;Welcome to EduBridge Academy, Intern. Across our 12 pan-African campuses, departmental heads have been spinning up unmonitored Azure subscriptions without oversight. Student transcripts and sensitive research records lack <span className="text-emerald-400 font-semibold underline">data residency boundaries</span>, and last term an intern accidentally wiped out a production examination database.&rdquo;
          </>
        ),
        bodyText: (
          <>
            &ldquo;The Board demands an immutable enterprise governance structure before semester examinations open. We need strict <span className="text-emerald-400 font-semibold underline">Zero Trust RBAC</span>, automated regional policy guardrails, and deletion protection locks across all management hierarchies.&rdquo;
          </>
        ),
        contextNote: 'Review these 3 key governance concepts before you propose a solution.',
        brandName: 'EduBridge',
        cards: [
          {
            id: 'mgmt-groups',
            title: 'Flip: Management Groups',
            concept: 'Hierarchical containers that manage access, policy, and compliance across multiple subscriptions.',
            application: 'Aggregating 12 campus subscriptions under unified African regional governance policies.'
          },
          {
            id: 'azure-policy',
            title: 'Flip: Azure Policy & RBAC',
            concept: 'Policy enforces resource rules/effects, while RBAC manages fine-grained user access.',
            application: 'Restricting server deployments strictly to South Africa North and assigning scoped permissions.'
          },
          {
            id: 'resource-locks',
            title: 'Flip: Resource Locks',
            concept: 'CanNotDelete and ReadOnly locks that prevent accidental deletion or unwanted modifications.',
            application: 'Locking core examination databases so no administrator can accidentally delete student records.'
          }
        ]
      }
    : {
        stageTag: 'STAGE 1: THE BUSINESS WITHOUT A SERVER ROOM',
        initials: 'TM',
        name: 'Thandi Mokoena',
        role: 'IT Operations Manager',
        subject: 'BASEMENT SERVER ROOM OUTAGE & FLASH SNEAKER DROPS',
        badge: 'Domain 1: Cloud Concepts',
        leadText: (
          <>
            &ldquo;Morning Intern, welcome to SoleSpace. I wish we had time for coffee, but we have an emergency. Yesterday was our exclusive Nairobi &amp; Jo&apos;burg sneaker drop. Within 4 minutes, 15,000 concurrent shoppers flooded our custom storefront. Our <span className="text-emerald-400 font-semibold underline">on-premises servers</span> in the office basement overheated, our local power backup tripped, and customers hit 504 Gateway Timeouts. We lost thousands in sales.&rdquo;
          </>
        ),
        bodyText: (
          <>
            &ldquo;The founders want to <span className="text-emerald-400 font-semibold underline">budget $40,000</span> to buy 20 more physical servers. I told them that&apos;s financial suicide—those servers will sit idle and burn electricity for 28 days every month until the next drop.&rdquo;
          </>
        ),
        contextNote: 'Review these 3 key concepts before you propose a solution.',
        brandName: 'SoleSpace',
        cards: [
          {
            id: 'on-prem',
            title: 'Flip: On-Premises',
            concept: 'Physical server hardware owned and maintained locally in a company facility.',
            application: 'SoleSpace basement servers overheating during flash sneaker drops.'
          },
          {
            id: 'cloud',
            title: 'Flip: Cloud Computing',
            concept: 'On-demand delivery of IT resources over the internet with pay-as-you-go pricing.',
            application: 'Renting virtual compute instantly during 15,000 shopper traffic spikes.'
          },
          {
            id: 'capex-opex',
            title: 'Flip: CapEx vs. OpEx',
            concept: 'CapEx is upfront hardware spending; OpEx is ongoing operational consumption.',
            application: 'Avoiding $40,000 server purchases by paying only for active drop compute.'
          }
        ]
      };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-8 animate-fadeIn">
      {/* Stage Banner */}
      <div className="space-y-1">
        <div className="text-amber-400 text-xs font-bold uppercase tracking-wider">
          {briefingData.stageTag}
        </div>
      </div>

      {/* Briefing Memo Card */}
      <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 md:p-8 space-y-4 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-emerald-400 border border-emerald-500/30">
              {briefingData.initials}
            </div>
            <div>
              <h2 className="text-sm md:text-base font-bold text-white">
                {briefingData.name}, <span className="text-slate-400 font-normal">{briefingData.role}</span>
              </h2>
              <p className="text-xs text-slate-400 font-semibold uppercase">
                SUBJECT: {briefingData.subject}
              </p>
            </div>
          </div>
          <span className="text-xs bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full font-bold border border-amber-500/30">
            {briefingData.badge}
          </span>
        </div>

        {/* Scenario Text */}
        <div className="text-slate-300 text-sm md:text-base leading-relaxed space-y-3 font-normal">
          <p>{briefingData.leadText}</p>
          <p>{briefingData.bodyText}</p>
          <p className="text-slate-400 font-medium pt-2 text-xs md:text-sm">
            {briefingData.contextNote}
          </p>
        </div>
      </div>

      {/* Interactive Concept Strip */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          INTERACTIVE CONCEPT STRIP
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {briefingData.cards.map((card) => {
            const isFlipped = flippedCard === card.id;
            return (
              <div
                key={card.id}
                onClick={() => setFlippedCard(isFlipped ? null : card.id)}
                className="bg-slate-900/80 hover:bg-slate-900 border border-emerald-500/30 hover:border-emerald-400 rounded-xl p-4 transition-all cursor-pointer min-h-[110px] flex flex-col justify-between shadow-lg"
              >
                <div className="flex items-center justify-between text-emerald-400 text-xs font-bold">
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> {card.title}
                  </span>
                  <RotateCw className="w-3.5 h-3.5 text-slate-500" />
                </div>

                {isFlipped ? (
                  <p className="text-xs text-slate-200 mt-2 leading-relaxed animate-fadeIn">
                    <strong className="text-emerald-400">{briefingData.brandName}:</strong> {card.application}
                  </p>
                ) : (
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {card.concept}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Orange Proceed Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onProceed}
          className="px-8 py-3.5 rounded-xl font-black text-xs md:text-sm flex items-center gap-2 transition-all cursor-pointer bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400/50"
        >
          Proceed to Decision Analysis (+25 XP) <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ScreenBriefing;