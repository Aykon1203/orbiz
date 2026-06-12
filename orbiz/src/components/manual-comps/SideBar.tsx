"use client";

import {
  // Settings,
  Home,
  List, 
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/orbiz-logo.png";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Hier definieer je de knoppen van Orbiz
const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "My Lists", url: "/lists", icon: List },
  // { title: "Settings", url: "/settings", icon: Settings }, not sure what to add here but temp letting it sit here
];

export function SideBar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Image
            src={logo}
            alt="logo"
            width={32}
            height={32}
            style={{ width: "auto", height: "auto" }}
          />
          <span className="group-data-[collapsible=icon]:hidden">Orbiz</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <hr className="mb-2"></hr>
          {/* <SidebarGroupLabel className="text-sm">Navigation</SidebarGroupLabel>  not useful */}
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
