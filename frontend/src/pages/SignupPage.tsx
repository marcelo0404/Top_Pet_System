import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff } from "@/components/ui/lucide-icons";
import petOwner from "@/assets/pet-owner.jpg";

const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup attempt:", { firstName, lastName, email, password, acceptTerms, newsletter });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-variant to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Pet Journey */}
        <div className="hidden lg:block">
          <div className="text-center text-white space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold leading-tight">
                A jornada do seu pet começa aqui
              </h2>
              <p className="text-xl text-white/90 leading-relaxed">
                Gerencie consultas, registros médicos e serviços para seus 
                amados pet, tudo em um só lugar. Junte-se à PET TOP hoje 
                mesmo!
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="w-160 h-80 rounded-2xl overflow-hidden shadow-elegant">
                <img 
                  src={petOwner} 
                  alt="Cachorro" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Signup Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <Card className="shadow-elegant border-white/20 bg-white/95 backdrop-blur-sm px-8 py-10 rounded-md">
            <CardHeader className="text-center space-y-6">
              <div>
                <CardTitle className="text-3xl font-bold text-primary mb-2">
                  Criar sua conta
                </CardTitle>
                <CardDescription className="text-muted-foreground text-lg py-4">
                  Junte-se à nossa comunidade e gerencie os serviços do seu pet com facilidade.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 flex flex-col">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-foreground font-medium">
                      Primeiro Nome
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Seu primeiro nome"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="h-12 border-input focus:border-primary transition-colors"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 flex flex-col">
                    <Label htmlFor="lastName" className="text-foreground font-medium">
                      Segundo Nome
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Seu segundo nome"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="h-12 border-input focus:border-primary transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2 flex flex-col">
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Seu_email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 border-input focus:border-primary transition-colors"
                    required
                  />
                </div>
                
                <div className="space-y-2 flex flex-col">
                  <Label htmlFor="password" className="text-foreground font-medium">
                    Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Defina uma senha forte"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 border-input focus:border-primary transition-colors pr-12"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">8 ou mais caracteres</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      Eu aceito os{" "}
                      <Link to="#" className="text-primary hover:underline">
                        Termos de Serviço
                      </Link>
                      {" "}e{" "}
                      <Link to="#" className="text-primary hover:underline">
                        Políticas de Privacidade
                      </Link>
                    </Label>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="newsletter" className="text-sm">
                      Assine nossa newsletter para receber dicas sobre cuidados com seu Pet
                    </Label>
                    <Switch
                      id="newsletter"
                      checked={newsletter}
                      onCheckedChange={setNewsletter}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-lg bg-gradient-primary hover:opacity-90 transition-all duration-300 text-white font-semibold shadow-glow"
                  disabled={!acceptTerms}
                >
                  Criar Conta
                </Button>
              </form>

              <div className="text-center">
                <p className="text-muted-foreground">
                  Já possui uma conta?{" "}
                  <Link to="/" className="text-primary font-semibold hover:underline">
                    Log In
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;