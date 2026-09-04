import React from 'react';
import { usePR } from '../../context/PRContext';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Bookmark,
  CheckCircle2,
  Quote,
  Sparkles
} from 'lucide-react';

export const BlogPostDetailPage: React.FC = () => {
  const { selectedBlogPostSlug, blogPosts = [], navigateTo, showToast } = usePR();

  const safePosts = blogPosts || [];
  const post = safePosts.find(
    (b) => b.slug === selectedBlogPostSlug || b.id === selectedBlogPostSlug
  ) || safePosts[0];

  if (!post) {
    return (
      <div className="min-h-screen bg-[#05070A] text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-white/50">Article not found.</p>
          <button
            onClick={() => navigateTo('insights')}
            className="px-4 py-2 bg-blue-600 rounded-sm text-xs font-bold uppercase tracking-wider"
          >
            Back to Insights
          </button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article Link Copied', 'Shareable link copied to clipboard.');
    }
  };

  return (
    <div id="blog-post-detail-page" className="min-h-screen bg-[#F8FAFC] text-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Navigation */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-6">
          <button
            onClick={() => navigateTo('insights')}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Insights</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-white border border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Essay</span>
          </button>
        </div>

        {/* Article Header */}
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-sm bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-slate-500 flex items-center gap-1 text-[11px]">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 flex items-center gap-1 text-[11px]">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-[#07132B] leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-slate-600 font-light leading-relaxed">
            {post.summary}
          </p>

          {/* Author Byline */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-sm object-cover border border-slate-200"
            />
            <div>
              <div className="text-sm font-medium text-slate-900">{post.author.name}</div>
              <div className="text-xs text-slate-500 font-light">{post.author.title}</div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="rounded-sm overflow-hidden border border-slate-200 shadow-md">
          <img
            src={post.heroImage}
            alt={post.title}
            referrerPolicy="no-referrer"
            className="w-full h-80 sm:h-96 object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="bg-white border border-slate-200 rounded-sm p-6 sm:p-10 space-y-6 shadow-sm">
          <div className="max-w-none text-slate-800 text-base leading-relaxed space-y-6 font-serif font-light">
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl font-medium font-sans text-[#07132B] pt-4 pb-1">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              return (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Article Footer & Author Bio (Dark Blue Component) */}
          <div className="pt-8 border-t border-slate-100 bg-[#07132B] text-white p-6 rounded-sm border border-blue-900/40 flex flex-col sm:flex-row items-center gap-6 shadow-md">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-sm object-cover border border-blue-500/50 flex-shrink-0"
            />
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">Written by</div>
              <div className="text-base font-medium text-white">{post.author.name}</div>
              <div className="text-xs text-white/70 font-light leading-relaxed">
                Senior Partner leading strategic messaging and tier-1 media relations at Apex & Vantage PR. Advises Fortune 500 boards and tech founders on high-stakes communications.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
