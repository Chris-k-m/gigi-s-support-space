import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { format } from "date-fns";
import type { Tables } from "@/integrations/supabase/types";

type OrderWithItems = Tables<"orders"> & { order_items: Tables<"order_items">[] };

const AdminOrders = () => {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setOrders((data as OrderWithItems[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Status updated"); fetchOrders(); }
  };

  const statusColor = (s: string) => {
    if (s === "completed") return "default";
    if (s === "cancelled") return "destructive";
    return "secondary";
  };

  if (loading) return <p className="text-muted-foreground">Loading orders...</p>;

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">Orders</h2>
      {orders.length === 0 ? (
        <p className="text-muted-foreground">No orders yet.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((o) => (
            <Card key={o.id}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{o.customer_name}</h3>
                      <Badge variant={statusColor(o.status)}>{o.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{o.customer_email} {o.customer_phone && `• ${o.customer_phone}`}</p>
                    {o.customer_address && <p className="text-sm text-muted-foreground">{o.customer_address}</p>}
                    <p className="text-sm text-muted-foreground mt-1">{format(new Date(o.created_at), "MMM d, yyyy h:mm a")}</p>
                    <div className="mt-3 space-y-1">
                      {o.order_items.map((item) => (
                        <p key={item.id} className="text-sm">
                          {item.product_name} × {item.quantity} — ${(Number(item.unit_price) * item.quantity).toFixed(2)}
                        </p>
                      ))}
                    </div>
                    <p className="font-semibold text-foreground mt-2">Total: ${Number(o.total_amount).toFixed(2)}</p>
                  </div>
                  <div className="w-40">
                    <Select value={o.status} onValueChange={(v) => updateStatus(o.id, v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
