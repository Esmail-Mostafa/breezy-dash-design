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
import { Provider } from "react-redux";
import { store } from "./services/redex/store";
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
  <Provider store={store}>
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
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/users" element={<Users />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/add" element={<AddProduct />} />
              <Route path="/products/edit/:id" element={<AddProduct />} />
              <Route path="/products/view/:id" element={<ViewProduct />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/revenue" element={<Revenue />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/users/add" element={<AddUser />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </React.Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
  </Provider>
);

export default App;
