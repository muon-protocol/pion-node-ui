import "./globals.css";
import styles from "./style.module.css";
import { Inter } from "next/font/google";
import Image from "next/image";
import Balance from "../components/layout/balance";
import StyledComponentsRegistry from "@/lib/registry";
import "tw-elements/dist/css/tw-elements.min.css";

import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";

import "./globals.css";
import { Roboto } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Alice Dashboard",
  description: "Alice Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          <StyledComponentsRegistry>
            <div className="min-h-[100vh] relative">
              <div className="pb-10">
                <div className="flex justify-between px-10 pt-4">
                  <div className="col-span-1">
                    <Image src="/muon-logo.svg" width="121" height="32"></Image>
                  </div>
                  <div className="col-span-5 justify-self-end">
                    <div className="flex">
                      <Balance></Balance>
                      <ConnectButton></ConnectButton>
                    </div>
                  </div>
                </div>
                <div className="w-full min-h-[80vh] flex content-center justify-center flex-wrap	mt-6">
                  <main className="max-w-[1032px] w-[80%]">{children}</main>
                </div>
              </div>
              <div className="w-full absolute bottom-0 h-10 flex justify-center pb-3">
                <Image
                  src="/Footer.svg"
                  width="172"
                  height="22"
                  className=""
                ></Image>
              </div>
            </div>
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}
