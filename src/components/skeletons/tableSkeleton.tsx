import Skeleton from "./skeleton";

export default function TableSkeleton() {
    return (
        <div className="bg-white p-4 rounded shadow">
            <Skeleton className="h-5 w-40 mb-4" />

            <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-4">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                ))}
            </div>
        </div>
    );
}
