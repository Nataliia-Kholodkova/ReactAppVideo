import { useEffect, useRef } from 'react';

const useObserver = (ref, isLoad, func) => {
  const observer = useRef();
  useEffect(() => {
    if (isLoad) {
      return;
    }
    if (observer.current) {
      observer.current.disconnect();
    }

    const callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        func();
      }
    };
    try {
      observer.current = new IntersectionObserver(callback);
      observer.current.observe(ref.current);
    } catch {
      observer.current = null;
    }
  }, [isLoad]);
};

export default useObserver;
