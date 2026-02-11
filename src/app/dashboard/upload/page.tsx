"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { calculatePercentage, getActiveSubscription } from "@/lib/utils";
import { add_document } from "@/redux/slices/documents";
import { initialSubscription } from "@/redux/slices/subscriptions";
import { RootState } from "@/redux/store";
import {
  CheckCircle,
  Clock,
  FileText,
  HeartIcon,
  Image,
  Upload as UploadIcon,
  X,
  XCircle,
} from "lucide-react";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface UploadFile {
  id: string;
  file: File;
  status: "pending" | "uploading" | "processing" | "success" | "error";
  progress: number;
  error?: string;
}

export default function Upload() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const { subscriptions } = useSelector(
    (state: RootState) => state.subscriptions
  );

  const { documents } = useSelector((state: RootState) => state.documents);
  const dispatch = useDispatch();

  const activePlan = getActiveSubscription(subscriptions);
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      setIsConverting(true);

      const files = Array.from(e.dataTransfer.files);
      const file = files[0];

      try {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/convert-xml", {
            method: "POST",
            body: formData,
          });

          if (response.status !== 200) {
            console.log({ activePlan });
            const updated_subscription = subscriptions.map((sub) =>
              sub.id === activePlan?.id
                ? {
                    ...sub,
                    conversions_done: sub.conversions_done,
                    status:
                      sub.conversions_done + 1 >= sub.maxConversions
                        ? "EXPIRED"
                        : sub.status,
                  }
                : sub
            );

            console.log({ updated_subscription });

            dispatch(initialSubscription(updated_subscription));
            console.log(response);
            return;
          }

          const blob = await response.blob();
          const docHeader = response.headers.get("X-Doc");
          const doc = docHeader ? JSON.parse(docHeader) : undefined;

          console.log({ doc });

          // Create download link
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${file.name.split(".")[0]}.xml`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Cleanup
          window.URL.revokeObjectURL(url);

          // 2. Update only that one
          const updated_subscription = subscriptions.map((sub) =>
            sub.id === activePlan?.id
              ? {
                  ...sub,
                  conversions_done: sub.conversions_done + 1,
                }
              : sub
          );

          console.log({ updated_subscription, activePlan });

          dispatch(initialSubscription(updated_subscription));
          dispatch(add_document(doc));
        }
      } catch (error) {
        console.log("failed to convert: ", error);
      } finally {
        setIsConverting(false);
      }
    },
    [documents, dispatch]
  );

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      setIsConverting(true);
      try {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/convert-xml", {
            method: "POST",
            body: formData,
          });

          if (response.status !== 200) {
            console.log(await response.text());
            return;
          }

          const blob = await response.blob();
          const docHeader = response.headers.get("X-Doc");
          const doc = docHeader ? JSON.parse(docHeader) : undefined;

          // Create download link
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${file.name.split(".")[0]}.xml`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Cleanup
          window.URL.revokeObjectURL(url);
          const updated_subscription = subscriptions.map((sub) =>
            sub.status === "ACTIVE"
              ? {
                  ...sub,
                  conversions_done: sub.conversions_done + 1,
                }
              : { ...sub }
          );

          dispatch(initialSubscription(updated_subscription));
          dispatch(add_document(doc));
        }
      } catch (error) {
        console.log("failed to convert: ", error);
      } finally {
        setIsConverting(false);
      }
    },
    []
  );

  const addFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter((file) => {
      const validTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ];
      return validTypes.includes(file.type);
    });

    const uploadFiles: UploadFile[] = validFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: "pending",
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...uploadFiles]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const startConversion = (id: string) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === id ? { ...file, status: "uploading", progress: 0 } : file
      )
    );

    // Simulate upload progress
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((file) => {
          if (file.id === id) {
            const newProgress = file.progress + 10;
            if (newProgress >= 100) {
              clearInterval(interval);
              return { ...file, status: "success", progress: 100 };
            }
            return { ...file, progress: newProgress };
          }
          return file;
        })
      );
    }, 200);
  };

  const convertAllFiles = () => {
    files.forEach((file) => {
      if (file.status === "pending") {
        startConversion(file.id);
      }
    });
  };

  const getFileIcon = (file: File) => {
    if (file.type === "application/pdf") {
      return <FileText className="h-8 w-8 text-red-500" />;
    }
    return <Image className="h-8 w-8 text-blue-500" />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "uploading":
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-500 animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full mb-6">
            <HeartIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text">
            AI Conversion Platform
          </h1>
          <p className="text-xl text-secondary-foreground max-w-2xl mx-auto leading-relaxed">
            Convert Smarter. Convert Faster. ⚡
          </p>
        </div>

        {/* Upload Zone */}
        <Card className="bg-background">
          <CardContent>
            {isConverting ? (
              <div className="relative rounded-xl p-8 bg-muted backdrop-blur-sm border border-border text-center shadow-sm space-y-5">
                {/* Spinner */}
                <div className="flex justify-center">
                  <div className="h-10 w-10 rounded-full border-2 border-muted-foreground/30 border-t-blue-500 animate-spin" />
                </div>

                {/* Title */}
                <div className="text-lg font-medium text-foreground">
                  Converting your file…
                </div>

                {/* Subtext */}
                <div className="text-sm text-muted-foreground">
                  Please wait while we process your document.
                </div>

                {/* Minimal progress bar */}
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 progress-bar"></div>
                </div>
              </div>
            ) : (
              // Upload card UI
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors bg-accent ${
                  isDragOver
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-input")?.click()}
              >
                <input
                  id="file-input"
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.txt,.jpeg,.jpg,.png,.txt,.rtf"
                  onChange={handleFileSelect}
                />
                <UploadIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Drag & drop files here
                </h3>
                <p className="text-muted-foreground mb-4">
                  or click to browse your files
                </p>

                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer">
                    Choose Files
                  </Button>
                </label>
                <p className="text-xs text-muted-foreground mt-4">
                  Maximum file size: 10MB per file. Supported formats: PDF, JPG,
                  PNG
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* File Queue */}
        {files.length > 0 && (
          <Card className="bg-background">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upload Queue</CardTitle>
                <CardDescription>
                  {files.length} file(s) ready for conversion
                </CardDescription>
              </div>
              <Button
                onClick={convertAllFiles}
                disabled={files.every((f) => f.status !== "pending")}
              >
                Convert All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {files.map((uploadFile) => (
                  <div
                    key={uploadFile.id}
                    className="flex items-center space-x-4 p-4 border rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      {getFileIcon(uploadFile.file)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">
                          {uploadFile.file.name}
                        </p>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(uploadFile.status)}
                          <Badge
                            variant={
                              uploadFile.status === "success"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {uploadFile.status}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => removeFile(uploadFile.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(uploadFile.file.size)}
                      </p>
                      {uploadFile.status === "uploading" && (
                        <Progress
                          value={uploadFile.progress}
                          className="mt-2"
                        />
                      )}
                      {uploadFile.error && (
                        <p className="text-xs text-red-500 mt-1">
                          {uploadFile.error}
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      {uploadFile.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => startConversion(uploadFile.id)}
                        >
                          Convert
                        </Button>
                      )}
                      {uploadFile.status === "success" && (
                        <Button size="sm" variant="outline">
                          Download XML
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Usage Info */}
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Usage Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium mb-2">
                  Current Plan: {activePlan?.plan}
                </h4>
                <Progress
                  value={calculatePercentage(
                    activePlan?.conversions_done ?? 0,
                    activePlan?.maxConversions ?? 0
                  )}
                  className="mb-2"
                />
                <p className="text-xs text-muted-foreground">
                  {activePlan?.conversions_done ?? 0} of{" "}
                  {activePlan?.maxConversions ?? 0} conversions used this month
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">File Limits</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Maximum file size: 10MB</li>
                  <li>• Single file upload only</li>
                  <li>• {activePlan?.maxConversions} conversions per month</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
