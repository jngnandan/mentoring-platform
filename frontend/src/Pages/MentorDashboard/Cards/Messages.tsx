import React, { useState } from 'react';
import { Card, Text, Avatar, Input, Button } from '@mantine/core';
import { Search, Send } from 'lucide-react';

const ChatInterface = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Ilario Baldocci', status: 'Proin risus. Praesent...' },
    { id: 2, name: 'Sher Bleackley', status: 'In blandit ultrices...' },
    { id: 3, name: 'Purcell Kelle', status: 'Etiam justo. Etiam...' },
    { id: 4, name: 'Laurens Shewen', status: 'Phasellus sit amet...' },
    { id: 5, name: 'Lefty Chalker', status: 'Aenean lectus....' },
  ]);

  const [chats, setChats] = useState({
    1: [
      { id: 1, sender: 'Ilario Baldocci', content: 'Hello there!', date: '1/18/2023' },
      { id: 2, sender: 'You', content: 'Hi Ilario, how are you?', date: '1/18/2023' },
    ],
    2: [
      { id: 1, sender: 'Sher Bleackley', content: 'Got a minute?', date: '2/20/2023' },
    ],
    3: [
      { id: 1, sender: 'You', content: 'Hey Purcell, any updates?', date: '3/5/2023' },
    ],
    4: [
      { id: 1, sender: 'Laurens Shewen', content: 'Meeting at 3 PM', date: '4/10/2023' },
      { id: 2, sender: 'You', content: 'Noted, thanks!', date: '4/10/2023' },
    ],
    5: [
      { id: 1, sender: 'You', content: 'Lefty, can you review this?', date: '5/1/2023' },
    ],
  });

  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [selectedMessages, setSelectedMessages] = useState([]);

  const handleContactSelect = (contactId) => {
    setCurrentChat(contactId);
    setSelectedMessages([]);
  };

  const handleMessageSelect = (id) => {
    setSelectedMessages(prev => 
      prev.includes(id) ? prev.filter(msgId => msgId !== id) : [...prev, id]
    );
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && currentChat) {
      const newMsg = {
        id: chats[currentChat].length + 1,
        sender: 'You',
        content: newMessage,
        date: new Date().toLocaleDateString(),
      };
      setChats(prev => ({
        ...prev,
        [currentChat]: [...prev[currentChat], newMsg],
      }));
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 my-12 border border-1 rounded-md">
      {/* Contacts sidebar */}
      <div className="w-1/4 bg-white p-4 border-r border-gray-200">
        <Input
          icon={<Search size={16} />}
          placeholder="search contacts"
          className="mb-4"
        />
        {contacts.map((contact) => (
          <div 
            key={contact.id} 
            className={`flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded ${currentChat === contact.id ? 'bg-blue-100' : ''}`}
            onClick={() => handleContactSelect(contact.id)}
          >
            <Avatar src={`/api/placeholder/32/32`} radius="xl" size="md" className="mr-3" />
            <div>
              <Text size="sm" weight={500}>{contact.name}</Text>
              <Text size="xs" color="gray">{contact.status}</Text>
            </div>
          </div>
        ))}
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        {currentChat && (
          <div className="bg-white p-4 border-b border-gray-200 flex items-center">
            <Avatar src={`/api/placeholder/40/40`} radius="xl" size="lg" className="mr-3" />
            <div>
              <Text size="lg" weight={500}>{contacts.find(c => c.id === currentChat)?.name}</Text>
              <Text size="sm" color="gray">Online</Text>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {currentChat && chats[currentChat].map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'} mb-4`}
              onClick={() => handleMessageSelect(message.id)}
            >
              <div 
                className={`max-w-xs ${message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200'} 
                  rounded-lg p-3 cursor-pointer ${selectedMessages.includes(message.id) ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
              >
                <Text size="sm">{message.content}</Text>
                {message.date && <Text size="xs" color="gray" className="mt-1">{message.date}</Text>}
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        {currentChat && (
          <div className="bg-white p-4 border-t border-gray-200 flex">
            <Input 
              className="flex-1 mr-2" 
              placeholder="Type a message..." 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button variant="filled" color="blue" onClick={handleSendMessage}>
              <Send size={16} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;