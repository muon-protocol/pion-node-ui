import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Alice Dashboard",
  description: "Alice Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <div className=""></div>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
