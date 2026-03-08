import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CheckoutPage = () => {
  const { items, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [processing, setProcessing] = useState(false);

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required");
      return;
    }
    setProcessing(true);

    // Create order
    const { data: order, error: orderError } = await supabase.from("orders").insert({
      customer_name: form.name,
      customer_email: form.email,
      customer_phone: form.phone || null,
      customer_address: form.address || null,
      total_amount: totalAmount,
    }).select().single();

    if (orderError || !order) {
      toast.error("Failed to create order");
      setProcessing(false);
      return;
    }

    // Create order items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.name,
      quantity: item.quantity,
      unit_price: item.price,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
    if (itemsError) {
      toast.error("Failed to save order items");
      setProcessing(false);
      return;
    }

    clearCart();
    navigate(`/order-confirmation/${order.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 section-padding">
        <div className="container mx-auto max-w-4xl">
          <h1 className="font-display text-3xl font-bold text-foreground mb-6">Checkout</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader><CardTitle className="font-display">Your Details</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Full Name *</Label>
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Optional" />
                  </div>
                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Optional" />
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4 mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Payment integration coming soon (Stripe / PayPal)</p>
                  </div>

                  <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground" size="lg" disabled={processing}>
                    {processing ? "Processing..." : `Place Order — $${totalAmount.toFixed(2)}`}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="font-display">Order Summary</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} × {item.quantity}</span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
