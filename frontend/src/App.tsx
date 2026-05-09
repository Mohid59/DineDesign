import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import AIChatbot from "@/components/AIChatbot";
import RequireRole from "@/components/RequireRole";
import Index from "./pages/Index.tsx";
import Marketplace from "./pages/Marketplace.tsx";
import TemplatePreview from "./pages/TemplatePreview.tsx";
import Auth from "./pages/Auth.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import ClientDashboard from "./pages/ClientDashboard.tsx";
import Checkout from "./pages/Checkout.tsx";
import Cart from "./pages/Cart.tsx";
import OrderSuccess from "./pages/OrderSuccess.tsx";
import ContactHelp from "./pages/ContactHelp.tsx";
import About from "./pages/About.tsx";
import AdminOrders from "./pages/AdminOrders.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/preview/:id" element={<TemplatePreview />} />
            <Route
              path="/checkout/:id"
              element={
                <RequireRole allowed={["client"]}>
                  <Checkout />
                </RequireRole>
              }
            />
            <Route
              path="/cart"
              element={
                <RequireRole allowed={["client"]}>
                  <Cart />
                </RequireRole>
              }
            />
            <Route
              path="/order-success"
              element={
                <RequireRole allowed={["client"]}>
                  <OrderSuccess />
                </RequireRole>
              }
            />
            <Route path="/auth" element={<Auth />} />
            <Route path="/contact-help" element={<ContactHelp />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/admin"
              element={
                <RequireRole allowed={["admin"]}>
                  <AdminDashboard />
                </RequireRole>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <RequireRole allowed={["admin"]}>
                  <AdminOrders />
                </RequireRole>
              }
            />
            <Route
              path="/dashboard"
              element={
                <RequireRole allowed={["client"]}>
                  <ClientDashboard />
                </RequireRole>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AIChatbot />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
