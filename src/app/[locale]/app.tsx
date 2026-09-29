"use client";

import Footer from "../components/Footer";
import Header from "../components/Header";
import SmoothScrollProvider from "../components/SmoothScrollProvider";
import { usePathname } from "@/navigation";
import { useIsDesktop } from "../hooks/useIsDesktop";

const HIDDEN_FOOTER_PREFIX_ROUTES = ["/contact", "/showrooms"];
const HIDDEN_FOOTER_DESKTOP_PREFIX_ROUTES = ["/outlet"];

interface Props {
  children: React.ReactNode;
}

const startsWithRoute = (pathname: string, route: string) =>
  pathname === route || pathname.startsWith(`${route}/`);

function App({ children }: Props) {
  const pathname = usePathname();
  const isDesktop = useIsDesktop();

  const hiddenEverywhere = HIDDEN_FOOTER_PREFIX_ROUTES.some((route) =>
    startsWithRoute(pathname, route),
  );

  const isPressIndex = /^\/press\/?$/.test(pathname);
  const isServiceDetail = /^\/services\/[^/]+/.test(pathname);

  const hiddenOnDesktop =
    isDesktop === true &&
    (HIDDEN_FOOTER_DESKTOP_PREFIX_ROUTES.some((route) =>
      startsWithRoute(pathname, route),
    ) ||
      isPressIndex ||
      isServiceDetail);

  const hideFooter = hiddenEverywhere || hiddenOnDesktop;

  return (
    <div className="relative">
      <div className="relative z-20 lg:pointer-events-none lg:z-10">
        <Header />

        <SmoothScrollProvider>
          <main className={hideFooter ? "" : "lg:pb-[calc(100vh)]"}>
            <div className="bg-body lg:pointer-events-auto">{children}</div>
          </main>
        </SmoothScrollProvider>
      </div>

      {!hideFooter && (
        <div className="relative z-10 lg:fixed lg:inset-0 lg:z-0 lg:flex lg:h-screen lg:items-end">
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
