import React from 'react';
import { Sticker } from '../types';
import { Award, RefreshCw, ShoppingCart, User as UserIcon, ShieldAlert } from 'lucide-react';

interface StickerCardProps {
  sticker: Sticker;
  onClick?: () => void;
  actionText?: string;
  onActionClick?: (e: React.MouseEvent) => void;
  showModerationStatus?: boolean;
}

export const StickerCard: React.FC<StickerCardProps> = ({
  sticker,
  onClick,
  actionText,
  onActionClick,
  showModerationStatus = false
}) => {
  const { number, player, country, year, album, type, price, condition, rarity, ownerName } = sticker;

  // Visual configuration based on rarity
  const getRarityConfig = () => {
    switch (rarity) {
      case 'Lendária':
        return {
          glow: 'shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:shadow-[0_0_30px_rgba(234,179,8,0.65)]',
          border: 'border-amber-400 bg-linear-to-b from-amber-500/20 to-amber-950/40',
          badge: 'bg-linear-to-r from-amber-500 to-yellow-300 text-amber-950 font-extrabold',
          accent: 'font-display text-amber-300',
          cardPattern: 'radial-gradient(circle at center, rgba(234, 179, 8, 0.15) 0%, transparent 70%)',
          textBg: 'bg-amber-950/80 border-amber-500/30'
        };
      case 'Rara':
        return {
          glow: 'shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.65)]',
          border: 'border-purple-400 bg-linear-to-b from-purple-500/20 to-purple-950/40',
          badge: 'bg-linear-to-r from-purple-600 to-pink-500 text-white font-bold',
          accent: 'font-display text-purple-300',
          cardPattern: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
          textBg: 'bg-purple-950/80 border-purple-500/30'
        };
      default:
        return {
          glow: 'shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.45)]',
          border: 'border-blue-400/50 bg-linear-to-b from-blue-500/10 to-slate-900/40',
          badge: 'bg-linear-to-r from-blue-600 to-cyan-500 text-white font-medium',
          accent: 'font-display text-blue-300',
          cardPattern: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          textBg: 'bg-slate-950/80 border-blue-500/20'
        };
    }
  };

  const rarityConfig = getRarityConfig();

  // Simulated player avatars with beautiful gradient silhouette if we can't find specific ones
  const getPlayerVisual = () => {
    switch (sticker.image) {
      case 'messi':
        return 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=300&q=80';
      case 'cr7':
        return 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&w=300&q=80';
      case 'neymar':
        return 'https://images.unsplash.com/photo-1504156806630-6815682787c8?auto=format&fit=crop&w=300&q=80';
      case 'mbappe':
        return 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=300&q=80';
      default:
        return 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=300&q=80';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl p-[3px] transition-all duration-300 cursor-pointer overflow-hidden group border ${rarityConfig.border} ${rarityConfig.glow} hover:-translate-y-1.5`}
    >
      {/* Background Foil Shine Reflection effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.2) 55%, transparent 70%)',
          backgroundSize: '200% 200%',
          animation: 'shine 2s infinite linear'
        }}
      />

      {/* Main Container */}
      <div 
        className="rounded-xl p-3 bg-slate-950/85 flex flex-col h-[340px] relative justify-between overflow-hidden"
        style={{ backgroundImage: rarityConfig.cardPattern }}
      >
        
        {/* Top Header Card Info */}
        <div className="flex justify-between items-start z-10">
          <div>
            <span className={`text-[10px] tracking-widest font-mono ${rarityConfig.accent} uppercase`}>
              {album}
            </span>
            <div className="text-xl font-bold font-display text-white mt-0.5 leading-none">
              {number}
            </div>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full ${rarityConfig.badge}`}>
            {rarity}
          </span>
        </div>

        {/* Player Photo Visual Container */}
        <div className="my-2 h-[140px] w-full rounded-lg relative overflow-hidden flex items-center justify-center bg-slate-900 border border-white/5">
          {/* Action indicator at photo corner */}
          <div className="absolute top-1.5 right-1.5 z-10">
            {type === 'venda' && (
              <span className="bg-red-500/95 text-white p-1 rounded-full flex items-center justify-center shadow-md" title="Para Venda">
                <ShoppingCart size={12} />
              </span>
            )}
            {type === 'troca' && (
              <span className="bg-emerald-500/95 text-white p-1 rounded-full flex items-center justify-center shadow-md" title="Para Troca">
                <RefreshCw size={12} />
              </span>
            )}
            {type === 'ambos' && (
              <span className="bg-linear-to-r from-red-500 to-emerald-500 text-white p-1 rounded-full flex items-center justify-center shadow-md animate-pulse" title="Venda ou Troca">
                <Award size={12} />
              </span>
            )}
          </div>

          <img 
            src={getPlayerVisual()} 
            alt={player} 
            referrerPolicy="no-referrer"
            className="object-cover w-full h-full opacity-65 group-hover:scale-105 transition-transform duration-500" 
          />

          {/* Player Country Overlay flag bubble */}
          <div className="absolute bottom-1.5 left-1.5 bg-black/75 px-2 py-0.5 rounded-md border border-white/10 flex items-center space-x-1">
            <span className="text-[10px] text-zinc-300 font-medium">{country}</span>
          </div>

          {/* Condition Bubble */}
          <div className="absolute bottom-1.5 right-1.5 bg-black/75 px-1.5 py-0.5 rounded-md border border-white/10">
            <span className="text-[9px] text-zinc-300">{condition}</span>
          </div>
        </div>

        {/* Info Area */}
        <div className="z-10 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="text-white text-lg font-bold font-sans tracking-tight truncate leading-tight mt-1">
              {player}
            </h3>
            <p className="text-zinc-400 text-xs mt-1 flex items-center">
              <UserIcon size={12} className="inline mr-1 text-zinc-500" />
              <span className="truncate">Colecionador: {ownerName}</span>
            </p>
          </div>

          {/* Price & Action Row */}
          <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between">
            <div>
              <p className="text-[9px] text-zinc-500 uppercase font-mono tracking-wider">Oferta</p>
              {type === 'troca' ? (
                <div className="text-emerald-400 font-bold text-xs flex items-center bg-emerald-950/40 border border-emerald-500/20 px-1.5 py-0.5 rounded mt-0.5">
                  <RefreshCw size={11} className="mr-1 animate-spin-slow" />
                  Troca
                </div>
              ) : (
                <div className="text-white font-extrabold text-sm font-display">
                  R$ {price?.toFixed(2)}
                  {type === 'ambos' && <span className="text-emerald-400 text-[10px] font-normal block">Ou Troca</span>}
                </div>
              )}
            </div>

            {actionText && onActionClick && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onActionClick(e);
                }}
                className={`py-2 px-4 rounded-xl text-xs font-black transition-all duration-200 z-10 uppercase tracking-wider hover:scale-105 active:scale-95 cursor-pointer ${
                  type === 'troca' 
                    ? 'bg-emerald-550 hover:bg-emerald-500 text-white shadow-md' 
                    : 'bg-yellow-400 hover:bg-yellow-300 text-black shadow-md shadow-yellow-500/10'
                }`}
              >
                {actionText}
              </button>
            )}
          </div>
        </div>

        {/* Admin Moderation Status Alert */}
        {showModerationStatus && !sticker.approved && (
          <div className="absolute inset-0 bg-red-950/90 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center z-20">
            <ShieldAlert className="text-red-400 mb-2" size={32} />
            <h4 className="text-white font-bold text-sm">Aguardando Moderação</h4>
            <p className="text-zinc-400 text-xs mt-1">Este anúncio só estará visível para outros após aprovação de um Administrador.</p>
            {actionText && onActionClick && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onActionClick(e);
                }}
                className="mt-3 bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold"
              >
                {actionText}
              </button>
            )}
          </div>
        )}

      </div>

      <style>{`
        @keyframes shine {
          0% { background-position: -200% -200%; }
          100% { background-position: 200% 200%; }
        }
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
