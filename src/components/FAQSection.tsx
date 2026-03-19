import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useContent } from "@/contexts/ContentContext";

const FAQSection = () => {
  const { content } = useContent();
  const c = content?.faq;

  return (
    <section id="faq" className="section-padding bg-sage-light">
      <div className="container mx-auto max-w-2xl">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
          {c?.title || "Frequently Asked Questions"}
        </motion.h2>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <Accordion type="single" collapsible className="space-y-3">
            {(c?.items || []).map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-card rounded-xl border border-border px-6 shadow-sm">
                <AccordionTrigger className="font-body font-medium text-foreground text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
