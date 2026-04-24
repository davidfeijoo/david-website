import "@/styles/globals.css";
import Header from "@/app/Header"; // Import the Header component
import Footer from "@/app/Footer"; // Import the Footer component
import Sidebar from "@/app/Sidebar";
import type { Metadata } from 'next';

import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300','400', '500', '600', '700', '800', '900'], // Add the weights you need
  variable: '--font-montserrat', // Use a CSS variable for easier font application
});

export const metadata: Metadata = {
  title: 'David Feijóo - MSc Student at DTU',
  description: 'Personal portfolio and project showcase of David Feijóo.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={montserrat.variable}>
      <body className={montserrat.className}>
        <Header /> {/* Include the Header */}
        <Sidebar /> {/* Include the Sidebar */}
        <main>{children}</main> {/* Render the page content */}
        <Footer /> {/* Include the Footer */}
      </body>
    </html>
  );
}
