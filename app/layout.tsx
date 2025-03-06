import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";

import "./global.css";

export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
};

const banner = (
  <Banner storageKey="under-construction">
    This document is in construction
  </Banner>
);
const navbar = (
  <Navbar
    logo={
      <h1 className="inline-flex justify-center items-center gap-2">
        <img src="/logo.webp" className="w-10 h-10 object-cover align-middle" />
        <p className="text-3xl font-bold top-1">RKTK</p>
      </h1>
    }
    projectLink="https://github.com/nazo6/rktk"
  />
);
const footer = <Footer>MIT {new Date().getFullYear()} © nazo6.</Footer>;

export default async function RootLayout({ children }) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
    >
      <Head>
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/nazo6/rktk-site/tree/master"
          footer={footer}
          // ... Your additional layout options
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
