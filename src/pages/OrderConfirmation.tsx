import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const OrderConfirmation = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 section-padding">
        <div className="container mx-auto max-w-lg">
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-primary mb-4" />
              <h1 className="font-display text-2xl font-bold text-foreground mb-2">Order Confirmed!</h1>
              <p className="text-muted-foreground mb-2">Thank you for your order.</p>
              <p className="text-sm text-muted-foreground mb-6">Order ID: <code className="bg-muted px-2 py-1 rounded text-xs">{id}</code></p>
              <p className="text-sm text-muted-foreground mb-6">We'll be in touch soon with next steps.</p>
              <div className="flex gap-3 justify-center">
                <Button asChild><Link to="/products">Continue Shopping</Link></Button>
                <Button asChild variant="outline"><Link to="/">Back to Home</Link></Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
