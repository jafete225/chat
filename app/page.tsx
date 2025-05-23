"use client";
import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiMessageSquare, FiHeadphones, FiZap, FiDatabase, FiUsers, FiStar, FiImage, FiSettings, FiShare2, FiCalendar, FiLink, FiFileText, FiPaperclip, FiMic, FiSend } from 'react-icons/fi';
import { BsPuzzle, BsPlus } from 'react-icons/bs';

const Page = () => {
  const [activeButton, setActiveButton] = useState('Chat');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi, there! 👋", sender: "ai" },
    { id: 2, text: "Welcome to Orbita GPT. How can I assist you today?", sender: "ai" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMsg = { id: messages.length + 1, text: inputValue, sender: "user" };
      setMessages([...messages, userMsg]);
      setInputValue("");

      setTimeout(() => {
        const aiMsg = {
          id: messages.length + 2,
          text: "I'm Orbita GPT, how can I help you with this?",
          sender: "ai"
        };
        setMessages(prev => [...prev, aiMsg]);
      }, 800);
    }
  };

  const sidebarItems = [
    { icon: <FiMessageSquare className="w-4 h-4" />, label: "Chat" },
    { icon: <FiSearch className="w-4 h-4" />, label: "Search" },
    { icon: <FiHeadphones className="w-4 h-4" />, label: "Support" },
    { icon: <FiZap className="w-4 h-4" />, label: "Quick Actions" },
    { icon: <BsPuzzle className="w-4 h-4" />, label: "Integrations" },
    { icon: <FiDatabase className="w-4 h-4" />, label: "Database" },
    { icon: <FiUsers className="w-4 h-4" />, label: "Users" },
  ];

  const chatSections = [
    {
      title: "Today",
      chats: [
        { 
          title: "ChatAI", 
          time: "ChatAI",
          icon: <div className="w-5 h-5 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">C</div>
        },
        { 
          title: "Image of Sun", 
          time: "Imagem of Sun",
          icon: <div className="w-5 h-5 rounded-md bg-purple-100 text-purple-600 flex items-center justify-center"><FiImage className="w-3 h-3" /></div>
        },
        {
          title: "Como fazer marketing digital",
          time: "Como fazer marketing digital",
          textOnly: true
        },
        {
          title: "Melhores práticas SEO 2025",
          time: "Melhores práticas SEO 2025",
          textOnly: true
        }
      ]
    },
    {
      title: "Yesterday",
      chats: [
        {
          title: "Investimentos para iniciantes",
          time: "Investimentos para iniciantes",
          textOnly: true
        }
      ]
    },
    {
      title: "Previous 7 Days",
      chats: [
        {
          title: "Como criar uma startup",
          time: "Como criar uma startup",
          textOnly: true
        },
        {
          title: "Dicas de produtividade",
          time: "Dicas de produtividade",
          textOnly: true
        }
      ]
    },
  ];

  const featureCards = [
    {
      icon: <FiCalendar className="w-4 h-4 text-blue-500" />,
      title: "Connect Calendar",
      description: "Sync your calendar"
    },
    {
      icon: <FiLink className="w-4 h-4 text-purple-500" />,
      title: "Browser Extensions",
      description: "Install extension"
    },
    {
      icon: <FiFileText className="w-4 h-4 text-green-500" />,
      title: "Share in Notes",
      description: "Save conversations"
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100 text-sm">
      <div className="flex-1 flex flex-col">
        {/* Header - Hidden on mobile */}
        <div className="bg-white border-b px-4 py-2 flex items-center justify-between sm:px-6 sm:py-3">
          <div className="flex items-center gap-2 sm:ml-60">
            <h1 className="text-lg font-bold text-black sm:text-xl">Orbita GPT</h1>
            <span className="text-xs text-gray-500 px-1.5 py-0.5 bg-gray-100 rounded-md">Plus</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="text-gray-600 hover:text-gray-800 p-1">
              <FiSettings className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="text-gray-600 hover:text-gray-800 p-1">
              <FiShare2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="hidden sm:flex items-center gap-1 text-xs sm:text-sm text-white bg-black px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg hover:bg-gray-800">
              <BsPlus className="w-4 h-4" />
              <span className="hidden sm:inline">New Chat</span>
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Primary Sidebar - Hidden on mobile */}
          <div className="hidden sm:flex w-12 sm:w-16 bg-white border-r p-2 sm:p-4">
            <div className="space-y-2 sm:space-y-4 w-full">
              {/* Blue Circle with Chat Icon */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center mb-4 sm:mb-6">
               
              </div>

              {/* Icon List */}
              <div className="space-y-1 sm:space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setActiveButton(item.label)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg transition-colors ${activeButton === item.label ? 'bg-black text-white' : 'text-black hover:bg-gray-100'}`}
                    title={item.label}
                  >
                    {item.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Secondary Sidebar - Collapsible on mobile */}
          <div className="hidden md:flex w-48 md:w-64 bg-white border-r p-3 sm:p-4">
            <div className="w-full">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">Chat</h2>
                <div className="flex items-center gap-1 sm:gap-2">
                  <button className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 text-black hover:bg-gray-100 rounded-lg">
                    <FiSearch className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
              
              <button className="flex items-center justify-center gap-1 text-xs sm:text-sm text-white bg-black px-2 py-1 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-2xl hover:bg-gray-800 w-full mb-3 sm:mb-4">
                <BsPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Novo Chat</span>
              </button>

              <div className="flex items-center gap-2 mt-6 sm:mt-10 px-1 sm:px-2">
                <FiStar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                <span className="text-xs text-gray-500">Saved</span>
              </div>
              
              {/* Chat Sections */}
              <div className="mt-3 sm:mt-4 space-y-4 sm:space-y-6">
                {chatSections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="space-y-1 sm:space-y-2">
                    <h3 className="text-xs text-gray-500 px-1 sm:px-2">{section.title}</h3>
                    {section.chats.map((chat, chatIndex) => (
                      <div key={chatIndex} className="flex items-center gap-2 p-1 sm:p-2 hover:bg-gray-50 rounded-sm cursor-pointer">
                        {!chat.textOnly && chat.icon}
                        <span className="text-xs text-gray-950 truncate">{chat.time}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            {/* Área de mensagens */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
                {messages.length <= 2 ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-6 sm:space-y-8">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    
                    </div>
                    <h1 className="text-xl font-bold flex text-black items-center gap-2 sm:text-2xl">
                      Hi, there! 👋
                    </h1>
                    <p className="text-sm text-gray-500 text-center max-w-xs sm:max-w-md sm:text-base">
                      Welcome to Orbita GPT. How can I assist you today?
                    </p>
                    
                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xs sm:max-w-2xl">
                      {featureCards.map((card, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-center gap-2 mb-1 sm:mb-2">
                            <div className="p-1 sm:p-2 rounded-full bg-gray-100">
                              {card.icon}
                            </div>
                            <h3 className="text-xs sm:text-sm font-medium">{card.title}</h3>
                          </div>
                          <p className="text-xs text-gray-500 sm:text-sm">{card.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[90%] sm:max-w-[80%] px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-sm sm:text-base ${
                          msg.sender === 'user'
                            ? 'bg-blue-500 text-white rounded-tr-none'
                            : 'bg-gray-100 text-gray-800 rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Campo de entrada de mensagens */}
            <div className="border-t border-gray-200 p-3 sm:p-4 bg-white">
              <div className="max-w-2xl mx-auto relative">
                <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <button className="text-gray-500 hover:text-gray-700 p-1 rounded-full">
                    <FiPaperclip className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700 p-1 rounded-full">
                    <FiMic className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700 p-1 rounded-full">
                    <FiSearch className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="w-full pl-3 pr-10 py-2 sm:pl-4 sm:pr-12 sm:py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-1 sm:p-2 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <FiSend className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;