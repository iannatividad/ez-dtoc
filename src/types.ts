export type Property = {
  name: string;
  value: string;
  notStringValue?: boolean;
};

export type Tag = {
  name: string;
  isText: boolean;
  textCharacters: string | null;
  isImg: boolean;
  properties: Property[];
  className: string;
  children: Tag[];
  node: SceneNode;
  isComponent?: boolean;
};

export type LineHeightWithValue = {
  readonly value: number;
  readonly unit: "PIXELS" | "PERCENT";
};
