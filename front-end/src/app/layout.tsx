import type { Metadata } from "next";
import "../styles/index.css";

export const metadata: Metadata = {
  title: {
    template : "%s || E-commerce",
    default : "Etec || E-commerce"
  },
  description: "E-commerce web site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
