import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Mail, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type QuizSubmission = {
  id: string;
  child_age_group: string;
  challenges: string[];
  receiving_therapy: string | null;
  looking_for: string[];
  parent_name: string;
  parent_email: string;
  parent_phone: string | null;
  additional_info: string | null;
  status: string;
  created_at: string;
};

const statusColors: Record<string, string> = {
  new: "bg-primary/10 text-primary",
  reviewed: "bg-accent/20 text-accent-foreground",
  contacted: "bg-secondary/10 text-secondary",
};

const AdminQuizSubmissions = () => {
  const [submissions, setSubmissions] = useState<QuizSubmission[]>([]);
  const [selected, setSelected] = useState<QuizSubmission | null>(null);

  const fetchData = async () => {
    const { data } = await supabase
      .from("quiz_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setSubmissions(data);
  };

  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("quiz_submissions").update({ status }).eq("id", id);
    fetchData();
  };

  const downloadCSV = () => {
    const headers = ["Parent Name", "Email", "Phone", "Age Group", "Challenges", "Receiving Therapy", "Looking For", "Additional Info", "Status", "Date"];
    const rows = submissions.map((s) => [
      s.parent_name, s.parent_email, s.parent_phone ?? "", s.child_age_group,
      (s.challenges || []).join("; "), s.receiving_therapy ?? "",
      (s.looking_for || []).join("; "), (s.additional_info ?? "").replace(/"/g, '""'),
      s.status, new Date(s.created_at).toLocaleDateString(),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quiz-submissions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Quiz Submissions</h2>
        <Button variant="outline" size="sm" onClick={downloadCSV}>
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      <div className="grid gap-4">
        {submissions.length === 0 && (
          <p className="text-muted-foreground font-body text-center py-12">No quiz submissions yet.</p>
        )}
        {submissions.map((s) => (
          <Card key={s.id}>
            <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-semibold text-foreground truncate">{s.parent_name}</h3>
                  <Badge className={statusColors[s.status] || ""}>{s.status}</Badge>
                  <Badge variant="outline">Age: {s.child_age_group}</Badge>
                </div>
                <p className="text-sm text-muted-foreground font-body">
                  {(s.challenges || []).slice(0, 3).join(", ")}{(s.challenges || []).length > 3 ? "..." : ""} · {new Date(s.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Select value={s.status} onValueChange={(v) => updateStatus(s.id, v)}>
                  <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" onClick={() => setSelected(s)}>
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={`mailto:${s.parent_email}`}><Mail className="w-4 h-4" /></a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">Quiz Submission Details</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm font-body">
              <Detail label="Parent Name" value={selected.parent_name} />
              <Detail label="Email" value={selected.parent_email} />
              <Detail label="Phone" value={selected.parent_phone} />
              <Detail label="Age Group" value={selected.child_age_group} />
              <Detail label="Challenges" value={(selected.challenges || []).join(", ")} />
              <Detail label="Receiving Therapy" value={selected.receiving_therapy} />
              <Detail label="Looking For" value={(selected.looking_for || []).join(", ")} />
              <Detail label="Additional Info" value={selected.additional_info} />
              <Detail label="Submitted" value={new Date(selected.created_at).toLocaleString()} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Detail = ({ label, value }: { label: string; value: string | null }) => (
  <div>
    <span className="font-medium text-muted-foreground">{label}:</span>{" "}
    <span className="text-foreground">{value || "—"}</span>
  </div>
);

export default AdminQuizSubmissions;
