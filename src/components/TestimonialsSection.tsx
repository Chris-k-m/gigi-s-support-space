import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Gigi has been incredible for our family. She meets our child exactly where they're at and makes every session meaningful.",
    author: "Sarah M.",
    role: "Parent",
    stars: 5,
  },
  {
    quote: "The group classes are wonderful — my kids actually look forward to going! The environment is so supportive and fun.",
    author: "James T.",
    role: "Caregiver",
    stars: 5,
  },
  {
    quote: "Working with Gigi gave us practical tools we use every single day. She truly understands what families need.",
    author: "Linda K.",
    role: "Parent",
    stars: 5,
  },
];

const TestimonialsSection = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12"
      >
        What Families Are Saying
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.author}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="bg-card rounded-2xl p-8 shadow-md border border-border"
          >
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

export default TestimonialsSection;
