import { motion } from "framer-motion";
import portrait from "@/assets/portrait-placeholder.png";

const AboutSection = () => (
  <section id="about" className="section-padding bg-sage-light">
    <div className="container mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={portrait}
            alt="Virginia Dubois - Registered Social Service Worker"
            className="rounded-2xl shadow-xl max-w-xs mx-auto md:mx-0"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Meet Gigi</h2>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Virginia (Gigi) Dubois is a Registered Social Service Worker based in Canada, 
              dedicated to supporting individuals, families, and caregivers through life's challenges.
            </p>
            <p>
              Her approach focuses on applying clinical tools to real-world situations — making 
              therapeutic skills practical, accessible, and empowering for everyday life.
            </p>
            <p>
              Gigi works collaboratively with Occupational and Physical Therapists to ensure 
              cohesive, comprehensive care that puts families at the center.
            </p>
            <p className="font-medium text-foreground">
              Compassionate. Practical. Empowering.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
