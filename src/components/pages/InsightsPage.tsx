import React, { useState } from 'react';
import { usePR } from '../../context/PRContext';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Share2,
  Sparkles
} from 'lucide-react';
import { MediaMentionFeed } from '../common/MediaMentionFeed';

export const InsightsPage: React.FC = () => {
  const { blogPosts = [], navigateTo } = usePR();
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = [
    'ALL',
    'Crisis Communications',
    'Media Relations & Pitching',
    'Deeptech & Science PR',
    'Executive Positioning'
  ];

  const safePosts = blogPosts || [];
  const filteredPosts =
    selectedCategory === 'ALL'
      ? safePosts
      : safePosts.filter((p) => (p.category || '').toLowerCase().includes(selectedCategory.toLowerCase()));

  const featuredPost = safePosts[0];

  return (
    <div id="insights-page" className="min-h-screen bg-[#F8FAFC] text-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-blue-600 font-bold tracking-widest text-xs uppercase">
            <span className="w-8 h-[2px] bg-blue-600"></span>
            <span>Vantage Point Journal</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-[#07132B] leading-tight">
            Strategic PR Intelligence & <br />
            <span className="italic font-serif text-blue-600 font-normal">Executive Commentary</span>
          </h1>
          <p className="text-slate-600 text-base leading-relaxed font-light">
            Analytical essays on media dynamics, crisis playbooks, tier-1 newsroom economics, and narrative design authored by our senior strategists.
          </p>
        </div>

        {/* Featured Essay Card */}
        {featuredPost && (
          <div
            onClick={() => navigateTo('blog-post', featuredPost.slug || featuredPost.id)}
            className="bg-white border border-slate-200 hover:border-blue-500 rounded-sm overflow-hidden cursor-pointer group grid grid-cols-1 lg:grid-cols-12 gap-6 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-full overflow-hidden">
              <img
                src={featuredPost.heroImage}
                alt={featuredPost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-[#07132B]/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm border border-blue-900/40 shadow-sm">
                Lead Strategic Essay
              </div>
            </div>

            <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="text-blue-600 font-bold uppercase tracking-wider">{featuredPost.category}</span>
                  <span>•</span>
                  <span>{featuredPost.date}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-medium text-[#07132B] group-hover:text-blue-600 transition-colors leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed font-light">
                  {featuredPost.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-sm object-cover border border-slate-200"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">{featuredPost.author.name}</div>
                    <div className="text-[11px] text-slate-500">{featuredPost.author.title}</div>
                  </div>
                </div>

                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 group-hover:text-blue-700 flex items-center gap-1 transition-colors">
                  <span>Read Essay</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Real-Time Media Mention Feed Section */}
        <section id="media-mentions-section" className="space-y-6">
          <MediaMentionFeed />
        </section>

        {/* Strategic Articles Directory */}
        <div className="space-y-8 pt-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-light text-[#07132B]">Strategic Essays & Editorial Archive</h2>
              <p className="text-xs text-slate-500">Explore deep dives, newsroom analyses, and PR frameworks.</p>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-[#07132B] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => navigateTo('blog-post', post.slug || post.id)}
              className="bg-white border border-slate-200 hover:border-blue-500 rounded-sm overflow-hidden cursor-pointer group flex flex-col justify-between transition-all shadow-sm hover:shadow-md"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-[#07132B]/90 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-sm text-white border border-blue-900/30 font-bold">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-base font-medium text-[#07132B] group-hover:text-blue-600 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-light">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">By {post.author.name}</span>
                <span className="text-blue-600 font-bold uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform text-xs">
                  <span>Read Article</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};
