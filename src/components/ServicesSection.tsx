import { motion } from "framer-motion";
import { User, Users, BookOpen } from "lucide-react";
import servicesSupport from "@/assets/services-support.png";
import servicesCollaborative from "@/assets/services-collaborative.png";
import servicesGroup from "@/assets/services-group.png";

const services = [
  {
    icon: User,
    title: "1:1 Social Support",
    description: "Personalized sessions tailored to individual needs, helping you build confidence and skills at your own pace.",
    image: servicesSupport,
    imageAlt: "Social worker having a supportive one-on-one session",
  },
  {
    icon: Users,
    title: "Collaborative Care",
    description: "Working alongside therapists and families to provide cohesive, comprehensive support for the best outcomes.",
    image: servicesCollaborative,
    imageAlt: "Healthcare team collaborating around a table",
  },
  {
    icon: BookOpen,
    title: "Group Classes",
    description: "Skill-building sessions in a fun, flexible group environment. Register per session with flexible scheduling.",
    image: servicesGroup,
    imageAlt: "Children enjoying creative group activities together",
  },
];

const ServicesSection = () => (
  <section id="services" className="section-padding">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">How I Can Help</h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Flexible, personalized services designed to meet you where you are.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="bg-card rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-border group overflow-hidden"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={s.image}
                alt={s.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-8">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <s.icon className="text-primary" size={28} />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">{s.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{s.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
