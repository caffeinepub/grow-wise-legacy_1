import type { Article } from "@/backend.d";
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
import { Badge } from "@/components/ui/badge";
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
  useAddArticle,
  useDeleteArticle,
  useGetArticles,
  useUpdateArticle,
} from "@/hooks/useQueries";
import { FileText, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ArticleFormData {
  title: string;
  summary: string;
  category: string;
  content: string;
}

const EMPTY_FORM: ArticleFormData = {
  title: "",
  summary: "",
  category: "",
  content: "",
};

export function ArticlesAdmin() {
  const { data: articles, isLoading } = useGetArticles();
  const addMutation = useAddArticle();
  const updateMutation = useUpdateArticle();
  const deleteMutation = useDeleteArticle();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [deletingId, setDeletingId] = useState<bigint | null>(null);
  const [form, setForm] = useState<ArticleFormData>(EMPTY_FORM);

  const isPending = addMutation.isPending || updateMutation.isPending;

  const openAddDialog = () => {
    setEditingArticle(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };

  const openEditDialog = (article: Article) => {
    setEditingArticle(article);
    setForm({
      title: article.title,
      summary: article.summary,
      category: article.category,
      content: article.content,
    });
    setDialogOpen(true);
  };

  const openDeleteDialog = (id: bigint) => {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.summary.trim() || !form.category.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (editingArticle) {
        await updateMutation.mutateAsync({
          id: editingArticle.id,
          ...form,
        });
        toast.success("Article updated successfully");
      } else {
        await addMutation.mutateAsync(form);
        toast.success("Article added successfully");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save article. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (deletingId == null) return;
    try {
      await deleteMutation.mutateAsync(deletingId);
      toast.success("Article deleted");
      setDeleteDialogOpen(false);
    } catch {
      toast.error("Failed to delete article");
    }
  };

  const formatDate = (publishedAt: bigint) => {
    const ms = Number(publishedAt / BigInt(1_000_000));
    if (ms < 1_000_000) return "—";
    return new Date(ms).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div data-ocid="admin.articles.panel">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-semibold text-xl text-[#1F2933]">
            Articles
          </h2>
          <p className="font-body text-[#1F2933]/50 text-sm mt-0.5">
            Manage blog posts and articles
          </p>
        </div>
        <Button
          data-ocid="admin.articles.add_button"
          onClick={openAddDialog}
          className="btn-gold gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Article
        </Button>
      </div>

      {/* List */}
      {isLoading ? (
        <div className="space-y-3">
          {(["1", "2", "3", "4"] as const).map((k) => (
            <Skeleton key={k} className="h-16 rounded-lg" />
          ))}
        </div>
      ) : !articles || articles.length === 0 ? (
        <div
          data-ocid="articles.empty_state"
          className="text-center py-16 bg-[#F9FAFB] rounded-xl border border-[#1F2933]/8"
        >
          <FileText className="w-10 h-10 text-[#1F2933]/20 mx-auto mb-3" />
          <p className="font-heading text-[#1F2933]/40 font-medium">
            No articles yet
          </p>
          <p className="font-body text-[#1F2933]/30 text-sm mt-1">
            Click "Add Article" to create your first post.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {articles.map((article, i) => (
            <div
              key={article.id.toString()}
              data-ocid={`admin.articles.item.${i + 1}`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#1F2933]/8 hover:border-[#C9A227]/30 transition-colors group"
            >
              <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-heading font-medium text-sm text-[#1F2933] truncate">
                    {article.title}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="text-xs py-0 h-5 border-[#C9A227]/40 text-[#8a6e17]"
                  >
                    {article.category}
                  </Badge>
                  <span className="text-xs font-body text-[#1F2933]/35">
                    {formatDate(article.publishedAt)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  data-ocid={`admin.articles.edit_button.${i + 1}`}
                  variant="ghost"
                  size="sm"
                  onClick={() => openEditDialog(article)}
                  className="h-8 w-8 p-0 text-[#1F2933]/40 hover:text-[#1F2933] hover:bg-[#1F2933]/5"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                  data-ocid={`admin.articles.delete_button.${i + 1}`}
                  variant="ghost"
                  size="sm"
                  onClick={() => openDeleteDialog(article.id)}
                  className="h-8 w-8 p-0 text-[#1F2933]/40 hover:text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          data-ocid="admin.articles.dialog"
          className="max-w-lg max-h-[90vh] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle className="font-heading text-[#1F2933]">
              {editingArticle ? "Edit Article" : "New Article"}
            </DialogTitle>
            <DialogDescription className="font-body text-[#1F2933]/50 text-sm">
              {editingArticle
                ? "Update the article details below."
                : "Fill in the details to publish a new article."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <Label
                htmlFor="art-title"
                className="font-body text-sm text-[#1F2933]/70"
              >
                Title *
              </Label>
              <Input
                id="art-title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Article title"
                className="mt-1.5 font-body"
              />
            </div>
            <div>
              <Label
                htmlFor="art-category"
                className="font-body text-sm text-[#1F2933]/70"
              >
                Category *
              </Label>
              <Input
                id="art-category"
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                placeholder="e.g. Personal Growth, Wealth, Lifestyle"
                className="mt-1.5 font-body"
              />
            </div>
            <div>
              <Label
                htmlFor="art-summary"
                className="font-body text-sm text-[#1F2933]/70"
              >
                Summary *
              </Label>
              <Textarea
                id="art-summary"
                value={form.summary}
                onChange={(e) =>
                  setForm((f) => ({ ...f, summary: e.target.value }))
                }
                placeholder="A brief summary of the article (1-2 sentences)"
                className="mt-1.5 font-body resize-none"
                rows={2}
              />
            </div>
            <div>
              <Label
                htmlFor="art-content"
                className="font-body text-sm text-[#1F2933]/70"
              >
                Content
              </Label>
              <Textarea
                id="art-content"
                value={form.content}
                onChange={(e) =>
                  setForm((f) => ({ ...f, content: e.target.value }))
                }
                placeholder="Full article content (markdown supported)"
                className="mt-1.5 font-body resize-none"
                rows={8}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              data-ocid="admin.articles.cancel_button"
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              data-ocid="admin.articles.save_button"
              onClick={handleSave}
              disabled={isPending}
              className="btn-gold"
            >
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editingArticle ? "Update Article" : "Publish Article"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading text-[#1F2933]">
              Delete Article?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body text-[#1F2933]/50">
              This will permanently delete the article and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="admin.articles.cancel_button"
              className="font-body"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="admin.articles.confirm_button"
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 font-body"
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
