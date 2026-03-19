import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

const TestimonialsSection = () => {
  const { content } = useContent();
  const c = content?.testimonials;

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
          {c?.title || "What Families Are Saying"}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {(c?.items || []).map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }} className="bg-card rounded-2xl p-8 shadow-md border border-border">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={16} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed italic">"{t.quote}"</p>
              <div className="mt-6">
                <p className="font-semibold text-foreground">{t.author}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
