import * as React from "react"
import {
  Map,
  Plus,
  Edit,
  ShoppingCart,
  Archive,
  CircleUser
} from "lucide-react"
import { Link } from "react-router-dom"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"

const data = {
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
    },
    {
      name: "Manage Account",
      url: "/manageaccount",
      icon: CircleUser
    }
  ],
}

export function AppSidebar() {
  return (
    <>
      <Sidebar collapsible="icon" className="relative h-full">
        <SidebarContent className="bg-[#0077b6] justify-center" >
          <NavProjects projects={data.projects} />
        </SidebarContent>
      </Sidebar>
    </>
  );
}
