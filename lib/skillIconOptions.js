export const skillIconOptions = [
  { value: "SiNextdotjs", label: "Next.js" },
  { value: "SiReact", label: "React.js" },
  { value: "SiRedux", label: "Redux" },
  { value: "SiHtml5", label: "HTML5" },
  { value: "SiCss", label: "CSS3" },
  { value: "SiExpress", label: "Express.js" },
  { value: "SiNestjs", label: "Nest.js" },
  { value: "FaNetworkWired", label: "REST APIs" },
  { value: "SiNodedotjs", label: "Node.js" },
  { value: "SiPhp", label: "PHP" },
  { value: "SiMongodb", label: "MongoDB" },
  { value: "SiMysql", label: "MySQL" },
  { value: "FaDatabase", label: "Microsoft SQL Server" },
  { value: "SiJavascript", label: "JavaScript" },
  { value: "SiTypescript", label: "TypeScript" },
  { value: "SiPython", label: "Python" },
  { value: "SiPaddle", label: "Paddle" },
  { value: "FaMagnifyingGlass", label: "Search API" },
  { value: "SiGooglegemini", label: "Gemini API" },
  { value: "FaEnvelope", label: "Email API" },
  { value: "SiDocker", label: "Docker" },
  { value: "SiGit", label: "Git" },
  { value: "SiPostman", label: "Postman" },
  { value: "VscVscode", label: "VS Code" },
  { value: "FaFileWord", label: "Word document" },
  { value: "FaFileExcel", label: "Excel" },
  { value: "SiPandas", label: "Pandas" },
  { value: "SiNumpy", label: "NumPy" },
  { value: "FaChartLine", label: "Line chart" },
  { value: "FaChartPie", label: "Pie chart" },
  { value: "FaChartColumn", label: "Column chart" },
  { value: "FaCode", label: "Generic code" },
];

const skillTitleIconMap = {
  "css3": "SiCss",
  "docker": "SiDocker",
  "email api": "FaEnvelope",
  "excel": "FaFileExcel",
  "express.js": "SiExpress",
  "gemini api": "SiGooglegemini",
  "git": "SiGit",
  "html5": "SiHtml5",
  "javascript (es6+)": "SiJavascript",
  "matplotlib": "FaChartLine",
  "microsoft sql server (mssql)": "FaDatabase",
  "mongodb": "SiMongodb",
  "mysql": "SiMysql",
  "nest.js": "SiNestjs",
  "next.js": "SiNextdotjs",
  "node.js": "SiNodedotjs",
  "numpy": "SiNumpy",
  "paddle": "SiPaddle",
  "pandas": "SiPandas",
  "php": "SiPhp",
  "postman": "SiPostman",
  "python": "SiPython",
  "python-docx": "FaFileWord",
  "react.js": "SiReact",
  "redux": "SiRedux",
  "rest apis": "FaNetworkWired",
  "seaborn": "FaChartPie",
  "serpapi": "FaMagnifyingGlass",
  "tableau": "FaChartColumn",
  "typescript": "SiTypescript",
  "vs code": "VscVscode",
};

export function getSkillIconName(skill) {
  const icon = typeof skill?.icon === "string" ? skill.icon.trim() : "";

  if (icon) {
    return icon;
  }

  const title =
    typeof skill?.title === "string" ? skill.title.trim().toLowerCase() : "";

  return skillTitleIconMap[title] || "FaCode";
}
