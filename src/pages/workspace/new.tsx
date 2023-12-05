import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { FormEventHandler, useState } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { db } from "@/server/db";

const NewWorkspace = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [workspaceName, setWorkspaceName] = useState("");

  const { isLoading, mutate } = api.workspace.createWorkspace.useMutation({
    onSuccess: (workspace) => {
      router.push(`/workspace/${workspace.id}`); // add slug here instead of id
    },
  });

  const onFormSubmit: FormEventHandler<HTMLFormElement> | undefined = (e) => {
    e.preventDefault();

    if (workspaceName.trim() === "") {
      return toast({
        title: "Error!",
        description: "Please provide a name for the Workspace",
      });
    }

    mutate({ name: workspaceName });
  };

  return (
    <main className="flex h-screen items-center justify-center">
      <Card className="w-[350px] shadow-sm dark:border-0">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Create Workspace
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Create your Workspace in one click!
          </CardDescription>
        </CardHeader>
        <form onSubmit={onFormSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="">
                  Name
                </Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button>
              Next
              {!isLoading && <ChevronRight size={15} className="ml-2" />}
              {isLoading && <Loader2 size={15} className="ml-2" />}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
};

export default NewWorkspace;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    const workspace = await db.workspace.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    return { redirect: { destination: workspace ? "/app" : "/auth" } };
  } else {
    return { redirect: { destination: "/" } };
  }

  return {
    props: { providers: [] ?? [] },
  };
}
