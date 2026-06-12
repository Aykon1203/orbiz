import type { Metadata } from "next";
import "./globals.css";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SideBar } from "../components/manual-comps/SideBar";
import { TooltipProvider } from "@/components/ui/tooltip";
import SearchBar from "../components/manual-comps/SearchBar";
import { ThemeProvider } from "@/components/manual-comps/ThemeProvider";

export const metadata: Metadata = {
  title: "Orbiz | AK WebSolutions",
  description: "Lead generation tool by AK WebSolutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
        <TooltipProvider delayDuration={0}>
          <SidebarProvider>
            <SideBar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger />
                <div className="h-4 w-px bg-slate-200  mx-2" />
                <SearchBar/>
              </header>
              <div className="p-6">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
