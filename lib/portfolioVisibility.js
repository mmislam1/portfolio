export function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function hasItems(value) {
  return Array.isArray(value) && value.length > 0;
}

export function getVisibleProfileLinks(links = []) {
  return links.filter((link) => hasText(link.label) && hasText(link.href));
}

export function getVisibleSkillGroups(skillGroups = []) {
  return skillGroups
    .map((group) => ({
      ...group,
      skills: (group.skills || []).filter((skill) => hasText(skill.title)),
    }))
    .filter((group) => hasText(group.title) && hasItems(group.skills));
}

export function getVisibleProjects(projects = []) {
  return projects.filter(
    (project) =>
      hasText(project.title) &&
      (hasText(project.type) ||
        hasText(project.role) ||
        hasText(project.desc) ||
        hasItems(project.tools) ||
        hasItems(project.highlights) ||
        hasText(project.link) ||
        hasText(project.liveLink))
  );
}

export function getVisibleExperience(experience = []) {
  return experience.filter(
    (item) =>
      hasText(item.title) &&
      (hasText(item.meta) || hasText(item.details) || hasText(item.icon))
  );
}

export function hasAboutContent(profile = {}) {
  return (
    hasText(profile.greeting) ||
    hasText(profile.name) ||
    hasText(profile.summary) ||
    hasText(profile.photo) ||
    hasText(profile.resumeLink) ||
    hasItems(getVisibleProfileLinks(profile.links || []))
  );
}

export function getVisibleNavItems(data = {}) {
  const items = [];

  if (hasAboutContent(data.profile || {})) {
    items.push({ label: "About", href: "/#about" });
  }

  if (hasItems(getVisibleSkillGroups(data.skillGroups || []))) {
    items.push({ label: "Skills", href: "/#skills" });
  }

  if (hasItems(getVisibleProjects(data.projects || []))) {
    items.push({ label: "Projects", href: "/#projects" });
  }

  if (hasItems(getVisibleExperience(data.experience || []))) {
    items.push({ label: "Experience", href: "/#experience" });
  }

  return items;
}
