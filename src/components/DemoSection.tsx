"use client";
import { motion } from "framer-motion";
import { FileText, FileCode2, ArrowRight, PlayIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const documentText = `BEFORE THE HIGH COURT OF JUDICATURE

Case No: WP/2024/1247

IN THE MATTER OF:

John Smith & Associates
(Petitioner)

VERSUS

The State of California
(Respondent)

Date of Filing: December 1, 2024
Presiding Judge: Hon. Justice M. Williams

SUMMARY OF FACTS:
The petitioner seeks relief under Article 226 of
the Constitution regarding the enforcement of
contractual obligations...`;

const xmlOutput = `<?xml version="1.0" encoding="UTF-8"?>
<LegalDocument schema="court-filing-v2">
  <Metadata>
    <DocumentType>Writ Petition</DocumentType>
    <FilingDate>2024-12-01</FilingDate>
  </Metadata>
  
  <CaseDetails>
    <CaseNumber>WP/2024/1247</CaseNumber>
    <Court>High Court of Judicature</Court>
    <Judge>Hon. Justice M. Williams</Judge>
  </CaseDetails>

  <Parties>
    <Petitioner>
      <Name>John Smith &amp; Associates</Name>
      <Type>Corporation</Type>
    </Petitioner>
    <Respondent>
      <Name>The State of California</Name>
      <Type>Government</Type>
    </Respondent>
  </Parties>
</LegalDocument>`;

export function DemoSection() {
  return (
    <section className="section-padding relative overflow-hidden py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-mesh" />

      <div className="container-custom px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6">
            <PlayIcon className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
            <span className="text-primary font-medium text-sm sm:text-base">
              Live Demo
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            See the
            <span className="bg-gradient-to-br from-primary to-blue-600 bg-clip-text text-transparent">
              {" "}
              Magic in Action
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Watch how LexXML transforms legal documents into structured XML in
            real-time
          </p>
        </motion.div>

        {/* Demo Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          <div className="glass-card p-2 rounded-3xl">
            <div className="bg-card rounded-2xl overflow-hidden border border-border/50">
              {/* Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/30">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Court XML Converter
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Processing Complete
                  </span>
                </div>
              </div>

              {/* Split View */}
              <div className="grid lg:grid-cols-2">
                {/* Document Input */}
                <div className="p-6 border-r border-border/50">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Original Document
                    </span>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-4 h-[400px] overflow-auto">
                    <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed">
                      {documentText}
                    </pre>
                  </div>
                </div>

                {/* XML Output */}
                <div className="p-6 bg-muted/10">
                  <div className="flex items-center gap-2 mb-4">
                    <FileCode2 className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      Generated XML
                    </span>
                  </div>
                  <div className="bg-background/50 rounded-xl p-4 h-[400px] overflow-auto">
                    <pre className="text-sm font-mono leading-relaxed">
                      {xmlOutput.split("\n").map((line, i) => {
                        // Simple syntax highlighting
                        const highlighted = line
                          .replace(
                            /(&lt;[/?]?\w+)/g,
                            '<span class="text-primary">$1</span>'
                          )
                          .replace(
                            /(="[^"]*")/g,
                            '<span class="text-accent">$1</span>'
                          )
                          .replace(
                            /(&gt;)([^<]+)(&lt;)/g,
                            '$1<span class="text-foreground">$2</span>$3'
                          );

                        return (
                          <div
                            key={i}
                            className="text-muted-foreground"
                            dangerouslySetInnerHTML={{
                              __html: line
                                .replace(
                                  /<(\/?[\w-]+)/g,
                                  '<span class="text-primary">&lt;$1</span>'
                                )
                                .replace(
                                  />/g,
                                  '<span class="text-primary">&gt;</span>'
                                )
                                .replace(
                                  /="([^"]*)"/g,
                                  '=<span class="text-accent">"$1"</span>'
                                ),
                            }}
                          />
                        );
                      })}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-border/50 bg-muted/20">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>
                    Processing time:{" "}
                    <strong className="text-foreground">2.3s</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Accuracy: <strong className="text-green-400">99.2%</strong>
                  </span>
                </div>
                <Button size="sm" className="group">
                  Try It Yourself
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
