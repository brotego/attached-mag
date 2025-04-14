import "./globals.css";
import "./fonts.css";
import NavHorizontal from "@/components/global/nav/NavHorizontal";
import { FooterContainer } from "@/components/common/Footer/FooterContainer";
import { metadata } from "./metadata";

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#efe8e0]">
        <NavHorizontal />
        <div className="flex flex-col pt-16">
          <main>
            {children}
          </main>
          <FooterContainer />
        </div>
      </body>
    </html>
  );
}
