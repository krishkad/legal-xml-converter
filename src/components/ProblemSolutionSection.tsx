import {
  Code,
  Clock,
  Zap,
  CheckCircle,
  FileText,
  FileCode,
} from "lucide-react";

const ProblemSolutionSection = () => {
  const problems = [
    {
      icon: Clock,
      title: "Time-Consuming Manual Work",
      description:
        "Hours spent manually formatting and restructuring documents",
    },
    {
      icon: Code,
      title: "Complex Coding Requirements",
      description:
        "Need programming knowledge to write custom conversion scripts",
    },
    {
      icon: FileText,
      title: "Inconsistent Results",
      description:
        "Human errors and varying formats lead to unreliable outputs",
    },
  ];

  const solutions = [
    {
      icon: Zap,
      title: "Instant Conversion",
      description: "Transform any document to XML in seconds, not hours",
    },
    {
      icon: CheckCircle,
      title: "No Coding Needed",
      description: "Simple drag-and-drop interface anyone can use",
    },
    {
      icon: FileCode,
      title: "Perfect Structure",
      description: "Consistent, well-formatted XML output every time",
    },
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up px-4">
          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Manual Conversion is{" "}
            <span className="bg-gradient-to-r from-destructive to-destructive/70 bg-clip-text text-transparent">
              Tedious
            </span>
            . We Fixed That.
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Stop wasting time on repetitive document conversion tasks. Our
            intelligent system automates the entire process while maintaining
            perfect accuracy.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Problems */}
          <div className="animate-fade-in-up">
            <div className="text-center lg:text-left mb-6 sm:mb-8 px-4 sm:px-0">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
                The Old Way
              </h3>
              <p className="text-muted-foreground">
                Traditional document conversion is slow, error-prone, and
                requires technical expertise.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
              {problems.map((problem, index) => (
                <div
                  key={index}
                  className="flex gap-3 sm:gap-4 p-4 sm:p-6 bg-destructive/5 border border-destructive/20 rounded-xl"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                      <problem.icon className="w-5 sm:w-6 h-5 sm:h-6 text-destructive" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-foreground mb-0.5 text-sm sm:text-base">
                      {problem.title}
                    </h4>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div
            className="animate-fade-in-up mt-8 lg:mt-0"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="text-center lg:text-left mb-6 sm:mb-8 px-4 sm:px-0">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
                The <span className="bg-gradient-to-br from-primary to-blue-600 bg-clip-text text-transparent">Court XML</span> Way
              </h3>
              <p className="text-muted-foreground">
                Smart, automated conversion that delivers perfect results every
                time.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="flex gap-3 sm:gap-4 p-4 sm:p-6 bg-primary/5 border border-primary/50 rounded-xl shadow-primary hover:shadow-primary transition-smooth"
                  style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <solution.icon className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-foreground mb-0.5 text-sm sm:text-base">
                      {solution.title}
                    </h4>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      {solution.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          className="mt-12 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 animate-fade-in-up px-4 sm:px-0"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-primary to-blue-600 bg-clip-text text-transparent mb-1 sm:mb-2">
              99.9%
            </div>
            <div className="text-muted-foreground text-sm sm:text-base">
              Accuracy Rate
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-primary to-blue-600 bg-clip-text text-transparent mb-1 sm:mb-2">
              &lt; 5s
            </div>
            <div className="text-muted-foreground text-sm sm:text-base">
              Conversion Time
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-primary to-blue-600 bg-clip-text text-transparent mb-1 sm:mb-2">
              10K+
            </div>
            <div className="text-muted-foreground text-sm sm:text-base">
              Files Converted
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-primary to-blue-600 bg-clip-text text-transparent mb-1 sm:mb-2">
              0
            </div>
            <div className="text-muted-foreground text-sm sm:text-base">
              Files Stored
            </div>
          </div>


          
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
