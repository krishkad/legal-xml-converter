import { Shield, Lock, Eye, Database, Check } from "lucide-react";

const PrivacySection = () => {
  const features = [
    {
      icon: Database,
      title: "Files Never Stored",
      description:
        "Documents are processed in real-time and immediately discarded.",
    },
    {
      icon: Shield,
      title: "End-to-End Encryption",
      description:
        "All transmissions are secured with industry standard TLS encryption.",
    },
    {
      icon: Eye,
      title: "No Tracking",
      description:
        "We never track or analyze document contents or usage patterns.",
    },
    {
      icon: Lock,
      title: "GDPR Compliant",
      description:
        "Built to comply with strict global data protection regulations.",
    },
  ];

  const certifications = [
    "SOC 2 Type II",
    "GDPR Compliant",
    "ISO 27001",
    "CCPA Compliant",
  ];

  return (
    <section id="privacy" className="py-24 gradient-hero-glass">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Top Header */}
        <div className="text-center mb-20">

          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              Privacy & Security
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Built with{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Zero-Knowledge Privacy
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Lawparser is designed so your documents never leave your control.
            Every file is processed securely and instantly deleted.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* LEFT SIDE — Privacy Features */}
          <div className="space-y-8">

            {features.map((feature, index) => (
              <div key={index} className="flex gap-5 group">

                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

              </div>
            ))}

          </div>

          {/* RIGHT SIDE — Security Panel */}
          <div className="bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-10 shadow-card">

            <h3 className="text-xl font-semibold text-foreground mb-8">
              Secure Processing Flow
            </h3>

            <div className="space-y-6">

              {[
                {
                  step: "01",
                  title: "Encrypted Upload",
                  text: "Files are securely transmitted using TLS encryption.",
                },
                {
                  step: "02",
                  title: "Memory Processing",
                  text: "Documents are processed directly in memory.",
                },
                {
                  step: "03",
                  title: "Instant Deletion",
                  text: "All file data is permanently removed after processing.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">

                  <div className="text-primary font-bold text-sm bg-primary/10 px-3 py-1 rounded-full">
                    {item.step}
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">
                      {item.title}
                    </h4>

                    <p className="text-muted-foreground text-sm">
                      {item.text}
                    </p>
                  </div>

                </div>
              ))}

            </div>

            {/* Divider */}
            <div className="border-t border-border my-8" />

            {/* Certifications */}
            <div>

              <p className="text-sm text-muted-foreground mb-4">
                Security Certifications
              </p>

              <div className="flex flex-wrap gap-3">

                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-primary/5 border border-border px-3 py-1.5 rounded-full"
                  >
                    <Check className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-medium text-foreground">
                      {cert}
                    </span>
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default PrivacySection;