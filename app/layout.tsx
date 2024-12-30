import "@/styles/globals.css";
import Header from "@/app/Header"; // Import the Header component
import Footer from "@/app/Footer"; // Import the Footer component
import Sidebar from "@/app/Sidebar";

import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300','400', '500', '600', '700', '800', '900'], // Add the weights you need
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <Header /> {/* Include the Header */}
        <Sidebar /> {/* Include the Sidebar */}
        <main>{children}</main> {/* Render the page content */}
        <Footer /> {/* Include the Footer */}
      </body>
    </html>
  );
}
