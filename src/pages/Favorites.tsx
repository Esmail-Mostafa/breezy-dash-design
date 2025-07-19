import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const navigate = useNavigate(); 

  const mockFavorites = localStorage.getItem("favorites");
  const mockCart = localStorage.getItem("cart");
  const [favorites, setFavorites] = useState(
    mockFavorites ? JSON.parse(mockFavorites) : []
  );
  const [cart, setCart] = useState(mockCart ? JSON.parse(mockCart) : []);
  const { toast } = useToast();

  const removeFromFavorites = (id: number) => {
    setFavorites(favorites.filter((item) => item._id !== id));
    toast({
      title: "Removed from favorites",
      description: "Item has been removed from your favorites list.",
    });
  };

  const addToCart = (product: any) => {
    let lastest = cart.push(product);
    setCart(lastest);
    localStorage.setItem("cart", JSON.stringify(cart));
   let latestFavorites =  favorites.filter((item: any) => item._id !== product._id);
    setFavorites(latestFavorites);
    localStorage.setItem("favorites", JSON.stringify(latestFavorites));



    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-warning text-warning" : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-dashboard-bg p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="h-8 w-8 text-primary fill-primary" />
            <h1 className="text-3xl font-bold text-foreground">My Favorites</h1>
          </div>
          <p className="text-muted-foreground">
            {favorites.length} item{favorites.length !== 1 ? "s" : ""} in your
            favorites list
          </p>
        </div>

        {favorites.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Heart className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No favorites yet
              </h3>
              <p className="text-muted-foreground text-center max-w-md">
                Start browsing and add items to your favorites list to keep
                track of products you love.
              </p>
              <Button className="mt-6" variant="default" onClick={() => navigate("/products")}>
                Browse Products
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((product) => (
              <Card
                key={product._id}
                className="bg-card border-border hover:shadow-card transition-all duration-300 group"
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {product.isNew && (
                        <Badge
                          variant="default"
                          className="bg-primary text-primary-foreground"
                        >
                          New
                        </Badge>
                      )}
                      <Badge
                        variant="secondary"
                        className="bg-secondary text-secondary-foreground"
                      >
                        {Math.round(
                          ((parseFloat(product.oldPrice) -
                            product.discountedPrice) /
                            parseFloat(product.oldPrice)) *
                            100
                        )}
                        % OFF
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-background/80 hover:bg-background"
                      onClick={() => removeFromFavorites(product._id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-foreground text-lg line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {product.brand} • {product.category}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      {renderStars(product.rating)}
                      <span className="text-sm text-muted-foreground ml-1">
                        ({product.rating})
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-foreground">
                        ${product.discountedPrice}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.oldPrice}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Stock:
                      </span>
                      <Badge
                        variant={product.stock > 10 ? "default" : "destructive"}
                      >
                        {product.stock} left
                      </Badge>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        className="flex-1"
                        onClick={() => addToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button variant="outline" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
