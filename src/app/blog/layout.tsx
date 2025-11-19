import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - CodigoFacil.com | Guías de Desarrollo Web para LATAM',
  description: 'Guías prácticas y evergreen sobre desarrollo web, e-commerce y marketing digital para empresas de Latinoamérica. Contenido técnico actualizado.',
  keywords: 'blog desarrollo web, guías técnicas LATAM, tutoriales programación, e-commerce latinoamérica, marketing digital empresas',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div suppressHydrationWarning data-page="blog">
      {children}
    </div>
  )
}