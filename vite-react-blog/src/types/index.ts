export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface TableData {
    [key: string]: any;
}

export interface Pagination {
    currentPage: number;
    totalPages: number;
    pageSize: number;
}

export interface ExportOptions {
    format: 'csv' | 'excel';
    fileName: string;
}