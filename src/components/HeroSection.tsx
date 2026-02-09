"use client"

import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Zap, Shield, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center gradient-hero relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-12 items-center max-sm:pt-28">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in-up ">
            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4 sm:mb-6">
              Convert Your Documents to{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                XML
              </span>{" "}
              — Instantly
              {/* & Securely */}
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
              A beautiful, private, and ultra-fast tool to turn PDFs, DOCX, and
              TXT files into structured XML. No coding required, no files
              stored.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 justify-center lg:justify-start px-4 sm:px-0">
              <div className="flex items-center gap-2 bg-primary/5 px-3 sm:px-4 py-2 rounded-full">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-xs sm:text-sm font-medium">
                  Lightning Fast
                </span>
              </div>
              <div className="flex items-center gap-2 bg-primary/5 px-3 sm:px-4 py-2 rounded-full">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-xs sm:text-sm font-medium">
                  100% Private
                </span>
              </div>
              <div className="flex items-center gap-2 bg-primary/5 px-3 sm:px-4 py-2 rounded-full">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-xs sm:text-sm font-medium">
                  Instant Results
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-4 sm:px-0">
              <Button
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto w-full sm:w-auto"
                onClick={() => router.push("/dashboard/upload")}
              >
                Try it Now
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto w-full sm:w-auto"
              >
                <Play className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div
            className="relative animate-fade-in-up "
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative max-w-lg mx-auto lg:max-w-none">
              <img
                src={"/hero-image.jpg"}
                alt="Document to XML conversion illustration"
                className="w-full h-auto rounded-2xl shadow-card animate-float"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-2xl" /> */}
            </div>

            {/* Floating Elements - Hidden on very small screens */}
            <div className="absolute -top-3 sm:-top-6 -left-3 sm:-left-6 bg-background shadow-card rounded-xl p-2 sm:p-4 animate-float hidden sm:block">
              <div className="flex items-center gap-2">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-foreground">
                  Processing...
                </span>
              </div>
            </div>

            <div
              className="absolute -bottom-3 sm:-bottom-6 -right-3 sm:-right-6 bg-background shadow-card rounded-xl p-2 sm:p-4 animate-float hidden sm:block"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-primary rounded-full" />
                <span className="text-xs sm:text-sm font-medium text-foreground">
                  XML Ready!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
