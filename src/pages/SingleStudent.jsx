import { Button, TextField } from '@mui/material'
import { Container } from '@mui/system'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import useFetch from '../components/useFetch'

export default function SingleStudent() {
  const { student } = useParams()
  const { data, error, pending } = useFetch(
    `http://localhost:3001/get-student/${student}`
  )
  const [input, setInput] = useState({
    firstname: '',
    lastname: ''
  })
  useEffect(() => {
    setInput({
      firstname: data[0]?.firstname,
      lastname: data[0]?.lastname
    })
  }, [data.length, data])

  const onChange = e => setInput({ ...input, [e.target.name]: e.target.value })

  const handleUpdate = () => {
    fetch('http://localhost:3001/update-student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...input, _id: data[0]._id })
    })
      .then(res => res.json())
      .then(info => console.log(info))
      .catch(err => console.log(err))
  }

  return pending || error || !data.length < 0 ? (
    <Spinner open={pending} />
  ) : (
    <Container style={{ marginTop: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>
        {data[0]?.firstname} {data[0]?.lastname}
      </h1>
      <div>
        <TextField
          id='standard-basic'
          fullWidth
          label='First name'
          style={{ marginBottom: '20px' }}
          variant='outlined'
          defaultValue={data[0]?.firstname}
          name='firstname'
          onChange={onChange}
        />
      </div>
      <div>
        <TextField
          id='standard-basic'
          fullWidth
          label='Last Name'
          style={{ marginBottom: '20px' }}
          variant='outlined'
          defaultValue={data[0]?.lastname}
          name='lastname'
          onChange={onChange}
        />
      </div>
      <div>
        <Button onClick={handleUpdate} color='primary' variant='contained'>
          Update
        </Button>
      </div>
    </Container>
  )
}
