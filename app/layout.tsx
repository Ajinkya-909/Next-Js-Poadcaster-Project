import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "PoadCaster",
  description: "Generate Your Podcast",
  icons:{
    icon:'/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
