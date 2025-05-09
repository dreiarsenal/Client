import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import LandingNavigation from "./navigation/LandingNavigation";


export default function RootLayout() {

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),

  });

  if (!loaded) {
    return null;
  }

  return (

    <GestureHandlerRootView>
      <LandingNavigation />
    </GestureHandlerRootView>
  );
}