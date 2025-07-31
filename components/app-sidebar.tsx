"use client"

import { User, History, Play } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Profile",
    icon: User,
    url: "#profile",
  },
  {
    title: "Interview History",
    icon: History,
    url: "#history",
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-green-100">
      <SidebarHeader className="border-b border-green-100 p-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600">
            <Play className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-green-800">InterviewAI</span>
            <span className="text-sm text-green-600">Practice Platform</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-green-700 font-medium">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-green-50 hover:text-green-700 data-[active=true]:bg-green-100 data-[active=true]:text-green-800"
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-green-100 p-4">
        <div className="text-center text-sm text-green-600">Ready to ace your next interview?</div>
      </SidebarFooter>
    </Sidebar>
  )
}
