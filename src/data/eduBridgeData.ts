// Self-contained interfaces matching ScreenBoardroomDefense structure
export interface ExecutiveChallengeOption {
  id: string;
  text: string;
  isOptimal: boolean;
  feedback: string;
  points: number;
}

export interface ExecutiveChallenge {
  id: string;
  boardMemberName: string;
  boardMemberRole: string;
  boardMemberLocation?: string;
  avatarUrl?: string;
  challengeTitle?: string;
  dialogue: string;
  earPieceGuidance?: string;
  options: ExecutiveChallengeOption[];
}

// 1. STAGE 1: TECHNICAL DESK BRIEFING (ScreenDecision.tsx)
export const EDUBRIDGE_DECISION_DATA = {
  stageTitle: "STAGE 1: CRISIS BRIEFING & STRATEGIC DIRECTION",
  domainTitle: "Domain 3: Azure Governance, Security & Management",
  companyName: "EduBridge Academy",
  incidentReport:
    "EduBridge is expanding across 12 African countries. Decentralized departments and remote educators have provisioned unmanaged VMs, exposing student records and triggering runaway cloud spend without central guardrails.",
  requiredReading: [
    {
      title: "Azure Management Groups",
      badge: "HIERARCHY & SCOPE",
      concept: "Containers that manage access, policies, and compliance across multiple subscriptions efficiently.",
      application: "Organizes 12 national campus accounts under one centralized root policy framework."
    },
    {
      title: "Azure Policy & Guardrails",
      badge: "AUTOMATED ENFORCEMENT",
      concept: "Enforces organizational standards and assesses compliance at scale through programmatic rules.",
      application: "Blocks rogue deployments outside compliant African data regions before servers start."
    },
    {
      title: "Microsoft Entra ID & RBAC",
      badge: "IDENTITY & ZERO TRUST",
      concept: "Fine-grained access control based on least privilege and verifiable identities, eliminating shared credentials.",
      application: "Ensures teaching assistants only access grading tools, not production infrastructure."
    }
  ],
  options: [
    {
      id: "recommended",
      type: "RECOMMENDED STRATEGY (CORRECT CHOICE)",
      text: "Deploy Azure Management Groups and enforce Azure Policies at the root scope. Restrict resource creation strictly to compliant African regions and mandate tag-based budget quotas. This preserves faculty autonomy while establishing automated guardrails.",
      isCorrect: true
    },
    {
      id: "trap",
      type: "TRADITIONAL TRAP (INCORRECT)",
      text: "Lock down cloud access completely and require faculty to submit paper requisitions for IT to manually build each server, keeping root passwords shared on a sticky note.",
      isCorrect: false
    }
  ]
};

// 2. STAGE 2: INTERN STUDY LAB (ScreenStudyLab.tsx)
export const EDUBRIDGE_STUDY_LAB_UNITS = [
  {
    id: "unit-1",
    unitNumber: "01",
    title: "Management Groups & Hierarchy",
    notes: "Azure Management Groups provide a level of scope above subscriptions. If you apply policies or access controls at the Management Group level, all subscriptions nested beneath automatically inherit them.",
    analogy: "A central university senate establishing academic rules that automatically apply to every department and classroom under it.",
    incidentBridge: "EduBridge's sprawling decentralized campus accounts need unified oversight without managing individual subscriptions one by one.",
    terms: [
      { name: "Root Management Group", definition: "Top-level container where global policies cascade downward." },
      { name: "Subscription", definition: "A billing and management boundary in Azure." },
      { name: "Inheritance", definition: "Child resources automatically receiving policies applied at parent levels." }
    ],
    checkpoint: {
      question: "How does EduBridge enforce a single data residency rule across 20 distinct campus subscriptions simultaneously?",
      options: [
        { id: "A", text: "Manually configure the rule inside every single virtual machine.", isCorrect: false },
        { id: "B", text: "Assign the Azure Policy at the parent Management Group level.", isCorrect: true }
      ]
    }
  },
  {
    id: "unit-2",
    unitNumber: "02",
    title: "Azure Policy vs. Resource Locks",
    notes: "Azure Policy enforces rules (e.g., allowed locations, disallowed VM sizes) during creation. Resource Locks (CanNotDelete or ReadOnly) protect existing, deployed critical resources from accidental deletion or modification.",
    analogy: "A policy is a building code saying 'no fireworks allowed'; a resource lock is a padlock on the primary fire suppression switch so no one shuts it off by accident.",
    incidentBridge: "A junior developer nearly deleted the primary national student registry database during a routine cleanup.",
    terms: [
      { name: "Azure Policy", definition: "Enforces rules on resource properties during deployment and runtime." },
      { name: "CanNotDelete Lock", definition: "Authorized users can read and modify a resource, but cannot delete it." },
      { name: "ReadOnly Lock", definition: "Authorized users can read a resource, but cannot modify or delete it." }
    ],
    checkpoint: {
      question: "What technical safeguard prevents a system administrator from accidentally deleting the production student transcript database?",
      options: [
        { id: "A", text: "A CanNotDelete Resource Lock applied to the database resource group.", isCorrect: true },
        { id: "B", text: "A stern warning memo posted in the staff communication channel.", isCorrect: false }
      ]
    }
  },
  {
    id: "unit-3",
    unitNumber: "03",
    title: "Entra ID & Role-Based Access Control",
    notes: "Microsoft Entra ID handles user identity and Multi-Factor Authentication (MFA). Azure RBAC applies the Principle of Least Privilege by assigning roles (Owner, Contributor, Reader) only to the specific scope required.",
    analogy: "University electronic keycards where teaching assistants can unlock their classroom doors, but only the Registrar can certify and edit graduation degrees.",
    incidentBridge: "EduBridge had faculty assistants sharing a master root password to manage classroom lab VMs.",
    terms: [
      { name: "Microsoft Entra ID", definition: "Cloud-based identity and access management service." },
      { name: "Azure RBAC", definition: "Fine-grained management of access rights to Azure resources." },
      { name: "Least Privilege", definition: "Providing only the minimal access needed to perform a job." }
    ],
    checkpoint: {
      question: "What is the recommended Azure approach to let tutors grade student submissions without granting them rights to delete the VM?",
      options: [
        { id: "A", text: "Give all tutors the master Subscription Owner password.", isCorrect: false },
        { id: "B", text: "Assign an RBAC Reader or custom role scoped strictly to the student resource group.", isCorrect: true }
      ]
    }
  },
  {
    id: "unit-4",
    unitNumber: "04",
    title: "Cost Management & Resource Tagging",
    notes: "Resource Tags are key-value metadata pairs attached to resources (e.g., 'Department: STEM', 'Campus: Nairobi'). Azure Cost Management reads these tags to track expenses, generate reports, and trigger automated budget threshold alerts.",
    analogy: "An itemized receipt for a shared department dinner showing exactly what each table ordered rather than splitting the bill blind.",
    incidentBridge: "EduBridge ran over budget because campus departments could not identify which faculty was spinning up costly GPU instances.",
    terms: [
      { name: "Resource Tagging", definition: "Metadata labels (key-value pairs) for logical organization and cost grouping." },
      { name: "Budget Alerts", definition: "Automated notifications triggered when spending reaches designated percentages." },
      { name: "Cost Center", definition: "An accounting unit for attributing IT infrastructure costs." }
    ],
    checkpoint: {
      question: "How can EduBridge leadership determine exactly how much cloud expenditure is generated by the Engineering faculty?",
      options: [
        { id: "A", text: "Apply a 'Department: Engineering' resource tag and monitor spend in Azure Cost Management.", isCorrect: true },
        { id: "B", text: "Shut down all servers at the end of every week and calculate lost revenue.", isCorrect: false }
      ]
    }
  }
];

// 3. STAGE 4: BOARDROOM PANIC MATCHER (ScreenGlossaryDefinition.tsx)
export const EDUBRIDGE_PANIC_MATCHER_DATA = {
  concerns: [
    {
      id: "concern-1",
      stakeholder: "Dean Ochieng (Faculty Dean)",
      quote: "Our research teams are launching compute instances across four continents and blowing our quarterly grant in 10 days! How do we stop this?",
      matchedRemedy: "Budget Alerts & Quotas"
    },
    {
      id: "concern-2",
      stakeholder: "Dr. Fatima (Data Protection Lead)",
      quote: "Student transcripts cannot legally leave sovereign borders. What stops a contractor from provisioning a database in North America?",
      matchedRemedy: "Azure Policy"
    },
    {
      id: "concern-3",
      stakeholder: "Musa (Lab Coordinator)",
      quote: "A student intern clicked 'delete' on our shared course resource group right before exam week! How do we make sure that never happens again?",
      matchedRemedy: "Resource Locks"
    },
    {
      id: "concern-4",
      stakeholder: "Amina (IT Auditor)",
      quote: "Everyone in the faculty has root admin access because nobody knew how to give partial rights. We are failing our compliance audit!",
      matchedRemedy: "Role-Based Access Control (RBAC)"
    }
  ],
  remedies: [
    {
      name: "Azure Policy",
      category: "COMPLIANCE GUARDRAIL",
      description: "Enforces rules on resource properties, automatically rejecting deployments outside allowed African regions.",
      trapNote: "AZ-900 Trap: Azure Policy prevents non-compliant deployments; it does not assign user access rights."
    },
    {
      name: "Resource Locks",
      category: "DATA INTEGRITY",
      description: "Places CanNotDelete protections on mission-critical databases so accidental deletion requests are blocked.",
      trapNote: "AZ-900 Trap: Resource Locks apply to resources regardless of what high-level RBAC role an administrator holds."
    },
    {
      name: "Role-Based Access Control (RBAC)",
      category: "ACCESS GOVERNANCE",
      description: "Applies the principle of least privilege, providing granular access permissions without sharing administrator accounts.",
      trapNote: "AZ-900 Trap: RBAC manages user authorization; Entra ID manages user authentication."
    },
    {
      name: "Budget Alerts & Quotas",
      category: "FINANCIAL GOVERNANCE",
      description: "Tracks expenditure against departmental resource tags and triggers automated warnings when reaching spending limits.",
      trapNote: "AZ-900 Trap: Budget alerts notify stakeholders; they do not automatically shut down production services unless scripted."
    }
  ]
};

// 4. STAGE 5: PROPOSAL WORKSPACE (ScreenProposalWorkspace.tsx)
export const EDUBRIDGE_PROPOSAL_DATA = {
  charterTitle: "EduBridge Pan-African Governance Charter",
  clauses: [
    {
      id: "clause-1",
      title: "1. Policy & Regional Compliance",
      prompt: "How should EduBridge enforce regional data residency across all campus accounts?",
      options: [
        {
          text: "Enforce Azure Policy across the Root Management Group restricting deployments strictly to compliant African regions.",
          impact: "Automated sovereign compliance; prevents unauthorized overseas deployments."
        },
        {
          text: "Request staff to sign an annual compliance pledge promising not to deploy abroad.",
          impact: "High risk of human error and regulatory penalties."
        }
      ]
    },
    {
      id: "clause-2",
      title: "2. Identity & Access Governance",
      prompt: "How should EduBridge manage credentials and permissions for 300+ educators and tutors?",
      options: [
        {
          text: "Migrate all staff to Microsoft Entra ID with mandatory MFA and scoped RBAC roles (Least Privilege).",
          impact: "Eliminates shared passwords; provides complete audit logging."
        },
        {
          text: "Maintain a shared administrator password and change it at the end of each semester.",
          impact: "Severe credential exposure and failure of basic compliance audits."
        }
      ]
    },
    {
      id: "clause-3",
      title: "3. Accidental Deletion & Core Protection",
      prompt: "How should EduBridge safeguard primary student registration databases?",
      options: [
        {
          text: "Apply CanNotDelete Resource Locks on all production student database resource groups.",
          impact: "Guarantees zero accidental deletions, even from high-privilege administrators."
        },
        {
          text: "Instruct administrators to create local database backup files on desktop PCs.",
          impact: "Exposes private student data to physical theft and data leaks."
        }
      ]
    }
  ],
  dossierSummary: {
    unmanagedRisk: "R 380,000 / month cost sprawl + regulatory compliance penalties",
    governedArchitecture: "R 64,000 / month predictable capped budget + 100% sovereign compliance"
  }
};

// 5. STAGE 6: BOARDROOM DEFENSE (ScreenBoardroomDefense.tsx)
export const EDUBRIDGE_BOARD_CHALLENGES: ExecutiveChallenge[] = [
  {
    id: "edubridge-challenge-1",
    boardMemberName: "Prof. Adeyemi",
    boardMemberRole: "Vice Chancellor & Head of Finance",
    boardMemberLocation: "Nairobi, Kenya",
    avatarUrl: "/avatars/prof_adeyemi.svg",
    challengeTitle: "Cross-Border Sovereign Compliance",
    dialogue:
      "EduBridge holds sensitive student records across 12 countries. If a remote campus lecturer deploys student databases to an unauthorized overseas datacenter, we face severe regulatory fines. How does your architecture guarantee this will never happen?",
    earPieceGuidance:
      "Advise him on Azure Policy! Policies enforce programmatic rules at deployment time, physically blocking non-compliant regions.",
    options: [
      {
        id: "A",
        text: "We enforce an Azure Policy at the Management Group level that explicitly restricts resource deployments solely to approved African Azure regions.",
        isOptimal: true,
        feedback:
          'Prof. Adeyemi signs the governance charter: "Excellent. Programmatic policy enforcement stops unauthorized deployments at the API layer before a single byte of student data is exposed."',
        points: 75
      },
      {
        id: "B",
        text: "We will distribute a PDF guideline to all faculty members asking them to manually double-check their region dropdown before clicking create.",
        isOptimal: false,
        feedback:
          'Prof. Adeyemi pushes back immediately: "Manual human guidelines are not security. One accidental misclick ruins our regulatory compliance."',
        points: 0
      },
      {
        id: "C",
        text: "We instruct Microsoft support to block all overseas internet traffic into our university portal.",
        isOptimal: false,
        feedback:
          'Prof. Adeyemi frowns: "Blocking overseas traffic isolates our international research partners and distance learners."',
        points: 0
      }
    ]
  },
  {
    id: "edubridge-challenge-2",
    boardMemberName: "Advocate Naledi Khumalo",
    boardMemberRole: "Chief Legal & Data Privacy Officer",
    boardMemberLocation: "Johannesburg, South Africa",
    avatarUrl: "/avatars/advocate_naledi.svg",
    challengeTitle: "Accidental Erasure of Academic Records",
    dialogue:
      "A rogue automated script or an overwhelmed junior administrator could accidentally issue a delete command on our central final-year student transcript database. What technical safeguard prevents this catastrophic disaster?",
    earPieceGuidance:
      "Remind her about Resource Locks! A CanNotDelete lock protects critical databases even if an administrator has delete permissions.",
    options: [
      {
        id: "A",
        text: "We apply CanNotDelete Resource Locks directly to the production database and its parent resource group, requiring explicit multi-step lock removal before deletion.",
        isOptimal: true,
        feedback:
          'Advocate Naledi nods with satisfaction: "That gives legal the peace of mind we require. Accidental deletions and rogue cleanup scripts are completely nullified."',
        points: 75
      },
      {
        id: "B",
        text: "We tell administrators to make copies of the database files on their local office laptops every Friday.",
        isOptimal: false,
        feedback:
          'Advocate Naledi raises her voice: "Storing student records on unencrypted staff laptops creates a catastrophic privacy breach under data protection law!"',
        points: 0
      },
      {
        id: "C",
        text: "We rename the database to something obscure so automated scripts will not be able to identify it.",
        isOptimal: false,
        feedback:
          'Advocate Naledi shakes her head: "Security through obscurity is a failed practice. We need enterprise-grade access locks."',
        points: 0
      }
    ]
  },
  {
    id: "edubridge-challenge-3",
    boardMemberName: "Kofi Mensah",
    boardMemberRole: "Chief Information Security Officer (CISO)",
    boardMemberLocation: "Accra, Ghana",
    avatarUrl: "/avatars/kofi_ciso.svg",
    challengeTitle: "Identity, Credentials & Least Privilege",
    dialogue:
      "Currently, teaching assistants, department heads, and outside vendors all share one master administrator account to manage class virtual labs. How do you clean up this identity nightmare without halting daily teaching?",
    earPieceGuidance:
      "Zero Trust and RBAC! Pitch Microsoft Entra ID with Role-Based Access Control and Multi-Factor Authentication to enforce least privilege.",
    options: [
      {
        id: "A",
        text: "We transition all staff to individual Microsoft Entra ID accounts, enforce Multi-Factor Authentication, and assign granular RBAC roles so staff only access the specific lab resources their role requires.",
        isOptimal: true,
        feedback:
          'Kofi smiles and commends the posture: "Textbook Zero Trust implementation. Role-Based Access Control completely eliminates shared credentials while maintaining strict audit trails."',
        points: 75
      },
      {
        id: "B",
        text: "We create a secret group chat and change the shared master password at the end of each academic semester.",
        isOptimal: false,
        feedback:
          'Kofi crosses his arms: "Shared root credentials in a group chat violate every known cybersecurity standard."',
        points: 0
      },
      {
        id: "C",
        text: "We remove all login requirements and restrict portal access strictly to individuals physically connected to campus Wi-Fi.",
        isOptimal: false,
        feedback:
          'Kofi pushes back: "That completely blocks all our remote distance learners across Africa from accessing their classes."',
        points: 0
      }
    ]
  }
];