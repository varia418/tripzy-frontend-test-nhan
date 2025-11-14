import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tripzy",
  description: "Tripzy frontend test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.className} antialiased`}>
        <div>
          <div className="absolute top-0 left-0 -z-10 h-[495px] w-full bg-linear-to-b from-[#F5F8FF] to-[#DBF5FF]"></div>
          <div className="container mx-auto pt-8">
            <Link href="/" className="inline-block">
              <Image src="/logo.png" width={126} height={40} alt="logo" />
            </Link>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
