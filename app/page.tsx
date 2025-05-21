"use client";
import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { FiMoon, FiSun } from 'react-icons/fi';
import {
  FiMessageSquare, FiCalendar, FiSettings, FiUser, FiPlus,
  FiSearch, FiShare2, FiSend, FiGrid, FiDatabase, FiCode, FiZap, FiFileText
} from 'react-icons/fi';

import { motion, AnimatePresence } from 'framer-motion';

const AssistenteIA = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  //const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Olá! 👋', sender: 'ai', animate: true },
    { id: 2, text: 'Como posso te ajudar hoje?', sender: 'ai', animate: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: 'user',
        animate: true
      };
      setMessages([...messages, newMessage]);
      setInputValue('');

      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          text: getAIResponse(inputValue),
          sender: 'ai',
          animate: true
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 800);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getAIResponse = (userMessage: string) => {
    const responses = [
      "Posso te ajudar com isso! Aqui estão algumas opções:",
      "Baseado no que você pediu, recomendo estas ações:",
      "Deixe-me fornecer as melhores soluções:",
      "Aqui está o que encontrei para você:"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const quickActions = [
    { icon: <FiCalendar className="text-indigo-500" />, text: "Agendar Reunião" },
    { icon: <FiFileText className="text-blue-500" />, text: "Criar Documento" },
    { icon: <FiDatabase className="text-emerald-500" />, text: "Analisar Dados" },
    { icon: <FiCode className="text-purple-500" />, text: "Ajuda com Código" }
  ];

  const sidebarItems = [
    { icon: <FiMessageSquare className="text-white" />, text: "Chat Geral", color: "from-blue-500 to-blue-600" },
    { icon: <FiGrid className="text-white" />, text: "Estúdio Criativo", color: "from-purple-500 to-purple-600" },
    { icon: <FiDatabase className="text-white" />, text: "Análise de Dados", color: "from-emerald-500 to-emerald-600" },
    { icon: <FiZap className="text-white" />, text: "Ações Rápidas", color: "from-amber-500 to-amber-600" }
  ];

  return (
    <div className="flex h-screen flex-col lg:flex-row bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 font-sans overflow-hidden">

      {/* Sidebar */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:flex lg:w-72 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-r border-gray-200/50 dark:border-gray-700/50 flex-col py-6 px-4 shadow-xl shadow-gray-200/20"
      >
        <div className="mb-8 flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center ring-2 ring-blue-100 dark:ring-blue-800 ring-offset-2 dark:ring-offset-gray-800 shadow-md"
            >
              <span className="text-white font-semibold text-sm">AI</span>
            </motion.div>
            <span className="font-medium text-gray-800 dark:text-gray-200">Assistente IA</span>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-lg"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {mounted && theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-lg"
            >
              <FiSearch size={18} />
            </motion.button>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl py-2.5 px-4 flex items-center justify-center gap-2 mb-6 shadow-lg shadow-indigo-500/20 dark:shadow-indigo-500/10 hover:shadow-indigo-500/30 dark:hover:shadow-indigo-500/20 transition-all duration-200"
        >
          <FiPlus size={16} />
          <span className="font-medium text-sm">Novo Chat</span>
        </motion.button>

        <nav className="flex-1 space-y-1 overflow-y-auto">
          {sidebarItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ x: 5 }}
              className="p-3 rounded-xl hover:bg-gray-100/80 cursor-pointer flex items-center gap-3 group transition-all duration-200"
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md`}>
                {item.icon}
              </div>
              <span className="text-sm font-medium text-gray-700">{item.text}</span>
            </motion.div>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-200/50">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100/80 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <FiUser size={16} className="text-gray-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-700">Usuário</p>
              <p className="text-xs text-gray-500">Plano Gratuito</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="p-4 border-b border-gray-200/50 dark:border-gray-700/50 backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 sticky top-0 z-10 shadow-sm"
        >
          <div className="flex flex-wrap justify-between items-center gap-2 sm:gap-3 max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">Assistente Virtual</h1>
              <span className="text-xs bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-2 py-1 rounded-full font-medium shadow-md shadow-blue-500/20">PRO</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiSettings size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiShare2 size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl px-4 py-2 text-sm font-medium shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200"
              >
                Novo Chat
              </motion.button>
            </div>
          </div>
        </motion.header>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-10 py-6">
          <div className="max-w-5xl mx-auto">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={message.animate ? { opacity: 0, y: 20 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  {message.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-4 ring-2 ring-blue-100 ring-offset-2 self-start">
                      <span className="text-white font-semibold text-xs">IA</span>
                    </div>
                  )}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className={`max-w-3xl px-4 py-3 rounded-2xl shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg shadow-gray-100/50 dark:shadow-gray-900/50 border border-gray-200/50 dark:border-gray-700/50'
                    }`}
                  >
                    {message.text}
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              {quickActions.map((action, index) => (
                <motion.button
                  key={index}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-lg hover:shadow-gray-100/50 dark:hover:shadow-gray-900/50"
                >
                  {action.icon}
                  <span className="text-sm font-medium">{action.text}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200/50">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Pergunte qualquer coisa...</h2>
              <span className="text-xs text-gray-400 dark:text-gray-500">v1.0.0</span>
            </div>
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <motion.div 
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.2 }}
  className="sticky bottom-0 bg-gradient-to-t from-white via-white dark:from-gray-800 dark:via-gray-800 to-transparent pt-6 pb-8 px-4 sm:px-6 md:px-10"
>
  <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-xl shadow-gray-200/30 dark:shadow-gray-900/30 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-lg space-y-3">

    {/* Linha com atalhos e opções */}
    <div className="flex items-center justify-between flex-wrap gap-2 px-2">
      <div className="flex gap-2 flex-wrap">
        <button className="text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-xl transition">
          📌 Inserir Link
        </button>
        <button className="text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-xl transition">
          📄 Gerar Resumo
        </button>
        <button className="text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-xl transition">
          💬 Traduzir
        </button>
      </div>
      {/* Select para fonte/contexto */}
      <select className="text-sm px-3 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <option>Contexto: Padrão</option>
        <option>Projetos</option>
        <option>Documentos</option>
        <option>Chat pessoal</option>
      </select>
    </div>

    {/* Input com botão de enviar e voz */}
    <div className="relative">
      <motion.input
        whileFocus={{ scale: 1.005 }}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        placeholder="Digite sua mensagem..."
        className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-gray-700 border-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200 font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100 pr-20"
      />

      {/* Botão de microfone (esquerda) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-lg"
        onClick={() => alert("Gravação de voz em desenvolvimento")}
      >
        🎙️
      </motion.button>

      {/* Botão de enviar (direita) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleSendMessage}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-lg"
      >
        <FiSend size={20} />
      </motion.button>
    </div>
  </div>
</motion.div>

      </div>
    </div>
  );
};

export default AssistenteIA;
