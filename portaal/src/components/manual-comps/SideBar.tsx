"use client"

import { Search, Settings, Home, List } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import logo from "../../assets/AK_logo.png"

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
} from "@/components/ui/sidebar"

// Hier definieer je de knoppen van Orbiz
const navItems = [
  { title:"Home", url:"/", icon:Home},
  { title:"Mijn lijsten", url:"/lijsten", icon:List},
  { title: "Leads Zoeken", url: "/search", icon: Search },
  // { title: "Mijn Leads", url: "/leads", icon: Users }, is basically hetzelfde als /lijsten
  { title: "Instellingen", url: "/settings", icon: Settings },
]

export function SideBar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 font-bold text-xl text-[#01003B]">
          <Image src={logo} alt="logo" width={32} height={32} style={{ width: "auto", height: "auto" }} />
          <span className="group-data-[collapsible=icon]:hidden">Portaal</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigatie</SidebarGroupLabel>
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
  )
}