// Tudo que está aqui vem do site e da apresentação oficial da Incargel.
export const WHATS = "5511983831253"; // CONFIRMAR: o 98383-1253 está no site como telefone; vale checar se atende no WhatsApp
export const FONES = [
  { label: "(11) 4022-3784", tel: "+551140223784" },
  { label: "(11) 4013-0990", tel: "+551140130990" },
  { label: "(11) 98383-1253", tel: "+5511983831253" },
];
export const EMAIL = "falecom@incargel.com.br";
export const MAPS = "https://www.google.com/maps?q=-23.27898,-47.34078";
export const wa = (t?: string) => `https://wa.me/${WHATS}${t ? `?text=${encodeURIComponent(t)}` : ""}`;

// Uma peça da família (imagem em public/pecas/<img>.png, recortada da apresentação).
export type Peca = { img: string; nome: string; dim: string; specs: [string, string][] };

export type Item = {
  id: string; fam: "Estrutural" | "Vedação"; linha: string;
  dim: [number, number, number]; cel: [number, number];
  specs: [string, string][];
  pecas: Peca[]; // a primeira é o bloco principal (a foto do card)
};

const P = (img: string, nome: string, dim: string, ...specs: [string, string][]): Peca => ({ img, nome, dim, specs });

export const itens: Item[] = [
  { id: "e1429", fam: "Estrutural", linha: "14/29", dim: [14, 19, 29], cel: [3, 3],
    specs: [["Rendimento", "16,5 pçs/m²"], ["Peso por peça", "5,8 kg"], ["Resistência", "6 MPa"]],
    pecas: [
      P("e1429-bloco", "Bloco estrutural", "14 × 19 × 29", ["Rendimento", "16,5 pçs/m²"], ["Peso", "5,8 kg"], ["Resistência", "6 MPa"]),
      P("e1429-amarracao", "Bloco de amarração", "14 × 19 × 44", ["Peso", "8,6 kg"], ["Resistência", "6 MPa"]),
      P("e1429-meio", "Meio bloco de amarração", "14 × 19 × 14", ["Rendimento", "34,6 pçs/m²"], ["Peso", "3,1 kg"]),
      P("e1429-canaleta-u", "Canaleta U", "14 × 19 × 29", ["Rendimento", "3,45 pçs/ml"], ["Peso", "4,9 kg"]),
      P("e1429-canaleta-j", "Canaleta J", "07 × 14 × 19 × 29", ["Rendimento", "3,45 pçs/ml"], ["Peso", "5,0 kg"]),
      P("e1429-compensadora", "Canaleta compensadora", "07 × 14 × 29", ["Rendimento", "3,45 pçs/ml"]),
      P("e1429-hidraulico", "Bloco hidráulico", "14 × 19 × 29", ["Peso", "5,5 kg"]),
      P("e1429-seccionavel", "Bloco seccionável", "14 × 19 × 4"),
      P("e1429-45", "Bloco 45°", "14 × 19 × 15", ["Peso", "4,2 kg"]),
    ] },
  { id: "e1439", fam: "Estrutural", linha: "14/39", dim: [14, 19, 39], cel: [3, 3],
    specs: [["Rendimento", "12,5 pçs/m²"], ["Peso por peça", "7,2 kg"], ["Resistência", "6 MPa"]],
    pecas: [
      P("e1439-bloco", "Bloco estrutural", "14 × 19 × 39", ["Rendimento", "12,5 pçs/m²"], ["Peso", "7,2 kg"], ["Resistência", "6 MPa"]),
      P("e1439-amarracao", "Bloco de amarração", "14 × 19 × 34"),
      P("e1439-meio", "Meio bloco de amarração", "14 × 19 × 19", ["Peso", "4,0 kg"]),
      P("e1439-canaleta-u", "Canaleta U", "14 × 19 × 39", ["Rendimento", "2,56 pçs/ml"], ["Peso", "7,5 kg"]),
    ] },
  { id: "e1939", fam: "Estrutural", linha: "19/39", dim: [19, 19, 39], cel: [3, 3],
    specs: [["Rendimento", "12,5 pçs/m²"], ["Peso por peça", "8,15 kg"], ["Resistência", "6 MPa"]],
    pecas: [
      P("e1939-bloco", "Bloco estrutural", "19 × 19 × 39", ["Rendimento", "12,5 pçs/m²"], ["Peso", "8,15 kg"], ["Resistência", "6 MPa"]),
      P("e1939-meio", "Meio bloco de amarração", "19 × 19 × 19", ["Peso", "4,5 kg"]),
      P("e1939-canaleta-u", "Canaleta U", "19 × 19 × 39", ["Rendimento", "2,56 pçs/ml"], ["Peso", "7,8 kg"]),
    ] },
  { id: "e11539", fam: "Estrutural", linha: "11,5/39", dim: [11.5, 19, 39], cel: [2, 3],
    specs: [["Rendimento", "12,5 pçs/m²"], ["Peso por peça", "6 kg"], ["Resistência", "4,5 MPa"]],
    pecas: [
      P("e11539-bloco", "Bloco estrutural", "11,5 × 19 × 39", ["Rendimento", "12,5 pçs/m²"], ["Peso", "6 kg"], ["Resistência", "4,5 MPa"]),
      P("e11539-meio", "Meio bloco de amarração", "11,5 × 19 × 19", ["Peso", "3,1 kg"]),
      P("e11539-canaleta-u", "Canaleta U", "11,5 × 19 × 39", ["Rendimento", "2,56 pçs/ml"], ["Peso", "6,5 kg"]),
    ] },
  { id: "v929", fam: "Vedação", linha: "9", dim: [9, 19, 29], cel: [2, 3],
    specs: [["Parede de 9 cm", "16,5 pçs/m²"], ["Parede de 19 cm", "33 pçs/m²"], ["Peso por peça", "3,2 kg"], ["Carga aprox.", "4.000 pçs"]],
    pecas: [
      P("v929-bloco", "Bloco de vedação", "9 × 19 × 29", ["Parede de 9 cm", "16,5 pçs/m²"], ["Parede de 19 cm", "33 pçs/m²"], ["Peso", "3,2 kg"], ["Carga aprox.", "4.000 pçs"]),
      P("v929-bloco-19", "Bloco de vedação", "9 × 19 × 19", ["Parede de 9 cm", "25 pçs/m²"], ["Parede de 19 cm", "50 pçs/m²"], ["Peso", "2,1 kg"], ["Carga aprox.", "6.500 pçs"]),
      P("v929-meio", "Meio bloco de amarração", "9 × 19 × 14", ["Peso", "1,7 kg"]),
    ] },
  { id: "v939", fam: "Vedação", linha: "9/39 furo vertical", dim: [9, 19, 39], cel: [2, 3],
    specs: [["Rendimento", "12,5 pçs/m²"], ["Peso por peça", "5,8 kg"], ["Resistência", "4,5 MPa"]],
    pecas: [
      P("v939-bloco", "Bloco de furo vertical", "9 × 19 × 39", ["Rendimento", "12,5 pçs/m²"], ["Peso", "5,8 kg"], ["Resistência", "4,5 MPa"]),
      P("v939-meio", "Meio bloco de amarração", "9 × 19 × 19", ["Peso", "2,9 kg"]),
      P("v939-canaleta-u", "Canaleta U", "9 × 19 × 39", ["Rendimento", "2,56 pçs/ml"], ["Peso", "6,2 kg"]),
    ] },
  { id: "v11529", fam: "Vedação", linha: "11,5 × 29", dim: [11.5, 19, 29], cel: [2, 3],
    specs: [["Parede de 11,5 cm", "16,5 pçs/m²"], ["Parede de 19 cm", "26,5 pçs/m²"], ["Peso por peça", "3,7 kg"], ["Carga aprox.", "3.500 pçs"]],
    pecas: [
      P("v11529-bloco", "Bloco de vedação", "11,5 × 19 × 29", ["Parede de 11,5 cm", "16,5 pçs/m²"], ["Parede de 19 cm", "26,5 pçs/m²"], ["Peso", "3,7 kg"], ["Carga aprox.", "3.500 pçs"]),
      P("v11529-meio", "Meio bloco de amarração", "11,5 × 19 × 14", ["Peso", "2,2 kg"]),
      P("v11529-canaleta-u", "Canaleta U", "11,5 × 19 × 29", ["Rendimento", "3,45 pçs/ml"], ["Peso", "3,5 kg"]),
    ] },
  { id: "v11524", fam: "Vedação", linha: "11,5 × 24", dim: [11.5, 14, 24], cel: [2, 2],
    specs: [["Parede de 11,5 cm", "26,5 pçs/m²"], ["Parede de 14 cm", "32 pçs/m²"], ["Peso por peça", "2,1 kg"], ["Carga aprox.", "6.000 pçs"]],
    pecas: [
      P("v11524-bloco", "Bloco de vedação", "11,5 × 14 × 24", ["Parede de 11,5 cm", "26,5 pçs/m²"], ["Parede de 14 cm", "32 pçs/m²"], ["Peso", "2,1 kg"], ["Carga aprox.", "6.000 pçs"]),
      P("v11524-meio", "Meio bloco de amarração", "11,5 × 14 × 14"),
      P("v11524-canaleta-u", "Canaleta U", "11,5 × 14 × 24", ["Rendimento", "4 pçs/ml"], ["Peso", "3,1 kg"]),
    ] },
  { id: "v1429", fam: "Vedação", linha: "14", dim: [14, 19, 29], cel: [3, 3],
    specs: [["Parede de 14 cm", "16,5 pçs/m²"], ["Parede de 19 cm", "22,5 pçs/m²"], ["Peso por peça", "4,2 kg"], ["Carga aprox.", "3.000 pçs"]],
    pecas: [
      P("v1429-bloco", "Bloco de vedação", "14 × 19 × 29", ["Parede de 14 cm", "16,5 pçs/m²"], ["Parede de 19 cm", "22,5 pçs/m²"], ["Peso", "4,2 kg"], ["Carga aprox.", "3.000 pçs"]),
      P("v1429-meio", "Meio bloco de amarração", "14 × 19 × 14", ["Peso", "2,5 kg"]),
      P("v1429-canaleta-u", "Canaleta U", "14 × 19 × 29", ["Rendimento", "3,45 pçs/ml"], ["Peso", "5,2 kg"]),
    ] },
  { id: "v1929", fam: "Vedação", linha: "19", dim: [19, 19, 29], cel: [3, 3],
    specs: [["Rendimento", "16,5 pçs/m²"], ["Peso por peça", "6,4 kg"], ["Carga aprox.", "2.200 pçs"]],
    pecas: [
      P("v1929-bloco", "Bloco de vedação", "19 × 19 × 29", ["Rendimento", "16,5 pçs/m²"], ["Peso", "6,4 kg"], ["Carga aprox.", "2.200 pçs"]),
      P("v1929-meio", "Meio bloco de amarração", "19 × 19 × 14", ["Peso", "2,5 kg"]),
      P("v1929-canaleta-u", "Canaleta U", "19 × 19 × 29", ["Rendimento", "3,45 pçs/ml"], ["Peso", "6,2 kg"]),
    ] },
];

export const fmt = (n: number) => String(n).replace(".", ",");
export const fotoPeca = (img: string) => `/pecas/${img}.png`;
// Furo vertical (estruturais e a vedação 9/39 "furo vertical") ou horizontal (vedação comum): muda o desenho técnico.
export const furoDe = (i: { id: string; fam: Item["fam"] }): "v" | "h" => (i.fam === "Estrutural" || i.id === "v939" ? "v" : "h");
export const totalPecas = itens.reduce((s, i) => s + i.pecas.length, 0);

// Linhas que podem ser "paginadas": todas têm meio bloco e altura 19 cm.
// l = comprimento do inteiro, meio = comprimento do meio bloco, u = tem canaleta U na linha.
export type Modulo = { id: string; fam: "Estrutural" | "Vedação"; nome: string; w: number; l: number; meio: number; u: boolean };
export const modulos: Modulo[] = [
  { id: "e1429", fam: "Estrutural", nome: "Estrutural 14/29", w: 14, l: 29, meio: 14, u: true },
  { id: "e1439", fam: "Estrutural", nome: "Estrutural 14/39", w: 14, l: 39, meio: 19, u: true },
  { id: "e1939", fam: "Estrutural", nome: "Estrutural 19/39", w: 19, l: 39, meio: 19, u: true },
  { id: "e11539", fam: "Estrutural", nome: "Estrutural 11,5/39", w: 11.5, l: 39, meio: 19, u: true },
  { id: "v939", fam: "Vedação", nome: "Vedação 9/39", w: 9, l: 39, meio: 19, u: true },
  { id: "v929", fam: "Vedação", nome: "Vedação 9", w: 9, l: 29, meio: 14, u: false },
  { id: "v11529", fam: "Vedação", nome: "Vedação 11,5 × 29", w: 11.5, l: 29, meio: 14, u: true },
  { id: "v1429", fam: "Vedação", nome: "Vedação 14", w: 14, l: 29, meio: 14, u: true },
  { id: "v1929", fam: "Vedação", nome: "Vedação 19", w: 19, l: 29, meio: 14, u: true },
];
