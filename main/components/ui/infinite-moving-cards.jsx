"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className
}) => {
  const [mounted, setMounted] = useState(false);
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      addAnimation();
    }
  }, [mounted]);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Duplicate items to create the infinite scrolling effect
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      // Adjust speed based on the total width of the scroller
      adjustSpeed();

      getDirection();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  };

  const adjustSpeed = () => {
    if (containerRef.current && scrollerRef.current) {
      const totalWidth = scrollerRef.current.scrollWidth;
      let duration;

      if (speed === "fast") {
        duration = totalWidth / 250; // Increased speed by reducing the divisor
      } else if (speed === "normal") {
        duration = totalWidth / 200; // Adjusted speed
      } else {
        duration = totalWidth / 150; // Slowest speed, but still faster than before
      }

      containerRef.current.style.setProperty("--animation-duration", `${duration}s`);
    }
  };

  if (!mounted) return null; // Ensure rendering after the theme is mounted

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[350px] max-w-full relative rounded-2xl border flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px] text-card-foreground bg-gradient-to-b dark:from-[var(--slate-800)] dark:to-[var(--slate-900)]  from-[var(--slate-100)] to-[var(--slate-200)]"
            key={item.name}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span
                className="relative z-20 text-sm leading-[1.6] font-normal"
                style={{
                  color: "hsl(var(--foreground))", // Set the text color to foreground color
                }}
              >
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span
                    className="text-sm leading-[1.6] font-normal"
                    style={{
                      color: "hsl(var(--muted-foreground))", // Secondary text color
                    }}
                  >
                    {item.name}
                  </span>
                  <span
                    className="text-sm leading-[1.6] font-normal"
                    style={{
                      color: "hsl(var(--muted-foreground))", // Secondary text color
                    }}
                  >
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>

        ))}
      </ul>
    </div>
  );
};
