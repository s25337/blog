import { useState } from 'react';

const usePagination = (data: any[], itemsPerPage: number) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const currentData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return data.slice(startIndex, startIndex + itemsPerPage);
    };

    return { currentData, totalPages, paginate, currentPage };
};

export default usePagination;