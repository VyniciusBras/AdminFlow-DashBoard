import StatsSkeleton from "./statsSkeleton";
import ChartSkeleton from "./chartSkeleton";
import TableSkeleton from "./tableSkeleton";

export default function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            <StatsSkeleton />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartSkeleton />
                <ChartSkeleton />
            </div>

            <TableSkeleton />
        </div>
    );
}
