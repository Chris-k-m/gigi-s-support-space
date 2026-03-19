import { motion } from "framer-motion";
import { Mail, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";
import { useContent } from "@/contexts/ContentContext";

const HeroSection = () => {
  const { content } = useContent();
  const c = content?.hero;

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Family support illustration" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/95 to-secondary/15" />
      </div>

      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-primary/10 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        className="absolute bottom-20 left-[5%] w-56 h-56 rounded-full bg-secondary/10 blur-3xl"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-body font-medium"
          >
            <Sparkles size={14} />
            {c?.badge || "Family-Centered Support"}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground"
          >
            {c?.title || "Practical Support for Real Life."}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl"
          >
            {c?.subtitle || "Helping individuals and families apply therapeutic skills to everyday life with confidence and care."}
          </motion.p>

          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            href={`mailto:${c?.email || "virginiarssw@gmail.com"}`}
            className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors"
            whileHover={{ x: 4 }}
          >
            <Mail size={16} />
            {c?.email || "virginiarssw@gmail.com"}
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
