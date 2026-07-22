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

const icons = {
  briefcase: faBriefcase,
  code: faCode,
  envelope: faEnvelope,
  github: faGithub,
  graduation: faGraduationCap,
  layers: faLayerGroup,
  linkedin: faLinkedin,
};

function getIcon(name, fallback = faCode) {
  return icons[name] || fallback;
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

export default function PortfolioView({ data }) {
  const profile = data.profile || {};
  const contact = data.contact || {};
  const skillGroups = data.skillGroups || [];
  const projects = data.projects || [];
  const experience = data.experience || [];
  const profileLinks = profile.links || [];

  const [activeSkillGroup, setActiveSkillGroup] = useState(
    skillGroups[0]?.title || ""
  );
  const [projectFilter, setProjectFilter] = useState("All");
  const [expandedProject, setExpandedProject] = useState(
    projects[0]?.title || ""
  );
  const [copied, setCopied] = useState(false);

  const projectFilters = [
    "All",
    ...new Set(projects.flatMap((project) => project.tools || [])),
  ];

  const activeSkills =
    skillGroups.find((group) => group.title === activeSkillGroup)?.skills ?? [];

  const visibleProjects =
    projectFilter === "All"
      ? projects
      : projects.filter((project) => (project.tools || []).includes(projectFilter));

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
    <main className="grid grid-cols-1 bg-slate-900 text-white">
      <section
        className="grid min-h-[calc(100vh-112px)] scroll-mt-32 items-center justify-center px-6 py-10 font-semibold text-lg lg:px-24 xl:px-72"
        id="about"
      >
        <div className="grid w-full grid-cols-1 items-center justify-around gap-10">
          <div className="flex flex-col-reverse items-center justify-around gap-9 md:flex-row">
            <div className="grid w-full max-w-3xl gap-6 text-center md:text-left">
              <div>
                <p className="text-xl text-slate-200">
                  {profile.greeting || "Hello,"}
                </p>
                <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">
                  {profile.name || "Mohaiminul Islam"}
                </h1>
              </div>
              <p className="text-lg leading-8 text-slate-100">
                {profile.summary}
              </p>
            </div>

            <div className="min-h-60 min-w-60 max-h-60 max-w-60 overflow-hidden rounded-full border-2 border-amber-400 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.photo || "/mm.jpg"}
                alt={profile.name || "Profile photo"}
                className="h-60 w-60 object-cover"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <a
              className="rounded border-2 border-amber-400 bg-amber-400 px-8 py-2 text-2xl font-semibold text-slate-900 hover:bg-slate-900 hover:text-amber-400"
              href={profile.resumeLink || "#"}
              rel="noreferrer"
              target="_blank"
            >
              Resume
            </a>
            {profileLinks.map((link) => (
              <a
                aria-label={link.label}
                href={link.href}
                key={link.label}
                rel="noreferrer"
                target="_blank"
                title={link.label}
              >
                <FontAwesomeIcon
                  icon={getIcon(link.icon)}
                  className="animate-colorChange text-5xl hover:text-orange-600"
                />
              </a>
            ))}
            <button
              className="rounded border-2 border-amber-400 px-5 py-3 text-base font-semibold text-amber-400 hover:bg-amber-400 hover:text-slate-900"
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

      <section
        className="grid scroll-mt-32 grid-cols-1 items-center justify-center px-6 py-10 lg:px-24 xl:px-72"
        id="skills"
      >
        <h2 className="m-auto text-4xl font-semibold text-amber-400">
          SKILLS
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {skillGroups.map((group) => (
            <button
              aria-pressed={activeSkillGroup === group.title}
              className={`rounded border-2 px-5 py-2 text-lg font-semibold ${
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
        <div className="my-8 grid grid-cols-1 items-stretch justify-between gap-6 rounded-xl border-2 border-slate-500 bg-slate-700 p-5 md:grid-cols-2 xl:grid-cols-3">
          {activeSkills.map((skill) => (
            <article
              className="grid grid-cols-1 items-center justify-center rounded-md border-2 border-slate-500 bg-slate-900 p-5"
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

      <section
        className="grid scroll-mt-32 grid-cols-1 items-center justify-center px-6 py-10 lg:px-24 xl:px-72"
        id="projects"
      >
        <h2 className="m-auto text-4xl font-semibold text-amber-400">
          PROJECTS
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {projectFilters.map((filter) => (
            <button
              aria-pressed={projectFilter === filter}
              className={`rounded border-2 px-4 py-2 text-base font-semibold ${
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
        <p className="mt-5 text-center text-slate-200">
          Showing {visibleProjects.length} project
          {visibleProjects.length === 1 ? "" : "s"}.
        </p>

        <div className="my-8 grid grid-cols-1 items-stretch justify-between gap-6">
          {visibleProjects.map((project) => {
            const isExpanded = expandedProject === project.title;

            return (
              <article
                className="rounded-md border-2 border-amber-400 bg-slate-900 p-5"
                key={project.title}
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div>
                    <p className="text-base font-semibold text-slate-300">
                      {project.type}
                    </p>
                    <h3 className="mt-1 text-3xl font-semibold text-amber-400">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-slate-200">{project.role}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <a
                      aria-label={`${project.title} GitHub repository`}
                      href={project.link}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        icon={faGithub}
                        className="animate-colorChange text-3xl hover:text-orange-600"
                      />
                    </a>
                    <button
                      aria-expanded={isExpanded}
                      className="rounded border-2 border-slate-500 px-4 py-2 font-semibold text-amber-400 hover:border-amber-400"
                      onClick={() =>
                        setExpandedProject(isExpanded ? "" : project.title)
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
                  </div>
                </div>

                <p className="mt-5 rounded-md bg-slate-700 p-3 text-lg leading-7 text-slate-100">
                  {project.desc}
                </p>

                <div className="mt-4 flex flex-row flex-wrap gap-2">
                  {(project.tools || []).map((tool) => (
                    <span
                      className="rounded border border-slate-500 px-3 py-1 text-lg text-amber-400"
                      key={`${project.title}-${tool}`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {isExpanded && (
                  <div className="mt-5 grid gap-3 border-t border-slate-500 pt-5">
                    {(project.highlights || []).map((highlight) => (
                      <p className="text-slate-100" key={highlight}>
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="mr-3 text-amber-400"
                        />
                        {highlight}
                      </p>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section
        className="grid scroll-mt-32 grid-cols-1 items-center justify-center px-6 py-10 lg:px-24 xl:px-72"
        id="experience"
      >
        <h2 className="m-auto text-4xl font-semibold text-amber-400">
          EXPERIENCE
        </h2>
        <div className="my-8 grid grid-cols-1 gap-5">
          {experience.map((item) => (
            <article
              className="grid grid-cols-[auto_1fr] gap-5 rounded-md border-2 border-slate-500 bg-slate-700 p-5"
              key={item.title}
            >
              <div className="grid h-12 w-12 items-center justify-center rounded-full border-2 border-amber-400 text-amber-400">
                <FontAwesomeIcon icon={getIcon(item.icon)} className="text-xl" />
              </div>
              <div>
                <p className="font-semibold text-slate-200">{item.meta}</p>
                <h3 className="mt-1 text-2xl font-semibold text-amber-400">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-100">{item.details}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="contact section grid scroll-mt-32 grid-cols-1 px-6 py-10 lg:px-24 xl:px-72"
        id="contact"
      >
        <h2 className="m-auto text-4xl font-semibold text-amber-400">
          CONTACT
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2fr]">
          <aside className="grid content-start gap-4">
            <a
              className="rounded-md border-2 border-slate-500 bg-slate-700 p-5 text-amber-400 hover:border-amber-400"
              href="#contact"
            >
              <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
              Contact form
            </a>
            <a
              className="rounded-md border-2 border-slate-500 bg-slate-700 p-5 text-amber-400 hover:border-amber-400"
              href={profile.resumeLink || "#"}
              rel="noreferrer"
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="mr-3"
              />
              Resume
            </a>
            {profileLinks.map((link) => (
              <a
                className="rounded-md border-2 border-slate-500 bg-slate-700 p-5 text-amber-400 hover:border-amber-400"
                href={link.href}
                key={link.label}
                rel="noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={getIcon(link.icon)} className="mr-3" />
                {link.label}
              </a>
            ))}
          </aside>

          <form
            action={contact.formAction || "#"}
            className="grid grid-cols-1 gap-4"
            method="POST"
          >
            <input
              className="rounded-md border-2 border-amber-400 bg-slate-900 p-3 text-xl font-semibold text-amber-400 placeholder:text-slate-400"
              name="name"
              placeholder="Name"
              required
              type="text"
            />

            <input
              className="rounded-md border-2 border-amber-400 bg-slate-900 p-3 text-xl font-semibold text-amber-400 placeholder:text-slate-400"
              name="phone"
              placeholder="Phone Number"
              type="text"
            />

            <input
              className="rounded-md border-2 border-amber-400 bg-slate-900 p-3 text-xl font-semibold text-amber-400 placeholder:text-slate-400"
              name="email"
              placeholder="Email"
              required
              type="email"
            />

            <textarea
              className="min-h-36 rounded-md border-2 border-amber-400 bg-slate-900 p-3 text-xl font-semibold text-amber-400 placeholder:text-slate-400"
              name="message"
              placeholder="Message"
              required
            />

            <div className="grid items-center">
              <button
                className="rounded border-2 border-amber-400 bg-amber-400 px-8 py-2 text-2xl font-semibold text-slate-900 hover:bg-slate-900 hover:text-amber-400"
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </section>

      <button
        aria-label="Back to top"
        className="fixed bottom-5 right-5 grid h-12 w-12 items-center justify-center rounded-full border-2 border-amber-400 bg-slate-900 text-amber-400 shadow-lg hover:bg-amber-400 hover:text-slate-900"
        onClick={scrollToTop}
        type="button"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </main>
  );
}
