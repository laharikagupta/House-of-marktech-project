import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, Mail } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminMessages() {
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  
  const { data: messages, isLoading, error } = useQuery<ContactMessage[]>({
    queryKey: ['/api/admin/messages'],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading messages...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-red-500 text-xl mb-4">Error loading messages</div>
        <p className="text-gray-600">Please try again later or contact support.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Messages list */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Contact Messages</h1>
            <Badge variant="outline" className="text-sm py-1">
              {messages?.length || 0} Messages
            </Badge>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Messages</CardTitle>
              <CardDescription>
                View and manage contact form submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>A list of all contact form submissions.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                        No messages received yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    messages?.map((message) => (
                      <TableRow 
                        key={message.id} 
                        className={selectedMessage?.id === message.id ? "bg-primary/5" : ""}
                      >
                        <TableCell className="font-medium">{message.name}</TableCell>
                        <TableCell>{message.subject}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                            {formatDate(new Date(message.createdAt))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedMessage(message)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        {/* Message details */}
        <div className="w-full md:w-1/3">
          {selectedMessage ? (
            <Card>
              <CardHeader>
                <CardTitle>{selectedMessage.name}</CardTitle>
                <CardDescription className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  {selectedMessage.email}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Subject</h3>
                  <p className="text-lg font-medium">{selectedMessage.subject}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Message</h3>
                  <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <div className="text-sm text-gray-500">
                  Received: {formatDate(new Date(selectedMessage.createdAt))}
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedMessage(null)}
                >
                  Close
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="bg-gray-50 border border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-10">
                <div className="text-gray-400 text-center mb-2">
                  Select a message to view details
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}