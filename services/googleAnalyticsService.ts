/**
 * GOOGLE ANALYTICS 4 REAL INTEGRATION SERVICE
 * Reads credentials from Netlify Environment Variables (process.env)
 */

const PROPERTY_ID: string = '514477194'; 
const CLIENT_ID: string = process.env.GA_CLIENT_ID || '';
const CLIENT_SECRET: string = process.env.GA_CLIENT_SECRET || '';
const REFRESH_TOKEN: string = process.env.GA_REFRESH_TOKEN || ''; 

let CURRENT_ACCESS_TOKEN: string = '';

export interface GADataPoint {
  name: string;
  traffic: number;
  conv: number;
}

export interface GALeadDetail {
  date: string;
  source: string;
  medium: string;
  campaign: string;
  sessions: number;
  users: number;
  conversions: number;
}

export class GoogleAnalyticsService {
  private static async refreshAccessToken(): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error("Credentials missing. Please set GA_CLIENT_ID, GA_CLIENT_SECRET, and GA_REFRESH_TOKEN in Netlify.");
    }

    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          refresh_token: REFRESH_TOKEN,
          grant_type: 'refresh_token',
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error_description || "Auth refresh failed");

      CURRENT_ACCESS_TOKEN = data.access_token;
      return CURRENT_ACCESS_TOKEN;
    } catch (error) {
      console.error("Auth System Error:", error);
      throw error;
    }
  }

  static async getRealReport(): Promise<GADataPoint[]> {
    if (!this.isConfigured()) return this.getMockData();
    
    if (!CURRENT_ACCESS_TOKEN) {
      try { await this.refreshAccessToken(); } catch (e) { return this.getMockData(); }
    }

    const requestBody = {
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'activeUsers' }, { name: 'conversions' }],
      orderBys: [{ dimension: { dimensionName: 'date' }, desc: false }]
    };
    return this.runReport(requestBody, (row: any) => ({
      name: this.formatDate(row.dimensionValues[0].value),
      traffic: parseInt(row.metricValues[0].value) || 0,
      conv: parseInt(row.metricValues[1].value) || 0
    }));
  }

  static async getLeadDetails(): Promise<GALeadDetail[]> {
    if (!this.isConfigured()) return [];
    
    if (!CURRENT_ACCESS_TOKEN) {
      try { await this.refreshAccessToken(); } catch (e) { return []; }
    }

    const requestBody = {
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [
        { name: 'date' },
        { name: 'sessionSource' },
        { name: 'sessionMedium' },
        { name: 'sessionCampaignName' }
      ],
      metrics: [{ name: 'sessions' }, { name: 'activeUsers' }, { name: 'conversions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 15
    };
    return this.runReport(requestBody, (row: any) => ({
      date: this.formatDate(row.dimensionValues[0].value),
      source: row.dimensionValues[1].value,
      medium: row.dimensionValues[2].value,
      campaign: row.dimensionValues[3].value,
      sessions: parseInt(row.metricValues[0].value) || 0,
      users: parseInt(row.metricValues[1].value) || 0,
      conversions: parseInt(row.metricValues[2].value) || 0
    }));
  }

  private static async runReport(body: any, mapper: (row: any) => any, retry: boolean = true): Promise<any[]> {
    try {
      const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${CURRENT_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        if (response.status === 401 && retry) {
          await this.refreshAccessToken();
          return this.runReport(body, mapper, false);
        }
        const error = await response.json();
        throw new Error(error.error?.message || 'GA4 API Error');
      }
      const data = await response.json();
      return (data.rows || []).map(mapper);
    } catch (e) {
      console.error("GA4 failure:", e);
      throw e;
    }
  }

  private static formatDate(gaDate: string) {
    const year = gaDate.substring(0, 4);
    const month = gaDate.substring(4, 6);
    const day = gaDate.substring(6, 8);
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  private static getMockData(): GADataPoint[] {
    return [
      { name: 'Mon', traffic: 4200, conv: 140 },
      { name: 'Tue', traffic: 3800, conv: 125 },
      { name: 'Wed', traffic: 5100, conv: 230 },
      { name: 'Thu', traffic: 4900, conv: 190 },
      { name: 'Fri', traffic: 6200, conv: 310 },
      { name: 'Sat', traffic: 3100, conv: 95 },
      { name: 'Sun', traffic: 2800, conv: 80 },
    ];
  }

  static isConfigured(): boolean {
    return !!(CLIENT_ID && CLIENT_SECRET && REFRESH_TOKEN);
  }
}