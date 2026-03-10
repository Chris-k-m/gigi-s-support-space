import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

type SpeakingRequest = {
  id: string;
  name: string;
  organization: string | null;
  email: string;
  phone: string | null;
  event_type: string | null;
  event_date: string | null;
  audience_size: string | null;
  topic_of_interest: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

const statusColors: Record<string, string> = {
  new: "bg-primary/10 text-primary",
  reviewed: "bg-accent/20 text-accent-foreground",
  contacted: "bg-secondary/10 text-secondary",
};

const AdminSpeakingRequests = () => {
  const [requests, setRequests] = useState<SpeakingRequest[]>([]);
  const [selected, setSelected] = useState<SpeakingRequest | null>(null);

  const fetchData = async () => {
    const { data } = await supabase
      .from("speaking_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setRequests(data);
  };

  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("speaking_requests").update({ status }).eq("id", id);
    fetchData();
  };

  const downloadCSV = () => {
    const headers = ["Name", "Organization", "Email", "Phone", "Event Type", "Event Date", "Audience Size", "Topic", "Message", "Status", "Date"];
    const rows = requests.map((r) => [
      r.name, r.organization ?? "", r.email, r.phone ?? "", r.event_type ?? "", r.event_date ?? "", r.audience_size ?? "", r.topic_of_interest ?? "", (r.message ?? "").replace(/"/g, '""'), r.status, new Date(r.created_at).toLocaleDateString(),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "speaking-requests.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Speaking Requests</h2>
        <Button variant="outline" size="sm" onClick={downloadCSV}>
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      <div className="grid gap-4">
        {requests.length === 0 && (
          <p className="text-muted-foreground font-body text-center py-12">No speaking requests yet.</p>
        )}
        {requests.map((r) => (
          <Card key={r.id}>
            <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-semibold text-foreground truncate">{r.name}</h3>
                  <Badge className={statusColors[r.status] || ""}>{r.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground font-body">
                  {r.organization && `${r.organization} · `}{r.event_type && `${r.event_type} · `}{new Date(r.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Select value={r.status} onValueChange={(v) => updateStatus(r.id, v)}>
                  <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" onClick={() => setSelected(r)}>
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={`mailto:${r.email}`}><Mail className="w-4 h-4" /></a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">Speaking Request Details</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm font-body">
              <Detail label="Name" value={selected.name} />
              <Detail label="Organization" value={selected.organization} />
              <Detail label="Email" value={selected.email} />
              <Detail label="Phone" value={selected.phone} />
              <Detail label="Event Type" value={selected.event_type} />
              <Detail label="Event Date" value={selected.event_date} />
              <Detail label="Audience Size" value={selected.audience_size} />
              <Detail label="Topic" value={selected.topic_of_interest} />
              <Detail label="Message" value={selected.message} />
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

export default AdminSpeakingRequests;
