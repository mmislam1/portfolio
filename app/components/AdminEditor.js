"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { skillIconOptions } from "@/lib/skillIconOptions";
import {
  defaultSiteColors,
  getSiteThemeStyle,
  siteColorFields,
} from "@/lib/siteTheme";

const tabs = [
  "Appearance",
  "Profile",
  "Stats",
  "Skills",
  "Projects",
  "Experience",
];

const iconOptions = [
  "briefcase",
  "code",
  "codeforces",
  "envelope",
  "github",
  "graduation",
  "layers",
  "leetcode",
  "linkedin",
];

function csvToArray(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function linesToArray(value) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function Field({ label, value, onChange, type = "text" }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-site-muted">
      <span>{label}</span>
      <input
        className="rounded-md border-2 border-site-accent bg-site-bg p-3 text-base font-semibold text-site-accent placeholder:text-site-muted-strong"
        onChange={(event) => onChange(event.target.value)}
        type={type}
        value={value || ""}
      />
    </label>
  );
}

function TextField({ label, value, onChange, rows = 4 }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-site-muted">
      <span>{label}</span>
      <textarea
        className="min-h-28 rounded-md border-2 border-site-accent bg-site-bg p-3 text-base font-semibold text-site-accent placeholder:text-site-muted-strong"
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        value={value || ""}
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options = iconOptions,
  fallbackValue = "code",
}) {
  const normalizedOptions = options.map((option) =>
    typeof option === "string" ? { label: option, value: option } : option
  );

  return (
    <label className="grid gap-2 text-sm font-semibold text-site-muted">
      <span>{label}</span>
      <select
        className="rounded-md border-2 border-site-accent bg-site-bg p-3 text-base font-semibold text-site-accent"
        onChange={(event) => onChange(event.target.value)}
        value={value || fallbackValue}
      >
        {normalizedOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function ColorField({ label, value, onChange }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-site-muted">
      <span>{label}</span>
      <input
        className="h-12 rounded-md border-2 border-site-accent bg-site-bg p-1 text-site-accent"
        onChange={(event) => onChange(event.target.value)}
        type="color"
        value={value || "#000000"}
      />
    </label>
  );
}

function Card({ children }) {
  return (
    <div className="grid gap-4 rounded-md border-2 border-site-border bg-site-surface p-5">
      {children}
    </div>
  );
}

function Button({ children, onClick, type = "button", variant = "outline" }) {
  const classes =
    variant === "fill"
      ? "border-site-accent bg-site-accent text-site-inverse hover:bg-site-bg hover:text-site-accent"
      : "border-site-border bg-site-bg text-site-accent hover:border-site-accent";

  return (
    <button
      className={`rounded border-2 px-4 py-2 font-semibold ${classes}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

function SectionHeader({ title, onAdd }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-3xl font-semibold text-site-accent">{title}</h2>
      {onAdd && (
        <Button onClick={onAdd} variant="fill">
          Add
        </Button>
      )}
    </div>
  );
}

export default function AdminEditor({ initialData }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [data, setData] = useState(initialData);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const themeStyle = getSiteThemeStyle(data.theme);

    Object.entries(themeStyle).forEach(([property, value]) => {
      document.body.style.setProperty(property, value);
    });
  }, [data.theme]);

  const updateRoot = (key, value) => {
    setData((current) => ({ ...current, [key]: value }));
  };

  const updateProfile = (key, value) => {
    setData((current) => ({
      ...current,
      profile: { ...current.profile, [key]: value },
    }));
  };

  const updateTheme = (key, value) => {
    setData((current) => ({
      ...current,
      theme: { ...current.theme, [key]: value },
    }));
  };

  const updateThemeColor = (key, value) => {
    setData((current) => ({
      ...current,
      theme: {
        ...current.theme,
        colors: {
          ...current.theme?.colors,
          [key]: value,
        },
      },
    }));
  };

  const updateArrayItem = (key, index, value) => {
    setData((current) => ({
      ...current,
      [key]: current[key].map((item, itemIndex) =>
        itemIndex === index ? value : item
      ),
    }));
  };

  const addArrayItem = (key, value) => {
    updateRoot(key, [...data[key], value]);
  };

  const removeArrayItem = (key, index) => {
    updateRoot(
      key,
      data[key].filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const updateProfileLink = (index, value) => {
    updateProfile(
      "links",
      data.profile.links.map((item, itemIndex) =>
        itemIndex === index ? value : item
      )
    );
  };

  const addProfileLink = () => {
    updateProfile("links", [
      ...data.profile.links,
      { label: "Link", href: "", icon: "github" },
    ]);
  };

  const removeProfileLink = (index) => {
    updateProfile(
      "links",
      data.profile.links.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const saveData = async () => {
    setStatus("Saving");

    const response = await fetch("/api/portfolio", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      setStatus("Save failed");
      return;
    }

    const saved = await response.json();
    setData(saved);
    setStatus("Saved");
  };

  return (
    <main className="grid min-h-screen gap-8 bg-site-bg px-6 py-10 text-site-text lg:px-24 xl:px-72">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-semibold text-site-accent">
          EDIT PORTFOLIO
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          {status && <p className="font-semibold text-site-muted">{status}</p>}
          <Link
            className="rounded border-2 border-site-border bg-site-bg px-4 py-2 font-semibold text-site-accent hover:border-site-accent"
            href="/"
          >
            Portfolio
          </Link>
          <Button onClick={saveData} variant="fill">
            Save
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            aria-pressed={activeTab === tab}
            className={`rounded border-2 px-4 py-2 font-semibold ${
              activeTab === tab
                ? "border-site-accent bg-site-accent text-site-inverse"
                : "border-site-border bg-site-bg text-site-accent hover:border-site-accent"
            }`}
            key={tab}
            onClick={() => setActiveTab(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Appearance" && (
        <section className="grid gap-5">
          <SectionHeader title="APPEARANCE" />
          <Card>
            <Field
              label="Font family"
              onChange={(value) => updateTheme("fontFamily", value)}
              value={data.theme?.fontFamily}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {siteColorFields.map((field) => (
                <ColorField
                  key={field.key}
                  label={field.label}
                  onChange={(value) => updateThemeColor(field.key, value)}
                  value={
                    data.theme?.colors?.[field.key] ||
                    defaultSiteColors[field.key]
                  }
                />
              ))}
            </div>
          </Card>
        </section>
      )}

      {activeTab === "Profile" && (
        <section className="grid gap-5">
          <SectionHeader title="PROFILE" />
          <Card>
            <Field
              label="Greeting"
              onChange={(value) => updateProfile("greeting", value)}
              value={data.profile.greeting}
            />
            <Field
              label="Name"
              onChange={(value) => updateProfile("name", value)}
              value={data.profile.name}
            />
            <Field
              label="Headline"
              onChange={(value) => updateProfile("headline", value)}
              value={data.profile.headline}
            />
            <TextField
              label="Summary"
              onChange={(value) => updateProfile("summary", value)}
              value={data.profile.summary}
            />
            <Field
              label="Photo path"
              onChange={(value) => updateProfile("photo", value)}
              value={data.profile.photo}
            />
            <Field
              label="Resume link"
              onChange={(value) => updateProfile("resumeLink", value)}
              value={data.profile.resumeLink}
            />
          </Card>

          <SectionHeader title="PROFILE LINKS" onAdd={addProfileLink} />
          {data.profile.links.map((link, index) => (
            <Card key={`${link.label}-${index}`}>
              <div className="flex justify-end">
                <Button onClick={() => removeProfileLink(index)}>Remove</Button>
              </div>
              <Field
                label="Label"
                onChange={(value) =>
                  updateProfileLink(index, { ...link, label: value })
                }
                value={link.label}
              />
              <Field
                label="URL"
                onChange={(value) =>
                  updateProfileLink(index, { ...link, href: value })
                }
                value={link.href}
              />
              <SelectField
                label="Icon"
                onChange={(value) =>
                  updateProfileLink(index, { ...link, icon: value })
                }
                value={link.icon}
              />
            </Card>
          ))}
        </section>
      )}

      {activeTab === "Stats" && (
        <section className="grid gap-5">
          <SectionHeader
            title="STATS"
            onAdd={() => addArrayItem("stats", { value: "", label: "" })}
          />
          {data.stats.map((item, index) => (
            <Card key={`${item.value}-${index}`}>
              <div className="flex justify-end">
                <Button onClick={() => removeArrayItem("stats", index)}>
                  Remove
                </Button>
              </div>
              <Field
                label="Value"
                onChange={(value) =>
                  updateArrayItem("stats", index, { ...item, value })
                }
                value={item.value}
              />
              <Field
                label="Label"
                onChange={(value) =>
                  updateArrayItem("stats", index, { ...item, label: value })
                }
                value={item.label}
              />
            </Card>
          ))}
        </section>
      )}

      {activeTab === "Skills" && (
        <section className="grid gap-5">
          <SectionHeader
            title="SKILLS"
            onAdd={() => addArrayItem("skillGroups", { title: "", skills: [] })}
          />
          {data.skillGroups.map((group, groupIndex) => (
            <Card key={`${group.title}-${groupIndex}`}>
              <div className="flex flex-wrap justify-between gap-3">
                <h3 className="text-2xl font-semibold text-site-accent">
                  {group.title || "Skill group"}
                </h3>
                <Button
                  onClick={() => removeArrayItem("skillGroups", groupIndex)}
                >
                  Remove Group
                </Button>
              </div>
              <Field
                label="Group title"
                onChange={(value) =>
                  updateArrayItem("skillGroups", groupIndex, {
                    ...group,
                    title: value,
                  })
                }
                value={group.title}
              />
              <div className="grid gap-4">
                {group.skills.map((skill, skillIndex) => (
                  <div
                    className="grid gap-3 rounded-md border border-site-border bg-site-bg p-4 lg:grid-cols-[1fr_16rem_auto]"
                    key={`${skill.title}-${skillIndex}`}
                  >
                    <Field
                      label="Skill"
                      onChange={(value) => {
                        const skills = group.skills.map((item, itemIndex) =>
                          itemIndex === skillIndex
                            ? { ...item, title: value }
                            : item
                        );
                        updateArrayItem("skillGroups", groupIndex, {
                          ...group,
                          skills,
                        });
                      }}
                      value={skill.title}
                    />
                    <SelectField
                      fallbackValue="FaCode"
                      label="Icon"
                      onChange={(value) => {
                        const skills = group.skills.map((item, itemIndex) =>
                          itemIndex === skillIndex
                            ? { ...item, icon: value }
                            : item
                        );
                        updateArrayItem("skillGroups", groupIndex, {
                          ...group,
                          skills,
                        });
                      }}
                      options={skillIconOptions}
                      value={skill.icon}
                    />
                    <div className="grid content-end">
                      <Button
                        onClick={() => {
                          const skills = group.skills.filter(
                            (_, itemIndex) => itemIndex !== skillIndex
                          );
                          updateArrayItem("skillGroups", groupIndex, {
                            ...group,
                            skills,
                          });
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                onClick={() =>
                  updateArrayItem("skillGroups", groupIndex, {
                    ...group,
                    skills: [...group.skills, { title: "", icon: "FaCode" }],
                  })
                }
                variant="fill"
              >
                Add Skill
              </Button>
            </Card>
          ))}
        </section>
      )}

      {activeTab === "Projects" && (
        <section className="grid gap-5">
          <SectionHeader
            title="PROJECTS"
            onAdd={() =>
              addArrayItem("projects", {
                title: "",
                type: "",
                role: "",
                desc: "",
                tools: [],
                highlights: [],
                link: "",
                liveLink: "",
              })
            }
          />
          {data.projects.map((project, index) => (
            <Card key={`${project.title}-${index}`}>
              <div className="flex justify-end">
                <Button onClick={() => removeArrayItem("projects", index)}>
                  Remove
                </Button>
              </div>
              <Field
                label="Title"
                onChange={(value) =>
                  updateArrayItem("projects", index, { ...project, title: value })
                }
                value={project.title}
              />
              <Field
                label="Type"
                onChange={(value) =>
                  updateArrayItem("projects", index, { ...project, type: value })
                }
                value={project.type}
              />
              <Field
                label="Role"
                onChange={(value) =>
                  updateArrayItem("projects", index, { ...project, role: value })
                }
                value={project.role}
              />
              <TextField
                label="Description"
                onChange={(value) =>
                  updateArrayItem("projects", index, { ...project, desc: value })
                }
                value={project.desc}
              />
              <Field
                label="Repository link"
                onChange={(value) =>
                  updateArrayItem("projects", index, { ...project, link: value })
                }
                value={project.link}
              />
              <Field
                label="Live link"
                onChange={(value) =>
                  updateArrayItem("projects", index, {
                    ...project,
                    liveLink: value,
                  })
                }
                value={project.liveLink}
              />
              <Field
                label="Tools"
                onChange={(value) =>
                  updateArrayItem("projects", index, {
                    ...project,
                    tools: csvToArray(value),
                  })
                }
                value={(project.tools || []).join(", ")}
              />
              <TextField
                label="Highlights"
                onChange={(value) =>
                  updateArrayItem("projects", index, {
                    ...project,
                    highlights: linesToArray(value),
                  })
                }
                value={(project.highlights || []).join("\n")}
              />
            </Card>
          ))}
        </section>
      )}

      {activeTab === "Experience" && (
        <section className="grid gap-5">
          <SectionHeader
            title="EXPERIENCE"
            onAdd={() =>
              addArrayItem("experience", {
                title: "",
                meta: "",
                icon: "briefcase",
                details: "",
              })
            }
          />
          {data.experience.map((item, index) => (
            <Card key={`${item.title}-${index}`}>
              <div className="flex justify-end">
                <Button onClick={() => removeArrayItem("experience", index)}>
                  Remove
                </Button>
              </div>
              <SelectField
                label="Icon"
                onChange={(value) =>
                  updateArrayItem("experience", index, { ...item, icon: value })
                }
                value={item.icon}
              />
              <Field
                label="Title"
                onChange={(value) =>
                  updateArrayItem("experience", index, { ...item, title: value })
                }
                value={item.title}
              />
              <Field
                label="Meta"
                onChange={(value) =>
                  updateArrayItem("experience", index, { ...item, meta: value })
                }
                value={item.meta}
              />
              <TextField
                label="Details"
                onChange={(value) =>
                  updateArrayItem("experience", index, {
                    ...item,
                    details: value,
                  })
                }
                value={item.details}
              />
            </Card>
          ))}
        </section>
      )}
    </main>
  );
}
