import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from "@firebase/database";
import { getAuth, connectAuthEmulator } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGZ40p5_6VRIiqos8H3kSpDvDmDGqPLTc",
  authDomain: "full-stack-5.firebaseapp.com",
  databaseURL: "https://full-stack-5-default-rtdb.firebaseio.com",
  projectId: "full-stack-5",
  storageBucket: "full-stack-5.appspot.com",
  messagingSenderId: "701884432339",
  appId: "1:701884432339:web:86173603ac097aaacd7926",
  measurementId: "G-QHLGGHQCWL",
};
const isDev = import.meta.env["DEV"];
const app = initializeApp(firebaseConfig);
const db = isDev ? getDatabase() : getDatabase(app);
const auth = isDev ? getAuth() : getAuth(app);
console.log("isDev", isDev);
if (isDev) {
  console.log("Using Firebase Emulators");
  connectDatabaseEmulator(db, "localhost", 9000);
  connectAuthEmulator(auth, "http://localhost:9099");
}

export { db, auth };
