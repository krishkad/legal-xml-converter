"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
// import { useToast } from '@/hooks/use-toast'

const SubscriptionSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //   const { toast } = useToast()

  const trustedUsers = [
    { initials: "JD", color: "bg-purple-500" },
    { initials: "SM", color: "bg-blue-500" },
    { initials: "AK", color: "bg-pink-500" },
    { initials: "RJ", color: "bg-green-500" },
    { initials: "MH", color: "bg-orange-500" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      //   toast({
      //     title: "Email required",
      //     description: "Please enter your email address.",
      //     variant: "destructive"
      //   })
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      //   toast({
      //     title: "Invalid email",
      //     description: "Please enter a valid email address.",
      //     variant: "destructive"
      //   })
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      //   toast({
      //     title: "Successfully subscribed!",
      //     description: "Thank you for joining our newsletter.",
      //   })
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <section className="py-20 gradient-hero-glass">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-scale-in">
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              You&apos;re All Set!
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Thanks for subscribing! We&apos;ll keep you updated on new
              features and improvements.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setIsSubmitted(false);
                setEmail("");
              }}
            >
              Subscribe Another Email
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 gradient-hero-glass">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-in-up px-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6">
            <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
            <span className="text-primary font-medium text-sm sm:text-base">
              Stay Updated
            </span>
          </div>

          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Stay in the{" "}
            <span className="bg-gradient-to-br from-primary to-blue-600 bg-clip-text text-transparent">
              Loop
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto">
            Get notified about new features, improvements, and exclusive tips
            for better document conversion workflows.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div
              className="flex flex-col sm:flex-row gap-3 mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 sm:h-12 text-sm sm:text-base bg-background"
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-11 sm:h-12 px-6 sm:px-8 w-full sm:w-auto"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                ) : (
                  "Subscribe"
                )}
              </Button>
            </div>
          </form>

          <p
            className="text-sm text-muted-foreground animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>

          {/* Social Proof */}
          <div
            className="mt-8 sm:mt-12 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
              Join 5,000+ developers already subscribed
            </p>
            <div className="flex justify-center items-center -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-6 sm:w-10 h-6 sm:h-10 bg-gradient-to-r from-primary/20 to-primary-glow/20 rounded-full border-2 border-primary/10 overflow-hidden"
                >
                  <Image
                    src={`/images/users/user-${i + 1}.jpg`}
                    width={0}
                    height={0}
                    unoptimized
                    className="w-full h-full object-cover"
                    alt="user"
                  />
                </div>
              ))}
              <span className="ml-4 text-xs sm:text-sm text-muted-foreground">
                +5K more
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;
