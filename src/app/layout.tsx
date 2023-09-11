import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/provider";
import AppBar from "@/components/appbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.JS",
  description: "Authenticating with NextAuth.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
          crossOrigin="anonymous"
        ></link>
      </head>
      <body>
        <Providers>
          <AppBar />
          <div className="container">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
