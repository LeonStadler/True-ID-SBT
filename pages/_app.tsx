import { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "../components/theme-provider";
import { siteConfig } from "../config/site";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { polygonAmoy } from "../lib/chain";
import "../styles/footerstyle.css";
import "../styles/globals.css";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonAmoy],
  [publicProvider()]
);

const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
if (!WALLETCONNECT_PROJECT_ID) {
  throw new Error("Missing required env NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID");
}

const { connectors } = getDefaultWallets({
  appName: siteConfig.name,
  projectId: WALLETCONNECT_PROJECT_ID,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Head>
              <title>{siteConfig.name}</title>
              <meta name="description" content="" />
            </Head>

            <Toaster position="top-center" reverseOrder={false} />
            <Component {...pageProps} />
            <footer className="footer">
              <div className="disclaimer mt-4 text-sm text-muted-foreground">
                <p>
                  Please be aware that this is a prototype and no guarantee can be given regarding the legitimacy of the data.
                </p>
                <p>
                  The submission of any data is at the user's own risk, and no liability or responsibility will be accepted for the accuracy or security of the data.
                </p>
                <hr />
                <p>
                  This project was developed by Leon Stadler as part of his Master's thesis in the InterMedia program at the University of Applied Sciences Vorarlberg, during the Summer Semester of 2024, under the supervision of Dr. Margarita Köhl, MAS.
                </p>
                <p>
                  For more information, please visit the project's <a href="https://github.com/LeonStadler/True-ID-SBT" target="_blank">GitHub</a> repository.
                </p>
              </div>
            </footer>
          </ThemeProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
