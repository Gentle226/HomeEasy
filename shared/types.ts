export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  googleId?: string; // Google OAuth ID
  emailVerified?: boolean; // Email verification status
  isTasker: boolean;
  rating: number;
  reviewCount: number;
  bio?: string;
  skills?: string[];
  location: {
    address: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  category: TaskCategory;
  location: {
    address: string;
    coordinates: [number, number];
  };
  locationType: LocationType;
  suggestedPrice: number;
  status: TaskStatus;
  postedBy: string | PopulatedUser; // User ID or populated user data
  assignedTo?: string; // User ID
  images: string[]; // Image URLs/paths
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  completedAt?: Date;
  // New timing fields
  timingType: TimingType;
  specificDate?: Date;
  timeOfDay?: TimeOfDay[];
  needsSpecificTime: boolean;
}

export interface PopulatedUser {
  _id: string;
  firstName: string;
  lastName: string;
  rating: number;
  reviewCount: number;
  avatar?: string;
}

export interface TaskBid {
  _id: string;
  taskId: string;
  bidderId: string | PopulatedUser; // User ID or populated user data
  amount: number;
  message: string;
  estimatedDuration: number; // in hours
  status: BidStatus;
  createdAt: Date;
}

export interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  content: string;
  messageType?: "text" | "image";
  images?: string[]; // Image URLs/paths
  timestamp: Date;
  readBy: string[]; // User IDs who have read the message
}

export interface BidNotification {
  _id: string;
  taskId: string;
  bidId: string;
  taskTitle: string;
  bidderName: string;
  amount: number;
  message: string;
  createdAt: Date;
  isRead: boolean;
}

export interface Conversation {
  _id: string;
  participants: string[]; // User IDs
  taskId?: string; // Optional task reference
  lastMessage?: Message;
  createdAt: Date;
  updatedAt: Date;
}

// Populated conversation type for frontend use
export interface PopulatedConversation {
  _id: string;
  participants: PopulatedUser[]; // Populated user objects
  taskId?: PopulatedTask; // Populated task object
  lastMessage?: Message;
  createdAt: Date;
  updatedAt: Date;
}

// Simplified task type for conversation display
export interface PopulatedTask {
  _id: string;
  title: string;
  status: TaskStatus;
}

export interface Review {
  _id: string;
  taskId: string;
  reviewerId: string; // User ID
  revieweeId: string; // User ID
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
}

export interface Payment {
  _id: string;
  taskId: string;
  payerId: string; // User ID
  payeeId: string; // User ID
  amount: number;
  status: PaymentStatus;
  stripePaymentIntentId: string;
  createdAt: Date;
  completedAt?: Date;
}

export const TaskCategory = {
  HOUSEHOLD: "household",
  TECH: "tech",
  TRANSPORTATION: "transportation",
  REPAIRS: "repairs",
  CLEANING: "cleaning",
  GARDENING: "gardening",
  MOVING: "moving",
  HANDYMAN: "handyman",
  OTHER: "other",
} as const;

export type TaskCategory = (typeof TaskCategory)[keyof typeof TaskCategory];

export const TimingType = {
  ON_DATE: "on_date",
  BEFORE_DATE: "before_date",
  FLEXIBLE: "flexible",
} as const;

export type TimingType = (typeof TimingType)[keyof typeof TimingType];

export const TimeOfDay = {
  MORNING: "morning",
  MIDDAY: "midday",
  AFTERNOON: "afternoon",
  EVENING: "evening",
} as const;

export type TimeOfDay = (typeof TimeOfDay)[keyof typeof TimeOfDay];

export const LocationType = {
  IN_PERSON: "in_person",
  ONLINE: "online",
} as const;

export type LocationType = (typeof LocationType)[keyof typeof LocationType];

export const TaskStatus = {
  OPEN: "open",
  ASSIGNED: "assigned",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export const BidStatus = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  WITHDRAWN: "withdrawn",
} as const;

export type BidStatus = (typeof BidStatus)[keyof typeof BidStatus];

export const PaymentStatus = {
  PENDING: "pending",
  PROCESSING: "processing",
  COMPLETED: "completed",
  FAILED: "failed",
  REFUNDED: "refunded",
} as const;

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isTasker: boolean;
  location: {
    address: string;
    coordinates: [number, number];
  };
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  category: TaskCategory;
  location: {
    address: string;
    coordinates: [number, number];
  };
  locationType: LocationType;
  suggestedPrice: number;
  dueDate?: Date;
  // New timing fields
  timingType: TimingType;
  specificDate?: Date;
  timeOfDay?: TimeOfDay[];
  needsSpecificTime: boolean;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  category?: TaskCategory;
  location?: {
    address: string;
    coordinates: [number, number];
  };
  locationType?: LocationType;
  suggestedPrice?: number;
  dueDate?: Date;
  status?: TaskStatus;
  // New timing fields
  timingType?: TimingType;
  specificDate?: Date;
  timeOfDay?: TimeOfDay[];
  needsSpecificTime?: boolean;
}

export interface CreateBidRequest {
  taskId: string;
  amount: number;
  message: string;
  estimatedDuration: number;
}

export const UserType = {
  CLIENT: "client",
  TASKER: "tasker",
} as const;

export type UserType = (typeof UserType)[keyof typeof UserType];

// Call-related types
export interface Call {
  _id: string;
  conversationId: string;
  callerId: string;
  receiverId: string;
  callType: CallType;
  status: CallStatus;
  startTime?: Date;
  endTime?: Date;
  duration?: number; // in seconds
  createdAt: Date;
}

export interface CallSignaling {
  type: "offer" | "answer" | "ice-candidate";
  data: any;
  callId: string;
  from: string;
  to: string;
}

export const CallType = {
  VOICE: "voice",
  VIDEO: "video",
} as const;

export type CallType = (typeof CallType)[keyof typeof CallType];

export const CallStatus = {
  PENDING: "pending",
  RINGING: "ringing",
  ANSWERED: "answered",
  ENDED: "ended",
  MISSED: "missed",
  DECLINED: "declined",
  FAILED: "failed",
} as const;

export type CallStatus = (typeof CallStatus)[keyof typeof CallStatus];

// Socket events for calls
export const CallEvents = {
  CALL_INITIATE: "call:initiate",
  CALL_RINGING: "call:ringing",
  CALL_ANSWER: "call:answer",
  CALL_DECLINE: "call:decline",
  CALL_END: "call:end",
  CALL_SIGNAL: "call:signal",
  CALL_STATUS_UPDATE: "call:status_update",
} as const;

export type CallEvents = (typeof CallEvents)[keyof typeof CallEvents];
