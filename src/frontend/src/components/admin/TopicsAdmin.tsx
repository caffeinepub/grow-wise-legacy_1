import type { TopicCard } from "@/backend.d";
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
  useAddTopicCard,
  useDeleteTopicCard,
  useGetTopicCards,
  useUpdateTopicCard,
} from "@/hooks/useQueries";
import { LayoutGrid, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface TopicFormData {
  title: string;
  description: string;
}

const EMPTY_FORM: TopicFormData = { title: "", description: "" };

export function TopicsAdmin() {
  const { data: topics, isLoading } = useGetTopicCards();
  const addMutation = useAddTopicCard();
  const updateMutation = useUpdateTopicCard();
  const deleteMutation = useDeleteTopicCard();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<TopicCard | null>(null);
  const [deletingId, setDeletingId] = useState<bigint | null>(null);
  const [form, setForm] = useState<TopicFormData>(EMPTY_FORM);

  const isPending = addMutation.isPending || updateMutation.isPending;

  const openAddDialog = () => {
    setEditingTopic(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };

  const openEditDialog = (topic: TopicCard) => {
    setEditingTopic(topic);
    setForm({ title: topic.title, description: topic.description });
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
      if (editingTopic) {
        await updateMutation.mutateAsync({ id: editingTopic.id, ...form });
        toast.success("Topic card updated");
      } else {
        await addMutation.mutateAsync(form);
        toast.success("Topic card added");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save topic card");
    }
  };

  const handleDelete = async () => {
    if (deletingId == null) return;
    try {
      await deleteMutation.mutateAsync(deletingId);
      toast.success("Topic card deleted");
      setDeleteDialogOpen(false);
    } catch {
      toast.error("Failed to delete topic card");
    }
  };

  return (
    <div data-ocid="admin.topics.panel">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-semibold text-xl text-[#1F2933]">
            Topic Cards
          </h2>
          <p className="font-body text-[#1F2933]/50 text-sm mt-0.5">
            Manage homepage topic cards
          </p>
        </div>
        <Button
          data-ocid="admin.topics.add_button"
          onClick={openAddDialog}
          className="btn-gold gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Topic
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {(["1", "2", "3"] as const).map((k) => (
            <Skeleton key={k} className="h-16 rounded-lg" />
          ))}
        </div>
      ) : !topics || topics.length === 0 ? (
        <div
          data-ocid="topics.empty_state"
          className="text-center py-16 bg-[#F9FAFB] rounded-xl border border-[#1F2933]/8"
        >
          <LayoutGrid className="w-10 h-10 text-[#1F2933]/20 mx-auto mb-3" />
          <p className="font-heading text-[#1F2933]/40 font-medium">
            No topic cards yet
          </p>
          <p className="font-body text-[#1F2933]/30 text-sm mt-1">
            Click "Add Topic" to create a topic card.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {topics.map((topic, i) => (
            <div
              key={topic.id.toString()}
              data-ocid={`admin.topics.item.${i + 1}`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#1F2933]/8 hover:border-[#C9A227]/30 transition-colors"
            >
              <div className="flex-1 min-w-0 mr-4">
                <p className="font-heading font-medium text-sm text-[#1F2933] truncate">
                  {topic.title}
                </p>
                <p className="font-body text-xs text-[#1F2933]/45 mt-0.5 truncate">
                  {topic.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  data-ocid={`admin.topics.edit_button.${i + 1}`}
                  variant="ghost"
                  size="sm"
                  onClick={() => openEditDialog(topic)}
                  className="h-8 w-8 p-0 text-[#1F2933]/40 hover:text-[#1F2933]"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                  data-ocid={`admin.topics.delete_button.${i + 1}`}
                  variant="ghost"
                  size="sm"
                  onClick={() => openDeleteDialog(topic.id)}
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
        <DialogContent data-ocid="admin.topics.dialog" className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading text-[#1F2933]">
              {editingTopic ? "Edit Topic Card" : "New Topic Card"}
            </DialogTitle>
            <DialogDescription className="font-body text-sm text-[#1F2933]/50">
              {editingTopic
                ? "Update topic card details."
                : "Add a new topic card for the homepage."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label
                htmlFor="topic-title"
                className="font-body text-sm text-[#1F2933]/70"
              >
                Title *
              </Label>
              <Input
                id="topic-title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="e.g. Personal Growth"
                className="mt-1.5 font-body"
              />
            </div>
            <div>
              <Label
                htmlFor="topic-desc"
                className="font-body text-sm text-[#1F2933]/70"
              >
                Description *
              </Label>
              <Textarea
                id="topic-desc"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Brief description of this topic area"
                className="mt-1.5 font-body resize-none"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              data-ocid="admin.topics.cancel_button"
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              data-ocid="admin.topics.save_button"
              onClick={handleSave}
              disabled={isPending}
              className="btn-gold"
            >
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editingTopic ? "Update Topic" : "Add Topic"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading text-[#1F2933]">
              Delete Topic Card?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body text-[#1F2933]/50">
              This will permanently remove this topic card from the homepage.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.topics.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="admin.topics.confirm_button"
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
