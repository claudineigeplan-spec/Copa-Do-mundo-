import React from 'react';
import { Sticker } from '../types';
import { StickerCard } from './StickerCard';
import { Users, Search, RefreshCw, Layers, Award, TrendingUp, Trophy, Sparkles } from 'lucide-react';
import { PackOpener } from './PackOpener';

interface LandingTabProps {
  onNavigate: (tab: string) => void;
  featuredStickers: Sticker[];
  onSelectSticker: (sticker: Sticker) => void;
}

export const LandingTab: React.FC<LandingTabProps> = ({
  onNavigate,
  featuredStickers,
  onSelectSticker,
}) => {
  return (
    <div className="w-full space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-6 md:px-12 text-center rounded-[40px] bg-linear-to-br from-white/10 to-white/[0.02] backdrop-blur-2xl border border-white/20 text-white shadow-2xl">
        {/* Shiny absolute glowing gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-80 bg-red-650/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-80 bg-yellow-450/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-radial-[at_top] from-white/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 bg-yellow-400/10 text-yellow-405 font-black text-xs px-4 py-2 rounded-full uppercase tracking-wider border border-yellow-455/20 mb-8 animate-pulse">
            <Trophy size={14} className="text-yellow-400" />
            <span>A Maior Arena de Colecionadores do Planeta</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tight font-display text-shadow-rainbow leading-none uppercase italic">
            O PALCO DAS <br/> 
            <span className="text-yellow-450 drop-shadow-[0_4px_16px_rgba(234,179,8,0.45)] relative inline-block">
              RARIDADES
              <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-linear-to-r from-red-650 via-yellow-400 to-emerald-500 rounded-full" />
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-zinc-100 max-w-2xl font-semibold leading-relaxed font-sans">
            O marketplace global definitivo onde apaixonados por futebol completam sua história. Compre peças raras, venda repetidas e realize trocas inteligentes em segurança.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
            <button 
              onClick={() => onNavigate('marketplace')}
              className="px-10 py-5 rounded-2xl bg-yellow-400 hover:bg-yellow-350 text-black font-extrabold uppercase text-base hover:scale-103 active:scale-97 transition-all shadow-xl shadow-yellow-500/15 cursor-pointer tracking-wider flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Search size={18} />
              <span>EXPLORAR MERCADO</span>
            </button>
            <button 
              onClick={() => onNavigate('login')}
              className="px-10 py-5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-black hover:scale-103 active:scale-97 transition-all border border-white/15 cursor-pointer text-sm tracking-wider uppercase flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <span>Fazer Cadastro Grátis</span>
            </button>
          </div>

          {/* Quick Stats tags indicator */}
          <div className="mt-8 text-xxs font-mono text-zinc-400 uppercase tracking-widest flex flex-wrap justify-center gap-x-4 gap-y-1">
            <span>⚡ SEGURANÇA CERTIFICADA</span>
            <span>•</span>
            <span>🌍 TRADUTOR AUTOMÁTICO</span>
            <span>•</span>
            <span>⭐ REPUTAÇÃO EM CHAT</span>
          </div>
        </div>
      </section>

      {/* Interactive Pack Opener Feature - GIVES AMAZING ATTRACTION VALUE TO THE LANDING */}
      <section className="relative z-10">
        <PackOpener onSelectSticker={onSelectSticker} onNavigate={onNavigate} />
      </section>

      {/* Stats Board */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {[
          { icon: <Users className="text-emerald-400" size={24} />, label: 'Colecionadores Ativos', value: '48.910+' },
          { icon: <Layers className="text-amber-400" size={24} />, label: 'Figurinhas Anunciadas', value: '204.590+' },
          { icon: <RefreshCw className="text-blue-400" size={24} />, label: 'Trocas Realizadas', value: '119.820+' },
          { icon: <Award className="text-purple-400" size={24} />, label: 'Lendárias Catalogadas', value: '12.400+' },
        ].map((stat, i) => (
          <div key={i} className="glass-card rounded-2xl p-6 flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
            <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
              {stat.icon}
            </div>
            <div className="text-center md:text-left">
              <p className="text-[11px] text-zinc-400 tracking-wider uppercase font-mono">{stat.label}</p>
              <h4 className="text-2xl font-extrabold font-display text-white mt-1">{stat.value}</h4>
            </div>
          </div>
        ))}
      </section>

      {/* Como Funciona Section */}
      <section className="py-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-yellow-405 text-xxs font-mono uppercase tracking-widest font-black">Guia do Colecionador</span>
          <h2 className="text-3xl font-black font-display text-white mt-1 uppercase italic">Como Funciona a Plataforma?</h2>
          <p className="text-zinc-400 text-sm mt-3">Completar o seu álbum nunca foi tão fácil, moderno e seguro. Siga os três passos essenciais:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Crie seu Perfil',
              desc: 'Cadastre sua conta rápida em segundos e adicione quais figurinhas você já possui e quais são suas repetidas disponíveis no seu álbum virtual.',
              accent: 'from-pink-500 to-red-500'
            },
            {
              step: '02',
              title: 'Anuncie suas Figurinhas',
              desc: 'Crie ofertas especificando o número, jogador, e se deseja realizar venda direta por saldo simulado ou permuta direta por itens necessários.',
              accent: 'from-amber-400 to-orange-500'
            },
            {
              step: '03',
              title: 'Negocie e Troque',
              desc: 'Utilize nosso chat inteligente com tradutor integrado ou nosso sistema de combinação de preferências para fechar negócios próximos a você com segurança.',
              accent: 'from-sky-400 to-indigo-500'
            }
          ].map((item, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-8 relative overflow-hidden group hover:border-white/20 transition-all border border-white/5 bg-white/[0.02]">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${item.accent} opacity-5 blur-2xl rounded-full`} />
              <div className="flex justify-between items-start">
                <span className={`text-4xl font-extrabold font-display bg-linear-to-r ${item.accent} bg-clip-text text-transparent`}>
                  {item.step}
                </span>
                <div className="w-1.5 h-10 rounded bg-white/10" />
              </div>
              <h3 className="text-white text-xl font-bold mt-6">{item.title}</h3>
              <p className="text-zinc-400 text-xs mt-3 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlight Raras-Stickers Section */}
      <section className="py-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-yellow-405 text-xxs font-mono uppercase tracking-widest font-black">Vitrine Exclusiva</span>
            <h2 className="text-3xl font-black font-display text-white mt-1 uppercase italic">Destaques Colecionáveis</h2>
            <p className="text-zinc-400 text-sm mt-1">Stickers Lendários e Especiais mais cobiçados no mercado agora.</p>
          </div>
          <button 
            onClick={() => onNavigate('marketplace')}
            className="text-yellow-400 hover:text-yellow-300 font-bold text-sm flex items-center space-x-1 hover:underline cursor-pointer font-mono uppercase tracking-wider"
          >
            <span>Ver todas</span>
            <span className="font-mono">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredStickers.map((sticker) => (
            <StickerCard 
              key={sticker.id}
              sticker={sticker}
              actionText="Ver Detalhes"
              onActionClick={() => onSelectSticker(sticker)}
              onClick={() => onSelectSticker(sticker)}
            />
          ))}
        </div>
      </section>

      {/* Safety & Security Panel */}
      <section className="glass-card rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden border border-white/5 bg-white/[0.02]">
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <span className="text-emerald-400 text-xs tracking-wider uppercase font-mono font-bold bg-emerald-950/50 border border-emerald-500/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5 font-bold">
              <span>🛡️</span> Negociações Seguras
            </span>
            <h3 className="text-white text-2xl md:text-3xl font-black font-display mt-4 leading-tight uppercase italic">
              Regras do Colecionismo e Segurança na Rede
            </h3>
            <p className="text-zinc-300 text-sm mt-4 leading-relaxed max-w-xl">
              Nossa plataforma atua como o ponto de união entre apaixonados por futebol. Promovemos encontros presenciais em arenas esportivas regulamentadas ou locais públicos estruturados para trocas em segurança.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-zinc-300 flex items-center">
                🚫 Sem taxas abusivas
              </span>
              <span className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-zinc-300 flex items-center">
                💬 Chat criptografado simulado
              </span>
              <span className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-zinc-300 flex items-center">
                ⭐ Avaliação de usuários
              </span>
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
            <div className="glass-card-light rounded-2xl p-6 w-full max-w-xs border border-white/10 bg-white/[0.04]">
              <TrendingUp className="text-yellow-400 mb-3" size={28} />
              <div className="text-white font-bold text-sm">Valorização de Mercado</div>
              <p className="text-zinc-400 text-[11px] mt-1.5 leading-relaxed">Algumas figurinhas da Copa do Catar valorizaram mais de 450% nos últimos meses devido à escassez de pacotinhos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/10 pt-10 pb-8 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          <div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <span className="text-xl font-black tracking-tighter uppercase font-display bg-linear-to-r from-red-500 via-yellow-400 to-sky-400 bg-clip-text text-transparent">
                🏆 COPA DO MUNDO
              </span>
            </div>
            <p className="text-zinc-500 text-xs mt-2 max-w-xs leading-relaxed">
              Maior centro de troca e venda de figurinhas do mundo. Complete sua coleção festejando a paixão nacional.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <div>
              <h5 className="text-white font-semibold text-xs tracking-wider uppercase font-mono">Plataforma</h5>
              <div className="mt-3 flex flex-col space-y-2 text-zinc-400 text-xs text-left">
                <button onClick={() => onNavigate('marketplace')} className="hover:text-white cursor-pointer text-left">Marketplace</button>
                <button onClick={() => onNavigate('login')} className="hover:text-white cursor-pointer text-left">Criar Cadastro</button>
                <button onClick={() => onNavigate('landing')} className="hover:text-white cursor-pointer text-left">Benefícios</button>
              </div>
            </div>
            <div>
              <h5 className="text-white font-semibold text-xs tracking-wider uppercase font-mono">Suporte</h5>
              <div className="mt-3 flex flex-col space-y-2 text-zinc-500 text-xs text-left">
                <span className="text-zinc-500">FAQ</span>
                <span className="text-zinc-500">Regras do Termo</span>
                <span className="text-zinc-500">Políticas de Privacidade</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-zinc-500 text-[11px] gap-4">
          <p>© 2026 Copa do Mundo S.A. Feito para torcedores com espírito internacional.</p>
          <div className="flex space-x-4">
            <span className="hover:text-zinc-400">Termos</span>
            <span className="hover:text-zinc-400">Cookies</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
