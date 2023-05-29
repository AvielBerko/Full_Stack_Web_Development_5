import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import initJPHGetLoader from "./lib/data/loders/jsonPlaceholder/jsonPlaceHolderGetLoader.ts";
import initFirebaseGetLoader from "./lib/data/loders/firebase/firebaseGetLoader.ts";
import initFirebaseSaveLoader from "./lib/data/loders/firebase/firebaseGetSavers.ts";
import initJPHSaveLoader from "./lib/data/loders/jsonPlaceholder/jsonPlaceHoldergetSavers.ts";

//setup database managers (DI container)
initJPHGetLoader();
initFirebaseGetLoader();
initFirebaseSaveLoader();
initJPHSaveLoader();


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
