import { Button, TextField } from '@mui/material'
import { Container } from '@mui/system'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import useFetch from '../components/useFetch'

export default function SingleBook() {
  const { book } = useParams()
  const { data, error, pending } = useFetch(
    `http://localhost:3001/get-book/${book}`
  )
  const [input, setInput] = useState({
    name: '',
    author: ''
  })
  useEffect(() => {
    setInput({
      name: data[0]?.name,
      author: data[0]?.author
    })
  }, [data.length, data])

  const onChange = e => setInput({ ...input, [e.target.name]: e.target.value })

  const handleUpdate = () => {
    fetch('http://localhost:3001/update-book', {
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
        {book}, <sub style={{ fontWeight: 'normal' }}>{data[0]?.author}</sub>
      </h1>
      <div>
        <TextField
          id='standard-basic'
          fullWidth
          label='Book Name'
          style={{ marginBottom: '20px' }}
          variant='outlined'
          defaultValue={data[0]?.name}
          name='name'
          onChange={onChange}
        />
      </div>
      <div>
        <TextField
          id='standard-basic'
          fullWidth
          label='Author'
          style={{ marginBottom: '20px' }}
          variant='outlined'
          defaultValue={data[0]?.author}
          name='author'
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
