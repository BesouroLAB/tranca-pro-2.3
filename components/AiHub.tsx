
import React, { useState } from 'react';
import { Bot, Sparkles, Camera, ArrowLeft, Send, Calculator, BookOpen, DollarSign, ChevronLeft, MessageSquare, Instagram, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type ToolMode = 'MENU' | 'DIAGNOSIS' | 'CONTENT' | 'CHAT';

const AiHub = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<ToolMode>('MENU');

  // Chat State
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: 'Olá! Sou a Zuri, sua assistente virtual. Escolha uma ferramenta no menu para começarmos! ✨' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Diagnosis State
  const [selectedHair, setSelectedHair] = useState<string | null>(null);

  // Content State
  const [contentTopic, setContentTopic] = useState('');

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add User Message
    const newHistory = [...chatHistory, { role: 'user' as const, text: message }];
    setChatHistory(newHistory);
    setMessage('');
    setIsTyping(true);

    // Mock AI Response
    setTimeout(() => {
      setIsTyping(false);
      setChatHistory(prev => [...prev, {
        role: 'bot',
        text: 'Ainda estou em fase de treinamento (BETA), mas logo poderei responder sobre ' + message + ' com precisão total! Por enquanto, tente usar as ferramentas de Diagnóstico ou Conteúdo. 😉'
      }]);
    }, 1500);
  };

  const handleDiagnosis = (type: string) => {
    setIsTyping(true);
    setSelectedHair(type);
    setMode('CHAT'); // Switch to chat to show result

    const diagnoses: Record<string, string> = {
      '4C': 'Para cabelo 4C (Crespo Fino), a regra de ouro é: **Zero Tensão**. \n\n1. Use bastante óleo na preparação.\n2. Evite tranças muito finas na base.\n3. Indique Box Braids médias ou Knotless.',
      '4A': 'Para cabelo 4A/4B (Volumoso), foque na **Fitagem** antes de trançar. \n\n1. Use pomada modeladora para alinhar.\n2. A divisão precisa ser bem limpa.\n3. Nagô desenhada fica excelente.',
      'Transição': 'Cabelo em **Transição** exige cuidado duplo. \n\n1. A textura muda no meio do fio.\n2. Use Knotless para camuflar a diferença.\n3. Não aperte a raiz de jeito nenhum!'
    };

    setTimeout(() => {
      setIsTyping(false);
      setChatHistory(prev => [
        ...prev,
        { role: 'user', text: `Analisar cabelo tipo: ${type}` },
        { role: 'bot', text: diagnoses[type] || 'Análise não encontrada.' }
      ]);
    }, 1000);
  };

  const handleContentGen = () => {
    if (!contentTopic.trim()) return;
    setIsTyping(true);
    setMode('CHAT');

    setTimeout(() => {
      setIsTyping(false);
      setChatHistory(prev => [
        ...prev,
        { role: 'user', text: `Ideia de post sobre: ${contentTopic}` },
        { role: 'bot', text: `✨ **Sugestão de Legenda para Instagram:**\n\n"Você sabia que ${contentTopic} pode mudar seu visual? 😍\n\nAqui no estúdio, a gente preza por qualidade e saúde capilar. Agende seu horário e venha se transformar!\n\n#tranças #trancista #${contentTopic.replace(/\s/g, '')}"` }
      ]);
      setContentTopic('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-900 pb-24 flex flex-col">
      {/* Header */}
      <header className="bg-stone-900/90 backdrop-blur-md border-b border-stone-800 p-4 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => mode === 'MENU' ? navigate(-1) : setMode('MENU')}
              className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center text-stone-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="font-display italic text-xl text-white">Zuri IA <span className="text-[10px] bg-gold-500/20 text-gold-500 px-1.5 py-0.5 rounded ml-1 font-sans font-bold not-italic">BETA</span></h1>
              <p className="text-xs text-stone-500 font-bold uppercase tracking-widest">{mode === 'MENU' ? 'Central de Inteligência' : 'Assistente Virtual'}</p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gold-500 p-0.5">
            <div className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center border-2 border-gold-500">
              <Bot size={20} className="text-gold-500" />
            </div>
          </div>
        </div>
      </header>

      {/* Content Logic */}
      <div className="flex-1 flex flex-col">

        {/* MENU MODE */}
        {mode === 'MENU' && (
          <div className="p-6 space-y-8 animate-fade-in">
            <div className="text-center space-y-2 py-4">
              <h2 className="text-2xl font-bold text-white">Selecione o Protocolo IA</h2>
              <p className="text-stone-400 text-sm">Motores analíticos prontos para processamento técnico.</p>
            </div>

            <div id="tour-ai-menu" className="grid gap-4">
              {/* Card 1: Diagnóstico */}
              <button onClick={() => setMode('DIAGNOSIS')} className="bg-stone-800 p-5 rounded-3xl border border-stone-700 text-left hover:border-gold-500/50 hover:bg-stone-800/80 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 bg-purple-500/10 rounded-bl-[4rem] group-hover:bg-purple-500/20 transition-colors">
                  <Search size={24} className="text-purple-400" />
                </div>
                <div className="space-y-1 relative z-10">
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">Diagnóstico Capilar</h3>
                  <p className="text-sm text-stone-500 leading-relaxed max-w-[80%]">Identifique o tipo de fio e receba dicas de preparação ideais.</p>
                </div>
              </button>

              {/* Card 2: Criador de Conteúdo */}
              <button onClick={() => setMode('CONTENT')} className="bg-stone-800 p-5 rounded-3xl border border-stone-700 text-left hover:border-gold-500/50 hover:bg-stone-800/80 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 bg-pink-500/10 rounded-bl-[4rem] group-hover:bg-pink-500/20 transition-colors">
                  <Instagram size={24} className="text-pink-400" />
                </div>
                <div className="space-y-1 relative z-10">
                  <h3 className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors">Criador de Legendas</h3>
                  <p className="text-sm text-stone-500 leading-relaxed max-w-[80%]">Gere textos vendedores para suas fotos do Instagram.</p>
                </div>
              </button>

              {/* Card 3: Chat Livre */}
              <button onClick={() => setMode('CHAT')} className="bg-stone-800 p-5 rounded-3xl border border-stone-700 text-left hover:border-gold-500/50 hover:bg-stone-800/80 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 bg-emerald-500/10 rounded-bl-[4rem] group-hover:bg-emerald-500/20 transition-colors">
                  <MessageSquare size={24} className="text-emerald-400" />
                </div>
                <div className="space-y-1 relative z-10">
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Chat com Zuri</h3>
                  <p className="text-sm text-stone-500 leading-relaxed max-w-[80%]">Tire dúvidas sobre técnicas, produtos ou gestão.</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* DIAGNOSIS INPUT MODE */}
        {mode === 'DIAGNOSIS' && (
          <div className="p-6 flex-1 flex flex-col items-center justify-center space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mx-auto mb-4 border border-purple-500/20">
                <Search size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white">Qual o tipo do cabelo?</h2>
              <p className="text-stone-400 text-sm max-w-xs mx-auto">Selecione a textura da cliente para receber o protocolo ideal.</p>
            </div>

            <div className="grid grid-cols-1 gap-3 w-full max-w-sm">
              <button onClick={() => handleDiagnosis('4C')} className="p-4 bg-stone-800 text-white font-bold rounded-xl border border-stone-700 hover:border-purple-500 hover:bg-stone-700 transition-all">
                Crespo 4C (Fino/Frágil)
              </button>
              <button onClick={() => handleDiagnosis('4A')} className="p-4 bg-stone-800 text-white font-bold rounded-xl border border-stone-700 hover:border-purple-500 hover:bg-stone-700 transition-all">
                Crespo 4A/4B (Volumoso)
              </button>
              <button onClick={() => handleDiagnosis('Transição')} className="p-4 bg-stone-800 text-white font-bold rounded-xl border border-stone-700 hover:border-purple-500 hover:bg-stone-700 transition-all">
                Em Transição (Duas Texturas)
              </button>
            </div>
          </div>
        )}

        {/* CONTENT INPUT MODE */}
        {mode === 'CONTENT' && (
          <div className="p-6 flex-1 flex flex-col items-center justify-center space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-400 mx-auto mb-4 border border-pink-500/20">
                <Instagram size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white">Sobre o que é o post?</h2>
              <p className="text-stone-400 text-sm max-w-xs mx-auto">Digite o tema (ex: Box Braids, Promoção, Agenda Aberta) e eu crio a legenda.</p>
            </div>

            <div className="w-full max-w-sm space-y-4">
              <input
                type="text"
                value={contentTopic}
                onChange={(e) => setContentTopic(e.target.value)}
                placeholder="Ex: Box Braids sem dor..."
                className="w-full p-4 bg-stone-800 border border-stone-700 rounded-xl text-white outline-none focus:border-pink-500 transition-colors"
              />
              <button
                onClick={handleContentGen}
                disabled={!contentTopic.trim()}
                className="w-full p-4 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Gerar Legenda Mágica ✨
              </button>
            </div>
          </div>
        )}

        {/* CHAT/RESULTS MODE */}
        {mode === 'CHAT' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                    ? 'bg-stone-800 text-white rounded-tr-none'
                    : 'bg-stone-800/50 border border-stone-700 text-stone-200 rounded-tl-none whitespace-pre-wrap'
                    }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-stone-800/50 border border-stone-700 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1">
                    <div className="w-2 h-2 bg-stone-500 rounded-full animate-bounce delay-0"></div>
                    <div className="w-2 h-2 bg-stone-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-stone-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-stone-900 border-t border-stone-800">
              <div className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua mensagem para Zuri..."
                  className="w-full bg-stone-950 border border-stone-800 text-white p-4 pr-14 rounded-2xl focus:border-gold-500 outline-none transition-all placeholder:text-stone-700 text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  className="absolute right-2 top-2 w-10 h-10 bg-gold-500 hover:bg-gold-400 text-stone-950 rounded-xl flex items-center justify-center active:scale-90 transition-transform"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiHub;
