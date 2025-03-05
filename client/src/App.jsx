import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import PoliceInfo from "@/pages/PoliceInfo";
import NotFound from "@/pages/not-found";
import { storage } from "@/lib/storage";



function PrivateRoute({ component: Component, adminOnly = false }) {
  const user = storage.getCurrentUser();

  if (!user) {
    return <Route component={Login} />;
  }

  if (adminOnly && !user.isAdmin) {
    return <Route component={NotFound} />;
  }

  return <Route component={Component} />;
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/police-info" component={PoliceInfo} />
        <Route path="/dashboard">
          <PrivateRoute component={Dashboard} />
        </Route>
        <Route path="/admin">
          <PrivateRoute component={AdminDashboard} adminOnly={true} />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;


// import { QueryClientProvider } from "@tanstack/react-query";
// import { queryClient } from "./lib/queryClient";
// import { Toaster } from "@/components/ui/toaster";
// import Layout from "@/components/Layout";
// import Home from "@/pages/Home";
// import Login from "@/pages/Login";
// import Register from "@/pages/Register";
// import Dashboard from "@/pages/Dashboard";
// import AdminDashboard from "@/pages/AdminDashboard";
// import PoliceInfo from "@/pages/PoliceInfo";
// import NotFound from "@/pages/not-found";
// import { storage } from "@/lib/storage";
// import { Router as WouterRouter, Route as WouterRoute } from "wouter"; // Import Router from wouter
// import PrivateRoute from "@/components/PrivateRoute"; // Assuming this is defined elsewhere

// // Renamed PrivateRoute to avoid conflict
// function AppPrivateRoute({ component: Component, adminOnly = false }) {
//   const user = storage.getCurrentUser();

//   if (!user) {
//     return <WouterRoute component={Login} />;
//   }

//   if (adminOnly && !user.isAdmin) {
//     return <WouterRoute component={NotFound} />;
//   }

//   return <WouterRoute component={Component} />;
// }

// function AppRouter() {
//   return (
//     <Layout>
//       <WouterRouter>
//         <WouterRoute path="/" component={Home} />
//         <WouterRoute path="/login" component={Login} />
//         <WouterRoute path="/register" component={Register} />
//         <WouterRoute path="/police-info" component={PoliceInfo} />
//         <WouterRoute path="/dashboard">
//           <AppPrivateRoute component={Dashboard} />
//         </WouterRoute>
//         <WouterRoute path="/admin-dashboard">
//           <AppPrivateRoute component={AdminDashboard} adminOnly={true} />
//         </WouterRoute>
//         <WouterRoute component={NotFound} />
//       </WouterRouter>
//     </Layout>
//   );
// }

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <AppRouter />
//       <Toaster />
//     </QueryClientProvider>
//   );
// }

// export default App;
