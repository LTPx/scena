"use client";

import Footer from "../components/Footer";
import Header from "../components/Header";
import SmoothScrollProvider from "../components/SmoothScrollProvider";
import { usePathname } from "@/navigation";

const HIDDEN_FOOTER_EXACT_ROUTES = ["/press"];
const HIDDEN_FOOTER_PREFIX_ROUTES = ["/contact", "/outlet", "/showrooms"];

interface Props {
  children: React.ReactNode;
}

function App({ children }: Props) {
  const pathname = usePathname();

  const hideFooter =
    HIDDEN_FOOTER_EXACT_ROUTES.includes(pathname) ||
    HIDDEN_FOOTER_PREFIX_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    );

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
