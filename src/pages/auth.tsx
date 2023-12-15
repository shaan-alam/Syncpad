import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOptions } from "@/server/auth";
import { db } from "@/server/db";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getServerSession } from "next-auth/next";
import { getProviders, signIn } from "next-auth/react";
import React from "react";

type AuthLinkProps = {
  icon: string;
  text: string;
  providerId: string | undefined;
};

const AuthButton = ({ icon, text, providerId }: AuthLinkProps) => (
  <Button
    onClick={() => signIn(providerId)}
    className="mb-2 flex w-full items-center justify-center"
    variant="outline"
  >
    <img src={icon} className="w-6" />
    &nbsp; {text}
  </Button>
);

const Auth: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ providers }) => {
  const authProviders = Object.values(providers).map((provider) => ({
    icon:
      provider.id === "github"
        ? "https://cdn3d.iconscout.com/3d/free/thumb/free-github-2950150-2447911.png"
        : "https://cdn3d.iconscout.com/3d/free/thumb/free-discord-9185430-7516828.png?f=webp",
    text: provider.id === "github" ? "Login with GitHub" : "Login with Discord",
    providerId: provider.id,
  }));

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Welcome back to SyncPad! Please sign in with Discord or Github to
            access your collaborative workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {authProviders.map((provider) => (
            <AuthButton key={provider.providerId} {...provider} />
          ))}
        </CardContent>
      </Card>
    </main>
  );
};

export default Auth;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    const workspace = await db.workspace.findFirst({
      where: {
        userId: session.user.id,
      },
    });
    console.log(workspace);
    return {
      redirect: {
        destination: "/app",
      },
    };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
