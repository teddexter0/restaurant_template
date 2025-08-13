// FILE: src/app/admin/page.tsx
'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from '@/lib/motion'
import { 
  EyeIcon, 
  UserGroupIcon, 
  GlobeAltIcon, 
  ChartBarIcon,
  CalendarDaysIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  DeviceTabletIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts'

interface AnalyticsData {
  totalVisitors: number
  monthlyVisitors: number
  weeklyVisitors: number
  pageViews: number
  visitorChange: number
  pageViewChange: number
  monthlyChange: number
  weeklyChange: number
  topPages: { page: string; views: number }[]
  deviceTypes: { desktop: number; mobile: number; tablet: number }
  trafficSources: { direct: number; search: number; social: number; referral: number }
  visitorsOverTime: { date: string; visitors: number }[]
  lastUpdated: string
  dataSource: string
}

interface StatCardProps {
  icon: React.ReactNode
  title: string
  value: number
  change: number
  color?: string
  prefix?: string
  suffix?: string
}

const COLORS = ['#ea7c2a', '#14b8a6', '#f59e0b', '#64748b']

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalVisitors: 0,
    monthlyVisitors: 0,
    weeklyVisitors: 0,
    pageViews: 0,
    visitorChange: 0,
    pageViewChange: 0,
    monthlyChange: 0,
    weeklyChange: 0,
    topPages: [],
    deviceTypes: { desktop: 0, mobile: 0, tablet: 0 },
    trafficSources: { direct: 0, search: 0, social: 0, referral: 0 },
    visitorsOverTime: [],
    lastUpdated: '',
    dataSource: ''
  })
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'savoro2025') {
      setIsAuthenticated(true)
      fetchAnalyticsData()
    } else {
      alert('Incorrect password')
    }
  }

  const fetchAnalyticsData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/analytics')
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error || 'Failed to fetch analytics')
      }
      const data = await res.json()

      // Generate mock time series data
      const visitorsOverTime = Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        visitors: Math.floor(Math.random() * 100) + 50
      }))

      setAnalytics({ ...data, visitorsOverTime })
      console.log('✅ Analytics updated:', data)
    } catch (error) {
      console.error('❌ fetchAnalyticsData error', error)
    } finally {
      setLoading(false)
    }
  }

  const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change, color = 'primary', prefix = '', suffix = '' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card hover:scale-105 transition-all duration-300 relative overflow-hidden"
      whileHover={{ y: -5 }}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br from-${color}-50 to-transparent opacity-50`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`bg-${color}-100 p-3 rounded-xl`}>
            <div className={`text-${color}-600`}>{icon}</div>
          </div>
          
          {/* Trend indicator */}
          <div className="flex items-center space-x-1">
            {change > 0 ? (
              <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
            ) : change < 0 ? (
              <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />
            ) : (
              <div className="w-4 h-4" />
            )}
            <span className={`text-sm font-semibold ${
              change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-secondary-500'
            }`}>
              {change > 0 ? '+' : ''}{change}%
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-secondary-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold text-${color}-600`}>
            {prefix}{value.toLocaleString()}{suffix}
          </p>
          <p className="text-xs text-secondary-500 mt-1">vs last period</p>
        </div>
      </div>

      {/* Animated background pattern */}
      <motion.div
        className="absolute top-0 right-0 w-20 h-20 opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className={`w-full h-full bg-${color}-400 rounded-full blur-xl`} />
      </motion.div>
    </motion.div>
  )

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-warm-50 to-accent-50 relative overflow-hidden">
        {/* Background animation */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-primary-300/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, -20, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card max-w-md w-full mx-4 relative z-10"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <ChartBarIcon className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">Analytics Dashboard</h1>
            <p className="text-secondary-600">Enter password to access restaurant analytics</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-secondary-700 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-warm-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter admin password"
                required
              />
            </motion.div>
            
            <motion.button 
              type="submit" 
              className="w-full btn-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Access Dashboard
            </motion.button>
          </form>
        </motion.div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'traffic', name: 'Traffic', icon: GlobeAltIcon },
    { id: 'devices', name: 'Devices', icon: DevicePhoneMobileIcon },
  ]

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-warm-50 to-primary-50">
      <div className="container-custom section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-2">
                Restaurant Analytics
              </h1>
              <p className="text-xl text-secondary-600">Savoro Performance Dashboard</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="text-right text-sm text-secondary-500">
                <p>Data Source: {analytics.dataSource}</p>
                <p className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  Last Updated: {analytics.lastUpdated ? new Date(analytics.lastUpdated).toLocaleString() : 'Never'}
                </p>
              </div>
              <button 
                onClick={fetchAnalyticsData} 
                className="btn-secondary text-sm"
                disabled={loading}
              >
                {loading ? 'Refreshing...' : 'Refresh Data'}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-white/50 rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white shadow-md text-primary-600'
                    : 'text-secondary-600 hover:text-primary-600'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="spinner" />
            <span className="ml-3 text-secondary-600">Loading analytics data...</span>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                      icon={<EyeIcon className="w-6 h-6" />}
                      title="Total Page Views"
                      value={analytics.pageViews}
                      change={analytics.pageViewChange}
                      color="primary"
                    />
                    <StatCard
                      icon={<UserGroupIcon className="w-6 h-6" />}
                      title="Total Visitors"
                      value={analytics.totalVisitors}
                      change={analytics.visitorChange}
                      color="accent"
                    />
                    <StatCard
                      icon={<CalendarDaysIcon className="w-6 h-6" />}
                      title="Monthly Visitors"
                      value={analytics.monthlyVisitors}
                      change={analytics.monthlyChange}
                      color="secondary"
                    />
                    <StatCard
                      icon={<ChartBarIcon className="w-6 h-6" />}
                      title="Weekly Visitors"
                      value={analytics.weeklyVisitors}
                      change={analytics.weeklyChange}
                      color="warm"
                    />
                  </div>

                  {/* Charts Row */}
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Visitors Over Time */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="card"
                    >
                      <h3 className="text-xl font-bold text-secondary-900 mb-6">Visitors Over Time</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={analytics.visitorsOverTime}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #e2e8f0',
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="visitors" 
                            stroke="#ea7c2a" 
                            strokeWidth={3}
                            dot={{ fill: '#ea7c2a', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: '#ea7c2a', strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </motion.div>

                    {/* Top Pages */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="card"
                    >
                      <h3 className="text-xl font-bold text-secondary-900 mb-6">Top Pages</h3>
                      <div className="space-y-4">
                        {analytics.topPages.length > 0 ? analytics.topPages.map((page, index) => (
                          <motion.div 
                            key={page.page} 
                            className="flex items-center justify-between p-3 bg-warm-50 rounded-lg hover:bg-warm-100 transition-colors duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="bg-primary-100 text-primary-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
                                {index + 1}
                              </div>
                              <span className="text-secondary-700 font-medium">{page.page}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-secondary-200 rounded-full h-2">
                                <div 
                                  className="bg-primary-500 h-2 rounded-full transition-all duration-1000" 
                                  style={{ width: `${Math.min((page.views / analytics.topPages[0].views) * 100, 100)}%` }}
                                />
                              </div>
                              <span className="text-primary-600 font-semibold min-w-[3rem] text-right">
                                {page.views.toLocaleString()}
                              </span>
                            </div>
                          </motion.div>
                        )) : (
                          <p className="text-secondary-500 italic text-center py-8">No page data available</p>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {activeTab === 'traffic' && (
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Traffic Sources Pie Chart */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="card"
                  >
                    <h3 className="text-xl font-bold text-secondary-900 mb-6">Traffic Sources</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={Object.entries(analytics.trafficSources).map(([key, value]) => ({
                            name: key.charAt(0).toUpperCase() + key.slice(1),
                            value: value
                          }))}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {Object.entries(analytics.trafficSources).map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>

                  {/* Traffic Sources Bar Chart */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="card"
                  >
                    <h3 className="text-xl font-bold text-secondary-900 mb-6">Source Breakdown</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={Object.entries(analytics.trafficSources).map(([key, value]) => ({
                        name: key.charAt(0).toUpperCase() + key.slice(1),
                        value: value
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                          }} 
                        />
                        <Bar dataKey="value" fill="#ea7c2a" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                </div>
              )}

              {activeTab === 'devices' && (
                <div className="card">
                  <h3 className="text-xl font-bold text-secondary-900 mb-8">Device Usage</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    {Object.entries(analytics.deviceTypes).map(([type, percentage], index) => {
                      let icon, colorClass
                      
                      switch(type) {
                        case 'mobile':
                          icon = <DevicePhoneMobileIcon className="w-8 h-8" />
                          colorClass = 'text-primary-600'
                          break
                        case 'desktop':
                          icon = <ComputerDesktopIcon className="w-8 h-8" />
                          colorClass = 'text-accent-600'
                          break
                        case 'tablet':
                          icon = <DeviceTabletIcon className="w-8 h-8" />
                          colorClass = 'text-secondary-600'
                          break
                        default:
                          icon = <GlobeAltIcon className="w-8 h-8" />
                          colorClass = 'text-secondary-600'
                      }
                      return (
                        <motion.div 
                          key={type} 
                          className="text-center p-6 bg-warm-50 rounded-xl hover:shadow-lg transition-all duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="flex justify-center mb-4">
                            <div className={`p-4 rounded-full bg-white ${colorClass} shadow-lg`}>
                              {icon}
                            </div>
                          </div>
                          <h4 className="text-xl font-bold text-secondary-800 capitalize mb-2">{type}</h4>
                          <div className="relative w-32 h-32 mx-auto mb-4">
                            <svg className="w-32 h-32 transform -rotate-90">
                              <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-secondary-200" />
                              <motion.circle
                                cx="64"
                                cy="64"
                                r="56"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                strokeLinecap="round"
                                className={colorClass}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: percentage / 100 }}
                                transition={{ duration: 2, delay: index * 0.3, ease: "easeInOut" }}
                                style={{
                                  strokeDasharray: "351.86", // 2π * 56
                                }}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-2xl font-bold text-secondary-900">{percentage}%</span>
                            </div>
                          </div>
                          <p className="text-secondary-600">of total traffic</p>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}