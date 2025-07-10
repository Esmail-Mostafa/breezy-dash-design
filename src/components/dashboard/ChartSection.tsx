import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, PieChart, LineChart } from "lucide-react";

export function ChartSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Chart */}
      <Card className="bg-dashboard-widget border-border shadow-card animate-fade-in">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Revenue Overview</span>
          </CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-dashboard-bg rounded-lg flex items-center justify-center">
            <div className="text-center space-y-4">
              <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">Chart visualization would go here</p>
              <div className="flex justify-center space-x-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">$45.2K</p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">$38.1K</p>
                  <p className="text-sm text-muted-foreground">Last Month</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sales Distribution */}
      <Card className="bg-dashboard-widget border-border shadow-card animate-fade-in">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="h-5 w-5 text-primary" />
            <span>Sales Distribution</span>
          </CardTitle>
          <Button variant="outline" size="sm">
            Details
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-dashboard-bg rounded-lg flex items-center justify-center">
            <div className="text-center space-y-4">
              <PieChart className="h-16 w-16 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">Pie chart would go here</p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="w-4 h-4 bg-gradient-primary rounded mx-auto mb-1"></div>
                  <p className="text-sm font-medium">Desktop</p>
                  <p className="text-xs text-muted-foreground">65%</p>
                </div>
                <div>
                  <div className="w-4 h-4 bg-gradient-success rounded mx-auto mb-1"></div>
                  <p className="text-sm font-medium">Mobile</p>
                  <p className="text-xs text-muted-foreground">35%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}