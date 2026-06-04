export interface User {
  id: string;
  name: string;
  email: string;
  country: string;
  avatar: string;
  role: 'user' | 'admin';
  blocked: boolean;
  balance: number;
  stickersOwned: number;
  stickersRepeated: number;
  rating: number;
}

export interface Sticker {
  id: string;
  number: string;
  player: string;
  country: string;
  year: string;
  album: string;
  type: 'venda' | 'troca' | 'ambos';
  price?: number;
  condition: 'Novo' | 'Usado';
  image: string;
  description: string;
  rarity: 'Comum' | 'Rara' | 'Lendária';
  ownerId: string;
  ownerName: string;
  active: boolean; // active display in marketplace
  approved: boolean; // requires admin approval
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface ChatConversation {
  id: string;
  stickerId: string;
  buyerId: string;
  sellerId: string;
  buyerName: string;
  sellerName: string;
  stickerName: string;
  stickerImage: string;
  stickerPrice?: number;
  stickerType: 'venda' | 'troca' | 'ambos';
  messages: ChatMessage[];
  status: 'active' | 'completed_trade' | 'completed_sale' | 'cancelled';
}

export interface PlatformRule {
  id: string;
  title: string;
  content: string;
}

export interface PlatformStat {
  usersCount: number;
  stickersCount: number;
  tradesCount: number;
}
