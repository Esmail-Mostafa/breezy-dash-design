import { 
  BarChart3, 
  Home, 
  Users, 
  ShoppingCart, 
  Settings, 
  TrendingUp,
  FileText,
  Bell,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navigationItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: BarChart3, label: "Analytics" },
  { icon: Users, label: "Users" },
  { icon: ShoppingCart, label: "Orders" },
  { icon: TrendingUp, label: "Revenue" },
  { icon: FileText, label: "Reports" },
  { icon: Bell, label: "Notifications" },
  { icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "flex flex-col h-full bg-dashboard-sidebar border-r border-border transition-all duration-300 animate-slide-in",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              DashPro
            </h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <Button
                variant={item.active ? "gradient" : "ghost"}
                className={cn(
                  "w-full justify-start h-11 transition-all duration-200",
                  isCollapsed ? "px-2" : "px-4",
                  item.active && "shadow-glow"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span className="ml-3">{item.label}</span>}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className={cn(
          "flex items-center",
          isCollapsed ? "justify-center" : "space-x-3"
        )}>
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">JD</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}