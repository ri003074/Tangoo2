import Link from 'next/link'
import { Navbar } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { random } from '../store'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Layout({ children }) {
    const dispatch = useDispatch()

    const setRandom = () => {
        dispatch(random())
    }

    return (
        <div>
            <Navbar>
                <Navbar.Brand>
                    <Link href="/" >Tangoo</Link>
                </Navbar.Brand>
                <Link href="/">Home</Link>
                <Link href="/add">Add</Link>
                <Link href="/quiz">Quiz</Link>
                {/* <div className="btn" onClick={setRandom}>random</div> */}
            </Navbar>
            {children}
        </div>
    )
}