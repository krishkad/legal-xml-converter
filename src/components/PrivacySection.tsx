import { Shield, Lock, Eye, Database, Check } from "lucide-react";

const PrivacySection = () => {
  const features = [
    {
      icon: Database,
      title: "Files Never Stored",
      description:
        "Your documents are processed in real-time and immediately discarded. Zero data retention.",
      highlight: "In-Memory Only",
    },
    {
      icon: Shield,
      title: "End-to-End Encryption",
      description:
        "All data transmission is encrypted using industry-standard TLS protocols.",
      highlight: "Bank-Level Security",
    },
    {
      icon: Eye,
      title: "No Tracking",
      description:
        "We don't track, store, or analyze your usage patterns or document content.",
      highlight: "Complete Privacy",
    },
    {
      icon: Lock,
      title: "GDPR Compliant",
      description:
        "Fully compliant with European data protection regulations and privacy laws.",
      highlight: "Legal Compliance",
    },
  ];

  const certifications = [
    "SOC 2 Type II",
    "GDPR Compliant",
    "ISO 27001",
    "CCPA Compliant",
  ];

  return (
    <section id="privacy" className="py-20 gradient-hero-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up px-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6">
            <Shield className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
            <span className="text-foreground font-medium text-sm sm:text-base">
              Privacy First
            </span>
          </div>

          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Built with{" "}
            <span className="bg-gradient-to-br from-primary to-blue-600 bg-clip-text text-transparent">
              Privacy First
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Your documents and data are sacred. We&apos;ve designed lawparser
            with zero-knowledge architecture to ensure complete privacy and
            security.
          </p>
        </div>

        {/* Privacy Features Grid */}
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 px-4 sm:px-0">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background p-6 sm:p-8 rounded-2xl shadow-card hover:shadow-glow transition-smooth animate-fade-in-up border"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 sm:w-7 h-6 sm:h-7 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">
                      {feature.title}
                    </h3>
                    <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full self-start">
                      {feature.highlight}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security Process */}
        <div
          className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border/50 animate-fade-in-up mx-4 sm:mx-0"
          style={{ animationDelay: "0.4s" }}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 text-center">
            How We Protect Your Data
          </h3>

          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl sm:text-2xl font-bold text-primary">
                  1
                </span>
              </div>
              <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">
                Encrypted Upload
              </h4>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Your file is encrypted during transmission using TLS 1.3
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl sm:text-2xl font-bold text-primary">
                  2
                </span>
              </div>
              <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">
                In-Memory Processing
              </h4>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Conversion happens in memory, never touching permanent storage
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl sm:text-2xl font-bold text-primary">
                  3
                </span>
              </div>
              <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">
                Immediate Deletion
              </h4>
              <p className="text-muted-foreground text-xs sm:text-sm">
                All data is purged from memory after conversion
              </p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div
          className="text-center mt-12 sm:mt-16 animate-fade-in-up px-4 sm:px-0"
          style={{ animationDelay: "0.6s" }}
        >
          <p className="text-muted-foreground mb-4 sm:mb-6">
            Certified and Compliant
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-background/60 px-3 sm:px-4 py-2 rounded-full border border-border/50"
              >
                <Check className="w-3 sm:w-4 h-3 sm:h-4 text-primary" />
                <span className="text-xs sm:text-sm font-medium text-foreground">
                  {cert}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacySection;
