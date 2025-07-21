import { Package, Search, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { getProducts } from "@/services/products-service";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CustomPagination from "@/components/custun-compoenets/custom-pagination";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function Products() {
  const navigate = useNavigate();

  const [page, setPage] = React.useState(1);
  const { data } = useQuery({
    queryKey: ["getProducts", page],
    queryFn: () => getProducts(page, 10),
  });
  const totalPages = data?.totalPages || 1;

  return (
    <>
      <div className="p-6 space-y-6 flex gap-4">
        <div>
          <Sidebar name="0" />
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Products</h1>
              <p className="text-muted-foreground">
                Manage your product inventory
              </p>
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
            {data?.data.map((product) => (
              <Card
                key={product._id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {product.title}
                        </CardTitle>
                        <CardDescription>{product.category}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">${product.price}</span>
                    {/* {getStatusBadge(product.status)} */}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Stock: {product.stock} units</span>
                    <span>ID: #{product._id}</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => navigate(`/products/edit/${product._id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => navigate(`/products/view/${product._id}`)}
                    >
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div>
            <CustomPagination
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </>
  );
}
