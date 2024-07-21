import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LSPS Computer",
  description: "LSPS Computer",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-slate-900">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-700 to-slate-950 opacity-50"></div>

            <div className="absolute z-10 flex justify-center items-center h-full w-full">
              {children}

            </div>
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;