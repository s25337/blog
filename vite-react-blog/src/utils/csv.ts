// This file contains utility functions for handling CSV data.

export const exportToCSV = (data: any[], filename: string) => {
    const csvContent = data.map(row => Object.values(row).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const parseCSV = (csvString: string): any[] => {
    const rows = csvString.split("\n").map(row => row.split(","));
    const headers = rows[0];
    return rows.slice(1).map(row => {
        return row.reduce((acc, value, index) => {
            acc[headers[index]] = value;
            return acc;
        }, {} as any);
    });
};