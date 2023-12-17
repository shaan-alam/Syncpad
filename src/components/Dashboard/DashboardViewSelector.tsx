import { LayoutGrid, List } from "lucide-react";

const DashboardViewSelector = () => {
  return (
    <div className="view-selector flex items-center">
      <span className="mr-2 cursor-pointer rounded-md p-2 hover:bg-accent">
        <LayoutGrid size={23} className="text-gray-500" />
      </span>
      <span className="cursor-pointer rounded-md p-2 hover:bg-accent">
        <List size={23} className="text-gray-500" />
      </span>
    </div>
  );
};

export default DashboardViewSelector;
