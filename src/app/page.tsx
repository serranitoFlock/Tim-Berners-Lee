import Image from "next/image";
import ChatInterface from "@/components/ChatInterface";
import InteractiveChart from "@/components/InteractiveChart";
import UserManager from "@/components/UserManager";
import SwaggerBadge from "@/components/SwaggerBadge";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Image
            className="mx-auto mb-6 dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tim Berners-Lee Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Una aplicación web moderna que honra al creador de la World Wide Web. 
            Explora datos, interactúa con un asistente virtual y gestiona usuarios.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Chat Interface */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Asistente Virtual
            </h2>
            <ChatInterface />
          </div>

          {/* Chart */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Análisis de Datos
            </h2>
            <InteractiveChart />
          </div>
        </div>

        {/* User Management */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Sistema de Usuarios
          </h2>
          <UserManager />
        </div>

        {/* Footer Info */}
        <div className="text-center py-8 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Sobre Tim Berners-Lee
            </h3>
            <p className="text-gray-600 mb-4">
              Sir Timothy John Berners-Lee es un científico de la computación británico, 
              conocido por ser el inventor de la World Wide Web, el lenguaje HTML, 
              el protocolo HTTP y las URLs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">🌐 World Wide Web</h4>
                <p className="text-gray-600">Creada en 1989 en el CERN</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">📄 HTML</h4>
                <p className="text-gray-600">Lenguaje de marcado para la web</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">🔗 HTTP</h4>
                <p className="text-gray-600">Protocolo de transferencia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Swagger Badge */}
      <SwaggerBadge />
    </div>
  );
}
