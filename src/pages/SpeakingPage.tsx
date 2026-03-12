import { motion } from "framer-motion";
import { Mic, Users, Heart, BookOpen, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EMAIL = "Virginiarssw@gmail.com";

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

const SpeakingPage = () => {
  const handleRequest = () => {
    const subject = encodeURIComponent("Speaking Engagement Request");
    const body = encodeURIComponent(
      "Hi Gigi,\n\nI'd like to inquire about booking you for a speaking engagement.\n\nEvent Details:\n- Organization: \n- Event Type: \n- Event Date: \n- Audience Size: \n- Topic of Interest: \n\nAdditional Information:\n\n"
    );
    window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, "_self");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

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

      <section className="section-padding container mx-auto">
        <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">
          Speaking Topics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
                  <h3 className="font-display text-lg font-semibold text-foreground">{t.title}</h3>
                  <p className="text-sm text-muted-foreground font-body">{t.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
            <Button
              size="lg"
              onClick={handleRequest}
              className="bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-lg px-10 py-6"
            >
              <Send className="w-5 h-5 mr-2" />
              Request a Speaking Session
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SpeakingPage;
