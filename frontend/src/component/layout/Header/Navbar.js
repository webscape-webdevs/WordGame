import './Navbar.css'
import { AiOutlineReload, AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';


export function Reload() {

    return (

        <div className='navbar'>

            <a href='/'><AiOutlineReload size='40px' color='black' textDecoration='none' /></a>

        </div>

    )
}


export function Home() {

    return (

        <div className='navbar'>

            <Link to='/'><AiOutlineHome size='40px' color='black' textDecoration='none' /></Link>

        </div>

    )

}
