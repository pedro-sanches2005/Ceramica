import { FONES } from "@/lib/dados";

// Linha de tranquilidade sob os botões de cotação: diz o que acontece ao clicar,
// quando alguém responde e deixa um telefone por escrito caso o WhatsApp não abra.
export default function NotaCotacao({ className }: { className?: string }) {
  const fixo = FONES[0];
  return (
    <p className={`nota-cot${className ? ` ${className}` : ""}`}>
      Abre o WhatsApp com a mensagem pronta. Atendimento seg–sex 7h30–18h, sáb 7h30–12h ·
      ou ligue <a href={`tel:${fixo.tel}`}>{fixo.label}</a>
    </p>
  );
}
