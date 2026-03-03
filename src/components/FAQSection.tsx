import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "What is a Registered Social Service Worker?",
    a: "A Registered Social Service Worker (RSSW) is a regulated professional who provides support in areas like mental health, family services, and community resources. RSSWs are registered with a provincial regulatory body and uphold professional standards of practice.",
  },
  {
    q: "Do you offer individual sessions?",
    a: "Yes! I offer personalized 1:1 sessions tailored to your unique needs and goals. These sessions focus on building practical skills and strategies you can use in everyday life.",
  },
  {
    q: "How do group registrations work?",
    a: "Group sessions are offered on a per-session registration basis, giving you the flexibility to attend when it works for your schedule. Simply reach out to learn about upcoming sessions and reserve your spot.",
  },
  {
    q: "Do you collaborate with other healthcare providers?",
    a: "Absolutely. I work closely with Occupational Therapists, Physical Therapists, and other professionals to ensure cohesive, well-rounded support for individuals and families.",
  },
];

const FAQSection = () => (
  <section id="faq" className="section-padding bg-sage-light">
    <div className="container mx-auto max-w-2xl">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12"
      >
        Frequently Asked Questions
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-card rounded-xl border border-border px-6 shadow-sm"
            >
              <AccordionTrigger className="font-body font-medium text-foreground text-left">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FAQSection;
