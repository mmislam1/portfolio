"use client";

import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowUp,
  faArrowUpRightFromSquare,
  faBriefcase,
  faCheck,
  faChevronDown,
  faCode,
  faEnvelope,
  faGraduationCap,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import {
  getVisibleExperience,
  getVisibleProfileLinks,
  getVisibleProjects,
  getVisibleSkillGroups,
  hasAboutContent,
  hasText,
} from "@/lib/portfolioVisibility";

const icons = {
  briefcase: faBriefcase,
  code: faCode,
  envelope: faEnvelope,
  github: faGithub,
  graduation: faGraduationCap,
  layers: faLayerGroup,
  linkedin: faLinkedin,
};

const brandBadges = {
  codeforces: "CF",
  leetcode: "LC",
};

function getIcon(name, fallback = faCode) {
  return icons[name] || fallback;
}

function ProfileIconLink({ link }) {
  const badge = brandBadges[link.icon];

  return (
    <a
      aria-label={link.label}
      className="motion-action inline-flex"
      href={link.href}
      rel="noreferrer"
      target="_blank"
      title={link.label}
    >
      {badge ? (
        <span className="grid h-12 w-12 items-center justify-center rounded-full border-2 border-amber-400 text-lg font-bold text-amber-400 hover:border-orange-600 hover:text-orange-600">
          {badge}
        </span>
      ) : (
        <FontAwesomeIcon
          icon={getIcon(link.icon)}
          className="animate-colorChange text-5xl hover:text-orange-600"
        />
      )}
    </a>
  );
}

function StarRating({ value }) {
  return (
    <div className="grid grid-cols-5 items-center justify-center gap-2 rounded-md border border-slate-500 p-4">
      {Array.from({ length: 5 }, (_, index) => {
        const rating = Number(value) || 0;
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 !== 0;
        const src =
          index < fullStars
            ? "/full.png"
            : index === fullStars && hasHalf
            ? "/half.png"
            : "/empty.png";

        return (
          <Image
            key={index}
            src={src}
            alt=""
            width={30}
            height={30}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}

function ProjectIconLink({ href, icon, label }) {
  const cleanHref = typeof href === "string" ? href.trim() : "";

  if (!cleanHref) {
    return null;
  }

  return (
    <a
      aria-label={label}
      className="motion-action inline-flex"
      href={cleanHref}
      rel="noreferrer"
      target="_blank"
      title={label}
    >
      <FontAwesomeIcon
        icon={icon}
        className="animate-colorChange text-3xl hover:text-orange-600"
      />
    </a>
  );
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function parseMonthYear(value) {
  const match = value.trim().match(/^([A-Za-z]+)\s+(\d{4})$/);

  if (!match) {
    return null;
  }

  const month = monthNames.findIndex(
    (name) => name.toLowerCase() === match[1].toLowerCase()
  );
  const year = Number(match[2]);

  if (month === -1 || !Number.isFinite(year)) {
    return null;
  }

  return year * 12 + month;
}

function formatDuration(monthCount) {
  return `${monthCount} month${monthCount === 1 ? "" : "s"}`;
}

function getJobTenure(item) {
  const [role = "", period = ""] = (item.meta || "")
    .split("|")
    .map((part) => part.trim());
  const [start = "", end = ""] = period.split("-").map((part) => part.trim());
  const startIndex = parseMonthYear(start);
  const endIndex = parseMonthYear(end);
  const hasRange = startIndex !== null && endIndex !== null && endIndex >= startIndex;
  const durationMonths = hasRange ? endIndex - startIndex + 1 : 0;

  return {
    duration: hasRange ? formatDuration(durationMonths) : "",
    durationMonths,
    end,
    endIndex,
    hasRange,
    period,
    role,
    start,
    startIndex,
  };
}

function getJobHighlights(item) {
  const details = item.details || "";

  if (!hasText(details)) {
    return [];
  }

  return details
    .replace("; and ", "; ")
    .split(";")
    .map((part) => part.trim().replace(/\.$/, ""))
    .filter(Boolean);
}

export default function PortfolioView({ data }) {
  const profile = data.profile || {};
  const skillGroups = data.skillGroups || [];
  const projects = data.projects || [];
  const experience = data.experience || [];
  const profileLinks = getVisibleProfileLinks(profile.links || []);
  const visibleSkillGroups = getVisibleSkillGroups(skillGroups);
  const projectsWithContent = getVisibleProjects(projects);
  const visibleExperience = getVisibleExperience(experience).filter(
    (item) => getJobTenure(item).hasRange
  );
  const jobTenures = visibleExperience.map(getJobTenure);
  const hasResumeLink = hasText(profile.resumeLink);
  const showAbout = hasAboutContent(profile);

  const [activeSkillGroup, setActiveSkillGroup] = useState(
    visibleSkillGroups[0]?.title || ""
  );
  const [projectFilter, setProjectFilter] = useState("All");
  const [expandedProject, setExpandedProject] = useState(
    projectsWithContent.find((project) => (project.highlights || []).length > 0)
      ?.title || ""
  );
  const [copied, setCopied] = useState(false);

  const projectFilters = [
    "All",
    ...new Set(
      projectsWithContent.flatMap((project) => project.tools || []).filter(hasText)
    ),
  ];

  const activeSkills =
    visibleSkillGroups.find((group) => group.title === activeSkillGroup)
      ?.skills ?? [];

  const visibleProjects =
    projectFilter === "All"
      ? projectsWithContent
      : projectsWithContent.filter((project) =>
          (project.tools || []).includes(projectFilter)
        );

  const copyProfileLink = async () => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="motion-page grid grid-cols-1 bg-slate-900 text-white">
      {showAbout && (
        <section
          className="motion-section grid scroll-mt-32 items-center justify-center px-6 pb-4 pt-10 font-semibold text-lg lg:px-24 xl:px-72"
          id="about"
        >
          <div className="grid w-full grid-cols-1 items-center justify-around gap-6">
            <div className="flex flex-col-reverse items-center justify-around gap-9 md:flex-row">
              <div className="grid w-full max-w-3xl gap-6 text-center md:text-left">
                {(hasText(profile.greeting) || hasText(profile.name)) && (
                  <div>
                    {hasText(profile.greeting) && (
                      <p className="text-xl text-slate-200">
                        {profile.greeting}
                      </p>
                    )}
                    {hasText(profile.name) && (
                      <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">
                        {profile.name}
                      </h1>
                    )}
                  </div>
                )}
                {hasText(profile.summary) && (
                  <p className="text-lg leading-8 text-slate-100">
                    {profile.summary}
                  </p>
                )}
              </div>

              {hasText(profile.photo) && (
                <div className="motion-card min-h-60 min-w-60 max-h-60 max-w-60 overflow-hidden rounded-full border-2 border-amber-400 bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={profile.photo}
                    alt={profile.name || "Profile photo"}
                    className="h-60 w-60 object-cover"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {hasResumeLink && (
                <a
                  className="motion-action rounded border-2 border-amber-400 bg-amber-400 px-8 py-2 text-2xl font-semibold text-slate-900 hover:bg-slate-900 hover:text-amber-400"
                  href={profile.resumeLink}
                  rel="noreferrer"
                  target="_blank"
                >
                  Resume
                </a>
              )}
              {profileLinks.map((link) => (
                <ProfileIconLink key={link.label} link={link} />
              ))}
              <button
                className="motion-action rounded border-2 border-amber-400 px-5 py-3 text-base font-semibold text-amber-400 hover:bg-amber-400 hover:text-slate-900"
                onClick={copyProfileLink}
                type="button"
              >
                <FontAwesomeIcon
                  icon={copied ? faCheck : faArrowUpRightFromSquare}
                />
                <span className="ml-2">{copied ? "Copied" : "Copy Link"}</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {visibleSkillGroups.length > 0 && (
        <section
          className="motion-section grid scroll-mt-32 grid-cols-1 items-center justify-center px-6 pb-10 pt-4 lg:px-24 xl:px-72"
          id="skills"
        >
          <h2 className="m-auto text-4xl font-semibold text-amber-400">
            SKILLS
          </h2>
          {visibleSkillGroups.length > 1 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {visibleSkillGroups.map((group) => (
                <button
                  aria-pressed={activeSkillGroup === group.title}
                  className={`motion-action rounded border-2 px-5 py-2 text-lg font-semibold ${
                    activeSkillGroup === group.title
                      ? "border-amber-400 bg-amber-400 text-slate-900"
                      : "border-slate-500 bg-slate-900 text-amber-400 hover:border-amber-400"
                  }`}
                  key={group.title}
                  onClick={() => setActiveSkillGroup(group.title)}
                  type="button"
                >
                  {group.title}
                </button>
              ))}
            </div>
          )}
          <div
            className="motion-panel my-8 grid grid-cols-1 items-stretch justify-between gap-6 rounded-xl border-2 border-slate-500 bg-slate-700 p-5 md:grid-cols-2 xl:grid-cols-3"
            key={activeSkillGroup}
          >
            {activeSkills.map((skill) => (
              <article
                className="motion-card grid grid-cols-1 items-center justify-center rounded-md border-2 border-slate-500 bg-slate-900 p-5"
                key={skill.title}
              >
                <h3 className="m-auto mb-4 text-xl font-semibold text-amber-400 xl:text-2xl">
                  {skill.title}
                </h3>
                <StarRating value={skill.star} />
              </article>
            ))}
          </div>
        </section>
      )}

      {visibleExperience.length > 0 && (
        <section
          className="motion-section grid scroll-mt-32 grid-cols-1 items-center justify-center px-6 py-10 lg:px-24 xl:px-72"
          id="experience"
        >
          <h2 className="m-auto text-4xl font-semibold text-amber-400">
            EXPERIENCE
          </h2>

          <div className="my-8 grid w-full grid-cols-1">
            <div className="grid grid-cols-1">
              {visibleExperience.map((item, index) => {
                const tenure = jobTenures[index];
                const highlights = getJobHighlights(item);

                return (
                  <article
                    className="motion-panel grid gap-4 border-b border-slate-700 py-7 first:pt-0 last:border-b-0 md:grid-cols-[12rem_2rem_1fr]"
                    key={item.title}
                  >
                    <div className="grid content-start gap-2 md:text-right">
                      <div className="grid gap-1">
                        {hasText(tenure.start) && (
                          <p className="text-sm font-semibold text-amber-400">
                            {tenure.start}
                          </p>
                        )}
                        {hasText(tenure.end) && (
                          <p className="text-sm font-semibold text-slate-200">
                            {tenure.end}
                          </p>
                        )}
                      </div>
                      {hasText(tenure.duration) && (
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          {tenure.duration}
                        </p>
                      )}
                    </div>

                    <div className="hidden justify-items-center md:grid">
                      <div className="relative grid min-h-36 justify-items-center">
                        <span className="absolute inset-y-0 w-px bg-slate-700" />
                        <span className="relative mt-2 h-3 w-3 rounded-full border-2 border-amber-400 bg-slate-900 shadow-[0_0_14px_rgba(251,191,36,0.3)]" />
                      </div>
                    </div>

                    <div className="grid content-start gap-4">
                      <div>
                        <h3 className="text-2xl font-semibold text-amber-400">
                          {item.title}
                        </h3>
                        {hasText(tenure.role) && (
                          <p className="mt-1 font-semibold text-slate-200">
                            {tenure.role}
                          </p>
                        )}
                        {hasText(tenure.period) && (
                          <p className="mt-1 text-sm font-semibold text-slate-400 md:hidden">
                            {tenure.period} | {tenure.duration}
                          </p>
                        )}
                      </div>

                      {highlights.length > 0 ? (
                        <ul className="grid gap-2">
                          {highlights.map((highlight) => (
                            <li
                              className="grid grid-cols-[auto_1fr] gap-3 leading-7 text-slate-100"
                              key={highlight}
                            >
                              <span className="mt-3 h-1.5 w-1.5 rounded-full bg-amber-400" />
                              <span>{highlight}.</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        hasText(item.details) && (
                          <p className="leading-7 text-slate-100">
                            {item.details}
                          </p>
                        )
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {projectsWithContent.length > 0 && (
        <section
          className="motion-section grid scroll-mt-32 grid-cols-1 items-center justify-center px-6 py-10 lg:px-24 xl:px-72"
          id="projects"
        >
          <h2 className="m-auto text-4xl font-semibold text-amber-400">
            PROJECTS
          </h2>
          {projectFilters.length > 1 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {projectFilters.map((filter) => (
                <button
                  aria-pressed={projectFilter === filter}
                  className={`motion-action rounded border-2 px-4 py-2 text-base font-semibold ${
                    projectFilter === filter
                      ? "border-amber-400 bg-amber-400 text-slate-900"
                      : "border-slate-500 bg-slate-900 text-amber-400 hover:border-amber-400"
                  }`}
                  key={filter}
                  onClick={() => setProjectFilter(filter)}
                  type="button"
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
          {projectFilters.length > 1 && (
            <p className="mt-5 text-center text-slate-200">
              Showing {visibleProjects.length} project
              {visibleProjects.length === 1 ? "" : "s"}.
            </p>
          )}

          <div className="my-8 grid grid-cols-1 items-stretch justify-between gap-6">
            {visibleProjects.map((project) => {
              const highlights = (project.highlights || []).filter(hasText);
              const tools = (project.tools || []).filter(hasText);
              const hasHighlights = highlights.length > 0;
              const hasProjectActions =
                hasText(project.link) ||
                hasText(project.liveLink) ||
                hasHighlights;
              const isExpanded = hasHighlights && expandedProject === project.title;

              return (
                <article
                  className="motion-card rounded-md border-2 border-amber-400 bg-slate-900 p-5"
                  key={`${projectFilter}-${project.title}`}
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    <div>
                      {hasText(project.type) && (
                        <p className="text-base font-semibold text-slate-300">
                          {project.type}
                        </p>
                      )}
                      <h3 className="mt-1 text-3xl font-semibold text-amber-400">
                        {project.title}
                      </h3>
                      {hasText(project.role) && (
                        <p className="mt-2 text-slate-200">{project.role}</p>
                      )}
                    </div>
                    {hasProjectActions && (
                      <div className="flex items-center gap-4">
                        <ProjectIconLink
                          href={project.link}
                          icon={faGithub}
                          label={`${project.title} GitHub repository`}
                        />
                        <ProjectIconLink
                          href={project.liveLink}
                          icon={faArrowUpRightFromSquare}
                          label={`${project.title} live link`}
                        />
                        {hasHighlights && (
                          <button
                            aria-expanded={isExpanded}
                            className="motion-action rounded border-2 border-slate-500 px-4 py-2 font-semibold text-amber-400 hover:border-amber-400"
                            onClick={() =>
                              setExpandedProject(
                                isExpanded ? "" : project.title
                              )
                            }
                            type="button"
                          >
                            Details
                            <FontAwesomeIcon
                              icon={faChevronDown}
                              className={`ml-2 transition-transform ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {hasText(project.desc) && (
                    <p className="mt-5 rounded-md bg-slate-700 p-3 text-lg leading-7 text-slate-100">
                      {project.desc}
                    </p>
                  )}

                  {tools.length > 0 && (
                    <div className="mt-4 flex flex-row flex-wrap gap-2">
                      {tools.map((tool) => (
                        <span
                          className="rounded border border-slate-500 px-3 py-1 text-lg text-amber-400"
                          key={`${project.title}-${tool}`}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}

                  {hasHighlights && (
                    <div
                      aria-hidden={!isExpanded}
                      className={`motion-details ${
                        isExpanded ? "motion-details-open" : ""
                      }`}
                    >
                      <div className="grid gap-3">
                        {highlights.map((highlight) => (
                          <p className="text-slate-100" key={highlight}>
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="mr-3 text-amber-400"
                            />
                            {highlight}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}

      <button
        aria-label="Back to top"
        className="motion-action fixed bottom-5 right-5 grid h-12 w-12 items-center justify-center rounded-full border-2 border-amber-400 bg-slate-900 text-amber-400 shadow-lg hover:bg-amber-400 hover:text-slate-900"
        onClick={scrollToTop}
        type="button"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </main>
  );
}
