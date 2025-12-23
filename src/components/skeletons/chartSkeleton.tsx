import Skeleton from "./skeleton";

export default function ChartSkeleton() {
    return (
        <div className="bg-white p-4 rounded shadow">
            <Skeleton className="h-5 w-48 mb-4" />
            <Skeleton className="h-300px w-full" />
        </div>
    );
}
