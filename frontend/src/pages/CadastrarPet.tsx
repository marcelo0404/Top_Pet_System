import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Upload, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const CadastrarPet = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [dataNascimento, setDataNascimento] = useState<Date>();
  const [genero, setGenero] = useState("macho");
  const [foto, setFoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFoto(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSalvar = () => {
    // Aqui seria a lógica para salvar o pet
    console.log("Salvando pet:", { nome, especie, raca, dataNascimento, genero, foto });
    navigate("/dashboard");
  };

  const handleCancelar = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-background border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-8">
            <button 
              onClick={() => navigate("/dashboard")}
              className="text-primary font-medium hover:text-primary/80"
            >
              Dashboard
            </button>
            <span className="text-muted-foreground">Meus Pets</span>
            <span className="text-muted-foreground">Consultas</span>
            <span className="text-muted-foreground">Configurações</span>
          </div>
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex gap-12">
          {/* Photo Preview */}
          <div className="w-96">
            <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-lg h-[500px] flex items-center justify-center overflow-hidden">
              {previewUrl ? (
                <img 
                  src={previewUrl} 
                  alt="Preview do pet" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-white text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="opacity-75">Prévia da foto do pet</p>
                </div>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 max-w-md">
            <h1 className="text-3xl font-bold text-foreground mb-8">Cadastrar Novo Pet</h1>
            
            <div className="space-y-6">
              {/* Nome do Pet */}
              <div className="space-y-2 flex flex-col">
                <Label htmlFor="nome">Nome do Pet</Label>
                <Input
                  id="nome"
                  placeholder="Ex: Thor"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              {/* Espécie */}
              <div className="space-y-2 flex flex-col">
                <Label htmlFor="especie">Espécie</Label>
                <Input
                  id="especie"
                  placeholder="Ex: Cachorro"
                  value={especie}
                  onChange={(e) => setEspecie(e.target.value)}
                />
              </div>

              {/* Raça */}
              <div className="space-y-2 flex flex-col">
                <Label htmlFor="raca">Raça</Label>
                <Input
                  id="raca"
                  placeholder="Ex: Golden Retriever"
                  value={raca}
                  onChange={(e) => setRaca(e.target.value)}
                />
              </div>

              {/* Data de Nascimento */}
              <div className="space-y-2 flex flex-col">
                <Label>Data de Nascimento</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dataNascimento && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dataNascimento ? format(dataNascimento, "PPP") : <span>Selecione uma data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dataNascimento}
                      onSelect={setDataNascimento}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Foto */}
              <div className="space-y-2">
                <Label htmlFor="foto">Foto</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    id="foto"
                    type="file"
                    accept="image/*"
                    onChange={handleFotoChange}
                    className="hidden"
                  />
                  <label htmlFor="foto" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Clique para fazer upload da foto
                    </p>
                  </label>
                </div>
              </div>

              {/* Gênero */}
              <div className="space-y-3">
                <Label>Gênero</Label>
                <RadioGroup value={genero} onValueChange={setGenero}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="macho" id="macho" />
                    <Label htmlFor="macho">Macho</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="femea" id="femea" />
                    <Label htmlFor="femea">Fêmea</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6">
                <Button
                  variant="outline"
                  onClick={handleCancelar}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSalvar}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Salvar Cadastro
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastrarPet;