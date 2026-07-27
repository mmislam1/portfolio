export const defaultSiteFontFamily =
  "Inter, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif";

export const defaultSiteColors = {
  background: "#0f172a",
  surface: "#1e293b",
  surfaceStrong: "#020617",
  text: "#ffffff",
  textSoft: "#f1f5f9",
  muted: "#cbd5e1",
  mutedStrong: "#94a3b8",
  accent: "#fbbf24",
  accentSoft: "#fcd34d",
  accentDeep: "#ca8a04",
  hover: "#ea580c",
  border: "#475569",
  borderSubtle: "#334155",
  imageBackground: "#ffffff",
  inverse: "#0f172a",
};

export const siteColorFields = [
  { key: "background", label: "Background" },
  { key: "surface", label: "Surface" },
  { key: "surfaceStrong", label: "Deep surface" },
  { key: "text", label: "Main text" },
  { key: "textSoft", label: "Soft text" },
  { key: "muted", label: "Muted text" },
  { key: "mutedStrong", label: "Subtle text" },
  { key: "accent", label: "Accent" },
  { key: "accentSoft", label: "Soft accent" },
  { key: "accentDeep", label: "Blink accent" },
  { key: "hover", label: "Hover" },
  { key: "border", label: "Border" },
  { key: "borderSubtle", label: "Subtle border" },
  { key: "imageBackground", label: "Image background" },
  { key: "inverse", label: "Inverse text" },
];

export function getSiteFontFamily(theme) {
  const fontFamily = theme?.fontFamily;

  return typeof fontFamily === "string" && fontFamily.trim()
    ? fontFamily.trim()
    : defaultSiteFontFamily;
}

export function normalizeHexColor(value, fallback) {
  const color = typeof value === "string" ? value.trim() : "";
  const normalized = color.startsWith("#") ? color : `#${color}`;

  if (/^#[0-9a-f]{3}$/i.test(normalized)) {
    return normalized.replace(/[0-9a-f]/gi, (char) => `${char}${char}`);
  }

  if (/^#[0-9a-f]{6}$/i.test(normalized)) {
    return normalized;
  }

  return fallback;
}

export function normalizeSiteColors(colors) {
  const source = colors && typeof colors === "object" ? colors : {};

  return Object.fromEntries(
    siteColorFields.map(({ key }) => [
      key,
      normalizeHexColor(source[key], defaultSiteColors[key]),
    ])
  );
}

function hexToRgb(hexColor) {
  const hex = normalizeHexColor(hexColor, defaultSiteColors.background).slice(1);
  const value = Number.parseInt(hex, 16);

  return {
    blue: value & 255,
    green: (value >> 8) & 255,
    red: (value >> 16) & 255,
  };
}

function hexToRgbTriplet(hexColor) {
  const { blue, green, red } = hexToRgb(hexColor);

  return `${red} ${green} ${blue}`;
}

function getRelativeLuminance(color) {
  const channels = [color.red, color.green, color.blue].map((channel) => {
    const normalized = channel / 255;

    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function toColorVariableName(key) {
  return `--portfolio-color-${key
    .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
    .toLowerCase()}`;
}

export function getSiteThemeStyle(theme) {
  const colors = normalizeSiteColors(theme?.colors);

  return {
    "--portfolio-font-family": getSiteFontFamily(theme),
    ...Object.fromEntries(
      Object.entries(colors).map(([key, value]) => [
        toColorVariableName(key),
        hexToRgbTriplet(value),
      ])
    ),
  };
}

export function getSiteColorScheme(theme) {
  const colors = normalizeSiteColors(theme?.colors);

  return getRelativeLuminance(hexToRgb(colors.background)) > 0.55
    ? "light"
    : "dark";
}
