import React from 'react';

const Education: React.FC = () => {
    return (
        <div className="container">
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '32px', marginBottom: '8px', color: '#254252' }}>
                    Edukacja
                </h1>
                <p style={{ color: '#666', fontSize: '16px', margin: 0 }}>
                    Materiały edukacyjne i przewodniki dotyczące danych publicznych
                </p>
            </div>

            <div className="card">
                <h2 style={{ color: '#254252', marginBottom: '16px' }}>Jak korzystać z portalu?</h2>
                <p style={{ lineHeight: '1.8', color: '#333' }}>
                    Portal Jawna Gdynia udostępnia interaktywne raporty i analizy danych publicznych 
                    Miasta Gdynia. Wszystkie tabele można sortować, filtrować i eksportować do formatu Excel.
                </p>
            </div>

            <div className="card">
                <h2 style={{ color: '#254252', marginBottom: '16px' }}>Podstawowe funkcje tabel</h2>
                <ul style={{ lineHeight: '1.8', color: '#333' }}>
                    <li><strong>Sortowanie</strong> - kliknij nagłówek kolumny, aby posortować dane</li>
                    <li><strong>Filtrowanie</strong> - użyj ikon filtra w nagłówkach kolumn</li>
                    <li><strong>Wyszukiwanie</strong> - wpisz frazę w polu wyszukiwania nad tabelą</li>
                    <li><strong>Eksport</strong> - kliknij przycisk "Eksport do Excel" aby pobrać dane</li>
                    <li><strong>Paginacja</strong> - przełączaj strony lub zmień liczbę wierszy na stronie</li>
                    <li><strong>Przeciąganie kolumn</strong> - możesz zmienić kolejność kolumn</li>
                </ul>
            </div>

            <div className="card">
                <h2 style={{ color: '#254252', marginBottom: '16px' }}>Dodatkowe zasoby</h2>
                <p style={{ lineHeight: '1.8', color: '#333' }}>
                    Więcej informacji o danych publicznych i transparentności znajdziesz na stronie 
                </p>
            </div>
        </div>
    );
};

export default Education;
