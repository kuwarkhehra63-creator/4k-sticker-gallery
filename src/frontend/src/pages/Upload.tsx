import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ImagePlus,
  RefreshCw,
  Upload as UploadIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FileUploader } from "../components/FileUploader";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { useAuth } from "../hooks/useAuth";
import { useAddSticker } from "../hooks/useStickers";
import { cn } from "../lib/utils";
import type { StickerCategory } from "../types";
import { ALL_CATEGORIES, CATEGORY_LABELS } from "../types";

interface FormState {
  name: string;
  description: string;
  category: StickerCategory | "";
  file: File | null;
  preview: string | null;
}

type UploadStatus = "idle" | "uploading" | "success" | "error";

const initialForm: FormState = {
  name: "",
  description: "",
  category: "",
  file: null,
  preview: null,
};

export default function UploadPage() {
  const { isAuthenticated, login } = useAuth();
  const { mutateAsync: addSticker } = useAddSticker();

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const isPending = uploadStatus === "uploading";

  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
    setUploadProgress(0);
    setUploadStatus("idle");
    setErrorMessage("");
  };

  const handleFileSelect = (file: File) => {
    const preview = URL.createObjectURL(file);
    setForm((f) => ({ ...f, file, preview }));
    setErrors((e) => ({ ...e, file: undefined }));
  };

  const handleFileClear = () => {
    if (form.preview) URL.revokeObjectURL(form.preview);
    setForm((f) => ({ ...f, file: null, preview: null }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.file)
      newErrors.file = "Please select a sticker image (PNG or WebP)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    if (!validate()) return;
    if (!form.file || !form.category) return;

    setUploadStatus("uploading");
    setUploadProgress(0);

    try {
      await addSticker({
        name: form.name.trim(),
        description: form.description.trim(),
        category: form.category as StickerCategory,
        file: form.file,
        onProgress: setUploadProgress,
      });
      setUploadStatus("success");
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Upload failed. Please try again.";
      setErrorMessage(msg);
      setUploadStatus("error");
      setUploadProgress(0);
    }
  };

  return (
    <div className="bg-background min-h-screen" data-ocid="upload.page">
      {/* Page header */}
      <section className="bg-muted/30 border-b border-border/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-foreground mb-6 -ml-2"
            data-ocid="upload.back_button"
          >
            <Link to="/">
              <ArrowLeft className="size-4" />
              Back to Gallery
            </Link>
          </Button>
          <motion.h1
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-display font-black text-4xl sm:text-5xl text-foreground"
          >
            Upload <span className="text-primary">Stickers</span>
          </motion.h1>
          <p className="mt-2 text-muted-foreground">
            Share your 4K sticker with the gallery. PNG and WebP supported.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <AnimatePresence mode="wait">
          {/* SUCCESS STATE */}
          {uploadStatus === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="bg-card border border-border/60 rounded-2xl shadow-elevated p-10 text-center"
              data-ocid="upload.success_state"
            >
              <div className="flex items-center justify-center mb-5">
                <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                  <CheckCircle2 className="size-10 text-primary" />
                </div>
              </div>
              <h2 className="font-display font-black text-2xl text-foreground mb-2">
                Sticker uploaded!
              </h2>
              <p className="text-muted-foreground mb-8">
                <strong className="text-foreground">{form.name}</strong> has
                been added to the gallery.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  asChild
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold gap-2"
                  data-ocid="upload.view_gallery_button"
                >
                  <Link to="/">View Gallery</Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={resetForm}
                  className="border-border/60 gap-2"
                  data-ocid="upload.upload_another_button"
                >
                  <ImagePlus className="size-4" />
                  Upload Another
                </Button>
              </div>
            </motion.div>
          )}

          {/* ERROR STATE */}
          {uploadStatus === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              className="mb-8 p-5 rounded-xl border border-destructive/30 bg-destructive/5 flex items-start gap-4"
              data-ocid="upload.error_state"
            >
              <AlertCircle className="size-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  Upload failed
                </p>
                <p className="text-sm text-muted-foreground mt-1 break-words">
                  {errorMessage}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setUploadStatus("idle")}
                  className="mt-3 border-destructive/40 text-destructive hover:bg-destructive/10 gap-2"
                  data-ocid="upload.retry_button"
                >
                  <RefreshCw className="size-3.5" />
                  Try again
                </Button>
              </div>
            </motion.div>
          )}

          {/* FORM STATE */}
          {(uploadStatus === "idle" ||
            uploadStatus === "uploading" ||
            uploadStatus === "error") && (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              {/* Auth notice */}
              {!isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-5 rounded-xl border border-primary/30 bg-primary/5 flex items-start gap-4"
                  data-ocid="upload.auth_notice"
                >
                  <AlertCircle className="size-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Login required to upload
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      You need to be logged in with Internet Identity to upload
                      stickers.
                    </p>
                    <Button
                      size="sm"
                      onClick={login}
                      className="mt-3 bg-primary text-primary-foreground"
                      data-ocid="upload.login_button"
                    >
                      Login with Internet Identity
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Form card */}
              <div className="bg-card border border-border/60 rounded-2xl shadow-elevated p-6 sm:p-8">
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  data-ocid="upload.form"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* File uploader */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Sticker Image{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <FileUploader
                        file={form.file}
                        preview={form.preview}
                        onFileSelect={handleFileSelect}
                        onClear={handleFileClear}
                        error={errors.file}
                        disabled={isPending}
                      />
                    </div>

                    {/* Form fields */}
                    <div className="space-y-5">
                      {/* Name */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="sticker-name"
                          className="text-sm font-medium text-foreground"
                        >
                          Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="sticker-name"
                          placeholder="e.g. Golden Sun Sticker"
                          value={form.name}
                          disabled={isPending}
                          onChange={(e) => {
                            setForm((f) => ({ ...f, name: e.target.value }));
                            if (errors.name)
                              setErrors((e2) => ({ ...e2, name: undefined }));
                          }}
                          className={cn(
                            "bg-background border-border/60 focus:border-primary/60",
                            errors.name ? "border-destructive/60" : "",
                          )}
                          data-ocid="upload.name.input"
                        />
                        {errors.name && (
                          <p
                            className="text-xs text-destructive flex items-center gap-1"
                            data-ocid="upload.name.field_error"
                          >
                            <AlertCircle className="size-3" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Category */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="sticker-category"
                          className="text-sm font-medium text-foreground"
                        >
                          Category <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={form.category}
                          disabled={isPending}
                          onValueChange={(val) => {
                            setForm((f) => ({
                              ...f,
                              category: val as StickerCategory,
                            }));
                            if (errors.category)
                              setErrors((e2) => ({
                                ...e2,
                                category: undefined,
                              }));
                          }}
                        >
                          <SelectTrigger
                            id="sticker-category"
                            className={cn(
                              "bg-background border-border/60",
                              errors.category ? "border-destructive/60" : "",
                            )}
                            data-ocid="upload.category.select"
                          >
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border/60">
                            {ALL_CATEGORIES.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {CATEGORY_LABELS[cat]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.category && (
                          <p
                            className="text-xs text-destructive flex items-center gap-1"
                            data-ocid="upload.category.field_error"
                          >
                            <AlertCircle className="size-3" />
                            {errors.category}
                          </p>
                        )}
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="sticker-desc"
                          className="text-sm font-medium text-foreground"
                        >
                          Description{" "}
                          <span className="text-muted-foreground font-normal text-xs">
                            (optional)
                          </span>
                        </Label>
                        <Textarea
                          id="sticker-desc"
                          placeholder="Describe your sticker…"
                          value={form.description}
                          disabled={isPending}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              description: e.target.value,
                            }))
                          }
                          rows={4}
                          className="bg-background border-border/60 focus:border-primary/60 resize-none"
                          data-ocid="upload.description.textarea"
                        />
                      </div>

                      {/* Upload progress bar */}
                      {isPending && (
                        <div
                          className="space-y-1.5"
                          data-ocid="upload.loading_state"
                        >
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Uploading…</span>
                            <span>{Math.round(uploadProgress)}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-primary rounded-full"
                              animate={{ width: `${uploadProgress}%` }}
                              transition={{ ease: "easeOut", duration: 0.3 }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Submit */}
                      <Button
                        type="submit"
                        disabled={isPending || !isAuthenticated}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-display font-semibold transition-smooth"
                        data-ocid="upload.submit_button"
                      >
                        {isPending ? (
                          <>
                            <span className="inline-block animate-spin rounded-full w-4 h-4 border-2 border-current border-t-transparent" />
                            Uploading…
                          </>
                        ) : (
                          <>
                            <UploadIcon className="size-4" />
                            Submit Sticker
                          </>
                        )}
                      </Button>

                      {!isAuthenticated && (
                        <p className="text-xs text-muted-foreground text-center">
                          You must be logged in to submit.
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
