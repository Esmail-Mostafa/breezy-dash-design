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
  _id: 1,
  title: "Long sleeve Jacket",
  isNew: true,
  oldPrice: "200",
  price: 150,
  discountedPrice: 135,
  description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.",
  category: "women",
  type: "jacket",
  stock: 50,
  brand: "FashionTrend",
  size: ["S", "M", "L"],
  image: "https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg",
  rating: 4,
  sku: "FT-WJ-001",
  weight: "0.8",
  dimensions: {
    length: "65",
    width: "55",
    height: "3"
  },
  minStock: 10,
  supplier: "Fashion Distributors Ltd.",
  reviews: 89,
  features: [
    "Water-resistant fabric",
    "Adjustable hood",
    "Multiple pockets",
    "Breathable lining",
    "Machine washable",
    "Available in multiple sizes"
  ],
  specifications: {
    "Material": "60% Cotton, 40% Polyester",
    "Care Instructions": "Machine wash cold, tumble dry low",
    "Fit": "Regular fit",
    "Closure": "Zipper front",
    "Sleeve Type": "Long sleeve",
    "Season": "Fall/Winter",
    "Country of Origin": "Vietnam",
    "Warranty": "1 year"
  }
};

export default function ViewProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState(mockProduct.size[0]);

  const getStatusBadge = (stock: number) => {
    if (stock > 20) {
      return <Badge variant="default" className="bg-green-100 text-green-800">In Stock</Badge>;
    } else if (stock > 0) {
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Low Stock</Badge>;
    } else {
      return <Badge variant="destructive">Out of Stock</Badge>;
    }
  };

  const getDiscountPercentage = () => {
    const discount = ((Number(mockProduct.oldPrice) - mockProduct.discountedPrice) / Number(mockProduct.oldPrice)) * 100;
    return Math.round(discount);
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
      description: `${mockProduct.title} has been added to your cart.`,
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
            <h1 className="text-3xl font-bold">{mockProduct.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-muted-foreground">SKU: {mockProduct.sku}</p>
              {mockProduct.isNew && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">New</Badge>
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
              <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4">
                <img 
                  src={mockProduct.image} 
                  alt={mockProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[mockProduct.image, mockProduct.image, mockProduct.image].map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-muted rounded-lg overflow-hidden transition-all ${
                      selectedImage === index ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${mockProduct.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
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
                <CardTitle className="text-2xl">{mockProduct.title}</CardTitle>
                {getStatusBadge(mockProduct.stock)}
              </div>
              <CardDescription className="flex items-center gap-4">
                <span>{mockProduct.brand}</span>
                <Separator orientation="vertical" className="h-4" />
                <span className="capitalize">{mockProduct.category} - {mockProduct.type}</span>
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
                <span className="text-3xl font-bold">${mockProduct.discountedPrice}</span>
                <span className="text-xl text-muted-foreground line-through">${mockProduct.oldPrice}</span>
                <Badge variant="secondary">{getDiscountPercentage()}% OFF</Badge>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {mockProduct.description}
              </p>

              <div className="flex items-center gap-4 py-2">
                <span className="font-semibold">Stock:</span>
                <span>{mockProduct.stock} units available</span>
              </div>

              {/* Size Selection */}
              <div className="space-y-2">
                <span className="font-semibold">Size:</span>
                <div className="flex gap-2">
                  {mockProduct.size.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
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