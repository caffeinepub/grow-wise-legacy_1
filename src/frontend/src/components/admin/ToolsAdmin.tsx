import type { Tool } from "@/backend.d";
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
  useAddTool,
  useDeleteTool,
  useGetTools,
  useUpdateTool,
} from "@/hooks/useQueries";
import {
  ExternalLink,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ToolFormData {
  name: string;
  description: string;
  link: string;
}

const EMPTY_FORM: ToolFormData = { name: "", description: "", link: "" };

export function ToolsAdmin() {
  const { data: tools, isLoading } = useGetTools();
  const addMutation = useAddTool();
  const updateMutation = useUpdateTool();
  const deleteMutation = useDeleteTool();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [deletingId, setDeletingId] = useState<bigint | null>(null);
  const [form, setForm] = useState<ToolFormData>(EMPTY_FORM);

  const isPending = addMutation.isPending || updateMutation.isPending;

  const openAddDialog = () => {
    setEditingTool(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };

  const openEditDialog = (tool: Tool) => {
    setEditingTool(tool);
    setForm({
      name: tool.name,
      description: tool.description,
      link: tool.link,
    });
    setDialogOpen(true);
  };

  const openDeleteDialog = (id: bigint) => {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.description.trim() || !form.link.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      if (editingTool) {
        await updateMutation.mutateAsync({ id: editingTool.id, ...form });
        toast.success("Tool updated");
      } else {
        await addMutation.mutateAsync(form);
        toast.success("Tool added");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save tool");
    }
  };

  const handleDelete = async () => {
    if (deletingId == null) return;
    try {
      await deleteMutation.mutateAsync(deletingId);
      toast.success("Tool deleted");
      setDeleteDialogOpen(false);
    } catch {
      toast.error("Failed to delete tool");
    }
  };

  return (
    <div data-ocid="admin.tools.panel">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-semibold text-xl text-[#1F2933]">
            Recommended Tools
          </h2>
          <p className="font-body text-[#1F2933]/50 text-sm mt-0.5">
            Manage tools and resources
          </p>
        </div>
        <Button
          data-ocid="admin.tools.add_button"
          onClick={openAddDialog}
          className="btn-gold gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Tool
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {(["1", "2", "3", "4"] as const).map((k) => (
            <Skeleton key={k} className="h-16 rounded-lg" />
          ))}
        </div>
      ) : !tools || tools.length === 0 ? (
        <div
          data-ocid="tools.empty_state"
          className="text-center py-16 bg-[#F9FAFB] rounded-xl border border-[#1F2933]/8"
        >
          <Wrench className="w-10 h-10 text-[#1F2933]/20 mx-auto mb-3" />
          <p className="font-heading text-[#1F2933]/40 font-medium">
            No tools yet
          </p>
          <p className="font-body text-[#1F2933]/30 text-sm mt-1">
            Click "Add Tool" to add your first recommendation.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {tools.map((tool, i) => (
            <div
              key={tool.id.toString()}
              data-ocid={`admin.tools.item.${i + 1}`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#1F2933]/8 hover:border-[#C9A227]/30 transition-colors"
            >
              <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-center gap-2">
                  <p className="font-heading font-medium text-sm text-[#1F2933] truncate">
                    {tool.name}
                  </p>
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C9A227] hover:text-[#C9A227]/80"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="font-body text-xs text-[#1F2933]/45 mt-0.5 truncate">
                  {tool.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  data-ocid={`admin.tools.edit_button.${i + 1}`}
                  variant="ghost"
                  size="sm"
                  onClick={() => openEditDialog(tool)}
                  className="h-8 w-8 p-0 text-[#1F2933]/40 hover:text-[#1F2933]"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                  data-ocid={`admin.tools.delete_button.${i + 1}`}
                  variant="ghost"
                  size="sm"
                  onClick={() => openDeleteDialog(tool.id)}
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
        <DialogContent data-ocid="admin.tools.dialog" className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading text-[#1F2933]">
              {editingTool ? "Edit Tool" : "New Tool"}
            </DialogTitle>
            <DialogDescription className="font-body text-sm text-[#1F2933]/50">
              {editingTool
                ? "Update tool details."
                : "Add a new recommended tool."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label
                htmlFor="tool-name"
                className="font-body text-sm text-[#1F2933]/70"
              >
                Name *
              </Label>
              <Input
                id="tool-name"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="Tool name"
                className="mt-1.5 font-body"
              />
            </div>
            <div>
              <Label
                htmlFor="tool-link"
                className="font-body text-sm text-[#1F2933]/70"
              >
                Link *
              </Label>
              <Input
                id="tool-link"
                value={form.link}
                onChange={(e) =>
                  setForm((f) => ({ ...f, link: e.target.value }))
                }
                placeholder="https://example.com"
                className="mt-1.5 font-body"
              />
            </div>
            <div>
              <Label
                htmlFor="tool-desc"
                className="font-body text-sm text-[#1F2933]/70"
              >
                Description *
              </Label>
              <Textarea
                id="tool-desc"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="What this tool does and why it's recommended"
                className="mt-1.5 font-body resize-none"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              data-ocid="admin.tools.cancel_button"
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              data-ocid="admin.tools.save_button"
              onClick={handleSave}
              disabled={isPending}
              className="btn-gold"
            >
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editingTool ? "Update Tool" : "Add Tool"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading text-[#1F2933]">
              Delete Tool?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body text-[#1F2933]/50">
              This will permanently remove this tool from recommendations.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.tools.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="admin.tools.confirm_button"
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
