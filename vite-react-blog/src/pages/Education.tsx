import React from 'react';

const Education: React.FC = () => {
    return (
        <div className="container">
            <div style={{ 
                marginBottom: '40px',
                padding: '24px',
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 2px 12px rgba(37, 66, 82, 0.08)',
                borderLeft: '4px solid #F9982F'
            }}>
                <h1 style={{ 
                    fontSize: '36px', 
                    marginBottom: '8px',
                    background: 'linear-gradient(135deg, #254252 0%, #171C2D 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    Edukacja
                </h1>
                <p style={{ color: '#666', fontSize: '16px', margin: 0 }}>
                    Materiały edukacyjne i przewodniki dotyczące danych publicznych
                </p>
            </div>

            <div className="card">
                <h2 style={{ color: '#254252', marginBottom: '16px', fontSize: '22px' }}>
                    📚 Jak korzystać z portalu?
                </h2>
                <p style={{ lineHeight: '1.8', color: '#333' }}>
                    Portal Jawna Gdynia udostępnia interaktywne raporty i analizy danych publicznych 
                    Miasta Gdynia. Wszystkie tabele można sortować, filtrować i eksportować do formatu Excel.
                </p>
            </div>

            <div className="card">
                <h2 style={{ color: '#254252', marginBottom: '16px', fontSize: '22px' }}>
                    🔧 Podstawowe funkcje tabel
                </h2>
                <ul style={{ lineHeight: '1.8', color: '#333', paddingLeft: '24px' }}>
                    <li style={{ marginBottom: '8px' }}>
                        <strong style={{ color: '#E37239' }}>Sortowanie</strong> - kliknij nagłówek kolumny, aby posortować dane
                    </li>
                    <li style={{ marginBottom: '8px' }}>
                        <strong style={{ color: '#E37239' }}>Filtrowanie</strong> - użyj ikon filtra w nagłówkach kolumn
                    </li>
                    <li style={{ marginBottom: '8px' }}>
                        <strong style={{ color: '#E37239' }}>Wyszukiwanie</strong> - wpisz frazę w polu wyszukiwania nad tabelą
                    </li>
                    <li style={{ marginBottom: '8px' }}>
                        <strong style={{ color: '#E37239' }}>Eksport</strong> - kliknij przycisk "Eksport do Excel" aby pobrać dane
                    </li>
                    <li style={{ marginBottom: '8px' }}>
                        <strong style={{ color: '#E37239' }}>Paginacja</strong> - przełączaj strony lub zmień liczbę wierszy na stronie
                    </li>
                    <li style={{ marginBottom: '8px' }}>
                        <strong style={{ color: '#E37239' }}>Przeciąganie kolumn</strong> - możesz zmienić kolejność kolumn
                    </li>
                </ul>
            </div>

            <div className="card">
                <h2 style={{ color: '#254252', marginBottom: '16px', fontSize: '22px' }}>
                    🔗 Dodatkowe zasoby
                </h2>
                <p style={{ lineHeight: '1.8', color: '#333' }}>
                    Więcej informacji o danych publicznych i transparentności znajdziesz na profilu{' '}
                    <a 
                        href="https://www.facebook.com/profile.php?id=100007185166970" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ 
                            color: '#E37239',
                            fontWeight: '600',
                            textDecoration: 'none',
                            borderBottom: '2px solid transparent',
                            transition: 'border-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = '#E37239'}
                        onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}
                    >
                        Grzegorz Bońdos
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Education;
