import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DataTable from '../components/DataTable';
import ExcelTable from '../components/ExcelTable';
import { fetchPostBySlug } from '../services/api';

const Post: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPost = async () => {
            if (!slug) {
                setError('No slug provided');
                setLoading(false);
                return;
            }

            try {
                const data = await fetchPostBySlug(slug);
                setPost(data);
            } catch (err) {
                setError('Failed to fetch post');
            } finally {
                setLoading(false);
            }
        };

        getPost();
    }, [slug]);

    if (loading) return <div className="container"><div>Loading...</div></div>;
    if (error) return <div className="container"><div>{error}</div></div>;
    if (!post) return <div className="container"><div>Post not found. <Link to="/">Go home</Link></div></div>;

    return (
        <div className="container">
            <article className="card">
                <h1 style={{ marginTop: 0, color: '#254252' }}>{post.title}</h1>
                <p style={{ color: '#F9982F', fontSize: '14px', fontWeight: '600' }}>
                    {new Date(post.date).toLocaleDateString('pl-PL', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}
                </p>
                <div 
                    style={{ 
                        lineHeight: '1.8', 
                        color: '#333' 
                    }}
                    dangerouslySetInnerHTML={{ 
                        __html: post.content
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/^## (.*$)/gim, '<h2 style="color: #254252; margin-top: 32px; margin-bottom: 16px; font-size: 24px;">$1</h2>')
                            .replace(/^### (.*$)/gim, '<h3 style="color: #254252; margin-top: 24px; margin-bottom: 12px; font-size: 20px;">$1</h3>')
                            .replace(/^---$/gim, '<hr style="border: none; border-top: 2px solid #E0E0E0; margin: 32px 0;" />')
                            .replace(/\n\n/g, '</p><p style="margin: 16px 0;">')
                            .replace(/^- /gim, '<li>')
                            .replace(/<li>/g, '</p><ul style="margin: 8px 0; padding-left: 24px;"><li>')
                            .replace(/(<li>.*?)\n(?!- )/gs, '$1</li></ul><p style="margin: 16px 0;">')
                    }}
                />
            </article>

            {post.excel ? (
                <ExcelTable file={post.excel.file} />
            ) : post.table ? (
                <DataTable columns={post.table.columns} rows={post.table.rows} />
            ) : null}
        </div>
    );
};

export default Post;