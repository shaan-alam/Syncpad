import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronsRight,
  Folders,
  Github,
  Laptop2,
  LogOut,
  Moon,
  Settings,
  Sun,
  SunMoon,
  UserRound,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useState } from "react";

const SidebarUserSettings = () => {
  const { data } = useSession();
  const { theme, setTheme } = useTheme();

  const [workspaceDialogOpen, setWorkspaceDialogOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center justify-between rounded-md bg-secondary p-2 shadow-sm hover:bg-accent focus:outline-primary-foreground">
        <span className="flex items-center">
          <img
            src={data?.user.image as string}
            alt={data?.user.name as string}
            className="h-5 w-5 rounded-full"
          />
          &nbsp;
          <h1 className="font-semibold text-primary">
            {data?.user.name as string}
          </h1>
        </span>
        <ChevronsRight size={14} className="text-primary" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[280px] border-primary-foreground">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <UserRound size={15} className="mr-[14px] text-primary" />
            My Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings size={15} className="mr-[14px] text-primary" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setWorkspaceDialogOpen(true)}>
            <Folders size={15} className="mr-[14px]" />
            New Workspace
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <SunMoon size={15} className="mr-[14px] text-primary" />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="border-primary-foreground">
              <DropdownMenuRadioGroup
                value={theme}
                onValueChange={(theme) => setTheme(theme)}
              >
                <DropdownMenuRadioItem value="light">
                  <Sun size={15} className="mr-[14px] text-primary" />
                  Light
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">
                  <Moon size={15} className="mr-[14px] text-primary" />
                  Dark
                </DropdownMenuRadioItem>
                <DropdownMenuSeparator />
                <DropdownMenuRadioItem value="system">
                  <Laptop2 size={15} className="mr-[14px] text-primary" />
                  System
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem>
          <Github size={15} className="mr-[14px] text-primary" />
          GitHub
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
        >
          <LogOut size={15} className="mr-[14px] text-primary" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SidebarUserSettings;
