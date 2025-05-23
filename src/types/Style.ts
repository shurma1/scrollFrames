import { CSSProperties } from "react";

export type Style = Partial<
  Record<
    keyof CSSProperties,
    | CSSProperties[keyof CSSProperties]
  >
>;
