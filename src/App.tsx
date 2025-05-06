import DomainTable from "./components/DomainTable";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main className="p-6">
        <DomainTable />
      </main>
    </>
  );
}

export default App;
