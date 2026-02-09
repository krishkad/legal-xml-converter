"use client";


import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Phone,
  Clock,
  CheckCircle,
  FileText,
  Users
} from "lucide-react";

const faqs = [
  {
    question: "What file types can I upload?",
    answer: "We support PDF, JPG, PNG, and JPEG files. The maximum file size is 10MB per file. For best results, ensure your documents are clear and legible."
  },
  {
    question: "How long does the conversion process take?",
    answer: "Most documents are converted within 5-10 seconds. Larger files or files with complex formatting may take up to 30 seconds. Premium users get priority processing."
  },
  {
    question: "Is my data secure and private?",
    answer: "Yes, we take security seriously. All uploads are encrypted, processed securely, and automatically deleted from our servers after 24 hours. We never share your documents with third parties."
  },
  {
    question: "What does the XML output look like?",
    answer: "Our XML output is structured with clear metadata, party information, clauses, signatures, and other legal document elements. You can preview the XML before downloading."
  },
  {
    question: "Can I integrate this with my legal workflow tool?",
    answer: "Yes! Pro and Agency plans include API access for seamless integration with your existing tools. Contact our support team for integration assistance."
  },
  {
    question: "How do I cancel or change my subscription?",
    answer: "You can manage your subscription anytime from the Subscription page in your dashboard. Changes take effect at the next billing cycle."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact support for a full refund within 30 days of purchase."
  },
  {
    question: "Can I convert multiple documents at once?",
    answer: "Pro users can upload up to 5 files at once, while Agency users can upload up to 50 files for bulk conversion. Free users can convert one file at a time."
  }
];

const supportTickets = [
  {
    id: "TKT-001",
    subject: "Conversion failed for large PDF",
    status: "open",
    priority: "high",
    date: "2024-01-15",
    lastUpdate: "2 hours ago"
  },
  {
    id: "TKT-002",
    subject: "API integration question",
    status: "resolved",
    priority: "medium",
    date: "2024-01-12",
    lastUpdate: "3 days ago"
  },
  {
    id: "TKT-003",
    subject: "Billing inquiry",
    status: "pending",
    priority: "low",
    date: "2024-01-10",
    lastUpdate: "5 days ago"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "open":
      return <Badge variant="destructive">Open</Badge>;
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
    case "resolved":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Resolved</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return <Badge variant="destructive">{priority}</Badge>;
    case "medium":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{priority}</Badge>;
    case "low":
      return <Badge variant="outline">{priority}</Badge>;
    default:
      return <Badge variant="secondary">{priority}</Badge>;
  }
};

export default function Support() {
//   const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    subject: "",
    priority: "",
    category: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // toast({
    //   title: "Support ticket created",
    //   description: "We'll get back to you within 24 hours.",
    // });
    setContactForm({ subject: "", priority: "", category: "", message: "" });
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support & Help</h1>
          <p className="text-muted-foreground">
            Get help with your account and find answers to common questions
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-background">
            <CardContent className="pt-0">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Live Chat</h3>
                  <p className="text-sm text-muted-foreground">Chat with our support team</p>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-background">
            <CardContent className="pt-0">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Email Support</h3>
                  <p className="text-sm text-muted-foreground">Send us an email</p>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                Send Email
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-background">
            <CardContent className="pt-0">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Documentation</h3>
                  <p className="text-sm text-muted-foreground">Browse our guides</p>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                View Docs
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Contact Form */}
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Create Support Ticket
              </CardTitle>
              <CardDescription>
                Describe your issue and we&apos;ll help you resolve it
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select 
                      value={contactForm.priority} 
                      onValueChange={(value) => setContactForm(prev => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={contactForm.category} 
                      onValueChange={(value) => setContactForm(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conversion">Conversion Issues</SelectItem>
                        <SelectItem value="billing">Billing & Subscription</SelectItem>
                        <SelectItem value="api">API & Integration</SelectItem>
                        <SelectItem value="account">Account & Settings</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Please describe your issue in detail..."
                    className="min-h-[100px]"
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Ticket
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Recent Tickets */}
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Your Recent Tickets
              </CardTitle>
              <CardDescription>
                Track the status of your support requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportTickets.map((ticket) => (
                  <div key={ticket.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{ticket.id}</span>
                      <div className="flex items-center gap-2">
                        {getPriorityBadge(ticket.priority)}
                        {getStatusBadge(ticket.status)}
                      </div>
                    </div>
                    <h4 className="font-medium mb-1">{ticket.subject}</h4>
                    <p className="text-xs text-muted-foreground">
                      Created {ticket.date} • Last update: {ticket.lastUpdate}
                    </p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Tickets
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Find quick answers to common questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Other ways to reach our support team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-muted-foreground">support@legalxml.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri: 9AM-6PM EST</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Response Time</p>
                  <p className="text-sm text-muted-foreground">Within 24 hours</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}