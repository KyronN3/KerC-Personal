import * as React from "react"
import {
  Plus,
  Edit,
  HistoryIcon,
  ShoppingCart,
  Archive,
  CircleUser
} from "lucide-react"
import { Link } from "react-router-dom"
import { auth } from "../config/firebase"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"


const dataAdmin = {
  projects: [
    {
      name: "Create Task",
      url: "/createtask",
      icon: Plus,
    },
    {
      name: "Edit Price",
      url: "/editprice",
      icon: Edit,
    },
    {
      name: "Archive File",
      url: "/archivefiles",
      icon: Archive
    }
  ],
}

const dataCustomer = {
  projects: [
    {
      name: "My Order/s",
      url: "/order",
      icon: ShoppingCart,
    },
    {
      name: "Order History",
      url: "/orderhistory",
      icon: HistoryIcon,
    },
  ]
}

export function AppSidebar() {
  return (
    <>
      <Sidebar collapsible="icon" className="relative h-full">
        <SidebarContent className="bg-[#e3f2fd] justify-center" >
          <NavProjects projects={auth?.currentUser?.email.includes('@admin.139907.print.com') ? dataAdmin.projects : dataCustomer.projects} />
        </SidebarContent>
      </Sidebar>
    </>
  );
}
