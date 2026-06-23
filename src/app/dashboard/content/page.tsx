"use client";

import { useState } from "react";
import { 
  Download, 
  Eye, 
  Search, 
  Filter, 
  Upload, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  FileText,
  X,
  Plus,
  Sparkles,
  Camera,
  Users,
  Film,
  Check
} from "lucide-react";
import toast from "react-hot-toast";

interface MediaAsset {
  id: string;
  title: string;
  creatorName: string;
  creatorType: "Athlete" | "Influencer" | "Photographer" | "Videographer" | "Brand";
  campaignName: string;
  fileType: "Photo" | "Video" | "Document";
  url: string;
  date: string;
}

export default function ContentLibraryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedCampaign, setSelectedCampaign] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [lightboxAsset, setLightboxAsset] = useState<MediaAsset | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Initial mock assets
  const [assets, setAssets] = useState<MediaAsset[]>([
    {
      id: "a1",
      title: "Jordan Carter - Dumbbell Curl Form",
      creatorName: "Jordan Carter",
      creatorType: "Athlete",
      campaignName: "Summer Sweat Challenge",
      fileType: "Video",
      url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
      date: "2026-06-08"
    },
    {
      id: "a2",
      title: "Sophia Martinez - Summer HIIT Routine",
      creatorName: "Sophia Martinez",
      creatorType: "Influencer",
      campaignName: "Summer Sweat Challenge",
      fileType: "Photo",
      url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
      date: "2026-06-03"
    },
    {
      id: "a3",
      title: "Liam Davis - Studio Front Desk Interior",
      creatorName: "Liam Davis",
      creatorType: "Photographer",
      campaignName: "Midtown Studio Grand Opening",
      fileType: "Photo",
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      date: "2026-05-10"
    },
    {
      id: "a4",
      title: "Liam Davis - Treadmill Rows Action Shot",
      creatorName: "Liam Davis",
      creatorType: "Photographer",
      campaignName: "Midtown Studio Grand Opening",
      fileType: "Photo",
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
      date: "2026-05-12"
    },
    {
      id: "a5",
      title: "Zach Miller - Summer Sweat Campaign Promo Video",
      creatorName: "Zach Miller",
      creatorType: "Videographer",
      campaignName: "Summer Sweat Challenge",
      fileType: "Video",
      url: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=800&q=80",
      date: "2026-06-05"
    },
    {
      id: "a6",
      title: "Emma Watson - Grand Opening Vlog Draft",
      creatorName: "Emma Watson",
      creatorType: "Influencer",
      campaignName: "Midtown Studio Grand Opening",
      fileType: "Video",
      url: "https://images.unsplash.com/photo-1522898467493-49726bf28798?auto=format&fit=crop&w=800&q=80",
      date: "2026-05-15"
    },
    {
      id: "a7",
      title: "Liam Davis - Yoga Class Stretch Action",
      creatorName: "Liam Davis",
      creatorType: "Photographer",
      campaignName: "Midtown Studio Grand Opening",
      fileType: "Photo",
      url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
      date: "2026-05-20"
    },
    {
      id: "a8",
      title: "Sophia Martinez - Post-Workout Cold Plunge Vlog",
      creatorName: "Sophia Martinez",
      creatorType: "Influencer",
      campaignName: "Winter Chill Recovery Program",
      fileType: "Video",
      url: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80",
      date: "2026-01-10"
    },
    // Brand Assets
    {
      id: "brand-logo",
      title: "Glow Fitness Primary Logo (PNG)",
      creatorName: "Glow Fitness",
      creatorType: "Brand",
      campaignName: "Brand Kit",
      fileType: "Document",
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      date: "2026-01-01"
    },
    {
      id: "brand-guidelines",
      title: "Summer Sweat Campaign Typography & Logo Guidelines",
      creatorName: "ItCrowd Team",
      creatorType: "Brand",
      campaignName: "Brand Kit",
      fileType: "Document",
      url: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80",
      date: "2026-05-01"
    }
  ]);

  // Categories mapping
  const categories = [
    { id: "All", label: "All Assets", icon: null },
    { id: "Athlete", label: "Athlete Content", icon: Users },
    { id: "Influencer", label: "Influencer Content", icon: Sparkles },
    { id: "Photographer", label: "Photography", icon: Camera },
    { id: "Videographer", label: "Video Production", icon: Film },
    { id: "Brand", label: "Brand Assets", icon: FileText }
  ];

  // Campaigns list for dropdown
  const campaignsList = [
    "All",
    "Summer Sweat Challenge",
    "Midtown Studio Grand Opening",
    "Winter Chill Recovery Program",
    "Brand Kit"
  ];

  // Filtered Assets
  const filteredAssets = assets.filter((asset) => {
    // Category check
    if (activeCategory !== "All" && asset.creatorType !== activeCategory) {
      return false;
    }
    // Campaign check
    if (selectedCampaign !== "All" && asset.campaignName !== selectedCampaign) {
      return false;
    }
    // Search check
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const matchesTitle = asset.title.toLowerCase().includes(query);
      const matchesCreator = asset.creatorName.toLowerCase().includes(query);
      if (!matchesTitle && !matchesCreator) {
        return false;
      }
    }
    return true;
  });

  const handleDownload = (asset: MediaAsset) => {
    const toastId = toast.loading(`Downloading ${asset.title}...`);
    setTimeout(() => {
      toast.success("Download complete!", { id: toastId });
    }, 1200);
  };

  const handleUploadClick = () => {
    setIsUploading(true);
    const toastId = toast.loading("Uploading brand asset...");
    
    // Mock upload after 2 seconds
    setTimeout(() => {
      const newAsset: MediaAsset = {
        id: `uploaded-${Date.now()}`,
        title: "Glow Fitness Midtown Interior Shoot Outline.pdf",
        creatorName: "Glow Fitness (You)",
        creatorType: "Brand",
        campaignName: "Brand Kit",
        fileType: "Document",
        url: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80",
        date: new Date().toISOString().split("T")[0]
      };
      setAssets((prev) => [newAsset, ...prev]);
      setIsUploading(false);
      toast.success("Brand asset uploaded successfully!", { id: toastId });
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Top Banner and Upload Brand Assets */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-[family-name:var(--font-syne)]">Content Library</h1>
          <p className="text-sm text-[#8A7F6E] mt-1">Access, preview, and download custom visual assets generated for your brand.</p>
        </div>

        <button 
          onClick={handleUploadClick}
          disabled={isUploading}
          className="flex items-center justify-center gap-2 bg-[#FFFFFF] border border-white/10 hover:border-brand-purple/50 text-white px-4 py-2.5 rounded-xl font-medium transition-all hover:bg-brand-purple/5 text-sm"
        >
          <Upload size={16} className={isUploading ? "animate-bounce" : ""} />
          {isUploading ? "Uploading..." : "Upload Brand Guidelines"}
        </button>
      </div>

      {/* Categories Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-white/5 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full border transition-all shrink-0 ${
              activeCategory === cat.id
                ? "bg-brand-purple/15 text-brand-purple-light border-brand-purple/30"
                : "bg-[#F3EBE0] text-[#8A7F6E] border-white/5 hover:border-white/10 hover:text-white"
            }`}
          >
            {cat.icon && <cat.icon size={12} />}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-[#FFFFFF] border border-white/5 p-4 rounded-2xl shadow-md">
        
        {/* Search */}
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B5F4F]" />
          <input
            type="text"
            placeholder="Search by asset name or creator..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F3EBE0] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#6B5F4F] focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
          />
        </div>

        {/* Campaign Filter */}
        <div className="w-full md:w-[260px] flex items-center gap-2 bg-[#F3EBE0] border border-white/10 rounded-xl px-3 py-2">
          <Filter size={14} className="text-[#6B5F4F]" />
          <select
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
            className="flex-1 bg-transparent border-0 text-xs text-white focus:outline-none focus:ring-0 cursor-pointer"
          >
            <option value="" disabled className="text-[#6B5F4F]">Filter by Campaign</option>
            {campaignsList.map((camp) => (
              <option key={camp} value={camp} className="bg-[#F3EBE0] text-white">
                {camp === "All" ? "All Campaigns" : camp}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Content Asset Grid */}
      {filteredAssets.length === 0 ? (
        <div className="bg-[#FFFFFF]/30 border border-white/5 rounded-3xl p-16 text-center">
          <ImageIcon size={48} className="mx-auto text-[#6B5F4F] mb-4" />
          <h3 className="text-white font-bold text-lg font-[family-name:var(--font-syne)]">No assets found</h3>
          <p className="text-xs text-[#8A7F6E] mt-1 max-w-sm mx-auto">
            Try adjusting your category tabs or campaign filters, or make sure your keywords are spelled correctly.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <div 
              key={asset.id} 
              className="group bg-[#FFFFFF] border border-white/5 rounded-2xl overflow-hidden shadow-lg hover:border-brand-purple/20 transition-all flex flex-col justify-between"
            >
              {/* Media Preview Box */}
              <div className="relative aspect-video bg-[#F3EBE0] overflow-hidden flex items-center justify-center">
                {asset.fileType === "Document" ? (
                  <div className="w-full h-full flex flex-col justify-center items-center bg-brand-purple/5 p-6 space-y-3">
                    <FileText size={40} className="text-brand-purple-light" />
                    <span className="text-[10px] text-brand-purple-light font-bold uppercase tracking-widest">Document / PDF</span>
                  </div>
                ) : (
                  <img 
                    src={asset.url} 
                    alt={asset.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                
                {/* Media Type Icon Badge */}
                <span 
                  className="absolute top-2 left-2 p-1.5 bg-[#F3EBE0]/80 backdrop-blur rounded-lg text-white border border-white/10"
                  title={`${asset.fileType} Asset`}
                >
                  {asset.fileType === "Video" ? (
                    <VideoIcon size={12} />
                  ) : asset.fileType === "Photo" ? (
                    <ImageIcon size={12} />
                  ) : (
                    <FileText size={12} />
                  )}
                </span>

                {/* Hover overlay actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button 
                    onClick={() => setLightboxAsset(asset)}
                    className="p-3 bg-white text-black hover:bg-brand-purple-light hover:text-white rounded-full transition-all hover:scale-110 shadow-lg"
                    title="Quick Preview"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    onClick={() => handleDownload(asset)}
                    className="p-3 bg-[#FFFFFF] text-white hover:bg-brand-lime hover:text-black rounded-full transition-all hover:scale-110 shadow-lg border border-white/10"
                    title="Download Asset"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>

              {/* Media Detail Info Box */}
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white line-clamp-1 leading-snug" title={asset.title}>
                    {asset.title}
                  </h4>
                  <span className="text-[10px] text-brand-purple-light block mt-0.5 font-medium">
                    Creator: {asset.creatorName}
                  </span>
                </div>

                <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[9px] text-[#6B5F4F]">
                  <span className="font-semibold uppercase tracking-wider">{asset.campaignName}</span>
                  <span>{asset.date}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Lightbox / Modal Preview */}
      {lightboxAsset && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex flex-col justify-center items-center p-6 animate-in fade-in duration-300">
          
          {/* Close button */}
          <button 
            onClick={() => setLightboxAsset(null)}
            className="absolute top-6 right-6 p-2 bg-white/5 text-white hover:bg-white/10 rounded-full transition-colors border border-white/10"
          >
            <X size={20} />
          </button>

          {/* Lightbox Modal Content Box */}
          <div className="w-full max-w-4xl bg-[#FBF6EF] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[85vh]">
            
            {/* Visual Media Pane */}
            <div className="flex-1 bg-black flex items-center justify-center relative min-h-[300px]">
              {lightboxAsset.fileType === "Document" ? (
                <div className="flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <FileText size={64} className="text-brand-purple-light animate-pulse" />
                  <span className="text-xs font-bold text-[#8A7F6E] tracking-widest uppercase">Glow Fitness Guidelines Outlines</span>
                </div>
              ) : (
                <img 
                  src={lightboxAsset.url} 
                  alt={lightboxAsset.title} 
                  className="max-w-full max-h-[50vh] md:max-h-[80vh] object-contain"
                />
              )}
            </div>

            {/* Context Sidebar Pane */}
            <div className="w-full md:w-[320px] bg-[#FBF6EF] border-t md:border-t-0 md:border-l border-white/10 p-6 flex flex-col justify-between shrink-0">
              <div className="space-y-6">
                
                {/* Title and Badge */}
                <div className="space-y-2">
                  <span className="text-[10px] px-2 py-0.5 bg-brand-purple/10 border border-brand-purple/20 text-brand-purple-light font-extrabold uppercase rounded inline-block">
                    {lightboxAsset.fileType} Asset
                  </span>
                  <h3 className="text-base font-bold text-white leading-snug">
                    {lightboxAsset.title}
                  </h3>
                </div>

                {/* Creator Details */}
                <div className="space-y-1 bg-[#FFFFFF] p-3 border border-white/5 rounded-xl">
                  <span className="text-[10px] text-[#6B5F4F] font-bold uppercase tracking-wider block">Created By</span>
                  <span className="text-sm font-semibold text-white block">{lightboxAsset.creatorName}</span>
                  <span className="text-xs text-[#8A7F6E] block">{lightboxAsset.creatorType} Creator</span>
                </div>

                {/* Campaign context */}
                <div className="space-y-1">
                  <span className="text-[10px] text-[#6B5F4F] font-bold uppercase tracking-wider block">Campaign Context</span>
                  <span className="text-xs font-bold text-[#8A7F6E] block">{lightboxAsset.campaignName}</span>
                  <span className="text-[10px] text-[#6B5F4F] block">Delivered on {lightboxAsset.date}</span>
                </div>

              </div>

              {/* Actions */}
              <div className="pt-6 border-t border-white/5 space-y-3">
                <button 
                  onClick={() => {
                    handleDownload(lightboxAsset);
                    setLightboxAsset(null);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-brand-purple text-white py-3 px-4 rounded-xl text-xs font-bold btn-glow"
                >
                  <Download size={14} /> Download High-Res
                </button>
                <button 
                  onClick={() => setLightboxAsset(null)}
                  className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-[#8A7F6E] hover:text-white rounded-xl text-xs font-bold transition-all"
                >
                  Close Preview
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
