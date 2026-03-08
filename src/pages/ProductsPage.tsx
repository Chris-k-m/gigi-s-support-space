import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Tables } from "@/integrations/supabase/types";

const ProductsPage = () => {
  const [products, setProducts] = useState<Tables<"products">[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem, totalItems } = useCart();

  useEffect(() => {
    supabase.from("products").select("*").eq("is_active", true).order("sort_order").then(({ data, error }) => {
      if (error) toast.error(error.message);
      else setProducts(data ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 section-padding">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">Products</h1>
              <p className="mt-2 text-muted-foreground">Explore our curated selection of resources and tools.</p>
            </div>
            <Button asChild variant="outline" className="relative">
              <Link to="/cart">
                <ShoppingCart className="mr-2 h-4 w-4" />Cart
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </Button>
          </div>

          {loading ? (
            <p className="text-muted-foreground">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">No products available yet. Check back soon!</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <Card key={p.id} className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-display text-xl font-semibold text-foreground">{p.name}</h3>
                    {p.description && <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.description}</p>}
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl font-bold text-primary">${Number(p.price).toFixed(2)}</span>
                      <Button
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                        onClick={() => {
                          addItem({ id: p.id, name: p.name, price: Number(p.price), image_url: p.image_url });
                          toast.success(`${p.name} added to cart`);
                        }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
