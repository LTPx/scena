// components/layout/createResponsive.tsx
"use client";

import type { ComponentType } from "react";
import { useIsDesktop } from "../../hooks/useIsDesktop";

export function createResponsive<P extends object>(
  Desktop: ComponentType<P>,
  Mobile: ComponentType<P>,
) {
  return function Responsive(props: P) {
    const isDesktop = useIsDesktop();

    return (
      <>
        {isDesktop !== false && (
          <div className="hidden lg:contents">
            <Desktop {...props} />
          </div>
        )}
        {isDesktop !== true && (
          <div className="contents lg:hidden">
            <Mobile {...props} />
          </div>
        )}
      </>
    );
  };
}
