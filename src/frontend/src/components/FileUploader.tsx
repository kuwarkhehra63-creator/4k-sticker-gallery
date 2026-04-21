import { AlertCircle, ImagePlus, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { cn } from "../lib/utils";

const ALLOWED_TYPES = ["image/png", "image/webp"];
const ALLOWED_EXTENSIONS = ["PNG", "WebP"];

interface FileUploaderProps {
  file: File | null;
  preview: string | null;
  onFileSelect: (file: File) => void;
  onClear: () => void;
  error?: string;
  disabled?: boolean;
}

export function FileUploader({
  file,
  preview,
  onFileSelect,
  onClear,
  error,
  disabled,
}: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [typeError, setTypeError] = useState<string | null>(null);

  const handleFile = useCallback(
    (selected: File) => {
      if (!ALLOWED_TYPES.includes(selected.type)) {
        setTypeError(
          `Invalid format: ${selected.type || "unknown"}. Only PNG and WebP are accepted.`,
        );
        return;
      }
      setTypeError(null);
      onFileSelect(selected);
    },
    [onFileSelect],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      const dropped = e.dataTransfer.files[0];
      if (dropped) handleFile(dropped);
    },
    [handleFile, disabled],
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const displayError = typeError || error;

  return (
    <div className="space-y-2">
      <button
        type="button"
        aria-label="Select sticker image (PNG or WebP)"
        disabled={disabled}
        className={cn(
          "relative w-full aspect-square rounded-xl border-2 border-dashed transition-smooth flex flex-col items-center justify-center cursor-pointer overflow-hidden group",
          isDragging
            ? "border-primary bg-primary/10 scale-[1.01]"
            : preview
              ? "border-primary/50 bg-card"
              : "border-border/50 bg-card hover:border-primary/50 hover:bg-muted/20",
          displayError ? "border-destructive/60" : "",
          disabled ? "opacity-50 cursor-not-allowed" : "",
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => !disabled && fileInputRef.current?.click()}
        data-ocid="upload.dropzone"
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Sticker preview"
              className="w-full h-full object-contain p-6"
            />
            {/* Clear overlay */}
            {!disabled && (
              <button
                type="button"
                aria-label="Remove selected file"
                className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
              >
                <div className="w-10 h-10 rounded-full bg-destructive/20 border border-destructive/40 flex items-center justify-center">
                  <X className="size-5 text-destructive" />
                </div>
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 p-8 text-center pointer-events-none select-none">
            <div
              className={cn(
                "w-14 h-14 rounded-full border flex items-center justify-center transition-smooth",
                isDragging
                  ? "bg-primary/20 border-primary/60"
                  : "bg-primary/10 border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50",
              )}
            >
              <ImagePlus
                className={cn(
                  "size-6 text-primary transition-smooth",
                  isDragging ? "scale-110" : "",
                )}
              />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">
                {isDragging ? "Drop to upload" : "Drag & drop sticker here"}
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                or{" "}
                <span className="text-primary underline underline-offset-2">
                  browse files
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              {ALLOWED_EXTENSIONS.map((ext) => (
                <span
                  key={ext}
                  className="text-xs font-mono px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/60"
                >
                  {ext}
                </span>
              ))}
            </div>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/webp"
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
          data-ocid="upload.file_input"
        />
      </button>

      {displayError && (
        <p
          className="text-xs text-destructive flex items-start gap-1.5"
          data-ocid="upload.file.field_error"
        >
          <AlertCircle className="size-3 mt-0.5 flex-shrink-0" />
          {displayError}
        </p>
      )}

      {file && !displayError && (
        <p className="text-xs text-muted-foreground truncate flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
          {file.name}
        </p>
      )}
    </div>
  );
}
