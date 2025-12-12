// Messages.jsx
import React, { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical, Smile, Clock, Check, CheckCheck } from 'lucide-react';

const Messages = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [message, setMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Alumni Mentor',
      avatar: 'A',
      lastMessage: 'Hi there! How can I help you with your career?',
      time: '2h ago',
      unread: 2,
      messages: [
        { id: 1, text: 'Hi there! How can I help you with your career?', sent: false, time: '10:30 AM' },
        { id: 2, text: 'I was wondering about internship opportunities', sent: true, time: '10:32 AM' },
        { id: 3, text: 'I can definitely help with that! What field are you interested in?', sent: false, time: '10:33 AM' },
      ]
    },
    {
      id: 2,
      name: 'Career Services',
      avatar: 'C',
      lastMessage: 'Your resume review is scheduled for tomorrow',
      time: '1d ago',
      unread: 0,
    },
    {
      id: 3,
      name: 'Class Group',
      avatar: 'G',
      lastMessage: 'Anyone available for study session?',
      time: '2d ago',
      unread: 0,
    }
  ];

  const activeConversation = conversations.find(chat => chat.id === activeChat);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden h-[calc(100vh-8rem)] flex flex-col">
      <div className="border-b border-slate-200 p-4">
        <h2 className="text-xl font-bold text-slate-800">Messages</h2>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-80 border-r border-slate-200 flex flex-col">
          {/* Search */}
          <div className="p-3 border-b border-slate-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          {/* Conversations list */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`p-4 border-b border-slate-100 flex items-center cursor-pointer hover:bg-slate-50 ${
                  activeChat === chat.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium mr-3">
                  {chat.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-slate-800 truncate">{chat.name}</h3>
                    <span className="text-xs text-slate-400">{chat.time}</span>
                  </div>
                  <p className="text-sm text-slate-500 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <span className="ml-2 bg-blue-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat area */}
        <div className="hidden md:flex flex-col flex-1">
          {activeConversation ? (
            <>
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium mr-3">
                    {activeConversation.avatar}
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800">{activeConversation.name}</h3>
                    <p className="text-xs text-slate-500">Online</p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto bg-slate-50">
                <div className="space-y-4">
                  {activeConversation.messages?.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs md:max-w-md rounded-2xl px-4 py-2 ${
                          msg.sent
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-white border border-slate-200 rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <div className={`flex items-center justify-end mt-1 space-x-1 text-xs ${
                          msg.sent ? 'text-blue-200' : 'text-slate-400'
                        }`}>
                          <span>{msg.time}</span>
                          {msg.sent && (
                            <span>
                              {msg.read ? (
                                <CheckCheck className="w-3 h-3" />
                              ) : (
                                <Check className="w-3 h-3" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border-t border-slate-200">
                <div className="flex items-center space-x-2">
                  <button className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border border-slate-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100">
                    <Smile className="w-5 h-5" />
                  </button>
                  <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400">
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;