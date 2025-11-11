import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Column 1 - About */}
                    <div>
                        <div className="text-2xl font-bold mb-6">
                            <span className="text-primary">CodigoFacil.com</span>
                            <span className="text-white"></span>
                        </div>
                        <p className="mb-6">
                            Transformamos sus ideas en experiencias digitales excepcionales para impulsar su negocio.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com/codigofacil" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:scale-110 transform duration-200">
                                <Facebook size={20} />
                            </a>
                            <a href="https://twitter.com/codigofacil" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:scale-110 transform duration-200">
                                <Twitter size={20} />
                            </a>
                            <a href="https://instagram.com/codigofacil" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:scale-110 transform duration-200">
                                <Instagram size={20} />
                            </a>
                            <a href="https://linkedin.com/company/codigofacil" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:scale-110 transform duration-200">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2 - Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Enlaces Rápidos</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="hover:text-primary transition-colors">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link href="/servicios" className="hover:text-primary transition-colors">
                                    Servicios
                                </Link>
                            </li>
                            {/* Proyectos - Temporalmente comentado */}
                            {/* <li>
                                <Link href="/proyectos" className="hover:text-primary transition-colors">
                                    Proyectos
                                </Link>
                            </li> */}
                            <li>
                                <Link href="/nosotros" className="hover:text-primary transition-colors">
                                    Nosotros
                                </Link>
                            </li>
                            <li>
                                <Link href="/contacto" className="hover:text-primary transition-colors">
                                    Contacto
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3 - Services */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Servicios</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/servicios/diseno-web" className="hover:text-primary transition-colors">
                                    Diseño Web
                                </Link>
                            </li>
                            <li>
                                <Link href="/servicios/desarrollo-web" className="hover:text-primary transition-colors">
                                    Desarrollo Web
                                </Link>
                            </li>
                            <li>
                                <Link href="/servicios/ecommerce" className="hover:text-primary transition-colors">
                                    Comercio Electrónico
                                </Link>
                            </li>
                            <li>
                                <Link href="/servicios/seo" className="hover:text-primary transition-colors">
                                    SEO
                                </Link>
                            </li>
                            <li>
                                <Link href="/servicios/marketing-digital" className="hover:text-primary transition-colors">
                                    Marketing Digital
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4 - Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Contacto</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin className="mr-3 mt-1 text-primary" size={18} />
                                <span>Guápiles, Limón, Costa Rica</span>
                            </li>
                            <li className="flex items-center">
                                <a
                                    href="https://wa.me/56950225491"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center hover:text-primary transition-colors"
                                >
                                    <Phone className="mr-3 text-primary" size={18} />
                                    <span>+56 9 5022 5491</span>
                                </a>
                            </li>
                            <li className="flex items-center">
                                <Mail className="mr-3 text-primary" size={18} />
                                <span>info@codigofacil.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                    <p>© {year} Ezdev CR. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}