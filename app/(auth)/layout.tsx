import Image from "next/image";


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
    <main className="h-screen w-full relative">
      <div className="absolute size-full">
        <Image src="/images/bg-img.png" alt="background-Image" fill className="size-full"/>
      </div>
      {children}
    </main>
      
    );
  }
  