import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Send } from "lucide-react";

const EMAIL = "Virginiarssw@gmail.com";

const ContactSection = () => {
  const handleContact = () => {
    const subject = encodeURIComponent("Inquiry from Website");
    window.open(`mailto:${EMAIL}?subject=${subject}`, "_self");
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Get in Touch</h2>
          <p className="mt-4 text-muted-foreground">
            Ready to take the next step? Reach out directly.
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-3 inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            <Mail size={16} />
            {EMAIL}
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
