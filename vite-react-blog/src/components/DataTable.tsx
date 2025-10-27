import React, { useState, useMemo, useRef } from 'react'
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid'
import { process, State } from '@progress/kendo-data-query'
import { ExcelExport } from '@progress/kendo-react-excel-export'
import type { TableColumn, TableRow } from '../data/posts'

type Props = {
  columns?: TableColumn[]
  rows?: TableRow[]
}

const DataTable: React.FC<Props> = ({ columns = [], rows = [] }) => {
  const [query, setQuery] = useState('')
  const [state, setState] = useState<State>({ 
    sort: [], 
    filter: undefined, 
    skip: 0, 
    take: 10 
  })
  const excelRef = useRef<ExcelExport | null>(null)

  const filtered = useMemo(() => {
    if (!query.trim()) return rows
    const q = query.toLowerCase()
    return rows.filter((r) => 
      Object.values(r).some((v) => String(v).toLowerCase().includes(q))
    )
  }, [rows, query])

  const data = process(filtered, state)
  
  const exportExcel = () => excelRef.current?.save()

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
            className="input k-textbox" 
            placeholder="Szukaj w tabeli…" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>
        <button 
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" 
          onClick={exportExcel}
        >
          Eksport do Excel
        </button>
      </div>
      
      <ExcelExport ref={excelRef} data={filtered} fileName={`tabela_${Date.now()}.xlsx`}>
        <Grid
          style={{ height: 520 }}
          data={data.data}
          sortable
          filterable
          pageable={{ 
            pageSizes: [5, 10, 20, 50], 
            buttonCount: 5 
          }}
          total={data.total}
          skip={state.skip}
          take={state.take}
          sort={state.sort}
          filter={state.filter}
          onDataStateChange={(e) => setState(e.dataState)}
          resizable
          reorderable
          selectable={{ enabled: true, mode: 'single' }}
        >
          <GridToolbar>
            <span style={{ padding: '0 12px', color: '#656565' }}>
              Sortuj kolumny, filtruj dane, przeciągaj kolumny
            </span>
          </GridToolbar>
          {columns.map((c) => (
            <Column 
              key={c.field} 
              field={c.field} 
              title={c.title} 
              width={c.width || 200} 
            />
          ))}
        </Grid>
      </ExcelExport>
    </div>
  )
}

export default DataTable