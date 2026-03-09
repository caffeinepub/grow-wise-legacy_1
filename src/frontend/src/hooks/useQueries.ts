import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Article, Guide, Tool, TopicCard } from "../backend.d";
import { useActor } from "./useActor";

// ── Query Keys ────────────────────────────────────────────────────────────────
export const QUERY_KEYS = {
  articles: ["articles"] as const,
  guides: ["guides"] as const,
  tools: ["tools"] as const,
  topicCards: ["topicCards"] as const,
  isAdmin: ["isAdmin"] as const,
};

// ── Read Queries ──────────────────────────────────────────────────────────────

export function useGetArticles() {
  const { actor, isFetching } = useActor();
  return useQuery<Article[]>({
    queryKey: QUERY_KEYS.articles,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getArticles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetGuides() {
  const { actor, isFetching } = useActor();
  return useQuery<Guide[]>({
    queryKey: QUERY_KEYS.guides,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGuides();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTools() {
  const { actor, isFetching } = useActor();
  return useQuery<Tool[]>({
    queryKey: QUERY_KEYS.tools,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTools();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTopicCards() {
  const { actor, isFetching } = useActor();
  return useQuery<TopicCard[]>({
    queryKey: QUERY_KEYS.topicCards,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTopicCards();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: QUERY_KEYS.isAdmin,
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Article Mutations ─────────────────────────────────────────────────────────

export function useAddArticle() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      summary: string;
      category: string;
      content: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addArticle(
        data.title,
        data.summary,
        data.category,
        data.content,
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.articles }),
  });
}

export function useUpdateArticle() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      title: string;
      summary: string;
      category: string;
      content: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateArticle(
        data.id,
        data.title,
        data.summary,
        data.category,
        data.content,
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.articles }),
  });
}

export function useDeleteArticle() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteArticle(id);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.articles }),
  });
}

// ── Guide Mutations ───────────────────────────────────────────────────────────

export function useAddGuide() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { title: string; description: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addGuide(data.title, data.description);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.guides }),
  });
}

export function useUpdateGuide() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      title: string;
      description: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateGuide(data.id, data.title, data.description);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.guides }),
  });
}

export function useDeleteGuide() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteGuide(id);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.guides }),
  });
}

// ── Tool Mutations ────────────────────────────────────────────────────────────

export function useAddTool() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      description: string;
      link: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addTool(data.name, data.description, data.link);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tools }),
  });
}

export function useUpdateTool() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      name: string;
      description: string;
      link: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateTool(data.id, data.name, data.description, data.link);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tools }),
  });
}

export function useDeleteTool() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteTool(id);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tools }),
  });
}

// ── Topic Card Mutations ──────────────────────────────────────────────────────

export function useAddTopicCard() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { title: string; description: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addTopicCard(data.title, data.description);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.topicCards }),
  });
}

export function useUpdateTopicCard() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      title: string;
      description: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateTopicCard(data.id, data.title, data.description);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.topicCards }),
  });
}

export function useDeleteTopicCard() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteTopicCard(id);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.topicCards }),
  });
}

// ── Newsletter Mutation ───────────────────────────────────────────────────────

export function useAddSubscriber() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.addSubscriber(email);
    },
  });
}
