'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { useState } from 'react'

// Datos mockeados para diferentes tipos de gráficos
const webTechnologiesData = [
  { name: 'HTML', usage: 95, year: '1991' },
  { name: 'CSS', usage: 90, year: '1996' },
  { name: 'JavaScript', usage: 88, year: '1995' },
  { name: 'HTTP', usage: 100, year: '1991' },
  { name: 'URL', usage: 98, year: '1991' },
  { name: 'HTTPS', usage: 85, year: '1994' }
]

const webEvolutionData = [
  { year: 1991, websites: 1 },
  { year: 1995, websites: 23500 },
  { year: 2000, websites: 17087182 },
  { year: 2005, websites: 64780617 },
  { year: 2010, websites: 206844204 },
  { year: 2015, websites: 863105652 },
  { year: 2020, websites: 1295973827 },
  { year: 2024, websites: 1900000000 }
]

const browserShareData = [
  { name: 'Chrome', value: 65, color: '#4285F4' },
  { name: 'Safari', value: 19, color: '#007AFF' },
  { name: 'Edge', value: 5, color: '#0078D4' },
  { name: 'Firefox', value: 3, color: '#FF7139' },
  { name: 'Otros', value: 8, color: '#9CA3AF' }
]

type ChartType = 'bar' | 'line' | 'pie'

export default function InteractiveChart() {
  const [chartType, setChartType] = useState<ChartType>('bar')

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={webTechnologiesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value: number, name: string) => [`${value}%`, 'Adopción']}
                labelFormatter={(label: string) => `Tecnología: ${label}`}
              />
              <Bar dataKey="usage" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        )
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={webEvolutionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
              <Tooltip 
                formatter={(value: number) => [value.toLocaleString(), 'Sitios Web']}
                labelFormatter={(label: string) => `Año: ${label}`}
              />
              <Line type="monotone" dataKey="websites" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        )
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={browserShareData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {browserShareData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value}%`, 'Cuota de mercado']} />
            </PieChart>
          </ResponsiveContainer>
        )
      
      default:
        return null
    }
  }

  const getChartTitle = () => {
    switch (chartType) {
      case 'bar':
        return 'Adopción de Tecnologías Web'
      case 'line':
        return 'Evolución del Número de Sitios Web'
      case 'pie':
        return 'Cuota de Mercado de Navegadores (2024)'
      default:
        return 'Gráfico'
    }
  }

  const getChartDescription = () => {
    switch (chartType) {
      case 'bar':
        return 'Porcentaje de adopción de las principales tecnologías web creadas por Tim Berners-Lee y su equipo'
      case 'line':
        return 'Crecimiento exponencial de sitios web desde la creación de la World Wide Web'
      case 'pie':
        return 'Distribución actual del uso de navegadores web en el mundo'
      default:
        return ''
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      {/* Header with controls */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{getChartTitle()}</h3>
        <p className="text-sm text-gray-600 mb-4">{getChartDescription()}</p>
        
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setChartType('bar')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              chartType === 'bar'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Barras
          </button>
          <button
            type="button"
            onClick={() => setChartType('line')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              chartType === 'line'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Líneas
          </button>
          <button
            type="button"
            onClick={() => setChartType('pie')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              chartType === 'pie'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Circular
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full">
        {renderChart()}
      </div>

      {/* Footer with additional info */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Datos mockeados para demostración • Actualizado: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}
