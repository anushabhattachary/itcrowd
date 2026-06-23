"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Paperclip, 
  Check, 
  X, 
  AlertCircle, 
  MessageSquare, 
  LifeBuoy, 
  Clock, 
  Layers, 
  Plus, 
  User, 
  File, 
  ArrowUpRight,
  TrendingUp,
  Image as ImageIcon,
  CheckCircle2,
  HelpCircle
} from "lucide-react";
import toast from "react-hot-toast";

interface Message {
  id: string;
  sender: "Client" | "ItCrowd" | "System";
  senderName: string;
  text: string;
  timestamp: string;
  attachment?: {
    name: string;
    type: "image" | "file";
    url: string;
  };
  approvalCard?: {
    id: string;
    assetTitle: string;
    status: "Pending" | "Approved" | "Revision Requested";
    notes?: string;
  };
}

interface Thread {
  id: string;
  title: string;
  subtitle: string;
  type: "campaign" | "support";
  unread: boolean;
  avatarInitials: string;
  messages: Message[];
}

export default function MessagingPage() {
  const [threads, setThreads] = useState<Thread[]>([
    {
      id: "t1",
      title: "Summer Sweat Challenge Campaign",
      subtitle: "Campaign Thread",
      type: "campaign",
      unread: true,
      avatarInitials: "SS",
      messages: [
        {
          id: "m1",
          sender: "ItCrowd",
          senderName: "Anusha (ItCrowd)",
          text: "Hi team! We've kicked off the Summer Sweat Challenge. Jordan is prepped for the first photoshoot. Let us know if you have any last-minute brand guidelines updates.",
          timestamp: "Jun 1, 10:15 AM"
        },
        {
          id: "m2",
          sender: "Client",
          senderName: "Glow Fitness (You)",
          text: "Thanks Anusha! We uploaded our updated typography guidelines to the Content Library. Excited for this!",
          timestamp: "Jun 1, 11:30 AM"
        },
        {
          id: "m3",
          sender: "ItCrowd",
          senderName: "Anusha (ItCrowd)",
          text: "Awesome. Zach just finished the rough draft for Jordan Carter's first Instagram Reel. I've sent it over in the card below for your review. Please review and let us know if we should approve or request revisions!",
          timestamp: "Today, 1:40 PM",
          approvalCard: {
            id: "ap-1",
            assetTitle: "Jordan Carter - Summer Sweat Workout Reel Draft",
            status: "Pending"
          }
        }
      ]
    },
    {
      id: "t2",
      title: "Midtown Studio Grand Opening",
      subtitle: "Campaign Thread",
      type: "campaign",
      unread: false,
      avatarInitials: "GO",
      messages: [
        {
          id: "m4",
          sender: "ItCrowd",
          senderName: "Anusha (ItCrowd)",
          text: "Hey! All photography and video deliverables have been marked complete for the Grand Opening. The final metrics report is live in the Reports tab.",
          timestamp: "May 28, 4:00 PM"
        },
        {
          id: "m5",
          sender: "Client",
          senderName: "Glow Fitness (You)",
          text: "Excellent work, the reach was fantastic! We're downloading the photos for our newsletter now.",
          timestamp: "May 28, 4:30 PM"
        }
      ]
    },
    {
      id: "t3",
      title: "General Billing & Inquiries",
      subtitle: "Support Thread",
      type: "support",
      unread: false,
      avatarInitials: "SP",
      messages: [
        {
          id: "m6",
          sender: "ItCrowd",
          senderName: "ItCrowd Support",
          text: "Hello! Welcome to the Glow Fitness support desk. Let us know if you need to add billing options, request invoice history, or ask general operations questions.",
          timestamp: "May 10, 9:00 AM"
        }
      ]
    }
  ]);

  const [activeThreadId, setActiveThreadId] = useState<string>("t1");
  const [typedMessage, setTypedMessage] = useState("");
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [ticketType, setTicketType] = useState<"campaign" | "support">("campaign");
  const [revisionNotesInput, setRevisionNotesInput] = useState<string>("");
  const [pendingRevisionId, setPendingRevisionId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  // Scroll to bottom of chat when messages change or thread changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeThreadId, threads]);

  const handleSendMessage = () => {
    if (typedMessage.trim() === "") return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: "Client",
      senderName: "Glow Fitness (You)",
      text: typedMessage,
      timestamp: "Just now"
    };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThreadId
          ? {
              ...t,
              messages: [...t.messages, newMessage]
            }
          : t
      )
    );
    setTypedMessage("");

    // Simulate auto-reply from ItCrowd after 2 seconds
    setTimeout(() => {
      const autoReply: Message = {
        id: `msg-reply-${Date.now()}`,
        sender: "ItCrowd",
        senderName: activeThread.type === "support" ? "Support Desk" : "Anusha (ItCrowd)",
        text: "Thanks for the message! Our team will review this and respond shortly.",
        timestamp: "Just now"
      };

      setThreads((prev) =>
        prev.map((t) =>
          t.id === activeThreadId
            ? {
                ...t,
                messages: [...t.messages, autoReply]
              }
            : t
        )
      );
    }, 2000);
  };

  const handleAttachMock = () => {
    const toastId = toast.loading("Uploading attachment...");
    setTimeout(() => {
      const newMsg: Message = {
        id: `msg-attach-${Date.now()}`,
        sender: "Client",
        senderName: "Glow Fitness (You)",
        text: "Sent an attachment: Midtown Gym Map.png",
        timestamp: "Just now",
        attachment: {
          name: "Midtown Gym Map.png",
          type: "image",
          url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
        }
      };
      setThreads((prev) =>
        prev.map((t) =>
          t.id === activeThreadId ? { ...t, messages: [...t.messages, newMsg] } : t
        )
      );
      toast.success("Attachment sent!", { id: toastId });
    }, 1500);
  };

  const handleApproveAsset = (cardId: string, sysId: string) => {
    const systemConfirm: Message = {
      id: sysId,
      sender: "System",
      senderName: "System Notification",
      text: "⚡️ You approved the asset Jordan Carter - Summer Sweat Workout Reel Draft for publication.",
      timestamp: "Just now"
    };

    setThreads((prev) =>
      prev.map((t) => {
        if (t.id !== activeThreadId) return t;
        return {
          ...t,
          messages: [
            ...t.messages.map((m) => {
              if (m.approvalCard?.id === cardId) {
                return {
                  ...m,
                  approvalCard: {
                    ...m.approvalCard,
                    status: "Approved" as const
                  }
                };
              }
              return m;
            }),
            systemConfirm
          ]
        };
      })
    );

    toast.success("Asset approved! Zach has been notified to publish the post.");
  };

  const handleRequestRevisionSubmit = () => {
    if (revisionNotesInput.trim() === "") {
      toast.error("Please enter revision notes");
      return;
    }

    const cardId = pendingRevisionId;

    setThreads((prev) =>
      prev.map((t) => {
        if (t.id !== activeThreadId) return t;
        return {
          ...t,
          messages: t.messages.map((m) => {
            if (m.approvalCard?.id === cardId) {
              return {
                ...m,
                approvalCard: {
                  ...m.approvalCard,
                  status: "Revision Requested",
                  notes: revisionNotesInput
                }
              };
            }
            return m;
          })
        };
      })
    );

    const feedbackMsg: Message = {
      id: `msg-feedback-${Date.now()}`,
      sender: "Client",
      senderName: "Glow Fitness (You)",
      text: `Revision requested. Feedback notes: "${revisionNotesInput}"`,
      timestamp: "Just now"
    };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThreadId ? { ...t, messages: [...t.messages, feedbackMsg] } : t
      )
    );

    setPendingRevisionId(null);
    setRevisionNotesInput("");
    toast.success("Revision request sent to creator.");
  };

  const handleCreateNewTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticketSubject.trim() === "" || ticketDescription.trim() === "") {
      toast.error("Please fill in all ticket details");
      return;
    }

    const newThread: Thread = {
      id: `t-new-${Date.now()}`,
      title: ticketSubject,
      subtitle: ticketType === "campaign" ? "New Campaign Request" : "General Support Inquiry",
      type: ticketType,
      unread: false,
      avatarInitials: ticketSubject.substring(0, 2).toUpperCase(),
      messages: [
        {
          id: `m-init-${Date.now()}`,
          sender: "Client",
          senderName: "Glow Fitness (You)",
          text: ticketDescription,
          timestamp: "Just now"
        },
        {
          id: `m-reply-${Date.now()}`,
          sender: "ItCrowd",
          senderName: "ItCrowd Support",
          text: "Hi! We've received your request and opened a ticket. A coordinator will follow up here shortly.",
          timestamp: "Just now"
        }
      ]
    };

    setThreads((prev) => [newThread, ...prev]);
    setActiveThreadId(newThread.id);
    setIsNewTicketOpen(false);
    setTicketSubject("");
    setTicketDescription("");
    toast.success("Ticket / thread created successfully!");
  };

  const markRead = (id: string) => {
    setActiveThreadId(id);
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, unread: false } : t))
    );
  };

  return (
<<<<<<< HEAD
    <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row bg-[#FFFFFF] border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative">
      
      {/* Left Panel: Threads list */}
      <div className="w-full md:w-[320px] bg-[#FBF6EF] border-r border-white/5 flex flex-col shrink-0">
        
        {/* List Header */}
        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#FFFFFF]">
=======
    <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row bg-[#1A1A27] border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative">
      
      {/* Left Panel: Threads list */}
      <div className="w-full md:w-[320px] bg-[#111118] border-r border-white/5 flex flex-col shrink-0">
        
        {/* List Header */}
        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#1A1A27]">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
          <span className="text-sm font-bold text-white font-[family-name:var(--font-syne)] flex items-center gap-1.5">
            <MessageSquare size={16} className="text-brand-purple-light" /> Messaging Inbox
          </span>
          <button 
            onClick={() => setIsNewTicketOpen(true)}
            className="p-2 bg-brand-purple hover:bg-brand-purple-light rounded-xl text-white transition-all hover:scale-105"
            title="Create ticket / thread"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Threads Loop */}
        <div className="flex-1 overflow-y-auto divide-y divide-white/5 p-2 space-y-1">
          {threads.map((t) => (
            <div
              key={t.id}
              onClick={() => markRead(t.id)}
              className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                activeThreadId === t.id 
                  ? "bg-brand-purple/15 border border-brand-purple/20 text-white" 
<<<<<<< HEAD
                  : "text-[#8A7F6E] hover:bg-white/5 hover:text-white border border-transparent"
=======
                  : "text-[#94A3B8] hover:bg-white/5 hover:text-white border border-transparent"
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
              }`}
            >
              {/* Thread Avatar initials */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple to-brand-purple-dark flex items-center justify-center text-xs font-extrabold text-white shrink-0 shadow-lg">
                {t.avatarInitials}
              </div>

              {/* Thread details */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold truncate block">{t.title}</span>
                  {t.unread && (
                    <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse shrink-0 mt-1" />
                  )}
                </div>
<<<<<<< HEAD
                <span className="text-[10px] text-[#6B5F4F] block mt-0.5 font-bold uppercase tracking-wider">{t.subtitle}</span>
                <p className="text-xs text-[#8A7F6E]/80 truncate mt-1">
=======
                <span className="text-[10px] text-[#475569] block mt-0.5 font-bold uppercase tracking-wider">{t.subtitle}</span>
                <p className="text-xs text-[#94A3B8]/80 truncate mt-1">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                  {t.messages[t.messages.length - 1]?.text}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Right Panel: Chat view */}
<<<<<<< HEAD
      <div className="flex-1 flex flex-col justify-between bg-[#F3EBE0]/80">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-white/5 bg-[#FBF6EF] flex justify-between items-center">
=======
      <div className="flex-1 flex flex-col justify-between bg-[#0D0D14]/80">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-white/5 bg-[#111118] flex justify-between items-center">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
          <div>
            <span className="text-sm font-bold text-white block">{activeThread.title}</span>
            <span className="text-[10px] text-brand-purple-light uppercase font-bold tracking-wider">{activeThread.subtitle}</span>
          </div>
          
          <div className="flex gap-2">
            <span className="text-[10px] px-3 py-1 bg-white/5 rounded-full border border-white/10 text-white font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-brand-lime rounded-full"></span> Support Coordinator Assigned
            </span>
          </div>
        </div>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeThread.messages.map((m) => {
            const isMe = m.sender === "Client";
            const isSys = m.sender === "System";

            if (isSys) {
              return (
                <div key={m.id} className="flex justify-center">
<<<<<<< HEAD
                  <div className="bg-[#FFFFFF] border border-white/5 text-xs text-brand-purple-light px-4 py-2 rounded-full font-medium shadow flex items-center gap-1.5">
=======
                  <div className="bg-[#1A1A27] border border-white/5 text-xs text-brand-purple-light px-4 py-2 rounded-full font-medium shadow flex items-center gap-1.5">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                    {m.text}
                  </div>
                </div>
              );
            }

            return (
              <div 
                key={m.id} 
                className={`flex gap-3 max-w-[80%] ${isMe ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                {/* User avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 ${
                  isMe ? "bg-brand-lime-dark" : "bg-brand-purple-dark"
                }`}>
                  {isMe ? "YOU" : "IC"}
                </div>

                <div className="space-y-1">
<<<<<<< HEAD
                  <span className={`text-[10px] text-[#6B5F4F] block font-bold uppercase tracking-wider ${isMe ? "text-right" : ""}`}>
=======
                  <span className={`text-[10px] text-[#475569] block font-bold uppercase tracking-wider ${isMe ? "text-right" : ""}`}>
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                    {m.senderName} · {m.timestamp}
                  </span>
                  
                  {/* Text bubble */}
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed border ${
                    isMe 
                      ? "bg-brand-purple/10 border-brand-purple/20 text-[#EDEDED] rounded-tr-none" 
<<<<<<< HEAD
                      : "bg-[#FFFFFF] border-white/5 text-[#EDEDED] rounded-tl-none"
=======
                      : "bg-[#1A1A27] border-white/5 text-[#EDEDED] rounded-tl-none"
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                  }`}>
                    {m.text}

                    {/* Attachment preview if exists */}
                    {m.attachment && (
<<<<<<< HEAD
                      <div className="mt-3 bg-[#F3EBE0] border border-white/10 rounded-xl overflow-hidden p-2 flex gap-3 items-center max-w-sm">
                        <ImageIcon size={32} className="text-brand-purple-light shrink-0" />
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-white block truncate">{m.attachment.name}</span>
                          <span className="text-[10px] text-[#6B5F4F] block uppercase tracking-wider">Preview Sent</span>
=======
                      <div className="mt-3 bg-[#0D0D14] border border-white/10 rounded-xl overflow-hidden p-2 flex gap-3 items-center max-w-sm">
                        <ImageIcon size={32} className="text-brand-purple-light shrink-0" />
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-white block truncate">{m.attachment.name}</span>
                          <span className="text-[10px] text-[#475569] block uppercase tracking-wider">Preview Sent</span>
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Interactive Approval Card */}
                  {m.approvalCard && (
<<<<<<< HEAD
                    <div className="mt-3 bg-gradient-to-r from-[#FFFFFF] to-[#FBF6EF] border border-brand-purple/20 rounded-2xl p-5 shadow-lg max-w-md space-y-4">
=======
                    <div className="mt-3 bg-gradient-to-r from-[#1A1A27] to-[#111118] border border-brand-purple/20 rounded-2xl p-5 shadow-lg max-w-md space-y-4">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                      <div className="flex items-start gap-2">
                        <AlertCircle className="text-brand-purple-light shrink-0 mt-0.5" size={16} />
                        <div>
                          <span className="text-xs font-bold text-white block">Approval Needed: Creator Asset Draft</span>
<<<<<<< HEAD
                          <p className="text-xs text-[#8A7F6E] mt-1">{m.approvalCard.assetTitle}</p>
=======
                          <p className="text-xs text-[#94A3B8] mt-1">{m.approvalCard.assetTitle}</p>
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/5 flex flex-col gap-2">
                        {m.approvalCard.status === "Pending" ? (
                          <div className="flex gap-2">
                            <button 
                               onClick={() => {
                                 const sysId = `sys-${Date.now()}`;
                                 handleApproveAsset(m.approvalCard!.id, sysId);
                               }}
                               className="flex-1 flex items-center justify-center gap-1.5 bg-brand-lime text-black hover:bg-brand-lime-dark font-bold text-xs py-2.5 px-3 rounded-xl transition-all hover:scale-[1.02]"
                             >
                               <Check size={14} /> Approve Asset
                             </button>
                            <button 
                              onClick={() => setPendingRevisionId(m.approvalCard!.id)}
                              className="flex-1 flex items-center justify-center gap-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-xs py-2.5 px-3 rounded-xl transition-all"
                            >
                              <X size={14} /> Request Revision
                            </button>
                          </div>
                        ) : m.approvalCard.status === "Approved" ? (
                          <div className="flex items-center gap-1.5 text-xs text-brand-lime font-semibold py-2">
                            <CheckCircle2 size={16} /> Approved & queued for publish
                          </div>
                        ) : (
                          <div className="space-y-1 pt-1">
                            <div className="text-xs text-yellow-400 font-semibold flex items-center gap-1.5">
                              <Clock size={14} /> Revision requested
                            </div>
<<<<<<< HEAD
                            <p className="text-xs text-[#8A7F6E] italic bg-[#F3EBE0] p-2 rounded-lg border border-white/5 mt-1">
=======
                            <p className="text-xs text-[#94A3B8] italic bg-[#0D0D14] p-2 rounded-lg border border-white/5 mt-1">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                              &quot;{m.approvalCard.notes}&quot;
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Revision Input Overlay (Modal-like) */}
        {pendingRevisionId && (
<<<<<<< HEAD
          <div className="bg-[#FBF6EF] border-t border-white/10 p-4 space-y-3">
=======
          <div className="bg-[#111118] border-t border-white/10 p-4 space-y-3">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">Describe Revision Requests</span>
              <button 
                onClick={() => setPendingRevisionId(null)}
<<<<<<< HEAD
                className="text-[#6B5F4F] hover:text-white"
=======
                className="text-[#475569] hover:text-white"
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
              >
                <X size={16} />
              </button>
            </div>
            <textarea
              value={revisionNotesInput}
              onChange={(e) => setRevisionNotesInput(e.target.value)}
              placeholder="e.g. Please change the caption CTA link, and shorten the workout clip by 3 seconds..."
              rows={2}
<<<<<<< HEAD
              className="w-full bg-[#F3EBE0] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-[#6B5F4F] focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
=======
              className="w-full bg-[#0D0D14] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-[#475569] focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
            />
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setPendingRevisionId(null)}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button 
                onClick={handleRequestRevisionSubmit}
                className="px-4 py-1.5 bg-brand-purple hover:bg-brand-purple-light rounded-lg text-xs font-semibold text-white"
              >
                Submit Request
              </button>
            </div>
          </div>
        )}

        {/* Chat Input Bar */}
<<<<<<< HEAD
        <div className="p-4 border-t border-white/5 bg-[#FBF6EF] flex items-center gap-3">
          <button 
            onClick={handleAttachMock}
            className="p-2.5 bg-white/5 border border-white/5 text-[#8A7F6E] hover:text-white rounded-xl hover:bg-white/10 transition-colors"
=======
        <div className="p-4 border-t border-white/5 bg-[#111118] flex items-center gap-3">
          <button 
            onClick={handleAttachMock}
            className="p-2.5 bg-white/5 border border-white/5 text-[#94A3B8] hover:text-white rounded-xl hover:bg-white/10 transition-colors"
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
            title="Attach a file"
          >
            <Paperclip size={18} />
          </button>
          
          <input
            type="text"
            placeholder="Type a message, ask support, or paste details..."
            value={typedMessage}
            onChange={(e) => setTypedMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
<<<<<<< HEAD
            className="flex-1 bg-[#F3EBE0] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#6B5F4F] focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
=======
            className="flex-1 bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#475569] focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
          />

          <button 
            onClick={handleSendMessage}
            className="p-2.5 bg-brand-purple text-white rounded-xl hover:bg-brand-purple-light transition-all btn-glow shadow-md"
          >
            <Send size={18} />
          </button>
        </div>

      </div>

      {/* Support Ticket Modal / Dialog */}
      {isNewTicketOpen && (
        <div className="fixed inset-0 z-[250] bg-black/70 backdrop-blur-sm flex justify-center items-center p-6 animate-in fade-in duration-200">
<<<<<<< HEAD
          <div className="w-full max-w-md bg-[#FFFFFF] border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-6">
=======
          <div className="w-full max-w-md bg-[#1A1A27] border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-6">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-syne)] flex items-center gap-1.5">
                <HelpCircle className="text-brand-purple-light" size={18} /> Open Support Ticket
              </h3>
<<<<<<< HEAD
              <button onClick={() => setIsNewTicketOpen(false)} className="text-[#6B5F4F] hover:text-white">
=======
              <button onClick={() => setIsNewTicketOpen(false)} className="text-[#475569] hover:text-white">
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateNewTicket} className="space-y-4">
              <div className="space-y-1">
<<<<<<< HEAD
                <label className="text-xs font-bold text-[#8A7F6E] uppercase tracking-wider">Subject / Campaign Title *</label>
=======
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Subject / Campaign Title *</label>
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                <input
                  required
                  type="text"
                  placeholder="e.g. Autumn photoshoot scheduling issues"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
<<<<<<< HEAD
                  className="w-full bg-[#F3EBE0] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#6B5F4F] focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
=======
                  className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#475569] focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                />
              </div>

              <div className="space-y-1">
<<<<<<< HEAD
                <label className="text-xs font-bold text-[#8A7F6E] uppercase tracking-wider">Topic Category *</label>
                <select 
                  value={ticketType}
                  onChange={(e) => setTicketType(e.target.value as "campaign" | "support")}
                  className="w-full bg-[#F3EBE0] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white cursor-pointer focus:outline-none focus:border-brand-purple"
=======
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Topic Category *</label>
                <select 
                  value={ticketType}
                  onChange={(e) => setTicketType(e.target.value as "campaign" | "support")}
                  className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white cursor-pointer focus:outline-none focus:border-brand-purple"
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                >
                  <option value="campaign">New Campaign Request</option>
                  <option value="support">General Support / Billing Help</option>
                </select>
              </div>

              <div className="space-y-1">
<<<<<<< HEAD
                <label className="text-xs font-bold text-[#8A7F6E] uppercase tracking-wider">Description of Request *</label>
=======
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Description of Request *</label>
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                <textarea
                  required
                  rows={4}
                  placeholder="Please describe what you need help with. A representative will get back to you directly in this thread."
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
<<<<<<< HEAD
                  className="w-full bg-[#F3EBE0] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-[#6B5F4F] focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
=======
                  className="w-full bg-[#0D0D14] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-[#475569] focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
>>>>>>> 912562a6778607aa6923283aa91c00a69a41cb32
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsNewTicketOpen(false)}
                  className="flex-1 py-2.5 border border-white/10 hover:bg-white/5 rounded-xl font-semibold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-brand-purple hover:bg-brand-purple-light text-white rounded-xl font-bold text-xs btn-glow"
                >
                  Open Thread
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
