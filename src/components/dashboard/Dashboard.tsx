import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { StatsCard } from "./StatsCard";
import { DataTable } from "./DataTable";
import { QuickActions } from "./QuickActions";
import { DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react";
import { useStatsStatistic } from "@/hooks/use-status";
import {  GridLoader } from "react-spinners";
import {
  getOrders,
  getProducts,
  getReviews,
  getUsers,
} from "@/services/products-service";
const statsData = [
  {
    title: "Total Products ",
    value: "",
    change: "20.1%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "total Users",
    value: "",
    change: "8.5%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Total Orders",
    value: "",
    change: "12.3%",
    changeType: "positive" as const,
    icon: ShoppingCart,
  },
  {
    title: "Review Rate",
    value: "",
    change: "2.4%",
    changeType: "negative" as const,
    icon: TrendingUp,
  },
];

export function Dashboard() {
  const { isLoading, isError, isSuccess, data } = useStatsStatistic({
    queriesArray: [
      {
        queryKey: ["getProducts"],
        queryFn: () => getProducts(1,10),
      },
      {
        queryKey: ["getUsers"],
        queryFn: getUsers,
      },
      {
        queryKey: ["getOrders"],
        queryFn: getOrders,
      },
      {
        queryKey: ["getReviews"],
        queryFn: getReviews,
      },
    ],
  });

  if (isSuccess) {
    statsData[0].value = data.totalProducts;
    statsData[1].value = data.totalUsers;
    statsData[2].value = data.totalOrders;
    statsData[3].value = data.totalReviews;
  }

  return (
    <div className="min-h-screen bg-dashboard-bg">
      {isLoading && isError ? (
        <div className="flex justify-center items-center h-screen m-auto">
          <GridLoader color="#000" size={20} />
        </div>
      ) : (
        <div className="flex">
          {/* Sidebar */}
          <Sidebar name="Dashboard" />

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <Header />

            {/* Dashboard Content */}
            <main className="flex-1 p-6 space-y-6 overflow-auto">
              {/* Welcome Section */}
              <div className="space-y-2 animate-fade-in">
                <h1 className="text-3xl font-bold">Welcome back, John!</h1>
                <p className="text-muted-foreground">
                  Here's what's happening with your business today.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsData.map((stat, index) => (
                  <StatsCard key={index} {...stat} />
                ))}
              </div>

              {/* Quick Actions */}
              <QuickActions />

              {/* Data Table */}
              <DataTable />
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
