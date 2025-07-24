import { useAuth } from "./contexts/AuthContext";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import KanbanBoard from "./components/KanbanBoard";
import "./App.css";

const HEADER_HEIGHT = 64;

function App() {
  const { user, isAuthenticated } = useAuth();

  return (
    <>
      <Header />
      <main style={{ paddingTop: HEADER_HEIGHT + 24 }}>
        {!isAuthenticated ? <LoginForm /> : <KanbanBoard />}
      </main>
    </>
  );
}

export default App;
