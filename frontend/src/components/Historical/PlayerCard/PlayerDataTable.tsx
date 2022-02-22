import { useMemo } from 'react'
import { AgGridReact } from '@ag-grid-community/react'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'

import '@ag-grid-community/core/dist/styles/ag-grid.css'
import '@ag-grid-community/core/dist/styles/ag-theme-material.css'

import type { gameHistorical } from '../../../utils/types'

interface propTypes {
  data: gameHistorical[]
}

// In the future, here could also be displayed games' outcomes, etc.
export default function PlayerDataTable({ data }: propTypes) {

  // Defining the data and columns, memoized to prevent unnecessary updates.
  const tableData = useMemo(() => data, [data])

  const columnDefs = useMemo(() => [
    {
      headerName: 'Date',
      field: 'date',
      valueFormatter: (row: {value: string}) => (new Date(row.value)).toLocaleString(),
      filter: 'agDateColumnFilter',
      filterParams: {defaultOption: 'inRange'},
      flex: 1.5,
    },
    {
      headerName: 'Player One',
      field: 'first_name',
      flex: 1.25,
    },
    {
      headerName: 'Hand',
      field: 'first_played',
      flex: 1,
    },
    {
      headerName: 'Player Two',
      field: 'second_name',
      flex: 1.25,
    },
    {
      headerName: 'Hand',
      field: 'second_played',
      flex: 1,
    },
  ], [])

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    suppressMenu: true,
    floatingFilter: true,
  }), [])

  const modules = useMemo(() => [ClientSideRowModelModule], [])

  return (
  <div style={{height: '80vh', width: '78vw'}}>
    <AgGridReact
      className='ag-theme-material'
      animateRows={true}
      modules={modules}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      rowData={tableData}>
    </AgGridReact>
  </div>
  )
}