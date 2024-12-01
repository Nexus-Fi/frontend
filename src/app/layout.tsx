"use client";
import * as React from "react";
import { Inter } from "next/font/google";
import { SignerOptions, wallets } from "cosmos-kit";
import { ChainProvider } from "@cosmos-kit/react";
import { assets, chains } from "chain-registry";
import { Toaster } from "react-hot-toast";
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
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
      <body className={`${inter.className} bg-gradient-to-b from-[#FFFEE8] to-[#F6FCE5] text-gray-800`}>
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
          <div className="min-h-screen bg-white">
            <div className="flex min-h-screen border m-5 border-gray-400 shadow-lg ">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 overflow-y-auto border-l border-gray-400 bg-gradient-to-b from-[#FFFEE8] to-[#F6FCE5] text-gray-800">
                  {children}
                </main>
              </div>
            </div>
            {/* <Navbar />
            {children} */}
            <Toaster />
          </div>

        </ChainProvider>
      </body>
    </html >
  );
}
