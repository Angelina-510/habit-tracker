import HabitTable from "./Components/HabitTable";
import { ModalContext, MyContext } from "./MyContext";
import { useEffect, useState } from "react";
import ChangeHabit from "./Components/ChangeHabit";
import "./index.css";

function App() {
  const [listHabit, setListHabit] = useState(() => {
    const saved = localStorage.getItem("listHabit");
    return saved ? JSON.parse(saved) : [];
  });
  const [changeHabit, setChangeHabit] = useState(undefined);

  useEffect(() => {
    localStorage.setItem("listHabit", JSON.stringify(listHabit));
  }, [listHabit]);

  return (
    <MyContext.Provider value={{ listHabit, setListHabit }}>
      <ModalContext.Provider value={{ changeHabit, setChangeHabit }}>
        <HabitTable />
        {changeHabit && <ChangeHabit />}
      </ModalContext.Provider>
    </MyContext.Provider>
  );
}

export default App;
