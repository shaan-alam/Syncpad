import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Brush, Folder, PlusIcon, Text } from "lucide-react";
import { Button } from "../ui/button";
const DashboardTopbar = () => {
  return (
    <div className="top-bar flex w-full items-center justify-end p-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" className="shadow-none">
            <PlusIcon size={15} className="text-primary" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="shadow-none">
          <DropdownMenuItem className="flex space-x-4">
            <span className="ml-4">
              <Text size={20} className="mr-2 text-blue-800" />
            </span>
            <div>
              <h1>New Text Document</h1>
              <p className="text-muted-foreground">
                Start writing on a blank page
              </p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex space-x-4">
            <span className="ml-4">
              <Brush size={20} className="mr-2 text-pink-800" />
            </span>
            <div>
              <h1>New Whiteboard</h1>
              <p className="text-muted-foreground">
                Start drawing on a blank canvas.
              </p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex space-x-4">
            <span className="ml-4">
              <Folder size={20} className="mr-2 text-gray-800" />
            </span>
            <div>
              <h1>New Folder</h1>
              <p className="text-muted-foreground">
                Quickly organize your files
              </p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DashboardTopbar;