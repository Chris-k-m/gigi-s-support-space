import { motion } from "framer-motion";

const PhilosophySection = () => (
  <section className="section-padding bg-sky-light">
    <div className="container mx-auto max-w-3xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Empowerment Through Practical Skills
        </h2>
        <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed text-lg">
          <p>
            I believe in real, honest support. Every family deserves someone in their corner 
            who listens without judgment and helps translate clinical goals into everyday wins.
          </p>
          <p>
            Whether you're navigating special needs, healthcare systems, or simply looking 
            for guidance — I'm here to help build independence and confidence, one step at a time.
          </p>
          <p className="font-display text-xl text-foreground font-medium italic">
            "Supportive, creative, and always centered on what matters most — your family."
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default PhilosophySection;
