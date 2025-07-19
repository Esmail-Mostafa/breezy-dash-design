import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import React from "react";
import { lazy } from "react";
import { GridLoader } from "react-spinners";
import AuthGuard from "./garuds/authGarud";

const queryClient = new QueryClient();
const Index = lazy(() => import("./pages/Index"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Users = lazy(() => import("./pages/Users"));
const Products = lazy(() => import("./pages/Products"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const ViewProduct = lazy(() => import("./pages/ViewProduct"));
const Orders = lazy(() => import("./pages/Orders"));
const Revenue = lazy(() => import("./pages/Revenue"));
const Reports = lazy(() => import("./pages/Reports"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AddUser = lazy(() => import("./pages/adduser"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Cart = lazy(() => import("./pages/Cart"));
const Settings = lazy(() => import("./pages/Settings"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="dashboard-ui-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* ✅ Suspense needed to show fallback while loading pages */}
          <React.Suspense fallback={<GridLoader color="#000" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/analytics" element={<AuthGuard><Analytics /></AuthGuard>} />
              <Route path="/users" element={<AuthGuard><Users /></AuthGuard>} />
              <Route path="/products" element={<AuthGuard><Products /></AuthGuard>} />
              <Route path="/products/add" element={<AuthGuard><AddProduct /></AuthGuard>} />
              <Route path="/products/edit/:id" element={<AuthGuard><AddProduct /></AuthGuard>} />
              <Route path="/products/view/:id" element={<AuthGuard><ViewProduct /></AuthGuard>} />
              <Route path="/orders" element={<AuthGuard><Orders /></AuthGuard>} />
              <Route path="/revenue" element={<AuthGuard><Revenue /></AuthGuard>} />
              <Route path="/reports" element={<AuthGuard><Reports /></AuthGuard>} />
              <Route path="/users/add" element={<AuthGuard><AddUser /></AuthGuard>} />
              <Route path="/favorites" element={<AuthGuard><Favorites /></AuthGuard>} />
              <Route path="/cart" element={<AuthGuard><Cart /></AuthGuard>} />
              <Route path="/settings" element={<AuthGuard><Settings /></AuthGuard>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </React.Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
