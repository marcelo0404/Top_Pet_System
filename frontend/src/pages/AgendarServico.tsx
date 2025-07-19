import { criarAgendamento } from "@/services/agendamentoService";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Calendar } from "@/components/ui/calendar";
import { getPets } from "@/services/petService";
import { getServicos } from "@/services/servicoService";
import { Badge } from "@/components/ui/badge";
import { PawPrint, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";

const AgendarServico = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const petIdFromQuery = params.get("petId");
  const [selectedPet, setSelectedPet] = useState(petIdFromQuery || "");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState("");


  const [pets, setPets] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const petsData = await getPets(token || undefined);
        setPets(petsData);
        const servicosData = await getServicos(token || undefined);
        setServices(servicosData);
      } catch (err: any) {
        setError("Erro ao buscar dados do backend. Faça login novamente ou tente mais tarde.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const timeSlots = [
    "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const unavailableSlots = ["12:00", "14:00"];

  const [agendamentoLoading, setAgendamentoLoading] = useState(false);
  const [agendamentoError, setAgendamentoError] = useState<string | null>(null);

  const handleSchedule = async () => {
    setAgendamentoError(null);
    if (selectedPet && selectedService && selectedDate && selectedTime) {
      setAgendamentoLoading(true);
      try {
        // Montar data_hora no formato ISO completo: YYYY-MM-DDTHH:MM:SS
        const dateStr = selectedDate instanceof Date ? selectedDate.toISOString().split('T')[0] : "";
        const data_hora = `${dateStr}T${selectedTime}:00`;
        const token = localStorage.getItem("token") || undefined;
        await criarAgendamento({
          pet_id: selectedPet,
          servico_id: selectedService,
          data_hora,
          token,
        });
        alert("Agendamento realizado com sucesso!");
        navigate("/dashboard");
      } catch (err: any) {
        setAgendamentoError(
          err?.response?.data ?
            `Erro ao agendar: ${JSON.stringify(err.response.data)}` :
            (err?.message || "Erro desconhecido ao agendar.")
        );
      } finally {
        setAgendamentoLoading(false);
      }
    }
  };

  const isFormComplete = selectedPet && selectedService && selectedDate && selectedTime;

  const getSelectedPetName = () => {
    const pet = pets.find((p: any) => String(p.id) === String(selectedPet));
    return pet ? pet.nome : "Não selecionado";
  };

  const getSelectedServiceName = () => {
    const service = services.find((s: any) => String(s.id) === String(selectedService));
    return service ? service.nome : "Não selecionado";
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-lg">Carregando dados...</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-red-600 text-lg">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <PawPrint className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Agendar Novo Serviço</h1>
          <p className="text-muted-foreground">
            Preencha os detalhes abaixo para agendar um novo serviço para o seu pet. É rápido e fácil!
          </p>
        </div>

        <div className="space-y-8">
          {/* Seleção do Pet */}
          <Card>
            <CardHeader>
              <CardTitle>Para qual pet é o serviço?</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedPet} onValueChange={setSelectedPet}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um pet..." />
                </SelectTrigger>
                <SelectContent>
                  {pets.length === 0 ? (
                    <SelectItem value="" disabled>Nenhum pet cadastrado</SelectItem>
                  ) : (
                    pets.map((pet: any) => (
                      <SelectItem key={pet.id} value={String(pet.id)}>
                        {pet.nome} - {pet.especie} ({pet.raca})
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Seleção do Serviço */}
          <Card>
            <CardHeader>
              <CardTitle>Qual serviço você deseja agendar?</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um serviço..." />
                </SelectTrigger>
                <SelectContent>
                  {services.length === 0 ? (
                    <SelectItem value="" disabled>Nenhum serviço disponível</SelectItem>
                  ) : (
                    services.map((service: any) => (
                      <SelectItem key={service.id} value={String(service.id)}>
                        {service.nome} - {service.duracao ? service.duracao : ""} (R$ {service.preco})
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Seleção da Data */}
          <Card>
            <CardHeader>
              <CardTitle>Escolha uma data</CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="date"
                className="border rounded px-3 py-2 w-full"
                value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => {
                  const val = e.target.value;
                  setSelectedDate(val ? new Date(val) : undefined);
                }}
              />
            </CardContent>
          </Card>

          {/* Seleção do Horário */}
          {selectedDate && (
            <Card>
              <CardHeader>
                <CardTitle>Escolha um horário</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-3">
                  {timeSlots.map((time) => {
                    const isUnavailable = unavailableSlots.includes(time);
                    const isSelected = selectedTime === time;
                    
                    return (
                      <Button
                        key={time}
                        variant={isSelected ? "default" : "outline"}
                        className={`
                          ${isUnavailable ? "opacity-50 cursor-not-allowed" : ""}
                          ${isSelected ? "bg-primary text-white" : ""}
                        `}
                        disabled={isUnavailable}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                        {isUnavailable && (
                          <Badge variant="destructive" className="ml-1 text-xs">
                            Ocupado
                          </Badge>
                        )}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Resumo do Agendamento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Resumo do Agendamento</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Pet:</span>
                <span className="text-muted-foreground">{getSelectedPetName()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Serviço:</span>
                <span className="text-muted-foreground">{getSelectedServiceName()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Data:</span>
                <span className="text-muted-foreground">
                  {selectedDate ? selectedDate.toLocaleDateString('pt-BR') : "Não selecionado"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Hora:</span>
                <span className="text-muted-foreground">
                  {selectedTime || "Não selecionado"}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Feedback de erro/agendamento */}
          {agendamentoError && (
            <div className="text-red-600 text-center mb-2">{agendamentoError}</div>
          )}
          {/* Botão de Agendar */}
          <Button 
            className="rounded-full w-full bg-primary text-white py-4 text-lg"
            disabled={!isFormComplete || agendamentoLoading}
            onClick={handleSchedule}
          >
            {agendamentoLoading ? "Agendando..." : "Agendar"}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AgendarServico;