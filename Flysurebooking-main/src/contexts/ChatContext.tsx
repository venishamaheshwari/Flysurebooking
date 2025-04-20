import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (text: string) => void;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hi there! I\'m your AI travel assistant. How can I help you today?', isUser: false }
  ]);

  const responses = {
    'hello': 'Hello! How can I assist with your travel plans today?',
    'hi': 'Hi there! Looking to book a flight or need travel information?',
    'help': 'I can help you find flights, provide travel recommendations, answer questions about booking policies, or assist with planning activities during layovers.',
    'best time to book': 'Generally, booking 2-3 months ahead for domestic flights and 3-6 months for international flights offers the best rates. Tuesday and Wednesday are often the cheapest days to book!',
    'flight cancellation policy': 'Most airlines allow free cancellation within 24 hours of booking. After that, policies vary by airline and fare type. Economy tickets typically have cancellation fees, while premium fares offer more flexibility.',
    'cheap flight': 'I recommend setting up price alerts, being flexible with your travel dates, and booking about 2-3 months in advance. Midweek flights (Tuesday, Wednesday) are often cheaper than weekend flights!',
    'layover': 'For layovers over 5 hours, you can often explore the city! I can recommend attractions, restaurants, and activities near your connection airport that fit your available time.',
    'baggage': 'Baggage allowances vary by airline and fare class. Generally, most airlines allow one carry-on (usually 7-10kg) and one personal item for free. Checked baggage policies and fees vary widely.',
    'visa': 'Visa requirements depend on your nationality and destination. I recommend checking the official embassy website of your destination country at least 3 months before travel.',
    'travel insurance': 'Travel insurance typically costs 4-10% of your trip cost. I recommend getting coverage for trip cancellation, medical emergencies, and lost luggage at minimum.',
    'weather': 'It\'s best to check the forecast closer to your travel date. Would you like me to remind you about this a week before your trip?',
    'currency': 'You can change your preferred currency by clicking the globe icon in the navigation bar. We support USD, EUR, GBP, JPY, CAD, AUD, INR, and SGD.'
  };

  const findResponse = (userMessage: string): string => {
    const normalizedInput = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
      if (normalizedInput.includes(key.toLowerCase())) {
        return response;
      }
    }
    
    // Default response
    return "I'm not sure I understand. Could you rephrase your question? I can help with finding flights, travel recommendations, or answer questions about booking policies.";
  };

  const sendMessage = (text: string) => {
    // Add user message
    setMessages(prev => [...prev, { text, isUser: true }]);
    
    // Simulate AI thinking
    setTimeout(() => {
      const response = findResponse(text);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 1000);
  };

  const clearChat = () => {
    setMessages([
      { text: 'Hi there! I\'m your AI travel assistant. How can I help you today?', isUser: false }
    ]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};