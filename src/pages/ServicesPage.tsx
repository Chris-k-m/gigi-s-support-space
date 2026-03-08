import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Tables } from "@/integrations/supabase/types";

const ServicesPage = () => {
  const [services, setServices] = useState<Tables<"admin_services">[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("admin_services").select("*").eq("is_active", true).order("sort_order").then(({ data, error }) => {
      if (error) toast.error(error.message);
      else setServices(data ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 section-padding">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">Our Services</h1>
            <p className="mt-2 text-muted-foreground">Professional support services tailored to your needs.</p>
          </div>

          {loading ? (
            <p className="text-muted-foreground">Loading services...</p>
          ) : services.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">No services available yet. Check back soon!</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <Card key={s.id} className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    {s.image_url ? (
                      <img src={s.image_url} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-display text-xl font-semibold text-foreground">{s.title}</h3>
                    {s.description && <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{s.description}</p>}
                    {s.price && <p className="mt-2 font-semibold text-primary">{s.price}</p>}
                    <Button className="mt-4 w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                      {s.cta_text || "Learn More"}
                    </Button>
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

export default ServicesPage;
