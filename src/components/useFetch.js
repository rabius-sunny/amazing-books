import { useState, useEffect } from 'react'
export default function useFetch(link) {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    setPending(true)
    fetch(link)
      .then(res => res.json())
      .then(result => {
        setData(result)
        setPending(false)
      })
      .catch(err => {
        setError(err)
        setPending(false)
      })
  }, [link])

  return { data, error, pending }
}
