import { 
  users, 
  type User, 
  type InsertUser,
  waitlist,
  type Waitlist,
  type InsertWaitlist,
  contactMessages,
  type ContactMessage,
  type InsertContact
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Waitlist operations
  addToWaitlist(entry: InsertWaitlist): Promise<Waitlist>;
  getWaitlistEntries(): Promise<Waitlist[]>;
  
  // Contact operations
  createContactMessage(message: InsertContact): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private waitlistEntries: Map<number, Waitlist>;
  private contactMessages: Map<number, ContactMessage>;
  private userCurrentId: number;
  private waitlistCurrentId: number;
  private contactMessageCurrentId: number;

  constructor() {
    this.users = new Map();
    this.waitlistEntries = new Map();
    this.contactMessages = new Map();
    this.userCurrentId = 1;
    this.waitlistCurrentId = 1;
    this.contactMessageCurrentId = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Waitlist operations
  async addToWaitlist(entry: InsertWaitlist): Promise<Waitlist> {
    // Check if email already exists
    const existingEntry = Array.from(this.waitlistEntries.values()).find(
      (e) => e.email === entry.email
    );
    
    if (existingEntry) {
      throw new Error("Email already registered in waitlist");
    }
    
    const id = this.waitlistCurrentId++;
    const newEntry: Waitlist = { 
      ...entry, 
      id, 
      createdAt: new Date() 
    };
    
    this.waitlistEntries.set(id, newEntry);
    return newEntry;
  }
  
  async getWaitlistEntries(): Promise<Waitlist[]> {
    return Array.from(this.waitlistEntries.values());
  }
  
  // Contact operations
  async createContactMessage(message: InsertContact): Promise<ContactMessage> {
    const id = this.contactMessageCurrentId++;
    const newMessage: ContactMessage = {
      ...message,
      id,
      createdAt: new Date()
    };
    
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }
  
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
}

export const storage = new MemStorage();
