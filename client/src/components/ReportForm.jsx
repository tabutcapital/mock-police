import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { storage } from "@/lib/storage";
import FileUpload from "./FileUpload";
import { nanoid } from "nanoid";

const REPORT_TYPES = [
  { value: "crime", label: "Crime Report" },
  { value: "accident", label: "Accident Report" },
  { value: "lost_property", label: "Lost Property" }
];

export default function ReportForm() {
  const { toast } = useToast();
  const [attachments, setAttachments] = useState([]);

  const form = useForm({
    defaultValues: {
      type: "",
      title: "",
      description: "",
      location: "",
      date: new Date().toISOString().split('T')[0]
    }
  });

  const onSubmit = (data) => {
    const user = storage.getCurrentUser();
    if (!user) return;

    // Process attachments - store only necessary info
    const processedAttachments = attachments.map(file => ({
      name: file.name,
      type: file.type
    }));

    const report = {
      id: nanoid(),
      userId: user.id,
      status: "submitted",
      attachments: processedAttachments,
      createdAt: new Date().toISOString(),
      ...data
    };

    storage.saveReport(report);

    // Clean up any preview URLs
    attachments.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });

    toast({
      title: "Report submitted successfully",
      description: "You can track its status in your dashboard",
      duration: 3000
    });

    form.reset();
    setAttachments([]);
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Report Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type of report" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {REPORT_TYPES.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Brief title of the incident" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Detailed description of what happened"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Where did this occur?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Incident</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FileUpload 
            value={attachments}
            onChange={setAttachments}
          />

          <Button type="submit" className="w-full">
            Submit Report
          </Button>
        </form>
      </Form>
    </Card>
  );
}