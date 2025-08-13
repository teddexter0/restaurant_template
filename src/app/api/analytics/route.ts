// src/app/api/analytics/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock analytics data for now
    const mockData = {
      totalVisitors: 15234,
      monthlyVisitors: 3456,
      weeklyVisitors: 892,
      pageViews: 45678,
      visitorChange: 12.5,
      pageViewChange: 8.3,
      monthlyChange: 15.2,
      weeklyChange: -3.4,
      topPages: [
        { page: 'Home', views: 12543 },
        { page: 'Menu', views: 8932 },
        { page: 'Contact', views: 6421 },
        { page: 'Gallery', views: 5234 },
        { page: 'About', views: 3456 }
      ],
      deviceTypes: { 
        desktop: 45, 
        mobile: 48, 
        tablet: 7 
      },
      trafficSources: { 
        direct: 35, 
        search: 40, 
        social: 15, 
        referral: 10 
      },
      lastUpdated: new Date().toISOString(),
      dataSource: 'Demo Data'
    }

    return NextResponse.json(mockData, { status: 200 })
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    )
  }
}