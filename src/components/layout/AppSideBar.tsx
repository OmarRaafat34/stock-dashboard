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
} from "../ui/sidebar";
import { CircleDollarSign } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const AppSideBar = () => {
  const items = [
    {
      title: "Portfolio",
      list: [
        {
          title: "Stocks",
          url: "/stocks",
          icon: CircleDollarSign,
        },
      ],
    },
  ];
  return (
    <Sidebar variant="inset" collapsible="offcanvas" className="bg-[#f2f4f6]">
      <SidebarHeader className="flex items-center ">
        <h2>Dashboard</h2>
      </SidebarHeader>
      <SidebarContent>
        {items.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.list.map((subItem) => (
                  <SidebarMenuItem key={subItem.title}>
                    <SidebarMenuButton asChild>
                      <Link to={subItem.url}>
                        <subItem.icon />
                        <p>{subItem.title}</p>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};
