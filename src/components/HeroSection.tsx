import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
    {/* Background image */}
    <div className="absolute inset-0">
      <img src={heroBg} alt="Family support illustration" className="w-full h-full object-cover opacity-15" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/95 to-secondary/15" />
    </div>

    {/* Decorative blobs */}
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
          Family-Centered Support
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
        >
          <span className="text-foreground">Practical Support for </span>
          <span className="text-primary">Real</span>
          <span className="text-secondary">&nbsp;Life.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl"
        >
          Helping individuals and families apply therapeutic skills to everyday life with confidence and care.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button variant="hero" size="xl" asChild>
              <a href="#contact">Book a Consultation</a>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="#programs">Explore Programs</a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          href="mailto:virginiarssw@gmail.com"
          className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors"
          whileHover={{ x: 4 }}
        >
          <Mail size={16} />
          virginiarssw@gmail.com
        </motion.a>
      </div>
    </div>
  </section>
);

export default HeroSection;
