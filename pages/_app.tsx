import { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import { siteConfig } from "../config/site";
import { fontSans } from "../lib/fonts";
import { cn } from "../lib/utils";
import { ThemeProvider } from "../components/theme-provider";

import "../styles/globals.css";
import "../styles/footerstyle.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Head from "next/head";
import { polygonAmoy } from "../lib/chain";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonAmoy],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  projectId: "367d58ac2f41cff9550d95f2a87312cb",
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
              <title>TrueID SBT</title>
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
