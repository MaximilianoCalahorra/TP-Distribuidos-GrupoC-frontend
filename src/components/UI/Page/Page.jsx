import Header from "../Header/Header"
import { useLocation } from "react-router-dom";

export default function Page({ children }) {
  
  const location = useLocation();
  const ocultarHeader = [].includes(location.pathname);

  return (
    <div>
      {!ocultarHeader && <Header />}
      <main style={{ minHeight: "80vh", background: "white" }}>
        {children}
      </main>
    </div>
  );
}
