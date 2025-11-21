import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-light dark:bg-gray-800 border-t-4 border-primary-accent dark:border-primary-500 mt-16 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">DibuBaron</h3>
            <p className="text-dark dark:text-gray-400 text-sm">
              Aprende a dibujar fácil y paso a paso con nuestros tutoriales gratuitos.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-dark dark:text-gray-200 mb-3">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-dark dark:text-gray-400 hover:text-primary-accent transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-dark dark:text-gray-400 hover:text-primary-accent transition-colors">
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-dark dark:text-gray-200 mb-3">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/DibuBaron/" target="_blank" rel="noopener noreferrer" className="text-dark dark:text-gray-400 hover:text-blue-600 transition-colors" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@DibuBaron" target="_blank" rel="noopener noreferrer" className="text-dark dark:text-gray-400 hover:text-red-600 transition-colors" aria-label="YouTube">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-border dark:border-gray-700 mt-8 pt-6 text-center text-sm text-dark dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} DibuBaron. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
