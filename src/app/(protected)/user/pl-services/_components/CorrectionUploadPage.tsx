"use client";

import { useState, type DragEvent } from "react";
import { AlertCircle, CloudUpload, FileText } from "lucide-react";
import PrepRequestFileCard from "./PrepRequestFileCard";
import PrepRequestHeader from "./PrepRequestHeader";
import type { PrepRequest } from "../_data/prep-requests";

const acceptedFile = /\.(csv|tsv)$/i;

export default function CorrectionUploadPage({
  request,
}: {
  request: PrepRequest;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [message, setMessage] = useState("");

  const selectFile = (file?: File) => {
    setMessage("");
    if (!file) return;
    if (!acceptedFile.test(file.name)) {
      setSelectedFile(null);
      setMessage("Please choose a CSV or TSV file.");
      return;
    }
    setSelectedFile(file);
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    selectFile(event.dataTransfer.files[0]);
  };

  const submitMockUpload = () => {
    if (selectedFile) {
      setMessage(
        "The file is selected, but uploading is not connected in this demo.",
      );
    }
  };

  return (
    <main className="w-full">
      <PrepRequestHeader request={request} />

      <section
        role="status"
        className="mt-5 flex gap-3 rounded-xl border border-[#fed7aa] bg-[#fff7ed] px-4 py-4 text-[#c2410c] sm:px-5"
      >
        <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold">Correction Required</p>
          <p className="mt-1 text-sm leading-5">
            The admin has reviewed your file and requested a correction.
          </p>
        </div>
      </section>

      <section className="mt-5 rounded-xl border border-[#dfe6ef] bg-white px-4 py-4 shadow-[0_1px_2px_rgba(16,24,40,0.06)] sm:px-5">
        <h2 className="text-xs font-bold tracking-wide text-[#64748b]">
          ADMIN&apos;S CORRECTION NOTES
        </h2>
        <p className="mt-3 text-sm text-[#64748b]">
          Please check the following issues and upload a corrected file:
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[#8796ad]">
          {(request.correctionNotes ?? []).map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      <div className="mt-5 space-y-5">
        <PrepRequestFileCard request={request} />

        <section aria-labelledby="upload-corrected-file-title">
          <h2
            id="upload-corrected-file-title"
            className="mb-2.5 text-sm font-semibold text-[#334155]"
          >
            Upload Corrected File
          </h2>
          <input
            id="corrected-prep-file"
            type="file"
            accept=".csv,.tsv,text/csv,text/tab-separated-values"
            className="sr-only"
            onChange={(event) => selectFile(event.target.files?.[0])}
          />
          <label
            htmlFor="corrected-prep-file"
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
            className={`flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-4 py-8 text-center transition-colors sm:min-h-48 ${
              isDragging
                ? "border-[#9b5317] bg-[#f4e5d9]"
                : "border-[#ead9cb] bg-[#f7eee8]"
            }`}
          >
            <CloudUpload
              size={24}
              aria-hidden="true"
              className="text-[#a45a1a]"
            />
            <span className="mt-3 text-sm font-semibold text-[#283041]">
              Drag and drop your file here
            </span>
            <span className="mt-1 text-xs text-[#8790a0]">or</span>
            <span className="mt-3 rounded-full bg-[#9b5317] px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#81430f]">
              Browse Files
            </span>
            <span className="mt-2 text-xs text-[#8790a0]">
              CSV or TSV files only
            </span>
          </label>

          {selectedFile && (
            <div className="mt-3 flex items-center gap-3 rounded-lg border border-[#e1e6ed] bg-white px-3 py-2.5">
              <FileText
                size={17}
                aria-hidden="true"
                className="shrink-0 text-[#a45a1a]"
              />
              <p className="min-w-0 flex-1 truncate text-sm font-medium text-[#273449]">
                {selectedFile.name}
              </p>
              <p className="shrink-0 text-xs text-[#8790a0]">
                {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
              </p>
            </div>
          )}

          {message && (
            <p role="status" className="mt-3 text-sm text-[#a45a1a]">
              {message}
            </p>
          )}

          <button
            type="button"
            onClick={submitMockUpload}
            disabled={!selectedFile}
            className="mt-4 min-h-11 w-full rounded-full bg-[#a45a1a] px-5 text-sm font-medium text-white transition-colors hover:bg-[#81430f] disabled:cursor-not-allowed disabled:opacity-55"
          >
            Upload Corrected File
          </button>
        </section>
      </div>
    </main>
  );
}
