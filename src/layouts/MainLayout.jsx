import { Outlet } from 'react-router'
import Navbar from '../components/Home/Navbar/Navbar'
import Footer from '../components/Home/Footer/Footer'
const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <div className='pt-24 min-h-[calc(100vh-68px)]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout
