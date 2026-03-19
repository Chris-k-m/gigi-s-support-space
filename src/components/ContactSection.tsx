import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Send } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

const ContactSection = () => {
  const { content } = useContent();
  const c = content?.contact;
  const email = c?.email || "Virginiarssw@gmail.com";

  const handleContact = () => {
    const subject = encodeURIComponent("Inquiry from Website");
    window.open(`mailto:${email}?subject=${subject}`, "_self");
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">{c?.title || "Get in Touch"}</h2>
          <p className="mt-4 text-muted-foreground">{c?.subtitle || "Ready to take the next step? Reach out directly."}</p>
          <a href={`mailto:${email}`} className="mt-3 inline-flex items-center gap-2 text-primary hover:underline font-medium">
            <Mail size={16} />
            {email}
          </a>
          <div className="mt-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" onClick={handleContact}>
                <Send size={16} className="mr-2" />
                Send a Message
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
