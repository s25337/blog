import React from 'react';
import PostCard from '../components/PostCard';
import { useEffect, useState } from 'react';
import { fetchPosts } from '../services/api';

interface Post {
    id: string | number;
    title: string;
    content: string;
    excerpt?: string;
    slug: string;
    date?: string;
}

type SortOrder = 'newest' | 'oldest';

const Reports: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    useEffect(() => {
        const getPosts = async () => {
            const data = await fetchPosts();
            setPosts(data);
        };

        getPosts();
    }, []);

    const filteredAndSortedPosts = posts
        .filter(post => {
            if (!searchQuery.trim()) return true;
            const query = searchQuery.toLowerCase();
            return (
                post.title.toLowerCase().includes(query) ||
                post.excerpt?.toLowerCase().includes(query) ||
                post.content.toLowerCase().includes(query)
            );
        })
        .sort((a, b) => {
            const dateA = new Date(a.date || '').getTime();
            const dateB = new Date(b.date || '').getTime();
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });

    return (
        <div className="container">
            <div style={{ 
                marginBottom: '40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '24px',
                flexWrap: 'wrap',
                padding: '24px',
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 2px 12px rgba(37, 66, 82, 0.08)',
                borderLeft: '4px solid #E37239'
            }}>
                <div>
                    <h1 style={{ 
                        fontSize: '36px', 
                        marginBottom: '8px',
                        background: 'linear-gradient(135deg, #254252 0%, #171C2D 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Raporty i Analizy
                    </h1>
                    <p style={{ color: '#666', fontSize: '16px', margin: 0 }}>
                        Przejrzyste dane publiczne z interaktywnymi tabelami
                    </p>
                </div>
                <div style={{ 
                    minWidth: '300px', 
                    maxWidth: '400px',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center'
                }}>
                    <input
                        type="text"
                        placeholder="Szukaj raportów..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            flex: 1,
                            padding: '12px 16px',
                            border: '1px solid #E0E0E0',
                            borderRadius: '8px',
                            fontSize: '15px',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#E37239'}
                        onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
                    />
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setShowFilterMenu(!showFilterMenu)}
                            style={{
                                padding: '12px 16px',
                                border: '1px solid #E0E0E0',
                                borderRadius: '8px',
                                background: 'white',
                                color: '#666',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#E37239';
                                e.currentTarget.style.color = '#E37239';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#E0E0E0';
                                e.currentTarget.style.color = '#666';
                            }}
                        >
                            Filtruj
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                                <path d="M6 8L3 5h6z"/>
                            </svg>
                        </button>
                        {showFilterMenu && (
                            <div style={{
                                position: 'absolute',
                                top: 'calc(100% + 4px)',
                                right: 0,
                                background: 'white',
                                border: '1px solid #E0E0E0',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                zIndex: 100,
                                minWidth: '150px'
                            }}>
                                <button
                                    onClick={() => {
                                        setSortOrder('newest');
                                        setShowFilterMenu(false);
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '10px 16px',
                                        border: 'none',
                                        background: sortOrder === 'newest' ? '#f0f0f0' : 'transparent',
                                        color: sortOrder === 'newest' ? '#E37239' : '#666',
                                        fontWeight: sortOrder === 'newest' ? '600' : '500',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        textAlign: 'left',
                                        borderRadius: '8px 8px 0 0',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (sortOrder !== 'newest') {
                                            e.currentTarget.style.background = '#f5f5f5';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (sortOrder !== 'newest') {
                                            e.currentTarget.style.background = 'transparent';
                                        }
                                    }}
                                >
                                    Najnowsze
                                </button>
                                <button
                                    onClick={() => {
                                        setSortOrder('oldest');
                                        setShowFilterMenu(false);
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '10px 16px',
                                        border: 'none',
                                        background: sortOrder === 'oldest' ? '#f0f0f0' : 'transparent',
                                        color: sortOrder === 'oldest' ? '#E37239' : '#666',
                                        fontWeight: sortOrder === 'oldest' ? '600' : '500',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        textAlign: 'left',
                                        borderRadius: '0 0 8px 8px',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (sortOrder !== 'oldest') {
                                            e.currentTarget.style.background = '#f5f5f5';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (sortOrder !== 'oldest') {
                                            e.currentTarget.style.background = 'transparent';
                                        }
                                    }}
                                >
                                    Najstarsze
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {filteredAndSortedPosts.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
                    <p style={{ color: '#666', margin: 0 }}>
                        Nie znaleziono raportów pasujących do wyszukiwania.
                    </p>
                </div>
            ) : (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                    gap: '24px'
                }}>
                    {filteredAndSortedPosts.map(post => (
                        <PostCard key={post.id} {...post} excerpt={post.excerpt || ''} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Reports;
