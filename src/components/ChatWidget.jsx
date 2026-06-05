// import React, { useState, useRef, useEffect } from 'react';
// import { MessageSquare, X, Send, Bot, User, LogOut } from 'lucide-react';
// import { sendMessageToN8n } from '../services/n8nService';

// function ChatWidget({ onLogout }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { id: 1, text: "How can I help you?", sender: 'bot', time: '11:35 AM' }
//   ]);
//   const [input, setInput] = useState('');
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = {
//       id: Date.now(),
//       text: input,
//       sender: 'user',
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     const currentInput = input;
//     setInput('');

//     try {
//       const data = await sendMessageToN8n(currentInput);
//       const botMessage = {
//         id: Date.now() + 1,
//         text: data.reply || data.message || data.response || 'No response from server.',
//         sender: 'bot',
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (err) {
//       const errorMessage = {
//         id: Date.now() + 1,
//         text: "Sorry, I'm currently unable to connect to the server.",
//         sender: 'bot',
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       };
//       setMessages((prev) => [...prev, errorMessage]);
//     }
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-50 font-sans text-slate-100">
      
//       {/* CHAT POPUP WINDOW */}
//       {isOpen && (
//         <div className="absolute bottom-16 right-0 w-80 sm:w-96 h-[320px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          
//           {/* Header */}
//           <div className="bg-blue-600 p-3.5 flex justify-between items-center shadow-md">
//             <div className="flex items-center gap-2">
//               <Bot size={18} className="text-cyan-300" />
//               <span className="font-bold text-xs tracking-wide text-white">AI Support Agent</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <button onClick={onLogout} className="text-white/80 hover:text-red-300 transition-colors" title="Logout">
//                 <LogOut size={14} />
//               </button>
//               <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
//                 <X size={16} />
//               </button>
//             </div>
//           </div>

//           {/* Bubbles */}
//           <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/60">
//             {messages.map((msg) => (
//               <div key={msg.id} className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
//                 <div className={`w-6 h-6 rounded-lg border flex items-center justify-center text-[10px] shrink-0 ${msg.sender === 'user' ? 'bg-blue-600 border-blue-500' : 'bg-slate-800 border-slate-700 text-cyan-400'}`}>
//                   {msg.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
//                 </div>
//                 <div>
//                   <div className={`p-2.5 rounded-xl text-xs ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'}`}>
//                     {msg.text}
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSend} className="p-2.5 bg-slate-900 border-t border-slate-800 flex gap-2">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Ask about products..."
//               className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
//             />
//             <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-xl">
//               <Send size={12} />
//             </button>
//           </form>
//         </div>
//       )}

//       {/* FLOATING BUTTON */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-14 h-14 rounded-full flex items-center justify-center text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/20"
//       >
//         {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
//       </button>

//     </div>
//   );
// }

// export default ChatWidget;
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, LogOut } from 'lucide-react';
import { sendMessageToN8n } from '../services/n8nService';

function ChatWidget({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "How can I help you?", sender: 'bot', time: '11:35 AM' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Helper function to format Markdown bold text to HTML
  const formatMarkdown = (text) => {
    if (!text) return '';
    return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');

    try {
      const data = await sendMessageToN8n(currentInput);
      const rawText = data.reply || data.message || data.response || 'No response from server.';
      
      const botMessage = {
        id: Date.now() + 1,
        text: formatMarkdown(rawText), // Applied formatting here
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm currently unable to connect to the server.",
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans text-slate-100">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 h-[320px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-blue-600 p-3.5 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <Bot size={18} className="text-cyan-300" />
              <span className="font-bold text-xs tracking-wide text-white">AI Support Agent</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={onLogout} className="text-white/80 hover:text-red-300 transition-colors" title="Logout">
                <LogOut size={14} />
              </button>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/60">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
                <div className={`w-6 h-6 rounded-lg border flex items-center justify-center text-[10px] shrink-0 ${msg.sender === 'user' ? 'bg-blue-600 border-blue-500' : 'bg-slate-800 border-slate-700 text-cyan-400'}`}>
                  {msg.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                </div>
                <div>
                  {/* Updated display logic with dangerouslySetInnerHTML */}
                  <div 
                    className={`p-2.5 rounded-xl text-xs ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'}`}
                    dangerouslySetInnerHTML={{ __html: msg.text }} 
                  />
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-2.5 bg-slate-900 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about products..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-xl">
              <Send size={12} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full flex items-center justify-center text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/20"
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
      </button>
    </div>
  );
}

export default ChatWidget;