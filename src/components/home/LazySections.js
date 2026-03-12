"use client";

import { useEffect, useRef, useState } from "react";

export default function LazySection({
  children,
  fallback = null,
  height = "400px",
  rootMargin = "200px"
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={{ minHeight: visible ? undefined : height }}>
      {visible ? children : fallback}
    </div>
  );
}