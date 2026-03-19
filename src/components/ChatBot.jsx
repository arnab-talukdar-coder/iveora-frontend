import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, MessageCircle, ChevronDown, CheckCircle2, ArrowRight, XCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './ChatBot.css';

// ─── Constants & Data ────────────────────────────────────────────────────────
const MAIN_OPTIONS = [
  { label: '🚀 Get a Quote', value: 'QUOTE_START' },
  { label: '💼 Our Services', value: 'SERVICES' },
  { label: '📂 View Portfolio', value: 'PORTFOLIO' },
  { label: '📞 Contact Us', value: 'CONTACT' },
  { label: '❓ FAQ', value: 'FAQ' }
];

const SERVICES = [
  { label: 'Website Development', value: 'Website Development', desc: 'Custom, blazing-fast websites tailored to convert visitors into customers.' },
  { label: 'Mobile App Development', value: 'Mobile App Development', desc: 'High-performance natively rendered iOS & Android applications.' },
  { label: 'Cloud / AWS Services', value: 'Cloud / AWS Services', desc: 'Scalable, secure cloud infrastructure setup and DevOps pipelines.' },
  { label: 'UI/UX Design', value: 'UI/UX Design', desc: 'Intuitive, beautiful, and conversion-focused user interfaces.' },
  { label: 'Maintenance & Support', value: 'Maintenance & Support', desc: 'Reliable ongoing support, updates, and SLA-backed monitoring.' }
];

const PORTFOLIO_CARDS = [
  { title: 'E-Commerce Platform', desc: 'Modern shopping experience with Next.js & Stripe.', link: '#' },
  { title: 'SaaS Dashboard', desc: 'Analytics and user management portal.', link: '#' },
  { title: 'Mobile App', desc: 'Cross-platform app built with React Native.', link: '#' }
];

const FAQS = [
  { label: 'Pricing', value: 'Pricing', answer: 'Our projects start from ₹50,000 for standard websites. We provide detailed custom estimates based on your exact requirements.' },
  { label: 'Timeline', value: 'Timeline', answer: 'Typical websites take 2-4 weeks. Complex apps and platforms typically range from 2-4 months.' },
  { label: 'Tech Stack', value: 'Tech Stack', answer: 'We specialize in React, Next.js, Node.js, AWS, and cutting-edge tools.' },
  { label: 'Support after delivery', value: 'Support', answer: 'Yes! We provide 1-month free support and optional ongoing maintenance plans.' }
];

const BUDGET_OPTIONS = [
  { label: '₹10k–₹50k', value: '₹10k–₹50k' },
  { label: '₹50k–₹2L', value: '₹50k–₹2L' },
  { label: '₹2L+', value: '₹2L+' },
  { label: 'Not sure yet', value: 'Not sure yet' }
];

const CONTACT_METHODS = [
  { label: 'WhatsApp', value: 'WhatsApp' },
  { label: 'Email', value: 'Email' },
  { label: 'Call', value: 'Call' }
];


// ─── Main Component ───────────────────────────────────────────────────────────
const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // State Machine Variables
  const [inputMode, setInputMode] = useState('NONE'); // NONE, QUOTE_NAME, QUOTE_CONTACT, QUOTE_REQ
  const [leadData, setLeadData] = useState({});

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle Input Focus
  useEffect(() => {
    if (open && inputMode !== 'NONE') {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, inputMode, messages]);

  // Initial trigger after 5-7 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasTriggered && !open) {
        setHasTriggered(true);
        setShowTooltip(true);
        triggerWelcomeMessage();
      }
    }, 6000); // 6 seconds
    return () => clearTimeout(timer);
  }, [hasTriggered, open]);

  const pushMessage = useCallback((msg, delay = 0) => {
    if (delay > 0) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { ...msg, id: Date.now() + Math.random() }]);
      }, delay);
    } else {
      setMessages(prev => [...prev, { ...msg, id: Date.now() + Math.random() }]);
    }
  }, []);

  const triggerWelcomeMessage = useCallback(() => {
    pushMessage({
      role: 'bot',
      text: "Hey 👋 Welcome to Iveora.\nLooking to build a website, app, or scale your tech?",
      options: MAIN_OPTIONS
    }, 800);
  }, [pushMessage]);


  // Handler for all Option button clicks
  const handleOptionClick = (option, actionContext) => {
    // Add user's selection to chat
    pushMessage({ role: 'user', text: option.label });

    // Based on the context/value, determine next steps
    switch (actionContext) {
      case 'MAIN_MENU':
        if (option.value === 'QUOTE_START') {
          startQuoteFlow();
        } else if (option.value === 'SERVICES') {
          pushMessage({
            role: 'bot',
            text: 'What kind of service are you looking for?',
            options: SERVICES.map(s => ({ label: s.label, value: s.value }))
          }, 400);
        } else if (option.value === 'PORTFOLIO') {
          pushMessage({
            role: 'bot',
            text: "Here are some of our recent projects:",
            cards: PORTFOLIO_CARDS
          }, 600);
          setTimeout(() => promptMainMenu("Would you like to explore anything else?"), 1500);
        } else if (option.value === 'CONTACT') {
          pushMessage({
            role: 'bot',
            text: 'Talk to a human. Choose how you want to connect:',
            options: CONTACT_METHODS
          }, 400);
        } else if (option.value === 'FAQ') {
          pushMessage({
            role: 'bot',
            text: 'What do you want to know?',
            options: FAQS.map(f => ({ label: f.label, value: f.value }))
          }, 400);
        }
        break;

      case 'SERVICES':
        const srv = SERVICES.find(s => s.value === option.value);
        if (srv) {
          pushMessage({
            role: 'bot',
            text: `**${srv.label}**\n${srv.desc}`,
            options: [{ label: 'GET A QUOTE', value: 'QUOTE_START', primary: true }]
          }, 500);
        }
        break;

      case 'FAQ':
        const faq = FAQS.find(f => f.value === option.value);
        if (faq) {
          pushMessage({ role: 'bot', text: faq.answer }, 600);
          setTimeout(() => promptMainMenu("Anything else I can help with?"), 1800);
        }
        break;

      case 'CONTACT_METHOD':
        if (option.value === 'WhatsApp') {
          pushMessage({ role: 'bot', text: 'Opening WhatsApp... (or use link: wa.me/919903727500)' }, 400);
          window.open('https://wa.me/919903727500', '_blank'); // Mock link
        } else if (option.value === 'Email') {
          pushMessage({ role: 'bot', text: 'Drop us a line at office@iveora.com' }, 400);
          const subject = encodeURIComponent("Let's build something");
          const body = encodeURIComponent("Hi team, I'd like to discuss a project.");
          window.open(`mailto:office@iveora.com?subject=${subject}&body=${body}`, '_blank');
        } else if (option.value === 'Call') {
          pushMessage({ role: 'bot', text: 'Give us a call at +91 9903727500' }, 400);
        }
        setTimeout(() => promptMainMenu(""), 2000);
        break;

      case 'BUDGET':
        setLeadData(prev => {
          const finalData = { ...prev, budget: option.value };

          // SEND EMAIL VIA EMAILJS
          emailjs.send(
            'service_gg2azyv',     // 🔑 replace
            'template_9gkhr9u',    // 🔑 replace
            {
              name: finalData.name,
              email: finalData.contact,
              message: `Requirement: ${finalData.requirement}\nBudget: ${finalData.budget}`
            },
            '0UwwSPy0rY8mJM1p2'      // 🔑 replace
          )
            .then(() => console.log('Lead sent via ChatBot!'))
            .catch((error) => console.error('Failed to send lead:', error));

          return finalData;
        });

        pushMessage({
          role: 'bot',
          text: "Thanks! Our team will reach out within 24 hours. 🙌"
        }, 800);

        setInputMode('NONE');
        setTimeout(() => promptMainMenu("Let me know if you need anything else!"), 2000);
        break;

      default:
        // Handle standalone actions
        if (option.value === 'QUOTE_START') {
          startQuoteFlow();
        } else if (option.value === 'MAIN_MENU') {
          promptMainMenu("");
        }
        break;
    }
  };

  const startQuoteFlow = () => {
    setInputMode('QUOTE_NAME');
    pushMessage({ role: 'bot', text: "Awesome! Let's get started.\nWhat's your name?" }, 400);
  };

  const promptMainMenu = (introText) => {
    pushMessage({
      role: 'bot',
      text: introText || "Choose an option below:",
      options: MAIN_OPTIONS
    }, 400);
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    const txt = inputValue.trim();
    if (!txt) return;

    // Add user message to chat
    pushMessage({ role: 'user', text: txt });
    setInputValue('');

    // Process State Machine
    if (inputMode === 'QUOTE_NAME') {
      setLeadData(prev => ({ ...prev, name: txt }));
      setInputMode('QUOTE_CONTACT');
      pushMessage({ role: 'bot', text: `Nice to meet you, ${txt}! What's the best email or phone number to reach you?` }, 600);

    } else if (inputMode === 'QUOTE_CONTACT') {
      setLeadData(prev => ({ ...prev, contact: txt }));
      setInputMode('QUOTE_REQ');
      pushMessage({ role: 'bot', text: `Got it. Could you briefly describe your project requirement?` }, 600);

    } else if (inputMode === 'QUOTE_REQ') {
      setLeadData(prev => ({ ...prev, requirement: txt }));
      setInputMode('NONE');
      pushMessage({
        role: 'bot',
        text: `Great. One last optional question: What's your estimated budget range?`,
        options: BUDGET_OPTIONS
      }, 700);

    } else {
      // Fallback for random text input when not in a recognized input-flow
      pushMessage({
        role: 'bot',
        text: "I didn't quite get that 🤔\nChoose an option below or connect with our team.",
        options: MAIN_OPTIONS
      }, 500);
    }
  };

  const getOptionContext = (opt) => {
    if (MAIN_OPTIONS.some(m => m.value === opt.value)) return 'MAIN_MENU';
    if (SERVICES.some(s => s.value === opt.value)) return 'SERVICES';
    if (FAQS.some(f => f.value === opt.value)) return 'FAQ';
    if (BUDGET_OPTIONS.some(b => b.value === opt.value)) return 'BUDGET';
    if (CONTACT_METHODS.some(c => c.value === opt.value)) return 'CONTACT_METHOD';
    return 'UNKNOWN';
  };

  const isInputDisabled = inputMode === 'NONE';

  return (
    <>
      {/* Launcher UI */}
      <div className="chatbot-launcher-wrapper">
        <AnimatePresence>
          {showTooltip && !open && (
            <motion.div
              className="chatbot-tooltip"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              onClick={() => {
                setShowTooltip(false);
                if (!hasTriggered && !open) {
                  setHasTriggered(true);
                  triggerWelcomeMessage();
                }
                setOpen(true);
              }}
            >
              <div className="chatbot-tooltip-content">
                Hey! Need help? 👋
              </div>
              <button
                className="chatbot-tooltip-close"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
              >
                <X size={12} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          className={`chatbot-fab ${open ? 'open' : ''}`}
          onClick={() => {
            setShowTooltip(false);
            if (!hasTriggered && !open) {
              setHasTriggered(true);
              triggerWelcomeMessage();
            }
            setOpen(o => !o);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle Chat"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <ChevronDown size={28} strokeWidth={2.5} />
              </motion.span>
            ) : (
              <motion.span key="bot" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                <MessageCircle size={28} strokeWidth={2.5} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-logo">
                <Bot size={20} color="#fff" />
              </div>
              <div className="chatbot-header-text">
                <h3>Iveora Assistant</h3>
                <span className="status"><span className="dot"></span> Online</span>
              </div>
              <button className="chatbot-close-btn" onClick={() => setOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="chatbot-messages-container">
              {messages.map((msg) => (
                <div key={msg.id} className={`chatbot-message-row ${msg.role}`}>
                  {msg.role === 'bot' && (
                    <div className="avatar bot-avatar">
                      <Bot size={14} />
                    </div>
                  )}

                  <div className="message-content">
                    {msg.text && (
                      <div className={`chatbot-bubble ${msg.role}`}>
                        {/* Basic Markdown-like bold formatting */}
                        {msg.text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
                          part.startsWith('**') && part.endsWith('**')
                            ? <strong key={i}>{part.slice(2, -2)}</strong>
                            : <span key={i}>{part}</span>
                        )}
                      </div>
                    )}

                    {/* Options (Buttons) */}
                    {msg.options && msg.options.length > 0 && (
                      <div className="chatbot-options-container">
                        {msg.options.map((opt, i) => (
                          <button
                            key={i}
                            className={`chatbot-option-btn ${opt.primary ? 'primary' : ''}`}
                            onClick={() => handleOptionClick(opt, getOptionContext(opt))}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Portfolio Cards */}
                    {msg.cards && msg.cards.length > 0 && (
                      <div className="chatbot-cards-container">
                        {msg.cards.map((card, i) => (
                          <div key={i} className="chatbot-card">
                            <h4>{card.title}</h4>
                            <p>{card.desc}</p>
                            <a href={card.link} className="chatbot-card-link">
                              View Project <ArrowRight size={14} />
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="chatbot-message-row bot">
                  <div className="avatar bot-avatar"><Bot size={14} /></div>
                  <div className="chatbot-bubble bot typing">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form className="chatbot-input-container" onSubmit={handleTextSubmit}>
              <input
                ref={inputRef}
                className="chatbot-text-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  inputMode === 'QUOTE_NAME' ? "Type your name..." :
                    inputMode === 'QUOTE_CONTACT' ? "Email or phone..." :
                      inputMode === 'QUOTE_REQ' ? "Brief project req..." :
                        "Ask me anything..."
                }
              />
              <button
                type="submit"
                className="chatbot-send-btn"
                disabled={!inputValue.trim()}
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
