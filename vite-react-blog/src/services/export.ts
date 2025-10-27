import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export const exportToCSV = (data: any[], filename: string) => {
    const csvData = data.map(row => Object.values(row).join(',')).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${filename}.csv`);
};

export const exportToExcel = (data: any[], filename: string) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${filename}.xlsx`);
};