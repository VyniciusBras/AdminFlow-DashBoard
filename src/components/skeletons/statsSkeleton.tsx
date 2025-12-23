import Skeleton from "./skeleton";

export default function StatsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="bg-white p-4 rounded shadow space-y-2"
                >
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-16" />
                </div>
            ))}
        </div>
    );
}
