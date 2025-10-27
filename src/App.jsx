import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { AppProviders } from "./providers/QueryProvider";

function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

export default App;

/*
react-router-dom → handles pages/routing
axios → fetch API data
@tanstack/react-query → caching/loading states for API
zustand → global state (cart, dark mode, etc.) 
 */
