import React, {
  CSSProperties,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ScrollDataContext, ScrollPageContext } from "./stores";
import { Animation } from "./types";
import { computeStyle } from "./utils";
import { callback } from "./utils";

interface AnimatorProps {
  children: ReactNode | ReactNode[];
  animation: Animation;
  style?: CSSProperties;
  className?: string;
  callBack?: string | undefined;
}

const Animator: FC<AnimatorProps> = (props) => {
  const { children, animation, style, className, callBack } = props;
  const { currentPage, currentProgress } = useContext(ScrollDataContext);
  const { page } = useContext(ScrollPageContext);
  const [isSSR, setIsSSR] = useState(true);
  
  const isFinished = true ? (!isSSR && currentPage !== page - 1 && currentPage !== page): false;
  let thisPageProgress = (currentPage !== -1 && currentPage === page) ? currentProgress : currentPage > page ? 1 : 0;
  let data = { progress: (isFinished)? 1 :currentProgress, page: currentPage, isFinished: isFinished, isThisPage: currentPage === page, thisPageProgress: thisPageProgress };
  
  callback(callBack, data);
  useEffect(
    () => (typeof window !== "undefined" ? setIsSSR(false) : undefined),
    []
  );


  const calculatedStyle: CSSProperties | undefined = useMemo(
    () =>
      isSSR
        ? style
        : currentPage === page // for current (out)
        ? ({
            ...computeStyle(animation?.keyframes, (isFinished)? 1 :currentProgress),
            ...style,
          } as CSSProperties)
          
        : { display: 'none' },
    [
      isSSR,
      currentPage,
      page,
      animation?.keyframes,
      currentProgress,
      style
    ]
  );

  return (
    <div suppressHydrationWarning  style={calculatedStyle} className={className}>
      {children}
    </div>
  );
};

export default Animator;
