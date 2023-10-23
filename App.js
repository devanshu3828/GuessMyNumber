import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
// import { useFonts} from "expo-font";
// import * as Font from 'expo-font';
// import AppLoading from 'expo-app-loading'
import GameStartScreen from "./screens/GameStartScreen";
import GameScreen  from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import Colors from "./constants/Color";

export default function App() {
  const [userNumber, setUseNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [roundsNumber, setRoundsNumber] = useState([]);
  const [fontsLoaded]= useFonts({
    'open-sans': require('./assets/fonts/Roboto-Bold.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
  
// const [fontLoaded, setFontLoaded] =useState(false)
//   const customFonts = {
//     'open-sans-bold': require('./assets/fonts/Roboto-Bold.ttf'),
//     // Add more fonts as needed
//   };

//   useEffect(()=> {
//    const fonts= async ()=> { 
//     const value = await Font.loadAsync(customFonts);
//     console.log(value)
//     setFontLoaded(true);
//   }
//   fonts();
// },[])

  // if(!fontsLoaded){
  //   <AppLoading/>
  // }

  const pickedNumberHandler = (enteredNumber) => {
    setUseNumber(enteredNumber);
    setGameIsOver(false);
  }
  const startNewGameHandler = ()=> {
    setUseNumber(null);
    setRoundsNumber([]);
  }
  const gameOverHandler = () => setGameIsOver(true);
  let screen = <GameStartScreen onPickedNumber={pickedNumberHandler} />
  if(userNumber){
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} onRound={setRoundsNumber}roundsNumber={roundsNumber} />
  }
  if(gameIsOver && userNumber) {
    screen =  <GameOverScreen userNumber={userNumber} roundsNumber={roundsNumber} onStartNewGame={startNewGameHandler}/>
  }
  return (
    <>
    <StatusBar style=''/>
    <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
      <ImageBackground source={require("./assets/Images/background.png")} resizeMode="cover" style={styles.rootScreen} imageStyle={styles.backgroundImage}>
        <SafeAreaView style={styles.rootScreen}>
        {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    fontSize:'1%',
    flex: 1,
    // fontFamily:'open-sans',
  },
  backgroundImage: {
    opacity:0.15
  }
});
