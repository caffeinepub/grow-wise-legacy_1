import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TopicCard {
    id: bigint;
    title: string;
    description: string;
}
export interface Tool {
    id: bigint;
    link: string;
    name: string;
    description: string;
}
export interface Guide {
    id: bigint;
    title: string;
    description: string;
}
export interface UserProfile {
    name: string;
}
export interface Article {
    id: bigint;
    title: string;
    content: string;
    publishedAt: bigint;
    summary: string;
    category: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addArticle(title: string, summary: string, category: string, content: string): Promise<void>;
    addGuide(title: string, description: string): Promise<void>;
    addSubscriber(email: string): Promise<string>;
    addTool(name: string, description: string, link: string): Promise<void>;
    addTopicCard(title: string, description: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteArticle(id: bigint): Promise<void>;
    deleteGuide(id: bigint): Promise<void>;
    deleteTool(id: bigint): Promise<void>;
    deleteTopicCard(id: bigint): Promise<void>;
    getArticles(): Promise<Array<Article>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getGuides(): Promise<Array<Guide>>;
    getTools(): Promise<Array<Tool>>;
    getTopicCards(): Promise<Array<TopicCard>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedData(): Promise<void>;
    updateArticle(id: bigint, title: string, summary: string, category: string, content: string): Promise<void>;
    updateGuide(id: bigint, title: string, description: string): Promise<void>;
    updateTool(id: bigint, name: string, description: string, link: string): Promise<void>;
    updateTopicCard(id: bigint, title: string, description: string): Promise<void>;
}
