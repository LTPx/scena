import Footer from "../components/Footer";
import Header from "../components/Header";
import SmoothScrollProvider from "../components/SmoothScrollProvider";
import type { Locale } from "use-intl";

interface Props {
  children: any;
  locale: Locale;
}

async function App(props: Props) {
  const { children } = props;

  return (
    <div className="relative">
      <div className="fixed inset-0 z-0 h-screen">
        <Footer />
      </div>

      <div className="relative z-10">
        <Header />

        <SmoothScrollProvider>
          <main className="pb-[100vh]">
            <div className="bg-body">{children}</div>
          </main>
        </SmoothScrollProvider>
      </div>
    </div>
  );
}

export default App;
