import type { Metadata } from "next";
import "@/styles/index.css";

export const metadata: Metadata = {
  title: "Admin",
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
          {children}
      </body>
    </html>
  );
}
