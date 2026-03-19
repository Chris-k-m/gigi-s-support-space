import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Shield } from "lucide-react";
import programsGroup from "@/assets/programs-group.png";
import { useContent } from "@/contexts/ContentContext";

const highlightIcons = [Sparkles, Heart, Shield];

const ProgramsSection = () => {
  const { content } = useContent();
  const c = content?.programs;

  return (
    <section id="programs" className="section-padding bg-warm">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">{c?.title || "Flexible & Engaging Group Programs"}</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">{c?.description || ""}</p>
            <div className="mt-8 space-y-4">
              {(c?.highlights || []).map((text, i) => {
                const Icon = highlightIcons[i % highlightIcons.length];
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="text-primary" size={18} />
                    </div>
                    <span className="text-foreground">{text}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-8">
              <Button variant="hero" size="lg" asChild>
                <a href="#contact">View Upcoming Sessions</a>
              </Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-6">
            <img src={programsGroup} alt="Children and adults enjoying a creative group activity" className="rounded-2xl shadow-lg w-full" />
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">What to Expect</h3>
              <ul className="space-y-3 text-muted-foreground">
                {(c?.expectations || []).map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
