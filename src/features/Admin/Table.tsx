import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import { Button, ButtonGroup } from '@mui/material'

export default function Table() {
  const { columns, rows } = createRowColumn(
    {
      id: {
        headerName: 'No.',
        hideable: false,
        resizable: false,
        width: 50,
      },
      fullName: {
        headerName: 'Full name',
        hideable: false,
        resizable: false,
        flex: 5,
        minWidth: 150,
      },
      blood: {
        headerName: 'Blood',
        hideable: false,
        resizable: false,
        width: 75,
      },
      age: {
        headerName: 'Age',
        align: 'right',
        headerAlign: 'right',
        hideable: false,
        resizable: false,
        width: 75,
      },
      address: {
        headerName: 'Address',
        align: 'right',
        headerAlign: 'right',
        hideable: false,
        resizable: false,
        flex: 10,
        minWidth: 150,
      },
      phone: {
        headerName: 'Phone',
        align: 'right',
        headerAlign: 'right',
        hideable: false,
        resizable: false,
        flex: 5,
        minWidth: 150,
      },
      action: {
        headerName: 'Action',
        align: 'center',
        headerAlign: 'center',
        hideable: false,
        resizable: false,
        sortable: false,
        disableColumnMenu: true,
        width: 170,
        renderCell: () => (
          <ButtonGroup>
            <Button variant="contained" color="primary" size={'small'}>
              Accept
            </Button>
            <Button variant="contained" color="warning" size={'small'}>
              Reject
            </Button>
          </ButtonGroup>
        ),
      },
    },
    {
      id: 1,
      fullName: 'Snow',
      age: 35,
      blood: 'O+',
      address: 'Winterfell',
      phone: '1234567890',
    },
    {
      id: 2,
      fullName: 'Lannister',
      age: 42,
      blood: 'AB-',
      address: 'Casterly Rock',
      phone: '1234567890',
    },
    {
      id: 3,
      fullName: 'Lannister',
      age: 45,
      blood: 'B+',
      address: "King's Landing",
      phone: '1234567890',
    },
    {
      id: 4,
      fullName: 'Stark',
      age: 16,
      blood: 'A-',
      address: 'Winterfell',
      phone: '1234567890',
    },
    {
      id: 5,
      fullName: 'Targaryen',
      age: 19,
      blood: 'O-',
      address: 'Dragonstone',
      phone: '1234567890',
    },
    {
      id: 6,
      fullName: 'Melisandre',
      age: 150,
      blood: 'AB+',
      address: 'Asshai',
      phone: '1234567890',
    },
    {
      id: 7,
      fullName: 'Clifford',
      age: 44,
      blood: 'B-',
      address: 'Ferrara',
      phone: '1234567890',
    },
    {
      id: 8,
      fullName: 'Frances',
      age: 36,
      blood: 'A+',
      address: 'Rome',
      phone: '1234567890',
    },
    {
      id: 9,
      fullName: 'Roxie',
      age: 65,
      blood: 'O+',
      address: 'Salerno',
      phone: '1234567890',
    }
  )

  return (
    <div
      className={'overflow-hidden py-3 max-w-[min(120rem,95%)] w-full mx-auto '}
    >
      <Paper sx={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          sx={{ border: 0 }}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 20 } },
          }}
          hideFooterSelectedRowCount
        />
      </Paper>
    </div>
  )
}

export function createRowColumn<
  T extends Record<string, Omit<GridColDef, 'field'>>
>(
  columns: T,
  ...rows: {
    [key in keyof T]?: string | number
  }[]
) {
  return {
    rows,

    columns: Object.entries(columns).map(([key, value]) => ({
      field: key,
      ...value,
    })),
  }
}
