import type { Metadata } from "next";
import "@/styles/index.css";
import Navbar from "@/components/nav";

/*---> Made metadata dynamic with a title template for better SEO <---*/
export const metadata: Metadata = {
  title: {
    template: "%s || E-commerce",
    default: "Admin"
  },
  description: "Access your admin panel to manage and monitor system activities efficiently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
    <div className="flex">
      <Navbar />
      {children}
    </div>
  </>
}
