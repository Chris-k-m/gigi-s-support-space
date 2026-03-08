import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CartPage = () => {
  const { items, removeItem, updateQuantity, totalAmount, totalItems } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 section-padding">
        <div className="container mx-auto max-w-3xl">
          <h1 className="font-display text-3xl font-bold text-foreground mb-6">Shopping Cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Your cart is empty.</p>
              <Button asChild><Link to="/products">Browse Products</Link></Button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="flex items-center gap-4 p-4">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-muted" />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus size={14} />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus size={14} />
                        </Button>
                      </div>
                      <p className="font-semibold text-foreground w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                      <Button size="icon" variant="ghost" className="text-destructive" onClick={() => removeItem(item.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-6">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
                    <p className="text-2xl font-bold text-foreground">Total: ${totalAmount.toFixed(2)}</p>
                  </div>
                  <Button size="lg" asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
