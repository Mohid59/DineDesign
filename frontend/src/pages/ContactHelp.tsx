import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ContactHelp = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container py-20 md:py-24">
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 shadow-card md:p-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Contact & Help</p>
        <h1 className="mt-3 text-3xl font-bold font-display md:text-4xl">We're here to help you quickly</h1>
        <p className="mt-4 text-muted-foreground">
          For support, project discussions, or account-related questions, please email us with clear details so we can assist you
          efficiently.
        </p>

        <div className="mt-8 rounded-xl border border-border bg-secondary/40 p-5">
          <p className="text-sm text-muted-foreground">Support Email</p>
          <a className="mt-1 inline-block text-lg font-semibold text-primary hover:underline" href="mailto:fa7793876@gmail.com">
            fa7793876@gmail.com
          </a>
        </div>

        <div className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold">Guidelines for faster support</h2>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Use a clear subject line, such as "Pricing question" or "Template issue".</li>
            <li>Include your name, business name, and the page or feature you are referring to.</li>
            <li>Share screenshots or exact error messages when reporting a problem.</li>
            <li>For urgent requests, mention the expected deadline in your email.</li>
          </ul>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default ContactHelp;
