import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  const { data } = useSession();

  return (
    <nav className="w-full bg-black py-4">
      <div className="mx-auto flex items-center justify-between px-24">
        <div className="logo">
          <Link href="/">
            <h1 className="text-xl font-bold text-primary text-white">
              SyncPad
            </h1>
          </Link>
        </div>
        {!data?.user && (
          <Link href="/auth">
            <Button>Login</Button>
          </Link>
        )}
        {data?.user && (
          <Link href="/app">
            <Button>Open App</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
