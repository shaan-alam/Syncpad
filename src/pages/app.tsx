import { signOut } from "next-auth/react";

const App = () => {
  return (
    <main>
      <div onClick={() => signOut({ redirect: true, callbackUrl: "/" })}>
        logout
      </div>
    </main>
  );
};

export default App;
