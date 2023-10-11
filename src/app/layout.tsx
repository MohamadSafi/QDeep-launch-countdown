import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QDeep",
  description:
    "QDeep is all about Quantum Technology and Quantum Computing to achive Traffic Optimization by Quantum Algorithms",
  applicationName: "QDeep",
  keywords: [
    "Quantum Technology",
    "Quantum Computing",
    "Quantum Algorithms",
    "Quantum Information Processing",
  ],
  authors: [{ name: "Hadi Salloum" }, { name: "Mohammad Safi" }],
  creator: "Mohammad Safi",
  metadataBase: new URL("https://qdeep.net"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
