import { isImageNode } from "./utils/isImageNode";

const justifyContentCssValues = {
  MIN: "justify-start",
  MAX: "justify-end",
  CENTER: "justify-center",
  SPACE_BETWEEN: "justify-between",
};

const alignItemsCssValues = {
  MIN: "items-start",
  MAX: "items-end",
  CENTER: "items-center",
  BASELINE: "items-baseline",
};

const textAlignCssValues = {
  LEFT: "text-left",
  RIGHT: "text-right",
  CENTER: "text-center",
  JUSTIFIED: "justify",
};

const textVerticalAlignCssValues = {
  TOP: "align-top",
  CENTER: "align-middle",
  BOTTOM: "align-bottom",
};

const textDecorationCssValues = {
  UNDERLINE: "underline",
  STRIKETHROUGH: "line-through",
};

function determineFontSizeClass(fontSize: number): string {
  // Mapping of common font sizes to Tailwind's predefined classes
  const fontSizeMap: Record<number, string> = {
    12: "text-xs",
    14: "text-sm",
    16: "text-base",
    18: "text-lg",
    20: "text-xl",
    24: "text-2xl",
    30: "text-3xl",
    36: "text-4xl",
    48: "text-5xl",
    60: "text-6xl",
    72: "text-7xl",
    96: "text-8xl",
    128: "text-9xl",
  };

  // Check if the font size matches a predefined class
  if (fontSizeMap[fontSize]) {
    return fontSizeMap[fontSize];
  }

  // If not, use Tailwind's arbitrary value syntax
  return `text-[${fontSize}px]`;
}

function getBorderRadiusString(
  node: FrameNode | RectangleNode | ComponentNode | InstanceNode
): string | null {
  // Assuming a function to map specific pixel values to Tailwind classes
  function borderRadiusToTailwind(value: number): string {
    if (value === 0) return "rounded-none";
    if (value <= 2) return "rounded-sm";
    if (value <= 4) return "rounded";
    if (value <= 6) return "rounded-md";
    if (value <= 8) return "rounded-lg";
    if (value <= 12) return "rounded-xl";
    if (value <= 16) return "rounded-2xl";
    if (value <= 24) return "rounded-3xl";
    // For values that don't match Tailwind's default scale, use arbitrary values
    return `rounded-[${value}px]`;
  }

  if (node.cornerRadius !== 0) {
    if (typeof node.cornerRadius !== "number") {
      // If cornerRadius is not a single value, we need to handle each corner separately
      // Tailwind does not support different radii for each corner out of the box, so this would require custom classes or inline styles
      return null; // This case needs a custom approach or inline styles
    } else {
      // Map the single numeric value to a Tailwind class
      return borderRadiusToTailwind(node.cornerRadius);
    }
  }
  return null;
}

function rgbToTailwindColor(
  r: number,
  g: number,
  b: number,
  opacity?: number
): string {
  // Convert each RGB component to a hex string
  const hexR = Math.floor(r * 255)
    .toString(16)
    .padStart(2, "0");
  const hexG = Math.floor(g * 255)
    .toString(16)
    .padStart(2, "0");
  const hexB = Math.floor(b * 255)
    .toString(16)
    .padStart(2, "0");

  // If opacity is defined, return RGBA format for Tailwind CSS
  if (opacity !== undefined) {
    return `rgba(${r * 255},${g * 255},${b * 255},${opacity})`;
  }

  // Combine the components to form the full hex color code
  const hexColor = `#${hexR}${hexG}${hexB}`;

  // Return a Tailwind CSS class using the arbitrary value syntax for background color
  return `${hexColor}`;
}

function buildColorString(paint: Paint): string {
  if (paint.type === "SOLID") {
    // If opacity is defined and less than 1, handle RGBA conversion
    if (paint.opacity !== undefined && paint.opacity < 1) {
      return rgbToTailwindColor(
        paint.color.r,
        paint.color.g,
        paint.color.b,
        paint.opacity
      );
    }
    // Otherwise, return the hex color
    return rgbToTailwindColor(paint.color.r, paint.color.g, paint.color.b);
  }

  return "";
}

function tailwindValueMapping(value: number): string {
  const valueMap: Record<number, string> = {
    0: "0",
    1: "px",
    2: "0.5",
    4: "1",
    6: "1.5",
    8: "2",
    10: "2.5",
    12: "3",
    14: "3.5",
    16: "4",
    20: "5",
    24: "6",
    28: "7",
    32: "8",
    36: "9",
    40: "10",
    44: "11",
    48: "12",
    52: "13",
    56: "14",
    60: "15",
    64: "16",
    72: "18",
    80: "20",
    96: "24",
  };

  if (valueMap[value]) {
    return valueMap[value];
  }

  return `[${value}px]`;
}

export function getClassNameForTag(node: SceneNode): string {
  const classes = [];

  // skip vector since it's often displayed as an img tag
  if (node.visible && node.type !== "VECTOR") {
    if ("opacity" in node && (node?.opacity || 1) < 1) {
      classes.push(`opacity-[${node.opacity * 100}%]`);
    }

    if ("rotation" in node && node.rotation !== 0) {
      classes.push(`rotate-[${Math.round(node.rotation)}deg]`);
    }

    if (
      node.type === "FRAME" ||
      node.type === "INSTANCE" ||
      node.type === "COMPONENT"
    ) {
      const borderRadiusValue = getBorderRadiusString(node);

      if (borderRadiusValue) {
        classes.push(borderRadiusValue);
      }

      classes.push(`h-${tailwindValueMapping(node.height)}`);
      classes.push(`w-${tailwindValueMapping(node.width)}`);

      if (node.layoutMode !== "NONE") {
        const isHorizontal = node.layoutMode === "HORIZONTAL";

        classes.push("flex");
        classes.push(isHorizontal ? "flex-row" : "flex-col");
        classes.push(justifyContentCssValues[node.primaryAxisAlignItems]);
        classes.push(alignItemsCssValues[node.counterAxisAlignItems]);

        if (
          node.paddingTop === node.paddingBottom &&
          node.paddingTop === node.paddingLeft &&
          node.paddingTop === node.paddingRight
        ) {
          if (node.paddingTop > 0) {
            classes.push(`p-${tailwindValueMapping(node.paddingTop)}`);
          }
        } else if (
          node.paddingTop === node.paddingBottom &&
          node.paddingLeft === node.paddingRight
        ) {
          classes.push(
            `px-${tailwindValueMapping(
              node.paddingLeft
            )} py-${tailwindValueMapping(node.paddingTop)}`
          );
        } else {
          classes.push(`pt-${tailwindValueMapping(node.paddingTop)}`);
          classes.push(`pr-${tailwindValueMapping(node.paddingRight)}`);
          classes.push(`pb-${tailwindValueMapping(node.paddingBottom)}`);
          classes.push(`pl-${tailwindValueMapping(node.paddingLeft)}`);
        }

        if (
          node.primaryAxisAlignItems !== "SPACE_BETWEEN" &&
          node.itemSpacing > 0
        ) {
          classes.push(`gap-${tailwindValueMapping(node.itemSpacing)}`);
        }
      }

      if (
        (node.fills as Paint[]).length > 0 &&
        (node.fills as Paint[])[0].type !== "IMAGE"
      ) {
        const paint = (node.fills as Paint[])[0];
        const color = buildColorString(paint);
        classes.push(`bg-[${color}]`);
      }

      if ((node.strokes as Paint[]).length > 0) {
        const paint = (node.strokes as Paint[])[0];

        if (typeof node.strokeWeight === "number") {
          const color = buildColorString(paint);
          classes.push(`border border-${node.strokeWeight} border-[${color}]`);
        } else {
          // Handle the case when node.strokeWeight is not a number, e.g., figma.mixed
          // You might set a default stroke weight or skip adding the property
        }
      }
    }

    if (node.type === "RECTANGLE") {
      const borderRadiusValue = getBorderRadiusString(node);

      if (borderRadiusValue) {
        classes.push(borderRadiusValue);
      }

      classes.push(`h-${tailwindValueMapping(node.height)}`);
      classes.push(`w-${tailwindValueMapping(node.width)}`);

      if (
        (node.fills as Paint[]).length > 0 &&
        (node.fills as Paint[])[0].type !== "IMAGE"
      ) {
        const paint = (node.fills as Paint[])[0];
        const color = buildColorString(paint);
        classes.push(`bg-[${color}]`);
      }

      if ((node.strokes as Paint[]).length > 0) {
        const paint = (node.strokes as Paint[])[0];

        if (typeof node.strokeWeight === "number") {
          const color = buildColorString(paint);
          classes.push(`border border-${node.strokeWeight} border-[${color}]`);
        } else {
          // Handle the case when node.strokeWeight is not a number, e.g., figma.mixed
          // You might set a default stroke weight or skip adding the property
        }
      }
    }

    if (node.type === "TEXT") {
      classes.push(textAlignCssValues[node.textAlignHorizontal]);
      classes.push(textVerticalAlignCssValues[node.textAlignVertical]);
      classes.push(determineFontSizeClass(node.fontSize as number));
      classes.push(`font-${(node.fontName as FontName).family}`);

      if (node.textTruncation === "ENDING") {
        classes.push("truncate");
      }

      if (
        node.textDecoration === "STRIKETHROUGH" ||
        node.textDecoration === "UNDERLINE"
      ) {
        classes.push(`
          ${textDecorationCssValues[node.textDecoration]}`);
      }

      if ((node.fills as Paint[]).length > 0) {
        const paint = (node.fills as Paint[])[0];
        const color = buildColorString(paint);
        classes.push(`text-[${color}]`);
      }
    }

    if (node.type === "LINE") {
      classes.push(`h-px`);

      classes.push(`w-${tailwindValueMapping(node.width)}`);

      if ((node.strokes as Paint[]).length > 0) {
        const paint = (node.strokes as Paint[])[0];

        if (typeof node.strokeWeight === "number") {
          const color = buildColorString(paint);
          classes.push(`bg-[${color}]`);
        } else {
          // Handle the case when node.strokeWeight is not a number, e.g., figma.mixed
          // You might set a default stroke weight or skip adding the property
        }
      }
    }

    if (
      node.type === "GROUP" ||
      node.type === "ELLIPSE" ||
      node.type === "POLYGON" ||
      node.type === "STAR"
    ) {
      classes.push(`h-${tailwindValueMapping(node.height)}`);
      classes.push(`w-${tailwindValueMapping(node.width)}`);
    }
  }

  if (classes.length > 0) {
    if (isImageNode(node)) {
      classes.push("object-cover");
    }

    return classes.join(" ");
  }

  return null;
}
