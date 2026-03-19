import { motion } from "framer-motion";
import { User, Users, BookOpen } from "lucide-react";
import servicesSupport from "@/assets/services-support.png";
import servicesCollaborative from "@/assets/services-collaborative.png";
import servicesGroup from "@/assets/services-group.png";
import { useContent } from "@/contexts/ContentContext";

const icons = [User, Users, BookOpen];
const images = [servicesSupport, servicesCollaborative, servicesGroup];
const imageAlts = [
  "Social worker having a supportive one-on-one session",
  "Healthcare team collaborating around a table",
  "Children enjoying creative group activities together",
];

const ServicesSection = () => {
  const { content } = useContent();
  const c = content?.services;

  return (
    <section id="services" className="section-padding">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">{c?.title || "How I Can Help"}</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{c?.subtitle || ""}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {(c?.items || []).map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-card rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-border group overflow-hidden"
              >
                {images[i] && (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={images[i]} alt={imageAlts[i] || s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="text-primary" size={28} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
