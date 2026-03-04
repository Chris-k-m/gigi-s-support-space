import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Shield } from "lucide-react";
import programsGroup from "@/assets/programs-group.png";

const ProgramsSection = () => (
  <section id="programs" className="section-padding bg-warm">
    <div className="container mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Flexible & Engaging Group Programs
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Our group programs are designed to develop skills in a safe, encouraging environment 
            where every participant's autonomy and voice are valued.
          </p>
          <div className="mt-8 space-y-4">
            {[
              { icon: Sparkles, text: "Skill development in a fun, creative setting" },
              { icon: Heart, text: "Safe and encouraging environment for all" },
              { icon: Shield, text: "Participant autonomy and choice always respected" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="text-primary" size={18} />
                </div>
                <span className="text-foreground">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Button variant="hero" size="lg" asChild>
              <a href="#contact">View Upcoming Sessions</a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <img
            src={programsGroup}
            alt="Children and adults enjoying a creative group activity"
            className="rounded-2xl shadow-lg w-full"
          />
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">What to Expect</h3>
            <ul className="space-y-3 text-muted-foreground">
              {[
                "Small, focused group sessions",
                "Flexible per-session registration",
                "Evidence-based skill-building activities",
                "Supportive and inclusive atmosphere",
                "Fun and engaging for all ages",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
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

export default ProgramsSection;
