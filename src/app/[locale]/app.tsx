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
      {/* <div className="fixed inset-0 z-0 h-screen">
       */}
       <div>
        {!hideFooter && <Footer />}
      </div>

      <div className="relative z-10">
        <Header />

        <SmoothScrollProvider>
          <main className={hideFooter ? "" : "pb-[100vh]"}>
            <div className="bg-body">{children}</div>
          </main>
        </SmoothScrollProvider>
      </div>
    </div>
  );
}

export default App;
