export type ProjectStatus = 'live' | 'qc' | 'completed' | 'paused';
export type RiskLevel = 'ontrack' | 'atrisk' | 'delayed';
export type Methodology = 'Online' | 'CATI' | 'Hybrid';
export type SupplyType = 'Panel Supply' | 'Vendor Supply' | 'Both';
export type AccountOwner = 'Uma' | 'Yoshith' | 'Gokul' | 'Pradeepa';
export type PanelistType = 'HCPs' | 'Patients' | 'Healthcare Consumers' | 'Industry Experts';

export interface Project {
  id: number;
  name: string;
  client: string;
  method: Methodology;
  supplyType: SupplyType;
  accountOwner: AccountOwner;
  status: ProjectStatus;
  n: number;
  complete: number;
  ir: number;
  loi: number;
  cpi: number;
  geo: string;
  risk: RiskLevel;
  revenue: number;
  vendorCost: number;
  startDate: string;
  endDate: string;
  pm: string;
  insight: string;
  irTrend: number[];
  dailyCompletes: number[];
}

export interface Vendor {
  id: number;
  name: string;
  country: string;
  score: number;
  completes: number;
  cpi: number;
  status: 'active' | 'review' | 'paused';
  specialty: string;
  projects: number;
  avgIR: number;
  fraudRate: number;
  responseTime: string;
  tier: 'gold' | 'silver' | 'bronze';
}

export interface Panelist {
  id: number;
  name: string;
  initials: string;
  age: number;
  geo: string;
  type: PanelistType;
  specialty: string;
  quality: number;
  status: 'active' | 'inactive' | 'suspended';
  surveys: number;
  avgLoi: number;
  joinDate: string;
  flagged: boolean;
}

export interface Interviewer {
  id: number;
  name: string;
  initials: string;
  calls: number;
  completed: number;
  pending: number;
  callback: number;
  avgDur: string;
  quality: number;
  status: 'online' | 'break' | 'offline';
  languages: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    name: 'GLP-1 Adoption Study – India',
    client: 'IQVIA',
    method: 'Online',
    supplyType: 'Panel Supply',
    accountOwner: 'Uma',
    status: 'live',
    n: 500,
    complete: 342,
    ir: 28,
    loi: 15,
    cpi: 5.20,
    geo: 'India',
    risk: 'ontrack',
    revenue: 177840,
    vendorCost: 108000,
    startDate: 'Apr 1, 2025',
    endDate: 'Apr 18, 2025',
    pm: 'Ramesh',
    insight: 'IR holding strong at 28% — 4pts above forecast. On pace to deliver 2 days early.',
    irTrend: [24, 26, 28, 27, 30, 28, 29, 28],
    dailyCompletes: [38, 45, 52, 41, 48, 55, 63, 0],
  },
  {
    id: 2,
    name: 'Oncology Patient Journey – Tier 1 Cities',
    client: 'Sermo',
    method: 'Online',
    supplyType: 'Both',
    accountOwner: 'Yoshith',
    status: 'live',
    n: 800,
    complete: 411,
    ir: 34,
    loi: 12,
    cpi: 3.80,
    geo: 'India – Metro',
    risk: 'atrisk',
    revenue: 304000,
    vendorCost: 195000,
    startDate: 'Mar 28, 2025',
    endDate: 'Apr 15, 2025',
    pm: 'Rohini',
    insight: 'Quota imbalance detected in female oncology segment — only 38% filled. Action needed.',
    irTrend: [38, 36, 35, 33, 31, 34, 34, 34],
    dailyCompletes: [60, 72, 58, 65, 40, 38, 78, 0],
  },
  {
    id: 3,
    name: 'Orthopedic Injection Market Study',
    client: 'GLG',
    method: 'CATI',
    supplyType: 'Panel Supply',
    accountOwner: 'Gokul',
    status: 'qc',
    n: 300,
    complete: 300,
    ir: 45,
    loi: 8,
    cpi: 6.50,
    geo: 'Pan India',
    risk: 'ontrack',
    revenue: 195000,
    vendorCost: 112000,
    startDate: 'Mar 20, 2025',
    endDate: 'Apr 5, 2025',
    pm: 'Aravind',
    insight: 'Field complete. QC flagged 4 speeders — pending client sign-off before delivery.',
    irTrend: [42, 44, 46, 45, 47, 45, 44, 45],
    dailyCompletes: [30, 35, 40, 38, 45, 48, 52, 12],
  },
  {
    id: 4,
    name: 'Diabetes Management Behavior Study',
    client: 'M3 Global',
    method: 'Hybrid',
    supplyType: 'Vendor Supply',
    accountOwner: 'Pradeepa',
    status: 'live',
    n: 600,
    complete: 189,
    ir: 18,
    loi: 20,
    cpi: 7.20,
    geo: 'India – Tier 1 & 2',
    risk: 'delayed',
    revenue: 432000,
    vendorCost: 318000,
    startDate: 'Mar 25, 2025',
    endDate: 'Apr 12, 2025',
    pm: 'Saranya',
    insight: 'IR dropped to 18% — 10pts below target. Recommend adding 2 backup vendors today.',
    irTrend: [30, 27, 25, 22, 20, 18, 18, 18],
    dailyCompletes: [28, 30, 25, 22, 18, 20, 24, 22],
  },
  {
    id: 5,
    name: 'Cardiology Device Usage Study',
    client: 'IPSOS',
    method: 'CATI',
    supplyType: 'Panel Supply',
    accountOwner: 'Uma',
    status: 'qc',
    n: 400,
    complete: 388,
    ir: 52,
    loi: 6,
    cpi: 4.10,
    geo: 'India',
    risk: 'ontrack',
    revenue: 164000,
    vendorCost: 94000,
    startDate: 'Apr 2, 2025',
    endDate: 'Apr 10, 2025',
    pm: 'Rohini',
    insight: 'Near complete with exceptional IR of 52%. Remaining 12 completes in callback queue.',
    irTrend: [48, 50, 52, 51, 53, 52, 52, 52],
    dailyCompletes: [45, 50, 55, 60, 58, 52, 48, 20],
  },
  {
    id: 6,
    name: 'GLP-1 Adoption Study – India',
    client: 'DataSpring',
    method: 'Online',
    supplyType: 'Both',
    accountOwner: 'Yoshith',
    status: 'completed',
    n: 1000,
    complete: 1000,
    ir: 22,
    loi: 18,
    cpi: 4.50,
    geo: 'India',
    risk: 'ontrack',
    revenue: 450000,
    vendorCost: 270000,
    startDate: 'Mar 10, 2025',
    endDate: 'Mar 31, 2025',
    pm: 'Ramesh',
    insight: 'Delivered 3 days ahead of schedule. Client satisfaction score: 9.2/10.',
    irTrend: [20, 21, 22, 23, 22, 22, 22, 22],
    dailyCompletes: [55, 62, 70, 68, 75, 80, 90, 100],
  },
  {
    id: 7,
    name: 'Oncology Patient Journey – Tier 1 Cities',
    client: 'M360',
    method: 'Online',
    supplyType: 'Vendor Supply',
    accountOwner: 'Gokul',
    status: 'live',
    n: 750,
    complete: 520,
    ir: 31,
    loi: 14,
    cpi: 4.20,
    geo: 'India – Tier 1',
    risk: 'atrisk',
    revenue: 315000,
    vendorCost: 196000,
    startDate: 'Apr 1, 2025',
    endDate: 'Apr 16, 2025',
    pm: 'Aravind',
    insight: 'Pace slowing — averaging 42/day vs 60 needed. Panel yield declining in metro segments.',
    irTrend: [34, 33, 32, 31, 30, 31, 31, 31],
    dailyCompletes: [65, 62, 58, 48, 44, 42, 42, 0],
  },
  {
    id: 8,
    name: 'Orthopedic Injection Market Study',
    client: 'GLG',
    method: 'CATI',
    supplyType: 'Panel Supply',
    accountOwner: 'Pradeepa',
    status: 'live',
    n: 500,
    complete: 210,
    ir: 41,
    loi: 10,
    cpi: 5.80,
    geo: 'India – Rural',
    risk: 'delayed',
    revenue: 290000,
    vendorCost: 188000,
    startDate: 'Mar 29, 2025',
    endDate: 'Apr 11, 2025',
    pm: 'Saranya',
    insight: 'Rural connectivity impacting call success rates. Consider SMS pre-notification.',
    irTrend: [48, 45, 43, 41, 40, 41, 41, 41],
    dailyCompletes: [30, 28, 25, 22, 20, 24, 28, 0],
  },
];

export const vendors: Vendor[] = [
  { id: 1, name: 'M3 Panel India', country: 'India', score: 92, completes: 28400, cpi: 2.10, status: 'active', specialty: 'Healthcare', projects: 5, avgIR: 33, fraudRate: 0.8, responseTime: '< 2 hrs', tier: 'gold' },
  { id: 2, name: 'Sermo Network', country: 'USA', score: 87, completes: 19200, cpi: 2.40, status: 'active', specialty: 'HCP', projects: 4, avgIR: 29, fraudRate: 1.2, responseTime: '< 4 hrs', tier: 'gold' },
  { id: 3, name: 'PanelXchange', country: 'Singapore', score: 79, completes: 11000, cpi: 3.20, status: 'active', specialty: 'Patient', projects: 3, avgIR: 24, fraudRate: 1.9, responseTime: '< 6 hrs', tier: 'silver' },
  { id: 4, name: 'DataSpring Asia', country: 'Japan', score: 71, completes: 6500, cpi: 4.80, status: 'active', specialty: 'Consumer', projects: 2, avgIR: 19, fraudRate: 2.4, responseTime: '< 8 hrs', tier: 'silver' },
  { id: 5, name: 'Kantar Health Panel', country: 'India', score: 65, completes: 4300, cpi: 2.80, status: 'review', specialty: 'Consumer', projects: 2, avgIR: 38, fraudRate: 3.1, responseTime: '< 12 hrs', tier: 'bronze' },
  { id: 6, name: 'Dynata Healthcare', country: 'UK', score: 88, completes: 9800, cpi: 5.10, status: 'active', specialty: 'Industry', projects: 1, avgIR: 26, fraudRate: 0.9, responseTime: '< 3 hrs', tier: 'gold' },
  { id: 7, name: 'HealthPanel.io', country: 'India', score: 55, completes: 2900, cpi: 1.90, status: 'paused', specialty: 'Patient', projects: 1, avgIR: 21, fraudRate: 4.8, responseTime: '> 24 hrs', tier: 'bronze' },
];

export const panelists: Panelist[] = [
  { id: 1, name: 'Dr. Priya Sharma', initials: 'PS', age: 44, geo: 'Mumbai', type: 'HCPs', specialty: 'Oncology', quality: 95, status: 'active', surveys: 142, avgLoi: 14, joinDate: 'Jan 2023', flagged: false },
  { id: 2, name: 'Rahul Mehta', initials: 'RM', age: 58, geo: 'Delhi', type: 'Patients', specialty: 'Cardiology', quality: 88, status: 'active', surveys: 89, avgLoi: 11, joinDate: 'Mar 2023', flagged: false },
  { id: 3, name: 'Dr. Ananya Singh', initials: 'AS', age: 39, geo: 'Bangalore', type: 'HCPs', specialty: 'Endocrinology', quality: 91, status: 'active', surveys: 204, avgLoi: 16, joinDate: 'Oct 2022', flagged: false },
  { id: 4, name: 'Vikram Patel', initials: 'VP', age: 47, geo: 'Ahmedabad', type: 'Healthcare Consumers', specialty: 'Diabetes Care', quality: 76, status: 'active', surveys: 67, avgLoi: 13, joinDate: 'Jun 2023', flagged: false },
  { id: 5, name: 'Deepa Nair', initials: 'DN', age: 52, geo: 'Chennai', type: 'Patients', specialty: 'Orthopedics', quality: 82, status: 'inactive', surveys: 118, avgLoi: 15, joinDate: 'Feb 2023', flagged: false },
  { id: 6, name: 'Suresh Kumar', initials: 'SK', age: 61, geo: 'Hyderabad', type: 'Healthcare Consumers', specialty: 'General', quality: 69, status: 'active', surveys: 45, avgLoi: 9, joinDate: 'Sep 2023', flagged: true },
  { id: 7, name: 'Dr. Meera Joshi', initials: 'MJ', age: 36, geo: 'Pune', type: 'HCPs', specialty: 'Neurology', quality: 93, status: 'active', surveys: 78, avgLoi: 18, joinDate: 'Apr 2023', flagged: false },
  { id: 8, name: 'Arun Das', initials: 'AD', age: 55, geo: 'Kolkata', type: 'Industry Experts', specialty: 'Pharma Distribution', quality: 85, status: 'active', surveys: 156, avgLoi: 12, joinDate: 'Nov 2022', flagged: false },
  { id: 9, name: 'Kavitha Rao', initials: 'KR', age: 43, geo: 'Chennai', type: 'HCPs', specialty: 'Cardiology', quality: 90, status: 'active', surveys: 112, avgLoi: 14, joinDate: 'Jul 2023', flagged: false },
  { id: 10, name: 'Nikhil Verma', initials: 'NV', age: 67, geo: 'Delhi', type: 'Patients', specialty: 'Oncology', quality: 78, status: 'active', surveys: 34, avgLoi: 10, joinDate: 'Feb 2024', flagged: false },
  { id: 11, name: 'Sunita Pillai', initials: 'SP', age: 38, geo: 'Bangalore', type: 'Healthcare Consumers', specialty: 'Preventive Care', quality: 84, status: 'active', surveys: 95, avgLoi: 13, joinDate: 'Sep 2022', flagged: false },
  { id: 12, name: 'Rajan Krishnamurthy', initials: 'RK', age: 50, geo: 'Mumbai', type: 'Industry Experts', specialty: 'Medical Devices', quality: 87, status: 'active', surveys: 63, avgLoi: 16, joinDate: 'Mar 2023', flagged: false },
];

export const interviewers: Interviewer[] = [
  { id: 1, name: 'Kavitha R.', initials: 'KR', calls: 48, completed: 44, pending: 2, callback: 2, avgDur: '8:32', quality: 94, status: 'online', languages: ['Hindi', 'Tamil'] },
  { id: 2, name: 'Manish T.', initials: 'MT', calls: 39, completed: 35, pending: 3, callback: 1, avgDur: '9:14', quality: 89, status: 'online', languages: ['Hindi', 'Marathi'] },
  { id: 3, name: 'Sneha B.', initials: 'SB', calls: 52, completed: 49, pending: 1, callback: 2, avgDur: '7:55', quality: 96, status: 'break', languages: ['Hindi', 'Bengali'] },
  { id: 4, name: 'Rajan K.', initials: 'RK', calls: 31, completed: 26, pending: 4, callback: 1, avgDur: '10:22', quality: 78, status: 'online', languages: ['Hindi', 'Telugu'] },
  { id: 5, name: 'Leela M.', initials: 'LM', calls: 44, completed: 40, pending: 2, callback: 2, avgDur: '8:48', quality: 91, status: 'online', languages: ['Hindi', 'Kannada'] },
  { id: 6, name: 'Amir H.', initials: 'AH', calls: 27, completed: 22, pending: 3, callback: 2, avgDur: '11:05', quality: 72, status: 'offline', languages: ['Hindi', 'Urdu'] },
];

export const kpiHistory = {
  revenue: [18.2, 21.4, 19.8, 24.1, 22.7, 23.2],
  cost: [11.8, 13.9, 12.4, 14.8, 14.1, 14.4],
  months: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
  irTrend: [29, 32, 28, 35, 31, 33, 27, 30],
  irDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Today'],
};

export const alerts = [
  { id: 1, type: 'danger',  title: 'IR Alert',     message: 'Diabetes Management study IR at 18% — 10pts below target', time: '12 min ago' },
  { id: 2, type: 'warning', title: 'Quota Gap',     message: 'Oncology Patient Journey — female HCP quota at 38% fill rate', time: '1 hr ago' },
  { id: 3, type: 'warning', title: 'Vendor Pace',   message: 'M3 Panel daily yield dropped 30% on Orthopedic study', time: '2 hrs ago' },
  { id: 4, type: 'success', title: 'QC Passed',     message: 'Cardiology Device Usage — 388 completes cleared quality checks', time: '3 hrs ago' },
  { id: 5, type: 'info',    title: 'Invoice Ready', message: 'GLP-1 Adoption Study (DataSpring) — invoice of Rs 4.5L generated', time: '1 day ago' },
];

export const ACCOUNT_OWNERS: AccountOwner[] = ['Uma', 'Yoshith', 'Gokul', 'Pradeepa'];
export const PROJECT_MANAGERS = ['Ramesh', 'Rohini', 'Aravind', 'Saranya'];
export const SUPPLY_TYPES: SupplyType[] = ['Panel Supply', 'Vendor Supply', 'Both'];
export const PANELIST_TYPES: PanelistType[] = ['HCPs', 'Patients', 'Healthcare Consumers', 'Industry Experts'];
