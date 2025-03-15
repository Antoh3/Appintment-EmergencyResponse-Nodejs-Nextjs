import "@/styles/globals.css";
import '@/styles/App.css'
import '@/styles/index.css'
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import React from "react";
import AuthProvider from "../context/AuthContext";


export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      {/*<head ><title></title></head>*/}
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased bg-primary/5",
          fontSans.variable,
        )}
      >
        <AuthProvider>
          <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
            <div className="flex flex-col gap-4 mx-0 px-0 w-full">
                {children}
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
