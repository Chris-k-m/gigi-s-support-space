import { motion } from "framer-motion";
import portraitFallback from "@/assets/portrait-placeholder.png";
import { useContent } from "@/contexts/ContentContext";

const AboutSection = () => {
  const { content } = useContent();
  const c = content?.about;
  const portrait = c?.image || portraitFallback;

  return (
    <section id="about" className="section-padding bg-sage-light">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <img src={portrait} alt="Virginia Dubois - Registered Social Service Worker" className="rounded-2xl shadow-xl max-w-xs mx-auto md:mx-0" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">{c?.title || "Meet Gigi"}</h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              {(c?.paragraphs || []).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {c?.tagline && <p className="font-medium text-foreground">{c.tagline}</p>}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
