import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import DashboardTopbar from "./DashboardTopbar";
import DashboardViewSelector from "./DashboardViewSelector";

const Dashboard = () => {
  const { data } = useSession();
  return (
    <section>
      <DashboardTopbar />

      <main className="px-24">
        <div className="mb-12 flex items-center justify-between">
          <div className="avatar flex items-center">
            <span className="h-[50px] w-[50px] rounded-full">
              <img
                src={data?.user.image as string}
                alt={data?.user.name as string}
                className="mr-4 h-[50px] w-[50px] rounded-full object-contain"
              />
            </span>
            <h1 className="ml-4 text-2xl font-semibold text-primary">
              {data?.user.name}'s Workspace
            </h1>
          </div>
          <DashboardViewSelector />
        </div>

        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="flex w-full justify-start rounded-none border-b border-b-secondary bg-transparent pb-0 pl-0">
            <TabsTrigger
              value="documents"
              className="rounded-none text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              Documents
            </TabsTrigger>
            <TabsTrigger
              value="shared-documents"
              className="rounded-none text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              Shared Documents
            </TabsTrigger>
            <TabsTrigger
              value="trash"
              className="rounded-none text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              Trash
            </TabsTrigger>
          </TabsList>
          <TabsContent value="documents">
            Your documents will be presented here.
          </TabsContent>
          <TabsContent value="shared-documents">
            Your shared documents will be presented here.
          </TabsContent>
          <TabsContent value="trash">
            Your deleted documents will be presented here.
          </TabsContent>
        </Tabs>
      </main>
    </section>
  );
};

export default Dashboard;
