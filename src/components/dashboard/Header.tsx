import {
  Search,
  Bell,
  Settings,
  User,
  Heart,
  ShoppingBag,
  LogOutIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login", { replace: true });
  };
  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between animate-fade-in">
      {/* Search */}
      <div className="flex items-center space-x-4 flex-1 max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search anything..."
            className="pl-10 bg-dashboard-widget border-border"
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center space-x-4">
        {/* Favorites */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/favorites")}
        >
          <Heart className="h-5 w-5" />
        </Button>

        {/* Cart */}
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => navigate("/cart")}
        >
          <ShoppingBag className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-xs">
            3
          </Badge>
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-gradient-warning text-xs">
            3
          </Badge>
        </Button>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Settings */}
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>

        {/* User menu */}
        <Button variant="ghost" className="space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          <span className="hidden md:block">John Doe</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOutIcon className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
