import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Heart,Search, Plus, Edit, Trash2, FileText, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Servico {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  duracao: number;
  status: "Ativo" | "Rascunho" ;
}

const servicosMock: Servico[] = [
  {
    id: 1,
    nome: "Vacinacao",
    descricao: "Colocar a carteira vacinal em dia.",
    preco: 150.00,
    duracao: 30,
    status: "Ativo"
  },
  {
    id: 2,
    nome: "Consulta",
    descricao: "Uma consulta com o medico veterinario",
    preco: 350.00,
    duracao: 60,
    status: "Ativo"
  },
  {
    id: 3,
    nome: "Banho e Tosa",
    descricao: "Banho e Tosa",
    preco: 130.00,
    duracao: 60,
    status: "Ativo"
  },
  {
    id: 4,
    nome: "Exame de Sangue",
    descricao: "Exame de Sangue",
    preco: 120.00,
    duracao: 20,
    status: "Ativo"
  }  
];

const GestaoServicos = () => {
  const navigate = useNavigate()
  const [servicos, setServicos] = useState<Servico[]>(servicosMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos os Status");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingServico, setEditingServico] = useState<Servico | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    duracao: "",
    status: "Ativo" as "Ativo" | "Rascunho"
  });
  const { toast } = useToast();

  const filteredServicos = servicos.filter(servico => {
    const matchesSearch = servico.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         servico.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "Todos os Status" || servico.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const servicosAtivos = servicos.filter(s => s.status === "Ativo").length;
  const servicoMaisSolicitado = "Banho e Tosa";

  const handleAddServico = () => {
    setEditingServico(null);
    setFormData({
      nome: "",
      descricao: "",
      preco: "",
      duracao: "",
      status: "Ativo"
    });
    setIsModalOpen(true);
  };

  const handleEditServico = (servico: Servico) => {
    setEditingServico(servico);
    setFormData({
      nome: servico.nome,
      descricao: servico.descricao,
      preco: servico.preco.toString(),
      duracao: servico.duracao.toString(),
      status: servico.status
    });
    setIsModalOpen(true);
  };

  const handleDeleteServico = (id: number) => {
    setServicos(servicos.filter(s => s.id !== id));
    toast({
      title: "Serviço excluído",
      description: "O serviço foi removido com sucesso.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingServico) {
      setServicos(servicos.map(s => 
        s.id === editingServico.id 
          ? {
              ...s,
              nome: formData.nome,
              descricao: formData.descricao,
              preco: parseFloat(formData.preco),
              duracao: parseInt(formData.duracao),
              status: formData.status
            }
          : s
      ));
      toast({
        title: "Serviço atualizado",
        description: "As alterações foram salvas com sucesso.",
      });
    } else {
      const newServico: Servico = {
        id: Math.max(...servicos.map(s => s.id)) + 1,
        nome: formData.nome,
        descricao: formData.descricao,
        preco: parseFloat(formData.preco),
        duracao: parseInt(formData.duracao),
        status: formData.status
      };
      setServicos([...servicos, newServico]);
      toast({
        title: "Serviço adicionado",
        description: "O novo serviço foi criado com sucesso.",
      });
    }
    
    setIsModalOpen(false);
  };

  const formatDuration = (minutes: number) => {
    if (minutes >= 1440) {
      return `${minutes / 1440} dia(s)`;
    } else if (minutes >= 60) {
      return `${Math.floor(minutes / 60)}h ${minutes % 60}min`;
    } else {
      return `${minutes} min`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                
                <Heart className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">TOP PET SYSTEM</span>
              </div>
              <nav className="flex gap-6">
                <button className="text-muted-foreground hover:text-foreground"
                onClick={() => navigate("/admin")} >Visão Geral</button>
                <span className="text-muted-foreground hover:text-foreground">Gestão de Serviços</span>
                <span className="text-muted-foreground hover:text-foreground">Configurações</span>
                <span className="text-muted-foreground hover:text-foreground">Relatórios</span>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Pesquisar..." 
                  className="pl-10 w-64 rounded-lg"
                />
              </div>              
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Gestão de Serviços</h1>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddServico} className="bg-primary p-2 rounded-md text-white">
                {/*<Plus className="h-4 w-4" />*/}
                Adicionar Novo Serviço
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingServico ? "Editar Serviço" : "Adicionar Novo Serviço"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome do Serviço</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={formData.status} 
                      onValueChange={(value: "Ativo" | "Rascunho") => setFormData({...formData, status: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ativo">Ativo</SelectItem>
                        <SelectItem value="Rascunho">Rascunho</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                    rows={3}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="preco">Preço (R$)</Label>
                    <Input
                      id="preco"
                      type="number"
                      step="0.01"
                      value={formData.preco}
                      onChange={(e) => setFormData({...formData, preco: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="duracao">Duração (minutos)</Label>
                    <Input
                      id="duracao"
                      type="number"
                      value={formData.duracao}
                      onChange={(e) => setFormData({...formData, duracao: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {editingServico ? "Salvar Alterações" : "Adicionar Serviço"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Serviços Ativos
              </CardTitle>
              {/*<FileText className="h-4 w-4 text-muted-foreground" />*/}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{servicosAtivos}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Serviço Mais Solicitado
              </CardTitle>
              {/*<DollarSign className="h-4 w-4 text-muted-foreground" />*/}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{servicoMaisSolicitado}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar serviço por nome ou descrição..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos os Status">Todos os Status</SelectItem>
              <SelectItem value="Ativo">Ativo</SelectItem>
              <SelectItem value="Rascunho">Rascunho</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Services Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Serviço</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Duração</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServicos.map((servico) => (
                <TableRow key={servico.id}>
                  <TableCell className="font-medium">{servico.nome}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={servico.descricao}>
                      {servico.descricao}
                    </div>
                  </TableCell>
                  <TableCell>R$ {servico.preco.toFixed(2)}</TableCell>
                  <TableCell>{formatDuration(servico.duracao)}</TableCell>
                  <TableCell>
                    <Badge variant={servico.status === "Ativo" ? "default" : "secondary"}>
                      {servico.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditServico(servico)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteServico(servico.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Mostrando {Math.min(7, filteredServicos.length)} de {filteredServicos.length} serviços.
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <span className="text-sm">Página 1 de 1</span>
            <Button variant="outline" size="sm" disabled>
              Próxima
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestaoServicos;