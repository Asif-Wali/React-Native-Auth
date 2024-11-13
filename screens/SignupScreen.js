import { useState, useContext } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { createUser } from "../util/auth";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authctx = useContext(AuthContext);

  async function HandleSignUp({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token=await createUser(email, password);
      authctx.authenticate(token);
    } catch (error) {
      Alert.alert("Couldn't create User", "Please check your credentials");
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating User ..." />;
  }
  return <AuthContent onAuthenticate={HandleSignUp} />;
}

export default SignupScreen;
