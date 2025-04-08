

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div>
    <main>

    <p className="text-white-1">Left Side Bar</p>
    {children}
    <p className="text-white-1">Right Side Bar</p>
    </main>
   </div>
  );
}
