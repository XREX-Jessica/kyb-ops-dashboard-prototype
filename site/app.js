// ── Demo data ──
const TODAY = '2026-05-29';

function daysAgo(n) {
  const d = new Date(TODAY);
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

function agingFlag(days) {
  if (days < 3) return 'green';
  if (days <= 5) return 'yellow';
  return 'red';
}

function agingLabel(days) {
  if (days < 3) return '🟢';
  if (days <= 5) return '🟡';
  return '🔴';
}

const STATE_COLORS = {
  'Registration Pending': 'gray',
  'KYB Submitted': 'blue',
  'KYB Review': 'blue',
  'Waiting Customer': 'orange',
  'Compliance Review': 'purple',
  'EDD': 'red',
  'Approved': 'green',
  'Rejected': 'red',
  'Abandoned': 'gray',
};

const BLOCKER_CODES = {
  A: 'Document quality',
  B: 'Document completeness',
  C: 'Translation required',
  D: 'Beneficial ownership / UBO',
  E: 'Source of funds',
  F: 'Business legitimacy',
  G: 'Adverse findings',
  H: 'Internal / process issue',
};

const TERMINAL_STATES = ['Approved', 'Rejected', 'Abandoned'];

const CASES = [
  {
    id: 'KYB-001',
    customerName: 'David Chen',
    companyName: 'Acme Trading Ltd',
    rmOwner: 'Sarah Lin',
    registrationDate: daysAgo(19),
    currentState: 'KYB Review',
    stateEntryDate: daysAgo(6),
    previousState: 'KYB Submitted',
    kybReviewer: 'James Wu',
    complianceReviewer: null,
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
    caseNotes: 'Large trading company with 4 UBOs. Requires comprehensive document review.',
    priorityFlag: true,
    activityLog: [
      { ts: daysAgo(19) + ' 09:12', type: 'State Changed', color: 'blue', desc: 'State changed: Registration Pending → KYB Submitted by Sarah Lin', actor: 'Sarah Lin' },
      { ts: daysAgo(6) + ' 10:30', type: 'State Changed', color: 'blue', desc: 'State changed: KYB Submitted → KYB Review by James Wu', actor: 'James Wu' },
      { ts: daysAgo(6) + ' 14:05', type: 'Reviewer Note', color: 'gray', desc: 'UBO structure requires clarification on 3 beneficial owners. Reviewing corporate chain.', actor: 'James Wu' },
    ],
  },
  {
    id: 'KYB-002',
    customerName: 'Mei Lin',
    companyName: 'Bright Future Corp',
    rmOwner: 'Mike Tan',
    registrationDate: daysAgo(22),
    currentState: 'Waiting Customer',
    stateEntryDate: daysAgo(9),
    previousState: 'KYB Review',
    kybReviewer: 'James Wu',
    complianceReviewer: null,
    triggeredBy: 'KYB',
    blockerCategories: ['A', 'B'],
    blockerNotes: 'Bank statement is a screenshot (not PDF). Incorporation cert missing signature page.',
    customerResponded: false,
    responseDate: null,
    waitingRound: 2,
    lastCustomerContact: daysAgo(3),
    contactAttempts: 3,
    nextFollowupDate: TODAY,
    kybSubmissionDate: daysAgo(18),
    complianceStartDate: null,
    decisionDate: null,
    caseNotes: 'Second waiting round. Customer has been slow to respond.',
    priorityFlag: false,
    activityLog: [
      { ts: daysAgo(22) + ' 11:00', type: 'State Changed', color: 'blue', desc: 'State changed: Registration Pending → KYB Submitted by Mike Tan', actor: 'Mike Tan' },
      { ts: daysAgo(18) + ' 09:45', type: 'State Changed', color: 'blue', desc: 'State changed: KYB Submitted → KYB Review by James Wu', actor: 'James Wu' },
      { ts: daysAgo(13) + ' 15:30', type: 'State Changed', color: 'orange', desc: 'State changed: KYB Review → Waiting Customer (Round 1) — Blockers: A, B', actor: 'James Wu' },
      { ts: daysAgo(11) + ' 10:00', type: 'Customer Contacted', color: 'gray', desc: 'Customer contact attempt 1. Left voicemail and sent follow-up email.', actor: 'Mike Tan' },
      { ts: daysAgo(9) + ' 14:15', type: 'Customer Responded', color: 'green', desc: 'Customer responded — documents received. Reviewer picked up.', actor: 'Mike Tan' },
      { ts: daysAgo(9) + ' 15:00', type: 'State Changed', color: 'blue', desc: 'State changed: Waiting Customer → KYB Review by James Wu', actor: 'James Wu' },
      { ts: daysAgo(9) + ' 15:30', type: 'Document Request Sent', color: 'orange', desc: 'Documents reviewed. Bank statement still invalid (screenshot). Returning to Waiting Customer (Round 2).', actor: 'James Wu' },
      { ts: daysAgo(9) + ' 15:35', type: 'State Changed', color: 'orange', desc: 'State changed: KYB Review → Waiting Customer (Round 2) — Blockers: A, B', actor: 'James Wu' },
      { ts: daysAgo(3) + ' 09:00', type: 'Customer Contacted', color: 'gray', desc: 'Customer contact attempt 3. Sent reminder with specific document checklist.', actor: 'Mike Tan' },
    ],
  },
  {
    id: 'KYB-003',
    customerName: 'Anna Ng',
    companyName: 'Global Ventures HK',
    rmOwner: 'Sarah Lin',
    registrationDate: daysAgo(14),
    currentState: 'Compliance Review',
    stateEntryDate: daysAgo(2),
    previousState: 'KYB Review',
    kybReviewer: 'James Wu',
    complianceReviewer: 'Charlotte Lee',
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
    caseNotes: 'Clean file so far. HK-registered entity, PEP screening pending.',
    priorityFlag: false,
    activityLog: [
      { ts: daysAgo(14) + ' 08:30', type: 'State Changed', color: 'blue', desc: 'State changed: Registration Pending → KYB Submitted by Sarah Lin', actor: 'Sarah Lin' },
      { ts: daysAgo(12) + ' 10:00', type: 'State Changed', color: 'blue', desc: 'State changed: KYB Submitted → KYB Review by James Wu', actor: 'James Wu' },
      { ts: daysAgo(2) + ' 11:20', type: 'State Changed', color: 'purple', desc: 'State changed: KYB Review → Compliance Review by James Wu', actor: 'James Wu' },
      { ts: daysAgo(2) + ' 11:25', type: 'Reviewer Note', color: 'gray', desc: 'KYB complete. Escalating to Compliance for PEP screening and source of funds verification.', actor: 'James Wu' },
    ],
  },
  {
    id: 'KYB-004',
    customerName: 'Robert Ho',
    companyName: 'SunTech Solutions',
    rmOwner: 'Tom Chang',
    registrationDate: daysAgo(8),
    currentState: 'KYB Submitted',
    stateEntryDate: daysAgo(4),
    previousState: 'Registration Pending',
    kybReviewer: null,
    complianceReviewer: null,
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
    caseNotes: 'Tech startup. Documents appear complete at submission.',
    priorityFlag: false,
    activityLog: [
      { ts: daysAgo(8) + ' 14:00', type: 'State Changed', color: 'blue', desc: 'State changed: Registration Pending → KYB Submitted by Tom Chang', actor: 'Tom Chang' },
    ],
  },
  {
    id: 'KYB-005',
    customerName: 'Linda Koo',
    companyName: 'Pacific Import Co',
    rmOwner: 'Mike Tan',
    registrationDate: daysAgo(18),
    currentState: 'Waiting Customer',
    stateEntryDate: daysAgo(3),
    previousState: 'Compliance Review',
    kybReviewer: 'James Wu',
    complianceReviewer: 'Charlotte Lee',
    triggeredBy: 'Compliance',
    blockerCategories: ['D', 'E'],
    blockerNotes: 'UBO declaration form incomplete. Source of wealth documentation insufficient for transaction volume.',
    customerResponded: true,
    responseDate: TODAY,
    waitingRound: 1,
    lastCustomerContact: daysAgo(1),
    contactAttempts: 2,
    nextFollowupDate: TODAY,
    kybSubmissionDate: daysAgo(16),
    complianceStartDate: daysAgo(7),
    decisionDate: null,
    caseNotes: 'Import business with complex ownership. Compliance flagged UBO and source of funds.',
    priorityFlag: true,
    activityLog: [
      { ts: daysAgo(18) + ' 10:00', type: 'State Changed', color: 'blue', desc: 'State changed: Registration Pending → KYB Submitted by Mike Tan', actor: 'Mike Tan' },
      { ts: daysAgo(16) + ' 09:30', type: 'State Changed', color: 'blue', desc: 'State changed: KYB Submitted → KYB Review by James Wu', actor: 'James Wu' },
      { ts: daysAgo(9) + ' 16:00', type: 'State Changed', color: 'purple', desc: 'State changed: KYB Review → Compliance Review by James Wu', actor: 'James Wu' },
      { ts: daysAgo(3) + ' 14:00', type: 'State Changed', color: 'orange', desc: 'State changed: Compliance Review → Waiting Customer (Round 1) — Blockers: D, E', actor: 'Charlotte Lee' },
      { ts: daysAgo(1) + ' 11:00', type: 'Customer Contacted', color: 'gray', desc: 'Customer contact attempt 2. Customer confirmed documents are being prepared.', actor: 'Mike Tan' },
      { ts: TODAY + ' 09:15', type: 'Customer Responded', color: 'green', desc: 'Customer responded — new documents submitted. Awaiting reviewer pickup.', actor: 'Mike Tan' },
    ],
  },
  {
    id: 'KYB-006',
    customerName: 'James Lau',
    companyName: 'Meridian Finance',
    rmOwner: 'Tom Chang',
    registrationDate: daysAgo(28),
    currentState: 'EDD',
    stateEntryDate: daysAgo(7),
    previousState: 'Compliance Review',
    kybReviewer: 'James Wu',
    complianceReviewer: 'Charlotte Lee',
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
    caseNotes: 'Escalated to EDD due to adverse media and potential PEP connection. Compliance team conducting enhanced review.',
    priorityFlag: true,
    activityLog: [
      { ts: daysAgo(28) + ' 09:00', type: 'State Changed', color: 'blue', desc: 'State changed: Registration Pending → KYB Submitted by Tom Chang', actor: 'Tom Chang' },
      { ts: daysAgo(25) + ' 10:00', type: 'State Changed', color: 'blue', desc: 'State changed: KYB Submitted → KYB Review by James Wu', actor: 'James Wu' },
      { ts: daysAgo(14) + ' 15:30', type: 'State Changed', color: 'purple', desc: 'State changed: KYB Review → Compliance Review by James Wu', actor: 'James Wu' },
      { ts: daysAgo(7) + ' 11:00', type: 'Escalation Flagged', color: 'red', desc: 'EDD triggered. Adverse media: director appears in news linked to regulatory action in SG. PEP screening returned potential match.', actor: 'Charlotte Lee' },
      { ts: daysAgo(7) + ' 11:05', type: 'State Changed', color: 'red', desc: 'State changed: Compliance Review → EDD by Charlotte Lee', actor: 'Charlotte Lee' },
    ],
  },
  {
    id: 'KYB-007',
    customerName: 'Sophie Wang',
    companyName: 'Stellar Logistics',
    rmOwner: 'Sarah Lin',
    registrationDate: daysAgo(1),
    currentState: 'Registration Pending',
    stateEntryDate: daysAgo(1),
    previousState: null,
    kybReviewer: null,
    complianceReviewer: null,
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
    caseNotes: 'New registration. Awaiting customer to complete and submit KYB documents.',
    priorityFlag: false,
    activityLog: [
      { ts: daysAgo(1) + ' 16:30', type: 'State Changed', color: 'blue', desc: 'State changed: → Registration Pending. Case created by Sarah Lin.', actor: 'Sarah Lin' },
    ],
  },
  {
    id: 'KYB-008',
    customerName: 'Frank Liu',
    companyName: 'Harbor Trade Ltd',
    rmOwner: 'Mike Tan',
    registrationDate: daysAgo(16),
    currentState: 'KYB Review',
    stateEntryDate: daysAgo(5),
    previousState: 'KYB Submitted',
    kybReviewer: 'James Wu',
    complianceReviewer: null,
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
    caseNotes: 'Mid-size trading company. Review in progress.',
    priorityFlag: true,
    activityLog: [
      { ts: daysAgo(16) + ' 10:00', type: 'State Changed', color: 'blue', desc: 'State changed: Registration Pending → KYB Submitted by Mike Tan', actor: 'Mike Tan' },
      { ts: daysAgo(5) + ' 09:20', type: 'State Changed', color: 'blue', desc: 'State changed: KYB Submitted → KYB Review by James Wu', actor: 'James Wu' },
    ],
  },
  {
    id: 'KYB-009',
    customerName: 'Nancy Yip',
    companyName: 'Delta Commerce',
    rmOwner: 'Tom Chang',
    registrationDate: daysAgo(10),
    currentState: 'Waiting Customer',
    stateEntryDate: daysAgo(2),
    previousState: 'KYB Review',
    kybReviewer: 'James Wu',
    complianceReviewer: null,
    triggeredBy: 'KYB',
    blockerCategories: ['C'],
    blockerNotes: 'Business registration certificate in Mandarin only. Certified translation required.',
    customerResponded: false,
    responseDate: null,
    waitingRound: 1,
    lastCustomerContact: daysAgo(2),
    contactAttempts: 1,
    nextFollowupDate: daysAgo(-2),
    kybSubmissionDate: daysAgo(8),
    complianceStartDate: null,
    decisionDate: null,
    caseNotes: 'Translation blocker. Client has engaged a translation service.',
    priorityFlag: false,
    activityLog: [
      { ts: daysAgo(10) + ' 11:30', type: 'State Changed', color: 'blue', desc: 'State changed: Registration Pending → KYB Submitted by Tom Chang', actor: 'Tom Chang' },
      { ts: daysAgo(8) + ' 09:00', type: 'State Changed', color: 'blue', desc: 'State changed: KYB Submitted → KYB Review by James Wu', actor: 'James Wu' },
      { ts: daysAgo(2) + ' 16:00', type: 'State Changed', color: 'orange', desc: 'State changed: KYB Review → Waiting Customer (Round 1) — Blockers: C', actor: 'James Wu' },
      { ts: daysAgo(2) + ' 16:05', type: 'Customer Contacted', color: 'gray', desc: 'Customer contact attempt 1. Informed client of translation requirement.', actor: 'Tom Chang' },
    ],
  },
  {
    id: 'KYB-010',
    customerName: 'Henry Pang',
    companyName: 'Nexus Capital',
    rmOwner: 'Sarah Lin',
    registrationDate: daysAgo(35),
    currentState: 'Approved',
    stateEntryDate: daysAgo(9),
    previousState: 'Compliance Review',
    kybReviewer: 'James Wu',
    complianceReviewer: 'Charlotte Lee',
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
    caseNotes: 'Approved after clean compliance review.',
    priorityFlag: false,
    activityLog: [
      { ts: daysAgo(35) + ' 09:00', type: 'State Changed', color: 'blue', desc: 'State changed: Registration Pending → KYB Submitted by Sarah Lin', actor: 'Sarah Lin' },
      { ts: daysAgo(32) + ' 10:00', type: 'State Changed', color: 'blue', desc: 'State changed: KYB Submitted → KYB Review by James Wu', actor: 'James Wu' },
      { ts: daysAgo(25) + ' 14:00', type: 'State Changed', color: 'orange', desc: 'State changed: KYB Review → Waiting Customer (Round 1) — Blockers: B', actor: 'James Wu' },
      { ts: daysAgo(20) + ' 11:00', type: 'Customer Responded', color: 'green', desc: 'Customer responded — complete documents received.', actor: 'Sarah Lin' },
      { ts: daysAgo(18) + ' 09:30', type: 'State Changed', color: 'purple', desc: 'State changed: Waiting Customer → Compliance Review by James Wu', actor: 'James Wu' },
      { ts: daysAgo(9) + ' 16:00', type: 'State Changed', color: 'green', desc: 'State changed: Compliance Review → Approved by Charlotte Lee', actor: 'Charlotte Lee' },
    ],
  },
];

// ── Utility functions ──
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
  const flag = agingFlag(days);
  const labels = { green: '🟢', yellow: '🟡', red: '🔴' };
  return `<span class="aging-dot ${flag}">${labels[flag]} ${days}d</span>`;
}

function blockerTagsHtml(cats) {
  if (!cats || cats.length === 0) return '<span class="tag tag-gray">—</span>';
  return cats.map(c => `<span class="blocker-tag">${c}: ${BLOCKER_CODES[c]}</span>`).join(' ');
}

// ── Role-based view filtering ──
const VIEW_CONFIG = {
  all: {
    label: 'All Cases',
    filter: (c, role) => role === 'ops' || role === 'kyb' || role === 'compliance' ? true : c.rmOwner === currentRmName(),
    columns: ['id', 'company', 'state', 'rm', 'reviewer', 'aging', 'blocker', 'priority'],
  },
  my_pipeline: {
    label: 'My Pipeline (RM)',
    filter: (c) => c.rmOwner === currentRmName() && !TERMINAL_STATES.includes(c.currentState),
    columns: ['id', 'company', 'state', 'aging', 'blocker', 'lastContact', 'nextFollowup'],
  },
  waiting_customer: {
    label: 'Waiting Customer',
    filter: (c) => c.currentState === 'Waiting Customer',
    columns: ['id', 'company', 'rm', 'triggeredBy', 'blockerCats', 'aging', 'contactAttempts', 'nextFollowup', 'responded'],
  },
  returned: {
    label: '⚡ Returned from Customer',
    filter: (c) => c.customerResponded === true,
    columns: ['id', 'company', 'rm', 'triggeredBy', 'responseDate', 'blockerCats', 'kybReviewer', 'complianceReviewer', 'aging'],
  },
  kyb_queue: {
    label: 'KYB Review Queue',
    filter: (c) => c.currentState === 'KYB Submitted' || c.currentState === 'KYB Review',
    columns: ['id', 'company', 'state', 'kybReviewer', 'aging', 'kybSubmissionDate', 'blockerCats', 'waitingRound'],
  },
  compliance_queue: {
    label: 'Compliance Review Queue',
    filter: (c) => c.currentState === 'Compliance Review' || c.currentState === 'EDD',
    columns: ['id', 'company', 'state', 'complianceReviewer', 'aging', 'complianceStartDate', 'blockerCats', 'triggeredBy'],
  },
  aging_queue: {
    label: 'Aging / Overdue',
    filter: (c) => agingFlag(getDaysInState(c.stateEntryDate)) === 'red' && !TERMINAL_STATES.includes(c.currentState),
    columns: ['id', 'company', 'state', 'rm', 'reviewer', 'aging', 'blockerCats', 'lastContact', 'contactAttempts'],
  },
  mgmt: {
    label: 'Management Overview',
    filter: (c) => !TERMINAL_STATES.includes(c.currentState),
    columns: ['id', 'company', 'state', 'rm', 'reviewer', 'aging', 'registrationDate', 'totalDays', 'blockerCats'],
  },
};

// ── State ──
let currentView = 'all';
let currentRole = 'ops';
let searchText = '';
let stateFilter = '';

function currentRmName() {
  const map = { rm_sarah: 'Sarah Lin', rm_mike: 'Mike Tan', rm_tom: 'Tom Chang' };
  return map[currentRole] || '';
}

function roleLabel() {
  const map = { ops: 'Ops PM', kyb: 'KYB Reviewer', compliance: 'Compliance', rm_sarah: 'RM — Sarah Lin', rm_mike: 'RM — Mike Tan', rm_tom: 'RM — Tom Chang' };
  return map[currentRole] || currentRole;
}

// ── Column renderers ──
function renderCell(col, c) {
  const days = getDaysInState(c.stateEntryDate);
  switch (col) {
    case 'id': return `<a href="case-detail.html?id=${c.id}" style="color:#1677ff;font-weight:600">${c.id}</a>${c.priorityFlag ? ' <span class="priority-flag" title="Priority">⚑</span>' : ''}`;
    case 'company': return `<strong>${c.companyName}</strong><div style="font-size:11px;color:#8c8c8c">${c.customerName}</div>`;
    case 'state': return `<span class="${stateTagClass(c.currentState)}">${c.currentState}</span>`;
    case 'rm': return c.rmOwner || '—';
    case 'reviewer': return c.kybReviewer || c.complianceReviewer || '<span style="color:#8c8c8c">Unassigned</span>';
    case 'kybReviewer': return c.kybReviewer || '<span style="color:#8c8c8c">Unassigned</span>';
    case 'complianceReviewer': return c.complianceReviewer || '<span style="color:#8c8c8c">Unassigned</span>';
    case 'aging': return agingHtml(c.stateEntryDate);
    case 'blocker': return c.blockerCategories.length ? c.blockerCategories.map(x => `<span class="tag tag-orange">${x}</span>`).join(' ') : '<span style="color:#8c8c8c">—</span>';
    case 'blockerCats': return c.blockerCategories.length ? c.blockerCategories.map(x => `<span class="blocker-tag">${x}</span>`).join(' ') : '<span style="color:#8c8c8c">—</span>';
    case 'priority': return c.priorityFlag ? '<span class="priority-flag">⚑ Yes</span>' : '—';
    case 'triggeredBy': return c.triggeredBy ? `<span class="tag tag-blue">${c.triggeredBy}</span>` : '—';
    case 'lastContact': return c.lastCustomerContact || '<span style="color:#8c8c8c">—</span>';
    case 'nextFollowup': return c.nextFollowupDate ? (c.nextFollowupDate <= TODAY ? `<span style="color:#ff4d4f;font-weight:600">${c.nextFollowupDate}</span>` : c.nextFollowupDate) : '<span style="color:#8c8c8c">—</span>';
    case 'responded': return c.customerResponded ? '<span class="tag tag-green">✓ Yes</span>' : '<span class="tag tag-gray">No</span>';
    case 'responseDate': return c.responseDate || '—';
    case 'contactAttempts': return c.contactAttempts || 0;
    case 'waitingRound': return c.waitingRound || 0;
    case 'kybSubmissionDate': return c.kybSubmissionDate || '—';
    case 'complianceStartDate': return c.complianceStartDate || '—';
    case 'registrationDate': return c.registrationDate || '—';
    case 'totalDays': {
      const reg = new Date(c.registrationDate);
      const end = c.decisionDate ? new Date(c.decisionDate) : new Date(TODAY);
      return Math.floor((end - reg) / 86400000) + 'd';
    }
    default: return '—';
  }
}

const COL_LABELS = {
  id: 'Case ID', company: 'Company', state: 'State', rm: 'RM Owner',
  reviewer: 'Reviewer', kybReviewer: 'KYB Reviewer', complianceReviewer: 'Compliance Reviewer',
  aging: 'Aging', blocker: 'Blockers', blockerCats: 'Blockers', priority: 'Priority',
  triggeredBy: 'Triggered By', lastContact: 'Last Contact', nextFollowup: 'Next Follow-up',
  responded: 'Responded', responseDate: 'Response Date', contactAttempts: 'Attempts',
  waitingRound: 'Round', kybSubmissionDate: 'KYB Submitted', complianceStartDate: 'Compliance Start',
  registrationDate: 'Registered', totalDays: 'Total Days',
};

// ── Render table ──
function renderTable() {
  const cfg = VIEW_CONFIG[currentView];
  const role = currentRole;
  let rows = CASES.filter(c => cfg.filter(c, role));

  // Filter by search
  if (searchText) {
    const s = searchText.toLowerCase();
    rows = rows.filter(c => c.companyName.toLowerCase().includes(s) || c.id.toLowerCase().includes(s) || c.customerName.toLowerCase().includes(s));
  }
  // Filter by state
  if (stateFilter) {
    rows = rows.filter(c => c.currentState === stateFilter);
  }

  // Default sort: red first, then days desc
  rows.sort((a, b) => {
    const af = agingFlag(getDaysInState(a.stateEntryDate));
    const bf = agingFlag(getDaysInState(b.stateEntryDate));
    const order = { red: 0, yellow: 1, green: 2 };
    if (order[af] !== order[bf]) return order[af] - order[bf];
    return getDaysInState(b.stateEntryDate) - getDaysInState(a.stateEntryDate);
  });

  const cols = cfg.columns;
  const thead = `<tr>${cols.map(c => `<th>${COL_LABELS[c] || c}</th>`).join('')}</tr>`;
  const tbody = rows.length === 0
    ? `<tr><td colspan="${cols.length}" class="table-empty">No cases match this view.</td></tr>`
    : rows.map(r => `<tr onclick="window.location='case-detail.html?id=${r.id}'">${cols.map(c => `<td>${renderCell(c, r)}</td>`).join('')}</tr>`).join('');

  document.getElementById('table-head').innerHTML = thead;
  document.getElementById('table-body').innerHTML = tbody;
  document.getElementById('result-count').textContent = `${rows.length} case${rows.length !== 1 ? 's' : ''}`;

  // Stats for management view
  const statsBar = document.getElementById('stats-bar');
  if (statsBar) {
    if (currentView === 'mgmt') {
      const active = CASES.filter(c => !TERMINAL_STATES.includes(c.currentState));
      const red = active.filter(c => agingFlag(getDaysInState(c.stateEntryDate)) === 'red').length;
      const waiting = active.filter(c => c.currentState === 'Waiting Customer').length;
      const returned = active.filter(c => c.customerResponded).length;
      statsBar.innerHTML = `
        <div class="stat-card"><div class="stat-label">Active Cases</div><div class="stat-value">${active.length}</div></div>
        <div class="stat-card"><div class="stat-label">Overdue 🔴</div><div class="stat-value red">${red}</div></div>
        <div class="stat-card"><div class="stat-label">Waiting Customer</div><div class="stat-value orange">${waiting}</div></div>
        <div class="stat-card"><div class="stat-label">Returned — Pickup Needed</div><div class="stat-value${returned ? ' red' : ' green'}">${returned}</div></div>
      `;
      statsBar.style.display = 'flex';
    } else {
      statsBar.style.display = 'none';
    }
  }
}

// ── Nav switching ──
function switchView(view) {
  currentView = view;
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const activeNav = document.querySelector(`[data-view="${view}"]`);
  if (activeNav) activeNav.classList.add('active');

  const pageTitleEl = document.getElementById('page-title');
  if (pageTitleEl) pageTitleEl.textContent = VIEW_CONFIG[view]?.label || view;

  const returned = CASES.filter(c => c.customerResponded).length;
  if (view === 'returned' && returned > 0) {
    const alertEl = document.getElementById('returned-alert');
    if (alertEl) alertEl.style.display = 'flex';
  } else {
    const alertEl = document.getElementById('returned-alert');
    if (alertEl) alertEl.style.display = 'none';
  }

  renderTable();
}

// ── Role switch ──
function switchRole(role) {
  currentRole = role;
  const badge = document.getElementById('role-badge');
  if (badge) badge.textContent = roleLabel();
  renderTable();
}

// ── Search / filter ──
function onSearch(val) {
  searchText = val;
  renderTable();
}

function onStateFilter(val) {
  stateFilter = val;
  renderTable();
}

// ── Badge counts for sidebar ──
function updateBadges() {
  const returned = CASES.filter(c => c.customerResponded).length;
  const overdue = CASES.filter(c => agingFlag(getDaysInState(c.stateEntryDate)) === 'red' && !TERMINAL_STATES.includes(c.currentState)).length;
  const waitingCust = CASES.filter(c => c.currentState === 'Waiting Customer').length;
  const el = (id) => document.getElementById(id);
  if (el('badge-returned')) el('badge-returned').textContent = returned || '';
  if (el('badge-overdue')) el('badge-overdue').textContent = overdue || '';
  if (el('badge-waiting')) el('badge-waiting').textContent = waitingCust || '';
}

// ── Init for index.html ──
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

// ── Drawer helpers ──
function openDrawer(id) {
  document.getElementById(id)?.classList.add('open');
  document.getElementById('drawer-backdrop')?.classList.add('open');
}
function closeDrawer(id) {
  document.getElementById(id)?.classList.remove('open');
  document.getElementById('drawer-backdrop')?.classList.remove('open');
}
function openModal(id) {
  document.getElementById(id)?.classList.add('open');
}
function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
}
