import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="bg-card border-t border-border py-10 px-6">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <p className="flex items-center gap-1">
        © {new Date().getFullYear()} Virginia Dubois, RSSW. Made with <Heart size={14} className="text-primary" /> in Canada.
      </p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
        <a href="mailto:virginiarssw@gmail.com" className="hover:text-primary transition-colors">Contact</a>
      </div>
    </div>
  </footer>
);

export default Footer;
