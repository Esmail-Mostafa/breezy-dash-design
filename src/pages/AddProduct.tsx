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
import MultiSelectField from "@/components/custun-compoenets/MultiSelectField";
import { addProduct, editProduct } from "@/services/loccalstorgeControl";
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
  const { data: product } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(Number(id)),
    enabled: !!id,
  });
  let editOrAdd = id ? "Edit" : "Add";

  const handleSubmit = (values: any) => {
    setIsSubmitting(true);
    if (editOrAdd === "Edit") {
      editProduct(values);
    } else {
      addProduct(values);
    }

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Product added successfully!",
        description: "Your new product has been added to the inventory.",
      });
      setIsSubmitting(false);
      navigate("/products");
    }, 1500);
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
          _id: product?._id || "",
          title: product?.title || "",
          category: product?.category || "",
          description: product?.description || "",
          price: product?.price || "",
          stock: product?.stock || "",
          brand: product?.brand || "",
          minStock: product?.minStock || "",
          isNew: product?.isNew || "",
          oldPrice: product?.oldPrice || "",
          discountedPrice: product?.discountedPrice || "",
          rating: product?.rating || "",
          size: product?.size || [],
          image: product?.image || "",
          type: product?.type || "",
        }}
        onSubmit={(values) => handleSubmit(values)}
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
                    <Label htmlFor="title">Product title</Label>
                    <Field
                      id="title"
                      name="title"
                      placeholder="Enter product title"
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
                      <option value={product?.category}>
                        {product?.category}
                      </option>
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
                    <Label htmlFor="oldPrice">Old Price ($)</Label>
                    <Field
                      name="oldPrice"
                      id="oldPrice"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      required
                      className="mt-1 p-2 block w-full rounded-md border border-input bg-background text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discountedPrice">
                      Discounted Price ($)
                    </Label>
                    <Field
                      name="discountedPrice"
                      id="discountedPrice"
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
                    <Label htmlFor="type">Type</Label>
                    <Field
                      name="type"
                      id="type"
                      placeholder="Enter type name"
                      className="mt-1 p-2 block w-full rounded-md border border-input bg-background text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Label htmlFor="size">Size</Label>
                  <div className=" flex flex-row gap-2">
                    <label className="flex items-center gap-2">
                      <Field type="checkbox" name="size" value="S" />S
                    </label>
                    <label className="flex items-center gap-2">
                      <Field type="checkbox" name="size" value="M" />M
                    </label>
                    <label className="flex items-center gap-2">
                      <Field type="checkbox" name="size" value="L" />L
                    </label>
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
                    <img
                      src={product?.image}
                      alt=""
                      className="w-40 h-40 text-center"
                    />
                    <Field
                      name="image"
                      id="image"
                      type="text"
                      className="mt-1 p-2 block w-full rounded-md border border-input bg-background text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting
                  ? `${editOrAdd}ing Product...`
                  : `${editOrAdd} Product`}
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
