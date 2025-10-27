import React from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { useState } from 'react';
import './BlogGrid.module.css';

const BlogGrid = ({ data }) => {
    const [gridData, setGridData] = useState(data);
    const [exportData, setExportData] = useState([]);

    const handleExport = (event) => {
        setExportData(gridData);
        event.preventDefault();
    };

    return (
        <div>
            <ExcelExport data={exportData}>
                <button onClick={handleExport}>Export to Excel</button>
            </ExcelExport>
            <Grid
                data={gridData}
                pageable
                sortable
                filterable
            >
                <GridColumn field="id" title="ID" />
                <GridColumn field="title" title="Title" />
                <GridColumn field="excerpt" title="Excerpt" />
                <GridColumn field="date" title="Date" />
            </Grid>
        </div>
    );
};

export default BlogGrid;