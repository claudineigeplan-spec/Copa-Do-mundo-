import React, { useState } from 'react';
import { Sparkles, RefreshCw, Award, Eye } from 'lucide-react';
import { Sticker } from '../types';

interface PackOpenerProps {
  onSelectSticker?: (sticker: Sticker) => void;
  onNavigate?: (tab: string) => void;
}

// Pool of possible pulls (high resolution details to ensure spectacular visuals)
const SIMULATED_POOL = [
  {
    id: 'sim_1',
    number: 'QA-01',
    player: 'Lionel Messi',
    country: 'Argentina',
    flag: '🇦🇷',
    album: 'Qatar 2022',
    image: 'messi',
    rarity: 'Lendária',
    badge: 'Extra Legend Gold',
    colorClass: 'from-amber-400 via-yellow-500 to-orange-500',
    stars: 5,
  },
  {
    id: 'sim_2',
    number: 'CR-07',
    player: 'Cristiano Ronaldo',
    country: 'Portugal',
    flag: '🇵🇹',
    album: 'Qatar 2022',
    image: 'cr7',
    rarity: 'Lendária',
    badge: 'Legend Bronze',
    colorClass: 'from-orange-400 via-amber-600 to-red-600',
    stars: 5,
  },
  {
    id: 'sim_3',
    number: 'NJR-10',
    player: 'Neymar Jr',
    country: 'Brasil',
    flag: '🇧🇷',
    album: 'Qatar 2022',
    image: 'neymar',
    rarity: 'Rara',
    badge: 'Brilhante',
    colorClass: 'from-emerald-400 via-green-500 to-yellow-400',
    stars: 4,
  },
  {
    id: 'sim_4',
    number: 'KM-10',
    player: 'Kylian Mbappé',
    country: 'França',
    flag: '🇫🇷',
    album: 'Qatar 2022',
    image: 'mbappe',
    rarity: 'Lendária',
    badge: 'Extra Legend Silver',
    colorClass: 'from-blue-400 via-zinc-400 to-indigo-600',
    stars: 5,
  },
  {
    id: 'sim_5',
    number: 'JB-22',
    player: 'Jude Bellingham',
    country: 'Inglaterra',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    album: 'Qatar 2022',
    image: 'bellingham',
    rarity: 'Rara',
    badge: 'Rookie Card',
    colorClass: 'from-blue-600 via-slate-400 to-red-500',
    stars: 4,
  },
  {
    id: 'sim_6',
    number: 'KDB-17',
    player: 'Kevin de Bruyne',
    country: 'Bélgica',
    flag: '🇧🇪',
    album: 'Qatar 2022',
    image: 'debruyne',
    rarity: 'Rara',
    badge: 'Brilhante Especial',
    colorClass: 'from-cyan-400 via-zinc-300 to-blue-600',
    stars: 4,
  },
];

export const PackOpener: React.FC<PackOpenerProps> = ({ onSelectSticker, onNavigate }) => {
  const [packState, setPackState] = useState<'closed' | 'opening' | 'opened'>('closed');
  const [pulledCards, setPulledCards] = useState<typeof SIMULATED_POOL>([]);
  const [revealedIndex, setRevealedIndex] = useState<number>(-1);

  const handleOpenPack = () => {
    setPackState('opening');
    setRevealedIndex(-1);

    // Dynamic selection of 3 random cards without duplicates
    setTimeout(() => {
      const shuffled = [...SIMULATED_POOL].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      setPulledCards(selected);
      setPackState('opened');
      
      // Sequential reveal animation of cards
      let i = 0;
      const interval = setInterval(() => {
        setRevealedIndex(curr => curr + 1);
        i++;
        if (i >= 3) clearInterval(interval);
      }, 350);
    }, 1200); // 1.2s of immersive packaging breaking animation
  };

  const handleReset = () => {
    setPackState('closed');
    setPulledCards([]);
    setRevealedIndex(-1);
  };

  return (
    <div className="w-full py-10 px-4 rounded-[32px] bg-linear-to-b from-white/5 to-white/[0.01] border border-white/10 shadow-xl overflow-hidden relative">
      {/* Absolute Decorative ambient background lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-650/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-yellow-450/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto flex flex-col items-center text-center relative z-10">
        
        {/* Banner Section Info */}
        <div className="flex items-center gap-1.5 bg-yellow-400/10 border border-yellow-405/20 text-yellow-400 px-3 py-1 rounded-full text-xxs font-black tracking-widest uppercase mb-4">
          <Sparkles size={12} className="animate-spin" />
          <span>Simulador de Sorte Integrado</span>
        </div>

        <h3 className="text-3xl font-black font-display text-white tracking-tight leading-none uppercase italic">
          ABRA UM PACOTINHO <span className="text-yellow-400">TESTE</span>
        </h3>
        <p className="text-zinc-400 text-xs mt-2 max-w-md">
          Experimente no ato a adrenalina de colecionar! Sinta a emoção de romper o alumínio e tirar uma figurinha lendária dourada de graça!
        </p>

        {/* Dynamic Display Area based on Pack State */}
        <div className="w-full min-h-[380px] flex items-center justify-center mt-8 relative">
          
          {/* STATE 1: CLOSED PACK */}
          {packState === 'closed' && (
            <div className="flex flex-col items-center">
              {/* Foil Pack Wrapper Graphics */}
              <button
                onClick={handleOpenPack}
                className="group relative cursor-pointer outline-hidden transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 active:scale-95 flex flex-col items-center"
                aria-label="Clique para rasgar e abrir o pacotinho de figurinhas"
              >
                {/* Simulated Foil Package Case with metallic gradient */}
                <div className="w-48 h-72 rounded-2xl bg-linear-to-tr from-red-750 via-orange-650 to-yellow-500 border-2 border-yellow-400/50 relative shadow-[0_15px_40px_rgba(220,38,38,0.3)] overflow-hidden">
                  
                  {/* Metallic Glint Sparkle Lines */}
                  <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out" />
                  
                  {/* Packaging Crinkled Crimps style top/bottom */}
                  <div className="absolute top-0 left-0 right-0 h-4 bg-zinc-950/20 border-b border-white/10 flex justify-between px-1">
                    {[...Array(12)].map((_, i) => (
                      <span key={i} className="w-1.5 h-full bg-zinc-950/30 rounded-full" />
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-zinc-950/20 border-t border-white/10 flex justify-between px-1">
                    {[...Array(12)].map((_, i) => (
                      <span key={i} className="w-1.5 h-full bg-zinc-950/30 rounded-full" />
                    ))}
                  </div>

                  {/* World Cup official look brand art */}
                  <div className="h-full flex flex-col justify-between p-6 pt-8 pb-8 text-center text-white relative z-10">
                    <div>
                      <div className="text-[10px] font-black tracking-widest text-shadow-sm text-yellow-300 font-mono">COPA 2022</div>
                      <div className="text-sm font-semibold tracking-wide text-zinc-100 uppercase font-mono mt-1">OFFICIAL STICKERS</div>
                    </div>

                    {/* Glowing circular crest */}
                    <div className="w-20 h-20 rounded-full bg-black/30 border border-white/20 flex items-center justify-center mx-auto my-3 group-hover:border-yellow-400 transition-colors shadow-inner">
                      <span className="text-3xl animate-bounce">🏆</span>
                    </div>

                    <div>
                      <span className="text-xxs font-mono text-zinc-300 group-hover:text-yellow-400 transition-colors">RASGAR PACOTE</span>
                      <h4 className="text-base font-black tracking-tight leading-none text-yellow-300 mt-1 uppercase italic group-hover:scale-105 transition-all">
                        ABRIR AGORA
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Dynamic Shadow */}
                <div className="w-36 h-3 bg-red-650/20 blur-md rounded-full mt-6 group-hover:w-44 transition-all duration-300" />
              </button>

              <button
                onClick={handleOpenPack}
                className="mt-6 px-6 py-2.5 rounded-full bg-yellow-400 text-black font-black text-xs tracking-wider uppercase shadow-lg shadow-yellow-500/10 hover:bg-yellow-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Abrir Pacotinho Virtual
              </button>
            </div>
          )}

          {/* STATE 2: BREAKING ALUMÍNIO ANIMATION */}
          {packState === 'opening' && (
            <div className="flex flex-col items-center">
              <div className="relative">
                {/* Big Shining Sparks / Loader */}
                <div className="w-28 h-28 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin flex items-center justify-center">
                  <span className="text-3xl animate-pulse">✨</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <RefreshCw className="text-yellow-400 animate-spin" size={32} />
                </div>
              </div>
              <h4 className="text-white text-sm font-black font-mono tracking-widest uppercase mt-6 animate-pulse">
                Rompendo o alumínio...
              </h4>
              <p className="text-zinc-500 text-xxs font-mono mt-1">
                PREPARE-SE PARA OS CRAQUES!
              </p>
            </div>
          )}

          {/* STATE 3: CARDS REVEALED */}
          {packState === 'opened' && (
            <div className="w-full flex flex-col items-center">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl px-2">
                {pulledCards.map((card, idx) => {
                  const isRevealed = idx <= revealedIndex;
                  return (
                    <div 
                      key={card.id}
                      className={`relative transform transition-all duration-500 ${
                        isRevealed 
                          ? 'opacity-100 scale-100 translate-y-0 rotate-0' 
                          : 'opacity-0 scale-75 translate-y-10 rotate-6 pointer-events-none'
                      }`}
                    >
                      {/* Premium Card Container */}
                      <div className={`p-4 rounded-2xl bg-slate-950 border-2 border-white/5 relative flex flex-col items-center text-center shadow-xl group hover:border-yellow-400 transition-all ${
                        card.rarity === 'Lendária' ? 'shadow-[0_10px_30px_rgba(234,179,8,0.15)] hover:shadow-[0_15px_40px_rgba(234,179,8,0.25)]' : ''
                      }`}>
                        
                        {/* Metallic Gold / Silver shiny border background */}
                        <div className={`absolute inset-[1px] rounded-[14px] bg-linear-to-b ${card.colorClass} opacity-10`} />

                        {/* Card Upper Metadata */}
                        <div className="w-full flex justify-between items-center relative z-10 text-[10px] uppercase font-mono font-bold text-zinc-400 mb-2">
                          <span className="bg-white/10 px-1.5 py-0.5 rounded text-[8px] text-zinc-300">
                            {card.number}
                          </span>
                          <span className="text-yellow-400">
                            {card.flag} {card.country}
                          </span>
                        </div>

                        {/* Player Virtual Photo / Avatar wrapper */}
                        <div className="w-24 h-24 rounded-xl bg-slate-900 border border-white/10 relative overflow-hidden flex items-center justify-center mb-3">
                          <div className={`absolute inset-0 bg-linear-to-tr ${card.colorClass} opacity-10 animate-pulse`} />
                          <span className="text-4xl filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                            {card.player === 'Lionel Messi' ? '🐐' : card.player === 'Cristiano Ronaldo' ? '🇵🇹' : card.player === 'Neymar Jr' ? '⚡' : card.player === 'Kylian Mbappé' ? '🐢' : card.player === 'Jude Bellingham' ? '✨' : '⚽'}
                          </span>
                        </div>

                        {/* Player name */}
                        <div className="relative z-10 w-full mb-1">
                          <h5 className="text-white text-base font-black truncate font-display tracking-tight uppercase leading-none">
                            {card.player}
                          </h5>
                          <span className={`text-[9px] uppercase font-mono font-black tracking-wider px-2 py-0.5 rounded-full inline-block mt-1 ${
                            card.rarity === 'Lendária' 
                              ? 'bg-amber-400/20 text-yellow-400 border border-yellow-405/35' 
                              : 'bg-zinc-800 text-zinc-300 border border-zinc-700/50'
                          }`}>
                            {card.badge}
                          </span>
                        </div>

                        {/* Rating stars */}
                        <div className="flex items-center justify-center gap-0.5 mt-2 mb-1 relative z-10">
                          {Array.from({ length: card.stars }).map((_, st) => (
                            <span key={st} className="text-[10px] text-yellow-400" role="img" aria-label="Estrela">★</span>
                          ))}
                        </div>

                        {/* Call to search this sticker */}
                        <button
                          onClick={() => {
                            if (onNavigate) {
                              onNavigate('marketplace');
                            }
                          }}
                          className={`mt-4 w-full py-1.5 px-3 rounded-lg text-[9px] font-black uppercase text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            card.rarity === 'Lendária'
                              ? 'bg-yellow-400 text-black hover:bg-yellow-300 font-black'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          <Eye size={10} />
                          <span>Negociar no Mercado</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reset button to open another pack */}
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-zinc-200 hover:text-white text-xs font-extrabold uppercase flex items-center gap-2 cursor-pointer border border-white/5"
                >
                  <RefreshCw size={12} />
                  <span>Abrir Outro Pacotinho</span>
                </button>
                <button 
                  onClick={() => onNavigate && onNavigate('marketplace')}
                  className="px-5 py-2.5 rounded-xl bg-yellow-450 text-black font-black text-xs uppercase cursor-pointer"
                >
                  Ver Mercado Geral
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
