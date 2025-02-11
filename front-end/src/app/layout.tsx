import type { Metadata } from "next";
import "../styles/index.css";
import { Suspense } from "react";
import Loading from "@/components/loading";

export const metadata: Metadata = {
  title: {
    template: "%s || E-commerce",
    default: "Etec || E-commerce"
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
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
