import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Users, AlertTriangle, Activity, Search, Filter, Plus, Stethoscope, FileText, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const DashboardVeterinario = () => {
  const navigate = useNavigate();

  const pacientesData = [
    { nome: "Max", tutor: "Alice Smith", especie: "Cão", ultimaVisita: "2024-07-20", status: "Ativo", anotacoes: "Consultas de rotina, vacinas em dia. Saudável." },
    { nome: "Whiskers", tutor: "Bob Johnson", especie: "Gato", ultimaVisita: "2024-07-18", status: "Pendente", anotacoes: "Sintomas de letargia, resultados de exames de sangue pendentes." },
    { nome: "Buddy", tutor: "Charlie Brown", especie: "Cão", ultimaVisita: "2024-07-15", status: "Ativo", anotacoes: "Acompanhamento da lesão na pata, recuperação em andamento." },
    { nome: "Pip", tutor: "Diana Ross", especie: "Pássaro", ultimaVisita: "2024-07-10", status: "Arquivado", anotacoes: "Check-up anual, aconselha-se ajustar dieta para melhor nutrição." },
    { nome: "Rocky", tutor: "Eve Adams", especie: "Coelho", ultimaVisita: "2024-07-05", status: "Ativo", anotacoes: "Avaliação da saúde dentária, pequenos cortes de unhas realizados." }
  ];

  const atividadesRecentes = [
    { tipo: "novo-registro", titulo: "Novo recorde", descricao: "Registro de check-up de Max adicionado", tempo: "2 minutos atrás" },
    { tipo: "compromisso", titulo: "Compromisso confirmado", descricao: "Acompanhamento da lesão na pata de Buddy confirmado", tempo: "1 hora atrás" },
    { tipo: "teste", titulo: "Resultado do Teste", descricao: "Resultados do exame de sangue de Whiskers recebidos", tempo: "3 horas atrás" },
    { tipo: "paciente", titulo: "Novo Paciente", descricao: "Registro de novo paciente: Rocky, um coelho", tempo: "5 horas atrás" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge variant="secondary" className="p-0.5 rounded-lg bg-green-100 text-green-800">Ativo</Badge>;
      case "Pendente":
        return <Badge variant="secondary" className="p-0.5 rounded-lg bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case "Arquivado":
        return <Badge variant="secondary" className="p-0.5 rounded-lg bg-gray-100 text-gray-800">Arquivado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getActivityIcon = (tipo: string) => {
    switch (tipo) {
      case "novo-registro":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "compromisso":
        return <Calendar className="h-4 w-4 text-green-500" />;
      case "teste":
        return <Activity className="h-4 w-4 text-orange-500" />;
      case "paciente":
        return <Users className="h-4 w-4 text-purple-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-2">
            <Stethoscope className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">TOP PET SYSTEM</span>
          </div>
          
          <nav className="ml-8 flex space-x-6">
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">
              Cliente
            </Link>
            <span className="text-muted-foreground">Funcionário</span>
            <span className="text-primary font-medium">Veterinário</span>
            <span className="text-muted-foreground">Admin</span>
          </nav>

          {/*<div className="ml-auto flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for patients or records..."
                className="pl-8 w-64"
              />
            </div>
            <Button variant="ghost" size="sm">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                V
              </div>
            </Button>
          </div>*/}
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card min-h-screen">
          <div className="p-6">
            <div className="bg-primary text-primary-foreground p-3 rounded-lg mb-4">
              <div className="flex items-center space-x-2">
                <Stethoscope className="h-5 w-5" />
                <span className="font-medium">Painel do Veterinário</span>
              </div>
            </div>
            
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                <FileText className="mr-2 h-4 w-4" />
                Registros médicos
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                Compromissos
              </Button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Veterinário</h1>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pacientes Hoje
                </CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Próximos compromissos
                </CardTitle>
                <Calendar className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center pb-2">
                <AlertTriangle className="h-6 w-6 text-red-500 px-1" />
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Alertas Críticos
                  
                </CardTitle>
                
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">3</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Requer atenção imediata
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Tendências de Visitas de Pacientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Gráfico de tendências aqui</p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Atividades Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {atividadesRecentes.map((atividade, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      {getActivityIcon(atividade.tipo)}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{atividade.titulo}</p>
                        <p className="text-sm text-muted-foreground">{atividade.descricao}</p>
                        <p className="text-xs text-muted-foreground">{atividade.tempo}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Medical Records Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Registros Médicos</CardTitle>
                <Button className="rounded-lg p-2 bg-primary hover:bg-primary/90">
                  {/*<Plus className="h-4 w-4 mr-2" />*/}
                  Add Novo Registro
                </Button>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Pesquisar por PET ou Tutor..."
                    className="pl-8"
                  />
                </div>
                <Button variant="outline">
                  {/*<Filter className="h-4 w-4 mr-2" />*/}
                  Filtros
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PET</TableHead>
                    <TableHead>Tutor</TableHead>
                    <TableHead>Espécie</TableHead>
                    <TableHead>Última Visita</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Anotações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pacientesData.map((paciente, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{paciente.nome}</TableCell>
                      <TableCell className="text-blue-600 hover:underline cursor-pointer">
                        {paciente.tutor}
                      </TableCell>
                      <TableCell>{paciente.especie}</TableCell>
                      <TableCell>{paciente.ultimaVisita}</TableCell>
                      <TableCell>{getStatusBadge(paciente.status)}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {paciente.anotacoes}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DashboardVeterinario;