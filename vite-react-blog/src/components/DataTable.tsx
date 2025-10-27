import React, { useMemo, useRef, useState, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ModuleRegistry, AllCommunityModule, themeQuartz } from 'ag-grid-community'
import type { GridApi, ColDef, GridReadyEvent } from 'ag-grid-community'
// Using AG Grid Theming API (no CSS file themes)
import type { TableColumn, TableRow } from '../data/posts'
import * as XLSX from 'xlsx'

// Register AG Grid Community modules once
ModuleRegistry.registerModules([AllCommunityModule])

type Props = {
  columns?: TableColumn[]
  rows?: TableRow[]
}

const DataTable: React.FC<Props> = ({ columns = [], rows = [] }) => {
  const [quickFilter, setQuickFilter] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const gridApiRef = useRef<GridApi<TableRow> | null>(null)

  const inferredColumns: TableColumn[] = useMemo(() => {
    if (columns && columns.length > 0) return columns
    if (rows && rows.length > 0) {
      const keys = Object.keys(rows[0] || {})
      return keys.map((k) => ({ field: k, title: k }))
    }
    return []
  }, [columns, rows])

  const columnDefs = useMemo<ColDef<TableRow>[]>(() => {
    return inferredColumns.map<ColDef<TableRow>>((c) => ({
      headerName: c.title || c.field,
      field: c.field,
      width: c.width,
      minWidth: 120,
      sortable: true,
      filter: true,
      resizable: true,
    }))
  }, [inferredColumns])

  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: true,
  }), [])

  const onGridReady = useCallback((params: GridReadyEvent) => {
    gridApiRef.current = params.api as GridApi<TableRow>
    // Ustawienia początkowe poprzez setGridOption (nowe API AG Grid)
    gridApiRef.current.setGridOption('domLayout', 'normal')
    gridApiRef.current.setGridOption('quickFilterText', quickFilter)
    gridApiRef.current.setGridOption('paginationPageSize', pageSize)
    // dopasuj kolumny przy pierwszym renderze
    setTimeout(() => gridApiRef.current?.sizeColumnsToFit(), 0)
  }, [quickFilter, pageSize])

  const onQuickFilterChange = (val: string) => {
    setQuickFilter(val)
    if (gridApiRef.current) gridApiRef.current.setGridOption('quickFilterText', val)
  }

  const exportToExcel = () => {
    // Pobierz wiersze po filtrach i sortowaniu
    const rowsToExport: TableRow[] = []
    gridApiRef.current?.forEachNodeAfterFilterAndSort((node) => {
      if (node.data) rowsToExport.push(node.data as TableRow)
    })

    // Budowa arkusza przez SheetJS
    const ws = XLSX.utils.json_to_sheet(rowsToExport)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Dane')
    XLSX.writeFile(wb, `tabela_${Date.now()}.xlsx`)
  }

  if (!rows || rows.length === 0) {
    return <div className="card"><p>Brak danych do wyświetlenia</p></div>
  }

  return (
    <div className="card grid-card" style={{ marginTop: '20px' }}>
      <div className="toolbar" style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        margin: '12px 8px'
      }}>
        <div style={{ flex: 1 }}>
          <input
            placeholder="Szukaj w tabeli…"
            value={quickFilter}
            onChange={(e) => onQuickFilterChange(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #E0E0E0',
              fontSize: '14px'
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#E37239')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#E0E0E0')}
          />
        </div>
        <select
          value={pageSize}
          onChange={(e) => {
            const size = Number(e.target.value)
            setPageSize(size)
            gridApiRef.current?.setGridOption('paginationPageSize', size)
          }}
          style={{
            padding: '8px 10px',
            borderRadius: '8px',
            border: '1px solid #E0E0E0',
            color: '#254252'
          }}
        >
          {[5, 10, 20, 50].map((s) => (
            <option key={s} value={s}>{s}/stronę</option>
          ))}
        </select>
        <button
          onClick={exportToExcel}
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #E37239',
            background: '#FFF4ED',
            color: '#E37239',
            fontWeight: 600,
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#FFE8D9'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FFF4ED'
          }}
        >
          Eksport do Excel
        </button>
      </div>

      <div style={{ width: '100%', height: 520 }}>
        <AgGridReact
          theme={themeQuartz}
          rowData={rows}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={{ mode: 'singleRow', enableClickSelection: false }}
          animateRows
          pagination
          paginationPageSize={pageSize}
          paginationPageSizeSelector={false}
          onGridReady={onGridReady}
        />
      </div>
      <div style={{ padding: '8px 12px', color: '#656565' }}>
        Sortuj, filtruj, przeciągaj kolumny. Eksport działa na danych po filtrze i sortowaniu.
      </div>
    </div>
  )
}

export default DataTable