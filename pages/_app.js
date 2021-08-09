import Head from "next/head";
import NProgress from "nprogress";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import { useEffect } from "react";
import { CONSTANTS } from "../utils/constants";
import { Provider } from "react-redux";
import store from "../redux/store";
import "nprogress/nprogress.css";
import "../styles.css";

NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const startProgress = () => NProgress.start();
    const stopProgress = () => NProgress.done();

    router.events.on("routeChangeStart", startProgress);
    router.events.on("routeChangeComplete", stopProgress);
    router.events.on("routeChangeError", stopProgress);

    return () => {
      router.events.off("routeChangeStart", startProgress);
      router.events.off("routeChangeComplete", stopProgress);
      router.events.off("routeChangeError", stopProgress);
    };
  }, [router]);
  return (
    <Provider store={store}>
      <DefaultSeo
        titleTemplate={`%s | ${CONSTANTS.APP_NAME}`}
        defaultTitle={CONSTANTS.APP_NAME}
        description="MathsNet, Online maths learning portal. MathsNet is a platform that teaches all the curriculum Mathematics at Primary, Secondary and A levels Mathematics."
      />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
