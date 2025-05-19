import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from 'sonner';
function App() {
  return (
    <BrowserRouter>
     <Toaster position="top-right" richColors closeButton />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
