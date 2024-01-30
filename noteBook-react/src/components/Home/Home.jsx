import { useState } from "react";
import AlertBar from "./Alert";

import NotesContainer from "./NotesContainer";

export default function Home() {
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleAlert = (Msg, Type) => {
    setAlert(true);
    setAlertMsg(Msg);
    setAlertType(Type);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };
  return (
    <>
      <div className="h-12 px-6 sm:px-10 lg:px-72 py-3">
        <AlertBar alert={alert} alertMsg={alertMsg} alertType={alertType} />
      </div>
      <NotesContainer handleAlert={handleAlert} />
    </>
  );
}
