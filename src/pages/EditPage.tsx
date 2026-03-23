import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import type { SiteContent } from "@/contexts/ContentContext";

const SAVE_URL = "/save-content.php?key=admin123";

const EditPage = () => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/content.json")
      .then((r) => r.json())
      .then((data) => setContent(data))
      .catch(() => toast.error("Failed to load content"))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    try {
      const res = await fetch(SAVE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Content saved successfully!");
      } else {
        toast.error(data.error || "Save failed");
      }
    } catch {
      toast.error("Could not reach the save endpoint. Make sure save-content.php is hosted on your server.");
    } finally {
      setSaving(false);
    }
  };

  const update = (path: string, value: any) => {
    if (!content) return;
    const keys = path.split(".");
    const updated = JSON.parse(JSON.stringify(content));
    let obj: any = updated;
    for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
    obj[keys[keys.length - 1]] = value;
    setContent(updated);
  };

  const updateArrayItem = (path: string, index: number, field: string, value: any) => {
    if (!content) return;
    const updated = JSON.parse(JSON.stringify(content));
    const keys = path.split(".");
    let obj: any = updated;
    for (const k of keys) obj = obj[k];
    obj[index][field] = value;
    setContent(updated);
  };

  const addArrayItem = (path: string, template: any) => {
    if (!content) return;
    const updated = JSON.parse(JSON.stringify(content));
    const keys = path.split(".");
    let obj: any = updated;
    for (const k of keys) obj = obj[k];
    obj.push(template);
    setContent(updated);
  };

  const removeArrayItem = (path: string, index: number) => {
    if (!content) return;
    const updated = JSON.parse(JSON.stringify(content));
    const keys = path.split(".");
    let obj: any = updated;
    for (const k of keys) obj = obj[k];
    obj.splice(index, 1);
    setContent(updated);
  };

  const updateStringArray = (path: string, index: number, value: string) => {
    if (!content) return;
    const updated = JSON.parse(JSON.stringify(content));
    const keys = path.split(".");
    let obj: any = updated;
    for (const k of keys) obj = obj[k];
    obj[index] = value;
    setContent(updated);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!content) return <div className="min-h-screen flex items-center justify-center">Failed to load content.</div>;

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      <div className="sticky top-0 z-50 bg-background border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <a href="/"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Site</a>
          </Button>
          <h1 className="font-display text-xl font-bold">Edit Content</h1>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="container mx-auto max-w-3xl py-8 space-y-8 px-4">
        {/* Hero */}
        <Card>
          <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Badge Text</Label><Input value={content.hero.badge} onChange={(e) => update("hero.badge", e.target.value)} /></div>
            <div><Label>Title</Label><Input value={content.hero.title} onChange={(e) => update("hero.title", e.target.value)} /></div>
            <div><Label>Subtitle</Label><Textarea value={content.hero.subtitle} onChange={(e) => update("hero.subtitle", e.target.value)} /></div>
            <div><Label>Email</Label><Input value={content.hero.email} onChange={(e) => update("hero.email", e.target.value)} /></div>
            <ImageUpload
              currentUrl={content.hero.image}
              onUpload={(url) => update("hero.image", url)}
              label="Background Image"
              recommendedSize="1920×1080px (landscape)"
            />
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader><CardTitle>Meet Gigi</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Section Title</Label><Input value={content.about.title} onChange={(e) => update("about.title", e.target.value)} /></div>
            {content.about.paragraphs.map((p, i) => (
              <div key={i}><Label>Paragraph {i + 1}</Label><Textarea value={p} onChange={(e) => updateStringArray("about.paragraphs", i, e.target.value)} /></div>
            ))}
            <div><Label>Tagline</Label><Input value={content.about.tagline} onChange={(e) => update("about.tagline", e.target.value)} /></div>
            <ImageUpload
              currentUrl={content.about.image}
              onUpload={(url) => update("about.image", url)}
              label="Portrait Photo"
              recommendedSize="400×500px (portrait)"
            />
          </CardContent>
        </Card>

        {/* Services */}
        <Card>
          <CardHeader><CardTitle>How I Can Help</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Section Title</Label><Input value={content.services.title} onChange={(e) => update("services.title", e.target.value)} /></div>
            <div><Label>Subtitle</Label><Input value={content.services.subtitle} onChange={(e) => update("services.subtitle", e.target.value)} /></div>
            {content.services.items.map((item, i) => (
              <div key={i} className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="font-bold">Service {i + 1}</Label>
                  <Button variant="ghost" size="sm" onClick={() => removeArrayItem("services.items", i)}><Trash2 className="w-4 h-4" /></Button>
                </div>
                <Input placeholder="Title" value={item.title} onChange={(e) => updateArrayItem("services.items", i, "title", e.target.value)} />
                <Textarea placeholder="Description" value={item.description} onChange={(e) => updateArrayItem("services.items", i, "description", e.target.value)} />
                <ImageUpload
                  currentUrl={item.image}
                  onUpload={(url) => updateArrayItem("services.items", i, "image", url)}
                  label="Service Image"
                  recommendedSize="800×600px (4:3 landscape)"
                />
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => addArrayItem("services.items", { title: "", description: "", image: "" })}><Plus className="w-4 h-4 mr-1" /> Add Service</Button>
          </CardContent>
        </Card>

        {/* Programs */}
        <Card>
          <CardHeader><CardTitle>Group Programs</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Title</Label><Input value={content.programs.title} onChange={(e) => update("programs.title", e.target.value)} /></div>
            <div><Label>Description</Label><Textarea value={content.programs.description} onChange={(e) => update("programs.description", e.target.value)} /></div>
            <Label className="font-bold">Highlights</Label>
            {content.programs.highlights.map((h, i) => (
              <Input key={i} value={h} onChange={(e) => updateStringArray("programs.highlights", i, e.target.value)} />
            ))}
            <Label className="font-bold">Expectations</Label>
            {content.programs.expectations.map((ex, i) => (
              <Input key={i} value={ex} onChange={(e) => updateStringArray("programs.expectations", i, e.target.value)} />
            ))}
            <ImageUpload
              currentUrl={content.programs.image}
              onUpload={(url) => update("programs.image", url)}
              label="Programs Image"
              recommendedSize="800×600px (landscape)"
            />
          </CardContent>
        </Card>

        {/* Philosophy */}
        <Card>
          <CardHeader><CardTitle>Empowerment / Philosophy</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Title</Label><Input value={content.philosophy.title} onChange={(e) => update("philosophy.title", e.target.value)} /></div>
            {content.philosophy.paragraphs.map((p, i) => (
              <div key={i}><Label>Paragraph {i + 1}</Label><Textarea value={p} onChange={(e) => updateStringArray("philosophy.paragraphs", i, e.target.value)} /></div>
            ))}
            <div><Label>Quote</Label><Textarea value={content.philosophy.quote} onChange={(e) => update("philosophy.quote", e.target.value)} /></div>
            <ImageUpload
              currentUrl={content.philosophy.image}
              onUpload={(url) => update("philosophy.image", url)}
              label="Philosophy Image"
              recommendedSize="600×600px (square or landscape)"
            />
          </CardContent>
        </Card>

        {/* Speaking */}
        <Card>
          <CardHeader><CardTitle>Speaking Engagements</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Title</Label><Input value={content.speaking.title} onChange={(e) => update("speaking.title", e.target.value)} /></div>
            <div><Label>Subtitle</Label><Input value={content.speaking.subtitle} onChange={(e) => update("speaking.subtitle", e.target.value)} /></div>
            {content.speaking.topics.map((t, i) => (
              <div key={i} className="p-4 border rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="font-bold">Topic {i + 1}</Label>
                  <Button variant="ghost" size="sm" onClick={() => removeArrayItem("speaking.topics", i)}><Trash2 className="w-4 h-4" /></Button>
                </div>
                <Input placeholder="Title" value={t.title} onChange={(e) => updateArrayItem("speaking.topics", i, "title", e.target.value)} />
                <Textarea placeholder="Description" value={t.description} onChange={(e) => updateArrayItem("speaking.topics", i, "description", e.target.value)} />
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => addArrayItem("speaking.topics", { title: "", description: "" })}><Plus className="w-4 h-4 mr-1" /> Add Topic</Button>
          </CardContent>
        </Card>

        {/* Quiz */}
        <Card>
          <CardHeader><CardTitle>Quiz Section</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Title</Label><Input value={content.quiz.title} onChange={(e) => update("quiz.title", e.target.value)} /></div>
            <div><Label>Subtitle</Label><Textarea value={content.quiz.subtitle} onChange={(e) => update("quiz.subtitle", e.target.value)} /></div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <Card>
          <CardHeader><CardTitle>Testimonials</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Section Title</Label><Input value={content.testimonials.title} onChange={(e) => update("testimonials.title", e.target.value)} /></div>
            {content.testimonials.items.map((t, i) => (
              <div key={i} className="p-4 border rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="font-bold">Testimonial {i + 1}</Label>
                  <Button variant="ghost" size="sm" onClick={() => removeArrayItem("testimonials.items", i)}><Trash2 className="w-4 h-4" /></Button>
                </div>
                <Textarea placeholder="Quote" value={t.quote} onChange={(e) => updateArrayItem("testimonials.items", i, "quote", e.target.value)} />
                <Input placeholder="Author" value={t.author} onChange={(e) => updateArrayItem("testimonials.items", i, "author", e.target.value)} />
                <Input placeholder="Role" value={t.role} onChange={(e) => updateArrayItem("testimonials.items", i, "role", e.target.value)} />
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => addArrayItem("testimonials.items", { quote: "", author: "", role: "", stars: 5 })}><Plus className="w-4 h-4 mr-1" /> Add Testimonial</Button>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader><CardTitle>FAQ</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Section Title</Label><Input value={content.faq.title} onChange={(e) => update("faq.title", e.target.value)} /></div>
            {content.faq.items.map((f, i) => (
              <div key={i} className="p-4 border rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="font-bold">FAQ {i + 1}</Label>
                  <Button variant="ghost" size="sm" onClick={() => removeArrayItem("faq.items", i)}><Trash2 className="w-4 h-4" /></Button>
                </div>
                <Input placeholder="Question" value={f.q} onChange={(e) => updateArrayItem("faq.items", i, "q", e.target.value)} />
                <Textarea placeholder="Answer" value={f.a} onChange={(e) => updateArrayItem("faq.items", i, "a", e.target.value)} />
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => addArrayItem("faq.items", { q: "", a: "" })}><Plus className="w-4 h-4 mr-1" /> Add FAQ</Button>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader><CardTitle>Contact</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Title</Label><Input value={content.contact.title} onChange={(e) => update("contact.title", e.target.value)} /></div>
            <div><Label>Subtitle</Label><Input value={content.contact.subtitle} onChange={(e) => update("contact.subtitle", e.target.value)} /></div>
            <div><Label>Email</Label><Input value={content.contact.email} onChange={(e) => update("contact.email", e.target.value)} /></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditPage;
