import { getClassNameForTag } from "./getCssDataForTag";
import { Property, Tag } from "./types";
import { isImageNode } from "./utils/isImageNode";

export function buildTagTree(
  node: SceneNode,
): Tag | null {
  if (!node.visible) {
    return null;
  }

  const isImg = isImageNode(node);
  const properties: Property[] = [];

  if (isImg) {
    properties.push({ name: "src", value: "" });
  }

  const childTags: Tag[] = [];

  if ("children" in node && !isImg) {
    node.children.forEach((child) => {
      const childTag = buildTagTree(child);

      if (childTag) {
        childTags.push(childTag);
      }
    });
  }

  const tag: Tag = {
    name: isImg ? "img" : node.name,
    isText: node.type === "TEXT",
    textCharacters: node.type === "TEXT" ? node.characters : null,
    isImg,
    className: getClassNameForTag(node),
    properties,
    children: childTags,
    node,
  };

  console.log('tag: ', tag);

  return tag;
}
