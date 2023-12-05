import AppSidebar from "@/components/App/Sidebar";

const App = () => {
  return (
    <main className="h-screen">
      <section className="flex">
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

export default App;
