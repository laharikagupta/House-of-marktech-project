import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function for merging class names in a way that handles
 * Tailwind CSS class conflicts correctly.
 * 
 * @param inputs - Class names to be merged
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creates a trie data structure for efficient string searching
 */
export class Trie {
  root: Map<string, any>;

  constructor() {
    this.root = new Map();
  }

  /**
   * Insert a string into the trie
   * @param str - String to insert
   * @param data - Associated data with this string (optional)
   */
  insert(str: string, data?: any): void {
    let node = this.root;
    const lowerStr = str.toLowerCase();
    
    for (const char of lowerStr) {
      if (!node.has(char)) {
        node.set(char, new Map());
      }
      node = node.get(char);
    }
    
    // Mark end of word
    node.set('$', data || true);
  }

  /**
   * Search for strings that start with a prefix
   * @param prefix - Prefix to search for
   * @returns Array of matches with their associated data
   */
  search(prefix: string): any[] {
    let node = this.root;
    const results: any[] = [];
    const lowerPrefix = prefix.toLowerCase();
    
    // Find the node at the end of the prefix
    for (const char of lowerPrefix) {
      if (!node.has(char)) {
        return results;
      }
      node = node.get(char);
    }
    
    // DFS to collect all strings from this point
    const collect = (currentNode: Map<string, any>, currentStr: string) => {
      for (const [key, value] of currentNode.entries()) {
        if (key === '$') {
          results.push(value !== true ? value : currentStr);
        } else {
          collect(value, currentStr + key);
        }
      }
    };
    
    collect(node, lowerPrefix);
    return results;
  }
}

/**
 * Delay execution for a specified amount of time
 * @param ms - Time in milliseconds to delay
 * @returns Promise that resolves after the delay
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Get initials from a name
 * @param name - Full name
 * @returns Initials (up to 2 characters)
 */
export const getInitials = (name: string): string => {
  if (!name) return '';
  const words = name.split(' ');
  
  if (words.length === 1) {
    return name.substring(0, 2).toUpperCase();
  }
  
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
};

/**
 * Format a date to a readable string
 * @param date - Date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
