import { CSSProperties, FC, ReactNode } from "react";
import { Animation } from "./types";
interface AnimatorProps {
    children: ReactNode | ReactNode[];
    animation: Animation;
    style?: CSSProperties;
    className?: string;
    callBack?: string | undefined;
}
declare const Animator: FC<AnimatorProps>;
export default Animator;
