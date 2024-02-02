import { useEffect, useContext } from "react";
import * as React from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import noteContext from "../context/noteContext";

function AlertBar({}) {
  const { enqueueSnackbar } = useSnackbar();
  const context = useContext(noteContext);
  const { alert, alertType, alertMsg } = context;
  // const [variant, setVariant] = React.useState(alertType)
  useEffect(() => {
    if (alert) {
      enqueueSnackbar(alertMsg, { alertType });
    }
    console.log(alertType);
  }, [alert]);
  return <></>;
}
export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <AlertBar />
    </SnackbarProvider>
  );
}

//
