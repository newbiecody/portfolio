export interface IExperience {
  title: string;
  company: string;
  location: string;
  roleDesc: string;
  startDate: string;
  endDate?: string;
  achievements?: string[];
  skills: string[];
}
export type TExperiences = IExperience[];

export const experiences: TExperiences = [
  {
    title: "Full-Stack Engineer",
    company: "Vistra Singapore",
    location: "Singapore",
    startDate: "Mar 2026",
    roleDesc: "Building features across Next.js and Node.js.",
    skills: ["Next.js", "Node.js"],
  },
  {
    title: "Full-Stack Engineer",
    company: "DCS Card Center",
    location: "Singapore",
    startDate: "Mar 2025",
    endDate: "Mar 2026",
    roleDesc:
      "Built and scaled backend services and customer-operations tooling for a card-issuing business.",
    achievements: [
      "Cut high-traffic API response times from 1–2 minutes to under 1 second through query refactoring, indexing, and caching.",
      "Automated card add-ons, fee waivers, and similar workflows, reducing manual agent intervention by ~80%.",
      "Built a JWT + Lark OAuth sidebar app embedded in Zendesk, letting agents process customer requests (card closure, address updates) without leaving the ticket.",
      "Stood up Grafana and Prometheus dashboards for backend services, surfacing performance regressions and scaling bottlenecks before they hit customers.",
      "Introduced async task workers in Spring Boot to offload heavy operations and keep response times stable under load.",
      "Refactored legacy services with parameterized SQL, closing injection risks and improving maintainability.",
    ],
    skills: ["TypeScript", "Spring Boot", "PostgreSQL", "Redis", "Grafana", "Prometheus"],
  },
  {
    title: "Software Engineer",
    company: "Kiteworks",
    location: "Singapore",
    startDate: "May 2022",
    endDate: "Jan 2025",
    roleDesc:
      "Full-stack engineer on a secure file-sharing platform serving enterprise customers.",
    achievements: [
      "Built interactive compliance dashboards in React + TypeScript, giving compliance officers visibility into file activity and policy violations.",
      "Audited and remediated CVEs in frontend dependencies, replacing or patching compromised libraries to keep the platform compliant for enterprise customers.",
      "Identified privilege-escalation and broken-access-control vulnerabilities during internal bug bashes, preventing scope-bypass issues from reaching production.",
      "Migrated frontend components from JSX to TSX and introduced custom React hooks, improving type safety and reducing duplication across teams.",
      "Led bug triages, sprint planning, and cross-team security reviews across engineering, product, and compliance.",
    ],
    skills: ["React", "TypeScript", "Node.js", "Python", "PHP", "PostgreSQL", "Vue"],
  },
  {
    title: "Software Engineer Intern",
    company: "ST Engineering",
    location: "Singapore",
    startDate: "Jan 2021",
    endDate: "May 2021",
    roleDesc:
      "Reduced an RPA job's runtime from 10 minutes to 1–2 minutes by replacing brittle automation tasks with Python scripts and partnering with the RPA vendor on bug fixes.",
    skills: ["Python", "RPA"],
  },
];
