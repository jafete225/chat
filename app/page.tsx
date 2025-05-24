"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiHeadphones, FiZap, FiDatabase, FiUsers, FiStar, FiImage, FiSettings, FiShare2, FiCalendar, FiLink, FiFileText, FiPaperclip, FiMic, FiSend, FiMenu, FiX } from 'react-icons/fi';
import { BsPuzzle, BsPlus } from 'react-icons/bs';

interface Mensagem {
  id: number;
  texto: string;
  remetente: 'usuario' | 'ai';
}

interface ItemSidebar {
  icone: React.ReactNode;
  label: string;
}

interface Chat {
  titulo: string;
  hora: string;
  icone?: React.ReactNode;
  somenteTexto?: boolean;
}

interface SecaoChat {
  titulo: string;
  chats: Chat[];
}

interface CardRecurso {
  icone: React.ReactNode;
  titulo: string;
  descricao: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const skeletonVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const sidebarVariants = {
  open: { x: 0 },
  closed: { x: '-100%' }
};

const overlayVariants = {
  open: { opacity: 0.5 },
  closed: { opacity: 0 }
};

const Pagina = () => {
  const [botaoAtivo, setBotaoAtivo] = useState('Chat');
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    { id: 1, texto: "Olá! 👋", remetente: "ai" },
    { id: 2, texto: "Bem-vindo ao Orbita GPT. Como posso ajudar hoje?", remetente: "ai" }
  ]);
  const [valorInput, setValorInput] = useState("");
  const refFimMensagens = useRef<HTMLDivElement>(null);
  const [carregado, setCarregado] = useState(false);
  const [sidebarVisivel, setSidebarVisivel] = useState(true);
  const [mobileSidebarVisivel, setMobileSidebarVisivel] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCarregado(true);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    refFimMensagens.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  const enviarMensagem = () => {
    if (valorInput.trim()) {
      const mensagemUsuario: Mensagem = { 
        id: mensagens.length + 1, 
        texto: valorInput, 
        remetente: "usuario" 
      };
      setMensagens([...mensagens, mensagemUsuario]);
      setValorInput("");

      setTimeout(() => {
        const mensagemAI: Mensagem = {
          id: mensagens.length + 2,
          texto: "Sou o Orbita GPT, como posso te ajudar com isso?",
          remetente: "ai"
        };
        setMensagens(prev => [...prev, mensagemAI]);
      }, 800);
    }
  };

  const toggleSidebar = () => {
    setSidebarVisivel(!sidebarVisivel);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarVisivel(!mobileSidebarVisivel);
  };

  const itensSidebar: ItemSidebar[] = [
    { icone: <FiSearch className="w-4 h-4" />, label: "Busca" },
    { icone: <FiHeadphones className="w-4 h-4" />, label: "Suporte" },
    { icone: <FiZap className="w-4 h-4" />, label: "Ações Rápidas" },
    { icone: <BsPuzzle className="w-4 h-4" />, label: "Integrações" },
    { icone: <FiDatabase className="w-4 h-4" />, label: "Banco de Dados" },
    { icone: <FiUsers className="w-4 h-4" />, label: "Usuários" },
  ];

  const secoesChat: SecaoChat[] = [
    {
      titulo: "Hoje",
      chats: [
        { 
          titulo: "ChatAI", 
          hora: "ChatAI",
          icone: <div className="w-5 h-5 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">C</div>
        },
        { 
          titulo: "Imagem do Sol", 
          hora: "Imagem do Sol",
          icone: <div className="w-5 h-5 rounded-md bg-purple-100 text-purple-600 flex items-center justify-center"><FiImage className="w-3 h-3" /></div>
        },
        {
          titulo: "Como fazer marketing digital",
          hora: "Como fazer marketing digital",
          somenteTexto: true
        },
        {
          titulo: "Melhores práticas SEO 2025",
          hora: "Melhores práticas SEO 2025",
          somenteTexto: true
        }
      ]
    },
    {
      titulo: "Ontem",
      chats: [
        {
          titulo: "Investimentos para iniciantes",
          hora: "Investimentos para iniciantes",
          somenteTexto: true
        }
      ]
    },
    {
      titulo: "Últimos 7 Dias",
      chats: [
        {
          titulo: "Como criar uma startup",
          hora: "Como criar uma startup",
          somenteTexto: true
        },
        {
          titulo: "Dicas de produtividade",
          hora: "Dicas de produtividade",
          somenteTexto: true
        }
      ]
    },
  ];

  const cardsRecurso: CardRecurso[] = [
    {
      icone: <FiCalendar className="w-4 h-4 text-blue-500" />,
      titulo: "Conectar Calendário",
      descricao: "Sincronize sua agenda"
    },
    {
      icone: <FiLink className="w-4 h-4 text-purple-500" />,
      titulo: "Extensões Navegador",
      descricao: "Instale nossa extensão"
    },
    {
      icone: <FiFileText className="w-4 h-4 text-green-500" />,
      titulo: "Compartilhar em Notas",
      descricao: "Salve conversas"
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100 text-sm overflow-hidden">
      <div className="flex-1 flex flex-col">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={carregado ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="bg-white border-b px-4 py-2 flex items-center justify-between sm:px-6 sm:py-3"
        >
          <div className="flex items-center gap-2">
            <button 
              className="md:hidden text-gray-600 hover:text-gray-800 p-1"
              onClick={toggleMobileSidebar}
            >
              {mobileSidebarVisivel ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
            <button 
              className="hidden md:flex text-gray-600 hover:text-gray-800 p-1"
              onClick={toggleSidebar}
            >
              {sidebarVisivel ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
            
            {loading ? (
              <motion.div
                variants={skeletonVariants}
                className="h-6 w-32 bg-gray-200 rounded-md"
              />
            ) : (
              <motion.div className="flex items-center gap-2">
                <motion.h1 
                  initial={{ opacity: 0 }}
                  animate={carregado ? { opacity: 1 } : {}}
                  transition={{ delay: 0.2 }}
                  className="text-lg font-bold text-black sm:text-xl"
                >
                  Orbita GPT
                </motion.h1>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={carregado ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 }}
                  className="text-xs text-gray-500 px-1.5 py-0.5 bg-gray-100 rounded-md"
                >
                  Plus
                </motion.span>
              </motion.div>
            )}
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            {[FiSettings, FiShare2].map((Icon, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0 }}
                animate={carregado ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="text-gray-600 hover:text-gray-800 p-1"
              >
                {loading ? (
                  <motion.div
                    variants={skeletonVariants}
                    className="w-5 h-5 bg-gray-200 rounded-full"
                  />
                ) : (
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </motion.button>
            ))}
            
            {loading ? (
              <motion.div
                variants={skeletonVariants}
                className="hidden sm:block h-8 w-24 bg-gray-200 rounded-lg"
              />
            ) : (
              <motion.button
                initial={{ opacity: 0 }}
                animate={carregado ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="hidden sm:flex items-center gap-1 text-xs sm:text-sm text-white bg-black px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg hover:bg-gray-800"
              >
                <BsPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Novo Chat</span>
              </motion.button>
            )}
          </div>
        </motion.div>

        <div className="flex flex-1 overflow-hidden relative">
          {/* Sidebar Mobile (aparece apenas em telas pequenas) */}
          <AnimatePresence>
            {mobileSidebarVisivel && (
              <>
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={sidebarVariants}
                  transition={{ type: 'tween', ease: 'easeInOut' }}
                  className="md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg"
                >
                  <div className="h-full flex flex-col">
                    <div className="p-4 border-b flex justify-between items-center">
                      <h2 className="text-lg font-bold text-black">Menu</h2>
                      <button onClick={toggleMobileSidebar} className="p-1">
                        <FiX className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xs text-gray-500 mb-2">Menu Principal</h3>
                          <div className="space-y-1 text-black">
                            {itensSidebar.map((item, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  setBotaoAtivo(item.label);
                                  setMobileSidebarVisivel(false);
                                }}
                                className={`w-full flex items-center gap-2 p-2 rounded-lg ${botaoAtivo === item.label ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                              >
                                {item.icone}
                                <span>{item.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xs text-gray-500 mb-2">Histórico de Chats</h3>
                          {secoesChat.map((secao, indexSecao) => (
                            <div key={indexSecao} className="space-y-1 mb-4 text-black">
                              <h4 className="text-xs text-gray-500">{secao.titulo}</h4>
                              {secao.chats.map((chat, indexChat) => (
                                <div 
                                  key={indexChat}
                                  className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-sm cursor-pointer"
                                >
                                  {!chat.somenteTexto && chat.icone}
                                  <span className="text-sm truncate">{chat.titulo}</span>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={overlayVariants}
                  onClick={toggleMobileSidebar}
                  className="md:hidden fixed inset-0 z-40 bg-black"
                />
              </>
            )}
          </AnimatePresence>

          {/* Sidebar Primária (desktop) */}
          <AnimatePresence>
            {sidebarVisivel && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '4rem' }}
                exit={{ width: 0 }}
                transition={{ type: 'tween' }}
                className="hidden md:flex bg-white border-r"
              >
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate={carregado ? "visible" : ""}
                  className="space-y-2 sm:space-y-4 w-16 p-4"
                >
                  {loading ? (
                    <motion.div
                      variants={skeletonVariants}
                      className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full mb-4 sm:mb-6"
                    />
                  ) : (
                    <motion.div 
                      variants={itemVariants}
                      className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center mb-4 sm:mb-6"
                    >
                      {/* Ícone do chat */}
                    </motion.div>
                  )}

                  {loading ? (
                    Array(6).fill(0).map((_, index) => (
                      <motion.div
                        key={index}
                        variants={skeletonVariants}
                        className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-lg"
                      />
                    ))
                  ) : (
                    itensSidebar.map((item, index) => (
                      <motion.button
                        key={item.label}
                        variants={itemVariants}
                        onClick={() => setBotaoAtivo(item.label)}
                        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg transition-colors ${botaoAtivo === item.label ? 'bg-black text-white' : 'text-black hover:bg-gray-100'}`}
                        title={item.label}
                      >
                        {item.icone}
                      </motion.button>
                    ))
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sidebar Secundária (desktop) */}
          <AnimatePresence>
            {sidebarVisivel && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '16rem' }}
                exit={{ width: 0 }}
                transition={{ type: 'tween' }}
                className="hidden md:flex bg-white border-r"
              >
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={carregado ? "visible" : ""}
                  className="w-64 p-4"
                >
                  {loading ? (
                    <>
                      <motion.div variants={itemVariants} className="flex items-center justify-between mb-4">
                        <div className="h-6 w-24 bg-gray-200 rounded-md" />
                        <div className="h-6 w-6 bg-gray-200 rounded-md" />
                      </motion.div>
                      <div className="h-10 w-full bg-gray-200 rounded-xl mb-4" />
                      <div className="h-4 w-16 bg-gray-200 rounded-md mt-6 mb-2" />
                      <div className="space-y-2">
                        {Array(5).fill(0).map((_, i) => (
                          <div key={i} className="h-6 w-full bg-gray-200 rounded-sm" />
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <motion.div variants={itemVariants} className="flex items-center justify-between mb-3 sm:mb-4">
                        <h2 className="text-lg font-bold text-gray-900 sm:text-xl">Chat</h2>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <button className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 text-black hover:bg-gray-100 rounded-lg">
                            <FiSearch className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </motion.div>
                      
                      <motion.button 
                        variants={itemVariants}
                        className="flex items-center justify-center gap-1 text-xs sm:text-sm text-white bg-black px-2 py-1 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-2xl hover:bg-gray-800 w-full mb-3 sm:mb-4"
                      >
                        <BsPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Novo Chat</span>
                      </motion.button>

                      <motion.div variants={itemVariants} className="flex items-center gap-2 mt-6 sm:mt-10 px-1 sm:px-2">
                        <FiStar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                        <span className="text-xs text-gray-500">Salvos</span>
                      </motion.div>
                      
                      <motion.div variants={containerVariants} className="mt-3 sm:mt-4 space-y-4 sm:space-y-6">
                        {secoesChat.map((secao, indexSecao) => (
                          <motion.div key={indexSecao} variants={itemVariants} className="space-y-1 sm:space-y-2">
                            <h3 className="text-xs text-gray-500 px-1 sm:px-2">{secao.titulo}</h3>
                            {secao.chats.map((chat, indexChat) => (
                              <motion.div 
                                key={indexChat}
                                variants={itemVariants}
                                transition={{ delay: indexChat * 0.05 }}
                                className="flex items-center gap-2 p-1 sm:p-2 hover:bg-gray-50 rounded-sm cursor-pointer"
                              >
                                {!chat.somenteTexto && chat.icone}
                                <span className="text-xs text-gray-950 truncate">{chat.hora}</span>
                              </motion.div>
                            ))}
                          </motion.div>
                        ))}
                      </motion.div>
                    </>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Área Principal de Conteúdo */}
          <div className={`flex-1 flex flex-col bg-white overflow-hidden ${mobileSidebarVisivel ? 'md:ml-0' : ''}`}>
            {/* Área de mensagens */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
                <AnimatePresence>
                  {loading ? (
                    <motion.div
                      key="skeleton-welcome"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center h-full space-y-6 sm:space-y-8"
                    >
                      <motion.div
                        variants={skeletonVariants}
                        className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full"
                      />
                      <motion.div
                        variants={skeletonVariants}
                        className="h-6 w-48 bg-gray-200 rounded-md"
                      />
                      <motion.div
                        variants={skeletonVariants}
                        className="h-4 w-64 bg-gray-200 rounded-md"
                      />
                      
                      <motion.div
                        variants={skeletonVariants}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xs sm:max-w-2xl"
                      >
                        {Array(3).fill(0).map((_, i) => (
                          <motion.div
                            key={i}
                            variants={skeletonVariants}
                            className="bg-gray-100 border border-gray-200 rounded-lg p-3"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 bg-gray-200 rounded-full" />
                              <div className="h-4 w-24 bg-gray-200 rounded-md" />
                            </div>
                            <div className="h-3 w-full bg-gray-200 rounded-md" />
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  ) : mensagens.length <= 2 ? (
                    <motion.div
                      key="welcome"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center justify-center h-full space-y-6 sm:space-y-8"
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center"
                      >
                        {/* Ícone do chat */}
                      </motion.div>
                      <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-xl font-bold flex items-center gap-2 sm:text-2xl"
                      >
                        Olá! 👋
                      </motion.h1>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-sm text-gray-500 text-center max-w-xs sm:max-w-md sm:text-base"
                      >
                        Bem-vindo ao Orbita GPT. Como posso ajudar hoje?
                      </motion.p>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xs sm:max-w-2xl"
                      >
                        {cardsRecurso.map((card, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                            className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3 hover:shadow-md transition-shadow cursor-pointer"
                          >
                            <div className="flex items-center gap-2 mb-1 sm:mb-2">
                              <div className="p-1 sm:p-2 rounded-full bg-gray-100">
                                {card.icone}
                              </div>
                              <h3 className="text-xs sm:text-sm font-medium">{card.titulo}</h3>
                            </div>
                            <p className="text-xs text-gray-500 sm:text-sm">{card.descricao}</p>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  ) : (
                    <>
                      {mensagens.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${msg.remetente === 'usuario' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[90%] sm:max-w-[80%] px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-sm sm:text-base ${
                              msg.remetente === 'usuario'
                                ? 'bg-blue-500 text-white rounded-tr-none'
                                : 'bg-gray-100 text-gray-800 rounded-tl-none'
                            }`}
                          >
                            {msg.texto}
                          </div>
                        </motion.div>
                      ))}
                    </>
                  )}
                </AnimatePresence>
                <div ref={refFimMensagens} />
              </div>
            </div>

            {/* Campo de entrada de mensagens */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={carregado ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="border-t border-gray-200 p-3 sm:p-4 bg-white"
            >
              <div className="max-w-2xl mx-auto relative">
                {loading ? (
                  <div className="flex items-center gap-2 mb-2">
                    {Array(3).fill(0).map((_, i) => (
                      <div key={i} className="w-6 h-6 bg-gray-200 rounded-full" />
                    ))}
                  </div>
                ) : (
                  <motion.div 
                    className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate={carregado ? "visible" : ""}
                  >
                    {[FiPaperclip, FiMic, FiSearch].map((Icon, index) => (
                      <motion.button
                        key={index}
                        variants={itemVariants}
                        className="text-gray-500 hover:text-gray-700 p-1 rounded-full"
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.button>
                    ))}
                  </motion.div>
                )}
                
                {loading ? (
                  <div className="h-12 w-full bg-gray-200 rounded-full" />
                ) : (
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate={carregado ? "visible" : ""}
                    className="relative"
                  >
                    <input
                      type="text"
                      value={valorInput}
                      onChange={(e) => setValorInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && enviarMensagem()}
                      placeholder="Digite sua mensagem..."
                      className="w-full pl-3 pr-10 py-2 sm:pl-4 sm:pr-12 sm:py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={enviarMensagem}
                      className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-1 sm:p-2 rounded-full hover:bg-blue-600 transition-colors"
                    >
                      <FiSend className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagina;