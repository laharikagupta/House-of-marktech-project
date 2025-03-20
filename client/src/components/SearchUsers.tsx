import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, X } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

interface User {
  id: number;
  name: string;
  email: string;
}

const SearchUsers = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ["https://jsonplaceholder.typicode.com/users"],
  });
  
  const searchUsers = useCallback((term: string, userList: User[] = []) => {
    if (!term) return userList;
    
    const lowerCaseTerm = term.toLowerCase();
    return userList.filter(user => 
      user.name.toLowerCase().includes(lowerCaseTerm) || 
      user.email.toLowerCase().includes(lowerCaseTerm)
    );
  }, []);
  
  const filteredUsers = debouncedSearchTerm && users 
    ? searchUsers(debouncedSearchTerm, users) 
    : users;
  
  const clearSearch = () => {
    setSearchTerm("");
  };
  
  // Generate initials from name
  const getInitials = (name: string) => {
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return nameParts[0].substring(0, 2).toUpperCase();
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="text-center mb-12">
            <Badge variant="outline" className="bg-primary/10 text-primary-700 hover:bg-primary/20 mb-4 px-3 py-1 text-sm">
              Existing Users
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Search Our User Community</h2>
            <p className="text-lg text-gray-600">Connect with others who are already using our platform.</p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex items-center mb-6 gap-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    placeholder="Search users by name or email..."
                  />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={clearSearch}
                  disabled={!searchTerm}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {isLoading ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="w-12 h-12 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[200px]" />
                          <Skeleton className="h-3 w-[150px]" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredUsers && filteredUsers.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-lg font-semibold text-primary-700">
                            {getInitials(user.name)}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium">{user.name}</h4>
                          <p className="text-gray-600 text-sm">{user.email}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-lg text-gray-500 font-medium">No users found matching your search</p>
                  <p className="text-gray-400">Try a different search term</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchUsers;
