import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Heart,
  CreditCard,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Cart() {
  const mockCartItems = localStorage.getItem("cart");
  const [cartItems, setCartItems] = useState(
    mockCartItems ? JSON.parse(mockCartItems) : []
  );
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const { toast } = useToast();

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    const updatedCart = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);

    setCartItems(updatedCart);
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const moveToFavorites = (id: number) => {
    const updatedCart = cartItems.filter((item) => {
      if (item._id === id) {
        localStorage.setItem("favorites", JSON.stringify(item));
      } else {
        return item;
      }
    });

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast({
      title: "Moved to favorites",
      description: "Item has been moved to your favorites list.",
    });
    localStorage.setItem("favorites", JSON.stringify(updatedCart));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setDiscount(10);
      toast({
        title: "Promo code applied!",
        description: "You saved 10% on your order.",
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please check your promo code and try again.",
        variant: "destructive",
      });
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );
  const promoDiscount = (subtotal * discount) / 100;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = (subtotal - promoDiscount) * 0.08;
  const total = subtotal - promoDiscount + shipping + tax;

  return (
    <div className="min-h-screen bg-dashboard-bg p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">
              Shopping Cart
            </h1>
          </div>
          <p className="text-muted-foreground">
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your
            cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Your cart is empty
              </h3>
              <p className="text-muted-foreground text-center max-w-md">
                Start shopping and add items to your cart to continue with your
                purchase.
              </p>
              <Button className="mt-6" variant="default">
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Cart Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={item._id}>
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />

                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {item.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {item.brand} • Size: {item.size[0]}{" "}
                                {item.size[1]} {item.size[2]} {item.size[3]}{" "}
                                {item.size[4]} {item.size[5]} {item.size[6]}{" "}
                                {item.size[7]} {item.size[8]} {item.size[9]}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-foreground">
                                ${item.discountedPrice}
                              </p>
                              <p className="text-sm text-muted-foreground line-through">
                                ${item.price}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(item._id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(item._id, item.quantity + 1)
                                }
                                disabled={item.quantity >= item.stock}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => moveToFavorites(item._id)}
                              >
                                <Heart className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFromCart(item._id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold text-foreground">
                              Subtotal: $
                              {(item.discountedPrice * item.quantity).toFixed(
                                2
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      {index < cartItems.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="bg-card border-border sticky top-6">
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Promo Code */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Promo Code
                    </label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1"
                      />
                      <Button variant="outline" onClick={applyPromoCode}>
                        Apply
                      </Button>
                    </div>
                    {discount > 0 && (
                      <p className="text-sm text-success">
                        Promo code applied! You saved {discount}%
                      </p>
                    )}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-foreground">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-success">
                        <span>Promo Discount ({discount}%):</span>
                        <span>-${promoDiscount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-foreground">
                      <span>Shipping:</span>
                      <span>
                        {shipping === 0 ? (
                          <Badge
                            variant="default"
                            className="bg-success text-success"
                          >
                            Free
                          </Badge>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-foreground">
                      <span>Tax:</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold text-foreground">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {subtotal < 100 && (
                    <p className="text-sm text-muted-foreground">
                      Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  )}

                  <Button className="w-full" size="lg">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceed to Checkout
                  </Button>

                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
