'use client';

import { useState } from 'react';

interface MobileMenuProps {
  isDark?: boolean;
}

export default function MobileMenu({ isDark = false }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 transition-colors ${
          isDark ? 'hover:bg-black/5' : 'hover:bg-white/10'
        }`}
        aria-label="Menu"
      >
        <div className="w-5 h-5 flex flex-col justify-center space-y-1">
          <span className={`block h-0.5 bg-current transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block h-0.5 bg-current transition-all ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 bg-current transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <div className={`absolute top-full left-0 right-0 backdrop-blur border-b py-4 ${
          isDark 
            ? 'bg-white/95 border-black/5 text-black' 
            : 'bg-black/95 border-white/5 text-white'
        }`}>
          <nav className="flex flex-col space-y-3 px-4">
            <a href="#sobre" className="py-2 hover:opacity-70" onClick={() => setIsOpen(false)}>Sobre</a>
            <a href="#servicos" className="py-2 hover:opacity-70" onClick={() => setIsOpen(false)}>Serviços</a>
            <a href="#portfolio" className="py-2 hover:opacity-70" onClick={() => setIsOpen(false)}>Portfolio</a>
            <a href="#processo" className="py-2 hover:opacity-70" onClick={() => setIsOpen(false)}>Processo</a>
            <a href="#agende" className="py-2 hover:opacity-70" onClick={() => setIsOpen(false)}>Agende</a>
            <a href="#contato" className="py-2 hover:opacity-70" onClick={() => setIsOpen(false)}>Contato</a>
          </nav>
        </div>
      )}
    </div>
  );
}