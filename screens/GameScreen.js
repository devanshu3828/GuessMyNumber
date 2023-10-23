import { View, StyleSheet, Alert, FlatList, useWindowDimensions } from "react-native";
import Title from "../components/UI/Title";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import NumberContainer from "../components/Game/NumberContainer";
import PrimaryButton from "../components/UI/PrimaryButton";
import Card from "../components/UI/Card";
import InstructionText from "../components/UI/InstructionText";
import GuessLogItem from "../components/Game/GuessLogItem";

const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};
let minBoundary;
let maxBoundary;
const GameScreen = ({ userNumber, onGameOver, onRound ,roundsNumber }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const {width, height} = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(()=>{
    minBoundary = 1;
    maxBoundary = 100;
  },[])

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "higher" && currentGuess > userNumber)
    ) {
      // Alert.alert("Don't lie!", "You Know that this s wrong...", [
      //   { text: "Sorry!", style: "cancel" },
      // ]);
      
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const nextGuessedNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    onRound((currentValue) =>  [...currentValue, nextGuessedNumber]);
    setCurrentGuess(nextGuessedNumber);
  };

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <View>
          <InstructionText style={styles.instructionText}>
            {" "}
            Higher or Lower?
          </InstructionText>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={() => nextGuessHandler("lower")}>
                <Ionicons name="md-remove" size={24} color="white" />
              </PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={() => nextGuessHandler("greater")}>
                <Ionicons name="md-add" size={24} color="white" />
              </PrimaryButton>
            </View>
          </View>
        </View>
      </Card>
    </>
  );

  if(width > 500) {
    content = <>
   <View style={styles.buttonsContainerWide}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={() => nextGuessHandler("lower")}>
                <Ionicons name="md-remove" size={24} color="white" />
              </PrimaryButton>
            </View>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={() => nextGuessHandler("greater")}>
                <Ionicons name="md-add" size={24} color="white" />
              </PrimaryButton>
            </View>
          </View>
    </>
  }
  const paddingValue = width > 500 ? 8: 16;
  return (
    <View style={styles.screen}>
      <Title> Opponent's Guess </Title>
      {content}
      <View style={[styles.listContainer,{padding: paddingValue}]}>
        <FlatList data={roundsNumber}  keyExtractor={(item) => item} renderItem={(itemData) => <GuessLogItem roundNumber={itemData.index+1} guess={itemData.item}/>}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems:'center',
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  instructionText: {
    marginBottom: 12,
  },
  listContainer:{
    flex:1,
    padding:16
  },
  buttonsContainerWide : {
    flexDirection:'row',
    alignItems:'center'
  }
});
export default GameScreen;
