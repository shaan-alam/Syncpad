import { useState } from "react";
import CreateWorkspaceDialog from "../workspace/CreateWorkSpaceDialog";
import SidebarUserSettings from "./SidebarUserSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FolderGit2, Folders, Home, Search, Trash } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";

const AppSidebar = () => {
  const [workspaceDialogOpen, setWorkspaceDialogOpen] = useState(false);

  return (
    <aside className="bg-priamary h-screen w-[15%] rounded-md border border-accent">
      <div className="p-2">
        <SidebarUserSettings />
      </div>
      <div className="px-[12px] pt-12">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="h-11">
            <TabsTrigger className="w-[120px] py-2" value="account">
              <Home size={16} />
            </TabsTrigger>
            <TabsTrigger className="w-[120px] py-2" value="password">
              <Search size={16} />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <ul>
              <Link href="/app">
                <li className="flex w-full cursor-pointer items-center space-x-3 rounded-md px-[12px] py-[6px] text-primary hover:bg-primary-foreground">
                  <Folders className="mr-2" size={16} />
                  My Workspace
                </li>
              </Link>
              <Link href="shared">
                <li className="flex w-full cursor-pointer items-center space-x-3 rounded-md px-[12px] py-[6px] text-primary hover:bg-primary-foreground">
                  <FolderGit2 className="mr-2" size={16} />
                  Shared Folders
                </li>
              </Link>
              <Link href="trash">
                <li className="flex w-full cursor-pointer items-center space-x-3 rounded-md px-[12px] py-[6px] text-primary hover:bg-primary-foreground">
                  <Trash className="mr-2" size={16} />
                  Trash
                </li>
              </Link>
            </ul>
          </TabsContent>
          <TabsContent value="password">
            <Input placeholder='Search in Folder'/>
          </TabsContent>
        </Tabs>
        <Separator className="my-4" />
      </div>

      {workspaceDialogOpen && (
        <CreateWorkspaceDialog
          open={workspaceDialogOpen}
          setOpen={setWorkspaceDialogOpen}
        />
      )}
    </aside>
  );
};

export default AppSidebar;
