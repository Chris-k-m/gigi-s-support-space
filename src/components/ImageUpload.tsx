import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface ImageUploadProps {
  currentUrl?: string;
  onUpload: (url: string) => void;
  label?: string;
  recommendedSize?: string;
}

const UPLOAD_URL = "/upload-image.php?key=admin123";

const ImageUpload = ({ currentUrl, onUpload, label = "Image", recommendedSize }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Maximum 5MB.");
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
      toast.error("Invalid file type. Use JPG, PNG, WebP, or GIF.");
      return;
    }

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(UPLOAD_URL, { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        onUpload(data.url);
        toast.success("Image uploaded!");
      } else {
        toast.error(data.error || "Upload failed");
        setPreview(null);
      }
    } catch {
      toast.error("Could not reach the upload endpoint. Make sure upload-image.php is hosted on your server.");
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const displayUrl = preview || currentUrl;

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      {recommendedSize && (
        <p className="text-xs text-muted-foreground">Recommended: {recommendedSize}</p>
      )}
      <div className="flex items-start gap-4">
        {displayUrl && (
          <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border flex-shrink-0">
            <img src={displayUrl} alt="Preview" className="w-full h-full object-cover" />
            {uploading && (
              <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              </div>
            )}
          </div>
        )}
        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-1" />
            {currentUrl ? "Replace" : "Upload"}
          </Button>
          {currentUrl && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => { onUpload(""); setPreview(null); }}
            >
              <X className="w-4 h-4 mr-1" /> Remove
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
