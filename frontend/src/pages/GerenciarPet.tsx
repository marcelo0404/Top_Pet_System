import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Calendar, Plus, Edit, Stethoscope, Droplets, Syringe, TestTube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const GerenciarPet = () => {
  const navigate = useNavigate();

  // Mock data do pet
  const pet = {
    name: "Max",
    species: "Cão",
    breed: "Golden Retriever",
    age: "4 Anos",
    birthDate: "15/03/2021",
    gender: "Macho",
    color: "Dourado",
    weight: "28.5 kg",
    ownerName: "Ana Silva",
    ownerAddress: "Rua das Flores, 123, São Paulo - SP",
    ownerContact: "ana.silva@example.com | (11) 98765-4321",
    observations: "Max é um cão muito dócil e brincalhão. Adora passeios longos e tem boa socialização com outros animais e crianças. Não possui histórico de alergias ou problemas de saúde crônicos.",
    photo: "/lovable-uploads/979dc6ef-db07-4e5f-8725-5a6538d20028.png"
  };

  const agendamentos = [
    {
      id: 1,
      service: "Banho e tosa",
      date: "13/08/2025",
      status: "Pendente",
      icon: Droplets
    },
    {
      id: 2,
      service: "Check-up Anual",
      date: "15/07/2025",
      status: "Realizado",
      icon: Stethoscope
    },
    {
      id: 3,
      service: "Banho Básico",
      date: "13/07/2025",
      status: "Realizado",
      icon: Droplets
    },
    {
      id: 4,
      service: "Vacinação",
      date: "09/07/2025",
      status: "Realizado",
      icon: Syringe
    }
  ];

  const prontuarios = [
    {
      id: 1,
      service: "Vacina Antirrábica",
      date: "13/08/2025",
      status: "Pendente",
      icon: Syringe
    },
    {
      id: 2,
      service: "Exame de Sangue",
      date: "15/07/2025",
      status: "Realizado",
      icon: TestTube
    },
    {
      id: 3,
      service: "Visita ao Médico",
      date: "13/07/2025",
      status: "Realizado",
      icon: Stethoscope
    },
    {
      id: 4,
      service: "Vacina",
      date: "09/07/2025",
      status: "Realizado",
      icon: Syringe
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pendente":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "realizado":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">TOP PET SYSTEM</span>
            </div>
            <div className="flex items-center space-x-6">
              <Button variant="ghost" className="text-primary font-medium" onClick={() => navigate("/dashboard")}>
                Cliente
              </Button>
              <Button variant="ghost">Funcionário</Button>
              <Button variant="ghost" onClick={() => navigate("/veterinario")}>Veterinário</Button>
              <Button variant="ghost">Admin</Button>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Buscar...
              </Button>
              <Button variant="ghost" size="sm">
                🔔
              </Button>
              <Button variant="ghost" size="sm">
                ⚙️
              </Button>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium">U</span>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Pet Info Sidebar */}
          <div className="w-80">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-primary/20 overflow-hidden">
                    <img 
                      src={pet.photo} 
                      alt={pet.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{pet.name}</h2>
                  <div className="space-y-2 text-left">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="text-red-500 mr-2">🐕</span>
                      {pet.species} ( {pet.breed} )
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2 text-red-500" />
                      {pet.age}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue="detalhes" className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList className="grid w-auto grid-cols-3">
                  <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
                  <TabsTrigger value="agendamentos">Agendamentos</TabsTrigger>
                  <TabsTrigger value="prontuario">Prontuários Médicos</TabsTrigger>
                </TabsList>
                <Button>
                  <Calendar className="w-4 h-4 mr-2" />
                  Novo Agendamento
                </Button>
              </div>

              {/* Detalhes Tab */}
              <TabsContent value="detalhes">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Detalhes do Pet</CardTitle>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-muted-foreground mb-1">Nome</h4>
                        <p className="text-lg">{pet.name}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-muted-foreground mb-1">Espécie</h4>
                        <p className="text-lg">{pet.species}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-muted-foreground mb-1">Raça</h4>
                        <p className="text-lg">{pet.breed}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-muted-foreground mb-1">Data de Nascimento</h4>
                        <p className="text-lg">{pet.birthDate}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-muted-foreground mb-1">Gênero</h4>
                        <p className="text-lg">{pet.gender}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-muted-foreground mb-1">Cor</h4>
                        <p className="text-lg">{pet.color}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-muted-foreground mb-1">Nome do Tutor</h4>
                        <p className="text-lg">{pet.ownerName}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-muted-foreground mb-1">Peso</h4>
                        <p className="text-lg">{pet.weight}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-muted-foreground mb-1">Endereço do Tutor</h4>
                        <p className="text-lg">{pet.ownerAddress}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-muted-foreground mb-1">Contato do Tutor</h4>
                        <p className="text-lg">{pet.ownerContact}</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h4 className="font-medium text-muted-foreground mb-3">Observações</h4>
                      <p className="text-base leading-relaxed">{pet.observations}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Agendamentos Tab */}
              <TabsContent value="agendamentos">
                <Card>
                  <CardHeader>
                    <CardTitle>Agendamentos do Pet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {agendamentos.map((agendamento) => {
                        const IconComponent = agendamento.icon;
                        return (
                          <div key={agendamento.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <IconComponent className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">{agendamento.service}</h4>
                                <p className="text-sm text-muted-foreground">{agendamento.date}</p>
                              </div>
                            </div>
                            <Badge className={getStatusColor(agendamento.status)}>
                              {agendamento.status}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-2">Observações</h4>
                      <p className="text-sm text-muted-foreground">
                        Banho e tosa marcado para o dia 13/08/2025.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Prontuário Médico Tab */}
              <TabsContent value="prontuario">
                <Card>
                  <CardHeader>
                    <CardTitle>Histórico de Saúde</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {prontuarios.map((prontuario) => {
                        const IconComponent = prontuario.icon;
                        return (
                          <div key={prontuario.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <IconComponent className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">{prontuario.service}</h4>
                                <p className="text-sm text-muted-foreground">{prontuario.date}</p>
                              </div>
                            </div>
                            <Badge className={getStatusColor(prontuario.status)}>
                              {prontuario.status}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-2">Observações</h4>
                      <p className="text-sm text-muted-foreground">
                        Vacina antirrábica marcada para o dia 13/08/2025.
                      </p>
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

export default GerenciarPet;