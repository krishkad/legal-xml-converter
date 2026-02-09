"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, FileCode2, Scale } from "lucide-react";
import { useRouter } from "next/navigation";

export function HeroSection2() {
  const router = useRouter();
  return (
    <section className="relative min-h-screen gradient-hero-glass flex items-center justify-center overflow-hidden py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial" />
      <div className="absolute inset-0 bg-gradient-mesh" />

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-custom px-4 md:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-2 mt-6"
          >
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-muted-foreground">
              AI-Powered Legal Document Processing
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6"
          >
            Transform Legal Docs
            <br />
            <span className="bg-gradient-to-br from-primary to-blue-600 bg-clip-text text-transparent">
              Into Structured XML
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Court XML AI intelligently extracts case data from complex legal
            documents and converts them into court-ready, standardized XML
            format in seconds.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button
              className="group"
              size={"lg"}
              onClick={() => router.push("/dashboard/upload")}
            >
              Convert Your Document
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button className="group" size={"lg"} variant={"outline"}>
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-4xl mx-auto"
          >
            {/* Main Card */}
            <div className="glass-card p-2 rounded-3xl">
              <div className="bg-card rounded-2xl overflow-hidden border border-border/50">
                {/* Window Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-4">
                    courtxml.com
                  </span>
                </div>

                {/* Content Preview */}
                <div className="grid md:grid-cols-2 divide-x divide-border/50">
                  {/* Document Side */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Scale className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Legal Document
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-muted/50 rounded w-full" />
                      <div className="h-4 bg-muted/50 rounded w-5/6" />
                      <div className="h-4 bg-muted/50 rounded w-4/6" />
                      <div className="h-8 mt-4" />
                      <div className="h-4 bg-muted/50 rounded w-full" />
                      <div className="h-4 bg-muted/50 rounded w-3/4" />
                      <div className="h-4 bg-muted/50 rounded w-5/6" />
                    </div>
                  </div>

                  {/* XML Side */}
                  <div className="p-6 bg-muted/10">
                    <div className="flex items-center gap-2 mb-4">
                      <FileCode2 className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium text-primary uppercase tracking-wider">
                        Generated XML
                      </span>
                    </div>
                    <div className="font-mono text-xs space-y-1.5 text-left">
                      <p className="text-muted-foreground">
                        &lt;?xml version=&quot;1.0&quot;?&gt;
                      </p>
                      <p className="text-primary">&lt;LegalDocument&gt;</p>
                      <p className="pl-4 text-muted-foreground">
                        &lt;CaseNumber&gt;
                        <span className="text-purple-500">2024/CV/001</span>
                        &lt;/CaseNumber&gt;
                      </p>
                      <p className="pl-4 text-muted-foreground">
                        &lt;Court&gt;
                        <span className="text-purple-500">High Court</span>
                        &lt;/Court&gt;
                      </p>
                      <p className="pl-4 text-muted-foreground">
                        &lt;Petitioner&gt;
                        <span className="text-purple-500">John Doe</span>
                        &lt;/Petitioner&gt;
                      </p>
                      <p className="pl-4 text-muted-foreground">
                        &lt;Respondent&gt;
                        <span className="text-purple-500">State</span>
                        &lt;/Respondent&gt;
                      </p>
                      <p className="text-primary">&lt;/LegalDocument&gt;</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            {/* <motion.div
              className="absolute -left-8 top-1/4 glass-card p-3 rounded-xl float"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <span className="text-green-400 text-sm">✓</span>
                </div>
                <div>
                  <p className="text-xs font-medium">99% Accuracy</p>
                  <p className="text-[10px] text-muted-foreground">
                    Verified Output
                  </p>
                </div>
              </div>
            </motion.div> */}

            {/* <motion.div
              className="absolute -right-8 bottom-1/4 glass-card p-3 rounded-xl float"
              style={{ animationDelay: "1s" }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <span className="text-primary text-sm">⚡</span>
                </div>
                <div>
                  <p className="text-xs font-medium">5 sec</p>
                  <p className="text-[10px] text-muted-foreground">
                    Processing Time
                  </p>
                </div>
              </div>
            </motion.div> */}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 pt-8 border-t border-border/30"
          >
            <p className="text-sm text-muted-foreground mb-6">
              Trusted by leading law firms and legal institutions
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
              {[
                "Morrison & Partners",
                "Legal Corp",
                "Justice Hub",
                "LawTech Inc",
                "Court Systems",
              ].map((name) => (
                <span
                  key={name}
                  className="text-sm font-medium text-muted-foreground"
                >
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
