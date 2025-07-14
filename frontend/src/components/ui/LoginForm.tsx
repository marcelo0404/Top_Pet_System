import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import drAnaClara from "@/assets/dr-ana-clara.jpeg";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
    // Simular login bem-sucedido
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Login Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <Card className="border-white/20 bg-white/90 backdrop-blur-sm px-8 py-10 rounded-md" style={{ boxShadow: 'var(--shadow-elegant)' }}>
            <CardHeader className="text-center space-y-6">
              <div>
                <CardTitle className="text-3xl font-bold text-primary mb-2">
                  Bem-Vindo(a)
                </CardTitle>
                <CardDescription className="text-muted-foreground text-lg">
                  Entre na sua conta para continuar
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2 flex flex-col">
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder=" seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 border-input rounded-md focus:border-primary transition-colors"
                    required
                  />
                </div>
                
                <div className="space-y-2 flex flex-col">
                  <Label htmlFor=" password" className="text-foreground font-medium">
                    Senha
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder=" ••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 border-input rounded-md focus:border-primary transition-colors"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 hover:opacity-90 rounded-lg transition-all duration-300 text-white font-semibold"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  Entrar
                </Button>
              </form>

              <div className="relative">
                <Separator className="my-6" />
                <span className="absolute left-1/2 rounded-md top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-muted-foreground">
                  ou
                </span>
              </div>

              <div className="text-center">
                <p className="text-muted-foreground">
                  Não tem uma conta?{" "}
                  <Link to="/signup" className="text-primary font-semibold hover:underline">
                    Cadastre-se aqui
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right side - Testimonial */}
        <div className="hidden lg:block">
          <div className="text-center text-white space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold leading-tight">
                "A melhor plataforma para gerenciar minha clínica veterinária"
              </h2>
              <p className="text-xl text-white/90 leading-relaxed">
                Com esta solução, consegui organizar todos os atendimentos, 
                histórico dos pets e manter contato direto com os tutores. 
                Recomendo para todos os colegas veterinários.
              </p>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white/30">
                <img 
                  src={drAnaClara} 
                  alt="Dra. Ana Clara" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-semibold text-lg">Dra. Ana Clara Santos</p>
                <p className="text-white/80">Médica Veterinária</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;