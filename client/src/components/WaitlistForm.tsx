import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().optional(),
});

type WaitlistFormValues = z.infer<typeof waitlistSchema>;

const WaitlistForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      email: "",
      name: "",
      company: "",
    },
  });

  const onSubmit = async (data: WaitlistFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/waitlist", data);
      
      toast({
        title: "Success!",
        description: "You've been added to our waitlist. We'll notify you when we launch!",
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      console.error("Waitlist submission error:", error);
      toast({
        title: "Something went wrong",
        description: "We couldn't add you to the waitlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-md">
      <h3 className="text-xl font-semibold mb-4">Join the Waitlist</h3>
      <p className="text-gray-600 mb-4">
        Be the first to get access when we launch. Early adopters receive 50% off for 6 months!
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Join Waitlist"
            )}
          </Button>
          
          <p className="text-sm text-gray-500 text-center">
            We respect your privacy and will never spam you.
          </p>
        </form>
      </Form>
    </div>
  );
};

export default WaitlistForm;
