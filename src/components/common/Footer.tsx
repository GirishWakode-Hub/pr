import React, { useState } from 'react';
import { usePR } from '../../context/PRContext';
import { Logo } from './Logo';
import {
  Send,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Shield,
  Award,
  Globe
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, setCurrentRole, showToast } = usePR();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Invalid Email', 'Please provide a valid email address.', 'warning');
      return;
    }
    setIsSubscribed(true);
    showToast('Subscribed to Vantage Point', 'You will receive our bi-weekly executive communications briefing.');
    setEmail('');
  };

  return (
    <footer id="agency-footer" className="bg-[#111827] text-white/70 border-t border-[#1F2937] pt-12 sm:pt-16 pb-[max(3rem,calc(env(safe-area-inset-bottom)+2.5rem))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1F2937]">
          {/* Col 1 & 2: Agency Identity */}
          <div className="lg:col-span-2 space-y-5">
            <Logo
              size="lg"
              showTagline={true}
              taglineText="Strategic Communications for a Brighter Tomorrow."
              taglineClassName="normal-case tracking-normal text-[#D4D7CC]/70 text-xs font-normal"
              theme="dark"
            />
            <p className="text-[#6B7280] text-sm leading-relaxed max-w-md font-light">
              Strategic communications, elite media relations, and reputation architecture for category leaders, high-growth technology pioneers, and market-shaping institutions.
            </p>

            <div className="flex items-center gap-4 text-xs text-white/40 pt-2">
              <span className="flex items-center gap-1.5 text-[#D4D7CC]">
                <Award className="w-4 h-4 text-[#2E7D68]" />
                PRovoke Strategic Agency of the Year Recognition
              </span>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <div className="text-[10px] font-bold text-[#D4D7CC] uppercase tracking-[0.2em] mb-2">
                Subscribe to Executive Communications Briefing
              </div>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#2E7D68] bg-[#1F2937] border border-[#2E7D68]/40 p-2.5 rounded-md">
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D68] flex-shrink-0" />
                  <span>Subscribed! You will receive our next PR intelligence dispatch.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter executive email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-[#1F2937] border border-white/10 rounded-md px-3.5 py-2 text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#2E7D68]"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#2E7D68] hover:bg-[#246453] text-white px-4 py-2 rounded-md text-xs font-medium tracking-normal flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>Join</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <div className="text-[10px] font-bold text-[#D4D7CC] uppercase tracking-[0.2em]">
              PR Capabilities
            </div>
            <ul className="space-y-2 text-xs text-[#6B7280]">
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Media Relations & Tier-1 Placement
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Crisis & Issue Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Executive Thought Leadership
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Global Product & Funding Launches
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Digital PR & Brand Amplification
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  M&A and Financial Communications
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Explore & Portals */}
          <div className="space-y-3">
            <div className="text-[10px] font-bold text-[#D4D7CC] uppercase tracking-[0.2em]">
              Explore & Portals
            </div>
            <ul className="space-y-2 text-xs text-[#6B7280]">
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>About GS • Relation</span>
                  <ArrowUpRight className="w-3 h-3 text-[#6B7280]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('work')}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Client Case Studies</span>
                  <ArrowUpRight className="w-3 h-3 text-[#6B7280]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('newsroom')}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Official Newsroom</span>
                  <ArrowUpRight className="w-3 h-3 text-[#6B7280]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('insights')}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>PR Strategic Insights</span>
                  <ArrowUpRight className="w-3 h-3 text-[#6B7280]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentRole('CLIENT');
                    navigateTo('client-portal');
                  }}
                  className="text-[#2E7D68] hover:text-[#3D9981] font-medium transition-colors"
                >
                  Client Campaign Portal →
                </button>
              </li>
              <li>
                <button
                  id="footer-admin-link"
                  onClick={() => navigateTo('admin')}
                  className="text-[#D4D7CC] hover:text-white font-medium transition-colors flex items-center gap-1"
                >
                  <span>Admin Control Center →</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: National & Global Bureaus */}
          <div className="space-y-3 text-xs">
            <div className="text-[10px] font-bold text-[#D4D7CC] uppercase tracking-[0.2em]">
              National Bureaus
            </div>
            <div className="space-y-3">
              <div>
                <div className="font-medium text-white">New Delhi (HQ)</div>
                <div className="text-[#6B7280]">Barakhamba Road, Connaught Place</div>
                <div className="text-[#6B7280] font-mono">+91 11 4988 0100</div>
              </div>
              <div>
                <div className="font-medium text-white">Mumbai Bureau</div>
                <div className="text-[#6B7280]">One BKC, Bandra Kurla Complex</div>
                <div className="text-[#6B7280] font-mono">+91 22 6155 0811</div>
              </div>
              <div>
                <div className="font-medium text-white">Bengaluru Bureau</div>
                <div className="text-[#6B7280]">100 Feet Road, Indiranagar</div>
                <div className="text-[#6B7280] font-mono">+91 80 4122 0900</div>
              </div>
              <div>
                <div className="font-medium text-white">Hyderabad Bureau</div>
                <div className="text-[#6B7280]">Knowledge City, HITEC City</div>
                <div className="text-[#6B7280] font-mono">+91 40 6823 4400</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <div>
            © {new Date().getFullYear()} GS • Relation. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
              Agency Governance
            </button>
            <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
              Press Desk
            </button>
            <span className="text-white/20">|</span>
            <span className="text-[#2E7D68] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D68] inline-block animate-pulse"></span>
              All Media Wire Feeds Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
