import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronRight, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

const ageGroups = ["0–3", "4–7", "8–12", "Teen"];
const challenges = [
  "Social interaction",
  "Emotional regulation",
  "Daily routines",
  "School challenges",
  "Communication",
  "Behavioural concerns",
];
const lookingForOptions = [
  "Parent guidance",
  "Individual sessions",
  "Group programs",
  "School collaboration",
];

const TOTAL_STEPS = 4;

const QuizPage = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [ageGroup, setAgeGroup] = useState("");
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [therapy, setTherapy] = useState("");
  const [lookingFor, setLookingFor] = useState<string[]>([]);
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const toggleItem = (arr: string[], item: string, setter: (v: string[]) => void) => {
    setter(arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]);
  };

  const canNext = () => {
    if (step === 0) return !!ageGroup;
    if (step === 1) return selectedChallenges.length > 0 && !!therapy;
    if (step === 2) return lookingFor.length > 0;
    if (step === 3) return !!parentName && !!parentEmail;
    return true;
  };

  const handleSubmit = async () => {
    if (!parentName || !parentEmail) {
      toast("Please fill in your name and email.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("quiz_submissions").insert({
      child_age_group: ageGroup,
      challenges: selectedChallenges,
      receiving_therapy: therapy,
      looking_for: lookingFor,
      parent_name: parentName,
      parent_email: parentEmail,
      parent_phone: parentPhone || null,
      additional_info: additionalInfo || null,
    });
    setLoading(false);
    if (error) {
      toast("Something went wrong. Please try again.");
      return;
    }
    setSubmitted(true);
  };

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-16 bg-secondary/10 overflow-hidden">
        <div className="container mx-auto section-padding text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            How Can We Help Your Child?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto font-body"
          >
            Answer a few quick questions so we can better understand how to support your child and family.
          </motion.p>
        </div>
      </section>

      {/* Quiz */}
      <section className="section-padding">
        <div className="container mx-auto max-w-2xl">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                Thank You for Sharing
              </h3>
              <p className="text-muted-foreground font-body max-w-md mx-auto">
                Gigi will review your information and contact you with recommended support options.
              </p>
            </motion.div>
          ) : (
            <Card>
              <CardContent className="p-6 md:p-8">
                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-muted-foreground font-body mb-2">
                    <span>Step {step + 1} of {TOTAL_STEPS}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-base font-display font-semibold">Child's Age Group *</Label>
                        <Select value={ageGroup} onValueChange={setAgeGroup}>
                          <SelectTrigger><SelectValue placeholder="Select age group" /></SelectTrigger>
                          <SelectContent>
                            {ageGroups.map((a) => (
                              <SelectItem key={a} value={a}>{a}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-base font-display font-semibold">What challenges is your child experiencing? *</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {challenges.map((c) => (
                            <label key={c} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/50 cursor-pointer transition-colors">
                              <Checkbox
                                checked={selectedChallenges.includes(c)}
                                onCheckedChange={() => toggleItem(selectedChallenges, c, setSelectedChallenges)}
                              />
                              <span className="text-sm font-body">{c}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label className="text-base font-display font-semibold">Are they currently receiving therapy? *</Label>
                        <RadioGroup value={therapy} onValueChange={setTherapy} className="flex gap-6">
                          {["Yes", "No", "Not sure"].map((o) => (
                            <label key={o} className="flex items-center gap-2 cursor-pointer">
                              <RadioGroupItem value={o} />
                              <span className="text-sm font-body">{o}</span>
                            </label>
                          ))}
                        </RadioGroup>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-base font-display font-semibold">Are you looking for: *</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {lookingForOptions.map((o) => (
                            <label key={o} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/50 cursor-pointer transition-colors">
                              <Checkbox
                                checked={lookingFor.includes(o)}
                                onCheckedChange={() => toggleItem(lookingFor, o, setLookingFor)}
                              />
                              <span className="text-sm font-body">{o}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                      <Label className="text-base font-display font-semibold block mb-2">Your Contact Information</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="parentName">Name *</Label>
                          <Input id="parentName" required value={parentName} onChange={(e) => setParentName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="parentEmail">Email *</Label>
                          <Input id="parentEmail" type="email" required value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="parentPhone">Phone</Label>
                        <Input id="parentPhone" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="additionalInfo">Tell us more about your child</Label>
                        <Textarea id="additionalInfo" rows={4} value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} placeholder="Any additional details that might help us understand your child's needs..." />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    disabled={step === 0}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back
                  </Button>

                  {step < TOTAL_STEPS - 1 ? (
                    <Button onClick={() => setStep(step + 1)} disabled={!canNext()}>
                      Next <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} disabled={!canNext() || loading}>
                      {loading ? "Submitting..." : "Submit & Get Guidance"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QuizPage;
