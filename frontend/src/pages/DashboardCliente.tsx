import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Heart, PawPrint, Calendar as CalendarIcon, Clock, User, Phone, Mail, MapPin, ArrowRight, Plus } from "@/components/ui/lucide-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardCliente = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();

  // Dados mock para demonstração
  const stats = {
    totalPets: 3,
    proximosCompromissos: 2,
    servicosRecentes: 5
  };

  const proximosCompromissos = [
    {
      id: 1,
      petName: "Buddy",
      service: "Consulta",
      date: "15, Dezembro, 2024",
      time: "10:00",
      veterinario: "Dr. Smith",
      status: "agendado"
    },
    {
      id: 2,
      petName: "Whiskers",
      service: "Vacinação",
      date: "8, Janeiro, 2025",
      time: "14:30",
      veterinario: "Dr. Lee",
      status: "agendado"
    }
  ];

  const pets = [
    {
      id: 1,
      name: "Buddy",
      species: "Cão",
      breed: "Golden Retriever",
      age: "3 Anos",
      image: "/lovable-uploads/979dc6ef-db07-4e5f-8725-5a6538d20028.png"
    },
    {
      id: 2,
      name: "Whiskers",
      species: "Gato",
      breed: "Siamês",
      age: "2 Anos",
      image: "/lovable-uploads/979dc6ef-db07-4e5f-8725-5a6538d20028.png"
    },
    {
      id: 3,
      name: "Luna",
      species: "Pássaro",
      breed: "Cockatiel",
      age: "1 Ano",
      image: "/lovable-uploads/979dc6ef-db07-4e5f-8725-5a6538d20028.png"
    }
  ];

  const historicoServicos = [
    {
      id: 1,
      service: "Full Grooming (Buddy)",
      date: "December 10, 2024",
      status: "Completo"
    },
    {
      id: 2,
      service: "Annual Check-up (Whiskers)",
      date: "November 25, 2024",
      status: "Completo"
    },
    {
      id: 3,
      service: "Basic Bath (Luna)",
      date: "October 1, 2024",
      status: "Completo"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center space-x-6">
              <Button variant="ghost" className="text-primary font-medium">
                Cliente
              </Button>
              <Button variant="ghost">Funcionário</Button>
              <Button variant="ghost" onClick={() => navigate("/veterinario")}>Veterinário</Button>
              <Button variant="ghost">Admin</Button>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Search services or pets...
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div 
          className="relative rounded-xl p-8 text-white overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <Heart className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-center mb-2">
              Seja Bem Vindo
            </h1>
            <p className="text-center text-white/90 mb-6">
              Gerencie seus animais de estimação, consulte e serviços em um só lugar.
            </p>
            <div className="flex justify-center">
              <Button 
                variant="outline" 
                className="bg-white/10 p-3 rounded-md border-white/20 text-white hover:bg-white/20"
                onClick={() => navigate("/gerenciar-perfil")}
              >
                Gerenciar perfil
                {/*<ArrowRight className="justify-center ml-2 h-4 w-4" />*/}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Sua visão geral</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <PawPrint className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Pets</p>
                    <p className="text-3xl font-bold">{stats.totalPets}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <CalendarIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Próximos compromissos</p>
                    <p className="text-3xl font-bold">{stats.proximosCompromissos}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Serviços recentes</p>
                    <p className="text-3xl font-bold">{stats.servicosRecentes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Próximos Compromissos */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Próximos compromissos</h2>
                 <Button 
                  size="sm" 
                  className="bg-primary p-2 rounded-md text-white"
                  onClick={() => navigate("/agendar")}
                >
                  Agendar novo
                </Button>
              </div>
              <div className="space-y-4">
                {proximosCompromissos.map((compromisso) => (
                  <Card key={compromisso.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                            <PawPrint className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{compromisso.petName} - {compromisso.service}</h3>
                            <p className="text-sm text-muted-foreground">
                              {compromisso.date} às {compromisso.time}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {compromisso.veterinario}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            Ver Detalhes
                          </Button>
                          <Button variant="ghost" size="sm">
                            Remarcar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Seus Pets */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Seus Pets</h2>
                <Button 
                  size="sm" 
                  className="p-2 rounded-lg bg-primary text-white"
                  onClick={() => navigate("/cadastrar-pet")}
                >              
                  {/*<Plus className="h-4 w-4 mr-2" />*/}
                  Add Novo Pet
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pets.map((pet) => (
                  <Card key={pet.id}>
                    <CardContent className="p-6">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-muted rounded-full mx-auto flex items-center justify-center">
                          <PawPrint className="h-10 w-10 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{pet.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {pet.species} - {pet.breed}
                          </p>
                          <p className="text-sm text-muted-foreground">{pet.age}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => navigate("/gerenciar-pet")}
                        >
                          Ver Perfil
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Histórico de Serviços */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Histórico de Serviços</h2>
                <Button variant="outline" size="sm">
                  Ver Todos
                </Button>
              </div>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {historicoServicos.map((servico) => (
                      <div key={servico.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div>
                            <p className="font-medium">{servico.service}</p>
                            <p className="text-sm text-muted-foreground">{servico.date}</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {servico.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle>Calendário</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle>Contatos de Emergência</CardTitle>
                <CardDescription>
                  Quick access to urgent veterinary care for your pet's well-being.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm">Emergency Vet: 123-456-7890</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm">Support Email: support@saudepetublica.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm">Our Clinic Address: 123 Pet Lane, Animals City</span>
                </div>
                <Button size="sm" className="w-full mt-4">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Newsletter */}
      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-lg font-semibold mb-4">Subscribe to our newsletter</h3>
          <div className="flex justify-center items-center space-x-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Input your email"
              className="flex-1 px-4 py-2 border rounded-md bg-background"
            />
            <Button className="bg-primary text-white">Subscribe</Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardCliente;