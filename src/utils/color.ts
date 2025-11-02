/**
 * Default light-grey color used as fallback for material nodes
 */
export const DEFAULT_MATERIAL_COLOR = "#e5e5e5";

/**
 * Converts a hex color string to rgba format with specified opacity
 * @param hex - Hex color string (e.g., "#ff0000")
 * @param alpha - Opacity value between 0 and 1
 * @returns rgba color string (e.g., "rgba(255, 0, 0, 0.6)")
 */
export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Determines whether text should be black or white based on background color luminance
 * Uses relative luminance formula from WCAG guidelines
 * @param backgroundColor - Hex color string (e.g., "#ff0000") or rgb/rgba string
 * @returns "black" or "white" for optimal text contrast
 */
export function getContrastTextColor(backgroundColor: string): "black" | "white" {
  let r: number, g: number, b: number;

  if (backgroundColor.startsWith("#")) {
    // Hex color
    r = parseInt(backgroundColor.slice(1, 3), 16);
    g = parseInt(backgroundColor.slice(3, 5), 16);
    b = parseInt(backgroundColor.slice(5, 7), 16);
  } else if (backgroundColor.startsWith("rgb")) {
    // rgb or rgba color
    const matches = backgroundColor.match(/\d+/g);
    if (matches && matches.length >= 3) {
      r = parseInt(matches[0], 10);
      g = parseInt(matches[1], 10);
      b = parseInt(matches[2], 10);
    } else {
      // Fallback to white for unparseable colors
      return "black";
    }
  } else {
    // Unknown format, default to black
    return "black";
  }

  // Calculate relative luminance using WCAG formula
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;

  const rLinear = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const gLinear = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const bLinear = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  const luminance = 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;

  // Return white text for dark backgrounds (luminance < 0.5), black for light
  return luminance > 0.5 ? "black" : "white";
}

/**
 * Lightens a color by blending it with white
 * @param color - Hex color string (e.g., "#ff0000") or rgb/rgba string
 * @param amount - Amount to lighten (0-1, where 0 is no change and 1 is pure white)
 * @returns Lightened color in the same format as input (hex or rgba)
 */
export function lightenColor(color: string, amount: number = 0.3): string {
  let r: number, g: number, b: number;
  const isHex = color.startsWith("#");

  if (isHex) {
    // Hex color
    r = parseInt(color.slice(1, 3), 16);
    g = parseInt(color.slice(3, 5), 16);
    b = parseInt(color.slice(5, 7), 16);
  } else if (color.startsWith("rgb")) {
    // rgb or rgba color
    const matches = color.match(/\d+/g);
    if (matches && matches.length >= 3) {
      r = parseInt(matches[0], 10);
      g = parseInt(matches[1], 10);
      b = parseInt(matches[2], 10);
    } else {
      // Fallback to original color if unparseable
      return color;
    }
  } else {
    // Unknown format, return original
    return color;
  }

  // Blend with white (255, 255, 255)
  const newR = Math.round(r + (255 - r) * amount);
  const newG = Math.round(g + (255 - g) * amount);
  const newB = Math.round(b + (255 - b) * amount);

  if (isHex) {
    // Return as hex
    const toHex = (n: number) => {
      const hex = n.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
  } else {
    // Return as rgba (preserve alpha if present)
    const alphaMatch = color.match(/rgba?\([^)]*\)/);
    if (alphaMatch && color.includes("rgba")) {
      const alpha = color.match(/[\d.]+$/)?.[0] || "1";
      return `rgba(${newR}, ${newG}, ${newB}, ${alpha})`;
    }
    return `rgb(${newR}, ${newG}, ${newB})`;
  }
}

/**
 * Darkens a color by blending it with black
 * @param color - Hex color string (e.g., "#ff0000") or rgb/rgba string
 * @param amount - Amount to darken (0-1, where 0 is no change and 1 is pure black)
 * @returns Darkened color in the same format as input (hex or rgba)
 */
export function darkenColor(color: string, amount: number = 0.3): string {
  let r: number, g: number, b: number;
  const isHex = color.startsWith("#");

  if (isHex) {
    // Hex color
    r = parseInt(color.slice(1, 3), 16);
    g = parseInt(color.slice(3, 5), 16);
    b = parseInt(color.slice(5, 7), 16);
  } else if (color.startsWith("rgb")) {
    // rgb or rgba color
    const matches = color.match(/\d+/g);
    if (matches && matches.length >= 3) {
      r = parseInt(matches[0], 10);
      g = parseInt(matches[1], 10);
      b = parseInt(matches[2], 10);
    } else {
      // Fallback to original color if unparseable
      return color;
    }
  } else {
    // Unknown format, return original
    return color;
  }

  // Blend with black (0, 0, 0)
  const newR = Math.round(r * (1 - amount));
  const newG = Math.round(g * (1 - amount));
  const newB = Math.round(b * (1 - amount));

  if (isHex) {
    // Return as hex
    const toHex = (n: number) => {
      const hex = n.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
  } else {
    // Return as rgba (preserve alpha if present)
    const alphaMatch = color.match(/rgba?\([^)]*\)/);
    if (alphaMatch && color.includes("rgba")) {
      const alpha = color.match(/[\d.]+$/)?.[0] || "1";
      return `rgba(${newR}, ${newG}, ${newB}, ${alpha})`;
    }
    return `rgb(${newR}, ${newG}, ${newB})`;
  }
}

