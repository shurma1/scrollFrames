import { Style } from "./Style";
export interface Animation {
    keyframes?: {
        progrss?: {
            style?: Style;
        };
    };
    in?: {
        style?: Style;
    };
    out?: {
        style?: Style;
    };
}
