import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";
import AppInit from "./components/AppInit";


function App() {

  return (
    <BrowserRouter>
      <AppInit />
      <Toaster position="top-right" richColors closeButton />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
