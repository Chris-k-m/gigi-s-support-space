import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Users, Heart, BookOpen, Send, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useContent } from "@/contexts/ContentContext";

const EMAIL = "Virginiarssw@gmail.com";
const topicIcons = [Heart, Users, BookOpen, Mic];

const SpeakingSection = () => {
  const { content } = useContent();
  const c = content?.speaking;
  const topics = c?.topics || [];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [audienceSize, setAudienceSize] = useState("");
  const [topicOfInterest, setTopicOfInterest] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Speaking Engagement Request");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nOrganization: ${organization || "N/A"}\nEvent Type: ${eventType || "N/A"}\nEvent Date: ${eventDate || "N/A"}\nAudience Size: ${audienceSize || "N/A"}\nTopic of Interest: ${topicOfInterest || "N/A"}\n\nAdditional Message:\n${message || "N/A"}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="speaking" className="section-padding bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {c?.title || "Book Gigi for Speaking Engagements"}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            {c?.subtitle || "Practical guidance for families, educators, and support teams."}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {topics.map((t, i) => {
            const Icon = topicIcons[i % topicIcons.length];
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center flex flex-col items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{t.title}</h3>
                    <p className="text-sm text-muted-foreground font-body">{t.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">Request Sent!</h3>
              <p className="text-muted-foreground font-body">Your email client should have opened with the details. Gigi will get back to you soon.</p>
              <Button variant="outline" className="mt-4" onClick={() => setSubmitted(false)}>Submit Another Request</Button>
            </motion.div>
          ) : (
            <Card>
              <CardContent className="p-6 md:p-8">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">Request a Speaking Session</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2"><Label htmlFor="sp-name">Your Name *</Label><Input id="sp-name" required value={name} onChange={(e) => setName(e.target.value)} /></div>
                    <div className="space-y-2"><Label htmlFor="sp-email">Email *</Label><Input id="sp-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2"><Label htmlFor="sp-org">Organization</Label><Input id="sp-org" value={organization} onChange={(e) => setOrganization(e.target.value)} /></div>
                    <div className="space-y-2">
                      <Label>Event Type</Label>
                      <Select value={eventType} onValueChange={setEventType}>
                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                          {["Conference", "Workshop", "Webinar", "School Event", "Community Talk", "Other"].map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2"><Label htmlFor="sp-date">Event Date</Label><Input id="sp-date" type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} /></div>
                    <div className="space-y-2">
                      <Label>Audience Size</Label>
                      <Select value={audienceSize} onValueChange={setAudienceSize}>
                        <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                        <SelectContent>
                          {["Under 50", "50–100", "100–300", "300+"].map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Topic of Interest</Label>
                    <Select value={topicOfInterest} onValueChange={setTopicOfInterest}>
                      <SelectTrigger><SelectValue placeholder="Select a topic" /></SelectTrigger>
                      <SelectContent>
                        {topics.map((t, i) => (
                          <SelectItem key={i} value={t.title}>{t.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sp-msg">Additional Message</Label>
                    <Textarea id="sp-msg" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Any other details about your event..." />
                  </div>
                  <div className="text-center pt-2">
                    <Button type="submit" size="lg" disabled={!name || !email} className="bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-lg px-10 py-6">
                      <Send className="w-5 h-5 mr-2" /> Submit Request
                    </Button>
                  </div>
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
