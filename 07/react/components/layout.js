import 'react';
import Navbar from './navbar';
import Footer from './footer';

export default function Layout({user}) {
    return (
        <div className='body'>
            <Navbar />
            <p>Hello {user.name}</p>
            {(user.age >= 18) && <p>welcome</p>}
            {(user.age < 18) && <p>sorry, 18+ only</p>}
            <Footer />
        </div>
    )
}