import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Books from './pages/Books'
import SingleStudent from './pages/SingleStudent'
import SingleBook from './pages/SingleBook'
import Students from './pages/Students'
export default function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path='/' element={<Books />} />
        <Route path='/book/:book' element={<SingleBook />} />
        <Route path='/students' element={<Students />} />
        <Route path='/student/:student' element={<SingleStudent />} />
      </Routes>
    </Router>
  )
}
