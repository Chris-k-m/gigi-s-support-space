import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

const AdminProducts = () => {
  const [products, setProducts] = useState<Tables<"products">[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*").order("sort_order");
    if (error) toast.error(error.message);
    else setProducts(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const toggleActive = async (id: string, isActive: boolean) => {
    const { error } = await supabase.from("products").update({ is_active: !isActive }).eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Product updated"); fetchProducts(); }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Product deleted"); fetchProducts(); }
  };

  if (loading) return <p className="text-muted-foreground">Loading products...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Products</h2>
        <Button asChild><Link to="/admin/products/new"><Plus className="mr-2 h-4 w-4" />Add Product</Link></Button>
      </div>
      {products.length === 0 ? (
        <p className="text-muted-foreground">No products yet. Add your first product!</p>
      ) : (
        <div className="grid gap-4">
          {products.map((p) => (
            <Card key={p.id}>
              <CardContent className="flex items-center gap-4 p-4">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.name} className="w-16 h-16 rounded-lg object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-xs">No img</div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{p.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{p.description}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="secondary">${Number(p.price).toFixed(2)}</Badge>
                    {p.category && <Badge variant="outline">{p.category}</Badge>}
                    <Badge variant={p.is_active ? "default" : "outline"}>
                      {p.is_active ? "Active" : "Hidden"}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => toggleActive(p.id, p.is_active)}>
                    {p.is_active ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                  <Button size="icon" variant="ghost" asChild>
                    <Link to={`/admin/products/${p.id}`}><Pencil size={16} /></Link>
                  </Button>
                  <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteProduct(p.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
