import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, Edit, Trash2, Plus, Search, Users, PawPrint, UserCheck, UserX } from "lucide-react";

const PainelAdmin = () => {
  const navigate = useNavigate();
  const [searchClientes, setSearchClientes] = useState("");
  const [searchPets, setSearchPets] = useState("");

  // Dados mock dos clientes
  const clientes = [
    { id: "cli001", nome: "Ana Silva", email: "ana.silva@email.com", telefone: "(11) 98765-4321", funcao: "Tutor", status: "Ativo", registro: "15-01-2023" },
    { id: "cli002", nome: "Bruno Mendes", email: "bruno.mendes@email.com", telefone: "(21) 91234-5678", funcao: "Tutor", status: "Ativo", registro: "15-01-2023" },
    { id: "cli003", nome: "Carla Souza", email: "carla.souza@email.com", telefone: "(31) 99876-1234", funcao: "Veterinário", status: "Pendente", registro: "15-01-2023" },
    { id: "cli004", nome: "Daniel Costa", email: "daniel.costa@email.com", telefone: "(41) 96543-8765", funcao: "Tutor", status: "Ativo", registro: "15-01-2023" },
    { id: "cli005", nome: "Eva Oliveira", email: "eva.oliveira@email.com", telefone: "(51) 87777-1111", funcao: "Tutor", status: "Inativo", registro: "15-01-2023" },
    { id: "cli006", nome: "Felipe Santos", email: "felipe.santos@email.com", telefone: "(61) 95555-2222", funcao: "Veterinário", status: "Ativo", registro: "15-01-2023" }
  ];

  // Dados mock dos pets
  const pets = [
    { id: "cli001", nome: "Toto", especie: "Cão", raca: "Vira-Lata", tutor: "Ana", status: "Ativo", registro: "10-07-2025" },
    { id: "cli002", nome: "Tobi", especie: "Cão", raca: "Vira-Lata", tutor: "João", status: "Ativo", registro: "10-07-2025" },
    { id: "cli003", nome: "Eva", especie: "Cão", raca: "Pastor-alemão", tutor: "Carlos", status: "Pendente", registro: "10-07-2025" },
    { id: "cli004", nome: "Panda", especie: "Gato", raca: "Vira-Lata", tutor: "Maria", status: "Ativo", registro: "10-07-2025" },
    { id: "cli005", nome: "Luna", especie: "Peixe", raca: "Beta", tutor: "Julia", status: "Inativo", registro: "10-07-2025" },
    { id: "cli006", nome: "Tapioca", especie: "Galinha", raca: "Indefinida", tutor: "Tonha", status: "Ativo", registro: "10-07-2025" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge className="bg-blue-500 text-white">Ativo</Badge>;
      case "Pendente":
        return <Badge variant="secondary">Pendente</Badge>;
      case "Inativo":
        return <Badge variant="outline">Inativo</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <span className="text-xl font-bold">TOP PET SYSTEM</span>
            </div>
            <nav className="flex space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground">Visão Geral</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Relatórios</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Configurações</a>
              <button onClick={() => navigate("/gestao-servicos")}>
                Serviços
              </button>              
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              <Input placeholder="Buscar no sistema..." className="pl-10 w-64" />
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>Sair</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Painel de Administração</h1>

        <Tabs defaultValue="clientes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="clientes" className="text-sm">Gestão de Clientes</TabsTrigger>
            <TabsTrigger value="pets" className="text-sm">Gestão de Pets</TabsTrigger>
          </TabsList>

          {/* Aba Gestão de Clientes */}
          <TabsContent value="clientes" className="space-y-6">
            {/* Métricas dos Clientes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Visão Geral dos Clientes
                </CardTitle>
                <p className="text-sm text-muted-foreground">Métricas rápidas sobre a base de clientes do sistema.</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">152</div>
                    <div className="text-sm text-muted-foreground">Total de Clientes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">134</div>
                    <div className="text-sm text-muted-foreground">Clientes Ativos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">23</div>
                    <div className="text-sm text-muted-foreground">Novos Registros (30 dias)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">3</div>
                    <div className="text-sm text-muted-foreground">Pendentes de Aprovação</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Controles e Filtros */}
            <div className="flex justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <Input
                  placeholder="Buscar clientes por nome, email ou telefone..."
                  value={searchClientes}
                  onChange={(e) => setSearchClientes(e.target.value)}
                  className="w-80"
                />
                <Select defaultValue="todos">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="todos">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="tutor">Tutor</SelectItem>
                    <SelectItem value="veterinario">Veterinário</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => navigate('/signup')}
              className="bg-primary p-2 rounded-md text-white">
                 Adicionar Cliente
              </Button>              
            </div>

            {/* Tabela de Clientes */}
            <Card>
              <CardHeader>
                <CardTitle>Lista de Clientes</CardTitle>
                <p className="text-sm text-muted-foreground">Visualize e gerencie os registros de clientes do sistema.</p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Função</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Registro</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientes.map((cliente) => (
                      <TableRow key={cliente.id}>
                        <TableCell className="font-mono text-sm">{cliente.id}</TableCell>
                        <TableCell className="font-medium">{cliente.nome}</TableCell>
                        <TableCell>{cliente.email}</TableCell>
                        <TableCell>{cliente.telefone}</TableCell>
                        <TableCell>{cliente.funcao}</TableCell>
                        <TableCell>{getStatusBadge(cliente.status)}</TableCell>
                        <TableCell>{cliente.registro}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Gestão de Pets */}
          <TabsContent value="pets" className="space-y-6">
            {/* Métricas dos Pets */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <PawPrint className="w-5 h-5" />
                  Visão Geral dos Pets
                </CardTitle>
                <p className="text-sm text-muted-foreground">Métricas rápidas sobre a base de Pets do sistema.</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">89</div>
                    <div className="text-sm text-muted-foreground">Total de Pets</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">76</div>
                    <div className="text-sm text-muted-foreground">Pets Ativos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">12</div>
                    <div className="text-sm text-muted-foreground">Novos Registros (30 dias)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">2</div>
                    <div className="text-sm text-muted-foreground">Pendentes de Aprovação</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Controles e Filtros */}
            <div className="flex justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <Input
                  placeholder="Buscar pets por nome, espécie ou raça..."
                  value={searchPets}
                  onChange={(e) => setSearchPets(e.target.value)}
                  className="w-80"
                />
                <Select defaultValue="todos">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="todos">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="cao">Cão</SelectItem>
                    <SelectItem value="gato">Gato</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-primary p-2 rounded-md text-white"
              onClick={() => navigate('/cadastrar-pet')}>
                
                Adicionar Pet
              </Button>
            </div>

            {/* Tabela de Pets */}
            <Card>
              <CardHeader>
                <CardTitle>Lista de pets</CardTitle>
                <p className="text-sm text-muted-foreground">Visualize e gerencie os registros de pets do sistema.</p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Espécie</TableHead>
                      <TableHead>Raça</TableHead>
                      <TableHead>Tutor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Registro</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pets.map((pet) => (
                      <TableRow key={pet.id}>
                        <TableCell className="font-mono text-sm">{pet.id}</TableCell>
                        <TableCell className="font-medium">{pet.nome}</TableCell>
                        <TableCell>{pet.especie}</TableCell>
                        <TableCell>{pet.raca}</TableCell>
                        <TableCell>{pet.tutor}</TableCell>
                        <TableCell>{getStatusBadge(pet.status)}</TableCell>
                        <TableCell>{pet.registro}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default PainelAdmin;