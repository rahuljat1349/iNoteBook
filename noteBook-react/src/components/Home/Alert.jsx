import { useEffect, useContext } from "react";
import * as React from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import noteContext from "../context/noteContext";

function AlertBar({}) {
  const { enqueueSnackbar } = useSnackbar();
  const context = useContext(noteContext);
  const { alert, alertType, alertMsg } = context;

  useEffect(() => {
    if (alert) {
      // Ensure 'variant' property is set correctly
      enqueueSnackbar(alertMsg, { variant: alertType });
    }
  }, [alert, alertType]);
  return <>
  </>;
}
export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <AlertBar />
    </SnackbarProvider>
  );
}

//
