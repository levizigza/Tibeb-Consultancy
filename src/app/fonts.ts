import { Noto_Sans, Noto_Sans_Ethiopic } from "next/font/google";

export const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

export const notoSansEthiopic = Noto_Sans_Ethiopic({
  subsets: ["ethiopic"],
  weight: "variable",
  variable: "--font-noto-ethiopic",
  display: "swap",
  preload: false,
});
