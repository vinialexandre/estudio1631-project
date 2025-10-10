"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import SimpleCarousel from "../components/SimpleCarousel";

import MobileMenu from "../components/MobileMenu";

import ProcessStep from "../components/ProcessStep";
import BookingScheduler from "../components/BookingScheduler";
import ContactSection from "../components/ContactSection";


const studio = [
  "/9I3A1849%20copiar.jpg",
  "/9I3A1857%20copiar%202.jpg",
  "/9I3A1867%20copiar.jpg",
  "/9I3A1872%20copiar.jpg",
  "/9I3A1874%20copiar.jpg",
  "/9I3A1881%20copiar.jpg",
];

const testimonials = [
  {
    quote: "Experiência incrível! O estúdio tem uma energia única e o resultado superou todas as expectativas.",
    author: "Maria Silva",
    role: "Empresária"
  },
  {
    quote: "Profissionalismo excepcional. Desde o primeiro contato até a entrega das fotos, tudo perfeito.",
    author: "João Santos",
    role: "Advogado"
  },
  {
    quote: "Ambiente acolhedor e resultado impecável. Recomendo para quem busca qualidade e criatividade.",
    author: "Ana Costa",
    role: "Arquiteta"
  }
];



const processSteps = [
  {
    number: "1",
    title: "Agende seu horário",
    description: "Preencha o formulário abaixo com seus dados e horário preferido para reservar o estúdio."
  },
  {
    number: "2",
    title: "Fale com a gente pelo WhatsApp",
    description: "Você entrará em contato pelo WhatsApp para confirmar detalhes e finalizar a reserva."
  },
  {
    number: "3",
    title: "Crie seu conteúdo!",
    description: "Aproveite nosso espaço totalmente equipado para criar suas imagens incríveis."
  }
];

function HeroSlider() {
  const heroImages = ["/9I3A1853%20copiar.jpg", ...studio];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Estúdio 1631 - Espaço fotográfico profissional em Novo Hamburgo ${index + 1}`}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover scale-110"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
        <p className="text-xl md:text-3xl text-white font-light leading-relaxed mb-10 whitespace-normal lg:whitespace-nowrap">
          O ESPAÇO CERTO PARA TRANSFORMAR <br className="lg:hidden" /> INSPIRAÇÃO EM CONTEÚDO.
        </p>

        <div className="bg-white/8 backdrop-blur-md border border-white/15 px-3 py-3 mb-10 max-w-44 mx-auto">
          <a href="#agende" className="group inline-flex items-center justify-center bg-white text-black px-4 py-3 font-bold text-base hover:bg-white/90 transition-all duration-300 w-full">
            Agendar
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm">Explore nosso trabalho</span>
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default function Home() {

  const [activeSection, setActiveSection] = useState('');
  const [isHeaderDark, setIsHeaderDark] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // IDs das seções claras (header preto)
      const lightSectionIds = ['sobre', 'processo', 'depoimentos', 'faq'];
      // IDs das seções escuras (header branco)
      const darkSectionIds = ['cta', 'agende', 'contato'];

      let inLightSection = false;

      // Verificar seções claras
      lightSectionIds.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
          const sectionTop = section.offsetTop - 100;
          const sectionBottom = section.offsetTop + section.offsetHeight;
          if (scrollY >= sectionTop && scrollY < sectionBottom) {
            inLightSection = true;
            setActiveSection(id);
          }
        }
      });

      // Verificar seções escuras (sobrescreve se necessário)
      darkSectionIds.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
          const sectionTop = section.offsetTop - 100;
          const sectionBottom = section.offsetTop + section.offsetHeight;
          if (scrollY >= sectionTop && scrollY < sectionBottom) {
            console.log(`Seção escura detectada: ${id}`);
            inLightSection = false;
            setActiveSection(id);
          }
        }
      });

      setIsHeaderDark(inLightSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);





  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="text-foreground bg-background min-h-screen">
      <header className={`fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
        isHeaderDark
          ? 'bg-white/10 border-black/20 text-black'
          : 'bg-white/10 border-white/20 text-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={isHeaderDark ? "/1631%20Logo%20(3)-4.png" : "/1631%20Logo%20(3)-3.png"}
              alt="Estúdio 1631 - Fotografia Profissional Novo Hamburgo"
              width={140}
              height={32}
              className="transition-transform hover:scale-105"
            />
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
              <a href="#sobre" className="px-3 py-2 hover:opacity-70 transition-all duration-300">Sobre</a>
              <span className={isHeaderDark ? 'text-black/30' : 'text-white/30'}>|</span>
              <a href="#agende" className="px-3 py-2 hover:opacity-70 transition-all duration-300">Agende</a>


            </nav>
            <MobileMenu isDark={isHeaderDark} />


          </div>
        </div>
      </header>

      <HeroSlider />

      <section className="bg-black text-white">
        <div id="agende" className="max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-px bg-white"></div>
              <span className="text-sm font-medium text-white/70 uppercase tracking-wider">Agendamento</span>
              <div className="w-12 h-px bg-white"></div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            <BookingScheduler />
          </div>
        </div>
      </section>

      <section id="sobre" className="bg-neutral-50 text-neutral-900">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-black"></div>
                <span className="text-sm font-medium text-neutral-600 uppercase tracking-wider">Sobre nós</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Fotografia que <span className="text-neutral-600">conecta</span>
              </h2>
              <div className="space-y-6 text-lg text-neutral-700 leading-relaxed">
                <p>
                  Oferecemos um espaço amplo e versátil onde você pode criar imagens autênticas e criativas. Nossa estrutura permite que você foque no que realmente importa: contar sua história através da fotografia.
                  Temos a opção de locar iluminação e também temos muita luz natural para explorar tanto com câmera como com seu celular.
                  Nossos cenários são adaptáveis e temos toda a infraestrutura necessária para você transformar suas ideias em registros únicos que comunicam sua essência de forma genuína e impactante.
                </p>

                
                <div className="bg-neutral-100 p-6 rounded-lg">
                  <h3 className="font-semibold text-neutral-900 mb-4 text-center text-xl">O que oferecemos</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-base text-neutral-700">2 flashes Mako 2002 (ao locar acompanha tripé e 1 modificador)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-base text-neutral-700">1 sombrinha 1,5mts</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-base text-neutral-700">1 sombrinha 1 mt</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-base text-neutral-700">1 octa 1 mt com encaixe Mako</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-base text-neutral-700">2 refletores panela com encaixe Mako</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-base text-neutral-700">Suporte fundo infinito Mako</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-base text-neutral-700">1 girafa black river Mako</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-base text-neutral-700">Kit background para foto still</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-base text-neutral-700">2 cubos brancos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <SimpleCarousel images={studio} altPrefix="Estúdio 1631 - Espaço fotográfico profissional" />
            </div>
          </div>
        </div>
      </section>




      <section id="processo" className="bg-gray-100 text-neutral-900">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:items-start">
            <div className="text-center lg:text-left">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-black"></div>
                <span className="text-sm font-medium text-neutral-600 uppercase tracking-wider">Processo</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Como <span className="text-neutral-600">funciona</span>
              </h2>
              <p className="text-xl text-neutral-600 leading-relaxed">
                Três passos simples para você ter acesso ao nosso estúdio.
              </p>
            </div>
            <div className="space-y-8 max-w-md mx-auto lg:mx-0">
              {processSteps.map((step, index) => (
                <ProcessStep
                  key={index}
                  {...step}
                  isLast={index === processSteps.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-neutral-50 text-neutral-900">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-px bg-black"></div>
              <span className="text-sm font-medium text-neutral-600 uppercase tracking-wider">FAQ</span>
              <div className="w-12 h-px bg-black"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Dúvidas frequentes</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Respostas para as perguntas mais comuns sobre nossos serviços.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                question: "Com quanto tempo de antecedência preciso reservar?",
                answer: "É necessário fazer a reserva com pelo menos 24 horas de antecedência. Isso nos permite organizar o espaço e garantir que tudo esteja pronto para sua sessão."
              },
              {
                question: "Posso cancelar minha reserva?",
                answer: "Sim, mas o cancelamento deve ser feito com pelo menos 3 dias de antecedência. Cancelamentos com menos tempo podem estar sujeitos a taxas."
              },
              {
                question: "O que está incluído no aluguel do estúdio?",
                answer: "O estúdio inclui iluminação profissional completa, fundos variados, tripés, rebatedores e todo equipamento básico de iluminação. Você só precisa trazer sua câmera."
              },
              {
                question: "Qual é a duração mínima de aluguel?",
                answer: "O tempo mínimo de locação é de 2 horas. Oferecemos pacotes de 2h, 4h, 6h e diária completa para atender diferentes necessidades de produção."
              },
              {
                question: "Posso trazer minha equipe?",
                answer: "Claro! O estúdio comporta confortavelmente até 8 pessoas, incluindo fotógrafo, assistentes, modelos e equipe de produção."
              },
              {
                question: "Há estacionamento disponível?",
                answer: "Sim, temos estacionamento gratuito no local para você e sua equipe, facilitando o transporte de equipamentos e materiais."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white border border-black/5 overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 md:p-8 text-left flex items-center justify-between hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <h3 className="text-lg font-semibold text-neutral-900">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-neutral-600 transition-transform duration-200 ${openFaqIndex === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 md:px-8 pb-6 md:pb-8">
                    <p className="text-neutral-600 leading-relaxed mt-4">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <footer className="bg-black text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center md:text-left">
              <Image src="/1631%20Logo%20(3)-23.png" alt="Estúdio 1631 - Fotografia Profissional" width={140} height={32} className="mb-4 mx-auto md:mx-0" />
            </div>
            <div className="hidden md:flex justify-end">
              <div>
                <h4 className="font-semibold mb-4">Navegação</h4>
                <div className="grid grid-cols-2 gap-x-9 gap-y-2 text-sm text-white/70">
                  <a href="#sobre" className="hover:text-white transition-colors">Sobre</a>
                  <a href="#processo" className="hover:text-white transition-colors">Processo</a>
                  <a href="#faq" className="hover:text-white transition-colors">Dúvidas</a>
                  <a href="#agende" className="hover:text-white transition-colors">Agende</a>
                  <a href="#contato" className="hover:text-white transition-colors">Contato</a>
                </div>
              </div>
            </div>


            <div className="text-center md:text-left md:ml-auto">
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="mailto:contato@1631.studio" className="hover:text-white transition-colors">contato@1631.studio</a></li>
                <li><a href="https://wa.me/5551996093589" className="hover:text-white transition-colors">WhatsApp</a></li>
                <li>Novo Hamburgo, RS</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} Estúdio 1631. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/estudio.1631" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors" aria-label="Seguir Estúdio 1631 no Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

