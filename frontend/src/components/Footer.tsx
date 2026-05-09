import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-secondary/50 py-12">
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link to="/" className="text-lg font-bold font-display flex items-center gap-2">
            <span className="bg-hero-gradient rounded-lg px-2 py-1 text-primary-foreground text-xs font-sans font-bold">DD</span>
            DineDesign
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            Beautiful restaurant website templates, ready to launch in minutes.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Product</h4>
          <div className="space-y-2">
            <Link to="/marketplace" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Templates</Link>
            <Link to="/#pricing" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Company</h4>
          <div className="space-y-2">
            <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
            <Link to="/contact-help" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Contact/Help</Link>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
        © 2026 DineDesign. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
