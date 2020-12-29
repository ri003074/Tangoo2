import Link from 'next/link'
import { Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Layout({ children }) {
    return (
        <div>
            <div>
                <Navbar>
                    <Navbar.Brand>
                        <Link href="/">Tangoo</Link>
                    </Navbar.Brand>
                    <Link href="/">Home</Link>
                    <Link href="/add">Add</Link>
                    <Link href="/quiz">Quiz</Link>
                </Navbar>
            </div>
            {children}
        </div>
    )
}