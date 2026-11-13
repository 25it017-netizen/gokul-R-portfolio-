export interface ExpertiseCategory {
  id: string;
  number: string;
  title: string;
  description: string;
  skills: string[];
}

export interface ExperienceGroup {
  code: string;
  title: string;
  focus: string;
  items: string[];
}

export interface CapabilityItem {
  number: string;
  title: string;
  description: string;
}

export interface EducationItem {
  degree: string;
  shortCode: string;
  institution: string;
  university: string;
}

export const RESUME_PDF_PATH = '/assets/aistudio/Gokul_IT_admin_7a78b58b.pdf';
export const RESUME_FILENAME = 'Gokula_Kannan_R_Resume.pdf';

export const PROFILE = {
  monogram: 'GK',
  nameLines: ['GOKULA', 'KANNAN R.'] as const,
  fullName: 'Gokula Kannan R',
  role: 'L1 IT Support Engineer',
  heroRole: 'L1 SUPPORT ENGINEER',
  experienceYearsBadge: '06+',
  experienceFullText: '6 Years 4 Months',
  experienceLabel: 'YEARS OF PROFESSIONAL EXPERIENCE',
  tagline: 'Keeping systems connected, infrastructure stable and people productive.',
  summary:
    'Detail-oriented IT professional with over six years of experience in system administration and IT asset management. Experienced in managing the full asset lifecycle, software license compliance, Windows Server maintenance, network troubleshooting and IT infrastructure operations.',
  company: 'Iprotecs Solution Private Limited',
  period: 'June 2020 – Present',
  clientLocation: 'Detasad – Head Office, Saudi Arabia',
  phoneDisplay: '+91-9003335671',
  phoneHref: 'tel:+919003335671',
  email: 'rgksrt10@gmail.com',
  emailHref: 'mailto:rgksrt10@gmail.com',
  linkedinUrl:
    'https://www.linkedin.com/in/gokulakannan-r-609933174?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  linkedinDisplay: 'linkedin.com/in/gokulakannan-r-609933174',
  identificationStrip: 'GK / PROFESSIONAL PROFILE / IT INFRASTRUCTURE / 2026',
};

export const ABOUT_CONTENT = {
  heading: 'THE PERSON BEHIND THE SYSTEMS.',
  paragraphs: [
    'I am Gokula Kannan R, an IT Support Engineer with more than six years of professional experience in technical support, system administration and IT asset management.',
    'My experience includes Windows Server maintenance, Active Directory administration, network troubleshooting, endpoint management and Microsoft 365 support.',
    'I work to maintain reliable IT environments, resolve technical issues, manage IT assets and support smooth day-to-day business operations.',
  ],
};

export const EXPERTISE_CATEGORIES: ExpertiseCategory[] = [
  {
    id: 'os',
    number: '01',
    title: 'OPERATING SYSTEMS',
    description:
      'Day-to-day administration, workstation readiness, and server environment support across Windows platforms.',
    skills: ['Windows 10', 'Windows 11', 'Windows Server'],
  },
  {
    id: 'ad',
    number: '02',
    title: 'ACTIVE DIRECTORY',
    description:
      'Identity lifecycle operations, access control hygiene, and directory account administration.',
    skills: [
      'User creation',
      'Password resets',
      'Account unlocks',
      'Security groups',
      'Computer accounts',
    ],
  },
  {
    id: 'server',
    number: '03',
    title: 'SERVER ADMINISTRATION',
    description:
      'Proactive Windows Server health checks, event log diagnostics, and connectivity stabilization.',
    skills: [
      'Server connectivity troubleshooting',
      'Service monitoring',
      'Event Viewer',
      'Disk space monitoring',
      'Windows Server maintenance',
    ],
  },
  {
    id: 'itam',
    number: '04',
    title: 'IT ASSET MANAGEMENT',
    description:
      'End-to-end hardware lifecycle governance from procurement coordination to warranty and inventory tracking.',
    skills: [
      'Asset inventory',
      'Asset tagging',
      'Hardware allocation',
      'Asset tracking',
      'Warranty management',
      'Procurement coordination',
    ],
  },
  {
    id: 'endpoint',
    number: '05',
    title: 'ENDPOINT MANAGEMENT',
    description:
      'Centralized workstation fleet patching, software distribution, and endpoint policy enforcement.',
    skills: [
      'ManageEngine Endpoint Central',
      'Software deployment',
      'Patch management',
      'Device control',
    ],
  },
  {
    id: 'm365',
    number: '06',
    title: 'MICROSOFT 365',
    description:
      'Cloud workplace administration covering user licensing, Exchange mailbox access, Outlook, and Teams.',
    skills: [
      'User account management',
      'License assignment',
      'Outlook troubleshooting',
      'Mailbox access support',
      'Microsoft Teams support',
    ],
  },
  {
    id: 'network',
    number: '07',
    title: 'NETWORKING',
    description:
      'Diagnostic command-line analysis and structured LAN, Wi-Fi, VPN, and protocol troubleshooting.',
    skills: [
      'TCP/IP',
      'DNS',
      'DHCP',
      'Ping',
      'Tracert',
      'Nslookup',
      'LAN and Wi-Fi troubleshooting',
      'VPN',
      'IPv4 and IPv6',
    ],
  },
  {
    id: 'support',
    number: '08',
    title: 'TECHNICAL SUPPORT',
    description:
      'Deskside and remote resolution for workstations, peripherals, drivers, malware incidents, and installations.',
    skills: [
      'Desktop and laptop troubleshooting',
      'Printer support',
      'Hardware and software installation',
      'Remote support',
      'Virus-related troubleshooting',
      'Driver installation',
    ],
  },
  {
    id: 'documentation',
    number: '09',
    title: 'DOCUMENTATION',
    description:
      'Structured operational record-keeping across hardware registers, recurring maintenance logs, and runbooks.',
    skills: [
      'IT asset register',
      'Maintenance reports',
      'Troubleshooting documentation',
    ],
  },
];

export const EXPERIENCE_GROUPS: ExperienceGroup[] = [
  {
    code: 'A',
    title: 'END-USER TECHNICAL SUPPORT',
    focus: 'Workstation, peripheral, and remote operational resolution',
    items: [
      'Desktop and laptop support.',
      'Printer troubleshooting.',
      'Hardware and software issue resolution.',
      'Operating system and application troubleshooting.',
      'Remote support.',
    ],
  },
  {
    code: 'B',
    title: 'SYSTEM ADMINISTRATION',
    focus: 'Active Directory governance and Windows Server upkeep',
    items: [
      'Active Directory user administration.',
      'Password resets and account unlocks.',
      'Windows Server connectivity troubleshooting.',
      'Windows Event Viewer log review.',
      'Service and disk space monitoring.',
      'Backup verification and server maintenance.',
    ],
  },
  {
    code: 'C',
    title: 'IT ASSET MANAGEMENT',
    focus: 'Full hardware lifecycle, tagging, and vendor coordination',
    items: [
      'Asset inventory maintenance.',
      'Asset tagging and tracking.',
      'Hardware allocation and collection.',
      'Asset transfers.',
      'Warranty management.',
      'Vendor coordination.',
    ],
  },
  {
    code: 'D',
    title: 'ENDPOINT AND PATCH MANAGEMENT',
    focus: 'Fleet compliance and centralized update deployment',
    items: [
      'ManageEngine Endpoint Central.',
      'Security updates.',
      'Application patching.',
      'Device management.',
    ],
  },
  {
    code: 'E',
    title: 'MICROSOFT 365 SUPPORT',
    focus: 'Cloud identity, licensing, and collaboration continuity',
    items: [
      'User account management.',
      'License assignment.',
      'Outlook troubleshooting.',
      'Mailbox configuration and access.',
      'Microsoft Teams support.',
    ],
  },
  {
    code: 'F',
    title: 'NETWORK AND SECURITY',
    focus: 'Connectivity diagnostics, firewall rules, and VPN support',
    items: [
      'TCP/IP configuration.',
      'IPv4 and IPv6 troubleshooting.',
      'DNS and network configuration.',
      'Ping, tracert, nslookup and netstat.',
      'Windows Defender Firewall inbound and outbound rules.',
      'Site-to-site VPN knowledge.',
      'LAN and connectivity troubleshooting.',
    ],
  },
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    number: '01',
    title: 'IT TECHNICAL SUPPORT',
    description:
      'Supporting end users and resolving hardware, software and connectivity issues.',
  },
  {
    number: '02',
    title: 'SYSTEM ADMINISTRATION',
    description:
      'Maintaining Windows systems, monitoring server services and managing user accounts.',
  },
  {
    number: '03',
    title: 'NETWORK TROUBLESHOOTING',
    description:
      'Diagnosing connectivity issues and configuring network settings.',
  },
  {
    number: '04',
    title: 'IT ASSET MANAGEMENT',
    description:
      'Tracking, allocating and maintaining IT hardware assets.',
  },
  {
    number: '05',
    title: 'MICROSOFT 365 SUPPORT',
    description:
      'Assisting with user accounts, Outlook, licensing and Teams.',
  },
  {
    number: '06',
    title: 'ENDPOINT MANAGEMENT',
    description:
      'Supporting device management, application deployment and patch management.',
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'MASTER OF COMPUTER APPLICATION (MCA)',
    shortCode: 'MCA',
    institution: 'KG – Institute of Information Management',
    university: 'Bharathiar University, Coimbatore.',
  },
  {
    degree: 'BACHELOR OF COMPUTER APPLICATION (BCA)',
    shortCode: 'BCA',
    institution: 'Roever College of Arts & Science',
    university: 'Bharathidasan University, Perambalur.',
  },
];

export const NAV_ITEMS = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'expertise', label: 'EXPERTISE' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'capabilities', label: 'CAPABILITIES' },
  { id: 'education', label: 'EDUCATION' },
  { id: 'contact', label: 'CONTACT' },
] as const;
