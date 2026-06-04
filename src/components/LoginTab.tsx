import React, { useState } from 'react';
import { INITIAL_USERS } from '../data';
import { User } from '../types';
import { LogIn, UserPlus, Key, Mail, ShieldAlert, Check } from 'lucide-react';

interface LoginTabProps {
  onLoginSuccess: (user: User) => void;
  onShowToast: (message: string, type: 'success' | 'error') => void;
}

export const LoginTab: React.FC<LoginTabProps> = ({
  onLoginSuccess,
  onShowToast,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'login' | 'register'>('login');
  
  // Login form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form states
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regCountry, setRegCountry] = useState('Brasil');

  // Perform standard login simulation
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      onShowToast('Por favor, preencha todos os campos do login.', 'error');
      return;
    }

    // Lookup user in mock database (persistent or initial)
    const storedUsers: User[] = JSON.parse(localStorage.getItem('copa_do_mundo_users') || JSON.stringify(INITIAL_USERS));
    const matchedUser = storedUsers.find(
      (u) => u.email.toLowerCase() === loginEmail.toLowerCase().trim()
    );

    if (!matchedUser) {
      onShowToast('Usuário não cadastrado!', 'error');
      return;
    }

    if (matchedUser.blocked) {
      onShowToast('Sua conta foi temporariamente bloqueada pela moderação.', 'error');
      return;
    }

    if (loginPassword !== '123456') {
      onShowToast('Senha incorreta! Use a senha padrão: 123456', 'error');
      return;
    }

    // Success login
    onLoginSuccess(matchedUser);
    onShowToast(`Boas-vindas de volta, ${matchedUser.name}!`, 'success');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword || !regConfirmPassword || !regCountry) {
      onShowToast('Preencha todos os campos para fazer o cadastro.', 'error');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      onShowToast('Confirmação de senha não coincide!', 'error');
      return;
    }

    const storedUsers: User[] = JSON.parse(localStorage.getItem('copa_do_mundo_users') || JSON.stringify(INITIAL_USERS));
    
    // Check if duplicate email
    if (storedUsers.some((u) => u.email.toLowerCase() === regEmail.toLowerCase().trim())) {
      onShowToast('Já existe um usuário registrado com este e-mail.', 'error');
      return;
    }

    // Create new user simulation
    const newUser: User = {
      id: `user_${Date.now()}`,
      name: regName,
      email: regEmail,
      country: regCountry,
      avatar: `https://images.unsplash.com/photo-${1535713875002 + Math.floor(Math.random() * 10000)}?auto=format&fit=crop&w=150&q=80`,
      role: 'user',
      blocked: false,
      balance: 100.00, // starting balance gift! R$ 100.00
      stickersOwned: 0,
      stickersRepeated: 0,
      rating: 5.0
    };

    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem('copa_do_mundo_users', JSON.stringify(updatedUsers));
    
    // Auto-login after successful sign up
    onLoginSuccess(newUser);
    onShowToast(`Cadastro efetuado com sucesso! Ganhos R$ 100,00 de boas-vindas!`, 'success');
  };

  // Quick Login auto filler function
  const handleShortcutClick = (userAccount: typeof INITIAL_USERS[0]) => {
    setLoginEmail(userAccount.email);
    setLoginPassword('123456');
    setActiveSubTab('login');
    
    // Execute simulated click next tick or immediately
    setTimeout(() => {
      const storedUsers: User[] = JSON.parse(localStorage.getItem('copa_do_mundo_users') || JSON.stringify(INITIAL_USERS));
      const match = storedUsers.find((u) => u.email.toLowerCase() === userAccount.email.toLowerCase());
      if (match) {
        if (match.blocked) {
          onShowToast('Esta conta de atalho foi bloqueada no painel administrativo!', 'error');
          return;
        }
        onLoginSuccess(match);
        onShowToast(`Acesso Rápido: Conectado com sucesso como ${match.name}!`, 'success');
      }
    }, 50);
  };

  return (
    <div className="w-full max-w-lg mx-auto py-8 px-4">
      {/* Dynamic Spectrum border wrapper card */}
      <div className="rounded-3xl p-[2px] spectrum-bg shadow-2xl relative overflow-hidden">
        
        {/* Interior Card with glassmorphism */}
        <div className="rounded-[22px] bg-slate-950/90 p-8 backdrop-blur-xl border border-white/5">
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black font-display text-white tracking-tight">
              🏆 COPA DO MUNDO
            </h2>
            <p className="text-zinc-400 text-xs mt-1.5">Conecte-se para trocar e comercializar figurinhas</p>
          </div>

          {/* Toggle Tab header buttons */}
          <div className="flex bg-white/5 rounded-xl p-1 mb-8 border border-white/5">
            <button
              onClick={() => setActiveSubTab('login')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                activeSubTab === 'login'
                  ? 'bg-linear-to-r from-red-650 to-orange-550 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LogIn size={14} />
              <span>Entrar</span>
            </button>
            <button
              onClick={() => setActiveSubTab('register')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                activeSubTab === 'register'
                  ? 'bg-linear-to-r from-orange-550 to-yellow-550 text-slate-950 shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <UserPlus size={14} />
              <span>Cadastrar</span>
            </button>
          </div>

          {activeSubTab === 'login' ? (
            /* LOGIN FORM BLOCK */
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <label className="text-zinc-300 text-[11px] font-mono tracking-wider block mb-1.5 uppercase">
                  Endereço de E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-zinc-500" size={16} />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="exemplo@email.com"
                    className="w-full glass-input rounded-xl py-3.5 pl-10 pr-4 text-xs font-medium focus:border-red-500"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-zinc-300 text-[11px] font-mono tracking-wider block uppercase">
                    Senha de Acesso
                  </label>
                  <span className="text-[10px] text-zinc-500 hover:underline cursor-pointer">
                    Esqueceu? (Use 123456)
                  </span>
                </div>
                <div className="relative">
                  <Key className="absolute left-3 top-3.5 text-zinc-500" size={16} />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full glass-input rounded-xl py-3.5 pl-10 pr-4 text-xs"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl py-3.5 bg-linear-to-r from-red-600 via-orange-500 to-yellow-500 text-white font-extrabold text-xs shadow-lg shadow-orange-950/20 hover:scale-[1.01] transition-transform cursor-pointer uppercase tracking-wider"
              >
                Conectar Agora
              </button>
            </form>
          ) : (
            /* REGISTER FORM BLOCK */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="text-zinc-300 text-[11px] font-mono tracking-wider block mb-1.5 uppercase">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Nome de Colecionador"
                  className="w-full glass-input rounded-xl py-3 px-4 text-xs"
                  required
                />
              </div>

              <div>
                <label className="text-zinc-300 text-[11px] font-mono tracking-wider block mb-1.5 uppercase">
                  Endereço de E-mail
                </label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full glass-input rounded-xl py-3 px-4 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-300 text-[11px] font-mono tracking-wider block mb-1.5 uppercase">
                    Senha
                  </label>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="mínimo 6"
                    className="w-full glass-input rounded-xl py-3 px-4 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="text-zinc-300 text-[11px] font-mono tracking-wider block mb-1.5 uppercase">
                    Confirmar
                  </label>
                  <input
                    type="password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Repita a senha"
                    className="w-full glass-input rounded-xl py-3 px-4 text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-300 text-[11px] font-mono tracking-wider block mb-1.5 uppercase">
                  País de Residência
                </label>
                <select
                  value={regCountry}
                  onChange={(e) => setRegCountry(e.target.value)}
                  className="w-full glass-input rounded-xl py-3 px-4 text-xs bg-slate-900"
                >
                  <option value="Brasil">Brasil 🇧🇷</option>
                  <option value="Portugal">Portugal 🇵🇹</option>
                  <option value="Angola">Angola 🇦🇴</option>
                  <option value="Argentina">Argentina 🇦🇷</option>
                  <option value="França">França 🇫🇷</option>
                  <option value="Croácia">Croácia 🇭🇷</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl py-3.5 bg-linear-to-r from-orange-500 via-yellow-500 to-emerald-500 text-slate-950 font-extrabold text-xs shadow-lg hover:scale-[1.01] transition-transform cursor-pointer uppercase tracking-wider mt-4"
              >
                Cadastrar e Ganhar Saldo
              </button>
            </form>
          )}

        </div>
      </div>

      {/* MANDATORY ACCESSO RAPIDO SHORTCUT BOX */}
      <div className="mt-8 glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-bl-full pointer-events-none flex items-center justify-center">
          <Key className="text-yellow-400" size={16} />
        </div>
        
        <h3 className="text-white text-xs font-bold font-sans flex items-center space-x-2 mb-4">
          <span>👤 Acesso rápido — clique para entrar</span>
        </h3>
        
        <div className="space-y-3">
          {INITIAL_USERS.map((acc) => {
            const isAdmin = acc.role === 'admin';
            return (
              <div 
                key={acc.id}
                onClick={() => handleShortcutClick(acc)}
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 hover:border-white/15 transition-all cursor-pointer group text-left gap-3"
              >
                <div className="flex items-center space-x-3">
                  <img 
                    src={acc.avatar} 
                    alt={acc.name} 
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover border border-white/20" 
                  />
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <p className="text-white text-xs font-bold leading-tight">{acc.name}</p>
                      {isAdmin && (
                        <span className="text-[9px] bg-red-950 text-red-300 font-extrabold px-1.5 py-0.5 rounded border border-red-500/30 font-mono">
                          ADMIN
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-400 text-[10px] font-mono mt-0.5">{acc.email}</p>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2">
                  <span className="text-[10px] text-zinc-500 font-mono hidden md:inline">Senha: {123456}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShortcutClick(acc);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all flex items-center space-x-1 cursor-pointer ${
                      isAdmin 
                        ? 'bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-500/30' 
                        : 'bg-white/10 hover:bg-white/15 text-white'
                    }`}
                  >
                    <span>Entrar</span>
                    <Check size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
