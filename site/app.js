// ── Constants ──
const TODAY = '2026-06-01';

function daysAgo(n) {
  const d = new Date(TODAY);
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}


const STATE_COLORS = {
  'KYB Form Pending':  'gray',
  'KYB Submitted':     'blue',
  'KYB Review':        'blue',
  'Waiting Customer':  'orange',
  'Compliance Review': 'purple',
  'EDD':               'red',
  'Approved':          'green',
  'Rejected':          'red',
  'Abandoned':         'gray',
};

const BLOCKER_CODES = {
  A: 'Document quality',
  B: 'Document completeness',
  C: 'Translation required',
  D: 'Ownership transparency',
  E: 'Source of funds / wealth',
  F: 'Business activity verification',
  G: 'Regulatory / risk concern',
  H: 'Internal process issue',
};

const TERMINAL_STATES = ['Approved', 'Rejected', 'Abandoned'];

const ABANDONED_REASONS = [
  'No Response',
  'Customer Not Interested',
  'Unable To Provide Documents',
  'Business Not Eligible',
  'Chose Other Provider',
  'Unknown',
];

// ── V1 Team ──
const KYB_TEAM       = ['Arianna', 'Charlotte'];
const COMPLIANCE_TEAM = ['XinTing', 'Chung Yee', 'SG Compliance'];

// ── Demo cases ──
const CASES = [
  {
    id: 'KYB-001',
    customerName: 'David Chen',
    companyName: 'Acme Trading Ltd',
    rmOwner: 'Selina Chang',
    registrationDate: daysAgo(19),
    currentState: 'KYB Review',
    stateEntryDate: daysAgo(6),
    previousState: 'KYB Submitted',
    kybReviewer: 'Arianna',
    kybChecker: 'Charlotte',
    complianceReviewer: null,
    complianceChecker: null,
    triggeredBy: null,
    blockerCategories: [],
    blockerNotes: '',
    customerResponded: false,
    responseDate: null,
    waitingRound: 0,
    lastCustomerContact: daysAgo(14),
    contactAttempts: 1,
    nextFollowupDate: daysAgo(-1),
    kybSubmissionDate: daysAgo(15),
    complianceStartDate: null,
    decisionDate: null,
    abandonedReason: null,
    caseNotes: 'Large trading company with 4 UBOs. Requires comprehensive document review.',
    priorityFlag: true,
    activityLog: [
      { ts: daysAgo(19) + ' 09:12', type: 'State Changed', color: 'blue', desc: 'State changed: KYB Form Pending → KYB Submitted by Selina Chang', actor: 'Selina Chang' },
      { ts: daysAgo(6) + ' 10:30', type: 'State Changed', color: 'blue', desc: 'State changed: KYB Submitted → KYB Review by Arianna', actor: 'Arianna' },
      { ts: daysAgo(6) + ' 14:05', type: 'Reviewer Note', color: 'gray', desc: 'UBO structure requires clarification on 3 beneficial owners. Reviewing corporate chain.', actor: 'Arianna' },
    ],
  },
  {
    id: 'KYB-002',
    customerName: 'Mei Lin',
    companyName: 'Bright Future Corp',
    rmOwner: 'Selina Chang',
    registrationDate: daysAgo(22),
    currentState: 'Waiting Customer',
    stateEntryDate: daysAgo(9),
    previousState: 'KYB Review',
    kybReviewer: 'Arianna',
    kybChecker: 'Charlotte',
    complianceReviewer: null,
    complianceChecker: null,
    triggeredBy: 'KYB',
    blockerCategories: ['A', 'B'],
    blockerNotes: 'Bank statement is a screenshot (not PDF). Incorporation cert missing signature page.',
    customerResponded: false,
    responseDate: null,
    waitingRound: 2,
    lastCustomerContact: daysAgo(3),
    contactAttempts: 3,
    nextFollowupDate: daysAgo(3),
    kybSubmissionDate: daysAgo(18),
    complianceStartDate: null,
    decisionDate: null,
    abandonedReason: null,
    caseNotes: 'Second waiting round. Customer has been slow to respond.',
    priorityFlag: false,
    activityLog: [
      { ts: daysAgo(22) + ' 11:00', type: 'State Changed', color: 'blue', desc: 'State changed: KYB Form Pending → KYB Submitted by Selina Chang', actor: 'Selina Chang' },
      { ts: daysAgo(18) + ' 09:45', type: 'State Changed', color: 'blue', desc: 'State changed: KYB Submitted → KYB Review by Arianna', actor: 'Arianna' },
      { ts: daysAgo(13) + ' 15:30', type: 'State Changed', color: 'orange', desc: 'State changed: KYB Review → Waiting Customer (Round 1) — Blockers: A, B', actor: 'Arianna' },
      { ts: daysAgo(11) + ' 10:00', type: 'Customer Contacted', color: 'gray', desc: 'Customer contact attempt 1. Left voicemail and sent follow-up email.', actor: 'Selina Chang' },
      { ts: daysAgo(9) + ' 14:15', type: 'Customer Responded', color: 'green', desc: 'Customer responded — documents received.', actor: 'Selina Chang' },
      { ts: daysAgo(9) + ' 15:00', type: 'State Changed', color: 'blue', desc: 'State changed: Waiting Customer → KYB Review by Arianna', actor: 'Arianna' },
      { ts: daysAgo(9) + ' 15:35', type: 'State Changed', color: 'orange', desc: 'State changed: KYB Review → Waiting Customer (Round 2) — Blockers: A, B. Bank statement still invalid.', actor: 'Arianna' },
      { ts: daysAgo(3) + ' 09:00', type: 'Customer Contacted', color: 'gray', desc: 'Customer contact attempt 3. Sent reminder with specific document checklist.', actor: 'Selina Chang' },
    ],
  },
  {
    id: 'KYB-003',
    customerName: 'Anna Ng',
    companyName: 'Global Ventures HK',
    rmOwner: 'Selina Chang',
    registrationDate: daysAgo(14),
    currentState: 'Compliance Review',
    stateEntryDate: daysAgo(2),
    previousState: 'KYB Review',
    kybReviewer: 'Arianna',
    kybChecker: 'Charlotte',
    complianceReviewer: 'XinTing',
    complianceChecker: 'Chung Yee',
    triggeredBy: null,
    blockerCategories: [],
    blockerNotes: '',
    customerResponded: false,
    responseDate: null,
    waitingRound: 0,
    lastCustomerContact: null,
    contactAttempts: 0,
    nextFollowupDate: null,
    kybSubmissionDate: daysAgo(12),
    complianceStartDate: daysAgo(2),
    decisionDate: null,
    abandonedReason: null,
    caseNotes: 'Clean file so far. HK-registered entity, PEP screening pending.',
    priorityFlag: false,
    activityLog: [
      { ts: daysAgo(14) + ' 08:30', type: 'State Changed', color: 'blue', desc: 'State changed: KYB Form Pending → KYB Submitted by Selina Chang', actor: 'Selina Chang' },
      { ts: daysAgo(12) + ' 10:00', type: 'State Changed', color: 'blue', desc: 'State changed: KYB Submitted → KYB Review by Arianna', actor: 'Arianna' },
      { ts: daysAgo(2) + ' 11:20', type: 'State Changed', color: 'purple', desc: 'State changed: KYB Review → Compliance Review by Charlotte', actor: 'Charlotte' },
      { ts: daysAgo(2) + ' 11:25', type: 'Reviewer Note', color: 'gray', desc: 'KYB complete. Escalating to Compliance for PEP screening and source of funds verification.', actor: 'Charlotte' },
    ],
  },
  {
    id: 'KYB-004',
    customerName: 'Robert Ho',
    companyName: 'SunTech Solutions',
    rmOwner: 'Selina Chang',
    registrationDate: daysAgo(8),
    currentState: 'KYB Submitted',
    stateEntryDate: daysAgo(4),
    previousState: 'KYB Form Pending',
    kybReviewer: null,
    kybChecker: null,
    complianceReviewer: null,
    complianceChecker: null,
    triggeredBy: null,
    blockerCategories: [],
    blockerNotes: '',
    customerResponded: false,
    responseDate: null,
    waitingRound: 0,
    lastCustomerContact: null,
    contactAttempts: 0,
    nextFollowupDate: null,
    kybSubmissionDate: daysAgo(4),
    complianceStartDate: null,
    decisionDate: null,
    abandonedReason: null,
    caseNotes: 'Tech startup. Documents appear complete at submission.',
    priorityFlag: false,
    activityLog: [
      { ts: daysAgo(8) + ' 14:00', type: 'State Changed', color: 'blue', desc: 'State changed: KYB Form Pending → KYB Submitted by Selina Chang', actor: 'Selina Chang' },
    ],
  },
  {
    id: 'KYB-005',
    customerName: 'Linda Koo',
    companyName: 'Pacific Import Co',
    rmOwner: 'Selina Chang',
    registrationDate: daysAgo(18),
    currentState: 'Waiting Customer',
    stateEntryDate: daysAgo(3),
    previousState: 'Compliance Review',
    kybReviewer: 'Arianna',
    kybChecker: 'Charlotte',
    complianceReviewer: 'XinTing',
    complianceChecker: 'Chung Yee',
    triggeredBy: 'Compliance',
    blockerCategories: ['D', 'E'],
    blockerNotes: 'UBO declaration form incomplete. Source of wealth documentation insufficient for transaction volume.',
    customerResponded: true,
    responseDate: daysAgo(1),
    waitingRound: 1,
    lastCustomerContact: daysAgo(2),
    contactAttempts: 2,
    nextFollowupDate: daysAgo(1),
    kybSubmissionDate: daysAgo(16),
    complianceStartDate: daysAgo(7),
    decisionDate: null,
    abandonedReason: null,
    caseNotes: 'Import business with complex ownership. Compliance flagged UBO and source of funds.',
    priorityFlag: true,
    activityLog: [
      { ts: daysAgo(18) + ' 10:00', type: 'State Changed', color: 'blue', desc: 'State changed: KYB Form Pending → KYB Submitted by Selina Chang', actor: 'Selina Chang' },
      { ts: daysAgo(16) + ' 09:30', type: 'State Changed', color: 'blue', desc: 'State changed: KYB Submitted → KYB Review by Arianna', actor: 'Arianna' },
      { ts: daysAgo(9) + ' 16:00', type: 'State Changed', color: 'purple', desc: 'State changed: KYB Review → Compliance Review by Charlotte', actor: 'Charlotte' },
      { ts: daysAgo(3) + ' 14:00', type: 'State Changed', color: 'orange', desc: 'State changed: Compliance Review → Waiting Customer (Round 1) — Blockers: D, E', actor: 'XinTing' },
      { ts: daysAgo(2) + ' 11:00', type: 'Customer Contacted', color: 'gray', desc: 'Customer contact attempt 2. Customer confirmed documents are being prepared.', actor: 'Selina Chang' },
      { ts: daysAgo(1) + ' 09:15', type: 'Customer Responded', color: 'green', desc: 'Customer responded — new documents submitted. Awaiting Compliance pickup.', actor: 'Selina Chang' },
    ],
  },
  {
    id: 'KYB-006',
    customerName: 'James Lau',
    companyName: 'Meridian Finance',
    rmOwner: 'Selina Chang',
    registrationDate: daysAgo(28),
    currentState: 'EDD',
    stateEntryDate: daysAgo(7),
    previousState: 'Compliance Review',
    kybReviewer: 'Arianna',
    kybChecker: 'Charlotte',
    complianceReviewer: 'SG Compliance',
    complianceChecker: null,
    triggeredBy: null,
    blockerCategories: ['G'],
    blockerNotes: 'Adverse media findings. PEP connection identified. EDD in progress.',
    customerResponded: false,
    responseDate: null,
    waitingRound: 0,
    lastCustomerContact: daysAgo(10),
    contactAttempts: 1,
    nextFollowupDate: null,
    kybSubmissionDate: daysAgo(25),
    complianceStartDate: daysAgo(14),
    decisionDate: null,
    abandonedReason: null,
    caseNotes: 'Escalated to EDD due to adverse media and potential PEP connection.',
    priorityFlag: true,
    activityLog: [
      { ts: daysAgo(28) + ' 09:00', type: 'State Changed', color: 'blue', desc: 'State changed: KYB Form Pending → KYB Submitted by Selina Chang', actor: 'Selina Chang' },
      { ts: daysAgo(25) + ' 10:00', type: 'State Changed', color: 'blue', desc: 'State changed: KYB Submitted → KYB Review by Arianna', actor: 'Arianna' },
      { ts: daysAgo(14) + ' 15:30', type: 'State Changed', color: 'purple', desc: 'State changed: KYB Review → Compliance Review by Charlotte', actor: 'Charlotte' },
      { ts: daysAgo(7) + ' 11:00', type: 'Escalation Flagged', color: 'red', desc: 'EDD triggered. Adverse media: director linked to regulatory action in SG. PEP screening returned potential match.', actor: 'SG Compliance' },
      { ts: daysAgo(7) + ' 11:05', type: 'State Changed', color: 'red', desc: 'State changed: Compliance Review → EDD', actor: 'SG Compliance' },
    ],
  },
  {
    id: 'KYB-007',
    customerName: 'Sophie Wang',
    companyName: 'Stellar Logistics',
    rmOwner: 'Selina Chang',
    registrationDate: daysAgo(1),
    currentState: 'KYB Form Pending',
    stateEntryDate: daysAgo(1),
    previousState: null,
    kybReviewer: null,
    kybChecker: null,
    complianceReviewer: null,
    complianceChecker: null,
    triggeredBy: null,
    blockerCategories: [],
    blockerNotes: '',
    customerResponded: false,
    responseDate: null,
    waitingRound: 0,
    lastCustomerContact: null,
    contactAttempts: 0,
    nextFollowupDate: null,
    kybSubmissionDate: null,
    complianceStartDate: null,
    decisionDate: null,
    abandonedReason: null,
    caseNotes: 'New registration. Awaiting customer to complete and submit the KYB form.',
    priorityFlag: false,
    activityLog: [
      { ts: daysAgo(1) + ' 16:30', type: 'State Changed', color: 'gray', desc: 'Case created. State: KYB Form Pending.', actor: 'Selina Chang' },
    ],
  },
  {
    id: 'KYB-008',
    customerName: 'Frank Liu',
    companyName: 'Harbor Trade Ltd',
    rmOwner: 'Selina Chang',
    registrationDate: daysAgo(16),
    currentState: 'KYB Review',
    stateEntryDate: daysAgo(5),
    previousState: 'KYB Submitted',
    kybReviewer: 'Arianna',
    kybChecker: 'Charlotte',
    complianceReviewer: null,
    complianceChecker: null,
    triggeredBy: null,
    blockerCategories: [],
    blockerNotes: '',
    customerResponded: false,
    responseDate: null,
    waitingRound: 0,
    lastCustomerContact: null,
    contactAttempts: 0,
    nextFollowupDate: null,
    kybSubmissionDate: daysAgo(11),
    complianceStartDate: null,
    decisionDate: null,
    abandonedReason: null,
    caseNotes: 'Mid-size trading company. Review in progress.',
    priorityFlag: true,
    activityLog: [
      { ts: daysAgo(16) + ' 10:00', type: 'State Changed', color: 'blue', desc: 'State changed: KYB Form Pending → KYB Submitted by Selina Chang', actor: 'Selina Chang' },
      { ts: daysAgo(5) + ' 09:20', type: 'State Changed', color: 'blue', desc: 'State changed: KYB Submitted → KYB Review by Arianna', actor: 'Arianna' },
    ],
  },
  {
    id: 'KYB-009',
    customerName: 'Nancy Yip',
    companyName: 'Delta Commerce',
    rmOwner: 'Selina Chang',
    registrationDate: daysAgo(10),
    currentState: 'Waiting Customer',
    stateEntryDate: daysAgo(2),
    previousState: 'KYB Review',
    kybReviewer: 'Arianna',
    kybChecker: 'Charlotte',
    complianceReviewer: null,
    complianceChecker: null,
    triggeredBy: 'KYB',
    blockerCategories: ['C'],
    blockerNotes: 'Business registration certificate in Mandarin only. Certified translation required.',
    customerResponded: false,
    responseDate: null,
    waitingRound: 1,
    lastCustomerContact: daysAgo(2),
    contactAttempts: 1,
    nextFollowupDate: daysAgo(1),
    kybSubmissionDate: daysAgo(8),
    complianceStartDate: null,
    decisionDate: null,
    abandonedReason: null,
    caseNotes: 'Translation blocker. Client has engaged a translation service.',
    priorityFlag: false,
    activityLog: [
      { ts: daysAgo(10) + ' 11:30', type: 'State Changed', color: 'blue', desc: 'State changed: KYB Form Pending → KYB Submitted by Selina Chang', actor: 'Selina Chang' },
      { ts: daysAgo(8) + ' 09:00', type: 'State Changed', color: 'blue', desc: 'State changed: KYB Submitted → KYB Review by Arianna', actor: 'Arianna' },
      { ts: daysAgo(2) + ' 16:00', type: 'State Changed', color: 'orange', desc: 'State changed: KYB Review → Waiting Customer (Round 1) — Blockers: C', actor: 'Arianna' },
      { ts: daysAgo(2) + ' 16:05', type: 'Customer Contacted', color: 'gray', desc: 'Customer contact attempt 1. Informed client of translation requirement.', actor: 'Selina Chang' },
    ],
  },
  {
    id: 'KYB-010',
    customerName: 'Henry Pang',
    companyName: 'Nexus Capital',
    rmOwner: 'Selina Chang',
    registrationDate: daysAgo(35),
    currentState: 'Approved',
    stateEntryDate: daysAgo(9),
    previousState: 'Compliance Review',
    kybReviewer: 'Arianna',
    kybChecker: 'Charlotte',
    complianceReviewer: 'XinTing',
    complianceChecker: 'Chung Yee',
    triggeredBy: null,
    blockerCategories: [],
    blockerNotes: '',
    customerResponded: false,
    responseDate: null,
    waitingRound: 1,
    lastCustomerContact: daysAgo(20),
    contactAttempts: 2,
    nextFollowupDate: null,
    kybSubmissionDate: daysAgo(32),
    complianceStartDate: daysAgo(18),
    decisionDate: daysAgo(9),
    abandonedReason: null,
    caseNotes: 'Approved after clean compliance review.',
    priorityFlag: false,
    activityLog: [
      { ts: daysAgo(35) + ' 09:00', type: 'State Changed', color: 'blue', desc: 'State changed: KYB Form Pending → KYB Submitted by Selina Chang', actor: 'Selina Chang' },
      { ts: daysAgo(32) + ' 10:00', type: 'State Changed', color: 'blue', desc: 'State changed: KYB Submitted → KYB Review by Arianna', actor: 'Arianna' },
      { ts: daysAgo(25) + ' 14:00', type: 'State Changed', color: 'orange', desc: 'State changed: KYB Review → Waiting Customer (Round 1) — Blockers: B', actor: 'Arianna' },
      { ts: daysAgo(20) + ' 11:00', type: 'Customer Responded', color: 'green', desc: 'Customer responded — complete documents received.', actor: 'Selina Chang' },
      { ts: daysAgo(18) + ' 09:30', type: 'State Changed', color: 'purple', desc: 'State changed: Waiting Customer → Compliance Review by Charlotte', actor: 'Charlotte' },
      { ts: daysAgo(9) + ' 16:00', type: 'State Changed', color: 'green', desc: 'State changed: Compliance Review → Approved by Chung Yee', actor: 'Chung Yee' },
    ],
  },
];

// ── Utilities ──
function getDaysInState(stateEntryDate) {
  const entry = new Date(stateEntryDate);
  const today = new Date(TODAY);
  return Math.floor((today - entry) / 86400000);
}

function getCase(id) {
  return CASES.find(c => c.id === id);
}

function stateTagClass(state) {
  return 'tag tag-' + (STATE_COLORS[state] || 'gray');
}

function agingHtml(stateEntryDate) {
  const days = getDaysInState(stateEntryDate);
  return `${days}d`;
}

// ── Who must take the next action on this case? ──
function getCurrentAssignee(c) {
  if (c.customerResponded) {
    return c.triggeredBy === 'Compliance'
      ? (c.complianceReviewer || null)
      : (c.kybReviewer || null);
  }
  switch (c.currentState) {
    case 'KYB Form Pending':  return c.rmOwner;
    case 'KYB Submitted':     return c.kybReviewer || null;
    case 'KYB Review':        return c.kybReviewer || null;
    case 'Waiting Customer':  return c.rmOwner;
    case 'Compliance Review': return c.complianceReviewer || null;
    case 'EDD':               return c.complianceReviewer || 'SG Compliance';
    default: return null;
  }
}

// ── What is the next concrete action? ──
function getNextAction(c) {
  if (TERMINAL_STATES.includes(c.currentState)) {
    return { label: 'Closed', urgency: 'passive' };
  }
  if (c.customerResponded) {
    return { label: '⚡ Pick up — customer responded', urgency: 'urgent' };
  }
  switch (c.currentState) {
    case 'KYB Form Pending':
      return { label: 'Awaiting KYB form submission', urgency: 'passive' };
    case 'KYB Submitted':
      if (!c.kybReviewer) return { label: '⚠ Assign reviewer', urgency: 'warning' };
      return { label: 'Pick up for review', urgency: 'active' };
    case 'KYB Review':
      return { label: 'Complete KYB review', urgency: 'active' };
    case 'Waiting Customer': {
      if (!c.nextFollowupDate) return { label: 'Follow up with customer', urgency: 'waiting' };
      if (c.nextFollowupDate < TODAY)  return { label: '⚠ Follow-up overdue', urgency: 'warning' };
      if (c.nextFollowupDate === TODAY) return { label: 'Follow up today', urgency: 'waiting' };
      return { label: 'Follow up with customer', urgency: 'passive' };
    }
    case 'Compliance Review':
      return { label: 'Complete compliance review', urgency: 'active' };
    case 'EDD':
      return { label: 'EDD assessment', urgency: 'active' };
    default:
      return { label: '—', urgency: 'passive' };
  }
}

function defaultSort(a, b) {
  return getDaysInState(b.stateEntryDate) - getDaysInState(a.stateEntryDate);
}

// ── View configuration ──
const VIEW_CONFIG = {
  all: {
    label: 'All Cases',
    filter: (c, role) => role === 'ops' || role === 'kyb' || role === 'compliance' ? true : c.rmOwner === 'Selina Chang',
    columns: ['id', 'company', 'state', 'currentAssignee', 'aging', 'blockerFull', 'nextAction'],
    sort: defaultSort,
  },
  my_pipeline: {
    label: 'My Pipeline — Selina Chang',
    filter: (c) => c.rmOwner === 'Selina Chang' && !TERMINAL_STATES.includes(c.currentState),
    columns: ['id', 'company', 'state', 'aging', 'blockerFull', 'lastContact', 'nextFollowup', 'nextAction'],
    sort: (a, b) => {
      const urgencyOrder = { warning: 0, urgent: 1, waiting: 2, active: 3, passive: 4 };
      const ua = urgencyOrder[getNextAction(a).urgency] ?? 5;
      const ub = urgencyOrder[getNextAction(b).urgency] ?? 5;
      if (ua !== ub) return ua - ub;
      return defaultSort(a, b);
    },
  },
  waiting_customer: {
    label: 'Waiting Customer',
    filter: (c) => c.currentState === 'Waiting Customer',
    columns: ['id', 'company', 'triggeredBy', 'blockerFull', 'aging', 'daysSinceContact', 'contactAttempts', 'nextFollowup', 'responded', 'nextAction'],
    sort: (a, b) => {
      if (a.customerResponded !== b.customerResponded) return a.customerResponded ? 1 : -1;
      const aOver = a.nextFollowupDate && a.nextFollowupDate < TODAY;
      const bOver = b.nextFollowupDate && b.nextFollowupDate < TODAY;
      if (aOver !== bOver) return aOver ? -1 : 1;
      return getDaysInState(b.stateEntryDate) - getDaysInState(a.stateEntryDate);
    },
  },
  returned: {
    label: '⚡ Returned from Customer',
    filter: (c) => c.customerResponded === true,
    columns: ['id', 'company', 'currentAssignee', 'triggeredBy', 'responseDate', 'responseAge', 'blockerFull', 'nextAction'],
    sort: (a, b) => new Date(a.responseDate) - new Date(b.responseDate),
  },
  kyb_queue: {
    label: 'KYB Review Queue — Arianna',
    filter: (c) => c.currentState === 'KYB Submitted' || c.currentState === 'KYB Review',
    columns: ['id', 'company', 'state', 'aging', 'kybSubmissionDate', 'waitingRound', 'blockerFull', 'nextAction'],
    sort: (a, b) => {
      if (a.customerResponded !== b.customerResponded) return a.customerResponded ? -1 : 1;
      return defaultSort(a, b);
    },
  },
  compliance_queue: {
    label: 'Compliance Review Queue',
    filter: (c) => c.currentState === 'Compliance Review' || c.currentState === 'EDD',
    columns: ['id', 'company', 'state', 'aging', 'complianceStartDate', 'triggeredBy', 'blockerFull', 'nextAction'],
    sort: (a, b) => {
      if (a.customerResponded !== b.customerResponded) return a.customerResponded ? -1 : 1;
      return defaultSort(a, b);
    },
  },
  mgmt: {
    label: 'Management Overview',
    filter: (c) => !TERMINAL_STATES.includes(c.currentState),
    columns: ['id', 'company', 'state', 'currentAssignee', 'slaStatus', 'aging', 'blockerFull', 'nextAction'],
    sort: defaultSort,
  },
};

// ── State ──
let currentView = 'all';
let currentRole = 'ops';
let searchText = '';
let stateFilter = '';

function currentRmName() {
  return currentRole === 'rm_selina' ? 'Selina Chang' : '';
}

function roleLabel() {
  const map = {
    ops:         'Ops PM (Winston)',
    kyb:         'KYB (Arianna)',
    compliance:  'Compliance (XinTing)',
    rm_selina:   'RM — Selina Chang',
  };
  return map[currentRole] || currentRole;
}

// ── Column renderers ──
function renderCell(col, c) {
  switch (col) {
    case 'id':
      return `<a href="case-detail.html?id=${c.id}" style="color:#1677ff;font-weight:600">${c.id}</a>`;

    case 'company':
      return `<strong>${c.companyName}</strong>`;

    case 'state':
      return `<span class="${stateTagClass(c.currentState)}">${c.currentState}</span>`;

    case 'currentAssignee': {
      const assignee = getCurrentAssignee(c);
      if (!assignee) return '<span class="owner-chip owner-unassigned">⚠ Unassigned</span>';
      const cls = assignee === c.rmOwner ? 'owner-rm'
        : KYB_TEAM.includes(assignee) ? 'owner-kyb'
        : COMPLIANCE_TEAM.includes(assignee) ? 'owner-compliance'
        : 'owner-kyb';
      return `<span class="owner-chip ${cls}">${assignee}</span>`;
    }

    case 'nextAction': {
      const action = getNextAction(c);
      const cls = {
        urgent:  'action-chip action-urgent',
        warning: 'action-chip action-warning',
        active:  'action-chip action-active',
        waiting: 'action-chip action-waiting',
        passive: 'action-passive',
      }[action.urgency] || 'action-passive';
      return `<span class="${cls}">${action.label}</span>`;
    }

    case 'blockerFull': {
      if (!c.blockerCategories || c.blockerCategories.length === 0) return '<span style="color:#d9d9d9">—</span>';
      return c.blockerCategories
        .map(code => `<span class="blocker-tag"><span class="blocker-code">${code}</span>${BLOCKER_CODES[code]}</span>`)
        .join('');
    }

    case 'daysSinceContact': {
      if (!c.lastCustomerContact) return '<span class="action-warning">Never contacted</span>';
      const days = Math.floor((new Date(TODAY) - new Date(c.lastCustomerContact)) / 86400000);
      if (days === 0) return '<span style="color:#52c41a;font-weight:600">Today</span>';
      const clr = days >= 4 ? 'color:#ff4d4f;font-weight:700' : days >= 2 ? 'color:#fa8c16' : 'color:#595959';
      return `<span style="${clr}">${days}d ago</span>`;
    }

    case 'slaStatus': {
      if (TERMINAL_STATES.includes(c.currentState)) return '<span class="tag tag-gray">Closed</span>';
      const total = Math.floor((new Date(TODAY) - new Date(c.registrationDate)) / 86400000);
      if (total <= 5)  return `<span class="tag tag-green">Day ${total} / 7</span>`;
      if (total === 6) return `<span class="tag tag-orange">Day 6 / 7</span>`;
      if (total === 7) return `<span class="tag tag-orange" style="font-weight:700">Day 7 — due</span>`;
      return `<span class="tag tag-red" style="font-weight:700">⚠ Day ${total}</span>`;
    }

    case 'aging': return agingHtml(c.stateEntryDate);

    case 'rm': return c.rmOwner || '—';

    case 'triggeredBy':
      return c.triggeredBy ? `<span class="tag tag-blue">${c.triggeredBy}</span>` : '<span style="color:#d9d9d9">—</span>';

    case 'lastContact':
      return c.lastCustomerContact || '<span style="color:#d9d9d9">—</span>';

    case 'nextFollowup':
      if (!c.nextFollowupDate) return '<span style="color:#d9d9d9">—</span>';
      if (c.nextFollowupDate < TODAY)  return `<span class="overdue-date">⚠ ${c.nextFollowupDate}</span>`;
      if (c.nextFollowupDate === TODAY) return `<span class="today-date">Today</span>`;
      return c.nextFollowupDate;

    case 'responded':
      return c.customerResponded
        ? '<span class="tag tag-green">✓ Responded</span>'
        : '<span style="color:#8c8c8c">Waiting</span>';

    case 'responseDate': return c.responseDate || '—';

    // Time since customer responded — reviewers must pick up within 4 hours
    case 'responseAge': {
      if (!c.responseDate) return '—';
      const days = Math.floor((new Date(TODAY) - new Date(c.responseDate)) / 86400000);
      if (days === 0) return '<span class="action-waiting" style="padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600">Returned today ⚠</span>';
      return `<span class="action-chip action-warning">${days}d — pickup overdue</span>`;
    }

    case 'contactAttempts':
      return `<span style="font-weight:600">${c.contactAttempts || 0}</span>`;

    case 'waitingRound':
      return c.waitingRound > 0
        ? `<span class="tag tag-orange">Round ${c.waitingRound}</span>`
        : '<span style="color:#d9d9d9">—</span>';

    case 'kybSubmissionDate':  return c.kybSubmissionDate || '<span style="color:#d9d9d9">—</span>';
    case 'complianceStartDate': return c.complianceStartDate || '<span style="color:#d9d9d9">—</span>';
    case 'registrationDate':   return c.registrationDate || '—';

    case 'totalDays': {
      const reg = new Date(c.registrationDate);
      const end = c.decisionDate ? new Date(c.decisionDate) : new Date(TODAY);
      const days = Math.floor((end - reg) / 86400000);
      const cls = days > 7 ? 'color:#ff4d4f;font-weight:700' : days > 5 ? 'color:#fa8c16' : '';
      return `<span style="${cls}">${days}d</span>`;
    }

    default: return '—';
  }
}

const COL_LABELS = {
  id: 'Case ID',
  company: 'Company',
  state: 'State',
  currentAssignee: 'Current Assignee',
  nextAction: 'Next Action',
  aging: 'Aging',
  blockerFull: 'Blocker',
  slaStatus: '7-Day SLA',
  daysSinceContact: 'Last Contact',
  rm: 'RM',
  triggeredBy: 'Triggered By',
  lastContact: 'Contact Date',
  nextFollowup: 'Follow-up Date',
  responded: 'Response',
  responseDate: 'Response Date',
  responseAge: 'In Queue',
  contactAttempts: 'Attempts',
  waitingRound: 'Wait Round',
  kybSubmissionDate: 'KYB Submitted',
  complianceStartDate: 'Comp. Start',
  registrationDate: 'Registered',
  totalDays: 'Total Days',
};

// ── Render table ──
function renderTable() {
  const cfg = VIEW_CONFIG[currentView];
  let rows = CASES.filter(c => cfg.filter(c, currentRole));

  if (searchText) {
    const s = searchText.toLowerCase();
    rows = rows.filter(c =>
      c.companyName.toLowerCase().includes(s) ||
      c.id.toLowerCase().includes(s) ||
      c.customerName.toLowerCase().includes(s)
    );
  }
  if (stateFilter) {
    rows = rows.filter(c => c.currentState === stateFilter);
  }

  rows.sort(cfg.sort || defaultSort);

  const cols = cfg.columns;
  const thead = `<tr>${cols.map(c => `<th>${COL_LABELS[c] || c}</th>`).join('')}</tr>`;
  const tbody = rows.length === 0
    ? `<tr><td colspan="${cols.length}" class="table-empty">No cases match this view.</td></tr>`
    : rows.map(r => {
        const rowClass = r.customerResponded ? 'row-returned' : '';
        return `<tr class="${rowClass}" onclick="window.location='case-detail.html?id=${r.id}'">${cols.map(c => `<td>${renderCell(c, r)}</td>`).join('')}</tr>`;
      }).join('');

  document.getElementById('table-head').innerHTML = thead;
  document.getElementById('table-body').innerHTML = tbody;
  document.getElementById('result-count').textContent = `${rows.length} case${rows.length !== 1 ? 's' : ''}`;

  const statsBar = document.getElementById('stats-bar');
  if (statsBar) {
    if (currentView === 'mgmt') {
      renderMgmtStats(statsBar);
      statsBar.style.display = 'block';
    } else {
      statsBar.style.display = 'none';
    }
  }
}

// ── Winston's bottleneck view ──
function renderMgmtStats(el) {
  const active = CASES.filter(c => !TERMINAL_STATES.includes(c.currentState));
  const waiting  = active.filter(c => c.currentState === 'Waiting Customer').length;
  const returned = active.filter(c => c.customerResponded).length;
  const unassigned = active.filter(c => getCurrentAssignee(c) === null).length;

  const PIPELINE_STAGES = [
    'KYB Submitted', 'KYB Review', 'Waiting Customer', 'Compliance Review', 'EDD', 'KYB Form Pending',
  ];
  const STAGE_RESPONSIBLE = {
    'KYB Form Pending':   'Selina Chang (RM)',
    'KYB Submitted':      'Arianna (KYB Maker)',
    'KYB Review':         'Arianna / Charlotte',
    'Waiting Customer':   'Selina Chang (RM)',
    'Compliance Review':  'XinTing / Chung Yee',
    'EDD':                'SG Compliance',
  };

  const stageRows = PIPELINE_STAGES.map(stage => {
    const cases = active.filter(c => c.currentState === stage);
    if (cases.length === 0) return '';
    const avgDays = (cases.reduce((s, c) => s + getDaysInState(c.stateEntryDate), 0) / cases.length).toFixed(1);
    return `<tr>
      <td><span class="${stateTagClass(stage)}">${stage}</span></td>
      <td style="text-align:center;font-weight:700">${cases.length}</td>
      <td style="text-align:center;color:#595959">${avgDays}d avg</td>
      <td style="color:#595959;font-size:12px">${STAGE_RESPONSIBLE[stage] || '—'}</td>
    </tr>`;
  }).filter(Boolean).join('');

  el.innerHTML = `
    <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap">
      <div class="stat-card"><div class="stat-label">Active Cases</div><div class="stat-value">${active.length}</div></div>
      <div class="stat-card"><div class="stat-label">Waiting Customer</div><div class="stat-value orange">${waiting}</div></div>
      <div class="stat-card"><div class="stat-label">⚡ Pickup Needed</div><div class="stat-value ${returned ? 'red' : 'green'}">${returned}</div></div>
      ${unassigned ? `<div class="stat-card" style="border:1px solid #ffa39e"><div class="stat-label" style="color:#ff4d4f">⚠ Unassigned</div><div class="stat-value red">${unassigned}</div></div>` : ''}
    </div>
    <div style="background:#fff;border-radius:8px;padding:16px 20px;box-shadow:0 1px 3px rgba(0,0,0,0.05)">
      <div style="font-size:11px;font-weight:600;color:#8c8c8c;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:10px">Stage Breakdown</div>
      <table class="stage-breakdown">
        <thead><tr>
          <th>Stage</th><th style="text-align:center">Cases</th>
          <th style="text-align:center">Avg Days</th>
          <th>Assignee</th>
        </tr></thead>
        <tbody>${stageRows}</tbody>
      </table>
    </div>
  `;
}

// ── Nav ──
function switchView(view) {
  currentView = view;
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const activeNav = document.querySelector(`[data-view="${view}"]`);
  if (activeNav) activeNav.classList.add('active');
  const pageTitleEl = document.getElementById('page-title');
  if (pageTitleEl) pageTitleEl.textContent = VIEW_CONFIG[view]?.label || view;
  const alertEl = document.getElementById('returned-alert');
  if (alertEl) {
    const returned = CASES.filter(c => c.customerResponded).length;
    alertEl.style.display = (view === 'returned' && returned > 0) ? 'flex' : 'none';
  }
  renderTable();
}

function switchRole(role) {
  currentRole = role;
  const badge = document.getElementById('role-badge');
  if (badge) badge.textContent = roleLabel();
  renderTable();
}

function onSearch(val)      { searchText = val; renderTable(); }
function onStateFilter(val) { stateFilter = val; renderTable(); }

function updateBadges() {
  const returned = CASES.filter(c => c.customerResponded).length;
  const waiting  = CASES.filter(c => c.currentState === 'Waiting Customer').length;
  const el = id => document.getElementById(id);
  if (el('badge-returned')) el('badge-returned').textContent = returned || '';
  if (el('badge-waiting'))  el('badge-waiting').textContent  = waiting  || '';
}

function initIndex() {
  switchView('all');
  updateBadges();
  const roleSelect = document.getElementById('role-select');
  if (roleSelect) roleSelect.addEventListener('change', e => switchRole(e.target.value));
  const searchEl = document.getElementById('search-input');
  if (searchEl) searchEl.addEventListener('input', e => onSearch(e.target.value));
  const stateEl = document.getElementById('state-filter');
  if (stateEl) stateEl.addEventListener('change', e => onStateFilter(e.target.value));
  document.querySelectorAll('.nav-item[data-view]').forEach(el => {
    el.addEventListener('click', () => switchView(el.dataset.view));
  });
}

function openDrawer(id)  { document.getElementById(id)?.classList.add('open');    document.getElementById('drawer-backdrop')?.classList.add('open');    }
function closeDrawer(id) { document.getElementById(id)?.classList.remove('open'); document.getElementById('drawer-backdrop')?.classList.remove('open'); }
function openModal(id)   { document.getElementById(id)?.classList.add('open');    }
function closeModal(id)  { document.getElementById(id)?.classList.remove('open'); }
