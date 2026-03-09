import type { Guide } from "@/backend.d";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddGuide,
  useDeleteGuide,
  useGetGuides,
  useUpdateGuide,
} from "@/hooks/useQueries";
import { BookOpen, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface GuideFormData {
  title: string;
  description: string;
}

const EMPTY_FORM: GuideFormData = { title: "", description: "" };

export function GuidesAdmin() {
  const { data: guides, isLoading } = useGetGuides();
  const addMutation = useAddGuide();
  const updateMutation = useUpdateGuide();
  const deleteMutation = useDeleteGuide();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingGuide, setEditingGuide] = useState<Guide | null>(null);
  const [deletingId, setDeletingId] = useState<bigint | null>(null);
  const [form, setForm] = useState<GuideFormData>(EMPTY_FORM);

  const isPending = addMutation.isPending || updateMutation.isPending;

  const openAddDialog = () => {
    setEditingGuide(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };

  const openEditDialog = (guide: Guide) => {
    setEditingGuide(guide);
    setForm({ title: guide.title, description: guide.description });
    setDialogOpen(true);
  };

  const openDeleteDialog = (id: bigint) => {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      if (editingGuide) {
        await updateMutation.mutateAsync({ id: editingGuide.id, ...form });
        toast.success("Guide updated");
      } else {
        await addMutation.mutateAsync(form);
        toast.success("Guide added");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save guide");
    }
  };

  const handleDelete = async () => {
    if (deletingId == null) return;
    try {
      await deleteMutation.mutateAsync(deletingId);
      toast.success("Guide deleted");
      setDeleteDialogOpen(false);
    } catch {
      toast.error("Failed to delete guide");
    }
  };

  return (
    <div data-ocid="admin.guides.panel">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-semibold text-xl text-[#1F2933]">
            Featured Guides
          </h2>
          <p className="font-body text-[#1F2933]/50 text-sm mt-0.5">
            Manage comprehensive guide content
          </p>
        </div>
        <Button
          data-ocid="admin.guides.add_button"
          onClick={openAddDialog}
          className="btn-gold gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Guide
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {(["1", "2", "3"] as const).map((k) => (
            <Skeleton key={k} className="h-16 rounded-lg" />
          ))}
        </div>
      ) : !guides || guides.length === 0 ? (
        <div
          data-ocid="guides.empty_state"
          className="text-center py-16 bg-[#F9FAFB] rounded-xl border border-[#1F2933]/8"
        >
          <BookOpen className="w-10 h-10 text-[#1F2933]/20 mx-auto mb-3" />
          <p className="font-heading text-[#1F2933]/40 font-medium">
            No guides yet
          </p>
          <p className="font-body text-[#1F2933]/30 text-sm mt-1">
            Click "Add Guide" to create your first guide.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {guides.map((guide, i) => (
            <div
              key={guide.id.toString()}
              data-ocid={`admin.guides.item.${i + 1}`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#1F2933]/8 hover:border-[#C9A227]/30 transition-colors"
            >
              <div className="flex-1 min-w-0 mr-4">
                <p className="font-heading font-medium text-sm text-[#1F2933] truncate">
                  {guide.title}
                </p>
                <p className="font-body text-xs text-[#1F2933]/45 mt-0.5 truncate">
                  {guide.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  data-ocid={`admin.guides.edit_button.${i + 1}`}
                  variant="ghost"
                  size="sm"
                  onClick={() => openEditDialog(guide)}
                  className="h-8 w-8 p-0 text-[#1F2933]/40 hover:text-[#1F2933]"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                  data-ocid={`admin.guides.delete_button.${i + 1}`}
                  variant="ghost"
                  size="sm"
                  onClick={() => openDeleteDialog(guide.id)}
                  className="h-8 w-8 p-0 text-[#1F2933]/40 hover:text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent data-ocid="admin.guides.dialog" className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading text-[#1F2933]">
              {editingGuide ? "Edit Guide" : "New Guide"}
            </DialogTitle>
            <DialogDescription className="font-body text-sm text-[#1F2933]/50">
              {editingGuide
                ? "Update the guide details."
                : "Add a new featured guide."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label
                htmlFor="guide-title"
                className="font-body text-sm text-[#1F2933]/70"
              >
                Title *
              </Label>
              <Input
                id="guide-title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Guide title"
                className="mt-1.5 font-body"
              />
            </div>
            <div>
              <Label
                htmlFor="guide-desc"
                className="font-body text-sm text-[#1F2933]/70"
              >
                Description *
              </Label>
              <Textarea
                id="guide-desc"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="What readers will learn from this guide"
                className="mt-1.5 font-body resize-none"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              data-ocid="admin.guides.cancel_button"
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              data-ocid="admin.guides.save_button"
              onClick={handleSave}
              disabled={isPending}
              className="btn-gold"
            >
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editingGuide ? "Update Guide" : "Add Guide"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading text-[#1F2933]">
              Delete Guide?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body text-[#1F2933]/50">
              This will permanently remove the guide.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.guides.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="admin.guides.confirm_button"
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
