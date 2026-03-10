import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Briefcase, ShoppingCart, DollarSign, Mic, ClipboardList } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ products: 0, services: 0, orders: 0, revenue: 0, speaking: 0, quiz: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [products, services, orders, speaking, quiz] = await Promise.all([
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("admin_services").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("total_amount"),
        supabase.from("speaking_requests").select("id", { count: "exact", head: true }),
        supabase.from("quiz_submissions").select("id", { count: "exact", head: true }),
      ]);
      const revenue = (orders.data ?? []).reduce((s, o) => s + Number(o.total_amount), 0);
      setStats({
        products: products.count ?? 0,
        services: services.count ?? 0,
        orders: orders.data?.length ?? 0,
        revenue,
        speaking: speaking.count ?? 0,
        quiz: quiz.count ?? 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { title: "Products", value: stats.products, icon: Package, color: "text-primary" },
    { title: "Services", value: stats.services, icon: Briefcase, color: "text-accent-foreground" },
    { title: "Orders", value: stats.orders, icon: ShoppingCart, color: "text-secondary" },
    { title: "Revenue", value: `$${stats.revenue.toFixed(2)}`, icon: DollarSign, color: "text-primary" },
    { title: "Speaking Requests", value: stats.speaking, icon: Mic, color: "text-accent-foreground" },
    { title: "Quiz Submissions", value: stats.quiz, icon: ClipboardList, color: "text-secondary" },
  ];

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c) => (
          <Card key={c.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.title}</CardTitle>
              <c.icon className={`h-5 w-5 ${c.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{c.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
