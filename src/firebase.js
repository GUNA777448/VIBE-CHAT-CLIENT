import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCt4dPxwaQl-s9SHz1SYTNER94Smf-Brsk",
  authDomain: "vibe-chat-a0082.firebaseapp.com",
  projectId: "vibe-chat-a0082",
  appId: "1:1052962530847:web:011f32a01d51d4d500972a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
