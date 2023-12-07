"use client";
import AppSidebar from "@/components/App/Sidebar";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { workspaceAtom } from "@/store";
import { useAtom } from "jotai";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from "next";
import { useEffect } from "react";

const Workspace = ({
  workspace,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [_, setWorkspace] = useAtom(workspaceAtom);

  useEffect(() => {
    setWorkspace(workspace);
  }, [workspace]);

  return (
    <main className="h-screen bg-background">
      <section className="flex p-2">
        <AppSidebar />
        <div className="w-[85%]">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi eius
            eveniet magnam excepturi hic laboriosam quisquam, commodi ipsum eum
            voluptates asperiores voluptate! Eveniet nobis aperiam blanditiis,
            placeat quia voluptatem natus.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Workspace;
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);
  if (session) {
    const workspace = await db.workspace.findFirst({
      where: {
        userId: session?.user.id,
      },
    });
    return {
      props: { workspace },
    };
  }

  return {
    redirect: {
      redirection: "/",
    },
  };
}
