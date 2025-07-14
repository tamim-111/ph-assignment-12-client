import { Link } from 'react-router'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import Container from '../../container/Container'

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-[#6BDCF6] to-[#25A8D6] text-white py-10 mt-16">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">MedEasy</h3>
                        <p className="text-sm leading-relaxed">
                            MedEasy is your trusted online pharmacy platform, providing easy access to medicines and healthcare products.
                            Fast delivery and trusted quality guaranteed.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="hover:underline">Home</Link>
                            </li>
                            <li>
                                <Link to="/shop" className="hover:underline">Shop</Link>
                            </li>
                            <li>
                                <Link to="/cart" className="hover:underline">Cart</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                        <p className="text-sm mb-2">Email: support@medeasy.com</p>
                        <p className="text-sm mb-2">Phone: +1 234 567 890</p>
                        <p className="text-sm">Address: 123 MedEasy Street, Health City</p>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4 text-lg">
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-gray-300">
                                <FaFacebookF />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-gray-300">
                                <FaTwitter />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-gray-300">
                                <FaInstagram />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-gray-300">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white border-opacity-30 mt-10 pt-6 text-center text-sm">
                    &copy; {new Date().getFullYear()} MedEasy. All rights reserved.
                </div>
            </Container>
        </footer>
    )
}

export default Footer