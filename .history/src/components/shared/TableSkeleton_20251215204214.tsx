import { Skeleton } from "@/components/ui/skeleton";

export const TableSkeleton = () => {
  return (
    <div className="space-y-3">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-md">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
      </div>

      {/* Rows Skeleton (Loop 5 times) */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between px-4 py-4 border rounded-md">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-md" /> {/* Image */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-8 w-8 rounded-full" /> {/* Action Button */}
        </div>
      ))}
    </div>
  );
};
