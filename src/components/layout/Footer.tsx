import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
    const year = 2025; // Fixed year to avoid hydration issues

    const quickLinks = [
        { href: "/", label: "Inicio" },
        { href: "#servicios", label: "Servicios" },
        { href: "#nosotros", label: "Nosotros" },
        { href: "#contacto", label: "Contacto" }
    ];

    const servicios = [
        { href: "#servicios", label: "Aplicación Web" },
        { href: "#servicios", label: "E-commerce Profesional" },
        { href: "#servicios", label: "Aplicación Móvil" },
        { href: "#servicios", label: "Mantenimiento Web" },
        { href: "#servicios", label: "Consultoría Digital" },
        { href: "#servicios", label: "Optimización y SEO" }
    ];

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-16">
                {/* Grid Principal - Mejorado para responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">

                    {/* Columna 1 - Logo y Descripción (ocupa toda la fila en móvil) */}
                    <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
                        <div className="text-2xl font-bold mb-6">
                            <span className="text-white">Codigo</span>
                            <span className="text-blue-400">Facil</span>
                            <span className="text-white">.com</span>
                        </div>
                        <p className="mb-6 leading-relaxed text-sm sm:text-base">
                            Transformamos tus ideas en experiencias digitales excepcionales
                            para impulsar tu negocio al siguiente nivel.
                        </p>
                        {/* Redes Sociales */}
                        {/* <div className="flex justify-center sm:justify-start space-x-4">
                            <a
                                href="https://facebook.com/codigofacil"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400 transition-all duration-300 hover:scale-110 transform"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="https://twitter.com/codigofacil"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400 transition-all duration-300 hover:scale-110 transform"
                            >
                                <Twitter size={20} />
                            </a>
                            <a
                                href="https://instagram.com/codigofacil"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400 transition-all duration-300 hover:scale-110 transform"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="https://linkedin.com/company/codigofacil"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400 transition-all duration-300 hover:scale-110 transform"
                            >
                                <Linkedin size={20} />
                            </a>
                        </div> */}
                    </div>

                    {/* Columna 2 - Enlaces Rápidos */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-lg font-bold mb-6 text-white">Enlaces Rápidos</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="hover:text-blue-400 transition-colors duration-300 inline-block py-1 text-sm sm:text-base"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Columna 3 - Servicios (al lado de Enlaces Rápidos en móvil) */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-lg font-bold mb-6 text-white">Servicios</h3>
                        <ul className="space-y-3">
                            {servicios.map((item, index) => (
                                <li key={`${item.href}-${index}`}>
                                    <Link
                                        href={item.href}
                                        className="hover:text-blue-400 transition-colors duration-300 inline-block py-1 text-sm sm:text-base"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                    </div>

                    {/* Columna 4 - Contacto (nueva fila en móvil, al lado derecho en desktop) */}
                    <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
                        <h3 className="text-lg font-bold mb-6 text-white">Contacto</h3>
                        <ul className="space-y-4">
                            {/* Dirección */}
                            <li className="flex flex-col items-center sm:items-start gap-2">
                                <div className="flex items-center gap-3">
                                    <MapPin className="text-blue-400 flex-shrink-0" size={18} />
                                    <span className="text-sm sm:text-base">Remoto</span>
                                </div>
                            </li>

                            {/* Teléfono */}
                            <li>
                                <a
                                    href="https://wa.me/56950225491"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center sm:justify-start gap-3 hover:text-blue-400 transition-colors duration-300 group"
                                >
                                    <Phone className="text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" size={18} />
                                    <span className="text-sm sm:text-base">WhatsApp</span>
                                </a>
                            </li>

                            {/* Email */}
                            <li className="flex items-center justify-center sm:justify-start gap-3">
                                <Mail className="text-blue-400 flex-shrink-0" size={18} />
                                <span className="text-sm sm:text-base">Vecipremiun@gmail.com</span>
                            </li>
                        </ul>



                    </div>
                </div>

                {/* Línea divisoria y Copyright */}
                <div className="border-t border-gray-800 mt-12 pt-8 text-center max-w-4xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © {year} CodigoFacil.com. Todos los derechos reservados.
                        </p>
                        <div className="flex gap-6 text-sm text-gray-400">
                            <Link href="/privacidad" className="hover:text-blue-400 transition-colors">
                                Política de Privacidad
                            </Link>
                            <Link href="/terminos" className="hover:text-blue-400 transition-colors">
                                Términos de Servicio
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}