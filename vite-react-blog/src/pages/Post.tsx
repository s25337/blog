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
                <h1 style={{ marginTop: 0 }}>{post.title}</h1>
                <p style={{ color: '#8aa0b4' }}>{new Date(post.date).toLocaleDateString('pl-PL')}</p>
                <p>{post.content}</p>
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