import React, { useEffect, useState } from 'react';
import { Eye, Type, Volume2, Keyboard, Check, RefreshCw, X } from 'lucide-react';
import { LanguageCode } from '../utils/translator';

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
  // Font Size States
  preferredFontSize: 'normal' | 'large' | 'huge';
  onFontSizeChange: (size: 'normal' | 'large' | 'huge') => void;
  // High Contrast State
  highContrast: boolean;
  onHighContrastToggle: () => void;
  // Black Font Mode State
  blackFontMode: boolean;
  onBlackFontToggle: () => void;
  // Audio guidance / Text to speech State
  speechEnabled: boolean;
  onSpeechToggle: () => void;
}

export const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({
  isOpen,
  onClose,
  preferredFontSize,
  onFontSizeChange,
  highContrast,
  onHighContrastToggle,
  blackFontMode,
  onBlackFontToggle,
  speechEnabled,
  onSpeechToggle,
}) => {
  const [showShortcutsInfo, setShowShortcutsInfo] = useState(false);

  // Focus trap and keyboard navigation for accessibility window
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Simple browser TTS implementation for greeting/guidance
  const speakDescription = (text: string) => {
    if (!speechEnabled) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech API error: ", e);
    }
  };

  const handleToggleContrastInternal = () => {
    onHighContrastToggle();
    setTimeout(() => {
      speakDescription(!highContrast ? "Modo de alto contraste ativado." : "Modo de alto contraste desativado.");
    }, 100);
  };

  const handleToggleBlackFontInternal = () => {
    onBlackFontToggle();
    setTimeout(() => {
      speakDescription(!blackFontMode ? "Modo claro com fonte preta ativado." : "Modo claro com fonte preta desativado.");
    }, 100);
  };

  const handleFontSizeChangeInternal = (size: 'normal' | 'large' | 'huge') => {
    onFontSizeChange(size);
    const sizeLabel = size === 'normal' ? 'normal' : size === 'large' ? 'grande' : 'gigante';
    setTimeout(() => {
      speakDescription(`Tamanho de texto alterado para ${sizeLabel}.`);
    }, 100);
  };

  const handleSpeechToggleInternal = () => {
    const nextState = !speechEnabled;
    onSpeechToggle();
    if (nextState) {
      setTimeout(() => {
        speakDescription("Auxílio de voz ativado! O sistema lerá informações para você ao focar ou interagir.");
      }, 100);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-panel-title"
    >
      <div 
        id="accessibility-container"
        className={`w-full max-w-lg p-6 rounded-3xl shadow-2xl relative transition-all duration-300 border ${
          highContrast 
            ? 'bg-black border-4 border-yellow-400 text-white' 
            : blackFontMode
              ? 'bg-white border-4 border-black text-black'
              : 'bg-slate-900/95 border-white/20 text-white'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2.5 rounded-xl border transition-all cursor-pointer ${
            highContrast
              ? 'border-white text-white hover:bg-white hover:text-black'
              : 'border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
          }`}
          aria-label="Fecar painel de acessibilidade"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2 rounded-lg ${highContrast ? 'bg-yellow-400 text-black' : 'bg-white/10 text-yellow-400'}`}>
            <Eye size={24} />
          </div>
          <div>
            <h2 id="accessibility-panel-title" className="text-xl font-black uppercase tracking-tight font-display">
              Recursos de Acessibilidade
            </h2>
            <p className={`text-xs ${highContrast ? 'text-yellow-400 font-bold' : 'text-zinc-400'}`}>
              Personalize para ter uma navegação confortável e inclusiva
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Section 1: Font Size Controls */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block font-bold">
              🔎 Tamanho das Fontes (Legibilidade)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['normal', 'large', 'huge'] as const).map((size) => {
                const isActive = preferredFontSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => handleFontSizeChangeInternal(size)}
                    className={`py-3 px-4 rounded-xl font-bold uppercase tracking-wider text-xs border transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      isActive
                        ? highContrast
                          ? 'bg-yellow-400 text-black border-yellow-400 font-black'
                          : 'bg-linear-to-r from-red-600 to-orange-500 text-white border-transparent shadow-lg shadow-orange-950/20'
                        : highContrast
                          ? 'bg-black text-white border-white hover:border-yellow-400 hover:text-yellow-400'
                          : 'bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10'
                    }`}
                    aria-pressed={isActive}
                  >
                    <span className={size === 'normal' ? 'text-xs' : size === 'large' ? 'text-sm font-semibold' : 'text-base font-bold'}>
                      {size === 'normal' ? 'Normal' : size === 'large' ? 'Grande' : 'Gigante'}
                    </span>
                    {isActive && <Check size={14} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Contrast Control */}
          <div className="space-y-3">
            <div className={`p-4 rounded-2xl flex items-center justify-between transition-all border ${
              highContrast 
                ? 'bg-zinc-900 border-yellow-400 lg:border-2' 
                : blackFontMode 
                  ? 'bg-zinc-100 border-zinc-200 text-black' 
                  : 'bg-white/5 border-white/5'
            }`}>
              <div className="space-y-1 pr-4">
                <span className={`text-xs font-mono uppercase tracking-wider block font-bold ${blackFontMode ? 'text-black' : 'text-zinc-400'}`}>
                  🌓 Modo Escuro (Alto Contraste)
                </span>
                <p className={`text-xs ${highContrast ? 'text-zinc-300' : blackFontMode ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  Substitui fundos vibrantes por preto sólido para facilitar a navegação em ambientes escuros.
                </p>
              </div>
              <button
                onClick={handleToggleContrastInternal}
                className={`px-5 py-3.5 rounded-xl font-black uppercase text-xs tracking-wider transition-all cursor-pointer ${
                  highContrast
                    ? 'bg-yellow-400 text-black shadow-md font-black hover:bg-yellow-300'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                aria-label={highContrast ? "Desativar Alto Contraste" : "Ativar Alto Contraste"}
              >
                {highContrast ? 'ATIVADO' : 'ATIVAR'}
              </button>
            </div>

            <div className={`p-4 rounded-2xl flex items-center justify-between transition-all border ${
              blackFontMode 
                ? 'bg-zinc-50 border-black' 
                : 'bg-white/5 border-white/5'
            }`}>
              <div className="space-y-1 pr-4">
                <span className={`text-xs font-mono uppercase tracking-wider block font-bold ${blackFontMode ? 'text-black' : 'text-zinc-400'}`}>
                  ☀️ Modo Claro (Fonte Preta)
                </span>
                <p className={`text-xs ${blackFontMode ? 'text-zinc-800' : 'text-zinc-400'}`}>
                  Substitui por fundo totalmente claro com fontes pretas espessas de altíssima legibilidade.
                </p>
              </div>
              <button
                onClick={handleToggleBlackFontInternal}
                className={`px-5 py-3.5 rounded-xl font-black uppercase text-xs tracking-wider transition-all cursor-pointer ${
                  blackFontMode
                    ? 'bg-black text-white hover:bg-zinc-900'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                aria-label={blackFontMode ? "Desativar Modo Claro Fonte Preta" : "Ativar Modo Claro Fonte Preta"}
              >
                {blackFontMode ? 'ATIVADO' : 'ATIVAR'}
              </button>
            </div>
          </div>

          {/* Section 3: Audio Assist / Screen Reader Simulation */}
          <div className={`p-4 rounded-2xl flex items-center justify-between transition-all border ${
            highContrast 
              ? 'bg-zinc-900 border-yellow-400' 
              : 'bg-white/5 border-white/5'
          }`}>
            <div className="space-y-1 pr-4">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block font-bold flex items-center gap-1">
                <Volume2 size={14} className="text-yellow-400" /> Auxílio de Voz (Sintetizador)
              </span>
              <p className={`text-xs ${highContrast ? 'text-zinc-300' : 'text-zinc-400'}`}>
                Lê em áudio as figurinhas e mensagens ao interagir ou focar nos controles importantes.
              </p>
            </div>
            <button
              onClick={handleSpeechToggleInternal}
              className={`px-5 py-3.5 rounded-xl font-black uppercase text-xs tracking-wider transition-all cursor-pointer ${
                speechEnabled
                  ? highContrast
                    ? 'bg-yellow-400 text-black shadow-md font-black hover:bg-yellow-300'
                    : 'bg-linear-to-r from-red-600 to-orange-500 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              aria-label={speechEnabled ? "Desativar Auxílio de Voz" : "Ativar Auxílio de Voz"}
            >
              {speechEnabled ? 'ATIVADO' : 'ATIVAR'}
            </button>
          </div>

          {/* Section 4: Hotkeys Helper */}
          <div className="border-t border-white/10 pt-4">
            <button
              onClick={() => {
                setShowShortcutsInfo(!showShortcutsInfo);
                speakDescription("Mostrando guia de navegação por atalhos de teclado do Copa do Mundo.");
              }}
              className="text-xs hover:underline font-mono text-yellow-400 font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Keyboard size={14} />
              <span>{showShortcutsInfo ? 'Ocultar Guia de Atalhos' : 'Ver Atalhos de Teclado Úteis'}</span>
            </button>

            {showShortcutsInfo && (
              <div className={`mt-3 p-3 rounded-2xl text-[11px] space-y-1.5 font-mono ${
                highContrast ? 'bg-zinc-950 border border-white text-white' : 'bg-black/40 text-zinc-300'
              }`}>
                <p>Navegue mais rápido segurando a tecla correspondente no teclado:</p>
                <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/5 text-[10px]">
                  <div>⌨️ <strong className="text-yellow-400 font-bold">1</strong>: Ir para Principal</div>
                  <div>⌨️ <strong className="text-yellow-400 font-bold">2</strong>: Meu Painel / Dashboard</div>
                  <div>⌨️ <strong className="text-yellow-400 font-bold">3</strong>: Marketplace</div>
                  <div>⌨️ <strong className="text-yellow-400 font-bold">4</strong>: Conversas em Aberto</div>
                  <div>⌨️ <strong className="text-yellow-400 font-bold">5</strong>: Criar Novo Anúncio</div>
                  <div>⌨️ <strong className="text-yellow-400 font-bold">A</strong>: Alternar Acessibilidade</div>
                  <div className="col-span-2">⌨️ <strong className="text-yellow-400 font-bold">TAB / Shift+TAB</strong>: Movimentar foco visual de elementos</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer ${
              highContrast
                ? 'bg-white text-black hover:bg-yellow-400 hover:text-black font-black'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            Concluir & Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};
