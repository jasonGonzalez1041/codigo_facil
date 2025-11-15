"use client";

export function BlogPageClient() {
  const handleWhatsAppClick = () => {
    const message = `¡Hola! He estado leyendo las guías evergreen de CodigoFacil.com y me interesa implementar estas estrategias en mi proyecto.

🎯 *Quiero desarrollar:*
• [Sitio web / E-commerce / App personalizada]

📚 *Basado en la guía:* [Nombre de la guía que leíste]

¿Podrían ayudarme a convertir este conocimiento en resultados reales?`;
    
    const whatsappUrl = `https://wa.me/56950225491?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
    >
      💬 Aplicar Conocimiento con Expertos
    </button>
  );
}