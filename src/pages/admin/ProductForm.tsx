import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id && id !== "new";

  const [form, setForm] = useState({
    name: "", description: "", price: "0", category: "", is_active: true, image_url: "", sort_order: 0,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      supabase.from("products").select("*").eq("id", id).single().then(({ data, error }) => {
        if (error) { toast.error("Product not found"); navigate("/admin/products"); return; }
        setForm({
          name: data.name, description: data.description ?? "", price: String(data.price),
          category: data.category ?? "", is_active: data.is_active, image_url: data.image_url ?? "",
          sort_order: data.sort_order,
        });
      });
    }
  }, [id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `products/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("images").upload(path, file);
    if (error) { toast.error("Upload failed"); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(path);
    setForm((f) => ({ ...f, image_url: publicUrl }));
    setUploading(false);
    toast.success("Image uploaded");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error("Product name is required"); return; }
    setSaving(true);
    const payload = { ...form, price: parseFloat(form.price) || 0 };

    if (isEditing) {
      const { error } = await supabase.from("products").update(payload).eq("id", id);
      if (error) toast.error(error.message);
      else { toast.success("Product updated"); navigate("/admin/products"); }
    } else {
      const { error } = await supabase.from("products").insert(payload);
      if (error) toast.error(error.message);
      else { toast.success("Product created"); navigate("/admin/products"); }
    }
    setSaving(false);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">
        {isEditing ? "Edit Product" : "Add Product"}
      </h2>
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Product Name *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price ($)</Label>
                <Input type="number" step="0.01" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Optional" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Product Image</Label>
              <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
              {form.image_url && <img src={form.image_url} alt="Preview" className="w-32 h-32 rounded-lg object-cover mt-2" />}
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.is_active} onCheckedChange={(checked) => setForm({ ...form, is_active: checked })} />
              <Label>Active (visible on website)</Label>
            </div>
            <div className="space-y-2">
              <Label>Sort Order</Label>
              <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={saving}>{saving ? "Saving..." : isEditing ? "Update Product" : "Create Product"}</Button>
              <Button type="button" variant="outline" onClick={() => navigate("/admin/products")}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductForm;
