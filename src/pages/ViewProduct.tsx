import { ArrowLeft, Edit, Trash2, Package, Star, ShoppingCart, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Mock product data - in a real app, this would come from an API
const mockProduct = {
  id: 1,
  name: "Wireless Headphones",
  category: "Electronics",
  price: "$199.99",
  originalPrice: "$249.99",
  stock: 45,
  status: "In Stock",
  description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and professionals who demand the best audio experience.",
  brand: "AudioTech",
  sku: "WH-001",
  weight: "0.25",
  dimensions: {
    length: "18",
    width: "15",
    height: "8"
  },
  minStock: 10,
  supplier: "TechSupply Co.",
  rating: 4.5,
  reviews: 127,
  images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  features: [
    "Active Noise Cancellation",
    "30-hour Battery Life",
    "Bluetooth 5.0",
    "Quick Charge (5 min = 2 hours)",
    "Comfortable Over-ear Design",
    "Built-in Microphone"
  ],
  specifications: {
    "Driver Size": "40mm",
    "Frequency Response": "20Hz - 20kHz",
    "Impedance": "32 Ohm",
    "Sensitivity": "105 dB",
    "Connectivity": "Bluetooth 5.0, 3.5mm Jack",
    "Battery": "30 hours playback",
    "Charging": "USB-C",
    "Weight": "250g"
  }
};

export default function ViewProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

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

  const handleDelete = () => {
    toast({
      title: "Product deleted",
      description: "The product has been removed from inventory.",
      variant: "destructive",
    });
    navigate("/products");
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${mockProduct.name} has been added to your cart.`,
    });
  };

  return (
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
            <h1 className="text-3xl font-bold">{mockProduct.name}</h1>
            <p className="text-muted-foreground">SKU: {mockProduct.sku}</p>
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
            <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
            {isFavorite ? 'Favorited' : 'Favorite'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-4">
                <Package className="h-24 w-24 text-muted-foreground" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {mockProduct.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-muted rounded-lg flex items-center justify-center transition-all ${
                      selectedImage === index ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <Package className="h-8 w-8 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{mockProduct.name}</CardTitle>
                {getStatusBadge(mockProduct.status)}
              </div>
              <CardDescription className="flex items-center gap-4">
                <span>{mockProduct.brand}</span>
                <Separator orientation="vertical" className="h-4" />
                <span>{mockProduct.category}</span>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current text-yellow-500" />
                  <span>{mockProduct.rating}</span>
                  <span className="text-muted-foreground">({mockProduct.reviews} reviews)</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">{mockProduct.price}</span>
                <span className="text-xl text-muted-foreground line-through">{mockProduct.originalPrice}</span>
                <Badge variant="secondary">20% OFF</Badge>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {mockProduct.description}
              </p>

              <div className="flex items-center gap-4 py-2">
                <span className="font-semibold">Stock:</span>
                <span>{mockProduct.stock} units available</span>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" onClick={() => navigate(`/products/edit/${id}`)}>
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
            <CardContent>
              <ul className="space-y-2">
                {mockProduct.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Specifications */}
        <Card>
          <CardHeader>
            <CardTitle>Specifications</CardTitle>
            <CardDescription>Technical details and specifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(mockProduct.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-border/50">
                  <span className="font-medium">{key}</span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
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
                <label className="text-sm font-medium text-muted-foreground">Current Stock</label>
                <p className="text-lg font-semibold">{mockProduct.stock} units</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Minimum Stock</label>
                <p className="text-lg font-semibold">{mockProduct.minStock} units</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Weight</label>
                <p className="text-lg font-semibold">{mockProduct.weight} kg</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Supplier</label>
                <p className="text-lg font-semibold">{mockProduct.supplier}</p>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Dimensions (L × W × H)</label>
              <p className="text-lg font-semibold">
                {mockProduct.dimensions.length} × {mockProduct.dimensions.width} × {mockProduct.dimensions.height} cm
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}