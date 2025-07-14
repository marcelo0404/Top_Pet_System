import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { PawPrint, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AgendarServico = () => {
  const navigate = useNavigate();
  const [selectedPet, setSelectedPet] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState("");

  // Dados mock
  const pets = [
    { id: "1", name: "Buddy", species: "Cão", breed: "Golden Retriever" },
    { id: "2", name: "Whiskers", species: "Gato", breed: "Siamês" },
    { id: "3", name: "Luna", species: "Pássaro", breed: "Cockatiel" }
  ];

  const services = [
    { id: "1", name: "Consulta Veterinária", duration: "30min", price: "R$ 80" },
    { id: "2", name: "Vacinação", duration: "15min", price: "R$ 50" },
    { id: "3", name: "Banho e Tosa", duration: "2h", price: "R$ 120" },
    { id: "4", name: "Cirurgia", duration: "3h", price: "R$ 500" },
    { id: "5", name: "Exame de Sangue", duration: "20min", price: "R$ 60" }
  ];

  const timeSlots = [
    "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const unavailableSlots = ["12:00", "14:00"];

  const handleSchedule = () => {
    if (selectedPet && selectedService && selectedDate && selectedTime) {
      // Aqui implementaria a lógica de agendamento
      alert("Agendamento realizado com sucesso!");
      navigate("/dashboard");
    }
  };

  const isFormComplete = selectedPet && selectedService && selectedDate && selectedTime;

  const getSelectedPetName = () => {
    const pet = pets.find(p => p.id === selectedPet);
    return pet ? pet.name : "Não selecionado";
  };

  const getSelectedServiceName = () => {
    const service = services.find(s => s.id === selectedService);
    return service ? service.name : "Não selecionado";
  };

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
                  {pets.map((pet) => (
                    <SelectItem key={pet.id} value={pet.id}>
                      {pet.name} - {pet.species} ({pet.breed})
                    </SelectItem>
                  ))}
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
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name} - {service.duration} ({service.price})
                    </SelectItem>
                  ))}
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
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date: Date) => date < new Date()}
                className="rounded-md border w-full flex justify-center"
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

          {/* Botão de Agendar */}
          <Button 
            className="w-full bg-primary text-white py-6 text-lg"
            disabled={!isFormComplete}
            onClick={handleSchedule}
          >
            Agendar
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AgendarServico;