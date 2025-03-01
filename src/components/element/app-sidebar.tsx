"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Plus,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/element/nav-main";
import { NavExplore } from "@/components/element/nav-explore";
import { NavUser } from "@/components/element/nav-user";
import { TeamSwitcher } from "@/components/element/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { GoHome } from "react-icons/go";

// This is sample data.
const data: any = {
  user: {
    name: "Qode",
    email: "Qode@Qode.tech",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "New",
      url: "/nest/new",
      icon: Plus,
    },
    {
      title: "Home",
      url: "/home",
      icon: GoHome,
    },
    {
      title: "Nests",
      url: "/nest",
      icon: BookOpen,
    },
    // {
    //   title: "Settings",
    //   url: "",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  // explore: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>{/* <NavUser user={data.user} /> */}</SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavExplore explore={data.explore} /> */}
      </SidebarContent>
      <SidebarFooter>Footer</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
