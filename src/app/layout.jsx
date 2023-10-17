"use client";
import "./globals.css";
import Image from "next/image";
import StyledComponentsRegistry from "@/lib/registry";
import "tw-elements/dist/css/tw-elements.min.css";
import { Providers } from "@/redux/provider";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowProvider } from "../lib/rainbowProviders";

import { Roboto } from "next/font/google";
import Balance from "@/components/layout/balance";
import { CustomConnectButton } from "@/components/layout/CustomConnectButton";
import { useSelector } from "react-redux";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Pion Dashboard",
  description: "Pion Dashboard",
};

function Loading() {
  const selector = useSelector((state) => state.rootReducer.generalReducer);
  return;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={roboto.className}>
        <script
          type="text/javascript"
          src="@/../node_modules/tw-elements/dist/js/tw-elements.umd.min.js"
        ></script>
        <Providers>
          <RainbowProvider>
            <StyledComponentsRegistry>
              <div className="min-h-[100vh] relative">
                <div className="pb-14">
                  <div className="flex flex-wrap justify-between pl-10 md:px-10 pt-4">
                    <div className="col-span-1 mb-1">
                      <Image
                        src="/pion/dashboard/Logo.svg"
                        width="121"
                        height="32"
                      ></Image>
                    </div>
                    <div className="col-span-5 justify-self-end">
                      <div className="flex flex-wrap">
                        <Balance></Balance>
                        {/* <ConnectButton></ConnectButton> */}
                        <CustomConnectButton></CustomConnectButton>
                      </div>
                    </div>
                  </div>
                  <div className="w-full min-h-[80vh] flex content-center justify-center flex-wrap	mt-2">
                    <main className="max-w-[1200px] 2xl:max-w-[1600px]  w-[80%]">
                      {children}
                    </main>
                  </div>
                </div>
                <div className="w-full absolute bottom-0 h-14 flex justify-center py-3">
                  <Image
                    src="/pion/dashboard/Footer.svg"
                    width="172"
                    height="22"
                    className=""
                  ></Image>
                </div>
              </div>
            </StyledComponentsRegistry>
          </RainbowProvider>
        </Providers>
      </body>
    </html>
  );
}
