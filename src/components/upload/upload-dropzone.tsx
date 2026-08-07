"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface UploadDropzoneProps {
  title?: string;
  description?: string;
  accept?: string;
  onFiles?: (files: File[]) => void;
  disabled?: boolean;
}

export const UploadDropzone = ({
  title = "Upload files",
  description = "Drag and drop imaging data to begin",
  accept = "image/jpeg,image/png,image/webp,image/dicom",
  onFiles,
  disabled = false,
}: UploadDropzoneProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (disabled || !files) {
      return;
    }
    onFiles?.(Array.from(files));
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    handleFiles(event.dataTransfer.files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  };

  return (
    <Card className="border-dashed border-border/70">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="rounded-lg border border-border/50 bg-muted/30 px-6 py-10 text-center">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          disabled={disabled}
          hidden
          onChange={(event) => handleFiles(event.target.files)}
        />
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-xl border border-dashed p-8 text-center transition-all ${
            dragActive ? "border-sky-400 bg-sky-50 dark:border-sky-400/70 dark:bg-slate-900" : "bg-transparent"
          } ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UploadCloud className="size-6" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Drop files here or browse</p>
            <p className="text-sm text-muted-foreground">Supports DICOM, PNG, JPG, and WEBP</p>
          </div>
          <Button type="button" variant="secondary" disabled={disabled}>
            Select files
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
