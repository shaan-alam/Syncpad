import { Skeleton } from "../ui/skeleton";

type LoadingFolderSkeletonProps = {
  count?: number;
};

const LoadingFolderSkeleton = ({ count = 1 }: LoadingFolderSkeletonProps) => {
  return (
    <>
      {new Array(count).fill(count).map((_) => (
        <Skeleton key={count} className="h-8 w-full rounded-md mb-2" />
      ))}
    </>
  );
};

export default LoadingFolderSkeleton;
