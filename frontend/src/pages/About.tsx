import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container py-20 md:py-24">
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-8 shadow-card md:p-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">About DineDesign</p>
        <h1 className="mt-3 text-3xl font-bold font-display md:text-4xl">Building digital growth for food businesses in Pakistan</h1>
        <p className="mt-6 leading-8 text-muted-foreground">
          DineDesign is a Pakistan-first SaaS platform built to give restaurants, cafes, bakeries, tea houses, ice cream shops,
          and fast food outlets a powerful digital presence - without the need for any technical expertise. Simply pick a template
          tailored to your business type, customize it your way using our AI-powered design assistant or intuitive drag-and-drop
          editor, set up an AI chatbot that answers your customers' questions around the clock, and go live in minutes. With full
          support for local payment methods including JazzCash and Easypaisa, and flexible one-time or subscription plans, DineDesign
          makes owning a professional website affordable and accessible for every food business in Pakistan.
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default About;
