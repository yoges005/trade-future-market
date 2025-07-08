import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Phone, Video, MoreVertical, Star, MapPin, DollarSign } from "lucide-react";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  sender: 'buyer' | 'seller' | 'system';
  message: string;
  timestamp: string;
  type: 'text' | 'offer' | 'system';
  offerAmount?: number;
}

const ChatModal = ({ isOpen, onClose }: ChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'system',
      message: 'Chat started with TechEnthusiast92',
      timestamp: '10:30 AM',
      type: 'system'
    },
    {
      id: 2,
      sender: 'seller',
      message: 'Hi! Thanks for your interest in the iPhone 14 Pro Max. It\'s in excellent condition with all original accessories.',
      timestamp: '10:31 AM',
      type: 'text'
    },
    {
      id: 3,
      sender: 'buyer',
      message: 'Great! Can you tell me more about the battery health?',
      timestamp: '10:32 AM',
      type: 'text'
    },
    {
      id: 4,
      sender: 'seller',
      message: 'Battery health is at 94%. I can send you screenshots if you\'d like.',
      timestamp: '10:33 AM',
      type: 'text'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [offerAmount, setOfferAmount] = useState('');
  const [showOfferInput, setShowOfferInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: 'buyer',
        message: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Simulate seller response
      setTimeout(() => {
        const response: Message = {
          id: messages.length + 2,
          sender: 'seller',
          message: 'Thanks for your message! Let me get back to you on that.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'text'
        };
        setMessages(prev => [...prev, response]);
      }, 1500);
    }
  };

  const sendOffer = () => {
    if (offerAmount.trim()) {
      const offer: Message = {
        id: messages.length + 1,
        sender: 'buyer',
        message: `Made an offer of $${offerAmount}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'offer',
        offerAmount: parseFloat(offerAmount)
      };
      setMessages([...messages, offer]);
      setOfferAmount('');
      setShowOfferInput(false);
      
      // Simulate seller response
      setTimeout(() => {
        const response: Message = {
          id: messages.length + 2,
          sender: 'seller',
          message: 'I\'ll consider your offer and get back to you soon!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'text'
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col backdrop-blur-sm bg-white/95 border-white/20">
        {/* Chat Header */}
        <DialogHeader className="border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                T
              </div>
              <div>
                <DialogTitle className="text-lg">TechEnthusiast92</DialogTitle>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>4.8</span>
                  <Badge variant="secondary" className="text-xs">
                    Verified
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline">
                <Phone className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Video className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Product Summary */}
          <div className="bg-gray-50 rounded-lg p-3 mt-3">
            <div className="flex items-center space-x-3">
              <img
                src="/placeholder.svg"
                alt="iPhone 14 Pro Max"
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-medium">iPhone 14 Pro Max</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span className="font-semibold text-green-600">$899</span>
                  <span>•</span>
                  <MapPin className="w-3 h-3" />
                  <span>2.3 km away</span>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {messages.map((message) => (
            <div key={message.id}>
              {message.type === 'system' ? (
                <div className="text-center">
                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {message.message}
                  </span>
                </div>
              ) : (
                <div className={`flex ${message.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${
                    message.sender === 'buyer'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  } rounded-2xl px-4 py-2`}>
                    {message.type === 'offer' ? (
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <DollarSign className="w-4 h-4" />
                          <span className="font-semibold">Offer Made</span>
                        </div>
                        <div className="text-lg font-bold">${message.offerAmount}</div>
                      </div>
                    ) : (
                      <p>{message.message}</p>
                    )}
                    <div className={`text-xs mt-1 ${
                      message.sender === 'buyer' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="border-t border-gray-200 pt-3">
          <div className="flex gap-2 mb-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowOfferInput(!showOfferInput)}
              className="text-xs"
            >
              <DollarSign className="w-3 h-3 mr-1" />
              Make Offer
            </Button>
            <Button size="sm" variant="outline" className="text-xs">
              <MapPin className="w-3 h-3 mr-1" />
              Meet Up
            </Button>
            <Button size="sm" variant="outline" className="text-xs">
              Ask Question
            </Button>
          </div>
          
          {/* Offer Input */}
          {showOfferInput && (
            <div className="flex gap-2 mb-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="Enter offer amount"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  className="text-center font-semibold"
                />
              </div>
              <Button onClick={sendOffer} size="sm">
                Send Offer
              </Button>
            </div>
          )}
          
          {/* Message Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={sendMessage} size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
