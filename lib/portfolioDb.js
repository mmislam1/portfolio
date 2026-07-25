import { mkdir, readFile, rename, writeFile } from "fs/promises";
import path from "path";

export const portfolioDbPath = path.join(
  process.cwd(),
  "data",
  "portfolio.json"
);

const defaultPortfolioData = {
  profile: {
    greeting: "",
    name: "Mohaiminul Islam",
    headline: "Full-Stack Web Developer | MERN, Django, Python Automation",
    summary:
      "Full-stack web developer with professional experience building scalable MERN applications, React interfaces, REST APIs, and database-backed systems. Skilled across Node.js, Express.js, MongoDB, Django, PHP, and Python automation, with project work covering payment integrations, reverse image search, automated document generation, admin dashboards, and data workflows. Strong algorithmic foundation through Codeforces, LeetCode, Google Kickstart, and Google Code Jam.",
    photo: "/mm.jpg",
    resumeLink:
      "https://drive.google.com/file/d/1PN9v4fXd6DuopgR9tGupJshRp0AhurtF/view?usp=sharing",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/mmislam1",
        icon: "github",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/mohaiminul-islam-29a454139/",
        icon: "linkedin",
      },
      {
        label: "LeetCode",
        href: "https://leetcode.com/MMislam",
        icon: "leetcode",
      },
      {
        label: "Codeforces",
        href: "https://codeforces.com/profile/mmislam",
        icon: "codeforces",
      },
    ],
  },
  stats: [
    { value: "MERN", label: "Stack focus" },
    { value: "Django", label: "Backend option" },
    { value: "SQL", label: "Relational data" },
    { value: "NoSQL", label: "Document data" },
  ],
  focusAreas: [
    {
      icon: "code",
      title: "Full-stack development",
      text: "React interfaces, API layers, authentication-ready flows, and database-backed features.",
    },
    {
      icon: "layers",
      title: "Database design",
      text: "Relational and non-relational data models for practical web application requirements.",
    },
    {
      icon: "briefcase",
      title: "Problem solving",
      text: "Programming contest practice, algorithmic thinking, and implementation discipline.",
    },
  ],
  skillGroups: [
    {
      title: "Programming Languages",
      skills: [
        { title: "JavaScript (ES6+)", star: 4 },
        { title: "TypeScript", star: 3.5 },
        { title: "Python", star: 4 },
      ],
    },
    {
      title: "Frontend",
      skills: [
        { title: "React.js", star: 4 },
        { title: "Redux", star: 3.5 },
        { title: "HTML5", star: 4 },
        { title: "CSS3", star: 4 },
      ],
    },
    {
      title: "Backend",
      skills: [
        { title: "Express.js", star: 4.5 },
        { title: "Node.js", star: 4 },
        { title: "Django", star: 3.5 },
        { title: "PHP", star: 3.5 },
      ],
    },
    {
      title: "Databases",
      skills: [
        { title: "MongoDB", star: 3.5 },
        { title: "MySQL", star: 4.5 },
        { title: "Microsoft SQL Server (MSSQL)", star: 3.5 },
      ],
    },
    {
      title: "Data and Visualization",
      skills: [
        { title: "Pandas", star: 3.5 },
        { title: "NumPy", star: 3.5 },
        { title: "Matplotlib", star: 3.5 },
        { title: "Seaborn", star: 3.5 },
        { title: "Excel", star: 4 },
        { title: "Tableau", star: 3.5 },
      ],
    },
    {
      title: "Tools and Platforms",
      skills: [
        { title: "Docker", star: 3.5 },
        { title: "Git", star: 4 },
        { title: "Postman", star: 4 },
        { title: "VS Code", star: 4 },
      ],
    },
  ],
  projects: [
    {
      title: "Image Reverse Search",
      type: "Dual-language reverse image search platform",
      role: "Full-stack",
      desc: "Built a production web platform with a Next.js frontend and standalone Express.js/MongoDB backend for image ingestion, reverse-search routing, user submissions, payment processing, and admin analytics.",
      tools: ["Next.js", "Express.js", "MongoDB", "Paddle", "SerpApi"],
      highlights: [
        "Implemented server-side image ingestion and search routing",
        "Built a responsive bilingual user interface",
        "Integrated Paddle payments and SerpApi reverse image matching",
        "Added follow-up tracking plus an admin panel for oversight and analytics",
      ],
      link: "",
      liveLink: "https://iphint.com",
    },
    {
      title: "Lose to Gain",
      type: "Diet plan generator",
      role: "Full-stack",
      desc: "Developed a web application for generating personalized diet plans with automated email delivery of formatted charts, custom foods and recipes, nutrition-label analysis, and admin oversight.",
      tools: ["Next.js", "Nest.js", "MongoDB", "Gemini API", "Email API"],
      highlights: [
        "Generated personalized diet plans and formatted report charts",
        "Integrated automated email delivery for diet reports",
        "Enabled custom foods and recipes",
        "Used Gemini API to analyze nutrition labels from packaged food images",
        "Implemented an admin panel for system oversight and user trend analysis",
      ],
      link: "https://github.com/mmislam1/ltg",
      liveLink: "https://losetogainnext.netlify.app",
    },
  ],
  experience: [
    {
      title: "Join Venture AI",
      meta: "Junior Web Developer (React) | October 2025 - February 2026",
      icon: "briefcase",
      details:
        "Developed and maintained React front-end features; built reusable component libraries and integrated third-party APIs; collaborated with designers and backend engineers to deliver product increments on schedule.",
    },
    {
      title: "Next Level Media",
      meta: "MERN Stack Developer | March 2025 - August 2025",
      icon: "briefcase",
      details:
        "Built client-facing full-stack features with MongoDB, Express.js, React, and Node.js; designed RESTful APIs; strengthened code quality through reviews, validation, state management, and error handling.",
    },
  ],
  contact: {
    formAction: "",
  },
};

function cleanArray(value) {
  return Array.isArray(value) ? value : [];
}

function cleanText(value) {
  return typeof value === "string" ? value : "";
}

function cleanNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(0, Math.min(5, number)) : 0;
}

export function normalizePortfolioData(data) {
  const source = data && typeof data === "object" ? data : defaultPortfolioData;
  const profile = source.profile || {};
  const contact = source.contact || {};

  return {
    profile: {
      greeting: cleanText(profile.greeting),
      name: cleanText(profile.name),
      headline: cleanText(profile.headline),
      summary: cleanText(profile.summary),
      photo: cleanText(profile.photo) || "/mm.jpg",
      resumeLink: cleanText(profile.resumeLink),
      links: cleanArray(profile.links).map((link) => ({
        label: cleanText(link.label),
        href: cleanText(link.href),
        icon: cleanText(link.icon) || "github",
      })),
    },
    stats: cleanArray(source.stats).map((item) => ({
      value: cleanText(item.value),
      label: cleanText(item.label),
    })),
    focusAreas: cleanArray(source.focusAreas).map((item) => ({
      icon: cleanText(item.icon) || "code",
      title: cleanText(item.title),
      text: cleanText(item.text),
    })),
    skillGroups: cleanArray(source.skillGroups).map((group) => ({
      title: cleanText(group.title),
      skills: cleanArray(group.skills).map((skill) => ({
        title: cleanText(skill.title),
        star: cleanNumber(skill.star),
      })),
    })),
    projects: cleanArray(source.projects).map((project) => ({
      title: cleanText(project.title),
      type: cleanText(project.type),
      role: cleanText(project.role),
      desc: cleanText(project.desc),
      tools: cleanArray(project.tools).map(cleanText).filter(Boolean),
      highlights: cleanArray(project.highlights).map(cleanText).filter(Boolean),
      link: cleanText(project.link),
      liveLink: cleanText(project.liveLink),
    })),
    experience: cleanArray(source.experience).map((item) => ({
      title: cleanText(item.title),
      meta: cleanText(item.meta),
      icon: cleanText(item.icon) || "briefcase",
      details: cleanText(item.details),
    })),
    contact: {
      formAction: cleanText(contact.formAction),
    },
  };
}

async function ensureDbFile() {
  await mkdir(path.dirname(portfolioDbPath), { recursive: true });

  try {
    await readFile(portfolioDbPath, "utf8");
  } catch {
    await writePortfolioData(defaultPortfolioData);
  }
}

export async function getPortfolioData() {
  await ensureDbFile();
  const contents = await readFile(portfolioDbPath, "utf8");

  try {
    return normalizePortfolioData(JSON.parse(contents));
  } catch (error) {
    throw new Error(`Invalid portfolio data: ${error.message}`);
  }
}

export async function writePortfolioData(data) {
  const normalized = normalizePortfolioData(data);
  const tempPath = `${portfolioDbPath}.${process.pid}.tmp`;

  await mkdir(path.dirname(portfolioDbPath), { recursive: true });
  await writeFile(tempPath, `${JSON.stringify(normalized, null, 2)}\n`);
  await rename(tempPath, portfolioDbPath);

  return normalized;
}
