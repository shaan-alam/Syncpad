import Navbar from "@/components/App/Navbar";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";

export default function Home() {

  return (
    <>
      <Navbar />
      <section className="hero-section flex h-screen items-center overflow-hidden bg-black">
        <div className="flex items-center justify-between">
          <div className="w-1/2 pl-24">
            <h1 className="text-4xl font-bold text-white">SyncPad</h1>
            <h3 className="mt-2 text-xl font-semibold text-muted">
              Your Collaborative Canvas for Seamless Ideas.
            </h3>
            <p className="mt-8 w-3/4 font-normal text-gray-300">
              Discover the future of teamwork with SyncPad - your go-to platform
              for real-time whiteboarding and document creation. Elevate
              collaboration, spark creativity, and boost productivity
              effortlessly. Join us and redefine the way you work together!
            </p>
            <Button className="mt-8">Get Started</Button>
          </div>
          <div className="relative w-1/2 bg-red-500">
            <span className="absolute h-[700px] w-[700px] rounded-full bg-blue-900 bg-opacity-30 blur-[100px]"></span>
            <span className="absolute right-0 h-[700px] w-[700px] rounded-full bg-blue-900 bg-opacity-30 blur-[100px]"></span>
            <img
              src="https://zettel-eight.vercel.app/demo-dark.png"
              className="absolute right-[-8rem] w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
