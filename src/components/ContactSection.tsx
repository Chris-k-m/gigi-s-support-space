import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. Gigi will be in touch soon.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Get in Touch</h2>
          <p className="mt-4 text-muted-foreground">
            Ready to take the next step? Send a message or reach out directly.
          </p>
          <a
            href="mailto:virginiarssw@gmail.com"
            className="mt-3 inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            <Mail size={16} />
            virginiarssw@gmail.com
          </a>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl p-8 shadow-lg border border-border space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" required placeholder="Your name" className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required placeholder="you@email.com" className="rounded-xl" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="service">Service Interest</Label>
            <Select>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">1:1 Social Support</SelectItem>
                <SelectItem value="collaborative">Collaborative Care</SelectItem>
                <SelectItem value="group">Group Classes</SelectItem>
                <SelectItem value="other">Other / General Inquiry</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" required placeholder="How can Gigi help?" rows={4} className="rounded-xl" />
          </div>

          <Button type="submit" size="lg" disabled={loading} className="w-full">
            {loading ? "Sending..." : (
              <>
                <Send size={16} />
                Schedule a Consultation
              </>
            )}
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
