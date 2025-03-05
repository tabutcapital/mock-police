import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Paperclip, Video } from "lucide-react";

const STATUS_COLORS = {
  submitted: "bg-blue-500",
  in_review: "bg-yellow-500",
  investigating: "bg-purple-500",
  resolved: "bg-green-500",
  closed: "bg-gray-500"
};

export default function ReportStatus({ report }) {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold">{report.title}</h3>
          <p className="text-sm text-muted-foreground">
            {new Date(report.date).toLocaleDateString()}
          </p>
        </div>
        <Badge className={STATUS_COLORS[report.status]}>
          {report.status.replace("_", " ")}
        </Badge>
      </div>

      <ScrollArea className="h-[100px]">
        <p className="text-sm">{report.description}</p>
      </ScrollArea>

      {report.attachments?.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium">Attachments:</p>
          <ul className="text-sm text-muted-foreground">
            {report.attachments.map((file, i) => (
              <li key={i} className="flex items-center gap-2">
                {file.type?.startsWith('video/') ? (
                  <>
                    <Video className="h-4 w-4" />
                    <span>{file.name} (Video)</span>
                  </>
                ) : (
                  <>
                    <Paperclip className="h-4 w-4" />
                    <span>{file.name}</span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}