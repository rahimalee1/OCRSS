import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import ScrollToTop from '@/components/ScrollToTop';
import Aoscompo from "@/utils/aos"; 
import { DonationProvider } from "./context/donationContext";
import { Toaster } from "react-hot-toast";
const montserrat = Montserrat({ subsets: ["latin"] });
import NextTopLoader from 'nextjs-toploader';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OCRSS | Oromo Cultural Resettlement Services Society",
  description: "Providing social, educational, employment, and settlement services to refugees and immigrants in British Columbia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo/favicon.ico" />
        <link rel="icon" href="/images/logo/favicon.png" type="image/png" />
      </head>
      <body className={montserrat.className}>
      <NextTopLoader color="#FF4D7E" shadow={false} zIndex={40} />
      <DonationProvider>
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          defaultTheme="system"
        >
          <Aoscompo>
            <Header />
            
            {children}
            
            <Footer />
          </Aoscompo>
          <ScrollToTop />
          <Toaster position="top-center" />
        </ThemeProvider>
        </DonationProvider>
      </body>
    </html>
  );
}
