import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getPets } from "@/services/petService";
import { login } from "@/services/authService";

const GerenciarPerfil = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  // Função utilitária para obter o username salvo no login
  function obterUsername() {
    return localStorage.getItem("username") || "";
  }

  useEffect(() => {
    async function fetchPets() {
      try {
        // Busca o token salvo no login
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Usuário não autenticado");
        const petsBackend = await getPets(token);
        // Filtra apenas os pets do usuário logado
        const username = obterUsername();
        const petsFiltrados = petsBackend.filter(
          (pet: any) => pet.tutor_detail && pet.tutor_detail.username === username
        );
        setPets(petsFiltrados);
      } catch {
        setPets([]);
      }
    }
    fetchPets();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Usuário não autenticado");
        const res = await fetch("http://localhost:8000/api/me/", {
          headers: { Authorization: `Token ${token}` }
        });
        if (!res.ok) throw new Error("Erro ao buscar usuário");
        const data = await res.json();
        setUser(data);
      } catch {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  // Função para atualizar dados do usuário
  async function atualizarUsuario(campos: any) {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");
      const res = await fetch("http://localhost:8000/api/me/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        },
        body: JSON.stringify(campos)
      });
      if (!res.ok) throw new Error("Erro ao atualizar usuário");
      const data = await res.json();
      setUser(data);
      return true;
    } catch {
      return false;
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard")}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <h1 className="text-xl font-semibold">Gerenciar Perfil</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar - User Profile */}
          <div className="w-80">
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="w-32 h-32 mx-auto mb-4">
                  <AvatarImage src="/lovable-uploads/979dc6ef-db07-4e5f-8725-5a6538d20028.png" />
                  <AvatarFallback>BO</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold mb-2">
                  {user ? `${user.first_name} ${user.last_name}` : "Usuário"}
                </h2>
                <Badge variant="secondary" className="mb-4">
                  {user?.profile?.role_display || "CLIENTE"}
                </Badge>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Membro desde: Dezembro de 2022</p>
                  <p>Total de Pets Registrados: {pets.length}</p>
                </div>
                <Button variant="outline" className="mt-4 w-full" size="sm">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">Informações Pessoais</TabsTrigger>
                <TabsTrigger value="pets">Meus Pets</TabsTrigger>
                <TabsTrigger value="security">Segurança</TabsTrigger>
              </TabsList>

              {/* Informações Pessoais Tab */}
              <TabsContent value="info" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const formData = new FormData(form);
                      const campos: any = {
                        first_name: formData.get("nome")?.toString().split(" ")[0] || "",
                        last_name: formData.get("nome")?.toString().split(" ").slice(1).join(" ") || "",
                        email: formData.get("email") || "",
                        profile: {
                          telefone: formData.get("telefone") || "",
                          endereco: formData.get("endereco") || "",
                          especialidade: formData.get("bio") || ""
                        }
                      };
                      await atualizarUsuario(campos);
                    }}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 flex flex-col">
                        <Label htmlFor="nome">Nome Completo</Label>
                        <Input id="nome" name="nome" defaultValue={user ? `${user.first_name} ${user.last_name}` : ""} />
                      </div>
                      <div className="space-y-2 flex flex-col">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" defaultValue={user?.email || ""} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 flex flex-col">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input id="telefone" name="telefone" defaultValue={user?.profile?.telefone || ""} />
                      </div>
                      <div className="space-y-2 flex flex-col">
                        <Label htmlFor="pais">País</Label>
                        <Input id="pais" name="pais" value="Brasil" readOnly />
                      </div>
                    </div>

                    <div className="space-y-2 flex flex-col">
                      <Label htmlFor="estado">Estado</Label>
                      <Input id="estado" name="estado" defaultValue={user?.profile?.endereco || ""} />
                    </div>

                    <div className="space-y-2 flex flex-col">
                      <Label htmlFor="endereco">Endereço Completo</Label>
                      <Input id="endereco" name="endereco" defaultValue={user?.profile?.endereco || ""} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio / Sobre Mim</Label>
                      <Textarea 
                        id="bio" 
                        name="bio"
                        rows={4}
                        defaultValue={user?.profile?.especialidade || ""}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button className="rounded-md p-3 bg-[#FF6B47] hover:bg-[#E55A3E] text-white" type="submit">
                        Salvar Alterações
                      </Button>
                    </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Meus Pets Tab */}
              <TabsContent value="pets" className="mt-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Meus Pets</h2>
                  <Button 
                    onClick={() => navigate("/cadastrar-pet")}
                    className="rounded-md p-3 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {/*<Plus className="h-4 w-4 mr-2" />*/}
                    Add Novo Pet
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pets.map((pet) => (
                    <Card key={pet.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                          <img 
                            src={pet.foto || pet.image || "/img/pet-placeholder.png"} 
                            alt={pet.nome || pet.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="text-center">
                          <h3 className="font-semibold text-lg mb-1">{pet.nome || pet.name}</h3>
                          <p className="text-sm text-muted-foreground mb-1">
                            {(pet.especie || pet.species) + ' - ' + (pet.raca || pet.breed)}
                          </p>
                          <p className="text-sm text-muted-foreground mb-3">{pet.idade || pet.age}</p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => navigate(`/gerenciar-pet/${pet.id}`)}
                          >
                            Ver Perfil →
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Segurança Tab */}
              <TabsContent value="security" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Segurança</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2 flex flex-col">
                      <Label htmlFor="current-password">Senha Atual</Label>
                      <Input id="current-password" type="password" />
                    </div>

                    <div className="space-y-2 flex flex-col">
                      <Label htmlFor="new-password">Nova Senha</Label>
                      <Input id="new-password" type="password" />
                    </div>

                    <div className="space-y-2 flex flex-col">
                      <Label htmlFor="confirm-password">Confirmar Senha</Label>
                      <Input id="confirm-password" type="password" />
                    </div>

                    <div className="flex justify-end ">
                      <Button className="rounded-md p-3 bg-[#FF6B47] hover:bg-[#E55A3E] text-white">
                        Salvar Alterações
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GerenciarPerfil;