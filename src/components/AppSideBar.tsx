import { Sidebar, SidebarHeader } from "./ui/sidebar";

export const AppSideBar = () => {
  return (
    <Sidebar variant="sidebar" collapsible="icon" className="bg-gray-900">
      <SidebarHeader>
        <h2>Header</h2>
      </SidebarHeader>
    </Sidebar>
  );
};
