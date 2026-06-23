"use client";

import { useEffect, useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Loader2, 
  GripVertical, 
  X,
  ExternalLink
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import SlideDrawer from "@/components/ui/SlideDrawer";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

// DndKit for drag and drop
import { 
  DndContext, 
  closestCenter, 
  useSensor, 
  useSensors, 
  PointerSensor,
  DragEndEvent
} from "@dnd-kit/core";
import { 
  SortableContext, 
  verticalListSortingStrategy, 
  useSortable,
  arrayMove
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Highlight = {
  id: string;
  created_at: string;
  type: "influencer" | "business";
  name: string;
  tagline: string;
  description: string;
  image_url: string | null;
  link_url: string | null;
  display_order: number;
  published: boolean;
};

type FormData = {
  type: "influencer" | "business";
  name: string;
  tagline: string;
  description: string;
  image_url?: string;
  link_url?: string;
  published: boolean;
};

// Sortable Row Component
function SortableHighlightRow({ 
  highlight, 
  onEdit, 
  onDelete, 
  onTogglePublish 
}: { 
  highlight: Highlight; 
  onEdit: (h: Highlight) => void; 
  onDelete: (h: Highlight) => void; 
  onTogglePublish: (id: string, published: boolean) => void; 
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: highlight.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    position: 'relative' as const,
  };

  const isInfluencer = highlight.type === "influencer";

  return (
    <tr 
      ref={setNodeRef} 
      style={style} 
      className={`hover:bg-white/[0.02] transition-colors group ${
        isDragging ? "bg-[#1B1B29] border border-brand-purple/30 shadow-2xl relative z-50" : "divide-y divide-white/5"
      }`}
    >
      {/* Drag Handle */}
      <td className="px-6 py-4 w-10">
        <button 
          type="button"
          {...attributes} 
          {...listeners} 
          className="cursor-grab active:cursor-grabbing p-1.5 text-[#6B5F4F] hover:text-white rounded hover:bg-white/5 transition-colors touch-none"
        >
          <GripVertical size={16} />
        </button>
      </td>

      {/* Image / Avatar */}
      <td className="px-6 py-4 w-16">
        {highlight.image_url ? (
          <img 
            src={highlight.image_url} 
            alt={highlight.name} 
            className={`w-10 h-10 object-cover border border-white/10 shrink-0 ${
              isInfluencer ? "rounded-full" : "rounded-lg"
            }`}
          />
        ) : (
          <div 
            className={`w-10 h-10 flex items-center justify-center font-bold text-xs shrink-0 border border-white/5 ${
              isInfluencer 
                ? "rounded-full bg-brand-purple/20 text-brand-purple-light" 
                : "rounded-lg bg-brand-lime/20 text-brand-lime"
            }`}
          >
            {highlight.name.substring(0, 2).toUpperCase()}
          </div>
        )}
      </td>

      {/* Name */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white flex items-center gap-1">
            {highlight.name}
            {highlight.link_url && (
              <a 
                href={highlight.link_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#6B5F4F] hover:text-white transition-colors"
              >
                <ExternalLink size={12} />
              </a>
            )}
          </span>
          <span 
            className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border uppercase tracking-wider ${
              isInfluencer 
                ? "bg-brand-purple/10 border-brand-purple/20 text-brand-purple-light" 
                : "bg-brand-lime/10 border-brand-lime/20 text-brand-lime"
            }`}
          >
            {highlight.type}
          </span>
        </div>
      </td>

      {/* Tagline */}
      <td className="px-6 py-4 text-sm text-[#8A7F6E] max-w-xs truncate">
        {highlight.tagline}
      </td>

      {/* Published Toggle */}
      <td className="px-6 py-4 w-28">
        <button 
          onClick={() => onTogglePublish(highlight.id, !highlight.published)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            highlight.published ? "bg-brand-purple" : "bg-white/10"
          }`}
        >
          <span 
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              highlight.published ? "translate-x-5" : "translate-x-0"
            }`} 
          />
        </button>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-right w-24">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(highlight)} 
            className="p-1.5 text-[#8A7F6E] hover:text-white rounded hover:bg-white/10 transition-colors"
            title="Edit"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={() => onDelete(highlight)} 
            className="p-1.5 text-[#8A7F6E] hover:text-red-400 rounded hover:bg-red-400/10 transition-colors"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function HighlightsDashboardPage() {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [filteredHighlights, setFilteredHighlights] = useState<Highlight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingHighlight, setEditingHighlight] = useState<Highlight | null>(null);
  const [highlightToDelete, setHighlightToDelete] = useState<Highlight | null>(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const { register, handleSubmit, reset, setValue, getValues, formState: { isSubmitting } } = useForm<FormData>({
    defaultValues: {
      type: "influencer",
      published: true
    }
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const loadHighlights = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("highlights")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) {
        toast.error("Failed to load highlights from Supabase");
        setHighlights([]);
      } else {
        setHighlights(data || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Database connection failed. Is the table created?");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHighlights();
  }, []);

  // Filter effect
  useEffect(() => {
    let result = highlights;
    if (searchTerm) {
      result = result.filter(h => 
        h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.tagline.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (typeFilter !== "All") {
      result = result.filter(h => h.type === typeFilter.toLowerCase());
    }
    setFilteredHighlights(result);
  }, [searchTerm, typeFilter, highlights]);

  const handleTogglePublish = async (id: string, published: boolean) => {
    // Optimistic Update
    setHighlights(prev => prev.map(h => h.id === id ? { ...h, published } : h));

    const { error } = await supabase
      .from("highlights")
      .update({ published })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update status");
      loadHighlights(); // Revert
    } else {
      toast.success(published ? "Highlight published!" : "Highlight unpublished");
    }
  };

  const handleDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;

    const oldIndex = highlights.findIndex(h => h.id === active.id);
    const newIndex = highlights.findIndex(h => h.id === over.id);

    const updatedList = arrayMove(highlights, oldIndex, newIndex);
    
    // Optimistically update local state
    setHighlights(updatedList);

    // Save to database
    try {
      const updatePromises = updatedList.map((item, index) => 
        supabase
          .from("highlights")
          .update({ display_order: index })
          .eq("id", item.id)
      );
      
      const results = await Promise.all(updatePromises);
      const error = results.find(r => r.error);
      
      if (error) {
        toast.error("Failed to save new order");
        loadHighlights(); // Revert
      } else {
        toast.success("Order saved!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error saving display order");
      loadHighlights();
    }
  };

  const handleEditClick = (highlight: Highlight) => {
    setEditingHighlight(highlight);
    setValue("name", highlight.name);
    setValue("type", highlight.type);
    setValue("tagline", highlight.tagline);
    setValue("description", highlight.description);
    setValue("image_url", highlight.image_url || "");
    setValue("link_url", highlight.link_url || "");
    setValue("published", highlight.published);
    setIsDrawerOpen(true);
  };

  const handleAddClick = () => {
    setEditingHighlight(null);
    reset({
      type: "influencer",
      name: "",
      tagline: "",
      description: "",
      image_url: "",
      link_url: "",
      published: true
    });
    setIsDrawerOpen(true);
  };

  const onSubmit = async (data: FormData) => {
    // Nullify empty strings to match DB nullable structure
    const cleanedData = {
      ...data,
      image_url: data.image_url?.trim() === "" ? null : data.image_url?.trim(),
      link_url: data.link_url?.trim() === "" ? null : data.link_url?.trim(),
    };

    if (editingHighlight) {
      // Update
      const { error } = await supabase
        .from("highlights")
        .update(cleanedData)
        .eq("id", editingHighlight.id);

      if (error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.success("Highlight updated successfully!");
        setIsDrawerOpen(false);
        loadHighlights();
      }
    } else {
      // Add new
      // Auto-assign display order as max order + 1
      const maxOrder = highlights.reduce((max, h) => Math.max(max, h.display_order ?? 0), -1);
      const display_order = maxOrder + 1;

      const newHighlight = {
        ...cleanedData,
        display_order
      };

      const { error } = await supabase
        .from("highlights")
        .insert([newHighlight]);

      if (error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.success("Highlight added successfully!");
        setIsDrawerOpen(false);
        loadHighlights();
      }
    }
  };

  const handleConfirmDelete = async () => {
    if (!highlightToDelete) return;
    
    const { error } = await supabase
      .from("highlights")
      .delete()
      .eq("id", highlightToDelete.id);

    if (error) {
      toast.error(`Failed to delete: ${error.message}`);
    } else {
      toast.success("Highlight deleted");
      setHighlightToDelete(null);
      loadHighlights();
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#FFFFFF] p-4 rounded-2xl border border-white/5 shadow-xl">
        <div className="flex flex-1 gap-2 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A7F6E]" size={18} />
            <input 
              type="text" 
              placeholder="Search name or tagline..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-[#F3EBE0] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
            />
          </div>
          {/* Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A7F6E]" size={18} />
            <select 
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="appearance-none bg-[#F3EBE0] border border-white/10 rounded-xl pl-10 pr-8 py-2 text-sm text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
            >
              <option value="All">All Types</option>
              <option value="Influencer">Influencers</option>
              <option value="Business">Businesses</option>
            </select>
          </div>
        </div>
        
        <button 
          onClick={handleAddClick}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-purple text-white px-5 py-2 rounded-xl font-medium btn-glow cursor-pointer"
        >
          <Plus size={18} /> Add Highlight
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-white/5 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#F3EBE0] text-[#8A7F6E] border-b border-white/5">
                <tr>
                  <th className="px-6 py-4 font-medium w-10"></th>
                  <th className="px-6 py-4 font-medium w-16">Profile</th>
                  <th className="px-6 py-4 font-medium">Name / Type</th>
                  <th className="px-6 py-4 font-medium">Tagline</th>
                  <th className="px-6 py-4 font-medium w-28">Published</th>
                  <th className="px-6 py-4 font-medium text-right w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[#8A7F6E]">
                      <Loader2 className="animate-spin mx-auto mb-2 text-brand-purple" size={24} />
                      Loading highlights...
                    </td>
                  </tr>
                ) : filteredHighlights.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[#8A7F6E]">
                      No highlights found. Create one to get started!
                    </td>
                  </tr>
                ) : (
                  <SortableContext items={filteredHighlights.map(h => h.id)} strategy={verticalListSortingStrategy}>
                    {filteredHighlights.map(item => (
                      <SortableHighlightRow 
                        key={item.id} 
                        highlight={item} 
                        onEdit={handleEditClick} 
                        onDelete={setHighlightToDelete}
                        onTogglePublish={handleTogglePublish}
                      />
                    ))}
                  </SortableContext>
                )}
              </tbody>
            </table>
          </DndContext>
        </div>
      </div>

      {/* SlideDrawer for Add/Edit Highlight */}
      <SlideDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        title={editingHighlight ? "Edit Highlight" : "Add New Highlight"}
        width="w-[85vw] sm:w-[480px]"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pb-8">
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#8A7F6E]">Entity Type *</label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`flex items-center justify-center p-3 rounded-xl border border-white/10 cursor-pointer transition-all ${
                register("type").name ? "hover:bg-white/5" : ""
              }`}>
                <input 
                  type="radio" 
                  value="influencer" 
                  {...register("type")} 
                  className="sr-only" 
                />
                <span className="text-sm font-semibold text-white">Influencer</span>
              </label>
              <label className="flex items-center justify-center p-3 rounded-xl border border-white/10 cursor-pointer hover:bg-white/5 transition-all">
                <input 
                  type="radio" 
                  value="business" 
                  {...register("type")} 
                  className="sr-only" 
                />
                <span className="text-sm font-semibold text-white">Business</span>
              </label>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#8A7F6E]">Name *</label>
            <input 
              required 
              {...register("name")} 
              placeholder="e.g. John Doe or Business.com"
              className="w-full bg-[#F3EBE0] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#8A7F6E]">Tagline *</label>
            <input 
              required 
              {...register("tagline")} 
              placeholder="One short punchy line..."
              className="w-full bg-[#F3EBE0] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#8A7F6E]">Description *</label>
            <textarea 
              required 
              {...register("description")} 
              rows={4}
              placeholder="2-3 sentences about what they do or who they are..."
              className="w-full bg-[#F3EBE0] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#8A7F6E]">Image URL (Optional)</label>
            <input 
              {...register("image_url")} 
              placeholder="https://example.com/avatar.jpg"
              className="w-full bg-[#F3EBE0] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#8A7F6E]">Link URL (Optional)</label>
            <input 
              {...register("link_url")} 
              placeholder="https://instagram.com/username or website link"
              className="w-full bg-[#F3EBE0] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all" 
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
            <div>
              <p className="text-sm font-semibold text-white">Publish Immediately</p>
              <p className="text-xs text-[#8A7F6E]">Allow this highlight to be visible on the public homepage.</p>
            </div>
            <button 
              type="button"
              onClick={() => {
                // Manually handle form state changes since it's a styled switch button
                const val = !getValues("published");
                setValue("published", val);
              }}
              className="sr-only" // Hidden standard checkbox under styled button
            />
            {/* Custom switch */}
            <input 
              type="checkbox" 
              {...register("published")} 
              className="h-6 w-11 cursor-pointer accent-brand-purple"
            />
          </div>

          <div className="pt-6 flex gap-3">
            <button 
              type="button" 
              onClick={() => setIsDrawerOpen(false)} 
              className="flex-1 px-4 py-3 border border-white/10 hover:bg-white/5 rounded-xl font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="flex-1 bg-brand-purple hover:bg-brand-purple-light text-white rounded-xl font-medium btn-glow flex justify-center items-center cursor-pointer"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Save Highlight"}
            </button>
          </div>
        </form>
      </SlideDrawer>

      {/* Delete Confirmation Modal */}
      {highlightToDelete && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-syne)]">
                Delete Highlight?
              </h3>
              <button 
                onClick={() => setHighlightToDelete(null)}
                className="text-[#8A7F6E] hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-[#8A7F6E] mb-6">
              Are you sure you want to delete <strong className="text-white">{highlightToDelete.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setHighlightToDelete(null)} 
                className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-sm font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmDelete} 
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
