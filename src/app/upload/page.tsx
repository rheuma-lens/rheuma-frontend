"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { UploadDropzone } from "@/components/upload/upload-dropzone";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { Progress } from "@/components/ui/progress";
import { useUploadQueueStore } from "@/store/upload-queue-store";
import { formatFileSize } from "@/utils/file-size";
import { type Upload } from "@/types";
import { UPLOAD_BUCKET } from "@/lib/constants";
import { getSupabaseClientOrThrow } from "@/lib/supabase";

const initialUploads: Upload[] = [];

export default function UploadPage() {
  const queryClient = useQueryClient();
  const { queue, addToQueue, updateUpload, clearQueue } = useUploadQueueStore();

  const uploadFiles = async (files: File[]) => {
    const uploads = files.map((file) => ({
      id: crypto.randomUUID(),
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      progress: 0,
      status: "queued" as const,
      createdAt: new Date().toISOString(),
    }));

    uploads.forEach(addToQueue);
    void Promise.all(uploads.map((upload) => uploadFile(upload, files.find((file) => file.name === upload.fileName)!)));
  };

  const uploadFile = async (upload: Upload, file: File) => {
    updateUpload(upload.id, { status: "uploading", progress: 10 });

    try {
      const supabaseClient = getSupabaseClientOrThrow();
      const { data, error } = await supabaseClient.storage
        .from(UPLOAD_BUCKET)
        .upload(`uploads/${upload.id}/${upload.fileName}`, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error || !data) {
        throw error ?? new Error("Upload failed");
      }

      updateUpload(upload.id, { status: "completed", progress: 100 });
      toast.success(`${upload.fileName} uploaded successfully.`);
      queryClient.invalidateQueries({ queryKey: ["uploads"] });
    } catch (error) {
      updateUpload(upload.id, { status: "failed", progress: 0 });
      toast.error(
        error instanceof Error
          ? error.message
          : "File upload failed. Please try again.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-8 lg:px-12">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.45 } }}
        className="mx-auto max-w-6xl space-y-8 rounded-[2rem] bg-white/95 p-6 shadow-[0_40px_120px_-45px_rgb(15,23,42,0.25)] dark:bg-slate-900/95 md:p-10"
      >
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700 dark:text-sky-300">Upload</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
            Sync imaging data with Supabase storage
          </h1>
          <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
            Drop files to securely upload them to Supabase, then monitor status and progress in real time.
          </p>
        </header>

        <UploadDropzone onFiles={uploadFiles} />

        <section className="rounded-3xl border border-slate-200/70 bg-slate-50 p-6 dark:border-slate-700/80 dark:bg-slate-950">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-50">Upload queue</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Track the current batch and retry failed uploads.
              </p>
            </div>
            <button
              type="button"
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-slate-200 dark:text-slate-950 dark:hover:bg-slate-100"
              onClick={() => clearQueue()}
            >
              Clear queue
            </button>
          </div>

          <div className="space-y-4">
            {queue.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white/90 p-10 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-300">
                <p className="text-base font-medium">No uploads yet.</p>
                <p className="mt-2 text-sm">Start by adding files to the dropzone above.</p>
              </div>
            ) : (
              queue.map((upload) => (
                <article
                  key={upload.id}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-base font-semibold text-slate-950 dark:text-slate-50">{upload.fileName}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{formatFileSize(upload.fileSize)}</p>
                    </div>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${
                        upload.status === "completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : upload.status === "uploading"
                          ? "bg-sky-100 text-sky-700"
                          : upload.status === "failed"
                          ? "bg-destructive-100 text-destructive-700"
                          : "bg-slate-100 text-slate-700"
                      } dark:bg-slate-800 dark:text-slate-200`}
                    >
                      {upload.status}
                    </span>
                  </div>
                  <div className="mt-4 space-y-3">
                    <Progress value={upload.progress} />
                    <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                      <span>{upload.progress}%</span>
                      <span>{new Date(upload.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </motion.section>
    </main>
  );
}
