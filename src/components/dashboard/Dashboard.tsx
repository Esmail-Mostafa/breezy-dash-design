import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { StatsCard } from "./StatsCard";
import { ChartSection } from "./ChartSection";
import { DataTable } from "./DataTable";
import { QuickActions } from "./QuickActions";
import { DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react";

const statsData = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "20.1%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "8.5%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Total Orders",
    value: "1,234",
    change: "12.3%",
    changeType: "positive" as const,
    icon: ShoppingCart,
  },
  {
    title: "Growth Rate",
    value: "15.8%",
    change: "2.4%",
    changeType: "negative" as const,
    icon: TrendingUp,
  },
];

export function Dashboard() {
  return (
    <div className="min-h-screen bg-dashboard-bg">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
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

            {/* Charts Section */}
            <ChartSection />

            {/* Quick Actions */}
            <QuickActions />

            {/* Data Table */}
            <DataTable />
          </main>
        </div>
      </div>
    </div>
  );
}