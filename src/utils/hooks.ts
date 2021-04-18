import { useEffect, useRef } from 'react';

function useOnIntersectionChange(onChange: (intersecting: boolean) => void, margin = '100px') {
  const elementRef = useRef<Element | null>(null);
  const observerRef = useRef<IntersectionObserver>();
  const isIntersectingRef = useRef(false);

  useEffect(() => {
    if (!elementRef.current) return () => {};

    function handleObserver(event: IntersectionObserverEntry[]) {
      if (!event[0]) return;
      if (event[0].isIntersecting === isIntersectingRef.current) return;

      isIntersectingRef.current = event[0].isIntersecting;
      onChange(event[0].isIntersecting);
    }

    const options = {
      root: null,
      rootMargin: margin,
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver(handleObserver, options);

    observerRef.current.observe(elementRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [onChange, margin]);

  return { ref: elementRef };
}

// Under normal circumstances multiple hooks would have been exported from this file
// so this linter error wouldn't be relevant.
// eslint-disable-next-line import/prefer-default-export
export { useOnIntersectionChange };
