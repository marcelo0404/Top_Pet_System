import { Toaster } from "@/components/ui/toaster";
import { Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import SignupPage from "./pages/SignupPage";
import DashboardCliente from "./pages/DashboardCliente";
import AgendarServico from "./pages/AgendarServico";
import CadastrarPet from "./pages/CadastrarPet";
import DashboardVeterinario from "./pages/DashboardVeterinario";
import GerenciarPet from "./pages/GerenciarPet";
import GerenciarPerfil from "./pages/GerenciarPerfil";
import PainelAdmin from "./pages/PainelAdmin";
import GestaoServicos from "./pages/GestaoServicos";
import { AuthProvider } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<DashboardCliente />} />
            <Route path="/agendar" element={<AgendarServico />} />
            <Route path="/veterinario" element={<DashboardVeterinario />} />
            <Route path="/gerenciar-pet/:id" element={<GerenciarPet />} />
            <Route path="/cadastrar-pet" element={<CadastrarPet />} />
            <Route path="/gerenciar-perfil" element={<GerenciarPerfil />} />
            <Route path="/admin" element={<PainelAdmin />} />
            <Route path="/gestao-servicos" element={<GestaoServicos />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;