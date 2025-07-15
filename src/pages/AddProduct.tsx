import { ArrowLeft, Upload, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { getProductById } from "@/services/products-service";
import { useQuery } from "@tanstack/react-query";
import { Formik, Field, Form } from "formik";
const categories = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports & Outdoors",
  "Beauty & Personal Care",
  "Cameras",
  "Smartphones",
  "Audio",
  "Men's Clothing",
  "Women's Clothing",
  "Accessories",
  "Furniture",
  "Outdoor Decor",
  "Camping Gear",
  "Athletic Wear",
  "Skincare",
  "Makeup",
  "Action Cameras",
  "Wireless Earbuds",
  "Sunglasses",
];

export default function AddProduct() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(Number(id)),
    enabled: !!id,
  });
  if (isSuccess) {
    console.log(product);
  }

  const handleSubmit = () => {
    // e.preventDefault();
    // setIsSubmitting(true);
    // // Simulate form submission
    // setTimeout(() => {
    //   toast({
    //     title: "Product added successfully!",
    //     description: "Your new product has been added to the inventory.",
    //   });
    //   setIsSubmitting(false);
    //   navigate("/products");
    // }, 1500);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/products")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{id ? "Edit" : "Add"} Product</h1>
          <p className="text-muted-foreground">
            {id ? "Edit" : "Create"} a new product for your inventory
          </p>
        </div>
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          name: product?.title || "",
          category: product?.category || "",
          description: product?.description || "",
          price: product?.price || "",
          stock: product?.stock || "",
          sku: product?.sku || "",
          brand: product?.brand || "",
          weight: product?.weight || "",
          length: product?.length || "",
          width: product?.width || "",
          height: product?.height || "",
          minStock: product?.minStock || "",
          supplier: product?.supplier || "",
        }}
        onSubmit={handleSubmit}
      >
        <Form className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
                <CardDescription>
                  Enter the basic details of your product
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Field
                      id="name"
                      name="name"
                      placeholder="Enter product name"
                      required
                      className="mt-1 p-2 block w-full rounded-md border border-input bg-background text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="category"
                      className="block text-sm font-medium text-muted-foreground"
                    >
                      Category
                    </Label>
                    <Field
                      name="category"
                      as="select"
                      className="mt-1 p-2 block w-full rounded-md border border-input bg-background text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Field
                    name="description"
                    id="description"
                    as="textarea"
                    className="mt-1 p-2 block w-full rounded-md border border-input bg-background text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter product description"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Field
                      name="price"
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      required
                      className="mt-1 p-2 block w-full rounded-md border border-input bg-background text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Field
                      name="stock"
                      id="stock"
                      type="number"
                      placeholder="0"
                      required
                      className="mt-1 p-2 block w-full rounded-md border border-input bg-background text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU (Optional)</Label>
                    <Field
                      name="sku"
                      id="sku"
                      placeholder="SKU-001"
                      className="mt-1 p-2 block w-full rounded-md border border-input bg-background text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Details</CardTitle>
                <CardDescription>
                  Optional product specifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Field
                      name="brand"
                      id="brand"
                      placeholder="Enter brand name"
                      className="mt-1 p-2 block w-full rounded-md border border-input bg-background text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Field
                      name="weight"
                      id="weight"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="mt-1 p-2 block w-full rounded-md border border-input bg-background text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="length">Length (cm)</Label>
                    <Field
                      name="length"
                      id="length"
                      type="number"
                      placeholder="0"
                      className="mt-1 p-2 block w-full rounded-md border border-input bg-background text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="width">Width (cm)</Label>
                    <Field
                      name="width"
                      id="width"
                      type="number"
                      placeholder="0"
                      className="mt-1 p-2 block w-full rounded-md border border-input bg-background text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Field
                      name="height"
                      id="height"
                      type="number"
                      placeholder="0"
                      className="mt-1 p-2 block w-full rounded-md border border-input bg-background text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Image</CardTitle>
                <CardDescription>
                  Upload an image for your product
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                    <Package className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop an image here, or click to browse
                    </p>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inventory Settings</CardTitle>
                <CardDescription>Configure stock management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="minStock">Minimum Stock Alert</Label>
                  <Field
                    name="minStock"
                    id="minStock"
                    type="number"
                    placeholder="10"
                    className="mt-1 p-2 block w-full rounded-md border border-input bg-background text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Field
                    name="supplier"
                    id="supplier"
                    placeholder="Supplier name"
                    className="mt-1 p-2 block w-full rounded-md border border-input bg-background text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Adding Product..." : "Add Product"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => navigate("/products")}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
