import { Tag } from "./types";

function guessTagName(name: string) {
  const _name = name.toLowerCase();

  if (_name.includes("button")) {
    return "button";
  }

  if (_name.includes("section")) {
    return "section";
  }

  if (_name.includes("article")) {
    return "article";
  }

  if (_name.includes("icon")) {
    return "FireIcon";
  }

  return "div";
}

function getTagName(tag: Tag) {
  if (!tag.isComponent) {
    if (tag.isImg) {
      return "img";
    }

    if (tag.isText) {
      return "p";
    }

    return guessTagName(tag.name);
  }

  return tag.isText ? "Text" : tag.name.replace(/\s/g, "");
}

function getClassName(tag: Tag) {
  if (!tag.isComponent) {
    if (tag.isImg) {
      return "";
    }

    return ` className="${tag.className}"`;
  }

  return "";
}

function buildPropertyString(prop: Tag["properties"][number]) {
  return ` ${prop.name}${
    prop.value !== null
      ? `=${prop.notStringValue ? "{" : '"'}${prop.value}${
          prop.notStringValue ? "}" : '"'
        }`
      : ""
  }`;
}

function buildChildTagsString(tag: Tag): string {
  if (tag.children.length > 0) {
    return tag.children.map((child) => buildJsxString(child)).join("");
  }
  if (tag.isText) {
    return `${tag.textCharacters}`;
  }

  return "";
}

function buildJsxString(tag: Tag) {
  if (!tag) {
    return "";
  }

  const hasChildren = tag.children.length > 0;

  const tagName = getTagName(tag);
  const className = getClassName(tag);
  const properties = tag.properties.map(buildPropertyString).join("");

  const openingTag = `<${tagName}${className}${properties}${
    hasChildren || tag.isText ? `` : " /"
  }>`;

  const childTags = buildChildTagsString(tag);

  const closingTag = hasChildren || tag.isText ? `</${tagName}>` : "";

  if (tagName === "FireIcon") {
    return `<FireIcon${className} />`;
  }

  return openingTag + childTags + closingTag;
}

export function buildCode(tag: Tag): string {
  return buildJsxString(tag);
}
