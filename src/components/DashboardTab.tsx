import React from 'react';
import { User, Sticker } from '../types';
import { StickerCard } from './StickerCard';
import { 
  PlusCircle, 
  Wallet, 
  Layers, 
  RefreshCw, 
  Sparkles, 
  MapPin, 
  ChevronRight, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';

interface DashboardTabProps {
  currentUser: User;
  stickers: Sticker[];
  onSelectSticker: (sticker: Sticker) => void;
  onNavigate: (tab: string) => void;
  onProposeTradeFromMatch: (sticker: Sticker) => void;
  onDepositMockMoney: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  currentUser,
  stickers,
  onSelectSticker,
  onNavigate,
  onProposeTradeFromMatch,
  onDepositMockMoney,
}) => {
  // Filter active valid marketplace cards from other users
  const publicStickers = stickers.filter(
    (s) => s.active && s.approved && s.ownerId !== currentUser.id
  );

  // Generate simulated automated matches
  // A match is when another user has a sticker for trade, and we have repeated items we can offer
  const getSimulatedMatches = () => {
    const tradeStickers = stickers.filter(
      (s) => s.ownerId !== currentUser.id && s.approved && (s.type === 'troca' || s.type === 'ambos')
    );
    
    // We can pre-pair them with mock stickers the current user owns
    const myMockRepeated = [
      { player: 'Richarlison', number: 'BR-09', rarity: 'Comum' },
      { player: 'Casemiro', number: 'BR-05', rarity: 'Comum' },
      { player: 'Marquinhos', number: 'BR-04', rarity: 'Comum' },
    ];

    return tradeStickers.map((item, idx) => {
      const myOffer = myMockRepeated[idx % myMockRepeated.length];
      return {
        id: `match_${item.id}`,
        targetSticker: item,
        myOfferSticker: myOffer,
        completenessScore: Math.floor(82 + (idx * 5) % 18)
      };
    }).slice(0, 3);
  };

  const matches = getSimulatedMatches();

  return (
    <div className="space-y-10">
      
      {/* Greetings & Balance Header row */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 glass-card rounded-[32px] p-6 border-white/20">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-full object-cover border border-white/25" 
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-950" />
          </div>
          <div>
            <h1 className="text-2xl font-black font-display text-white tracking-tight flex items-center gap-1.5 uppercase italic">
              <span>Olá, {currentUser.name}!</span>
              {currentUser.role === 'admin' && (
                <span className="text-[10px] bg-red-950 text-red-200 border border-red-500/30 font-bold px-2 py-0.5 rounded font-mono">
                  ADMIN
                </span>
              )}
            </h1>
            <p className="text-zinc-200 text-xs mt-1 font-medium">Nível de Colecionador • {currentUser.country} • ⭐ {currentUser.rating}</p>
          </div>
        </div>

        {/* Quick Balance Wallet with instant mockup recharge */}
        <div className="flex items-center space-x-4">
          <div className="glass-card-light rounded-2xl p-4 border-white/20 flex items-center space-x-3">
            <span className="p-2.5 bg-white/10 rounded-xl text-yellow-405 border border-white/15">
              <Wallet size={18} />
            </span>
            <div>
              <p className="text-[9px] text-zinc-300 uppercase tracking-widest font-mono font-bold">Carteira Virtual</p>
              <h3 className="text-lg font-black text-white font-display mt-0.5">R$ {currentUser.balance.toFixed(2)}</h3>
            </div>
          </div>
          <button
            onClick={onDepositMockMoney}
            className="h-12 px-5 rounded-2xl bg-white/20 hover:bg-white/30 text-white border border-white/20 text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-1 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
            title="Adicionar Saldo Demonstrativo"
          >
            <span>+ R$ 50</span>
          </button>
        </div>
      </section>

      {/* Album Progress Bar & Mini Stats Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-white/5 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] text-zinc-400 tracking-wider font-mono uppercase">Meu Álbum</p>
              <h3 className="text-2xl font-black text-white mt-1">
                {currentUser.stickersOwned} <span className="text-zinc-500 text-sm font-normal">/ 670</span>
              </h3>
            </div>
            <span className="text-xs bg-linear-to-r from-red-500 to-orange-500 text-white px-2 py-0.5 rounded-full font-bold">
              {Math.round((currentUser.stickersOwned / 670) * 100)}%
            </span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1.5 mt-4 overflow-hidden">
            <div 
              className="bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 h-1.5 rounded-full" 
              style={{ width: `${(currentUser.stickersOwned / 670) * 100}%` }}
            />
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] text-zinc-400 tracking-wider font-mono uppercase">Pilha de Repetidas</p>
              <h3 className="text-2xl font-black text-white mt-1">
                {currentUser.stickersRepeated} <span className="text-xs text-zinc-500 font-normal">unidades</span>
              </h3>
            </div>
            <span className="p-2 bg-emerald-950 border border-emerald-500/20 rounded-xl text-emerald-400">
              <Layers size={16} />
            </span>
          </div>
          <p className="text-zinc-400 text-[10px] mt-3">Prontas para permuta ou anúncio no marketplace</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] text-zinc-400 tracking-wider font-mono uppercase">Trocas Pendentes</p>
              <h3 className="text-2xl font-black text-white mt-1">
                2 <span className="text-xs text-zinc-500 font-normal">conversas</span>
              </h3>
            </div>
            <span className="p-2 bg-purple-950 border border-purple-500/20 rounded-xl text-purple-400">
              <RefreshCw size={16} className="animate-spin-slow" />
            </span>
          </div>
          <button 
            onClick={() => onNavigate('chat')}
            className="text-purple-400 hover:text-purple-300 text-[10px] font-bold mt-3 block hover:underline"
          >
            Acessar Chats de Negociação →
          </button>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/5 flex flex-col justify-between">
          <div>
            <p className="text-[10px] text-zinc-400 tracking-wider font-mono uppercase">Anunciar Nova</p>
            <p className="text-zinc-400 text-[11px] mt-1">Disponibilize figurinhas para venda ou troca líquida.</p>
          </div>
          <button
            onClick={() => onNavigate('create_ad')}
            className="w-full mt-3 bg-linear-to-r from-red-650 to-orange-550 hover:from-red-600 hover:to-orange-500 text-white font-bold text-xs py-2 px-3 rounded-xl flex items-center justify-center space-x-1.5 transition-all shadow-md cursor-pointer"
          >
            <PlusCircle size={14} />
            <span>Criar Anúncio</span>
          </button>
        </div>
      </section>

      {/* MATCHMAKER SUGGESTIONS WIDGET (SUGESTÕES DE TROCA) */}
      <section className="glass-card rounded-3xl p-6 border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-purple-950/50 border border-purple-500/20 rounded-xl text-yellow-400">
              <Sparkles size={16} className="animate-pulse" />
            </span>
            <div>
              <h3 className="text-white text-base font-extrabold font-display">Sugestões de Troca Direta</h3>
              <p className="text-zinc-400 text-xs mt-0.5">Geradas por nosso algoritmo inteligente de colecionismo</p>
            </div>
          </div>
          <span className="text-[10px] bg-white/5 text-zinc-300 py-1 px-2.5 rounded-full border border-white/5 font-mono">
            3 Matches Atuais
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {matches.length > 0 ? (
            matches.map((match) => (
              <div 
                key={match.id}
                className="bg-slate-950/50 border border-purple-500/15 rounded-2xl p-4 flex flex-col justify-between hover:border-purple-500/30 transition-all group"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] bg-purple-950/60 text-purple-300 font-bold px-2 py-0.5 rounded border border-purple-500/20 font-mono">
                      🔥 {match.completenessScore}% de Match
                    </span>
                    <span className="text-[10px] text-zinc-500 flex items-center">
                      <MapPin size={10} className="mr-0.5" />
                      Próximo
                    </span>
                  </div>

                  {/* Matching swap card interface */}
                  <div className="space-y-2.5 bg-white/5 rounded-xl p-3 border border-white/5">
                    {/* Receiver */}
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <p className="text-[9px] text-zinc-500 font-mono">VOCÊ RECEBE</p>
                        <p className="text-white text-xs font-extrabold">{match.targetSticker.player}</p>
                        <p className="text-purple-300 text-[10px] font-mono">{match.targetSticker.number}</p>
                      </div>
                      <span className="text-xs font-extrabold text-purple-400 bg-purple-950/30 px-1.5 py-0.5 rounded">
                        {match.targetSticker.rarity}
                      </span>
                    </div>

                    <div className="flex items-center justify-center py-1">
                      <RefreshCw size={12} className="text-zinc-500 rotate-90" />
                    </div>

                    {/* Sender */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-2">
                      <div className="text-left">
                        <p className="text-[9px] text-zinc-500 font-mono">VOCÊ ADICIONA</p>
                        <p className="text-white text-xs font-semibold">{match.myOfferSticker.player}</p>
                        <p className="text-zinc-400 text-[10px] font-mono">{match.myOfferSticker.number}</p>
                      </div>
                      <span className="text-xs text-zinc-400 bg-white/5 px-1.5 py-0.5 rounded">
                        {match.myOfferSticker.rarity}
                      </span>
                    </div>
                  </div>

                  <p className="text-[10px] text-zinc-400 mt-3 text-left">
                    Dono: <strong className="text-zinc-200">{match.targetSticker.ownerName}</strong> ({match.targetSticker.album})
                  </p>
                </div>

                <button
                  onClick={() => onProposeTradeFromMatch(match.targetSticker)}
                  className="w-full mt-4 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs py-2 rounded-xl transition-all shadow-md flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <span>Propor Troca Direta</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-6 text-zinc-500 text-xs">
              Sem matches automáticos no momento. Tente adicionar mais itens à sua pilha de repetidas!
            </div>
          )}
        </div>
      </section>

      {/* NEARBY STICKERS FEED (FEED DE FIGURINHAS DISPONÍVEIS) */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-xl font-extrabold font-display text-white">Disponíveis Próximas a Você</h3>
            <p className="text-zinc-400 text-xs mt-0.5">Últimas figurinhas cadastradas por colecionadores locais</p>
          </div>
          <button
            onClick={() => onNavigate('marketplace')}
            className="text-xs text-yellow-400 hover:text-yellow-300 font-bold flex items-center space-x-1 cursor-pointer"
          >
            <span>Ver Marketplace</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {publicStickers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {publicStickers.slice(0, 4).map((sticker) => (
              <StickerCard 
                key={sticker.id}
                sticker={sticker}
                actionText={sticker.type === 'troca' ? 'Trocar' : 'Ver Oferta'}
                onActionClick={() => onSelectSticker(sticker)}
                onClick={() => onSelectSticker(sticker)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 glass-card rounded-2xl text-zinc-500 text-xs text-muted-foreground">
            Iniciando feed de dados do estádio... Nenhuma figurinha de outros usuários cadastrada.
          </div>
        )}
      </section>

      {/* Informative tips box about World Cup */}
      <section className="bg-linear-to-r from-red-950/40 to-slate-950 border border-red-500/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-white text-sm font-bold flex items-center gap-1.5">
            <TrendingUp size={14} className="text-orange-400" />
            Dica Copa do Mundo:
          </h4>
          <p className="text-zinc-400 text-xs mt-1.5 max-w-xl">
            A figurinha extra "Legend Gold" do Messi é uma das mais valorizadas de toda a história oficial de álbuns. Negocie com extrema cautela no chat privativo!
          </p>
        </div>
        <button 
          onClick={() => onNavigate('marketplace')}
          className="px-4 py-2 border border-white/10 hover:border-white/25 rounded-xl text-zinc-300 hover:text-white transition-colors duration-200 text-xs font-bold shrink-0 cursor-pointer"
        >
          Pesquisar Raras
        </button>
      </section>

    </div>
  );
};
