import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { workspaceAtom } from "@/store";
import { api } from "@/utils/api";
import { useAtom } from "jotai";
import {
  Folder,
  FolderGit2,
  Folders,
  Home,
  Plus,
  Search,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CreateFolderDialog from "../Folder/CreateFolderDialog";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import CreateWorkspaceDialog from "../workspace/CreateWorkSpaceDialog";
import SidebarUserSettings from "./SidebarUserSettings";
import LoadingFolderSkeleton from "../Folder/LoadingFolderSkeleton";

const AppSidebar = () => {
  const [workspaceDialogOpen, setWorkspaceDialogOpen] = useState(false);
  const [workspace] = useAtom(workspaceAtom);

  const { isLoading, data } = api.folder.retreiveFolders.useQuery({
    workspaceId: workspace?.id,
  });

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

            <Separator className="my-4" />
            <div>
              <div className="flex items-center justify-between px-3">
                <span className="font-semibold">My Folders</span>
                <div className="flex items-center space-x-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground text-sm text-muted-foreground">
                    3
                  </span>
                  <CreateFolderDialog>
                    <span className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-primary-foreground text-muted-foreground hover:text-primary">
                      <Plus size={14} />
                    </span>
                  </CreateFolderDialog>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="password">
            <Input placeholder="Search in Folder" />
          </TabsContent>
        </Tabs>
        <Separator className="my-4" />
        <ul id="my-folders">
          {isLoading && <LoadingFolderSkeleton count={4} />}
          {data &&
            data.map((folder) => (
              <li className="flex w-full cursor-pointer items-center space-x-3 rounded-md px-[12px] py-[6px] text-primary hover:bg-primary-foreground">
                <Folder className="mr-2" size={16} />
                {folder.name}
              </li>
            ))}
        </ul>
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
