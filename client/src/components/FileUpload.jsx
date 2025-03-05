import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Paperclip, Video, X } from "lucide-react";

export default function FileUpload({ value = [], onChange }) {
  const [error, setError] = useState("");
  const [videoPreview, setVideoPreview] = useState(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);

    // Validate file size and type
    const invalidFiles = files.filter(file => {
      const isVideo = file.type.startsWith('video/');
      const maxSize = isVideo ? 50 * 1024 * 1024 : 5 * 1024 * 1024; // 50MB for videos, 5MB for others

      return file.size > maxSize || 
        !['image/jpeg', 'image/png', 'application/pdf', 'video/mp4', 'video/quicktime', 'video/webm']
          .includes(file.type);
    });

    if (invalidFiles.length) {
      setError("Files must be images (< 5MB), PDFs (< 5MB), or videos (< 50MB)");
      return;
    }

    setError("");

    // Create preview URL for video
    files.forEach(file => {
      if (file.type.startsWith('video/')) {
        setVideoPreview(URL.createObjectURL(file));
      }
    });

    // Store file information
    onChange([...value, ...files.map(f => ({
      name: f.name,
      type: f.type,
      preview: f.type.startsWith('video/') ? URL.createObjectURL(f) : null
    }))]);
  };

  const removeFile = (fileName) => {
    const newFiles = value.filter(f => f.name !== fileName);
    onChange(newFiles);

    // Clean up video preview URL if removed
    const removedFile = value.find(f => f.name === fileName);
    if (removedFile?.preview) {
      URL.revokeObjectURL(removedFile.preview);
      if (videoPreview === removedFile.preview) {
        setVideoPreview(null);
      }
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="file">Attachments (Optional)</Label>

      <div className="flex items-center gap-4">
        <Input
          type="file"
          id="file"
          className="hidden"
          multiple
          accept="image/*,.pdf,video/mp4,video/quicktime,video/webm"
          onChange={handleFileChange}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById('file').click()}
        >
          <Paperclip className="mr-2 h-4 w-4" />
          Add Files
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById('file').click()}
        >
          <Video className="mr-2 h-4 w-4" />
          Add Video
        </Button>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      {value.length > 0 && (
        <ul className="space-y-2">
          {value.map((file, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              {file.type.startsWith('video/') ? (
                <Video className="h-4 w-4" />
              ) : (
                <Paperclip className="h-4 w-4" />
              )}
              <span>{file.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(file.name)}
              >
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}

      {videoPreview && (
        <div className="mt-4">
          <Label>Video Preview</Label>
          <video 
            src={videoPreview} 
            controls 
            className="mt-2 max-w-full h-auto rounded-lg"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}