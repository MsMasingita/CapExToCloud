// src/components/ScreenBoardroomDefense.tsx
import { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Zap, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Sparkles, 
  ChevronRight, 
  Cpu,
  RefreshCw,
  Lock,
  Globe
} from 'lucide-react';

export interface ScreenBoardroomDefenseProps {
  xp: number;
  challenges?: any[];
  onRestart: () => void;
  onBack: () => void;
  onProceedToTransfer?: () => void;
}

interface ExecutiveChallenge {
  id: number;
  executive: string;
  role: string;
  location: string;
  flag: string;
  avatarId: 'chinedu' | 'wanjiku' | 'kagiso' | 'adeyemi' | 'naledi' | 'kofi';
  objection: string;
  zawadiWhisper: string;
  options: {
    id: string;
    text: string;
    isOptimal: boolean;
    feedback: string;
    points: number;
  }[];
}

const DEFAULT_BOARD_CHALLENGES: ExecutiveChallenge[] = [
  {
    id: 1,
    executive: 'Chinedu Okafor',
    role: 'Chief Information & Technology Officer (Panel Chair)',
    location: 'Lagos, Nigeria',
    flag: 'NG',
    avatarId: 'chinedu',
    objection: '"As Chief, I answer directly to the founders for infrastructure integrity. If an Azure datacenter suffers an unpredicted power outage or fiber cut, what concrete architectural mechanism guarantees our e-commerce store does not hit a 504 Gateway Timeout?"',
    zawadiWhisper: 'Highlight Availability Zones! Independent power, cooling, and networking within the region ensure automated failover with 99.99% uptime SLAs.',
    options: [
      {
        id: 'A',
        text: 'We distribute our app across Azure Availability Zones—physically separate datacenters each with independent power, cooling, and networking—backed by automated health-probe failover.',
        isOptimal: true,
        feedback: 'Chinedu nods with conviction: "Multi-zone physical isolation with automated health probing gives us the true fault-tolerant backbone we need."',
        points: 75
      },
      {
        id: 'B',
        text: 'We will rely on Microsoft field technicians to drive replacement blades to the facility if a generator trips.',
        isOptimal: false,
        feedback: 'Chinedu frowns: "That reproduces the exact manual hardware dependency that crushed us in the basement."',
        points: 0
      },
      {
        id: 'C',
        text: 'We schedule daily backup exports to a USB drive kept in the main office.',
        isOptimal: false,
        feedback: 'A USB backup does not provide high availability or automated zero-downtime failover during an active drop.',
        points: 0
      }
    ]
  },
  {
    id: 2,
    executive: 'Wanjiku Mutua',
    role: 'VP of Global Operations',
    location: 'Nairobi, Kenya',
    flag: 'KE',
    avatarId: 'wanjiku',
    objection: '"Our regional expansion relies on shopper trust and GDPR/POPIA compliance. If we host our catalog and customer records on Microsoft Azure, who guarantees technicians cannot inspect our raffle logic or user credentials?"',
    zawadiWhisper: 'Point her directly to the Shared Responsibility Model and customer data ownership guarantees in the Microsoft Trust Center.',
    options: [
      {
        id: 'A',
        text: 'Microsoft signs an informal verbal NDA promising not to inspect our production database tables.',
        isOptimal: false,
        feedback: 'Wanjiku shakes her head: "Enterprise compliance demands formal shared responsibility boundaries and encryption guarantees, not verbal assurances."',
        points: 0
      },
      {
        id: 'B',
        text: 'Under the Shared Responsibility Model, customer data classification, identity management, and credentials remain 100% customer-owned and encrypted with our own customer-managed keys (CMK).',
        isOptimal: true,
        feedback: 'Wanjiku writes an endorsement: "Clear contractual boundaries. Microsoft maintains host isolation, while we own access policies and data encryption."',
        points: 75
      },
      {
        id: 'C',
        text: 'Microsoft takes over data classification and determines authorization rules for all end shoppers.',
        isOptimal: false,
        feedback: 'Incorrect! Under cloud governance, the customer maintains sole ownership and responsibility for customer data and access management.',
        points: 0
      }
    ]
  },
  {
    id: 3,
    executive: 'Kagiso Ndlovu',
    role: 'Financial Controller',
    location: 'Johannesburg, South Africa',
    flag: 'ZA',
    avatarId: 'kagiso',
    objection: '"You want us to pivot from our fixed basement hardware to OpEx consumption pricing. What safeguards stop runaway auto-scaling or unintended API spikes from landing us with a bankrupting invoice?"',
    zawadiWhisper: 'Remind him about Azure Cost Management, spending quotas, and automated budget threshold alerts—variable consumption is disciplined by cloud governance.',
    options: [
      {
        id: 'A',
        text: 'Cloud bills cannot be capped, but sneaker drop revenues will always outpace any unexpected cloud invoice.',
        isOptimal: false,
        feedback: 'Kagiso pushes back immediately: "Hope is not a financial strategy. Variable overhead must have hard structural ceilings."',
        points: 0
      },
      {
        id: 'B',
        text: 'We configure Azure Cost Management with automated budget alerts, hard spending limits, and resource tagging so leadership receives proactive alerts before thresholds are reached.',
        isOptimal: true,
        feedback: 'Kagiso signs the ledger: "Automated threshold alerts and spending caps give us the financial predictability I require."',
        points: 75
      },
      {
        id: 'C',
        text: 'We will disconnect the servers manually whenever we see user traffic rising above our monthly budget.',
        isOptimal: false,
        feedback: 'Kagiso frowns. Severing paying shoppers during a flash drop defeats the primary business objective.',
        points: 0
      }
    ]
  }
];

function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#10B981', '#38BDF8', '#F59E0B', '#EC4899', '#8B5CF6', '#F43F5E'];
    const particles = Array.from({ length: 90 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 90,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.floor(Math.random() * 10) - 10,
      tiltAngleIncremental: Math.random() * 0.07 + 0.05,
      tiltAngle: 0
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.tilt = Math.sin(p.tiltAngle - p.d / 3) * 15;

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();

        if (p.y > canvas.height) {
          p.x = Math.random() * canvas.width;
          p.y = -20;
          p.tilt = Math.floor(Math.random() * 10) - 10;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
}

function ExecutiveAvatar({ avatarId, state }: { avatarId: 'chinedu' | 'wanjiku' | 'kagiso' | 'adeyemi' | 'naledi' | 'kofi'; state: 'neutral' | 'approving' | 'skeptical' }) {
  const isApproving = state === 'approving';
  const isSkeptical = state === 'skeptical';

  if (avatarId === 'chinedu' || avatarId === 'adeyemi') {
    return (
      <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-600 to-indigo-900 p-1 shadow-lg shadow-sky-950/40 border border-sky-500/30 overflow-hidden shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="42" y="65" width="16" height="20" rx="4" fill="#4A2E1B" />
          <ellipse cx="50" cy="46" rx="25" ry="28" fill="#5C3A21" />
          <path d="M 33 50 Q 50 78 67 50 Q 50 72 33 50 Z" fill="#1C110A" opacity="0.8" />
          <path d="M 26 30 Q 50 18 74 30 L 71 36 Q 50 26 29 36 Z" fill="#0284C7" />
          <ellipse cx="38" cy="45" rx="3.5" ry="2.2" fill="#0F172A" />
          <ellipse cx="62" cy="45" rx="3.5" ry="2.2" fill="#0F172A" />
          <line 
            x1="31" 
            y1={isApproving ? "36" : isSkeptical ? "34" : "37"} 
            x2="45" 
            y2={isApproving ? "38" : isSkeptical ? "40" : "38"} 
            stroke="#1C110A" 
            strokeWidth="3" 
            strokeLinecap="round" 
          />
          <line 
            x1="55" 
            y1={isApproving ? "38" : isSkeptical ? "40" : "38"} 
            x2="69" 
            y2={isApproving ? "36" : isSkeptical ? "34" : "37"} 
            stroke="#1C110A" 
            strokeWidth="3" 
            strokeLinecap="round" 
          />
          <path 
            d={isApproving ? "M 41 58 Q 50 66 59 58" : isSkeptical ? "M 42 61 Q 50 57 58 60" : "M 43 60 Q 50 61 57 60"} 
            fill="none" 
            stroke="#2A170D" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
          />
          <polygon points="16,100 50,72 84,100" fill="#0369A1" />
          <line x1="50" y1="72" x2="50" y2="100" stroke="#38BDF8" strokeWidth="2" strokeDasharray="2,2" />
        </svg>
      </div>
    );
  }

  if (avatarId === 'wanjiku' || avatarId === 'naledi') {
    return (
      <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-900 p-1 shadow-lg shadow-emerald-950/40 border border-emerald-500/30 overflow-hidden shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M 20 40 Q 50 15 80 40 Q 86 28 50 18 Q 14 28 20 40 Z" fill="#10B981" />
          <ellipse cx="50" cy="28" rx="28" ry="12" fill="#059669" />
          <rect x="43" y="66" width="14" height="20" rx="3" fill="#5A3825" />
          <ellipse cx="50" cy="48" rx="24" ry="27" fill="#6B432D" />
          <circle cx="24" cy="54" r="3.5" fill="#FBBF24" />
          <circle cx="76" cy="54" r="3.5" fill="#FBBF24" />
          <ellipse cx="38" cy="46" rx="3.5" ry={isApproving ? "3" : "2"} fill="#0F172A" />
          <ellipse cx="62" cy="46" rx="3.5" ry={isApproving ? "3" : "2"} fill="#0F172A" />
          <path 
            d={isApproving ? "M 32 38 Q 38 34 44 38" : isSkeptical ? "M 32 40 Q 38 36 44 37" : "M 33 39 Q 39 36 45 39"} 
            fill="none" 
            stroke="#1C100B" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
          />
          <path 
            d={isApproving ? "M 56 38 Q 62 34 68 38" : isSkeptical ? "M 56 37 Q 62 36 68 40" : "M 55 39 Q 61 36 67 39"} 
            fill="none" 
            stroke="#1C100B" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
          />
          <path 
            d={isApproving ? "M 40 60 Q 50 68 60 60" : isSkeptical ? "M 42 62 Q 50 59 58 61" : "M 43 61 Q 50 63 57 61"} 
            fill="none" 
            stroke="#991B1B" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
          />
          <polygon points="18,100 50,78 82,100" fill="#047857" />
          <circle cx="50" cy="90" r="3" fill="#FBBF24" />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-900 p-1 shadow-lg shadow-amber-950/40 border border-amber-500/30 overflow-hidden shrink-0">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect x="42" y="65" width="16" height="20" rx="4" fill="#6B4423" />
        <ellipse cx="50" cy="46" rx="26" ry="29" fill="#7A4E29" />
        <rect x="28" y="40" width="18" height="12" rx="3" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
        <rect x="54" y="40" width="18" height="12" rx="3" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
        <line x1="46" y1="45" x2="54" y2="45" stroke="#F59E0B" strokeWidth="2.5" />
        <circle cx="37" cy="46" r="2.5" fill="#1E293B" className="animate-pulse" />
        <circle cx="63" cy="46" r="2.5" fill="#1E293B" className="animate-pulse" />
        <line 
          x1="28" 
          y1={isApproving ? "35" : isSkeptical ? "33" : "36"} 
          x2="45" 
          y2={isApproving ? "37" : isSkeptical ? "39" : "37"} 
          stroke="#2B1810" 
          strokeWidth="3" 
          strokeLinecap="round" 
        />
        <line 
          x1="55" 
          y1={isApproving ? "37" : isSkeptical ? "39" : "37"} 
          x2="72" 
          y2={isApproving ? "35" : isSkeptical ? "33" : "36"} 
          stroke="#2B1810" 
          strokeWidth="3" 
          strokeLinecap="round" 
        />
        <path 
          d={isApproving ? "M 39 60 Q 50 67 61 60" : isSkeptical ? "M 40 63 Q 50 58 60 62" : "M 41 61 Q 50 62 59 61"} 
          fill="none" 
          stroke="#3B2219" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
        />
        <polygon points="20,100 50,75 80,100" fill="#0F172A" />
        <polygon points="43,77 50,95 57,77" fill="#F59E0B" />
      </svg>
    </div>
  );
}

export function ScreenBoardroomDefense({ 
  xp, 
  challenges,
  onRestart, 
  onBack, 
  onProceedToTransfer 
}: ScreenBoardroomDefenseProps) {
  const isCustomDomain = Boolean(challenges && Array.isArray(challenges) && challenges.length > 0);

  const activeChallenges: ExecutiveChallenge[] = useMemo(() => {
    if (!isCustomDomain || !challenges) {
      return DEFAULT_BOARD_CHALLENGES;
    }

    const flagMap: Record<string, string> = {
      Kenya: '🇰🇪',
      'South Africa': '🇿🇦',
      Ghana: '🇬🇭',
      Nigeria: '🇳🇬'
    };

    const avatarMap: Record<number, 'adeyemi' | 'naledi' | 'kofi'> = {
      0: 'adeyemi',
      1: 'naledi',
      2: 'kofi'
    };

    return challenges.map((c: any, idx: number) => {
      let flag = '🌍';
      if (c.boardMemberLocation) {
        Object.keys(flagMap).forEach((country) => {
          if (c.boardMemberLocation.includes(country)) {
            flag = flagMap[country];
          }
        });
      }

      return {
        id: idx + 1,
        executive: c.boardMemberName || 'Executive',
        role: c.boardMemberRole || 'Board Member',
        location: c.boardMemberLocation || 'Regional Headquarters',
        flag,
        avatarId: avatarMap[idx % 3],
        objection: c.dialogue.startsWith('"') ? c.dialogue : `"${c.dialogue}"`,
        zawadiWhisper: c.earPieceGuidance || 'Review the core AZ-900 governance architecture principles.',
        options: (c.options || []).map((opt: any) => ({
          id: opt.id,
          text: opt.text,
          isOptimal: Boolean(opt.isOptimal),
          feedback: opt.feedback,
          points: opt.points ?? (opt.isOptimal ? 75 : 0)
        }))
      };
    });
  }, [challenges, isCustomDomain]);

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [earnedBonusXp, setEarnedBonusXp] = useState<number>(0);
  const [confidenceScore, setConfidenceScore] = useState<number>(20);
  const [defenseFinished, setDefenseFinished] = useState<boolean>(false);

  const currentChallenge = activeChallenges[currentStep] || activeChallenges[0];
  const chosenOptionId = selectedAnswers[currentChallenge.id];
  const chosenOption = currentChallenge.options.find((o) => o.id === chosenOptionId);

  const avatarState: 'neutral' | 'approving' | 'skeptical' = !chosenOption
    ? 'neutral'
    : chosenOption.isOptimal
    ? 'approving'
    : 'skeptical';

  const handleSelectOption = (optionId: string, isOptimal: boolean, points: number) => {
    if (selectedAnswers[currentChallenge.id]) return;

    setSelectedAnswers((prev) => ({ ...prev, [currentChallenge.id]: optionId }));

    if (isOptimal) {
      setEarnedBonusXp((prev) => prev + points);
      setConfidenceScore((prev) => Math.min(100, prev + 27));
    } else {
      setConfidenceScore((prev) => Math.max(10, prev - 10));
    }
  };

  const handleNextChallenge = () => {
    if (currentStep < activeChallenges.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setDefenseFinished(true);
    }
  };

  const missedChallenges = activeChallenges.filter((challenge) => {
    const answeredId = selectedAnswers[challenge.id];
    const option = challenge.options.find((o) => o.id === answeredId);
    return !option || !option.isOptimal;
  });

  const handleReviseMissed = () => {
    const updatedAnswers = { ...selectedAnswers };
    let recalculatedXp = 0;
    let recalculatedConfidence = 20;

    activeChallenges.forEach((challenge) => {
      const answeredId = selectedAnswers[challenge.id];
      const opt = challenge.options.find((o) => o.id === answeredId);
      if (opt && opt.isOptimal) {
        recalculatedXp += opt.points;
        recalculatedConfidence = Math.min(100, recalculatedConfidence + 27);
      } else {
        delete updatedAnswers[challenge.id];
      }
    });

    setSelectedAnswers(updatedAnswers);
    setEarnedBonusXp(recalculatedXp);
    setConfidenceScore(recalculatedConfidence);
    setDefenseFinished(false);

    const firstMissedIndex = activeChallenges.findIndex((challenge) => {
      const answeredId = selectedAnswers[challenge.id];
      const opt = challenge.options.find((o) => o.id === answeredId);
      return !opt || !opt.isOptimal;
    });

    setCurrentStep(firstMissedIndex !== -1 ? firstMissedIndex : 0);
  };

  const totalFinalXp = xp + earnedBonusXp;
  const isApproved = confidenceScore >= 70;

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 p-4 md:p-8 font-sans relative">
      {defenseFinished && isApproved && <ConfettiCanvas/>}

      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
          <div className="space-y-2">
            {!defenseFinished && (
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1"/>
                <span>Back to Proposal Workspace</span>
              </button>
            )}

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5"/> Stage 6: Boardroom Cross-Examination
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {isCustomDomain ? 'Domain 3: Governance, Security & Management Capstone' : 'Domain 1: Cloud Computing Concepts Capstone'}
                </span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white">
                {isCustomDomain ? 'Pan-African Governance Boardroom Defense' : 'Executive Modernization Charter Defense'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-800 shadow-md">
            <Zap className="w-4 h-4 fill-amber-400 text-amber-400"/>
            <span className="text-amber-400 font-bold text-sm">{totalFinalXp} XP</span>
          </div>
        </div>

        {!defenseFinished ? (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400"/>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    C-Suite Confidence Meter
                  </span>
                </div>
                <span className={`text-xs font-bold font-mono ${confidenceScore >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {confidenceScore}% Board Consensus
                </span>
              </div>

              <div className="w-full bg-slate-950 rounded-full h-3 p-0.5 border border-slate-800 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    confidenceScore >= 70 ? 'bg-gradient-to-r from-teal-500 to-emerald-400' : 'bg-gradient-to-r from-amber-500 to-orange-400'
                  }`}
                  style={{ width: `${confidenceScore}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Executive {currentStep + 1} of {activeChallenges.length}</span>
                <span>Unanimous Charter Threshold: 70%</span>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-4">
                  <ExecutiveAvatar avatarId={currentChallenge.avatarId} state={avatarState}/>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">{currentChallenge.executive}</h3>
                      <span className="text-xs font-mono font-bold bg-slate-800 px-2 py-0.5 rounded text-slate-300">{currentChallenge.flag}</span>
                    </div>
                    <p className="text-xs text-sky-400 font-semibold">{currentChallenge.role}</p>
                    <p className="text-[11px] text-slate-400 font-medium">{currentChallenge.location}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800 block">
                    Challenge {currentChallenge.id}/{activeChallenges.length}
                  </span>
                  {chosenOption && (
                    <span className={`text-[10px] font-bold mt-1 inline-block ${
                      chosenOption.isOptimal ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {chosenOption.isOptimal ? 'Satisfied [Passed]' : 'Skeptical [Failed]'}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Stakeholder Cross-Examination</span>
                <p className="text-sm font-semibold text-slate-100 italic leading-relaxed">
                  {currentChallenge.objection}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"/>
                <div className="space-y-0.5 text-xs">
                  <p className="font-bold text-emerald-400">Zawadi&apos;s Ear-Piece Guidance:</p>
                  <p className="text-slate-300 leading-relaxed">{currentChallenge.zawadiWhisper}</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Your Strategic Defense:</p>

                {currentChallenge.options.map((opt) => {
                  const isSelected = selectedAnswers[currentChallenge.id] === opt.id;
                  const hasAnswered = !!selectedAnswers[currentChallenge.id];

                  let cardStyle = 'border-slate-800 bg-slate-950/60 hover:border-slate-700';
                  if (hasAnswered) {
                    if (opt.isOptimal) {
                      cardStyle = 'border-emerald-500/70 bg-emerald-950/20 text-emerald-200';
                    } else if (isSelected && !opt.isOptimal) {
                      cardStyle = 'border-red-500/60 bg-red-950/20 text-red-200';
                    } else {
                      cardStyle = 'border-slate-800/40 bg-slate-950/30 opacity-40';
                    }
                  }

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id, opt.isOptimal, opt.points)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${cardStyle}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 text-slate-300">
                          {opt.id}
                        </span>
                        <div className="space-y-2 flex-1">
                          <p className="text-xs sm:text-sm font-medium leading-relaxed">
                            {opt.text}
                          </p>

                          {hasAnswered && (isSelected || opt.isOptimal) && (
                            <div className={`text-xs pt-2 border-t border-slate-800 flex items-start gap-2 ${
                              opt.isOptimal ? 'text-emerald-400' : 'text-red-400'
                            }`}>
                              {opt.isOptimal ? <CheckCircle2 className="w-4 h-4 shrink-0"/> : <AlertTriangle className="w-4 h-4 shrink-0"/>}
                              <span>{opt.feedback}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedAnswers[currentChallenge.id] && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextChallenge}
                    className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 text-xs transition cursor-pointer shadow-lg shadow-emerald-500/20"
                  >
                    {currentStep < activeChallenges.length - 1 ? 'Proceed to Next Executive' : 'View Executive Final Verdict'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl space-y-8 text-center relative z-10">
            <div className="space-y-3">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-xl ${
                isApproved 
                  ? 'bg-gradient-to-br from-amber-400 to-emerald-500 shadow-emerald-500/20' 
                  : 'bg-gradient-to-br from-amber-500 to-red-500 shadow-amber-500/20'
              }`}>
                {isApproved ? <Award className="w-8 h-8 text-slate-950"/> : <AlertTriangle className="w-8 h-8 text-slate-950"/>}
              </div>
              
              <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                isApproved 
                  ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' 
                  : 'text-amber-400 bg-amber-500/10 border-amber-500/30'
              }`}>
                {isApproved 
                  ? (isCustomDomain ? 'Domain 3: Governance, Security & Management Complete' : 'Domain 1: Cloud Computing Concepts Capstone Complete') 
                  : 'Consensus Below 70% Threshold'}
              </span>

              <h3 className="text-2xl md:text-3xl font-black text-white">
                {isApproved 
                  ? (isCustomDomain ? 'Governance Charter Signed! Pan-African Subscriptions Secured' : 'Proposal Approved! Modernization Charter Signed') 
                  : 'Executive Consensus Withheld'}
              </h3>

              <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                {isApproved 
                  ? (isCustomDomain 
                      ? 'Prof. Adeyemi (Finance), Advocate Naledi Khumalo (Legal), and Kofi Mensah (CISO) have signed off unanimously on the EduBridge Governance Charter. Policies, locks, and RBAC guardrails are now locked across all 12 African nations.' 
                      : 'Chief Chinedu Okafor (CITO), Wanjiku Mutua (VP Operations), and Kagiso Ndlovu (Financial Controller) have signed off unanimously on Project SoleSpace. Basement hardware is decommissioned and the Azure PaaS transition begins.')
                  : `You reached ${confidenceScore}% consensus, but the executive panel requires at least 70% unanimous consensus before signing off on the cloud transfer order. Several executives remain skeptical of your risk and cost governance arguments.`}
              </p>
            </div>

            {!isApproved && missedChallenges.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-left space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <AlertTriangle className="w-4 h-4 shrink-0"/>
                  <span>Skeptical Stakeholders Requiring Strategic Revision ({missedChallenges.length})</span>
                </div>
                <div className="space-y-2">
                  {missedChallenges.map((challenge) => (
                    <div key={challenge.id} className="text-xs bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
                      <span className="font-mono font-bold text-amber-400">[{challenge.flag}]</span>
                      <div>
                        <span className="font-bold text-white">{challenge.executive} ({challenge.role}): </span>
                        <span className="text-slate-300">{challenge.zawadiWhisper}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Board Consensus</span>
                <p className={`text-2xl font-black ${isApproved ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {confidenceScore}%
                </p>
                <p className="text-[11px] text-slate-400">
                  {isApproved ? 'Panel threshold exceeded (>=70%)' : 'Minimum 70% required to graduate'}
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Total Career XP</span>
                <p className="text-2xl font-black text-amber-400">{totalFinalXp} XP</p>
                <p className="text-[11px] text-slate-400">Azure Architecture Associate Rank</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">AZ-900 Competency</span>
                <p className="text-2xl font-black text-sky-400">
                  {isApproved 
                    ? (isCustomDomain ? 'Domain 3 (100%)' : 'Domain 1 (100%)') 
                    : 'In Progress'}
                </p>
                <p className="text-[11px] text-slate-400">
                  {isCustomDomain ? 'Governance, Security & Management' : 'Cloud Computing Concepts'}
                </p>
              </div>
            </div>

            {isApproved && (
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3 text-left">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400"/>
                  Badges &amp; Credentials Unlocked
                </span>
                <div className="flex flex-wrap gap-2">
                  {isCustomDomain ? (
                    <>
                      <span className="text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5" /> Sovereign Data Guardian
                      </span>
                      <span className="text-xs bg-amber-500/10 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" /> Resource Lock Protector
                      </span>
                      <span className="text-xs bg-sky-500/10 text-sky-300 border border-sky-500/30 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" /> Zero Trust RBAC Enforcer
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" /> OpEx Financial Strategist
                      </span>
                      <span className="text-xs bg-sky-500/10 text-sky-300 border border-sky-500/30 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5" /> High Availability Architect
                      </span>
                      <span className="text-xs bg-purple-500/10 text-purple-300 border border-purple-500/30 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5" /> Boardroom Defender
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-800">
              <button
                onClick={onRestart}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4"/> Restart Entire Simulation Track
              </button>

              {!isApproved ? (
                <button
                  onClick={handleReviseMissed}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <RefreshCw className="w-4 h-4"/>
                  <span>Revise Suboptimal Arguments ({missedChallenges.length} Missed)</span>
                </button>
              ) : (
                onProceedToTransfer && (
                  <button
                    onClick={onProceedToTransfer}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                  >
                    <span>Accept Transfer &amp; Complete Domain (+250 XP)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScreenBoardroomDefense;