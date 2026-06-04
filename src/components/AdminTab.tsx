import React, { useState } from 'react';
import { User, Sticker, PlatformRule } from '../types';
import { 
  Users, 
  Layers, 
  RefreshCw, 
  Settings, 
  Lock, 
  Unlock, 
  Check, 
  Trash2, 
  FileText, 
  TrendingUp, 
  Plus, 
  AlertCircle 
} from 'lucide-react';

interface AdminTabProps {
  users: User[];
  stickers: Sticker[];
  rules: PlatformRule[];
  onToggleBlockUser: (userId: string) => void;
  onApproveSticker: (stickerId: string) => void;
  onDeleteSticker: (stickerId: string) => void;
  onSaveRule: (updatedRule: PlatformRule) => void;
  onNewRule: (title: string, content: string) => void;
  onShowToast: (message: string, type: 'success' | 'error') => void;
}

export const AdminTab: React.FC<AdminTabProps> = ({
  users,
  stickers,
  rules,
  onToggleBlockUser,
  onApproveSticker,
  onDeleteSticker,
  onSaveRule,
  onNewRule,
  onShowToast,
}) => {
  const [adminActiveSubTab, setAdminActiveSubTab] = useState<'dashboard' | 'users' | 'ads' | 'rules' | 'stats'>('dashboard');

  // Rules editor state variables
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingContent, setEditingContent] = useState('');

  // New rule state variables
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  // Math variables
  const totalUsers = users.length;
  const activeAds = stickers.filter((s) => s.active && s.approved).length;
  const pendingAds = stickers.filter((s) => !s.approved).length;
  const completedDealsCount = 142; // simulated

  const handleStartEditRule = (rule: PlatformRule) => {
    setEditingRuleId(rule.id);
    setEditingTitle(rule.title);
    setEditingContent(rule.content);
  };

  const handleSaveRuleClick = () => {
    if (!editingRuleId || !editingTitle.trim() || !editingContent.trim()) return;
    onSaveRule({
      id: editingRuleId,
      title: editingTitle,
      content: editingContent
    });
    setEditingRuleId(null);
    onShowToast('Regra da plataforma atualizada com sucesso!', 'success');
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    onNewRule(newTitle.trim(), newContent.trim());
    setNewTitle('');
    setNewContent('');
    onShowToast('Nova regra de segurança publicada!', 'success');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
      
      {/* SIDEBAR NAVIGATION */}
      <div className="lg:col-span-3 glass-card rounded-2xl p-4 border border-white/10 flex flex-col space-y-2 h-fit">
        <div className="p-3 mb-2 border-b border-white/5">
          <div className="text-white text-xs font-black uppercase tracking-widest font-mono flex items-center space-x-2">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
            <span>Painel Controle</span>
          </div>
          <p className="text-zinc-500 text-[10px] mt-1">Nível de Acesso: Administrador</p>
        </div>

        {[
          { id: 'dashboard', label: 'Dashboard Admin', count: null },
          { id: 'users', label: 'Gestão de Usuários', count: users.length },
          { id: 'ads', label: 'Moderação Anúncios', count: pendingAds ? `${pendingAds} Pendente` : null },
          { id: 'rules', label: 'Regras da Plataforma', count: rules.length },
          { id: 'stats', label: 'Relatórios Estatísticos', count: null },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setAdminActiveSubTab(item.id as any)}
            className={`w-full text-left py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              adminActiveSubTab === item.id
                ? 'bg-red-650 text-white shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{item.label}</span>
            {item.count !== null && (
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                adminActiveSubTab === item.id 
                  ? 'bg-slate-950/60 text-white' 
                  : item.id === 'ads' && pendingAds > 0 
                  ? 'bg-red-950 text-red-400 border border-red-500/30' 
                  : 'bg-white/10 text-zinc-400'
              }`}>
                {item.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* DETAILED WORKING PANELS */}
      <div className="lg:col-span-9 space-y-6">
        
        {/* TAB 1: GENERAL METRICS DASHBOARD */}
        {adminActiveSubTab === 'dashboard' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-display text-white">Estatísticas Operacionais</h3>
            
            {/* Counts grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Usuários Cadastrados', value: totalUsers, color: 'text-sky-400' },
                { label: 'Anúncios Ativos', value: activeAds, color: 'text-emerald-400' },
                { label: 'Aguardando Moderação', value: pendingAds, color: 'text-red-400', alert: pendingAds > 0 },
                { label: 'Trocas Registradas', value: completedDealsCount, color: 'text-yellow-400' },
              ].map((m, idx) => (
                <div key={idx} className={`glass-card rounded-2xl p-5 border ${m.alert ? 'border-red-500/30 bg-red-950/10' : 'border-white/5'}`}>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">{m.label}</p>
                  <h4 className={`text-2.5xl font-extrabold font-display ${m.color} mt-2`}>{m.value}</h4>
                </div>
              ))}
            </div>

            {/* Moderation Warning alerts box */}
            {pendingAds > 0 && (
              <div className="p-4 bg-red-950/40 border border-red-500/20 text-red-200 rounded-xl flex items-start space-x-3.5">
                <AlertCircle className="text-red-400 mt-0.5 shrink-0" size={18} />
                <div>
                  <h5 className="text-xs font-bold font-sans">Atenção: Anúncios Pendentes de Análise</h5>
                  <p className="text-[11px] text-red-300/80 mt-1 leading-relaxed">
                    Existem {pendingAds} novos anúncios submetidos por usuários aguardando aprovação. Enquanto não forem aprovados, eles não aparecerão nos grids públicos de Marketplace de outros torcedores.
                  </p>
                  <button 
                    onClick={() => setAdminActiveSubTab('ads')}
                    className="text-red-300 hover:text-white text-[10px] font-extrabold font-mono uppercase mt-2.5 flex items-center space-x-1 hover:underline"
                  >
                    <span>Ir para canal de Moderação</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* Quick Actions / Activity logs */}
            <div className="glass-card rounded-2xl p-6 border border-white/5">
              <h4 className="text-white text-sm font-bold flex items-center space-x-2">
                <TrendingUp size={16} className="text-yellow-400" />
                <span>Histórico de Atividades do Servidor</span>
              </h4>
              <div className="mt-4 space-y-3">
                {[
                  { desc: 'Usuário joao@email.com logou via login rápido.', time: 'há 2 min' },
                  { desc: 'Sticker de Kylian Mbappé foi cadastrado na fila de pendências.', time: 'há 5 min' },
                  { desc: 'Termos de proteção contra golpes atualizados por administrador.', time: 'há 10 min' },
                  { desc: 'Database inicial carregada do cache local do navegador.', time: 'há 30 min' },
                ].map((act, i) => (
                  <div key={i} className="flex justify-between text-xs border-b border-white/5 pb-2.5 transition-all hover:bg-white/[0.01]">
                    <span className="text-zinc-300">{act.desc}</span>
                    <span className="text-zinc-500 font-mono text-[10px] shrink-0">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: USER DIRECTORY LIST */}
        {adminActiveSubTab === 'users' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold font-display text-white">Diretório de Colecionadores</h3>
              <p className="text-zinc-400 text-xs mt-0.5">Bloqueie usuários infratores para proibir seu acesso rápido ou negociações.</p>
            </div>

            <div className="glass-card rounded-2xl border border-white/10 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-[10px] tracking-wider uppercase font-mono text-zinc-400">
                      <th className="py-3 px-4">Avatar</th>
                      <th className="py-3 px-4">Nome</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">País</th>
                      <th className="py-3 px-4">Saldo (Wallet)</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {users.map((item) => {
                      const isSelf = item.role === 'admin';
                      return (
                        <tr key={item.id} className="text-xs hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4 font-mono">
                            <img src={item.avatar} alt={item.name} referrerPolicy="no-referrer" className="w-7 h-7 rounded-full object-cover border border-white/10" />
                          </td>
                          <td className="py-3.5 px-4 text-white font-bold">{item.name}</td>
                          <td className="py-3.5 px-4 text-zinc-400 font-mono">{item.email}</td>
                          <td className="py-3.5 px-4 text-zinc-300">{item.country}</td>
                          <td className="py-3.5 px-4 font-mono font-bold text-white">R$ {item.balance.toFixed(2)}</td>
                          <td className="py-3.5 px-4 text-center">
                            {item.blocked ? (
                              <span className="text-[9px] bg-red-950 font-bold text-red-400 px-1.5 py-0.5 rounded border border-red-500/20 uppercase font-mono">Bloqueado</span>
                            ) : (
                              <span className="text-[9px] bg-emerald-950 font-bold text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20 uppercase font-mono">Ativo</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            {isSelf ? (
                              <span className="text-[10px] text-zinc-500 italic">Administrador</span>
                            ) : (
                              <button
                                onClick={() => onToggleBlockUser(item.id)}
                                className={`p-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                                  item.blocked 
                                    ? 'bg-emerald-950/40 hover:bg-emerald-950 text-emerald-400 border-emerald-500/20' 
                                    : 'bg-red-950/40 hover:bg-red-950 text-red-400 border-red-500/20'
                                }`}
                                title={item.blocked ? 'Desbloquear usuário' : 'Bloquear usuário'}
                              >
                                {item.blocked ? <Unlock size={14} /> : <Lock size={14} />}
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ADVERTISEMENTS REVIEW QUEUE */}
        {adminActiveSubTab === 'ads' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold font-display text-white">Fila de Moderação de Anúncios</h3>
              <p className="text-zinc-400 text-xs mt-0.5">Aprove novos envios de usuários ou apague itens denunciados/duvidosos.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stickers.length > 0 ? (
                stickers.map((st) => (
                  <div key={st.id} className="glass-card rounded-2xl p-4 border border-white/10 flex flex-col justify-between relative overflow-hidden">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3 text-left">
                        <div className="w-12 h-14 bg-slate-900 border border-white/10 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs text-white uppercase overflow-hidden">
                          {/* small photo avatar */}
                          {st.number}
                        </div>
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <h4 className="text-white font-bold text-xs">{st.player}</h4>
                            <span className="text-[8px] bg-white/5 border border-white/5 text-zinc-400 px-1 py-0.5 rounded uppercase font-mono">{st.rarity}</span>
                          </div>
                          <p className="text-zinc-500 text-[10px] mt-0.5">Dono: {st.ownerName}</p>
                          <p className="text-zinc-400 text-[11px] mt-1 line-clamp-1 italic">"{st.description}"</p>
                        </div>
                      </div>

                      {/* Approved sticker badges */}
                      <div>
                        {st.approved ? (
                          <span className="text-[9px] bg-emerald-950 text-emerald-400 font-bold px-1.5 py-0.5 rounded font-mono border border-emerald-550/20">Aprovado</span>
                        ) : (
                          <span className="text-[9px] bg-orange-950 text-orange-400 font-bold px-1.5 py-0.5 rounded font-mono border border-orange-550/20">Pendente</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-4 text-[11px]">
                      <div>
                        <span className="text-zinc-500 font-mono">Tipo:</span>{' '}
                        <strong className="text-white uppercase font-bold text-xxs font-mono">{st.type}</strong>
                        {st.price && <strong className="text-white font-bold ml-1.5 font-display">R$ {st.price.toFixed(2)}</strong>}
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onDeleteSticker(st.id)}
                          className="p-1 px-2.5 rounded bg-white/5 hover:bg-white/15 border border-white/5 text-red-400 hover:text-red-300 text-xs flex items-center space-x-1 cursor-pointer transition-all"
                          title="Excluir Anúncio de figurinha"
                        >
                          <Trash2 size={12} />
                          <span>Apagar</span>
                        </button>
                        
                        {!st.approved && (
                          <button
                            onClick={() => onApproveSticker(st.id)}
                            className="p-1 px-2.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1 cursor-pointer transition-all"
                          >
                            <Check size={12} />
                            <span>Aprovar</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-12 text-zinc-500 text-xs">
                  Sem cards cadastrados para revisar.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: PLATFORM RULES SAFETY EDITOR */}
        {adminActiveSubTab === 'rules' && (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold font-display text-white">Regras e Proteção ao Colecionador</h3>
                <p className="text-zinc-400 text-xs mt-0.5">As alterações dessas regras impactam instantaneamente as seções de segurança na Landing Page.</p>
              </div>
            </div>

            {/* List and edit rules */}
            <div className="space-y-4">
              {rules.map((rule) => (
                <div key={rule.id} className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
                  {editingRuleId === rule.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="w-full glass-input rounded-xl px-3 py-2 text-xs"
                      />
                      <textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        className="w-full glass-input rounded-xl px-3 py-2 text-xs"
                        rows={3}
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveRuleClick}
                          className="px-3 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-lg cursor-pointer"
                        >
                          Gravar Modificação
                        </button>
                        <button
                          onClick={() => setEditingRuleId(null)}
                          className="px-3 py-1.5 bg-white/5 text-zinc-400 hover:text-white text-xs rounded-lg cursor-pointer"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-white text-sm font-bold font-sans">{rule.title}</h4>
                        <button
                          onClick={() => handleStartEditRule(rule)}
                          className="text-xs text-yellow-400 hover:text-yellow-300 font-bold hover:underline cursor-pointer"
                        >
                          Editar Regra
                        </button>
                      </div>
                      <p className="text-zinc-400 text-xs mt-1.5 leading-relaxed">{rule.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Form to create new rule */}
            <form onSubmit={handleCreateRule} className="glass-card rounded-2xl p-5 border border-dashed border-white/20 space-y-3.5">
              <h4 className="text-white text-xs font-bold font-sans uppercase tracking-wider flex items-center space-x-1.5">
                <Plus size={14} className="text-yellow-400" />
                <span>Adicionar Nova Diretriz de Segurança</span>
              </h4>
              <div>
                <label className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase block mb-1">Título</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: 📢 Evite pagamentos adiantados"
                  className="w-full glass-input rounded-xl p-2.5 text-xs"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase block mb-1">Descrição Informativa</label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Descreva as orientações de segurança para evitar extorsões e furtos de cards..."
                  className="w-full glass-input rounded-xl p-2.5 text-xs"
                  rows={2}
                  required
                />
              </div>
              <button
                type="submit"
                className="py-2.5 px-4 rounded-xl bg-white text-slate-950 font-extrabold text-xs cursor-pointer shadow hover:bg-zinc-100 transition-colors"
              >
                Publicar Nova Regra
              </button>
            </form>
          </div>
        )}

        {/* TAB 5: STATISTICAL SVG REPORTS */}
        {adminActiveSubTab === 'stats' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold font-display text-white">Relatórios Analíticos</h3>
              <p className="text-zinc-400 text-xs mt-0.5">Indicadores do ecossistema e demanda de categorias de figurinhas.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* SVG Chart 1 */}
              <div className="glass-card rounded-2xl p-5 border border-white/10 text-center">
                <h4 className="text-white text-xs font-bold uppercase tracking-widest font-mono mb-4 text-left">Quantidade por Raridade</h4>
                
                {/* Micro SVG responsive drawing */}
                <div className="w-full h-48 flex items-end justify-between px-6 pt-4 border-b border-white/5 pb-1 relative">
                  {/* Grid lines inside */}
                  <div className="absolute inset-x-0 bottom-4 border-t border-white/5 pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-20 border-t border-white/5 pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-36 border-t border-white/5 pointer-events-none" />

                  {/* Comuns bar */}
                  <div className="flex flex-col items-center flex-1 space-y-2 group">
                    <span className="text-[10px] text-zinc-400 font-bold group-hover:text-white transition-opacity font-mono">112</span>
                    <div className="w-8 md:w-12 bg-linear-to-t from-blue-600 to-cyan-500 rounded-t-lg transition-all group-hover:brightness-125 shadow-md shadow-blue-900/10" style={{ height: '35%' }} />
                    <span className="text-[10px] text-zinc-500 font-mono">Comuns</span>
                  </div>

                  {/* Raras bar */}
                  <div className="flex flex-col items-center flex-1 space-y-2 group">
                    <span className="text-[10px] text-purple-300 font-bold group-hover:text-white transition-opacity font-mono">245</span>
                    <div className="w-8 md:w-12 bg-linear-to-t from-purple-650 to-pink-550 rounded-t-lg transition-all group-hover:brightness-125 shadow-md shadow-purple-900/10" style={{ height: '70%' }} />
                    <span className="text-[10px] text-purple-400 font-mono">Raras</span>
                  </div>

                  {/* Lendarias bar */}
                  <div className="flex flex-col items-center flex-1 space-y-2 group">
                    <span className="text-[10px] text-amber-300 font-bold group-hover:text-white transition-opacity font-mono">310</span>
                    <div className="w-8 md:w-12 bg-linear-to-t from-amber-550 to-yellow-450 rounded-t-lg transition-all group-hover:brightness-125 shadow-md shadow-amber-900/10 animate-bounce-slow" style={{ height: '90%' }} />
                    <span className="text-[10px] text-amber-400 font-mono">Lendárias</span>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-500 mt-4">Stickers Lendários representam a maior margem de liquidez negociada.</p>
              </div>

              {/* SVG Chart 2: Intent types */}
              <div className="glass-card rounded-2xl p-5 border border-white/10 text-center">
                <h4 className="text-white text-xs font-bold uppercase tracking-widest font-mono mb-4 text-left">Intenções de Anúncios</h4>
                
                <div className="w-full h-48 flex items-center justify-center relative">
                  {/* Inline circle diagram */}
                  <svg className="w-32 h-32 transform -rotate-90">
                    {/* Circle 1 - Vendas (yellow) */}
                    <circle cx="64" cy="64" r="50" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                    <circle cx="64" cy="64" r="50" fill="transparent" stroke="#eab308" strokeWidth="14" strokeDasharray="314" strokeDashoffset="75" strokeLinecap="round" />
                    {/* Circle 2 - Troca (emerald) */}
                    <circle cx="64" cy="64" r="50" fill="transparent" stroke="#10b981" strokeWidth="14" strokeDasharray="314" strokeDashoffset="240" strokeLinecap="round" />
                  </svg>
                  
                  {/* Absolute visual pointer inside svg circle */}
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-white text-base font-extrabold font-mono">68%</span>
                    <span className="text-zinc-500 text-[9px] uppercase">Venda Liquida</span>
                  </div>
                </div>

                <div className="flex justify-center space-x-6 text-[10px] font-mono mt-4">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-yellow-500" />
                    <span className="text-zinc-300">Venda: 68%</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
                    <span className="text-zinc-300">Troca: 32%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
