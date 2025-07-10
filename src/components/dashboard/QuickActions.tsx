import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Download, Upload, Users, FileText, Settings } from "lucide-react";

const actions = [
  {
    title: "Add User",
    description: "Create new user account",
    icon: Plus,
    variant: "gradient" as const,
  },
  {
    title: "Export Data",
    description: "Download reports",
    icon: Download,
    variant: "success" as const,
  },
  {
    title: "Import Data",
    description: "Upload CSV files",
    icon: Upload,
    variant: "info" as const,
  },
  {
    title: "Manage Team",
    description: "View team members",
    icon: Users,
    variant: "default" as const,
  },
  {
    title: "Generate Report",
    description: "Create new report",
    icon: FileText,
    variant: "warning" as const,
  },
  {
    title: "System Settings",
    description: "Configure dashboard",
    icon: Settings,
    variant: "secondary" as const,
  },
];

export function QuickActions() {
  return (
    <Card className="bg-dashboard-widget border-border shadow-card animate-fade-in">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className="h-auto p-4 flex flex-col items-start space-y-2 transition-all duration-200 hover:scale-105"
            >
              <div className="flex items-center space-x-2 w-full">
                <action.icon className="h-5 w-5" />
                <span className="font-medium">{action.title}</span>
              </div>
              <p className="text-xs opacity-80 text-left">{action.description}</p>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}