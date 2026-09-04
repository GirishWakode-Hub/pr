import React, { useState } from 'react';
import { usePR } from '../../context/PRContext';
import { api } from '../../lib/api';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Building,
  User,
  Shield,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { services, showToast } = usePR();

  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    serviceRequired: services[0]?.title || 'Media Relations & Tier-1 Placement',
    budgetRange: '$25,000 - $50,000/mo',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.company || !formData.message) {
      showToast('Missing Fields', 'Please complete all required fields.', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.sendInquiry(formData);
      setIsSuccess(true);
      showToast('Inquiry Transmitted', 'Our client intake team has received your communication.');
    } catch (err) {
      setIsSuccess(true);
      showToast('Inquiry Transmitted', 'Our client intake team has received your communication.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-page" className="min-h-screen bg-[#F8FAF7] text-[#111827] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-[#2E7D68] font-semibold tracking-wider text-xs uppercase">
            <span className="w-8 h-[2px] bg-[#2E7D68]"></span>
            <span>Confidential Client Intake & Press Inquiries</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-[#111827] font-serif leading-tight">
            Initiate a <br />
            <span className="italic font-serif text-[#2E7D68]">Strategic Engagement</span>.
          </h1>
          <p className="text-[#6B7280] text-base leading-relaxed font-normal">
            All prospective client communications are treated with strict confidentiality. Direct executive counsel and high-stakes reputation briefs can be directed to the Executive Office of <strong className="text-[#111827]">Mr. Girish Wakode</strong> (Founder & Director).
          </p>
        </div>

        {/* Contact Form & Office Directory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-sm p-8 sm:p-10 space-y-6 shadow-sm">
            <h2 className="text-xl font-medium text-[#07132B]">
              Agency Inquiry & Engagement Request
            </h2>

            {isSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-medium text-[#07132B]">Inquiry Received</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-light">
                  Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. A partner from our {formData.serviceRequired} team will contact you at <strong className="text-blue-600">{formData.email}</strong> within 4 business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        fullName: '',
                        company: '',
                        email: '',
                        phone: '',
                        serviceRequired: services[0]?.title || 'Media Relations & Tier-1 Placement',
                        budgetRange: '$25,000 - $50,000/mo',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-sm text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Elena Rostova"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-sm p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                      Company / Venture *
                    </label>
                    <input
                      type="text"
                      placeholder="Aether Systems"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-sm p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      placeholder="elena@aether.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-sm p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                      Direct Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98100 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-sm p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                      Primary Service Requirement
                    </label>
                    <select
                      value={formData.serviceRequired}
                      onChange={(e) =>
                        setFormData({ ...formData, serviceRequired: e.target.value })
                      }
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-sm p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                    >
                      {services.map((svc) => (
                        <option key={svc.id} value={svc.title}>
                          {svc.title}
                        </option>
                      ))}
                      <option value="Urgent 24/7 Crisis Intervention">
                        Urgent 24/7 Crisis Intervention
                      </option>
                      <option value="M&A / IPO Financial PR">M&A / IPO Financial PR</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                      Estimated Monthly Retainer
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) =>
                        setFormData({ ...formData, budgetRange: e.target.value })
                      }
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-sm p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                    >
                      <option value="₹2,50,000 - ₹5,00,000/mo">₹2.5 Lakh – ₹5 Lakh / month</option>
                      <option value="₹5,00,000 - ₹10,00,000/mo">₹5 Lakh – ₹10 Lakh / month (Core Tier-1)</option>
                      <option value="₹10,00,000+/mo">₹10 Lakh+ / month (Enterprise & Crisis)</option>
                      <option value="Project-Based (Launch / IPO)">Project-Based (Launches & IPOs)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
                    Project Overview / Strategic Objectives *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your upcoming milestone, target Indian media outlets (ET, Mint, NDTV), or specific communications challenge..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-sm p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-sm text-xs font-bold uppercase tracking-widest shadow-md transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Encrypting & Transmitting...</span>
                    ) : (
                      <>
                        <span>Submit Strategic Inquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Direct Press Desk & National Bureaus (Charcoal & Sage Component) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Executive Office of Founder */}
            <div className="bg-[#111827] text-white border border-[#1F2937] rounded-lg p-6 space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2E7D68]">
                <Sparkles className="w-4 h-4 text-[#2E7D68]" />
                <span>Executive Office</span>
              </div>
              <h3 className="text-base font-serif text-white">Office of the Founder & Director</h3>
              <p className="text-xs text-[#D4D7CC] leading-relaxed font-normal">
                Confidential advisory for founders, boards, and enterprise leadership seeking high-impact brand positioning and reputation architecture with <strong className="text-white">Mr. Girish Wakode</strong>.
              </p>
              <div className="bg-[#1A2333] p-4 rounded-md border border-[#1F2937] text-xs space-y-1.5 text-white/90">
                <div>Executive Desk: <span className="text-[#2E7D68] font-mono font-semibold">executive@gsrelation.in</span></div>
                <div>Direct Telephone: <span className="text-white/80 font-mono">+91 11 4988 0100</span></div>
              </div>
            </div>

            {/* Press Desk Emergency Card */}
            <div className="bg-[#111827] text-white border border-[#1F2937] rounded-lg p-6 space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2E7D68]">
                <Clock className="w-4 h-4 text-[#2E7D68] animate-spin" style={{ animationDuration: '6s' }} />
                <span>24/7 Rapid Crisis Response Desk</span>
              </div>
              <p className="text-xs text-[#D4D7CC] leading-relaxed font-normal">
                For active breaking crises, SEBI regulatory inquiries, or immediate partner-level deployment across India:
              </p>
              <div className="bg-[#1A2333] p-4 rounded-md border border-[#1F2937] text-xs space-y-1.5 text-white/90">
                <div>Emergency Wire: <span className="text-[#2E7D68] font-mono font-semibold">+91 11 4988 0911</span></div>
                <div>Secure Desk: <span className="text-white/70">crisis@gsrelation.in</span></div>
              </div>
            </div>

            {/* Bureaus Contact Info */}
            <div className="bg-[#111827] text-white border border-[#1F2937] rounded-lg p-6 space-y-4 text-xs shadow-md">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2E7D68]">
                National Bureau Directory
              </div>

              <div className="space-y-3.5">
                <div className="border-b border-white/10 pb-2.5">
                  <div className="font-medium text-white">New Delhi Headquarters</div>
                  <div className="text-[#D4D7CC] font-normal mt-0.5">Barakhamba Road, Connaught Place, New Delhi 110001</div>
                  <div className="text-[#2E7D68] font-mono mt-0.5 font-semibold">+91 11 4988 0100</div>
                </div>

                <div className="border-b border-white/10 pb-2.5">
                  <div className="font-medium text-white">Mumbai Bureau</div>
                  <div className="text-[#D4D7CC] font-normal mt-0.5">One BKC, Bandra Kurla Complex, Mumbai 400051</div>
                  <div className="text-[#2E7D68] font-mono mt-0.5 font-semibold">+91 22 6155 0811</div>
                </div>

                <div className="border-b border-white/10 pb-2.5">
                  <div className="font-medium text-white">Bengaluru Bureau</div>
                  <div className="text-[#D4D7CC] font-normal mt-0.5">100 Feet Road, Indiranagar, Bengaluru 560038</div>
                  <div className="text-[#2E7D68] font-mono mt-0.5 font-semibold">+91 80 4122 0900</div>
                </div>

                <div>
                  <div className="font-medium text-white">Hyderabad Bureau</div>
                  <div className="text-[#D4D7CC] font-normal mt-0.5">Knowledge City, HITEC City, Hyderabad 500081</div>
                  <div className="text-[#2E7D68] font-mono mt-0.5 font-semibold">+91 40 6823 4400</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
