// Every statement here is copied from the pre-React site. Do not add claims
// that are not on the record (see PRODUCT.md, "Evidence on Hand").

export const contact = {
  name: 'Ethan Young',
  location: 'Las Vegas, NV',
  email: 'ethanthanhyoung@gmail.com',
  github: 'https://github.com/EthanT-Young',
  githubLabel: 'github.com/EthanT-Young',
  linkedin: 'https://www.linkedin.com/in/ethan-t-young/',
  linkedinLabel: 'linkedin.com/in/ethan-t-young',
  resume: '/Ethan_Young_Resume.pdf',
};

export type Entry = {
  title: string;
  org: string;
  date: string;
  datetime: string;
  bullets: { label?: string; text: string }[];
};

export const experience: Entry[] = [
  {
    title: 'AI Software Engineer Intern',
    org: 'Symphonix Systems · Remote/Hybrid',
    date: 'Jun 2026 – Present',
    datetime: '2026-06',
    bullets: [
      { text: 'Co-developed 17 specialized AI agents and contributed to a multi-agent orchestration flow using dynamic routing to dispatch tasks based on domain context.' },
      { text: 'Built an automated testing harness using LLM-as-a-Judge patterns to validate agent behavior, reducing reliance on manual review.' },
      { text: 'Integrated hybrid SQL/MongoDB persistence for execution context and prior state across recurring agent workflows.' },
    ],
  },
  {
    title: 'Systems & Infrastructure Intern',
    org: 'University of Nevada, Las Vegas (OIT)',
    date: 'Apr 2026 – Present',
    datetime: '2026-04',
    bullets: [
      { text: 'Audited fiber pathways across multiple facilities and synchronized physical assets with Schneider Electric EcoStruxure DCIM records.' },
      { text: 'Supported decommissioning of an HPC cluster by documenting GPU compute servers and InfiniBand networking hardware.' },
      { text: 'Reviewed network/security logs to identify anomalous SNMP authentication events; traced source devices using DNS/MAC lookup tools.' },
    ],
  },
  {
    title: 'Network Engineer Intern',
    org: 'University of Nevada, Las Vegas (OIT)',
    date: 'Mar 2025 – Apr 2026',
    datetime: '2025-03',
    bullets: [
      { text: 'Collaborated with a 15-person team on a campus-wide Cisco-to-Juniper migration across a ~4,500-device portfolio.' },
      { text: 'Developed standardized configuration templates and automated IP management workflows for consistent VLAN/port-level logic across 660+ switches.' },
    ],
  },
];

export const education: Entry[] = [
  {
    title: 'Bachelor of Science, Computer Science',
    org: 'University of Nevada, Las Vegas',
    date: 'Expected May 2027',
    datetime: '2027-05',
    bullets: [
      { label: 'Relevant coursework:', text: 'Object Oriented Programming, Data Structures and Algorithms, Analysis of Algorithms, Intro to Machine Learning, Operating Systems, Cloud Computing.' },
      { label: 'Leadership:', text: 'Officer, Association for Computing Machinery (ACM) Student Chapter' },
      { label: 'Honors:', text: 'Charter member, IEEE Honor Society (HKN)' },
    ],
  },
];

export type ProjectSummary = {
  slug: string;
  title: string;
  date: string;
  datetime: string;
  tech: string;
  /** One-line teaser for the homepage. */
  teaser: string;
  /** Longer summary for /projects/. */
  summary: string;
};

export const projects: ProjectSummary[] = [
  {
    slug: 'code-visualizer',
    title: 'Code Visualizer',
    date: 'Nov 2026',
    datetime: '2026-11',
    tech: 'React · Python · Java · C++ · Docker',
    teaser: 'A web app that steps through Java, C++ or Python line by line and draws the arrays, maps, lists, trees and call stack as they change.',
    summary: 'Step through Java, C++ or Python code line by line and watch arrays, hash maps, linked lists, trees and the call stack change. Java and C++ run in a locked-down container on my server; Python runs in the browser.',
  },
  {
    slug: 'kibitz-chess',
    title: 'Kibitz',
    date: 'Nov 2026',
    datetime: '2026-11',
    tech: 'React · TypeScript · Stockfish (WebAssembly) · Docker',
    teaser: 'A free chess game review that runs Stockfish in your browser, gives every move a verdict and explains it in plain English.',
    summary: 'Import a game from Chess.com or Lichess and get accuracy, a verdict on every move and a coach that explains what each move did. Stockfish runs in your browser, so my server only serves static files.',
  },
  {
    slug: 'cloud-infrastructure',
    title: 'Personal Cloud Infrastructure',
    date: '2026 – Present',
    datetime: '2026',
    tech: 'Docker · Caddy · OCI · Linux',
    teaser: 'I run this site and several services on an Oracle Cloud free-tier instance behind Caddy.',
    summary: 'An Oracle Cloud Always Free instance that runs this website and several containerized services. Caddy routes each subdomain and manages its HTTPS certificates.',
  },
  {
    slug: 'rebel-locate',
    title: 'Rebel Locate',
    date: 'Jan 2025 – May 2025',
    datetime: '2025-01',
    tech: 'Python · PyTorch · scikit-learn · NumPy',
    teaser: 'Team machine learning course project that locates UNLV buildings from the GPS data in photos. My KNN model found the building with 98.01% accuracy, and my CNN labeled the room with 91.83%.',
    summary: 'A team project for my machine learning course that locates the UNLV building a photo was taken near from its GPS metadata and labels the type of room. My KNN building model reached 98.01% accuracy, and my CNN room model reached 91.83%.',
  },
];

export const skills: { category: string; items: string[] }[] = [
  { category: 'Languages', items: ['Java', 'C++', 'C#', 'C', 'Python', 'SQL', 'x86/MIPS Assembly'] },
  { category: 'Cloud, DevOps & Data', items: ['Docker', 'Caddy', 'Linux', 'OCI', 'AWS', 'Git/GitHub', 'PostgreSQL'] },
  { category: 'Networking & Infrastructure', items: ['Juniper Junos', 'Cisco IOS', 'Infoblox', 'NetBox', 'SolarWinds', 'OpManager', 'EcoStruxure'] },
];
