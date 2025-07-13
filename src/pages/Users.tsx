import { Users as UsersIcon, UserPlus, UserCheck, UserX, Package } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
//  const userList = useQ  
   
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: "$199.99",
      stock: 45,
      status: "In Stock",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Smart Watch",
      category: "Electronics",
      price: "$299.99",
      stock: 12,
      status: "Low Stock",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Running Shoes",
      category: "Sports",
      price: "$129.99",
      stock: 0,
      status: "Out of Stock",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Coffee Maker",
      category: "Home",
      price: "$89.99",
      stock: 23,
      status: "In Stock",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Laptop Stand",
      category: "Office",
      price: "$49.99",
      stock: 67,
      status: "In Stock",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      name: "Yoga Mat",
      category: "Sports",
      price: "$39.99",
      stock: 8,
      status: "Low Stock",
      image: "/placeholder.svg"
    }
  ];
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users</h1>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,842</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,234</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Users</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">608</div>
            <p className="text-xs text-muted-foreground">-3.1% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">324</div>
            <p className="text-xs text-muted-foreground">+18.7% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage and monitor user accounts</CardDescription>
        </CardHeader>
        <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.category}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{product.price}</span>
            
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Stock: {product.stock} units</span>
                <span>ID: #{product.id}</span>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  // onClick={() => Navigate(`/products/view/${product.id}`)}
                >
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>        </CardContent>
      </Card>
    </div>
  );
};

export default Users;