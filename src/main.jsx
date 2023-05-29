import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colors: {},
          colorScheme: "light",
          components: {
            Button: {
              defaultProps: {
                radius: "lg",
                sx: {
                  paddingLeft: 32,
                  paddingRight: 32,
                },
              },
            },
          },
        }}
      >
        <ModalsProvider>
          <App />
          <Notifications />
        </ModalsProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
