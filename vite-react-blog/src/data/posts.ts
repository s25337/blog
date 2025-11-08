export type TableColumn = { field: string; title: string; width?: number };
export type TableRow = Record<string, any>;

export type Post = {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  content: string;
  // optional: load table from public/ (e.g. /data/budzet.xlsx)
  excel?: { file: string };
  // optional inline table
  table?: { columns: TableColumn[]; rows: TableRow[] };
}

export const posts: Post[] = [
  {
    id: '3',
    slug: 'inwestycje-9-miesiecy-2025',
    title: 'Inwestycje po 9 miesiącach roku 2025. Gdynia stoi w miejscu',
    date: '2025-10-27',
    excerpt: 'Po trzech kwartałach 2025 roku inwestycje w Gdyni praktycznie się zatrzymały. Wykonano 23% planu, zaangażowanie 52%.',
    content: `Po trzech kwartałach 2025 roku inwestycje w Gdyni praktycznie się zatrzymały.

Z danych wynika, że na koniec września **wykonano 23% planu inwestycyjnego**, a **zaangażowanie sięga 52%**. Należy zauważyć, że część umów może jeszcze zostać rozwiązana.

## Kluczowe obszary

### Gospodarka mieszkaniowa
- **Zaangażowanie:** ok. 2%
- **Wykonanie:** 1%

Realnie oznacza to całkowity brak postępu w budowie lub modernizacji zasobu mieszkaniowego.

### Edukacja
- **Zaangażowanie:** tylko 9,5%
- **Wykonanie:** 4%

Z **16,3 mln zł** planowanych na szkoły podstawowe wydano zaledwie **2,6%**, co oznacza, że modernizacje budynków oświatowych praktycznie nie ruszyły.

### Gospodarka komunalna
- **Zaangażowanie:** 20%
- **Wykonanie:** 6%

To najmocniej odczuwalny obszar - inwestycje infrastrukturalne są w stanie głębokiego zastoju.

### Podsumowanie całkowite


- **Plan inwestycji (tzw. „6-ki"):** 298 mln zł
- **Zaangażowanie:** 155 mln zł (52%)
- **Wydatki faktycznie poniesione:** 70 mln zł (23%)

### Dla porównania
Wydatki bieżące (tzw. „4-ki") są realizowane na poziomie **ponad 91% zaangażowania** i **69% faktycznego wykonania**.

---

Poczekamy jeszcze 3 miesiące, ale już teraz wygląda, że **2025 rok może być najgorszym rokiem inwestycyjnym w historii Gdyni** (szczególnie w Edukacji i gospodarce komunalnej).`,
    excel: { file: '/data/analiza2.xlsx' }
  },
  {
    id: '2',
    slug: 'raport-budzetu-2025',
    title: 'Sprawozdanie z wykonania planu wydatków za III kwartał 2025 r.',
    date: '2025-10-20',
    excerpt: 'Raport za ostatnie 9 miesiecy',
    content: '',
    excel: { file: '/data/analiza.xlsx' }
  }
];