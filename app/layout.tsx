import { Calistoga, PT_Serif } from "next/font/google";
import "./globals.css";

const calistoga = Calistoga({
  weight: ["400"],
  variable: "--font-calistoga",
  subsets: ["latin"],
});

const ptSerif = PT_Serif({
  weight: ["400", "700"],
  variable: "--font-pt-serif",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html style={{ scrollBehavior: "smooth" }} lang="en">
      <body className={`${calistoga.variable} ${ptSerif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
