import React, { useState, useRef, useEffect } from 'react';
import { ChatConversation, User, Sticker } from '../types';
import { Send, RefreshCw, ShoppingCart, CheckCircle, ShieldAlert, FileText, User as UserIcon } from 'lucide-react';
import { translateText, LanguageCode } from '../utils/translator';

interface ChatTabProps {
  conversations: ChatConversation[];
  currentUser: User;
  onSendMessage: (conversationId: string, text: string) => void;
  onConfirmTransaction: (conversationId: string, status: 'completed_sale' | 'completed_trade') => void;
  onShowToast: (message: string, type: 'success' | 'error') => void;
  preferredLanguage: LanguageCode;
  autoTranslateEnabled: boolean;
  onToggleAutoTranslate: () => void;
}

export const ChatTab: React.FC<ChatTabProps> = ({
  conversations,
  currentUser,
  onSendMessage,
  onConfirmTransaction,
  onShowToast,
  preferredLanguage,
  autoTranslateEnabled,
  onToggleAutoTranslate,
}) => {
  const [selectedChatId, setSelectedChatId] = useState<string>(
    conversations.length > 0 ? conversations[0].id : ''
  );
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations, selectedChatId]);

  const activeChat = conversations.find((c) => c.id === selectedChatId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !selectedChatId) return;

    onSendMessage(selectedChatId, inputMessage.trim());
    setInputMessage('');
  };

  const handleConfirmDeal = (dealType: 'completed_sale' | 'completed_trade') => {
    if (!activeChat) return;

    onConfirmTransaction(activeChat.id, dealType);
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-white/10 grid grid-cols-1 md:grid-cols-12 h-[600px] text-left">
      
      {/* LEFT PANEL: ACTIVE CONVERSATIONS LIST */}
      <div className="md:col-span-4 border-r border-white/5 flex flex-col bg-slate-950/20">
        <div className="p-4 border-b border-white/5 bg-slate-950/40">
          <h3 className="text-white text-sm font-extrabold font-display uppercase tracking-wide">Conversas Ativas</h3>
          <p className="text-zinc-500 text-[10px] mt-0.5">Clique nas negociações abaixo</p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-white/[0.03]">
          {conversations.length > 0 ? (
            conversations.map((chat) => {
              const otherPartyName = chat.buyerId === currentUser.id ? chat.sellerName : chat.buyerName;
              const isSelected = chat.id === selectedChatId;
              const lastMsg = chat.messages[chat.messages.length - 1];

              return (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChatId(chat.id)}
                  className={`p-4 cursor-pointer transition-all flex items-start space-x-3 text-left ${
                    isSelected ? 'bg-white/10 border-l-4 border-yellow-400' : 'hover:bg-white/5'
                  }`}
                >
                  {/* Mock profile photo placeholder */}
                  <div className="w-10 h-10 rounded-full bg-linear-to-tr from-red-500 to-indigo-500 flex items-center justify-center font-bold text-white text-xs shrink-0 select-none border border-white/10 uppercase shadow-md shadow-black/30">
                    {otherPartyName.charAt(0)}{otherPartyName.charAt(1)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-xs font-bold text-white truncate">{otherPartyName}</h4>
                      <span className="text-[9px] text-zinc-500 font-mono">{lastMsg ? lastMsg.timestamp : ''}</span>
                    </div>
                    <p className="text-yellow-400 text-[10px] uppercase font-mono tracking-wider mt-0.5 truncate">{chat.stickerName}</p>
                    <p className="text-zinc-405 text-xs truncate mt-1">
                      {lastMsg ? lastMsg.text : 'Nenhuma mensagem escrita.'}
                    </p>
                    {chat.status !== 'active' && (
                      <span className={`inline-block text-[8px] px-1.5 py-0.5 rounded font-bold uppercase mt-1.5 ${
                        chat.status.startsWith('completed') ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' : 'bg-zinc-900 text-zinc-400'
                      }`}>
                        {chat.status === 'completed_sale' ? 'Venda Concluída' : 'Troca Concluída'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-zinc-500 text-xs">
              Nenhuma negociação em andamento. Procure figurinhas no marketplace e proponha trocas!
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL: MAIN CHAT MESSAGES WINDOW */}
      <div className="md:col-span-8 flex flex-col h-full bg-slate-950/40 relative">
        {activeChat ? (
          <>
            {/* Chat header area */}
            <div className="p-4 border-b border-white/5 bg-slate-950/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-10">
              <div className="text-left flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-zinc-400 font-bold border border-white/10">
                  {currentUser.id === activeChat.buyerId ? activeChat.sellerName.charAt(0) : activeChat.buyerName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold">
                    Negociando com {currentUser.id === activeChat.buyerId ? activeChat.sellerName : activeChat.buyerName}
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
                    <span className="inline-flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[10px] text-zinc-400 font-mono">Figurinha: {activeChat.stickerName}</span>
                    </span>
                    
                    <button
                      type="button"
                      onClick={onToggleAutoTranslate}
                      className={`text-[9px] px-2 py-0.5 rounded-full border transition-all cursor-pointer flex items-center gap-1 font-mono uppercase tracking-wider ${
                        autoTranslateEnabled 
                          ? 'bg-yellow-450/15 border-yellow-450/40 text-yellow-400 font-bold shadow-[0_0_10px_rgba(234,179,8,0.1)]' 
                          : 'bg-zinc-900 border-zinc-700 text-zinc-500'
                      }`}
                      title={autoTranslateEnabled ? "Clique para desativar tradução automática" : "Clique para ativar tradução automática"}
                    >
                      <span>🔄 Tradução: {autoTranslateEnabled ? 'Ativada' : 'Desativada'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Transaction Execution Action Buttons */}
              {activeChat.status === 'active' && (
                <div className="flex items-center gap-2">
                  {(activeChat.stickerType === 'venda' || activeChat.stickerType === 'ambos') && (
                    <button
                      onClick={() => handleConfirmDeal('completed_sale')}
                      className="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 cursor-pointer transition-all"
                    >
                      <ShoppingCart size={11} />
                      <span>Confirmar Venda</span>
                    </button>
                  )}
                  {(activeChat.stickerType === 'troca' || activeChat.stickerType === 'ambos') && (
                    <button
                      onClick={() => handleConfirmDeal('completed_trade')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 cursor-pointer transition-all"
                    >
                      <RefreshCw size={11} className="animate-spin-slow" />
                      <span>Aceitar Troca</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex justify-center my-2">
                <span className="bg-white/5 border border-white/5 text-zinc-500 text-[10px] px-3 py-1 rounded-full font-mono tracking-wide">
                  🛡️ Chat de negociação monitorado pela plataforma Copa do Mundo
                </span>
              </div>

              {activeChat.messages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;
                
                const translationResult = autoTranslateEnabled 
                  ? translateText(msg.text, preferredLanguage) 
                  : { translatedText: msg.text, isSimulated: false };
                
                const hasTranslation = autoTranslateEnabled && 
                  translationResult.translatedText !== msg.text;

                return (
                  <div 
                    key={msg.id} 
                    className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div className={`max-w-[80%] rounded-2xl p-3.5 text-xs transition-all duration-300 ${
                      isMe 
                        ? 'bg-linear-to-br from-red-650 to-orange-550 text-white rounded-tr-none' 
                        : 'bg-white/10 text-zinc-100 rounded-tl-none border border-white/5'
                    }`}>
                      {/* Original text content */}
                      <p className="leading-relaxed">{msg.text}</p>
                      
                      {/* Translation details overlay */}
                      {hasTranslation && (
                        <div className={`mt-2 pt-2 border-t text-[11px] leading-relaxed italic ${
                          isMe ? 'border-white/20 text-white/90' : 'border-white/10 text-yellow-250/90'
                        }`}>
                          <div className="flex items-center gap-1 text-[9px] uppercase font-mono tracking-wider font-extrabold pb-1">
                            <span>🌍</span>
                            <span>Tradução ({preferredLanguage.toUpperCase()}):</span>
                          </div>
                          {translationResult.translatedText}
                        </div>
                      )}

                      <span className={`block text-[9px] mt-1.5 text-right font-mono ${isMe ? 'text-white/60' : 'text-zinc-500'}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}
              
              {/* Ref point for auto scrolling */}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat bottom message entry input form */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-slate-950/50 flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={activeChat.status !== 'active'}
                placeholder={activeChat.status === 'active' 
                  ? "Digite uma mensagem para negociar..." 
                  : "Esta negociação já foi finalizada neste chat."}
                className="flex-1 glass-input rounded-xl px-4 py-3 text-xs disabled:opacity-40"
              />
              <button
                type="submit"
                disabled={activeChat.status !== 'active' || !inputMessage.trim()}
                className="p-3 rounded-xl bg-white disabled:bg-zinc-800 disabled:opacity-30 text-slate-950 hover:bg-zinc-200 transition-all flex items-center justify-center shrink-0 cursor-pointer"
              >
                <Send size={16} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-zinc-500">
            <UserIcon size={32} className="text-zinc-650 mb-3" />
            <p className="text-xs">Selecione uma conversa ao lado para visualizar a negociação de figurinhas.</p>
          </div>
        )}
      </div>

    </div>
  );
};
