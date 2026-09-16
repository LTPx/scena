import Footer from "../components/Footer";
import Header from "../components/Header";
import SmoothScrollProvider from "../components/SmoothScrollProvider";
import type { Locale } from "use-intl";

interface Props {
  children: any;
  locale: Locale;
}

async function App(props: Props) {
  const { children, locale } = props;

  return (
    <>
      <Header />
      <SmoothScrollProvider>
        <div className="bg-body">{children}</div>
      </SmoothScrollProvider>
      {/* <Footer /> */}
    </>
  );
}

export default App;
