import React from 'react';
import { Sticker, User } from '../types';
import { StickerCard } from './StickerCard';
import { ArrowLeft, RefreshCw, ShoppingCart, User as UserIcon, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { translateText, LanguageCode } from '../utils/translator';

interface DetailTabProps {
  sticker: Sticker;
  currentUser: User;
  allStickers: Sticker[];
  onBack: () => void;
  onBuy: (sticker: Sticker) => void;
  onInitiateChat: (sticker: Sticker, defaultMessage?: string) => void;
  onNavigate: (tab: string) => void;
  onSelectSticker: (sticker: Sticker) => void;
  preferredLanguage: LanguageCode;
  autoTranslateEnabled: boolean;
}

export const DetailTab: React.FC<DetailTabProps> = ({
  sticker,
  currentUser,
  allStickers,
  onBack,
  onBuy,
  onInitiateChat,
  onNavigate,
  onSelectSticker,
  preferredLanguage,
  autoTranslateEnabled,
}) => {
  const { player, number, country, album, year, type, price, condition, rarity, ownerName, ownerId, description } = sticker;

  const isOwner = ownerId === currentUser.id;

  // Filter 3 related stickers (same country or same rarity)
  const relatedStickers = allStickers
    .filter((s) => s.id !== sticker.id && s.active && s.approved && (s.country === country || s.rarity === rarity))
    .slice(0, 4);

  const handleProposeSwap = () => {
    const welcome = `Olá ${ownerName}! Vi o seu anúncio da figurinha ${player} (${number}) no Marketplace e fiquei muito interessado em propor uma troca. Tenho algumas repetidas que podem lhe interessar!`;
    onInitiateChat(sticker, welcome);
  };

  return (
    <div className="space-y-10 text-left">
      {/* Back Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-zinc-400 hover:text-white font-bold text-xs cursor-pointer group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Voltar para Listagem</span>
        </button>
        <span className="text-zinc-500 font-mono text-[10px] tracking-wide uppercase">ID: {sticker.id}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Enlarged Card Visual */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="w-full max-w-sm">
            <StickerCard sticker={sticker} />
          </div>
        </div>

        {/* Right Column: Complete Specifications */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/10 space-y-6">
            
            {/* Athlete Specs Header */}
            <div>
              <div className="flex items-center space-x-2 flex-wrap gap-y-2">
                <span className={`text-[10px] uppercase font-mono tracking-wider font-bold px-2 py-0.5 rounded ${
                  rarity === 'Lendária' ? 'bg-amber-900/50 text-amber-300 border border-amber-500/20' :
                  rarity === 'Rara' ? 'bg-purple-900/50 text-purple-300 border border-purple-500/20' :
                  'bg-blue-900/50 text-blue-300 border border-blue-500/20'
                }`}>
                  🏆 {rarity} Edition
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold bg-white/5 text-zinc-300 px-2 py-0.5 rounded border border-white/5">
                  ⚽ {condition}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold bg-white/5 text-zinc-300 px-2 py-0.5 rounded border border-white/5">
                  📅 {album} ({year})
                </span>
              </div>

              <h1 className="text-3xl md:text-4.5xl font-extrabold font-display text-white mt-4 tracking-tight leading-none">
                {player}
              </h1>
              <p className="text-zinc-400 font-mono text-sm tracking-wide mt-2">Código da Figurinha: <strong className="text-white">{number}</strong></p>
            </div>

            {/* Description Text */}
            <div className="space-y-2 border-t border-b border-white/5 py-4">
              <h4 className="text-xs uppercase font-mono tracking-wider text-zinc-500 flex items-center justify-between">
                <span>Comentários do Dono</span>
                {autoTranslateEnabled && (
                  <span className="text-[10px] text-yellow-400 font-mono flex items-center gap-1">
                    <span>🌐</span> Tradução {preferredLanguage.toUpperCase()} Ativa
                  </span>
                )}
              </h4>
              <p className="text-zinc-300 text-xs leading-relaxed font-sans mt-1">
                {description}
              </p>

              {autoTranslateEnabled && translateText(description, preferredLanguage).translatedText !== description && (
                <div className="mt-3 p-3.5 rounded-xl bg-yellow-450/5 border border-yellow-450/20 text-xs">
                  <div className="flex items-center gap-1.5 text-[9px] uppercase font-mono font-black text-yellow-400 tracking-wider mb-1">
                    <span>🌍</span>
                    <span>Tradução Automática ({preferredLanguage.toUpperCase()}):</span>
                  </div>
                  <p className="text-zinc-100 font-sans italic leading-relaxed">
                    {translateText(description, preferredLanguage).translatedText}
                  </p>
                </div>
              )}
            </div>

            {/* Owner/Seller Reputation Profile Widget */}
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center space-x-3 text-left">
                <div className="p-2.5 bg-zinc-900 rounded-lg text-yellow-400 border border-white/5">
                  <UserIcon size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Publicitário</p>
                  <p className="text-white text-xs font-bold mt-0.5">{ownerName}</p>
                  <p className="text-zinc-400 text-[10px] flex items-center mt-0.5">
                    <MapPin size={9} className="mr-0.5 text-zinc-500" />
                    Belo Horizonte • ⭐ 4.9 (45 negociações)
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] bg-emerald-950/80 text-emerald-300 font-bold px-2 py-1 rounded border border-emerald-500/20 flex items-center space-x-1 font-mono uppercase">
                  <ShieldCheck size={11} />
                  <span>Verificado</span>
                </span>
              </div>
            </div>

            {/* Pricing Summary Row & Call to Action Trigger */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Modalidade e Preço</p>
                <div className="mt-1 flex items-baseline space-x-2">
                  {type === 'troca' ? (
                    <span className="text-emerald-400 text-xl font-extrabold flex items-center">
                      <RefreshCw size={16} className="mr-1 animate-spin-slow" />
                      Disponível para Troca
                    </span>
                  ) : (
                    <>
                      <span className="text-white text-2xl font-black font-display">R$ {price?.toFixed(2)}</span>
                      {type === 'ambos' && <span className="text-emerald-400 text-[10px] font-mono leading-none border border-emerald-500/25 px-1.5 py-0.5 rounded">Ou aceita troca</span>}
                    </>
                  )}
                </div>
              </div>

              {/* ACTION CALLS */}
              <div className="flex w-full md:w-auto gap-2">
                {isOwner ? (
                  <div className="bg-yellow-950/60 text-yellow-300 text-xs font-semibold p-3.5 rounded-xl border border-yellow-500/30 w-full text-center">
                    Este anúncio foi criado por você.
                  </div>
                ) : (
                  <>
                    {(type === 'venda' || type === 'ambos') && (
                      <button
                        onClick={() => onBuy(sticker)}
                        className="flex-1 md:flex-initial px-5 py-3 rounded-xl bg-white text-slate-950 text-xs font-extrabold flex items-center justify-center space-x-1.5 shadow-lg shadow-white/5 hover:bg-zinc-100 transition-colors uppercase tracking-wider cursor-pointer"
                      >
                        <ShoppingCart size={14} />
                        <span>Comprar Agora</span>
                      </button>
                    )}
                    {(type === 'troca' || type === 'ambos') && (
                      <button
                        onClick={handleProposeSwap}
                        className="flex-1 md:flex-initial px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold flex items-center justify-center space-x-1.5 shadow-lg shadow-emerald-900/20 transition-all uppercase tracking-wider cursor-pointer border border-emerald-500/10"
                      >
                        <RefreshCw size={14} />
                        <span>Propor Troca</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* RELATED STICKERS LIST */}
      <section className="space-y-6 pt-6 border-t border-white/5">
        <div>
          <h3 className="text-lg font-black font-display text-white">Também podem lhe interessar</h3>
          <p className="text-zinc-500 text-xs mt-0.5">Sugestões baseadas no time ou raridade da figurinha visualizada</p>
        </div>

        {relatedStickers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedStickers.map((rel) => (
              <StickerCard
                key={rel.id}
                sticker={rel}
                actionText="Ver Item"
                onActionClick={() => onSelectSticker(rel)}
                onClick={() => onSelectSticker(rel)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-zinc-500 text-xs">
            Nenhuma figurinha relacionada encontrada.
          </div>
        )}
      </section>

    </div>
  );
};
