import "@/styles/globals.css";
import Header from "@/app/Header";
import Footer from "@/app/Footer";
import Sidebar from "@/app/Sidebar";

import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300','400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
});

import { ScrollProvider } from "@/app/ScrollContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={montserrat.variable}>
      <head>
        <title>David Feijóo - MSc Student at DTU</title>
        <meta name="description" content="Personal portfolio and project showcase of David Feijóo." />
        <meta name="format-detection" content="telephone=no, address=no, email=no" />
      </head>
      <body className={montserrat.className}>
        <ScrollProvider>
          <Header />
          <Sidebar />
          <main>{children}</main>
          <Footer />
        </ScrollProvider>
      </body>
    </html>
  );
}
