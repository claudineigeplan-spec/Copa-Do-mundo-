import React, { useState } from 'react';
import { Sticker, User } from '../types';
import { StickerCard } from './StickerCard';
import { Sparkles, FileText, Upload, Plus, Cpu } from 'lucide-react';

interface CreateAdTabProps {
  currentUser: User;
  onAnnounceSticker: (newSticker: Sticker) => void;
  onShowToast: (message: string, type: 'success' | 'alert' | 'error') => void;
  onNavigate: (tab: string) => void;
}

export const CreateAdTab: React.FC<CreateAdTabProps> = ({
  currentUser,
  onAnnounceSticker,
  onShowToast,
  onNavigate,
}) => {
  // Local form values
  const [number, setNumber] = useState('BR-10');
  const [player, setPlayer] = useState('Neymar Jr');
  const [country, setCountry] = useState('Brasil');
  const [year, setYear] = useState('2022');
  const [album, setAlbum] = useState('Qatar 2022');
  const [type, setType] = useState<'venda' | 'troca' | 'ambos'>('venda');
  const [price, setPrice] = useState<number>(30);
  const [condition, setCondition] = useState<'Novo' | 'Usado'>('Novo');
  const [rarity, setRarity] = useState<'Comum' | 'Rara' | 'Lendária'>('Rara');
  const [imageStyle, setImageStyle] = useState('neymar');
  const [description, setDescription] = useState('Figurinha brilhante original em perfeito estado.');

  // Simulated image upload states
  const [imageSelected, setImageSelected] = useState(true);

  // Auto-approve rule toggle to test both options or just explain how it triggers moderation
  const [skipModeration, setSkipModeration] = useState(false);

  // Generate the current preview object reactively
  const previewSticker: Sticker = {
    id: 'preview',
    number: number || 'QA-01',
    player: player || 'Nome do Jogador',
    country: country || 'Brasil',
    year: year || '2022',
    album: album || 'Qatar 2022',
    type,
    price: type !== 'troca' ? Number(price) : undefined,
    condition,
    image: imageStyle,
    description: description || 'Sem descrição cadastrada.',
    rarity,
    ownerId: currentUser.id,
    ownerName: currentUser.name,
    active: true,
    approved: true // preview is always displayed approved
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!number || !player || !country || !album) {
      onShowToast('Por favor, preencha todos os campos obrigatórios!', 'error');
      return;
    }

    const newSticker: Sticker = {
      id: `sticker_${Date.now()}`,
      number: number.trim().toUpperCase(),
      player: player.trim(),
      country,
      year: year || '2022',
      album,
      type,
      price: type !== 'troca' ? Number(price) : undefined,
      condition,
      image: imageStyle,
      description: description.trim(),
      rarity,
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      active: true,
      approved: skipModeration // if skip, approved straight away! else false for testing admin moderation screen
    };

    onAnnounceSticker(newSticker);

    if (newSticker.approved) {
      onShowToast(`Anúncio publicado com sucesso no Marketplace!`, 'success');
      onNavigate('marketplace');
    } else {
      onShowToast(`Anúncio enviado para moderação! Acesse o Painel Admin para aprová-lo instantaneamente.`, 'success');
      onNavigate('dashboard');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-black font-display text-white tracking-tight">Anunciar Colecionável</h2>
        <p className="text-zinc-400 text-xs mt-1">Crie um anúncio no nosso marketplace global e atraia compradores ou parceiros de troca.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form panel */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 glass-card rounded-2xl p-6 border border-white/10 space-y-5">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-zinc-300 text-[10px] font-mono tracking-wider uppercase block mb-1.5">Número Identificador *</label>
              <input 
                type="text" 
                value={number} 
                onChange={(e) => setNumber(e.target.value)} 
                placeholder="Ex: ARG-10, QA-01" 
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs uppercase"
                required
              />
            </div>
            <div>
              <label className="text-zinc-300 text-[10px] font-mono tracking-wider uppercase block mb-1.5">Nome do Jogador *</label>
              <input 
                type="text" 
                value={player} 
                onChange={(e) => setPlayer(e.target.value)} 
                placeholder="Ex: Lionel Messi" 
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-zinc-300 text-[10px] font-mono tracking-wider uppercase block mb-1.5">País</label>
              <select 
                value={country} 
                onChange={(e) => setCountry(e.target.value)}
                className="w-full glass-input rounded-xl px-2 py-2.5 text-xs bg-slate-900"
              >
                <option value="Brasil">Brasil 🇧🇷</option>
                <option value="Argentina">Argentina 🇦🇷</option>
                <option value="Portugal">Portugal 🇵🇹</option>
                <option value="França">França 🇫🇷</option>
                <option value="Alemanha">Alemanha 🇩🇪</option>
                <option value="Inglaterra">Inglaterra 🇬🇧</option>
                <option value="Croácia">Croácia 🇭🇷</option>
                <option value="Espanha">Espanha 🇪🇸</option>
              </select>
            </div>

            <div>
              <label className="text-zinc-300 text-[10px] font-mono tracking-wider uppercase block mb-1.5">Raridade</label>
              <select 
                value={rarity} 
                onChange={(e) => setRarity(e.target.value as any)}
                className="w-full glass-input rounded-xl px-2 py-2.5 text-xs bg-slate-900"
              >
                <option value="Comum">Comum</option>
                <option value="Rara">Rara (Brilhante)</option>
                <option value="Lendária">Lendária (Foil Extra)</option>
              </select>
            </div>

            <div>
              <label className="text-zinc-300 text-[10px] font-mono tracking-wider uppercase block mb-1.5">Temporada/Álbum *</label>
              <input 
                type="text" 
                value={album} 
                onChange={(e) => setAlbum(e.target.value)} 
                placeholder="Ex: Qatar 2022" 
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-zinc-300 text-[10px] font-mono tracking-wider uppercase block mb-1.5">Intenção de Negócio</label>
              <select 
                value={type} 
                onChange={(e) => setType(e.target.value as any)}
                className="w-full glass-input rounded-xl px-2 py-2.5 text-xs bg-slate-900"
              >
                <option value="venda">Apenas Venda 💰</option>
                <option value="troca">Apenas Troca 🤝</option>
                <option value="ambos">Venda ou Troca 🔄</option>
              </select>
            </div>

            {type !== 'troca' && (
              <div>
                <label className="text-zinc-300 text-[10px] font-mono tracking-wider uppercase block mb-1.5">Preço Desejado (R$)*</label>
                <input 
                  type="number" 
                  value={price} 
                  onChange={(e) => setPrice(Math.max(1, Number(e.target.value)))} 
                  min="1"
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs"
                  required={type !== 'troca'}
                />
              </div>
            )}

            <div>
              <label className="text-zinc-300 text-[10px] font-mono tracking-wider uppercase block mb-1.5">Estado Física</label>
              <div className="grid grid-cols-2 gap-2">
                {['Novo', 'Usado'].map((cond) => (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => setCondition(cond as any)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      condition === cond 
                        ? 'bg-white text-slate-950 font-extrabold' 
                        : 'bg-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="text-zinc-300 text-[10px] font-mono tracking-wider uppercase block mb-1.5">Simulação de Arte/Foto</label>
            <div className="grid grid-cols-5 gap-2">
              {[
                { id: 'messi', label: 'Messi 🐐' },
                { id: 'cr7', label: 'CR7 🇵🇹' },
                { id: 'neymar', label: 'Ney Jr 🇧🇷' },
                { id: 'mbappe', label: 'Mbappé 🇫🇷' },
                { id: 'default', label: 'Outro ⚽' },
              ].map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setImageStyle(style.id)}
                  className={`py-1.5 rounded-lg text-[10px] font-bold text-center border capitalize transition-all cursor-pointer ${
                    imageStyle === style.id
                      ? 'border-yellow-400 bg-yellow-950/40 text-yellow-300'
                      : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-zinc-300 text-[10px] font-mono tracking-wider uppercase block mb-1.5">Descrição do Item</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o estado de conservação, detalhes adicionais, ou propostas de troca que aceita..."
              rows={3}
              className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs font-medium"
            />
          </div>

          {/* SIMULATED UPLOAD BOX */}
          <div className="p-4 bg-white/5 rounded-xl border border-dashed border-white/20 text-center flex flex-col items-center justify-center">
            <Upload className="text-zinc-400 mb-2" size={24} />
            <div className="text-white text-xs font-bold">Foto da Figurinha Física</div>
            <p className="text-zinc-500 text-[10px] mt-1">Clique para simular upload (imagem recomendada para maior segurança)</p>
            <div className="mt-2.5 flex items-center space-x-1 px-2 py-0.5 bg-emerald-950/80 border border-emerald-500/20 text-emerald-300 rounded text-[9px] font-bold font-mono">
              <span>✓ ARQUIVO RECONHECIDO POR OCR</span>
            </div>
          </div>

          {/* MODERATION TOGGLE DESIGN FOR TESTING FLUX */}
          <div className="bg-slate-950 border border-white/5 rounded-xl p-4 flex items-center justify-between">
            <div className="text-left">
              <div className="text-white text-xs font-bold">Publicação Direta (Simulação Admin)</div>
              <p className="text-zinc-500 text-[10px] mt-0.5">Ative para pular a moderação e publicar imediatamente no Marketplace.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={skipModeration} 
                onChange={(e) => setSkipModeration(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-linear-to-r from-red-650 via-orange-550 to-yellow-550 text-white font-extrabold text-xs shadow-lg uppercase tracking-wider hover:scale-[1.01] transition-transform cursor-pointer"
          >
            Publicar Anúncio de Figurinha
          </button>
        </form>

        {/* Live Preview panel */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
          <h3 className="text-white text-xs font-extrabold tracking-wider uppercase font-mono flex items-center space-x-1.5">
            <span className="p-1 bg-yellow-950/50 border border-yellow-500/20 text-yellow-400 rounded-md">
              <Sparkles size={12} />
            </span>
            <span>Card de Preview em tempo real</span>
          </h3>

          <StickerCard 
            sticker={previewSticker}
            actionText={type === 'troca' ? 'Trocar' : 'Ver Oferta'}
            onActionClick={() => onShowToast('Essa é apenas uma visualização do seu card!', 'success')}
          />

          <div className="glass-card rounded-2xl p-4 border border-white/10 text-left">
            <p className="text-zinc-400 text-[11px] leading-relaxed flex gap-2">
              <Cpu shrink-0 text-yellow-400 size={14} className="mt-0.5 text-yellow-400 text-shadow-rainbow" />
              <span>Dica: Os colecionadores são atraídos por descrições completas e números legíveis. Evite colocar dados que enganem quem está completando o álbum da copa.</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
