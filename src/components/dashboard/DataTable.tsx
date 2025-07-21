import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {

  BookmarkPlus,
  HeartCrack,
  Heart,
  PackageX,
} from "lucide-react";
import { useReducer, useEffect } from "react";
import { tableReducer } from "@/hooks/useActions";

export interface TableData {
  id: string;
  customer: string;
  email: string;
  status: "active" | "pending" | "inactive";
  amount: string;
  date: string;
  active: boolean;
}

const mockData: TableData[] = [
  {
    id: "#12345",
    customer: "John Smith",
    email: "john@example.com",
    status: "active",
    amount: "$1,234",
    date: "2024-01-15",
    active: false,
  },
  {
    id: "#12346",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    status: "pending",
    amount: "$856",
    date: "2024-01-14",
    active: false,
  },
  {
    id: "#12347",
    customer: "Mike Davis",
    email: "mike@example.com",
    status: "active",
    amount: "$2,100",
    date: "2024-01-13",
    active: false,
  },
  {
    id: "#12348",
    customer: "Emily Brown",
    email: "emily@example.com",
    status: "inactive",
    amount: "$445",
    date: "2024-01-12",
    active: false,
  },
  {
    id: "#12349",
    customer: "David Wilson",
    email: "david@example.com",
    status: "active",
    amount: "$1,789",
    date: "2024-01-11",
    active: false,
  },
];

export function DataTable() {
  // Initialize with empty array and let the reducer handle the initial state
  
  const [state, dispatch] = useReducer(tableReducer, mockData);
  



  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-success/10 text-success border-success/20">
            Active
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-warning/10 text-warning border-warning/20">
            Pending
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20">
            Inactive
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card className="bg-dashboard-widget border-border shadow-card animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Order ID
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Customer
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Amount
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Date
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {state.map((row, index) => (
                <tr
                  key={row.id}
                  className="border-b border-border/50 hover:bg-dashboard-bg/50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <span className="font-medium text-primary">{row.id}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{row.customer}</p>
                      <p className="text-sm text-muted-foreground">
                        {row.email}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4">{getStatusBadge(row.status)}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold">{row.amount}</span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {row.date}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          dispatch({
                            type: "AddToFavorites",
                            payload: row,
                          })
                        }
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            row.active ? "text-red-500" : "text-gray-500 "
                          }`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          dispatch({
                            type: "ADDToCart",
                            payload: row,
                          })
                        }
                      >
                        <BookmarkPlus
                          className={`h-4 w-4 ${
                            row.active ? "text-red-500" : "text-gray-500"
                          }`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() =>
                          dispatch({
                            type: "RemoveFromFavorites",
                            id: row.id,
                          })
                        }
                      >
                        <HeartCrack
                          className={`h-4 w-4 ${
                            row.active ? "text-red-500" : "text-gray-500"
                          }`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() =>
                          dispatch({
                            type: "RemoveFromCart",
                            id: row.id,
                          })
                        }
                      >
                        <PackageX
                          className={`h-4 w-4 ${
                            row.active ? "text-red-500" : "text-gray-500"
                          }`}
                        />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
