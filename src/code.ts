import { buildCode } from "./buildCode";
import { buildTagTree } from "./buildTagTree";

figma.showUI(__html__, { width: 400, height: 600 });

async function generate(node: SceneNode) {
  const originalTagTree = buildTagTree(node);

  if (originalTagTree === null) {
    figma.notify("Please select a visible node");
    return;
  }

  const generatedCodeStr = buildCode(originalTagTree);

  figma.ui.postMessage({
    type: "generated-code",
    payload: generatedCodeStr,
  });
}

figma.ui.onmessage = (msg) => {
  const selectedNodes = figma.currentPage.selection;

  if (msg.type === "get-selected-json") {
    if (selectedNodes.length > 1) {
      figma.notify("Please select only 1 node");
      figma.closePlugin();
    } else if (selectedNodes.length === 0) {
      figma.notify("Please select a node");
      figma.closePlugin();
    } else {
      generate(selectedNodes[0]);
    }
  }

  if (msg.type === "save-api-key") {
    figma.clientStorage.setAsync("apiKey", msg.apiKey).then(() => {
      figma.notify("API Key saved");
    });
  } else if (msg.type === "get-api-key") {
    figma.clientStorage.getAsync("apiKey").then((apiKey) => {
      figma.ui.postMessage({ type: "set-api-key", payload: apiKey });
    });
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  // figma.closePlugin();
};
