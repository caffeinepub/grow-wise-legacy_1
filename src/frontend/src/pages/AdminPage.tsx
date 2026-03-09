import { ArticlesAdmin } from "@/components/admin/ArticlesAdmin";
import { GuidesAdmin } from "@/components/admin/GuidesAdmin";
import { ToolsAdmin } from "@/components/admin/ToolsAdmin";
import { TopicsAdmin } from "@/components/admin/TopicsAdmin";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useIsCallerAdmin } from "@/hooks/useQueries";
import { LayoutDashboard, Loader2, LogIn, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";

export function AdminPage() {
  const { identity, login, isInitializing, isLoggingIn } =
    useInternetIdentity();
  const { data: isAdmin, isLoading: checkingAdmin } = useIsCallerAdmin();
  const isAuthenticated = !!identity;

  const isLoading = isInitializing || checkingAdmin;

  // Loading state
  if (isLoading) {
    return (
      <AdminShell>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Loader2 className="w-10 h-10 text-[#C9A227] animate-spin" />
          <p className="font-body text-[#1F2933]/50 text-sm">
            {isInitializing ? "Initializing..." : "Checking permissions..."}
          </p>
        </div>
      </AdminShell>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <AdminShell>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
          <div className="w-16 h-16 rounded-full bg-[#1F2933]/5 flex items-center justify-center">
            <LogIn className="w-8 h-8 text-[#C9A227]" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-2xl text-[#1F2933] mb-2">
              Admin Access Required
            </h2>
            <p className="font-body text-[#1F2933]/50 text-sm max-w-xs mx-auto">
              Log in with Internet Identity to access the content management
              panel.
            </p>
          </div>
          <Button
            onClick={login}
            disabled={isLoggingIn}
            className="btn-gold px-8 py-3 text-sm font-heading gap-2"
          >
            {isLoggingIn ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogIn className="w-4 h-4" />
            )}
            {isLoggingIn ? "Connecting..." : "Log In to Admin"}
          </Button>
        </div>
      </AdminShell>
    );
  }

  // Authenticated but not admin
  if (!isAdmin) {
    return (
      <AdminShell>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
            <ShieldAlert className="w-8 h-8 text-red-400" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-2xl text-[#1F2933] mb-2">
              Access Denied
            </h2>
            <p className="font-body text-[#1F2933]/50 text-sm max-w-sm mx-auto">
              Your account doesn't have admin privileges for this platform.
              Contact the site owner if you believe this is a mistake.
            </p>
          </div>
          <a
            href="/"
            className="font-body text-[#C9A227] text-sm hover:underline"
          >
            ← Back to homepage
          </a>
        </div>
      </AdminShell>
    );
  }

  // Admin panel
  return (
    <AdminShell>
      <div className="max-w-4xl mx-auto">
        {/* Admin header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <LayoutDashboard className="w-5 h-5 text-[#C9A227]" />
            <h1 className="font-heading font-bold text-2xl text-[#1F2933]">
              Content Management
            </h1>
          </div>
          <p className="font-body text-[#1F2933]/50 text-sm ml-8">
            Manage all content on Grow Wise Legacy
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="articles">
          <TabsList
            data-ocid="admin.tab"
            className="bg-[#F9FAFB] border border-[#1F2933]/8 rounded-lg p-1 mb-6 w-full grid grid-cols-4"
          >
            <TabsTrigger
              value="articles"
              data-ocid="admin.articles.tab"
              className="font-body text-sm data-[state=active]:bg-white data-[state=active]:text-[#1F2933] data-[state=active]:shadow-xs"
            >
              Articles
            </TabsTrigger>
            <TabsTrigger
              value="guides"
              data-ocid="admin.guides.tab"
              className="font-body text-sm data-[state=active]:bg-white data-[state=active]:text-[#1F2933] data-[state=active]:shadow-xs"
            >
              Guides
            </TabsTrigger>
            <TabsTrigger
              value="tools"
              data-ocid="admin.tools.tab"
              className="font-body text-sm data-[state=active]:bg-white data-[state=active]:text-[#1F2933] data-[state=active]:shadow-xs"
            >
              Tools
            </TabsTrigger>
            <TabsTrigger
              value="topics"
              data-ocid="admin.topics.tab"
              className="font-body text-sm data-[state=active]:bg-white data-[state=active]:text-[#1F2933] data-[state=active]:shadow-xs"
            >
              Topics
            </TabsTrigger>
          </TabsList>

          <div className="bg-white rounded-xl border border-[#1F2933]/8 shadow-xs p-6">
            <TabsContent value="articles" className="m-0">
              <ArticlesAdmin />
            </TabsContent>
            <TabsContent value="guides" className="m-0">
              <GuidesAdmin />
            </TabsContent>
            <TabsContent value="tools" className="m-0">
              <ToolsAdmin />
            </TabsContent>
            <TabsContent value="topics" className="m-0">
              <TopicsAdmin />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AdminShell>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Admin top bar */}
      <header className="bg-[#1F2933] border-b border-white/8 px-4 sm:px-6 py-4 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a
            href="/"
            className="text-gold-gradient font-heading font-bold text-lg"
          >
            Grow Wise Legacy
          </a>
          <span className="text-white/40 text-xs font-body tracking-widest uppercase">
            Admin Panel
          </span>
          <a
            href="/"
            className="text-white/40 hover:text-[#C9A227] text-xs font-body transition-colors"
          >
            ← Back to site
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">{children}</main>

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
