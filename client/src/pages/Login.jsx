// import { useForm } from "react-hook-form";
// import { useLocation } from "wouter";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { useToast } from "@/hooks/use-toast";
// import { storage } from "@/lib/storage";

// export default function Login() {
//   const [, setLocation] = useLocation();
//   const { toast } = useToast();

//   const form = useForm({
//     defaultValues: {
//       username: "",
//       password: ""
//     }
//   });

//   const onSubmit = (data) => {
//     const user = storage.getUsers().find(
//       u => u.username === data.username && u.password === data.password
//     );

//     if (!user) {
//       toast({
//         title: "Login failed",
//         description: "Invalid username or password",
//         variant: "destructive"
//       });
//       return;
//     }

//     storage.setCurrentUser(user);
//     toast({
//       title: "Login successful",
//       description: `Welcome back, ${user.username}!`
//     });

//     setLocation(user.isAdmin ? "/admin" : "/dashboard");
//   };

//   return (
//     <div className="max-w-md mx-auto">
//       <Card className="p-6">
//         <h1 className="text-2xl font-bold mb-6">Login</h1>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="username"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Username</FormLabel>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input type="password" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button type="submit" className="w-full">
//               Login
//             </Button>
//           </form>
//         </Form>
//       </Card>
//     </div>
//   );
// }


import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { storage } from "@/lib/storage";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const onSubmit = (data) => {
    const user = storage.getUsers().find(
      u => u.username === data.username && u.password === data.password
    );

    if (!user) {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive"
      });
      return;
    }

    storage.setCurrentUser(user);

    toast({
      title: "Login successful",
      description: `Welcome back, ${user.username}!`
    });

    // Redirect based on whether the user is an admin or not
    if (user.isAdmin) {
      setLocation("/admin");
    } else {
      setLocation("/");  // Redirect to the landing page if the user is not an admin
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
