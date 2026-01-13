
export interface MarketingData {
  facebookAds: {
    spend: number;
    clicks: number;
    conversions: number;
    roi: number;
  };
  googleAnalytics: {
    sessions: number;
    bounceRate: number;
    avgSessionDuration: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'customer';
  text: string;
  timestamp: string;
}

export interface WhatsAppContact {
  id: string;
  name: string;
  lastMessage: string;
  unreadCount: number;
  avatar: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}
