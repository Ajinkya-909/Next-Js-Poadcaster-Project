import type { Metadata } from "next";
import "./globals.css";
import ConvexClerkProvider from "./providers/ConvexClerkProvider";




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
      <ConvexClerkProvider>{children}</ConvexClerkProvider>
      </body>
    </html>
  );
}
