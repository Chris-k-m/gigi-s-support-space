import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

const AdminServices = () => {
  const [services, setServices] = useState<Tables<"admin_services">[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    const { data, error } = await supabase.from("admin_services").select("*").order("sort_order");
    if (error) toast.error(error.message);
    else setServices(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchServices(); }, []);

  const toggleActive = async (id: string, isActive: boolean) => {
    const { error } = await supabase.from("admin_services").update({ is_active: !isActive }).eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Service updated"); fetchServices(); }
  };

  const deleteService = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    const { error } = await supabase.from("admin_services").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Service deleted"); fetchServices(); }
  };

  if (loading) return <p className="text-muted-foreground">Loading services...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Services</h2>
        <Button asChild><Link to="/admin/services/new"><Plus className="mr-2 h-4 w-4" />Add Service</Link></Button>
      </div>
      {services.length === 0 ? (
        <p className="text-muted-foreground">No services yet. Add your first service!</p>
      ) : (
        <div className="grid gap-4">
          {services.map((s) => (
            <Card key={s.id}>
              <CardContent className="flex items-center gap-4 p-4">
                {s.image_url ? (
                  <img src={s.image_url} alt={s.title} className="w-16 h-16 rounded-lg object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-xs">No img</div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{s.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{s.description}</p>
                  <Badge variant={s.is_active ? "default" : "outline"} className="mt-1">
                    {s.is_active ? "Active" : "Hidden"}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => toggleActive(s.id, s.is_active)}>
                    {s.is_active ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                  <Button size="icon" variant="ghost" asChild>
                    <Link to={`/admin/services/${s.id}`}><Pencil size={16} /></Link>
                  </Button>
                  <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteService(s.id)}>
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

export default AdminServices;
