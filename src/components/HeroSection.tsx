import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
    <div className="absolute inset-0">
      <img src={heroBg} alt="Family support illustration" className="w-full h-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
    </div>

    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
        >
          Practical Support for Real&nbsp;Life.
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
          <Button variant="hero" size="xl" asChild>
            <a href="#contact">Book a Consultation</a>
          </Button>
          <Button variant="hero-outline" size="xl" asChild>
            <a href="#programs">Explore Programs</a>
          </Button>
        </motion.div>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          href="mailto:virginiarssw@gmail.com"
          className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <Mail size={16} />
          virginiarssw@gmail.com
        </motion.a>
      </div>
    </div>
  </section>
);

export default HeroSection;
