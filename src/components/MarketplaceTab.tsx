import React, { useState, useEffect } from 'react';
import { Sticker } from '../types';
import { StickerCard } from './StickerCard';
import { Search, Filter, SlidersHorizontal, Loader2, Sparkles } from 'lucide-react';

interface MarketplaceTabProps {
  stickers: Sticker[];
  onSelectSticker: (sticker: Sticker) => void;
  onShowToast: (message: string, type: 'success' | 'error') => void;
}

export const MarketplaceTab: React.FC<MarketplaceTabProps> = ({
  stickers,
  onSelectSticker,
  onShowToast,
}) => {
  // Filter States
  const [search, setSearch] = useState('');
  const [type, setType] = useState<string>('todos');
  const [rarity, setRarity] = useState<string>('todos');
  const [country, setCountry] = useState<string>('todos');
  const [condition, setCondition] = useState<string>('todos');
  const [maxPrice, setMaxPrice] = useState<number>(400);

  // Pagination simulation
  const [visibleCount, setVisibleCount] = useState(8);
  const [loadingMore, setLoadingMore] = useState(false);

  // Loading skeleton simulation on filter change
  const [filtering, setFiltering] = useState(false);

  // Trigger filtering simulation effect
  useEffect(() => {
    setFiltering(true);
    const timer = setTimeout(() => {
      setFiltering(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [search, type, rarity, country, condition, maxPrice]);

  // Extract unique countries
  const countries = Array.from(new Set(stickers.map((s) => s.country)));

  // Perform filtration logic (only approved and active stickers)
  const filteredStickers = stickers.filter((sticker) => {
    if (!sticker.active || !sticker.approved) return false;

    // Search term matching
    const matchesSearch = 
      sticker.player.toLowerCase().includes(search.toLowerCase()) ||
      sticker.number.toLowerCase().includes(search.toLowerCase()) ||
      sticker.album.toLowerCase().includes(search.toLowerCase());

    // Type matching
    const matchesType = 
      type === 'todos' || 
      sticker.type === type || 
      (type === 'troca' && sticker.type === 'ambos') ||
      (type === 'venda' && sticker.type === 'ambos');

    // Rarity matching
    const matchesRarity = rarity === 'todos' || sticker.rarity === rarity;

    // Country matching
    const matchesCountry = country === 'todos' || sticker.country === country;

    // Condition matching
    const matchesCondition = condition === 'todos' || sticker.condition === condition;

    // Price matching
    const matchesPrice = 
      sticker.type === 'troca' || 
      !sticker.price || 
      sticker.price <= maxPrice;

    return matchesSearch && matchesType && matchesRarity && matchesCountry && matchesCondition && matchesPrice;
  });

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setLoadingMore(false);
      onShowToast('Novos anúncios de figurinhas carregados!', 'success');
    }, 850);
  };

  const handleResetFilters = () => {
    setSearch('');
    setType('todos');
    setRarity('todos');
    setCountry('todos');
    setCondition('todos');
    setMaxPrice(400);
    onShowToast('Filtros restaurados com sucesso.', 'success');
  };

  return (
    <div className="space-y-8 text-left">
      <div>
        <h2 className="text-2xl font-black font-display text-white tracking-tight">Marketplace Global</h2>
        <p className="text-zinc-400 text-xs mt-1">Busque figurinhas brilhantes, edições lendárias e cards para fechar propostas rápidas.</p>
      </div>

      {/* FILTER CONTROLS BAR */}
      <section className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
        {/* Row 1: Search and Type Toggle */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-zinc-500" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por jogador, número, ano ou álbum (ex: Messi, QA-01)..."
              className="w-full glass-input rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 items-center bg-white/5 rounded-xl p-1 border border-white/5">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'venda', label: 'Venda 💰' },
              { id: 'troca', label: 'Troca 🤝' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setType(btn.id)}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  type === btn.id
                    ? 'bg-white text-slate-950 font-extrabold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Secondary Dropdowns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div>
            <label className="text-zinc-400 text-[10px] font-mono tracking-wider block mb-1 uppercase">Raridade</label>
            <select
              value={rarity}
              onChange={(e) => setRarity(e.target.value)}
              className="w-full glass-input rounded-xl px-2 py-2 text-xs bg-slate-900"
            >
              <option value="todos">Todas as raridades</option>
              <option value="Comum">Comum</option>
              <option value="Rara">Rara</option>
              <option value="Lendária">Lendária</option>
            </select>
          </div>

          <div>
            <label className="text-zinc-400 text-[10px] font-mono tracking-wider block mb-1 uppercase">País Selecionado</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full glass-input rounded-xl px-2 py-2 text-xs bg-slate-900"
            >
              <option value="todos">Todos os países</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-zinc-400 text-[10px] font-mono tracking-wider block mb-1 uppercase">Estado Físico</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full glass-input rounded-xl px-2 py-2 text-xs bg-slate-900"
            >
              <option value="todos">Qualquer estado</option>
              <option value="Novo">Novo (Zera)</option>
              <option value="Usado">Usado</option>
            </select>
          </div>

          {/* Pricing slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-zinc-400 text-[10px] font-mono tracking-wider block uppercase">Preço Máximo</label>
              <span className="text-white text-[10px] font-bold font-mono">R$ {maxPrice}</span>
            </div>
            <input
              type="range"
              min="10"
              max="400"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              disabled={type === 'troca'}
            />
          </div>
        </div>

        {/* Filters Summary & Reset */}
        <div className="flex justify-between items-center border-t border-white/5 pt-3 text-[11px] text-zinc-400">
          <p>
            Encontrados <strong className="text-white">{filteredStickers.length}</strong> resultados correspondentes.
          </p>
          <button
            onClick={handleResetFilters}
            className="text-yellow-400 hover:text-yellow-300 font-bold hover:underline cursor-pointer"
          >
            Limpar Filtros
          </button>
        </div>
      </section>

      {/* STICKERS CARDS LIST */}
      <section>
        {filtering ? (
          /* SKELETON SCREEN LOADING STATES SIMULATION */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-card rounded-2xl p-4 h-[340px] animate-pulse flex flex-col justify-between border border-white/5 bg-slate-900/40">
                <div className="flex justify-between items-center">
                  <div className="w-16 h-3 bg-white/10 rounded" />
                  <div className="w-10 h-4 bg-white/10 rounded" />
                </div>
                <div className="w-full h-[140px] bg-white/5 rounded-lg my-3" />
                <div className="space-y-2">
                  <div className="w-3/4 h-4 bg-white/10 rounded" />
                  <div className="w-1/2 h-3 bg-white/5 rounded" />
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-white/5">
                  <div className="w-16 h-4 bg-white/10 rounded" />
                  <div className="w-16 h-6 bg-white/5 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredStickers.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredStickers.slice(0, visibleCount).map((sticker) => (
                <StickerCard
                  key={sticker.id}
                  sticker={sticker}
                  actionText={sticker.type === 'troca' ? 'Trocar' : 'Ver Oferta'}
                  onActionClick={() => onSelectSticker(sticker)}
                  onClick={() => onSelectSticker(sticker)}
                />
              ))}
            </div>

            {/* Pagination Button */}
            {filteredStickers.length > visibleCount && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="animate-spin text-yellow-400" size={16} />
                      <span>Carregando...</span>
                    </>
                  ) : (
                    <>
                      <Filter size={14} className="text-zinc-400" />
                      <span>Carregar Mais Figurinhas</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty results */
          <div className="text-center py-20 bg-slate-950/20 border border-dashed border-white/10 rounded-2xl p-6">
            <SlidersHorizontal className="text-zinc-500 mx-auto mb-3" size={32} />
            <h3 className="text-white font-bold text-sm">Nenhum resultado correspondente</h3>
            <p className="text-zinc-500 text-xs mt-1.5 max-w-xs mx-auto">Tente ajustar seus filtros ou trocar as palavras-chave de busca para encontrar o colecionável desejado.</p>
            <button
              onClick={handleResetFilters}
              className="mt-4 bg-yellow-400 hover:bg-yellow-300 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Restaurar Filtros
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
