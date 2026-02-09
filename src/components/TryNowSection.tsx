"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Upload,
  File,
  FileText,
  CheckCircle,
  Copy,
  Download,
} from "lucide-react";

const TryNowSection = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedXML, setConvertedXML] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const file = files[0];

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/convert-xml", {
      method: "POST",
      body: formData,
    });

    const res = await response.json();

    if (!res.success) {
      return;
    }
    setConvertedXML(res.data);
  }, []);

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setUploadedFile(file);
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/convert-xml", {
          method: "POST",
          body: formData,
        });

        const res = await response.json();

        if (!res.success) {
          return;
        }
        setConvertedXML(res.data);
      }
    },
    []
  );

  const simulateConversion = (file: File) => {
    setIsConverting(true);
    setConvertedXML(null);

    // Simulate conversion process
    setTimeout(() => {
      setConvertedXML(sampleXML);
      setIsConverting(false);

      //   toast({
      //     title: "Conversion complete!",
      //     description: "Your document has been successfully converted to XML.",
      //   })
    }, 2000);
  };

  const copyToClipboard = () => {
    if (convertedXML) {
      navigator.clipboard.writeText(convertedXML);
      //   toast({
      //     title: "Copied to clipboard",
      //     description: "XML content has been copied to your clipboard.",
      //   })
    }
  };

  const sampleXML = `<?xml version="1.0" encoding="UTF-8"?>
<document>
  <metadata>
    <title>SampleDocument</title>
    <type>application/pdf</type>
    <size>204800</size>
    <converted_at>2025-09-07T12:00:00.000Z</converted_at>
  </metadata>
  <content>
    <section id="1">
      <heading>Document Content</heading>
      <paragraph>This is a sample conversion of your SampleDocument.pdf file.</paragraph>
      <paragraph>The actual content would be extracted and structured based on the document format.</paragraph>
    </section>
    <section id="2">
      <heading>Features</heading>
      <list>
        <item>Maintains document structure</item>
        <item>Preserves formatting information</item>
        <item>Extracts metadata automatically</item>
      </list>
    </section>
  </content>
</document>`;

  const downloadXML = () => {
    if (convertedXML && uploadedFile) {
      const blob = new Blob([convertedXML], { type: "application/xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${uploadedFile.name.replace(/\.[^/.]+$/, "")}.xml`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      //   toast({
      //     title: "Download started",
      //     description: "Your XML file is being downloaded.",
      //   })
    }
  };

  return (
    <section id="try-now" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up px-4">
          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Try It{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Right Now
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Upload your document and see the magic happen. No signup required,
            completely free to try.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Upload Area */}
          <div className="animate-fade-in-up px-4 lg:px-0">
            <div
              className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-smooth cursor-pointer ${
                isDragOver
                  ? "border-primary bg-primary/5 shadow-glow"
                  : uploadedFile
                  ? "border-primary/50 bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-primary/5"
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
                accept=".pdf,.docx,.txt"
                onChange={handleFileSelect}
              />

              {uploadedFile ? (
                <div className="animate-scale-in">
                  <CheckCircle className="w-12 sm:w-16 h-12 sm:h-16 text-primary mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                    File Uploaded!
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm sm:text-base break-all">
                    {uploadedFile.name}
                  </p>
                  {isConverting && (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span className="text-sm text-muted-foreground">
                        Converting...
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Upload className="w-12 sm:w-16 h-12 sm:h-16 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                    Drop your file here or tap to browse
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                    Supports PDF, DOCX, and TXT files up to 10MB
                  </p>
                  <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground flex-wrap">
                    <div className="flex items-center gap-1">
                      <File className="w-3 sm:w-4 h-3 sm:h-4" />
                      <span>PDF</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-3 sm:w-4 h-3 sm:h-4" />
                      <span>DOCX</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-3 sm:w-4 h-3 sm:h-4" />
                      <span>TXT</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {uploadedFile && !isConverting && (
              <div className="mt-4 text-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setUploadedFile(null);
                    setConvertedXML(null);
                  }}
                >
                  Upload Another File
                </Button>
              </div>
            )}
          </div>

          {/* XML Preview */}
          <div
            className="animate-fade-in-up px-4 lg:px-0 mt-6 lg:mt-0"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="bg-muted/30 rounded-2xl p-4 sm:p-6 h-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                <h3 className="text-base sm:text-lg font-semibold text-foreground">
                  XML Output
                </h3>
                {sampleXML && (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyToClipboard}
                      className="text-xs sm:text-sm"
                    >
                      <Copy className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
                      Copy
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={downloadXML}
                      className="text-xs sm:text-sm"
                    >
                      <Download className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>

              <div className="bg-background rounded-lg p-3 sm:p-4 min-h-[300px] sm:min-h-[400px] font-mono text-xs sm:text-sm overflow-auto border">
                {sampleXML ? (
                  <pre className="text-foreground whitespace-pre-wrap animate-fade-in-up">
                    {sampleXML}
                  </pre>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p className="text-sm sm:text-base">
                      Your converted XML will appear here...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div
          className="mt-12 sm:mt-16 text-center animate-fade-in-up px-4"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 bg-muted/30 px-4 sm:px-6 py-3 sm:py-4 rounded-full">
            <div className="flex items-center gap-2">
              <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-foreground">
                Secure Processing
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 sm:w-3 h-2 sm:h-3 bg-primary rounded-full" />
              <span className="text-xs sm:text-sm font-medium text-foreground">
                No Storage
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 sm:w-3 h-2 sm:h-3 bg-blue-500 rounded-full" />
              <span className="text-xs sm:text-sm font-medium text-foreground">
                Instant Results
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TryNowSection;
