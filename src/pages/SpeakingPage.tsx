import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Users, Heart, BookOpen, Send, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
    description:
      "Evidence-based strategies for understanding and nurturing children with unique developmental profiles.",
  },
  {
    icon: Users,
    title: "Practical Tools for Parents & Caregivers",
    description:
      "Hands-on techniques that families can implement immediately to strengthen daily routines and communication.",
  },
  {
    icon: BookOpen,
    title: "Building Supportive Team Environments",
    description:
      "How educators, therapists, and families can collaborate for consistent, positive outcomes.",
  },
  {
    icon: Mic,
    title: "Navigating Therapy & Family Support Systems",
    description:
      "Demystifying the therapy landscape and connecting families with the right resources.",
  },
];

const eventTypes = [
  "Conference",
  "Workshop",
  "School Event",
  "Community Event",
  "Webinar",
  "Training Session",
  "Other",
];

const SpeakingPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    event_type: "",
    event_date: "",
    audience_size: "",
    topic_of_interest: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("speaking_requests").insert({
      name: form.name,
      organization: form.organization || null,
      email: form.email,
      phone: form.phone || null,
      event_type: form.event_type || null,
      event_date: form.event_date || null,
      audience_size: form.audience_size || null,
      topic_of_interest: form.topic_of_interest || null,
      message: form.message || null,
    });
    setLoading(false);
    if (error) {
      toast("Something went wrong. Please try again.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-24 pb-16 bg-primary/10 overflow-hidden">
        <div className="container mx-auto section-padding text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Book Gigi for Speaking Engagements
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto font-body"
          >
            Practical guidance for families, educators, and support teams.
          </motion.p>
        </div>
      </section>

      {/* Topics */}
      <section className="section-padding container mx-auto">
        <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">
          Speaking Topics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center flex flex-col items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <t.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {t.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body">
                    {t.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8">
            Request a Speaking Session
          </h2>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                Thank You for Your Request
              </h3>
              <p className="text-muted-foreground font-body">
                We will contact you shortly to discuss your event.
              </p>
            </motion.div>
          ) : (
            <Card>
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input id="name" name="name" required value={form.name} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization / School</Label>
                      <Input id="organization" name="organization" value={form.organization} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" name="email" type="email" required value={form.email} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" value={form.phone} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label>Event Type</Label>
                      <Select onValueChange={(v) => setForm({ ...form, event_type: v })}>
                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                          {eventTypes.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event_date">Event Date</Label>
                      <Input id="event_date" name="event_date" type="date" value={form.event_date} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="audience_size">Audience Size</Label>
                      <Input id="audience_size" name="audience_size" placeholder="e.g. 50-100" value={form.audience_size} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label>Topic of Interest</Label>
                      <Select onValueChange={(v) => setForm({ ...form, topic_of_interest: v })}>
                        <SelectTrigger><SelectValue placeholder="Select topic" /></SelectTrigger>
                        <SelectContent>
                          {topics.map((t) => (
                            <SelectItem key={t.title} value={t.title}>{t.title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Tell us about your event and what you're hoping Gigi can share..." />
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    <Send className="w-4 h-4 mr-2" />
                    {loading ? "Submitting..." : "Request a Speaking Session"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SpeakingPage;
