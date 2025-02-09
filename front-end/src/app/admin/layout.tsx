import type { Metadata } from "next";
import "../../styles/index.css";
import Navbar from "@/components/admin/nav";
import { Suspense } from "react";
import Loading from "@/components/loading";

export const metadata: Metadata = {
  title: {
    template: "%s || E-commerce",
    default: "admin"
  },
  description: "Access your admin panel to manage and monitor system activities efficiently.",
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
          <div className="flex">
            <Navbar />
            {children}
          </div>
        </Suspense>
      </body>
    </html>
  );
}
