"use client";

import { Button } from "@/components/ui/button";
import { CloudUpload, FileText, X } from "lucide-react";
import { useEffect, useState, type DragEvent } from "react";
import { useForm, useWatch } from "react-hook-form";

type PrepRequestFormValues = {
  files: File[];
};

type PrepRequestFormProps = {
  onSubmit?: (files: File[]) => void | Promise<void>;
};

const fileInputId = "prep-request-files";

const isSupportedFile = (file: File) => /\.(csv|tsv)$/i.test(file.name);

function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))} KB`;
  }
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default function PrepRequestForm({ onSubmit }: PrepRequestFormProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PrepRequestFormValues>({
    defaultValues: { files: [] },
  });
  const files = useWatch({ control, name: "files" });
  useEffect(() => {
    register("files", {
      validate: {
        required: (selected) =>
          selected.length > 0 ||
          "Please upload at least one CSV or TSV file.",
        supportedFormats: (selected) =>
          selected.every(isSupportedFile) ||
          "Only CSV and TSV files are accepted.",
      },
    });
  }, [register]);

  const addFiles = (selectedFiles: File[]) => {
    setSubmitMessage("");
    setValue(
      "files",
      [...files, ...selectedFiles].filter(
        (file, index, allFiles) =>
          allFiles.findIndex(
            (candidate) =>
              candidate.name === file.name &&
              candidate.size === file.size &&
              candidate.lastModified === file.lastModified,
          ) === index,
      ),
      { shouldDirty: true, shouldValidate: true },
    );
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    addFiles(Array.from(event.dataTransfer.files));
  };

  const removeFile = (indexToRemove: number) => {
    setSubmitMessage("");
    setValue(
      "files",
      files.filter((_, index) => index !== indexToRemove),
      { shouldDirty: true, shouldValidate: true },
    );
  };

  const submitFiles = async ({ files: selectedFiles }: PrepRequestFormValues) => {
    setSubmitMessage("");
    if (!onSubmit) {
      setSubmitMessage(
        "File upload is not connected yet. Please try again later.",
      );
      return;
    }

    try {
      await onSubmit(selectedFiles);
    } catch {
      setSubmitMessage("The files could not be submitted. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitFiles)}
      className="w-full space-y-3"
      noValidate
    >
      <div>
        <h1 className="text-xl font-bold text-[#111827] sm:text-2xl lg:text-3xl xl:text-4xl">
          Upload CSV/TSV File
        </h1>
        <p className="mt-1 text-sm text-[#374151] sm:text-lg">
          Please upload your inventory preparation file in CSV or TSV format.
        </p>
      </div>

      <input
        id={fileInputId}
        name="files"
        type="file"
        accept=".csv,.tsv,text/csv,text/tab-separated-values"
        multiple
        className="sr-only"
        aria-label="Upload CSV or TSV files"
        aria-describedby={errors.files ? "file-error" : undefined}
        onChange={(event) => {
          addFiles(Array.from(event.target.files ?? []));
          event.target.value = "";
        }}
      />

      <label
        htmlFor={fileInputId}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          const nextTarget = event.relatedTarget;
          if (
            !(nextTarget instanceof Node) ||
            !event.currentTarget.contains(nextTarget)
          ) {
            setIsDragging(false);
          }
        }}
        onDrop={handleDrop}
        className={`flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-5 py-8 lg:py-12 text-center transition-colors sm:min-h-45 ${
          isDragging
            ? "border-[#9b5317] bg-[#f7e9dd]"
            : errors.files
              ? "border-red-300 bg-[#f7eee8]"
              : "border-[#ead9cb] bg-[#f7eee8]"
        }`}
      >
        <CloudUpload
          aria-hidden="true"
          size={22}
          className="text-[#a45a1a]"
        />
        <span className="mt-3 text-sm font-semibold text-[#283041] lg:text-xl">
          Drag and drop your file here
        </span>
        <span className="mt-1 text-sm text-[#8790a0]">or</span>
        <span className="mt-3 rounded-full bg-[#9b5317] px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#81430f]">
          Browse Files
        </span>
      </label>

      {errors.files && (
        <p id="file-error" role="alert" className="text-sm text-red-600">
          {errors.files.message}
        </p>
      )}

      {files.map((file, index) => (
        <div
          key={`${file.name}-${file.size}-${file.lastModified}`}
          className={`flex items-center gap-3 rounded-lg border bg-white px-3 py-2.5 ${
            isSupportedFile(file) ? "border-[#e1e6ed]" : "border-red-300"
          }`}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded border border-[#f0dfd1] text-[#a45a1a]">
            <FileText size={15} aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs font-semibold text-[#283041]">
              {file.name}
            </span>
            <span className="mt-0.5 block text-[11px] text-[#8790a0]">
              {formatFileSize(file.size)} ·{" "}
              {file.name.split(".").pop()?.toUpperCase()}
              {!isSupportedFile(file) && (
                <span className="text-red-600"> · Unsupported file type</span>
              )}
            </span>
          </span>
          <button
            type="button"
            onClick={() => removeFile(index)}
            aria-label={`Remove ${file.name}`}
            className="rounded p-1 text-[#8790a0] transition-colors hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b5317]"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      ))}

      {submitMessage && (
        <p role="status" className="text-sm text-[#9b5317]">
          {submitMessage}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-9 w-full rounded-full bg-[#a45a1a] text-xs font-medium text-white hover:bg-[#81430f]"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
