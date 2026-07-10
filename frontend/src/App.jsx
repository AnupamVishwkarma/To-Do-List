import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="container col-lg-8 mt-4">
      <h2 className="text-center fw-bold mb-4">Todo List App</h2>

      <TodoList />
    </div>
  );
}

export default App;