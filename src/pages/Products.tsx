import { Package, Search, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

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

export default function Products() {
  const navigate = useNavigate();
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return <Badge variant="default" className="bg-green-100 text-green-800">In Stock</Badge>;
      case "Low Stock":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Low Stock</Badge>;
      case "Out of Stock":
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Button 
          className="flex items-center gap-2"
          onClick={() => navigate("/products/add")}
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-10" />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

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
                {getStatusBadge(product.status)}
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
                  onClick={() => navigate(`/products/view/${product.id}`)}
                >
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}