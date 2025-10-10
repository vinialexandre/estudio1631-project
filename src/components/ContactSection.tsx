export default function ContactSection() {
  return (
    <section id="contato" className="bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-white"></div>
              <span className="text-sm font-medium text-white/70 uppercase tracking-wider">Contato</span>
            </div>

            <div className="space-y-6">
              <a href="mailto:contato@1631.studio" className="group flex items-center gap-4 p-6 bg-white/10 backdrop-blur border border-white/15 hover:bg-white/15 transition-all duration-300" aria-label="Enviar email para contato@1631.studio">
                <div className="w-12 h-12 bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/70 uppercase tracking-wider">E-mail</p>
                  <p className="font-semibold text-lg">contato@1631.studio</p>
                </div>
              </a>

              <a href="https://wa.me/5551996093589" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-6 bg-white/10 backdrop-blur border border-white/15 hover:bg-white/15 transition-all duration-300" aria-label="Entrar em contato via WhatsApp">
                <div className="w-12 h-12 bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.109"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/70 uppercase tracking-wider">WhatsApp</p>
                  <p className="font-semibold text-lg">Chamar no WhatsApp</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur border border-white/15">
                <div className="w-12 h-12 bg-white/20 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/70 uppercase tracking-wider">Localização</p>
                  <p className="font-semibold text-lg">Avenida General Daltro Filho, 1631</p>
                  <p className="text-white/60 text-sm">Novo Hamburgo, RS</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur border border-white/10 p-8 md:p-10">
            <h3 className="text-2xl font-bold mb-6">Envie uma mensagem</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Nome" className="w-full bg-white/10 border border-white/20 px-6 py-4 text-white placeholder-white/60 backdrop-blur" />
                <input type="email" placeholder="E-mail" className="w-full bg-white/10 border border-white/20 px-6 py-4 text-white placeholder-white/60 backdrop-blur" />
              </div>
              <input type="text" placeholder="Assunto" className="w-full bg-white/10 border border-white/20 px-6 py-4 text-white placeholder-white/60 backdrop-blur" />
              <textarea rows={5} placeholder="Conte sobre seu projeto..." className="w-full bg-white/10 border border-white/20 px-6 py-4 text-white placeholder-white/60 backdrop-blur resize-none"></textarea>
              <button type="submit" className="w-full bg-white text-black px-6 py-4 font-semibold hover:bg-neutral-100 transition-colors">
                Enviar mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}