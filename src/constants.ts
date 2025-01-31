export interface IExperience {
  title: string;
  company: string;
  location: string;
  roleDesc: string;
  startDate: string;
  endDate?: string;
  // achievements: string[];
  skills: string[];
}
export type TExperiences = IExperience[];

export const experiences: TExperiences = [
  {
    title: "Software Engineer",
    company: "Kiteworks",
    location: "Singapore",
    startDate: "30 May 2022",
    roleDesc:
      "Contributed as both an individual contributor and a cross-functional team player, collaborating with diverse teams to deliver secure file-sharing solutions, enhance performance, and implement innovative features.",
    skills: ["React", "Python", "Vue", "PHP", "PostgreSQL"],
  },
  {
    title: "Software Engineer Intern",
    company: "ST Engineering",
    location: "Singapore",
    startDate: "1 Jan 2021",
    endDate: "1 May 2021",
    roleDesc:
      "Developed, refactored, and optimized Robotic Process Automation (RPA) pipelines for internal stakeholders, enhancing automation efficiency and reliability.",
    //   "Led efforts to optimize automation processes, achieving a significant reduction in job runtime from 10 minutes to 1–2 minutes.",
    //   "Replaced inefficient and error-prone automation tasks with Python scripts, enhancing job reliability and performance.",
    //   "Collaborated with the RPA software provider to address critical bugs, further improving the robustness and efficiency of automation solutions.",
    // ],
    skills: ["Python", "RPA", "Automation"],
  },
];
