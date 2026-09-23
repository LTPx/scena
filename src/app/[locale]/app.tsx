"use client";

import Footer from "../components/Footer";
import Header from "../components/Header";
import SmoothScrollProvider from "../components/SmoothScrollProvider";
import { usePathname } from "@/navigation";
import { useIsDesktop } from "../hooks/useIsDesktop";

const HIDDEN_FOOTER_PREFIX_ROUTES = ["/contact", "/outlet", "/showrooms"];

const HIDDEN_FOOTER_DESKTOP_ONLY_EXACT_ROUTES = ["/press"];

interface Props {
  children: React.ReactNode;
}

function App({ children }: Props) {
  const pathname = usePathname();
  const isDesktop = useIsDesktop();

  const hiddenEverywhere = HIDDEN_FOOTER_PREFIX_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const hiddenOnDesktopOnly =
    HIDDEN_FOOTER_DESKTOP_ONLY_EXACT_ROUTES.includes(pathname) &&
    isDesktop === true;

  const hideFooter = hiddenEverywhere || hiddenOnDesktopOnly;

  return (
    <div className="relative">
      <div className="relative z-10">
        <Header />

        <SmoothScrollProvider>
          <main className={hideFooter ? "" : "lg:pb-[calc(100vh-80px)]"}>
            <div className="bg-body">{children}</div>
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
