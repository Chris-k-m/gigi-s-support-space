import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Users, Heart, BookOpen, Send, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

const topics = [
  {
    icon: Heart,
    title: "Supporting Children with Developmental Needs",
    description: "Evidence-based strategies for understanding and nurturing children with unique developmental profiles.",
  },
  {
    icon: Users,
    title: "Practical Tools for Parents & Caregivers",
    description: "Hands-on techniques that families can implement immediately to strengthen daily routines and communication.",
  },
  {
    icon: BookOpen,
    title: "Building Supportive Team Environments",
    description: "How educators, therapists, and families can collaborate for consistent, positive outcomes.",
  },
  {
    icon: Mic,
    title: "Navigating Therapy & Family Support Systems",
    description: "Demystifying the therapy landscape and connecting families with the right resources.",
  },
];

const eventTypes = [
  "Conference", "Workshop", "School Event", "Community Event", "Webinar", "Training Session", "Other",
];

const SpeakingSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", organization: "", email: "", phone: "",
    event_type: "", event_date: "", audience_size: "",
    topic_of_interest: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) { toast("Please fill in all required fields."); return; }
    setLoading(true);
    const { error } = await supabase.from("speaking_requests").insert({
      name: form.name, organization: form.organization || null, email: form.email,
      phone: form.phone || null, event_type: form.event_type || null,
      event_date: form.event_date || null, audience_size: form.audience_size || null,
      topic_of_interest: form.topic_of_interest || null, message: form.message || null,
    });
    setLoading(false);
    if (error) { toast("Something went wrong. Please try again."); return; }
    setSubmitted(true);
  };

  return (
    <section id="speaking" className="section-padding bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Book Gigi for Speaking Engagements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto font-body"
          >
            Practical guidance for families, educators, and support teams.
          </motion.p>
        </div>

        {/* Topic cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {topics.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center flex flex-col items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <t.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{t.title}</h3>
                  <p className="text-sm text-muted-foreground font-body">{t.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Booking form */}
        <div className="max-w-2xl mx-auto">
          <h3 className="font-display text-2xl font-bold text-foreground text-center mb-8">
            Request a Speaking Session
          </h3>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">Thank You for Your Request</h3>
              <p className="text-muted-foreground font-body">We will contact you shortly to discuss your event.</p>
            </motion.div>
          ) : (
            <Card>
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="sp-name">Name *</Label>
                      <Input id="sp-name" name="name" required value={form.name} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sp-org">Organization / School</Label>
                      <Input id="sp-org" name="organization" value={form.organization} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="sp-email">Email *</Label>
                      <Input id="sp-email" name="email" type="email" required value={form.email} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sp-phone">Phone</Label>
                      <Input id="sp-phone" name="phone" value={form.phone} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label>Event Type</Label>
                      <Select onValueChange={(v) => setForm({ ...form, event_type: v })}>
                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                          {eventTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sp-date">Event Date</Label>
                      <Input id="sp-date" name="event_date" type="date" value={form.event_date} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="sp-size">Audience Size</Label>
                      <Input id="sp-size" name="audience_size" placeholder="e.g. 50-100" value={form.audience_size} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label>Topic of Interest</Label>
                      <Select onValueChange={(v) => setForm({ ...form, topic_of_interest: v })}>
                        <SelectTrigger><SelectValue placeholder="Select topic" /></SelectTrigger>
                        <SelectContent>
                          {topics.map((t) => <SelectItem key={t.title} value={t.title}>{t.title}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sp-msg">Message</Label>
                    <Textarea id="sp-msg" name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Tell us about your event..." />
                  </div>
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      disabled={loading}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {loading ? "Submitting..." : "Request a Speaking Session"}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default SpeakingSection;
