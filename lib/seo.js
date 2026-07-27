const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.URL ||
  process.env.DEPLOY_PRIME_URL ||
  "http://localhost:3000";

export const siteUrl = rawSiteUrl.replace(/\/$/, "");

export const siteTitle =
  "Mohaiminul Islam | MERN Stack, React, Next.js, Node.js Developer";

export const siteDescription =
  "Portfolio of Mohaiminul Islam, a full-stack MERN developer building React, TypeScript, Next.js, NestJS, Node.js, Express.js, MongoDB, and REST API applications.";

export const seoKeywords = [
  "Mohaiminul Islam",
  "MERN stack developer",
  "full-stack developer",
  "full stack web developer",
  "React developer",
  "React.js developer",
  "TypeScript developer",
  "Next.js developer",
  "NextJS developer",
  "NestJS developer",
  "Nest.js developer",
  "Node.js developer",
  "Node JS developer",
  "Express.js developer",
  "Express JS developer",
  "MongoDB developer",
  "JavaScript developer",
  "REST API developer",
  "Bangladesh MERN developer",
  "Bangladesh React developer",
  "portfolio",
];
