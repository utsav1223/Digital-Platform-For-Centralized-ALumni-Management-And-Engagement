import React, { useState } from 'react';
import { 
  Heart, MessageSquare, Share2, MoreHorizontal, 
  Image as ImageIcon, Link as LinkIcon, Send, 
  Hash
} from 'lucide-react';

// --- MOCK DATA ---
const INITIAL_POSTS = [
  {
    id: 1,
    author: {
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      headline: "Product Designer at Stripe"
    },
    content: "Just finished a deep dive into the new CSS Anchor Positioning API. It's going to completely change how we build tooltips and popovers! 🚀\n\nHas anyone else tried it yet in production?",
    time: "2h ago",
    likes: 42,
    comments: 12,
    shares: 5,
    likedByMe: false,
    tags: ["#CSS", "#WebDev", "#DesignSystem"]
  },
  {
    id: 2,
    author: {
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      headline: "Frontend Lead @ Vercel"
    },
    content: "Unpopular opinion: You probably don't need that extra state management library. React Context + Hooks is often enough for 90% of apps. Keep it simple. 🛠️",
    time: "5h ago",
    likes: 128,
    comments: 45,
    shares: 18,
    likedByMe: true,
    tags: ["#React", "#JavaScript", "#Coding"]
  }
];

export default function CommunityFeed() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [isPosting, setIsPosting] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likedByMe: !post.likedByMe,
          likes: post.likedByMe ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost = {
      id: Date.now(),
      author: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150",
        headline: "Full Stack Developer"
      },
      content: newPostContent,
      time: "Just now",
      likes: 0,
      comments: 0,
      shares: 0,
      likedByMe: false,
      tags: []
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setIsPosting(false);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 py-8">
      {/* Container: Centered single column now */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        <div className="space-y-6">
          
          {/* Create Post Widget */}
          <div className={`bg-white rounded-xl border shadow-sm transition-all duration-300 overflow-hidden ${isPosting ? 'border-indigo-400 ring-4 ring-indigo-500/10 shadow-md' : 'border-slate-200'}`}>
            <div className="p-4 sm:p-5">
              <div className="flex gap-3 sm:gap-4">
                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150" alt="Current User" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-slate-100 shadow-sm flex-shrink-0" />
                <form className="flex-1" onSubmit={handlePostSubmit}>
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    onFocus={() => setIsPosting(true)}
                    placeholder="Share your thoughts, advice, or ask a question..."
                    className="w-full bg-transparent border-none p-2 text-slate-800 text-base focus:ring-0 resize-none min-h-[50px] transition-all placeholder:text-slate-400 placeholder:font-normal"
                    rows={isPosting ? 3 : 1}
                  />
                  <div className={`flex flex-col sm:flex-row sm:items-center justify-between mt-2 pt-2 border-t border-slate-50 transition-all duration-300 origin-top ${isPosting ? 'opacity-100 max-h-[200px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                    <div className="flex gap-1 mb-3 sm:mb-0">
                      <IconButton icon={<ImageIcon className="w-4 h-4" />} label="Media" />
                      <IconButton icon={<LinkIcon className="w-4 h-4" />} label="Link" />
                      <IconButton icon={<Hash className="w-4 h-4" />} label="Tags" />
                    </div>
                    <div className="flex items-center gap-3 justify-end">
                      <button type="button" onClick={() => { setIsPosting(false); setNewPostContent(""); }} className="text-sm font-medium text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
                      <button type="submit" disabled={!newPostContent.trim()} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-sm flex items-center gap-2">Post <Send className="w-3 h-3" /></button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Feed Stream */}
          <div className="space-y-4">
            {posts.map(post => (
              <PostCard key={post.id} post={post} onLike={() => handleLike(post.id)} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

// --- SUB COMPONENTS ---

const PostCard = ({ post, onLike }) => (
  <div className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-200 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover border border-slate-100 flex-shrink-0" />
          <div className="flex flex-col">
            <h3 className="font-bold text-slate-900 text-sm hover:text-indigo-600 cursor-pointer transition-colors leading-snug">{post.author.name}</h3>
            <p className="text-xs text-slate-500 leading-snug line-clamp-1">{post.author.headline}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
          <span className="text-xs text-slate-400 font-medium whitespace-nowrap">{post.time}</span>
          <button className="text-slate-300 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50"><MoreHorizontal className="w-4 h-4" /></button>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-slate-700 text-[15px] leading-relaxed whitespace-pre-line">{post.content}</p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full hover:bg-indigo-100 cursor-pointer transition-colors border border-indigo-100">{tag}</span>
            ))}
          </div>
        )}
      </div>
      <div className="h-px bg-slate-100 mb-3"></div>
      <div className="flex items-center justify-between sm:justify-start sm:gap-6">
        <ActionButton icon={<Heart className={`w-4 h-4 transition-transform duration-200 ${post.likedByMe ? 'fill-rose-500 text-rose-500 scale-110' : 'text-slate-400 group-hover:text-slate-600'}`} />} label={post.likes > 0 ? post.likes : "Like"} active={post.likedByMe} onClick={onLike} colorClass={post.likedByMe ? "text-rose-500" : "text-slate-500 group-hover:text-slate-600"} />
        <ActionButton icon={<MessageSquare className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />} label={post.comments > 0 ? post.comments : "Comment"} colorClass="text-slate-500 group-hover:text-indigo-500" />
        <ActionButton icon={<Share2 className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />} label="Share" colorClass="text-slate-500 group-hover:text-indigo-500" />
      </div>
    </div>
  </div>
);

const IconButton = ({ icon, label }) => (
  <button type="button" className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors tooltip" title={label}>{icon}</button>
);

const ActionButton = ({ icon, label, active, onClick, colorClass = "text-slate-500" }) => (
  <button onClick={onClick} className={`group flex items-center gap-1.5 sm:gap-2 py-1.5 px-2 sm:px-3 -ml-2 rounded-lg transition-all hover:bg-slate-50 active:scale-95 ${active ? 'bg-rose-50 hover:bg-rose-100' : ''}`}>{icon}<span className={`text-xs sm:text-sm font-medium transition-colors ${colorClass}`}>{label}</span></button>
);