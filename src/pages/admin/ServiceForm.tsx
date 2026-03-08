import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const ServiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id && id !== "new";

  const [form, setForm] = useState({
    title: "", description: "", price: "", cta_text: "Learn More", is_active: true, image_url: "", sort_order: 0,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      supabase.from("admin_services").select("*").eq("id", id).single().then(({ data, error }) => {
        if (error) { toast.error("Service not found"); navigate("/admin/services"); return; }
        setForm({
          title: data.title, description: data.description ?? "", price: data.price ?? "",
          cta_text: data.cta_text ?? "Learn More", is_active: data.is_active, image_url: data.image_url ?? "",
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
    const path = `services/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("images").upload(path, file);
    if (error) { toast.error("Upload failed"); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(path);
    setForm((f) => ({ ...f, image_url: publicUrl }));
    setUploading(false);
    toast.success("Image uploaded");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error("Service title is required"); return; }
    setSaving(true);

    if (isEditing) {
      const { error } = await supabase.from("admin_services").update(form).eq("id", id);
      if (error) toast.error(error.message);
      else { toast.success("Service updated"); navigate("/admin/services"); }
    } else {
      const { error } = await supabase.from("admin_services").insert(form);
      if (error) toast.error(error.message);
      else { toast.success("Service created"); navigate("/admin/services"); }
    }
    setSaving(false);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">
        {isEditing ? "Edit Service" : "Add Service"}
      </h2>
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Service Title *</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price (optional)</Label>
                <Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="e.g. $50/session" />
              </div>
              <div className="space-y-2">
                <Label>Button Text</Label>
                <Input value={form.cta_text} onChange={(e) => setForm({ ...form, cta_text: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Service Image</Label>
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
              <Button type="submit" disabled={saving}>{saving ? "Saving..." : isEditing ? "Update Service" : "Create Service"}</Button>
              <Button type="button" variant="outline" onClick={() => navigate("/admin/services")}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceForm;
