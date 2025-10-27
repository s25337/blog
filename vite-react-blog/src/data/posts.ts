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
    id: '1',
    slug: 'sample-post',
    title: 'Sample Post — Getting started',
    date: '2025-10-27',
    excerpt: 'Krótki wpis pokazowy używany do testów aplikacji.',
    content: 'To jest przykładowy wpis — możesz podmienić zawartość na własną.',
  },
  {
    id: '2',
    slug: 'raport-budzetu-2025',
    title: 'Raport budżetu 2025 – wydatki i dochody',
    date: '2025-10-20',
    excerpt: 'Raport za ostatnie 9 miesiecy',
    content: 'teksast tekst ',
    excel: { file: '/data/analiza.xlsx' }
  }
];