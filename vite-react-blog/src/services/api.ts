import { posts } from '../data/posts'
import type { Post } from '../data/posts'

export async function fetchPosts(): Promise<Post[]> {
    // simple shim — replace with real HTTP calls if needed
    return posts
}

export async function fetchPostBySlug(slug: string): Promise<Post | undefined> {
    return posts.find(p => p.slug === slug)
}