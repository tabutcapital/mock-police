// import { useForm } from "react-hook-form";
// import { useLocation } from "wouter";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { useToast } from "@/hooks/use-toast";
// import { storage } from "@/lib/storage";
// import { nanoid } from "nanoid";

// export default function Register() {
//   const [, setLocation] = useLocation();
//   const { toast } = useToast();

//   const form = useForm({
//     defaultValues: {
//       username: "",
//       email: "",
//       password: "",
//       confirmPassword: ""
//     }
//   });

//   const onSubmit = (data) => {
//     if (data.password !== data.confirmPassword) {
//       form.setError("confirmPassword", {
//         message: "Passwords do not match"
//       });
//       return;
//     }

//     const existingUser = storage.getUsers().find(
//       u => u.username === data.username || u.email === data.email
//     );

//     if (existingUser) {
//       toast({
//         title: "Registration failed",
//         description: "Username or email already exists",
//         variant: "destructive"
//       });
//       return;
//     }

//     const user = {
//       id: nanoid(),
//       username: data.username,
//       email: data.email,
//       password: data.password,
//       isAdmin: false
//     };

//     storage.saveUser(user);
//     storage.setCurrentUser(user);

//     toast({
//       title: "Registration successful",
//       description: "Welcome to the Police Portal"
//     });

//     setLocation("/dashboard");
//   };

//   return (
//     <div className="max-w-md mx-auto">
//       <Card className="p-6">
//         <h1 className="text-2xl font-bold mb-6">Create an Account</h1>

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
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input type="email" {...field} />
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

//             <FormField
//               control={form.control}
//               name="confirmPassword"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Confirm Password</FormLabel>
//                   <FormControl>
//                     <Input type="password" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button type="submit" className="w-full">
//               Register
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
import { nanoid } from "nanoid";

export default function Register() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      isAdmin: false // Adding isAdmin field
    }
  });

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      form.setError("confirmPassword", {
        message: "Passwords do not match"
      });
      return;
    }

    const existingUser = storage.getUsers().find(
      u => u.username === data.username || u.email === data.email
    );

    if (existingUser) {
      toast({
        title: "Registration failed",
        description: "Username or email already exists",
        variant: "destructive"
      });
      return;
    }

    const user = {
      id: nanoid(),
      username: data.username,
      email: data.email,
      password: data.password,
      isAdmin: data.isAdmin // Set isAdmin from form data
    };

    storage.saveUser(user);
    storage.setCurrentUser(user);

    toast({
      title: "Registration successful",
      description: "Welcome to the Police Portal"
    });

    // Redirect to the appropriate page based on isAdmin
    setLocation(user.isAdmin ? "/admin" : "/dashboard");
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Create an Account</h1>

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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* New field to select if user is an admin */}
            <FormField
              control={form.control}
              name="isAdmin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Register as Admin</FormLabel>
                  <FormControl>
                    <Input type="checkbox" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
