import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();

  const links = [
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Programs", href: "/#programs" },
    { label: "Products", href: "/products" },
    { label: "Our Services", href: "/services-page" },
    { label: "Speaking", href: "/#speaking" },
    { label: "Support Quiz", href: "/#quiz" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <Link to="/" className="font-display text-xl font-bold text-primary">Gigi Dubois</Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map((l) =>
            l.href.startsWith("/") && !l.href.startsWith("/#") ? (
              <Link key={l.href} to={l.href} className="text-sm font-body font-medium text-muted-foreground hover:text-primary transition-colors">
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className="text-sm font-body font-medium text-muted-foreground hover:text-primary transition-colors">
                {l.label}
              </a>
            )
          )}
          <Link to="/cart" className="relative text-muted-foreground hover:text-primary transition-colors">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <Button size="sm" asChild>
            <a href="/#contact">Book a Consultation</a>
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 pb-4 flex flex-col gap-3">
          {links.map((l) =>
            l.href.startsWith("/") && !l.href.startsWith("/#") ? (
              <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className="text-sm font-body font-medium text-muted-foreground hover:text-primary py-1">
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-body font-medium text-muted-foreground hover:text-primary py-1">
                {l.label}
              </a>
            )
          )}
          <Link to="/cart" onClick={() => setOpen(false)} className="text-sm font-body font-medium text-muted-foreground hover:text-primary py-1 flex items-center gap-2">
            <ShoppingCart size={16} /> Cart {totalItems > 0 && `(${totalItems})`}
          </Link>
          <Button size="sm" asChild>
            <a href="/#contact" onClick={() => setOpen(false)}>Book a Consultation</a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
