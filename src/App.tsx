import { useState, useEffect } from 'react';
import { 
  getSavedData, 
  saveData, 
  INITIAL_USERS, 
  INITIAL_STICKERS, 
  INITIAL_RULES, 
  INITIAL_CHATS 
} from './data';
import { LanguageCode, LANGUAGE_LABELS } from './utils/translator';
import { User, Sticker, ChatConversation, PlatformRule, ChatMessage } from './types';
import { LandingTab } from './components/LandingTab';
import { LoginTab } from './components/LoginTab';
import { DashboardTab } from './components/DashboardTab';
import { CreateAdTab } from './components/CreateAdTab';
import { MarketplaceTab } from './components/MarketplaceTab';
import { DetailTab } from './components/DetailTab';
import { ChatTab } from './components/ChatTab';
import { AdminTab } from './components/AdminTab';
import { AccessibilityPanel } from './components/AccessibilityPanel';
import { Toast, ToastMessage } from './components/Toast';

// Lucide Icons
import { 
  Award, 
  Search, 
  RefreshCw, 
  Layers, 
  User as UserIcon, 
  ShieldAlert, 
  LogOut, 
  Menu, 
  X, 
  Wallet, 
  Bell, 
  Settings,
  Flame,
  Home,
  Compass,
  MessageSquare,
  PlusCircle
} from 'lucide-react';

export default function App() {
  // Navigation & Core States
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    return getSavedData<User | null>('current_user', null);
  });
  
  // Database states with LocalStorage persistence
  const [users, setUsers] = useState<User[]>(() => {
    return getSavedData<User[]>('users', INITIAL_USERS);
  });
  const [stickers, setStickers] = useState<Sticker[]>(() => {
    return getSavedData<Sticker[]>('stickers', INITIAL_STICKERS);
  });
  const [rules, setRules] = useState<PlatformRule[]>(() => {
    return getSavedData<PlatformRule[]>('rules', INITIAL_RULES);
  });
  const [conversations, setConversations] = useState<ChatConversation[]>(() => {
    return getSavedData<ChatConversation[]>('chats', INITIAL_CHATS);
  });

  // Selected stickers for Detail sheet view
  const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null);

  // Translation States
  const [preferredLanguage, setPreferredLanguage] = useState<LanguageCode>(() => {
    return getSavedData<LanguageCode>('preferred_language', 'pt');
  });
  const [autoTranslateEnabled, setAutoTranslateEnabled] = useState<boolean>(() => {
    return getSavedData<boolean>('auto_translate_enabled', true);
  });

  // Accessibility States
  const [accessibilityPanelOpen, setAccessibilityPanelOpen] = useState<boolean>(false);
  const [preferredFontSize, setPreferredFontSize] = useState<'normal' | 'large' | 'huge'>(() => {
    return getSavedData<'normal' | 'large' | 'huge'>('preferred_font_size', 'normal');
  });
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return getSavedData<boolean>('high_contrast', false);
  });
  const [blackFontMode, setBlackFontMode] = useState<boolean>(() => {
    return getSavedData<boolean>('black_font_mode', false);
  });
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(() => {
    return getSavedData<boolean>('speech_enabled', false);
  });

  // Estado dinâmico para alternar o logo text/emoji para pulsar se tornando um jogador/jogadora chutando uma bola
  const [logoAnimState, setLogoAnimState] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoAnimState((prev) => (prev + 1) % 3);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Screen Reader simulation check and hotkeys listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is busy writing inside any input/textarea element
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || (activeEl as HTMLElement).contentEditable === 'true')) {
        return;
      }

      // Check numeric shortcuts for quick navigation between tabs
      if (e.key === '1') {
        setCurrentTab('landing');
        setSelectedSticker(null);
        speakAccessibility("Navegando para o Palco das Raridades de Copa do Mundo.");
      } else if (e.key === '2' && currentUser) {
        setCurrentTab('dashboard');
        setSelectedSticker(null);
        speakAccessibility("Navegando para o Painel de Colecionador.");
      } else if (e.key === '3') {
        setCurrentTab('marketplace');
        setSelectedSticker(null);
        speakAccessibility("Navegando para o Marketplace Geral.");
      } else if (e.key === '4' && currentUser) {
        setCurrentTab('chat');
        setSelectedSticker(null);
        speakAccessibility("Navegando para a Central de Conversas.");
      } else if (e.key === '5' && currentUser) {
        setCurrentTab('create_ad');
        setSelectedSticker(null);
        speakAccessibility("Navegando para Anunciar Figurinha.");
      } else if (e.key.toLowerCase() === 'a') {
        setAccessibilityPanelOpen(prev => !prev);
        speakAccessibility("Alternando exibição do Painel de Acessibilidade.");
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [currentUser, speechEnabled]);

  // Audio announcer helper for screen-readers
  const speakAccessibility = (text: string) => {
    if (!speechEnabled) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn("Speech API is not fully supported in this context.", err);
    }
  };

  // Mobile navigation drawer toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Instant notification toasts state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Push custom feedback Toast helper
  const triggerToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const newToast: ToastMessage = {
      id: `toast_${Date.now()}_${Math.random()}`,
      message,
      type
    };
    setToasts((prev) => [...prev, newToast]);
    speakAccessibility(message);
  };

  const handleCloseToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Keep state collections synced to LocalStorage
  useEffect(() => {
    saveData('users', users);
  }, [users]);

  useEffect(() => {
    saveData('preferred_language', preferredLanguage);
  }, [preferredLanguage]);

  useEffect(() => {
    saveData('auto_translate_enabled', autoTranslateEnabled);
  }, [autoTranslateEnabled]);

  useEffect(() => {
    saveData('preferred_font_size', preferredFontSize);
  }, [preferredFontSize]);

  useEffect(() => {
    saveData('high_contrast', highContrast);
    if (highContrast) {
      setBlackFontMode(false);
    }
  }, [highContrast]);

  useEffect(() => {
    saveData('black_font_mode', blackFontMode);
    if (blackFontMode) {
      setHighContrast(false);
    }
  }, [blackFontMode]);

  useEffect(() => {
    saveData('speech_enabled', speechEnabled);
  }, [speechEnabled]);

  useEffect(() => {
    saveData('stickers', stickers);
  }, [stickers]);

  useEffect(() => {
    saveData('rules', rules);
  }, [rules]);

  useEffect(() => {
    saveData('chats', conversations);
  }, [conversations]);

  useEffect(() => {
    saveData('current_user', currentUser);
  }, [currentUser]);

  // Handle core user session login
  const handleLoginSuccess = (usr: User) => {
    // If the account was blocked in database, prevent login
    const dbUser = users.find(u => u.id === usr.id);
    if (dbUser && dbUser.blocked) {
      triggerToast('Sua conta está bloqueada no painel administrativo.', 'error');
      return;
    }
    
    setCurrentUser(usr);
    setCurrentTab('dashboard');
  };

  // Handle session log out
  const handleLogout = () => {
    if (currentUser) {
      triggerToast(`Até logo, ${currentUser.name}! Torcendo por você.`, 'info');
    }
    setCurrentUser(null);
    setCurrentTab('landing');
    setSelectedSticker(null);
  };

  // Deposit simulated demo money to the wallet
  const handleDepositMockMoney = () => {
    if (!currentUser) return;
    const addedAmount = 50.00;
    
    // Update currentUser balance
    const updatedUser = { ...currentUser, balance: currentUser.balance + addedAmount };
    setCurrentUser(updatedUser);

    // Update in users table
    setUsers((prev) => 
      prev.map((u) => u.id === currentUser.id ? { ...u, balance: u.balance + addedAmount } : u)
    );

    triggerToast(`R$ 50,00 adicionados com sucesso à sua carteira!`, 'success');
  };

  // Sticker card registration handler (CresteAdTab)
  const handleAnnounceSticker = (newSticker: Sticker) => {
    // Add sticker to list
    setStickers((prev) => [newSticker, ...prev]);

    if (currentUser) {
      // Modify user stickers counters
      const isRepeated = newSticker.condition === 'Usado' || stickers.some(s => s.player === newSticker.player && s.ownerId === currentUser.id);
      
      const updatedUser = {
        ...currentUser,
        stickersRepeated: currentUser.stickersRepeated + (isRepeated ? 1 : 0),
        stickersOwned: currentUser.stickersOwned + (isRepeated ? 0 : 1)
      };

      setCurrentUser(updatedUser);
      // Update in users database
      setUsers((prev) =>
        prev.map((u) => u.id === currentUser.id ? updatedUser : u)
      );
    }
  };

  // Purchase Sticker Flow (DetailTab direct order)
  const handleBuySticker = (sticker: Sticker) => {
    if (!currentUser) {
      triggerToast('Você precisa fazer login para comprar figurinhas!', 'error');
      setCurrentTab('login');
      return;
    }

    if (sticker.price && currentUser.balance < sticker.price) {
      triggerToast('Saldo insuficiente! Adicione crédito demonstrativo na sua carteira.', 'error');
      return;
    }

    const priceAmount = sticker.price || 0;

    // 1. Deduct money from buyer
    const updatedBuyer = { 
      ...currentUser, 
      balance: currentUser.balance - priceAmount,
      stickersOwned: currentUser.stickersOwned + 1
    };
    setCurrentUser(updatedBuyer);

    // 2. Add money to seller, decrement count if repeated
    setUsers((prev) => prev.map((u) => {
      if (u.id === currentUser.id) {
        return updatedBuyer;
      }
      if (u.id === sticker.ownerId) {
        return {
          ...u,
          balance: u.balance + priceAmount,
          stickersRepeated: Math.max(0, u.stickersRepeated - 1)
        };
      }
      return u;
    }));

    // 3. Set sticker ownership to buyer, and make it inactive in general marketplace
    setStickers((prev) => prev.map((s) => {
      if (s.id === sticker.id) {
        return {
          ...s,
          ownerId: currentUser.id,
          ownerName: currentUser.name,
          active: false, // purchased cards are inactive
        };
      }
      return s;
    }));

    // Clear detail sheet
    setSelectedSticker(null);
    setCurrentTab('dashboard');
    triggerToast(`Você adquiriu ${sticker.player} (${sticker.number}) por R$ ${priceAmount.toFixed(2)}!`, 'success');
  };

  // Initiate Chat Negotiation Flow (Match or detail propose)
  const handleInitiateChat = (sticker: Sticker, defaultMessage?: string) => {
    if (!currentUser) {
      triggerToast('Acesse sua conta para propor negociações e trocas.', 'error');
      setCurrentTab('login');
      return;
    }

    // Check if chat conversation already exists for this sticker
    const existing = conversations.find(
      (c) => c.stickerId === sticker.id && c.buyerId === currentUser.id
    );

    if (existing) {
      // Chat already exists, navigate directly
      setCurrentTab('chat');
      return;
    }

    // Generate custom chat thread
    const newChat: ChatConversation = {
      id: `chat_${Date.now()}`,
      stickerId: sticker.id,
      buyerId: currentUser.id,
      sellerId: sticker.ownerId,
      buyerName: currentUser.name,
      sellerName: sticker.ownerName,
      stickerName: `${sticker.player} ${sticker.number}`,
      stickerImage: sticker.image,
      stickerPrice: sticker.price,
      stickerType: sticker.type,
      status: 'active',
      messages: [
        {
          id: `msg_sys_${Date.now()}`,
          senderId: 'system',
          text: defaultMessage || `Olá ${sticker.ownerName}, tenho interesse na sua figurinha! Aceita negociar?`,
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        }
      ]
    };

    setConversations((prev) => [newChat, ...prev]);
    setCurrentTab('chat');
    triggerToast(`Negociação iniciada com ${sticker.ownerName}!`, 'success');
  };

  // Proposed direct swap matching from Matchmaker Dashboard
  const handleProposeTradeFromMatch = (sticker: Sticker) => {
    const customPromptMessage = `Olá ${sticker.ownerName}! Nosso álbum detectou um Match automático de figurinhas. Quero propor a troca do meu card repetido pelo seu ${sticker.player} (${sticker.number})!`;
    handleInitiateChat(sticker, customPromptMessage);
  };

  // Chat messaging posting handler with simulated delays response
  const handleSendMessage = (conversationId: string, text: string) => {
    const timestampStr = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    setConversations((prev) => prev.map((chat) => {
      if (chat.id === conversationId) {
        const updatedMsgs = [...chat.messages, {
          id: `msg_${Date.now()}`,
          senderId: currentUser?.id || 'sender',
          text,
          timestamp: timestampStr,
        }];

        // Schedule an advanced automated feedback simulation response after 1.5 seconds!
        setTimeout(() => {
          simulateCollectorReply(conversationId);
        }, 1500);

        return {
          ...chat,
          messages: updatedMsgs
        };
      }
      return chat;
    }));
  };

  // Automated friendly collector simulated dialogue engine
  const simulateCollectorReply = (chatId: string) => {
    const timestampStr = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    // Quotes arrays
    const quotes = [
      "Beleza! Vou verificar minha pilha de repetidas hoje à noite e retorno.",
      "Excelente proposta! Combinado, me encontra amanhã na entrada principal do shopping pra gente efetuar físico.",
      "Obrigado pelo contato! Você tem alguma outra brilhante do Brasil pra adicionar além dessa?",
      "Fechado! Vou clicar para aprovar a troca aqui pela plataforma agora.",
      "Opa, desculpe a demora! Essa figurinha está novinha, guardada na capinha.",
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    setConversations((prev) => prev.map((chat) => {
      if (chat.id === chatId && chat.status === 'active') {
        // Prevent infinite chains by checking if last message is already from system/collector
        const lastMsg = chat.messages[chat.messages.length - 1];
        if (lastMsg && lastMsg.senderId === chat.sellerName) return chat;

        const otherPartyId = currentUser?.id === chat.buyerId ? chat.sellerId : chat.buyerId;

        return {
          ...chat,
          messages: [...chat.messages, {
            id: `msg_sim_${Date.now()}`,
            senderId: otherPartyId,
            text: randomQuote,
            timestamp: timestampStr
          }]
        };
      }
      return chat;
    }));
  };

  // Confirm Deal/Transactions dentro do Chat (Sell or Trade)
  const handleConfirmTransactionInChat = (conversationId: string, dealType: 'completed_sale' | 'completed_trade') => {
    const chat = conversations.find((c) => c.id === conversationId);
    if (!chat) return;

    // Find associated sticker
    const stickerObj = stickers.find((s) => s.id === chat.stickerId);
    if (!stickerObj) {
      triggerToast('Anúncio da figurinha não encontrado ou expirado.', 'error');
      return;
    }

    if (dealType === 'completed_sale') {
      const priceAmount = stickerObj.price || 0;
      
      // Determine buyer/seller roles in this transaction
      const buyerAcc = users.find((u) => u.id === chat.buyerId);
      const sellerAcc = users.find((u) => u.id === chat.sellerId);

      if (!buyerAcc || !sellerAcc) return;

      if (buyerAcc.balance < priceAmount) {
        triggerToast(`Saldo do comprador insuficiente (R$ ${buyerAcc.balance.toFixed(2)}) para finalizar!`, 'error');
        return;
      }

      // Transfer balances
      setUsers((prev) => prev.map((u) => {
        if (u.id === chat.buyerId) {
          return { ...u, balance: u.balance - priceAmount, stickersOwned: u.stickersOwned + 1 };
        }
        if (u.id === chat.sellerId) {
          return { ...u, balance: u.balance + priceAmount, stickersRepeated: Math.max(0, u.stickersRepeated - 1) };
        }
        return u;
      }));

      // Update current user balance if active buyer
      if (currentUser?.id === chat.buyerId) {
        setCurrentUser(p => p ? { ...p, balance: p.balance - priceAmount, stickersOwned: p.stickersOwned + 1 } : null);
      } else if (currentUser?.id === chat.sellerId) {
        setCurrentUser(p => p ? { ...p, balance: p.balance + priceAmount, stickersRepeated: Math.max(0, p.stickersRepeated - 1) } : null);
      }

      // Update sticker owner
      setStickers((prev) => prev.map((s) => {
        if (s.id === stickerObj.id) {
          return { ...s, ownerId: chat.buyerId, ownerName: chat.buyerName, active: false };
        }
        return s;
      }));

      triggerToast('Transação eletrônica efetuada! Figurinha transferida.', 'success');

    } else {
      // Completed Trade permuta
      // Deduct/Add from count
      setUsers((prev) => prev.map((u) => {
        if (u.id === chat.buyerId) {
          return { ...u, stickersOwned: u.stickersOwned + 1, stickersRepeated: Math.max(0, u.stickersRepeated - 1) };
        }
        if (u.id === chat.sellerId) {
          return { ...u, stickersOwned: u.stickersOwned + 1, stickersRepeated: Math.max(0, u.stickersRepeated - 1) };
        }
        return u;
      }));

      if (currentUser) {
        setCurrentUser(p => p ? {
          ...p,
          stickersOwned: p.stickersOwned + 1,
          stickersRepeated: Math.max(0, p.stickersRepeated - 1)
        } : null);
      }

      // Swap sticker physical registry owner definitions
      setStickers((prev) => prev.map((s) => {
        if (s.id === stickerObj.id) {
          return { ...s, ownerId: chat.buyerId, ownerName: chat.buyerName, active: false };
        }
        return s;
      }));

      triggerToast('Troca autorizada por ambas as partes! Parabéns pelas novas figurinhas.', 'success');
    }

    // Set conversation status as closed/success
    setConversations((prev) => prev.map((c) => {
      if (c.id === conversationId) {
        return {
          ...c,
          status: dealType,
          messages: [...c.messages, {
            id: `msg_sys_done_${Date.now()}`,
            senderId: 'system',
            text: `✅ ${dealType === 'completed_sale' ? 'Venda efetuada' : 'Troca concluída'} com sucesso na plataforma Copa do Mundo! Figurinha transferida e saldos recalculados.`,
            timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
          }]
        };
      }
      return c;
    }));
  };

  // ADMIN OPERATIONS
  // Toggle Block state of ordinary users (AdminTab)
  const handleToggleBlockUser = (userId: string) => {
    setUsers((prev) => prev.map((u) => {
      if (u.id === userId) {
        const nextState = !u.blocked;
        
        // Dynamic edge-case: If blocked, and is currently logged in, force kicklogout!
        if (nextState && currentUser?.id === userId) {
          setTimeout(() => handleLogout(), 100);
        }

        triggerToast(`Usuário ${u.name} foi ${nextState ? 'Bloqueado' : 'Desbloqueado'}!`, 'success');
        return { ...u, blocked: nextState };
      }
      return u;
    }));
  };

  // Approve active user submitted stickers
  const handleApproveSticker = (stickerId: string) => {
    setStickers((prev) => prev.map((s) => {
      if (s.id === stickerId) {
        triggerToast(`Anúncio de ${s.player} (${s.number}) foi aprovado e está ativo!`, 'success');
        return { ...s, approved: true };
      }
      return s;
    }));
  };

  // Excluir stickers directly form platform database
  const handleDeleteSticker = (stickerId: string) => {
    const match = stickers.find((s) => s.id === stickerId);
    setStickers((prev) => prev.filter((s) => s.id !== stickerId));
    triggerToast(`Anúncio de ${match?.player || 'figurinha'} excluído permanentemente!`, 'error');
  };

  // Modify or save Safety term rules (AdminTab)
  const handleSaveRule = (updatedRule: PlatformRule) => {
    setRules((prev) => prev.map((r) => r.id === updatedRule.id ? updatedRule : r));
  };

  // Create new Safety term rule guideline (AdminTab)
  const handleNewRule = (title: string, content: string) => {
    const ruleObj: PlatformRule = {
      id: `rule_${Date.now()}`,
      title,
      content,
    };
    setRules((prev) => [...prev, ruleObj]);
  };

  // Handle selected card detail redirection
  const handleSelectSticker = (st: Sticker) => {
    setSelectedSticker(st);
    setCurrentTab('detail');
  };

  return (
    <div className={`min-h-screen font-sans relative selection:bg-yellow-400 selection:text-slate-950 overflow-x-hidden transition-all duration-300 ${
      highContrast 
        ? 'accessibility-high-contrast bg-black text-white' 
        : blackFontMode 
          ? 'accessibility-black-font bg-white text-black' 
          : 'spectrum-bg text-white'
    } ${
      preferredFontSize === 'large' ? 'accessibility-large-text' : preferredFontSize === 'huge' ? 'accessibility-large-text text-lg' : ''
    }`}>
      {/* Background Dimming Layer to keep everything perfectly readable & highly immersive */}
      <div className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
        blackFontMode ? 'bg-white/95 backdrop-blur-0' : 'bg-black/65 backdrop-blur-[3px]'
      }`} />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* PERSISTENT HEADER NAVIGATION COORD */}
        <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 py-3 px-6 md:px-12 flex items-center justify-between">
          
          {/* Left Side Logo */}
          <div 
            onClick={() => { setCurrentTab('landing'); setSelectedSticker(null); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-lg select-none transition-all duration-300 transform ${
              logoAnimState !== 0 ? 'animate-bounce scale-110' : 'rotate-3 group-hover:scale-105'
            } ${
              blackFontMode ? 'bg-black text-white' : 'bg-white text-black'
            }`}>
              <span className="text-xl">
                {logoAnimState === 0 && '🏆'}
                {logoAnimState === 1 && '🏃‍♂️'}
                {logoAnimState === 2 && '🏃‍♀️'}
              </span>
            </div>
            
            <span className={`font-display text-2xl md:text-3xl font-black uppercase tracking-tight italic bg-clip-text text-transparent leading-none select-none transition-all duration-500 flex items-center gap-2 ${
              logoAnimState !== 0 ? 'animate-pulse scale-102 font-black' : 'hover:scale-101'
            } ${
              blackFontMode
                ? 'from-black to-zinc-900 !text-black bg-none'
                : logoAnimState === 1 
                  ? 'from-emerald-400 via-cyan-400 to-yellow-400 drop-shadow-[0_4px_12px_rgba(52,211,153,0.6)]'
                  : logoAnimState === 2
                    ? 'from-rose-400 via-orange-400 to-yellow-400 drop-shadow-[0_4px_12px_rgba(251,113,133,0.6)]'
                    : 'from-yellow-300 via-amber-400 to-yellow-500 drop-shadow-[0_2px_8px_rgba(251,191,36,0.5)]'
            }`}>
              {logoAnimState === 0 && 'Copa do Mundo'}
              {logoAnimState === 1 && (
                <span className="flex items-center gap-1.5 text-emerald-400">
                  CRAQUE 🏃‍♂️ <span className="animate-ping text-base">⚽</span>
                </span>
              )}
              {logoAnimState === 2 && (
                <span className="flex items-center gap-1.5 text-rose-400">
                  CAMPEÃ 🏃‍♀️ <span className="animate-bounce text-base">⚽</span>
                </span>
              )}
            </span>
          </div>

        {/* Center Links (Ordinary logged in navigation menu toggler) */}
        {currentUser && (
          <nav className="hidden md:flex items-center space-x-6 text-xs font-bold uppercase tracking-wider font-mono">
            <button
              onClick={() => { setCurrentTab('dashboard'); setSelectedSticker(null); }}
              className={`hover:text-yellow-400 cursor-pointer ${currentTab === 'dashboard' ? 'text-yellow-400 border-b border-yellow-400 pb-0.5' : 'text-zinc-400'}`}
            >
              Meu Painel
            </button>
            <button
              onClick={() => { setCurrentTab('marketplace'); setSelectedSticker(null); }}
              className={`hover:text-yellow-400 cursor-pointer ${currentTab === 'marketplace' ? 'text-yellow-400 border-b border-yellow-400 pb-0.5' : 'text-zinc-400'}`}
            >
              Marketplace
            </button>
            <button
              onClick={() => { setCurrentTab('chat'); setSelectedSticker(null); }}
              className={`hover:text-yellow-400 cursor-pointer flex items-center ${currentTab === 'chat' ? 'text-yellow-400 border-b border-yellow-400 pb-0.5' : 'text-zinc-400'}`}
            >
              <span>Conversas</span>
              <span className="ml-1 px-1 bg-yellow-450/25 border border-yellow-400/20 text-yellow-400 rounded text-[9px] font-bold">2</span>
            </button>
            <button
              onClick={() => { setCurrentTab('create_ad'); setSelectedSticker(null); }}
              className={`hover:text-yellow-400 cursor-pointer ${currentTab === 'create_ad' ? 'text-yellow-400 border-b border-yellow-400 pb-0.5' : 'text-zinc-400'}`}
            >
              Anunciar
            </button>
          </nav>
        )}

        {/* Right Corner Buttons: Admin triggers or active user profile */}
        <div className="flex items-center space-x-3">

          {/* ACCESSIBILITY BUTTON TRIGGER */}
          <button
            onClick={() => {
              setAccessibilityPanelOpen(true);
              speakAccessibility("Painel de acessibilidade aberto.");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all text-xs font-black uppercase tracking-wider text-yellow-400 cursor-pointer ${
              highContrast 
                ? 'bg-black border-yellow-450 text-yellow-450 border-2 shadow-[0_0_10px_rgba(234,179,8,0.2)]' 
                : 'bg-white/15 hover:bg-white/25 border-white/25'
            }`}
            title="Recursos de Acessibilidade (Atalho: letra A)"
            aria-label="Abrir recursos de acessibilidade"
          >
            <span role="img" aria-label="Acessibilidade">♿</span>
            <span className="hidden lg:inline font-bold">Acessibilidade</span>
          </button>
          
          {/* GLOBE LANGUAGE TRANSLATOR DROPDOWN */}
          <div className="flex items-center space-x-1.5 bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1.5 rounded-xl transition-all">
            <span className="text-xs" role="img" aria-label="Globe">🌐</span>
            <select
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.target.value as LanguageCode)}
              className="bg-transparent text-white text-xs font-bold outline-hidden cursor-pointer select-none"
              style={{ colorScheme: 'dark' }}
              title="Idioma de Tradução Automática"
            >
              {Object.entries(LANGUAGE_LABELS).map(([code, info]) => (
                <option key={code} value={code} className="bg-slate-900 text-white">
                  {info.flag} {info.label}
                </option>
              ))}
            </select>
          </div>

          {/* DISCRETE SHIELD DISPATCH BUTTON FOR ADMIN ACCESS */}
          {currentUser && currentUser.role === 'admin' && (
            <button
              onClick={() => { setCurrentTab('admin'); setSelectedSticker(null); }}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center space-x-1.5 ${
                currentTab === 'admin'
                  ? 'bg-red-950/60 text-red-300 border-red-500/30 shadow-md shadow-red-900/10'
                  : 'bg-white/5 text-zinc-300 hover:text-white border-white/10 hover:border-white/20'
              }`}
              title="Acessar Arena Administrativa"
            >
              <Settings className="animate-spin-slow text-red-400" size={16} />
              <span className="text-[10px] font-black uppercase font-mono tracking-widest hidden sm:inline text-red-300">ADMIN</span>
            </button>
          )}

          {currentUser ? (
            /* Logged user widgets block */
            <div className="flex items-center space-x-3 bg-white/5 border border-white/5 pl-3 pr-1 py-1 rounded-xl">
              <div className="text-right hidden sm:block">
                <p className="text-white text-xxs font-extrabold">{currentUser.name}</p>
                <p className="text-[9px] text-zinc-500 font-mono mt-0.5">⭐ {currentUser.rating}</p>
              </div>
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full border border-white/10 object-cover" 
              />
              <button
                onClick={handleLogout}
                className="p-2 text-zinc-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                title="Sair"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            /* Guest controls */
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentTab('marketplace')}
                className="hidden sm:inline px-4 py-2 border border-white/5 hover:border-white/10 rounded-xl text-zinc-400 hover:text-white transition-colors duration-150 text-xs font-bold cursor-pointer"
              >
                Marketplace
              </button>
              <button
                onClick={() => setCurrentTab('login')}
                className="px-4.5 py-2 rounded-xl bg-white hover:bg-zinc-150 text-slate-900 font-black text-xs transition-all tracking-wider uppercase cursor-pointer"
              >
                Entrar
              </button>
            </div>
          )}

          {/* Hamburger responsive menu trigger on mobile */}
          {currentUser && (
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white border border-white/5 rounded-xl cursor-pointer"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          )}

        </div>
      </header>

      {/* MOBILE NAV SIDE DRAWER WINDOW */}
      {mobileMenuOpen && currentUser && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-center items-center p-8 space-y-6 text-xl tracking-wider font-extrabold uppercase font-display border-b border-light/5">
          <button 
            onClick={() => { setCurrentTab('dashboard'); setMobileMenuOpen(false); }}
            className={`cursor-pointer ${currentTab === 'dashboard' ? 'text-yellow-450' : 'text-zinc-300'}`}
          >
            Meu Painel
          </button>
          <button 
            onClick={() => { setCurrentTab('marketplace'); setMobileMenuOpen(false); }}
            className={`cursor-pointer ${currentTab === 'marketplace' ? 'text-yellow-450' : 'text-zinc-300'}`}
          >
            Marketplace
          </button>
          <button 
            onClick={() => { setCurrentTab('chat'); setMobileMenuOpen(false); }}
            className={`cursor-pointer ${currentTab === 'chat' ? 'text-yellow-450' : 'text-zinc-300'}`}
          >
            Conversas (2)
          </button>
          <button 
            onClick={() => { setCurrentTab('create_ad'); setMobileMenuOpen(false); }}
            className={`cursor-pointer ${currentTab === 'create_ad' ? 'text-yellow-450' : 'text-zinc-300'}`}
          >
            Anunciar Card
          </button>
          {currentUser.role === 'admin' && (
            <button 
              onClick={() => { setCurrentTab('admin'); setMobileMenuOpen(false); }}
              className="text-red-400 cursor-pointer"
            >
              Painel Admin 👑
            </button>
          )}
          <button 
            onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
            className="text-zinc-500 font-mono text-xs pt-8 flex items-center space-x-1 cursor-pointer"
          >
            <LogOut size={14} />
            <span>Encerrar Sessão</span>
          </button>
        </div>
      )}

      {/* DETAILED ACTIVE SECTION VIEW */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-10 min-h-[calc(100vh-200px)]">
        
        {/* Render tab screen based on current state */}
        <div className="transform transition-transform duration-300 animate-fade-in">
          
          {currentTab === 'landing' && (
            <LandingTab 
              onNavigate={setCurrentTab}
              featuredStickers={stickers.filter(s => s.rarity === 'Lendária' && s.active).slice(0, 4)}
              onSelectSticker={handleSelectSticker}
            />
          )}

          {currentTab === 'login' && (
            <LoginTab 
              onLoginSuccess={handleLoginSuccess}
              onShowToast={triggerToast}
            />
          )}

          {currentTab === 'dashboard' && currentUser && (
            <DashboardTab 
              currentUser={currentUser}
              stickers={stickers}
              onSelectSticker={handleSelectSticker}
              onNavigate={setCurrentTab}
              onProposeTradeFromMatch={handleProposeTradeFromMatch}
              onDepositMockMoney={handleDepositMockMoney}
            />
          )}

          {currentTab === 'create_ad' && currentUser && (
            <CreateAdTab 
              currentUser={currentUser}
              onAnnounceSticker={handleAnnounceSticker}
              onShowToast={triggerToast}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'marketplace' && (
            <MarketplaceTab 
              stickers={stickers}
              onSelectSticker={handleSelectSticker}
              onShowToast={triggerToast}
            />
          )}

          {currentTab === 'detail' && selectedSticker && (
            <DetailTab 
              sticker={selectedSticker}
              currentUser={currentUser || { id: '', name: '', email: '', balance: 0, stickersOwned: 0, stickersRepeated: 0, country: '', avatar: '', rating: 5, blocked: false, role: 'user' }}
              allStickers={stickers}
              onBack={() => { setCurrentTab('marketplace'); setSelectedSticker(null); }}
              onBuy={handleBuySticker}
              onInitiateChat={handleInitiateChat}
              onNavigate={setCurrentTab}
              onSelectSticker={handleSelectSticker}
              preferredLanguage={preferredLanguage}
              autoTranslateEnabled={autoTranslateEnabled}
            />
          )}

          {currentTab === 'chat' && currentUser && (
            <ChatTab 
              conversations={conversations}
              currentUser={currentUser}
              onSendMessage={handleSendMessage}
              onConfirmTransaction={handleConfirmTransactionInChat}
              onShowToast={triggerToast}
              preferredLanguage={preferredLanguage}
              autoTranslateEnabled={autoTranslateEnabled}
              onToggleAutoTranslate={() => setAutoTranslateEnabled(!autoTranslateEnabled)}
            />
          )}

          {currentTab === 'admin' && currentUser && currentUser.role === 'admin' && (
            <AdminTab 
              users={users}
              stickers={stickers}
              rules={rules}
              onToggleBlockUser={handleToggleBlockUser}
              onApproveSticker={handleApproveSticker}
              onDeleteSticker={handleDeleteSticker}
              onSaveRule={handleSaveRule}
              onNewRule={handleNewRule}
              onShowToast={triggerToast}
            />
          )}

        </div>
      </main>

      {/* PERSISTENT TRANSLUSCENT BOTTOM MENUS FOR SMALL MOBILE USERS */}
      {currentUser && (
        <div className="md:hidden fixed bottom-4 inset-x-4 h-16 z-30 glass-card rounded-2xl flex items-center justify-around px-4 border border-white/10 shadow-2xl">
          {[
            { id: 'dashboard', icon: <Home size={20} />, label: 'Início' },
            { id: 'marketplace', icon: <Compass size={20} />, label: 'Explorar' },
            { id: 'create_ad', icon: <PlusCircle size={20} className="text-yellow-400" />, label: 'Anunciar' },
            { id: 'chat', icon: <MessageSquare size={20} />, label: 'Chats' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setCurrentTab(item.id); setSelectedSticker(null); }}
              className={`flex flex-col items-center justify-center p-2 text-[10px] uppercase font-mono tracking-wider font-semibold cursor-pointer ${
                currentTab === item.id ? 'text-yellow-400 scale-105' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {item.icon}
              <span className="text-[8px] mt-0.5">{item.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* FLOAT ALERTS DOCK CONTAINER (TOAST NOTIFIER LIST) */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col space-y-3.5 max-w-sm pointer-events-auto">
        {toasts.map((toast) => (
          <Toast 
            key={toast.id} 
            toast={toast} 
            onClose={handleCloseToast} 
          />
        ))}
      </div>

      {/* ACCESSIBILITY CONTROL DIALOG PANEL */}
      <AccessibilityPanel
        isOpen={accessibilityPanelOpen}
        onClose={() => setAccessibilityPanelOpen(false)}
        preferredFontSize={preferredFontSize}
        onFontSizeChange={setPreferredFontSize}
        highContrast={highContrast}
        onHighContrastToggle={() => setHighContrast(!highContrast)}
        blackFontMode={blackFontMode}
        onBlackFontToggle={() => setBlackFontMode(!blackFontMode)}
        speechEnabled={speechEnabled}
        onSpeechToggle={() => setSpeechEnabled(!speechEnabled)}
      />

      </div>
    </div>
  );
}
