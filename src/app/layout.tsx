"use client";
import * as React from "react";
import { Inter } from "next/font/google";
import { SignerOptions, wallets } from "cosmos-kit";
import { ChainProvider } from "@cosmos-kit/react";
import { assets, chains } from "chain-registry";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/navigation/navbar";
import "@interchain-ui/react/styles";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const signerOptions: SignerOptions = {
    // signingStargate: () => {
    //   return getSigningCosmosClientOptions();
    // }
  };
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className} style={{ background: 'linear-gradient(to right, rgb(249, 168, 212), rgb(216, 180, 254), rgb(129, 140, 248))' }}>
        <ChainProvider
          chains={chains}
          assetLists={assets}
          wallets={wallets}
          walletConnectOptions={{
            signClient: {
              projectId: "a8510432ebb71e6948cfd6cde54b70f7",
              relayUrl: "wss://relay.walletconnect.org",
              metadata: {
                name: "NexusFI",
                description: "restake your tokens",
                url: "https://docs.cosmology.zone/cosmos-kit/",
                icons: [],
              },
            },
          }}
          // @ts-ignore
          signerOptions={signerOptions}
        >
          <div className="min-h-screen">
            <Navbar />
            <Toaster />
            {children}
          </div>

        </ChainProvider>
      </body>
    </html >
  );
}
