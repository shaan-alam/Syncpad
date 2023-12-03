import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  const { data } = useSession();

  return (
    <nav className="w-full border-b p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="logo">
          <h1 className="text-xl font-bold text-primary">SyncPad</h1>
        </div>
        {!data?.user && (
          <Link href="/auth">
            <Button>Login</Button>
          </Link>
        )}
        {data?.user && <Button onClick={() => signOut()}>Open App</Button>}
      </div>
    </nav>
  );
};

export default Navbar;
