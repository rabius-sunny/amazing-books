import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import moment from 'moment'
import { Link } from 'react-router-dom'

export default function DataTable({ rows, type }) {
  return (
    <>
      <h1 style={{ textAlign: 'center', margin: '15px 0' }}>{type}</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='books and students table'>
          <TableHead>
            {type === 'Books' ? (
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Borrowed by</TableCell>
                <TableCell>Date of borrow</TableCell>
                <TableCell>Date of return</TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell>First name</TableCell>
                <TableCell>Last name</TableCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {type === 'Books' &&
              rows.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    <Link
                      style={{ color: '#1976d2', textDecoration: 'none' }}
                      to={`/book/${row.name}`}
                    >
                      {row.name}
                    </Link>
                  </TableCell>
                  <TableCell>{row.author}</TableCell>
                  <TableCell>
                    <Link
                      style={{ color: '#1976d2', textDecoration: 'none' }}
                      to={`/student/${row.borrowedBy}`}
                    >
                      {row.borrowedBy || '--'}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {row.borrowDate
                      ? moment(new Date(row.borrowDate)).format('LL')
                      : '--'}
                  </TableCell>
                  <TableCell>
                    {row.returnDate
                      ? moment(new Date(row.returnDate)).format('LL')
                      : '--'}
                  </TableCell>
                </TableRow>
              ))}
            {type === 'Students' &&
              rows.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{row.firstname}</TableCell>
                  <TableCell>{row.lastname}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
