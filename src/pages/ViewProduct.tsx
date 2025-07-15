import {
  ArrowLeft,
  Edit,
  Trash2,
  Package,
  Star,
  ShoppingCart,
  Heart,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/services/products-service";
import { IUser } from "@/interfaces/IUser";

export default function ViewProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isSuccess } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(Number(id)),
  });

  if (isSuccess) {
    console.log(data);
  }
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState(data?.size[0]);

  const handleDelete = () => {
    toast({
      title: "Product deleted",
      description: "The product has been removed from inventory.",
      variant: "destructive",
    });
    navigate("/products");
  };

  const handleAddToCart = (data: any) => {
    // Get existing cart items
    const items = localStorage.getItem("cart");
    let cart = items ? JSON.parse(items) : [];
    
    // Check if item is already in cart
    const existingItem = cart.find((item: any) => item._id === data._id);
    
    if (existingItem) {
      // If item exists, increment its quantity
      existingItem.quantity = Number(existingItem.quantity) + 1;
    } else {
      // If item doesn't exist, add it with quantity 1
      cart.push({
        ...data,
        quantity: 1
      });
    }
    
    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Show toast message
    toast({
      title: "Added to cart",
      description: `${data?.title} has been added to your cart.`,
    });
  };

  return (
    <>
      {isSuccess && (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate("/products")}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold">{data?.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  {data?.isNew && (
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800"
                    >
                      New
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  className={`h-4 w-4 mr-2 ${
                    isFavorite ? "fill-current text-red-500" : ""
                  }`}
                />
                {isFavorite ? "Favorited" : "Favorite"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4">
                    <img
                      src={data?.image}
                      alt={data?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[data?.image, data?.image, data?.image].map(
                      (image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`aspect-square bg-muted rounded-lg overflow-hidden transition-all ${
                            selectedImage === index ? "ring-2 ring-primary" : ""
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${data?.title} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">{data?.title}</CardTitle>
                    {/* {getStatusBadge(product?.stock)} */}
                  </div>
                  <CardContent className="flex items-center gap-4">
                    <span>{data?.brand}</span>
                    <Separator orientation="vertical" className="h-4" />
                    <span className="capitalize">
                      {data?.category} - {data?.type}
                    </span>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      <span>{data?.rating}</span>
                      {/* <span className="text-muted-foreground">
                      ({mockProduct.reviews} reviews)
                    </span> */}
                    </div>
                  </CardContent>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold">
                      ${data?.discountedPrice}
                    </span>
                    <span className="text-xl text-muted-foreground line-through">
                      ${data?.oldPrice}
                    </span>
                    {/* <Badge variant="secondary">
                    {getDiscountPercentage()}% OFF
                  </Badge> */}
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {data?.description}
                  </p>

                  <div className="flex items-center gap-4 py-2">
                    <span className="font-semibold">Stock:</span>
                    <span>{data?.stock} units available</span>
                  </div>

                  {/* Size Selection */}
                  <div className="space-y-2">
                    <span className="font-semibold">Size:</span>
                    <div className="flex gap-2">
                      {data?.size.map((size) => (
                        <Button
                          key={size}
                          variant={
                            selectedSize === size ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      className="flex-1"
                      onClick={() => handleAddToCart(data)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/products/edit/${id}`)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                {/* <CardContent>
                <ul className="space-y-2">
                  {product?.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent> */}
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
                <CardDescription>
                  Technical details and specifications
                </CardDescription>
              </CardHeader>
              {/* <CardContent>
              <div className="space-y-3">
                {Object.entries(mockProduct.specifications).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between py-2 border-b border-border/50"
                    >
                      <span className="font-medium">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  )
                )}
              </div>
            </CardContent> */}
            </Card>

            {/* Inventory Information */}
            <Card>
              <CardHeader>
                <CardTitle>Inventory Information</CardTitle>
                <CardDescription>Stock and supplier details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Current Stock
                    </label>
                    <p className="text-lg font-semibold">{data?.stock} units</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Minimum Stock
                    </label>
                    {/* <p className="text-lg font-semibold">
                    { mockProduct.minStock} units
                  </p> */}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Weight
                    </label>
                    {/* <p className="text-lg font-semibold">
                    {mockProduct.weight} kg
                  </p> */}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Supplier
                    </label>
                    {/* <p className="text-lg font-semibold">
                    {mockProduct.supplier}
                  </p> */}
                  </div>
                </div>

                <Separator />
                {/* 
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Dimensions (L × W × H)
                </label>
                <p className="text-lg font-semibold">
                  {mockProduct.dimensions.length} ×{" "}
                  {mockProduct.dimensions.width} ×{" "}
                  {mockProduct.dimensions.height} cm
                </p>
              </div> */}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
