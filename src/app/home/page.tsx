import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h1 className="text-xl font-bold text-gray-700">Dashboard</h1>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="block p-2 text-gray-600 hover:bg-gray-200 rounded"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block p-2 text-gray-600 hover:bg-gray-200 rounded"
              >
                Configuración
              </a>
            </li>
            <li>
              <Link
                href="/auth/logout"
                className="block p-2 text-white hover:bg-red-600/40 rounded bg-red-600/60"
              >
                Cerrar Sesión
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Bienvenido al Dashboard
        </h2>
        <p className="text-gray-600 mt-2">
          Aquí puedes gestionar toda la información.
        </p>
      </main>
    </div>
  );
}
