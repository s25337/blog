import { useEffect, useMemo, useState } from 'react'
import * as XLSX from 'xlsx'
import DataTable from './DataTable'
import type { TableColumn, TableRow } from '../data/posts'

export default function ExcelTable({ file }: { file: string }) {
  const [columns, setColumns] = useState<TableColumn[] | null>(null)
  const [rows, setRows] = useState<TableRow[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch(file)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const buf = await res.arrayBuffer()
        const wb = XLSX.read(buf, { type: 'array', cellStyles: true })
        const first = wb.SheetNames[0]
        const ws = wb.Sheets[first]
        
        // Konwersja z zachowaniem formatowania
        const aoa = XLSX.utils.sheet_to_json<any[]>(ws, { 
          header: 1, 
          defval: '',
          raw: false  // zachowaj formatowanie (daty, liczby itp.)
        }) as any[][]
        
        if (!aoa.length) throw new Error('Pusty arkusz')
        
        const headers = aoa[0].map((h, i) => (h == null || h === '' ? `Kolumna ${i + 1}` : String(h)))
        const dataRows = aoa.slice(1).filter(row => row.some(cell => cell !== '' && cell != null))

        // Oblicz szerokość kolumn na podstawie zawartości
        const colWidths = headers.map((_, colIndex) => {
          const maxLength = Math.max(
            headers[colIndex]?.toString().length || 0,
            ...dataRows.map(row => row[colIndex]?.toString().length || 0)
          )
          return Math.min(Math.max(maxLength * 10 + 40, 120), 400)
        })

        const cols: TableColumn[] = headers.map((h, i) => ({ 
          field: h, 
          title: h,
          width: colWidths[i]
        }))
        
        const data: TableRow[] = dataRows.map((r) => {
          const obj: TableRow = {}
          headers.forEach((h, i) => { 
            obj[h] = r[i] ?? '' 
          })
          return obj
        })
        
        if (!cancelled) { 
          setColumns(cols)
          setRows(data) 
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Błąd wczytywania pliku XLSX')
      }
    }
    load()
    return () => { cancelled = true }
  }, [file])

  const content = useMemo(() => {
    if (error) return <div className="card"><p>Nie udało się wczytać excela: {error}</p></div>
    if (!columns || !rows) return <div className="card"><p>Ładowanie arkusza…</p></div>
    return <DataTable columns={columns} rows={rows} />
  }, [columns, rows, error])

  return content
}
