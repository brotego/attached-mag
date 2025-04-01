import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";
import Nav from "@/components/global/nav/Nav";
import NavHorizontal from "@/components/global/nav/NavHorizontal";
import Footer from "@/components/global/footer/Footer";

export const metadata: Metadata = {
  title: "Attached Magazine",
  description: "A magazine for the modern age",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // You can toggle between Nav and NavHorizontal here
  const NavigationComponent = NavHorizontal; // Change to Nav for vertical navigation

  return (
    <html lang="en">
      <body>
        <NavigationComponent />
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
