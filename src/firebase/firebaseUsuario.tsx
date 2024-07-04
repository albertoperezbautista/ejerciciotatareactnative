import { getAuth, signOut } from "firebase/auth";

import { firebaseApp } from "./firebaseConfig";

export const logOut = async () => {
  const auth = await getAuth(firebaseApp);

  signOut(auth);
};
