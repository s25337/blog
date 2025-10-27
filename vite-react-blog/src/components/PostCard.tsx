import React from 'react';
import { Link } from 'react-router-dom';

interface PostCardProps {
    title: string;
    excerpt: string;
    slug: string;
    date?: string;
}

const PostCard: React.FC<PostCardProps> = ({ title, excerpt, slug, date }) => {
    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('pl-PL', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    return (
        <div className="card" style={{ 
            padding: '24px',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 66, 82, 0.15)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }}>
            {date && (
                <div style={{ 
                    color: '#F9982F', 
                    fontSize: '14px', 
                    fontWeight: '600',
                    marginBottom: '12px'
                }}>
                    {formatDate(date)}
                </div>
            )}
            <h2 style={{ 
                color: '#254252', 
                fontSize: '24px',
                marginBottom: '12px',
                fontWeight: '600'
            }}>
                {title}
            </h2>
            <p style={{ 
                color: '#666', 
                lineHeight: '1.6',
                marginBottom: '16px'
            }}>
                {excerpt}
            </p>
            <Link 
                to={`/post/${slug}`}
                style={{
                    color: '#E37239',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '15px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#F9982F';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#E37239';
                }}
            >
                Czytaj więcej →
            </Link>
        </div>
    );
};

export default PostCard;