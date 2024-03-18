import { RefObject, useEffect } from "react";

const useIntersectionObserver = (
  ref: RefObject<Element>,
  callback: (
    entities: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => void,
  observerStopped: boolean
): void => {
  useEffect(() => {
    const option: IntersectionObserverInit = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(callback, option);
    if (ref.current && !observerStopped) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, callback, observerStopped]);
};

export default useIntersectionObserver;
