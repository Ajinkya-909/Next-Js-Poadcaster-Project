import type { Metadata } from "next";
import "./globals.css";
import ConvexClerkProvider from "../providers/ConvexClerkProvider";
import AudioProvider from "@/providers/AudioProvider";



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
      <ConvexClerkProvider>
    <html lang="en">
      <AudioProvider>

      <body>
        {children}
      </body>
      </AudioProvider>
    </html>
      </ConvexClerkProvider>
  );
}
