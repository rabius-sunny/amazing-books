import useFetch from '../components/useFetch'
import Spinner from '../components/Spinner'
import DataTable from '../components/DataTable'
import { Container } from '@mui/material'

export default function Students() {
  const { data, error, pending } = useFetch(
    'http://localhost:3001/get-students'
  )
  return (
    <Container>
      <Spinner open={pending} />
      {error ? (
        <div style={{ textAlign: 'center', color: 'red', fontSize: '2rem' }}>
          Error on fetching data
        </div>
      ) : (
        <DataTable rows={data} type='Students' />
      )}
    </Container>
  )
}
