"use client";
import { useMemo, useState } from "react";
import { format, startOfToday, addDays, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, isSameMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, Clock, User, Phone, ArrowLeft, ArrowRight, CheckCircle, Package, Info, ChevronLeft, ChevronRight, UserCheck, IdCardIcon } from "lucide-react";

type Pkg = { id: string; label: string; hours: number; price: number };
const PACKAGES: Pkg[] = [
  { id: "2h", label: "Pacote de 2 horas", hours: 2, price: 380 },
  { id: "3h", label: "Pacote de 3 horas", hours: 3, price: 500 },
  { id: "4h", label: "Pacote de 4 horas", hours: 4, price: 600 },
  { id: "5h", label: "Pacote de 5 horas", hours: 5, price: 700 },
  { id: "6h", label: "Pacote de 6 horas", hours: 6, price: 800 },
  { id: "8h", label: "Pacote de 8 horas", hours: 8, price: 1000 },
  { id: "10h", label: "Pacote de 10 horas", hours: 10, price: 1200 }
];

const WHATSAPP_NUMBER = "5551996093589";

function currency(v: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
}

function halfHourSlots(start: string, end: string) {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const out: string[] = [];
  let m = sh * 60 + sm;
  const last = eh * 60 + em;
  while (m <= last) {
    const h = String(Math.floor(m / 60)).padStart(2, "0");
    const min = String(m % 60).padStart(2, "0");
    out.push(`${h}:${min}`);
    m += 30;
  }
  return out;
}

function CustomCalendar({ date, onSelect }: { date?: Date; onSelect: (date?: Date) => void }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = startOfToday();
  const minDate = addDays(today, 1);
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  const startPadding = getDay(monthStart);
  const paddedDays = Array(startPadding).fill(null).concat(days);
  
  function isDisabled(day: Date) {
    const earliest = new Date(Date.now() + 24 * 60 * 60 * 1000);
    if (isSameDay(day, earliest)) {
      const baseSlots = halfHourSlots("08:00", "18:00");
      const earliestMinutes = earliest.getHours() * 60 + earliest.getMinutes();
      const hasAny = baseSlots.some((s) => {
        const [h, m] = s.split(":").map(Number);
        return h * 60 + m > earliestMinutes;
      });
      if (!hasAny) return true;
    }
    return day < minDate || day.getDay() === 0;
  }
  
  function isSelected(day: Date) {
    return date && isSameDay(day, date);
  }
  
  function nextMonth() {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  }
  
  function prevMonth() {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    const currentDate = new Date();
    if (newMonth.getFullYear() > currentDate.getFullYear() || 
        (newMonth.getFullYear() === currentDate.getFullYear() && newMonth.getMonth() >= currentDate.getMonth())) {
      setCurrentMonth(newMonth);
    }
  }
  
  const currentDate = new Date();
  const canGoPrev = currentMonth.getFullYear() > currentDate.getFullYear() || 
                   (currentMonth.getFullYear() === currentDate.getFullYear() && currentMonth.getMonth() > currentDate.getMonth());
  
  return (
    <div className="w-full border border-white/20 p-2 sm:p-4 md:p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold capitalize">
          {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={prevMonth} 
            disabled={!canGoPrev}
            className={`w-10 h-10 hover:bg-white/10 text-white flex items-center justify-center transition-all ${
              !canGoPrev ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={nextMonth} className="w-10 h-10 hover:bg-white/10 text-white flex items-center justify-center cursor-pointer">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 sm:gap-4 mb-3">
        {weekdays.map(day => (
          <div key={day} className="text-xs sm:text-sm text-white/70 uppercase text-center font-bold">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 sm:gap-4">
        {paddedDays.map((day, index) => {
          if (!day) return <div key={index} />;
          const disabled = isDisabled(day);
          const selected = isSelected(day);
          const isToday = isSameDay(day, today);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          return (
            <button
              key={day.toISOString()}
              onClick={() => !disabled && onSelect(day)}
              disabled={disabled}
              className={`
                w-full aspect-[1/2] sm:w-20 sm:h-14 sm:aspect-auto rounded-md text-sm sm:text-base transition-all duration-300 flex items-center justify-center font-bold transform hover:scale-105
                ${selected ? 'bg-white text-black scale-105' : 'text-white'}
                ${!selected && !disabled ? 'hover:bg-white hover:text-black' : ''}
                ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
                ${isToday && !selected ? 'ring-2 ring-white/30' : ''}
                ${!isCurrentMonth && !selected ? 'text-white/30' : ''}
                ${!disabled && isCurrentMonth && day >= minDate && day.getDay() !== 0 ? 'relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-0.5 after:bg-emerald-500' : ''}
              `}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function BookingScheduler() {
  const [step, setStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pkg, setPkg] = useState<Pkg | null>(null);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("");
  const [name, setName] = useState("");
  const [whats, setWhats] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");

  const slots = useMemo(() => {
    const allSlots = halfHourSlots("08:00", "18:00");

    let available = allSlots;

    if (date) {
      const earliest = new Date(Date.now() + 24 * 60 * 60 * 1000);
      if (isSameDay(date, earliest)) {
        const earliestMinutes = earliest.getHours() * 60 + earliest.getMinutes();
        available = allSlots.filter((s) => {
          const [h, m] = s.split(":").map(Number);
          return h * 60 + m > earliestMinutes;
        });
      }
    }

    if (!pkg) return available;

    const limits = {
      "5h": 10,
      "6h": 9,
      "8h": 5,
      "10h": 1
    };

    const limit = limits[pkg.id as keyof typeof limits];
    return limit ? available.slice(0, limit) : available;
  }, [pkg, date]);
  const subtotal = pkg?.price ?? 0;

  function SummaryCard() {
    return (
      <aside className="hidden md:block border border-white/15 bg-white/5 p-4 md:sticky md:top-4 h-[550px]">
        <div className="flex items-center justify-center gap-2 text-white/70 text-sm mb-3"><Info className="w-4 h-4"/>Resumo</div>
        <div className="mx-2 h-px bg-white/20 mb-3"></div>
        <div className="space-y-2 text-sm">
          {pkg && (<div>Serviço: <span className="font-medium">{pkg.label}</span></div>)}
          {date && (<div>Data: <span className="font-medium">{format(date,'d/MMM',{locale:ptBR})}</span></div>)}
          {time && (<div>Hora: <span className="font-medium">{time}</span></div>)}
          {name && (<div>Nome: <span className="font-medium">{name}</span></div>)}
          {whats && (<div>WhatsApp: <span className="font-medium">{whats}</span></div>)}
          {cpfCnpj && (<div>{cpfCnpj.replace(/\D/g, "").length <= 11 ? "CPF" : "CNPJ"}: <span className="font-medium">{cpfCnpj}</span></div>)}
          {pkg && (<div>Total: <span className="font-semibold">{currency(subtotal)}</span></div>)}
        </div>
      </aside>
    );
  }

  function next() {
    if (step === 0 && !pkg) return;
    if (step === 1 && !date) return;
    if (step === 2 && !time) return;
    if (step === 3 && (!name || !whats || !cpfCnpj || !isValidCpfCnpj(cpfCnpj))) return;
    setStep((s) => s + 1);
  }
  function back() { 
    setStep((s) => Math.max(0, s - 1));
  }

  function confirm() {
    if (!pkg || !date || !time) return;
    const d = format(date, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
    const docType = cpfCnpj.replace(/\D/g, "").length <= 11 ? "CPF" : "CNPJ";
    const msg = `Oi, meu nome é ${name}! Quero agendar o ${pkg.label} no dia ${d} às ${time}. Meu ${docType}: ${cpfCnpj}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }

  function formatPhoneBR(v: string) {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return d ? `(${d}` : "";
    if (d.length <= 6) return `(${d.slice(0,2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
    return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
  }

  function formatCpfCnpj(v: string) {
    const d = v.replace(/\D/g, "").slice(0, 14);
    if (d.length <= 11) {
      return d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    return d.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  }

  function isValidCpfCnpj(doc: string) {
    const d = doc.replace(/\D/g, "");
    return d.length === 11 || d.length === 14;
  }

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/15 text-white p-3 sm:p-6 md:p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Agendar horário</h3>
          <span className="text-sm text-white/70">Etapa {step + 1} de 5</span>
        </div>
        <div className="mt-3 h-2 bg-white/10 overflow-hidden rounded-full">
          <div className="h-2 bg-white transition-all duration-300" style={{ width: `${((step + 1) / 5) * 100}%` }} />
        </div>
      </div>

      <div className={`gap-6 ${step < 4 ? 'md:grid md:grid-cols-3' : ''}`}>
        <div className={`${step < 4 ? 'md:col-span-2' : ''} space-y-2 md:space-y-6 transition-all duration-500 ease-in-out h-[640px] md:h-[700px]`}>


      {step === 0 && (
        <div className="animate-in slide-in-from-right-5 duration-500">
          <div className="flex items-center gap-2 mb-4"><Package className="w-4 h-4"/><span>Selecione o pacote</span></div>
          <div className="flex flex-col justify-between h-full gap-[17px]">
            {PACKAGES.map((p) => (
              <button
                key={p.id}
                onClick={() => { setPkg(p); setStep(1); }}
                className={`flex items-center justify-between px-5 py-4 border transition-all duration-300 transform hover:scale-[1.02] cursor-pointer ${pkg?.id === p.id ? "bg-white text-black border-white scale-[1.02] shadow-lg" : "border-white/20 hover:bg-white/10"}`}
              >
                <span className="font-medium">{p.label}</span>
                <div className="font-semibold">{currency(p.price)}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="animate-in slide-in-from-right-5 duration-500">
          <div className="flex items-center gap-2 mb-2"><Calendar className="w-4 h-4"/><span>Selecione a data</span></div>
          <div className="hidden sm:block text-sm text-white/70 mb-2">* Agendamentos devem ser feitos com 24 horas de antecedência</div>
          <CustomCalendar date={date} onSelect={(d)=>{ setDate(d); if (d) setStep(2); }} />
        </div>
      )}

      {step === 2 && (
        <div className="animate-in slide-in-from-right-5 duration-500">
          <div className="flex items-center gap-2 mb-4"><Clock className="w-4 h-4"/><span>Selecione o horário</span></div>
          <div className={`grid gap-3 ${slots.length === 1 ? 'grid-cols-1 max-w-xs mx-auto' : slots.length % 3 === 1 ? 'grid-cols-1 max-w-xs mx-auto' : 'grid-cols-3'}`}>
            {slots.map((s) => (
              <button
                key={s}
                onClick={() => setTime(s)}
                className={`px-4 py-3 text-base font-medium border transition-all duration-300 transform hover:scale-105 cursor-pointer ${time===s?"bg-white text-black border-white scale-105 shadow-lg":"border-white/20 hover:bg-white/10"}`}
              >{s}</button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-in slide-in-from-right-5 duration-500">
          <div className="flex items-center gap-2 mb-4"><UserCheck className="w-4 h-4"/><span>Seus dados</span></div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4"/>
              <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Nome" className="w-full bg-white/10 border border-white/20 px-3 py-2 text-white placeholder-white/60 transition-all duration-300 focus:border-white/50 focus:bg-white/15"/>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4"/>
              <input value={whats} onChange={(e)=>setWhats(formatPhoneBR(e.target.value))} placeholder="WhatsApp" className="w-full bg-white/10 border border-white/20 px-3 py-2 text-white placeholder-white/60 transition-all duration-300 focus:border-white/50 focus:bg-white/15"/>
            </div>
            <div className="flex items-center gap-2">
              <IdCardIcon className="w-4 h-4"/>
              <input value={cpfCnpj} onChange={(e)=>setCpfCnpj(formatCpfCnpj(e.target.value))} placeholder="CPF ou CNPJ" className="w-full bg-white/10 border border-white/20 px-3 py-2 text-white placeholder-white/60 transition-all duration-300 focus:border-white/50 focus:bg-white/15"/>
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="animate-in slide-in-from-right-5 duration-500">
          <div className="flex items-center gap-2 font-semibold mb-5 text-lg text-orange-400">
            <CheckCircle className="w-5 h-5 text-orange-400"/>Confirme seu agendamento
          </div>
          
          <div className="grid md:grid-cols-2 gap-5">
            {/* Appointment Details Card */}
            <div className="bg-white/10 border border-white/20 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5"/>
                <h4 className="font-semibold text-lg">Agendamento</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/70">Serviço</span>
                  <span className="font-medium">{pkg?.label}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/70">Data</span>
                  <span className="font-medium">{date?format(date, "d 'de' MMMM 'de' yyyy", {locale:ptBR}):"--"}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/70">Horário</span>
                  <span className="font-medium">{time||"--"}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-white/10 px-4 mt-4">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-xl">{currency(subtotal)}</span>
                </div>
              </div>
            </div>

            {/* Client Details Card */}
            <div className="bg-white/10 border border-white/20 p-5">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5"/>
                <h4 className="font-semibold text-lg">Seus dados</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/70">Nome</span>
                  <span className="font-medium">{name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/70">WhatsApp</span>
                  <span className="font-medium">{whats}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-white/70">{cpfCnpj.replace(/\D/g, "").length <= 11 ? "CPF" : "CNPJ"}</span>
                  <span className="font-medium">{cpfCnpj}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

        </div>
        {step < 4 && <SummaryCard />}
      </div>
      
      <div className={`mt-0 md:-mt-12 flex items-center ${step === 0 ? 'justify-end' : 'justify-between'}`}>
        {step > 0 && (
          <button onClick={back} className="inline-flex items-center gap-2 px-4 py-3 border border-white/20 text-white/80 hover:text-white disabled:opacity-40 transition-all duration-300 hover:scale-105 disabled:hover:scale-100 cursor-pointer"><ArrowLeft className="w-4 h-4"/>Voltar</button>
        )}
        {step === 4 ? (
          <button onClick={confirm} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-white/90 transition-all duration-300 hover:scale-105 cursor-pointer"><span>Agendar</span><ArrowRight className="w-4 h-4"/></button>
        ) : (
          ((step === 2 && !!time) || (step === 3 && !!name.trim() && whats.replace(/\D/g, "").length === 11 && !!cpfCnpj && isValidCpfCnpj(cpfCnpj))) && (
            <button onClick={next} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-white/90 transition-all duration-300 hover:scale-105 cursor-pointer"><span>Próximo</span><ArrowRight className="w-4 h-4"/></button>
          )
        )}
      </div>
    </div>
  );
}

