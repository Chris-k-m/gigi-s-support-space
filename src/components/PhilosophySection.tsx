import { motion } from "framer-motion";
import philosophyFamilyFallback from "@/assets/philosophy-family.png";
import { useContent } from "@/contexts/ContentContext";

const PhilosophySection = () => {
  const { content } = useContent();
  const c = content?.philosophy;
  const familyImg = c?.image || philosophyFamilyFallback;

  return (
    <section className="section-padding bg-sky-light">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">{c?.title || "Empowerment Through Practical Skills"}</h2>
            <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed text-lg">
              {(c?.paragraphs || []).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {c?.quote && (
                <p className="font-display text-xl text-foreground font-medium italic">"{c.quote}"</p>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <img src={familyImg} alt="Family walking together in a sunlit park" className="rounded-2xl shadow-lg w-full max-w-md mx-auto" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
