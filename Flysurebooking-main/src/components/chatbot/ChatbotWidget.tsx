import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Plane, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatContext } from '../../contexts/ChatContext';

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage } = useChatContext();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary-light text-white rounded-full p-4 shadow-lg transition-all duration-300"
        aria-label="Open chat assistant"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-full max-w-sm z-40 rounded-xl shadow-xl border border-gray-200 overflow-hidden bg-white"
          >
            {/* Chat Header */}
            <div className="bg-primary p-4 text-white">
              <div className="flex items-center space-x-3">
                <Plane size={24} />
                <div>
                  <h3 className="font-bold">FlySmart Assistant</h3>
                  <p className="text-xs text-white/80">Ask me anything about your trip!</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} chat-message`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.isUser
                          ? 'bg-primary text-white rounded-tr-none'
                          : 'bg-white shadow-sm rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Quick Suggestions */}
            <div className="p-2 border-t border-gray-200 bg-white">
              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                <button 
                  onClick={() => sendMessage("What's the best time to book?")}
                  className="whitespace-nowrap text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full"
                >
                  Best time to book?
                </button>
                <button 
                  onClick={() => sendMessage("Flight cancellation policy?")}
                  className="whitespace-nowrap text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full"
                >
                  Cancellation policy
                </button>
                <button 
                  onClick={() => sendMessage("Help me find a cheap flight to London")}
                  className="whitespace-nowrap text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full"
                >
                  Find cheap flights
                </button>
              </div>
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className={`p-2 rounded-full ${
                    inputMessage.trim()
                      ? 'bg-primary text-white hover:bg-primary-light'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;