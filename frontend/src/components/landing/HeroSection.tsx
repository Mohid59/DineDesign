import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import heroImage from "@/assets/hero-restaurant.jpg";

const HeroSection = () => {
  const { user, role } = useAuth();

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
    {/* Background glow */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
    </div>

    <div className="container">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Sparkles className="h-4 w-4" />
            Launch your restaurant online
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight">
            Build Your Restaurant Website{" "}
            <span className="text-gradient">in Minutes</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
            Choose from beautifully designed templates, customize your brand, and launch faster.
            Manage orders, reservations, and local payments from one modern website experience.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-hero-gradient text-primary-foreground hover:opacity-90 shadow-lg">
              <Link to="/marketplace">
                Browse Templates
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {user ? (
              <Button asChild variant="outline" size="lg">
                <Link to={role === "admin" ? "/admin" : "/dashboard"}>
                  {role === "admin" ? "Go to Admin dashboard" : "Go to Dashboard"}
                </Link>
              </Button>
            ) : (
              <Button asChild variant="outline" size="lg">
                <Link to="/auth">Create Account</Link>
              </Button>
            )}
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">✓ No coding required</span>
            <span className="flex items-center gap-1.5">✓ Local payments</span>
            <span className="flex items-center gap-1.5">✓ Ready in minutes</span>
          </div>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="relative rounded-2xl overflow-hidden shadow-elevated">
            <img
              src={heroImage}
              alt="Beautiful restaurant interior with warm ambient lighting"
              width={1920}
              height={1080}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default HeroSection;
