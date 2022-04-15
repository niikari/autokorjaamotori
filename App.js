import { useFonts } from "expo-font";
import UserState from "./context/UserState";
import Navigation from "./Navigation";

export default function App() {
  
  const [loading] = useFonts({
    Dosis: require("./assets/fonts/Dosis-Light.ttf")
  })

  while (!loading) {
    return null
  }
  
  return (
    <UserState>
      <Navigation />
    </UserState>
  );
}
