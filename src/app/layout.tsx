import "~/styles/globals.css";

import { Poppins } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/theme-provider";
import { ViewTransitions } from "next-view-transitions";
import { cn, constructMetadata } from "~/lib/utils";
import { SessionProvider } from "next-auth/react";
import { auth } from "auth";
import { Toaster } from "~/components/ui/toaster";

export const metadata = constructMetadata();

const poppins = Poppins({
  weight: "500",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <ViewTransitions>
        <html lang="en" className={cn("h-full")}>
          <body
            className={cn(
              "relative h-full font-sans antialiased",
              poppins.className,
            )}
          >
            <TRPCReactProvider>
              <ThemeProvider attribute="class" disableTransitionOnChange>
                {children}
              </ThemeProvider>
            </TRPCReactProvider>
            <Toaster />
          </body>
        </html>
      </ViewTransitions>
    </SessionProvider>
  );
}
