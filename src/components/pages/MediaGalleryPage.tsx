import React, { useState } from 'react';
import { usePR } from '../../context/PRContext';
import {
  Download,
  Filter,
  Image as ImageIcon,
  FileText,
  CheckCircle2,
  ExternalLink,
  Shield,
  Search
} from 'lucide-react';

export const MediaGalleryPage: React.FC = () => {
  const { mediaAssets = [], showToast } = usePR();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['ALL', 'LOGOS', 'EXECUTIVE_HEADSHOTS', 'PRODUCT_IMAGES', 'FACTSHEETS', 'BRAND_GUIDELINES'];

  const filteredAssets = (mediaAssets || []).filter((asset) => {
    const matchesCategory = selectedCategory === 'ALL' || asset.category === selectedCategory;
    const matchesSearch =
      (asset.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (asset.clientName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (asset.format || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (title: string) => {
    showToast('Asset Downloaded', `${title} has been downloaded in original high-resolution format.`);
  };

  const handleDownloadAll = () => {
    showToast('Master Press Pack Downloaded', 'Downloading all high-res assets, vector logos, and executive bios (.ZIP, 142MB).');
  };

  return (
    <div id="media-gallery-page" className="min-h-screen bg-[#F8FAFC] text-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 text-blue-600 font-bold tracking-widest text-xs uppercase">
              <span className="w-8 h-[2px] bg-blue-600"></span>
              <span>Approved Press & Editorial Assets</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-[#07132B] leading-tight">
              Media Kit & <br />
              <span className="italic font-serif text-blue-600 font-normal">High-Resolution Asset Gallery</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
              Official press photography, 4K b-roll stills, vector logomarks, executive headshots, and corporate factsheets cleared for editorial publication.
            </p>
          </div>

          <button
            onClick={handleDownloadAll}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-sm text-xs font-bold uppercase tracking-wider shadow-md transition-all self-start lg:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Download Master Asset Pack (ZIP)</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search assets by client, format..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-sm pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#07132B] text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {cat.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Asset Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-white border border-slate-200 hover:border-blue-500 rounded-sm overflow-hidden group flex flex-col justify-between transition-all shadow-sm hover:shadow-md"
            >
              <div className="relative h-44 bg-slate-100 flex items-center justify-center overflow-hidden">
                {asset.previewUrl ? (
                  <img
                    src={asset.previewUrl}
                    alt={asset.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex flex-col items-center text-slate-400 gap-2">
                    <FileText className="w-10 h-10" />
                    <span className="text-[11px] font-mono">{asset.format}</span>
                  </div>
                )}
                <div className="absolute top-2.5 right-2.5 bg-[#07132B]/90 text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm border border-blue-900/30 font-semibold shadow-sm">
                  {asset.fileSize}
                </div>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                    {asset.clientName}
                  </div>
                  <h3 className="text-xs font-medium text-slate-900 leading-snug mt-1">
                    {asset.title}
                  </h3>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">{asset.format}</span>
                  <button
                    onClick={() => handleDownload(asset.title)}
                    className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Media Usage Rights Disclaimer (Dark Blue Component) */}
        <div className="bg-[#07132B] text-white border border-blue-900/40 rounded-sm p-5 flex items-start gap-4 text-xs leading-relaxed font-light shadow-md">
          <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-white font-medium block mb-1">Editorial Usage Guidelines</strong>
            <p className="text-white/80">
              All photographic stills, b-roll packages, and vector marks contained in this gallery are authorized solely for accredited news, editorial, and journalistic coverage of Apex & Vantage PR and its verified clients. Commercial alteration, unauthorized merchandising, or third-party endorsements are strictly prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
