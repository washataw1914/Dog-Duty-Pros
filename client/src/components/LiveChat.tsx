import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, X, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Message = {
  from: string;
  message: string;
  timestamp: string;
};

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [isSupportTyping, setIsSupportTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<number | null>(null);
  const { toast } = useToast();

  // Initialize WebSocket connection
  useEffect(() => {
    if (isOpen && !connected) {
      // Determine WebSocket protocol based on window location
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws`;
      
      // Create WebSocket
      const newSocket = new WebSocket(wsUrl);
      
      // Connection opened
      newSocket.addEventListener('open', () => {
        setConnected(true);
        console.log('Connected to chat server');
      });
      
      // Listen for messages
      newSocket.addEventListener('message', (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Message from server:', data);
          
          switch (data.type) {
            case 'connected':
              // Save client ID
              setClientId(data.clientId);
              // Add welcome message
              setMessages(prev => [...prev, {
                from: 'support',
                message: data.message,
                timestamp: new Date().toISOString()
              }]);
              break;
              
            case 'chat':
              // Add chat message
              setMessages(prev => [...prev, {
                from: data.from,
                message: data.message,
                timestamp: data.timestamp
              }]);
              // Clear typing indicator when message received
              if (data.from === 'support') {
                setIsSupportTyping(false);
              }
              break;
              
            case 'typing':
              // Show typing indicator for support
              if (data.from === 'support') {
                setIsSupportTyping(true);
                // Auto clear typing indicator after 3 seconds of no new typing events
                if (typingTimeoutRef.current) {
                  clearTimeout(typingTimeoutRef.current);
                }
                typingTimeoutRef.current = window.setTimeout(() => {
                  setIsSupportTyping(false);
                }, 3000);
              }
              break;
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      });
      
      // Handle errors
      newSocket.addEventListener('error', (event) => {
        console.error('WebSocket error:', event);
        toast({
          title: 'Connection Error',
          description: 'There was a problem connecting to chat support.',
          variant: 'destructive'
        });
      });
      
      // Handle connection close
      newSocket.addEventListener('close', () => {
        console.log('Disconnected from chat server');
        setConnected(false);
        if (isOpen) {
          toast({
            title: 'Disconnected',
            description: 'Chat support disconnected. Please refresh to reconnect.',
            variant: 'destructive'
          });
        }
      });
      
      // Save socket reference
      setSocket(newSocket);
      
      // Clean up on unmount
      return () => {
        if (newSocket.readyState === WebSocket.OPEN) {
          newSocket.close();
        }
      };
    }
  }, [isOpen, connected, toast]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Send message
  const sendMessage = () => {
    if (!socket || socket.readyState !== WebSocket.OPEN || !message.trim()) {
      return;
    }
    
    // Send message
    socket.send(JSON.stringify({
      type: 'chat',
      message: message.trim()
    }));
    
    // Clear input
    setMessage('');
  };
  
  // Handle typing indicator
  const handleTyping = () => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      return;
    }
    
    // Send typing indicator
    socket.send(JSON.stringify({
      type: 'typing'
    }));
  };
  
  // Close chat
  const handleClose = () => {
    setIsOpen(false);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
    }
    setConnected(false);
    setMessages([]);
  };
  
  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  
  // Format timestamp for display
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button 
          className="rounded-full h-16 w-16 shadow-lg bg-primary hover:bg-primary/90"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      ) : (
        <Card className="w-80 sm:w-96 shadow-lg">
          <CardHeader className="bg-primary text-white py-2 px-4 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bubble">Live Support</CardTitle>
            <Button variant="ghost" size="icon" onClick={handleClose} className="text-white hover:bg-primary/90">
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3 ${
                    msg.from === 'you' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block max-w-[80%] px-4 py-2 rounded-lg ${
                      msg.from === 'you'
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              ))}
              
              {isSupportTyping && (
                <div className="text-left mb-3">
                  <div className="inline-block bg-gray-200 px-4 py-2 rounded-lg">
                    <p className="text-sm">Typing...</p>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          
          <CardFooter className="p-2 border-t">
            <div className="flex w-full gap-2 items-center">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyUp={handleTyping}
                onKeyPress={handleKeyPress}
                disabled={!connected}
                className="flex-1"
              />
              <Button 
                size="icon"
                onClick={sendMessage}
                disabled={!connected || !message.trim()}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}