import React, { useState } from "react";
import { TextInput, View, StyleSheet, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView } from "react-native";
import PrimaryButton from "../components/UI/PrimaryButton";
import Colors from "../constants/Color";
import Title from "../components/UI/Title";
import Card from "../components/UI/Card";
import InstructionText from "../components/UI/InstructionText"
const GameStartScreen = ({ onPickedNumber }) => {
    const {height, width} = useWindowDimensions();
    const [enteredNumber, setEnteredNumber] = useState('');
    const numberInputHandler = (value) => {
      Alert.alert("Invalid Input!", "Number has to be number between 1 and 99" , [{text: "Okay", style:"destructive", onPress: resetInputHnadler},{text: "Okay", style:"destructive", onPress: resetInputHnadler}])
        setEnteredNumber(value);
    }
    const resetInputHnadler = () =>  setEnteredNumber('');
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredNumber);
        if( isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99 ) {
            Alert.alert("Invalid Input!", "Number has to be number between 1 and 99" , [{text: "Okay", style:"destructive", onPress: resetInputHnadler}]);
            return ;
        }
        onPickedNumber(chosenNumber);
    }
    const marginTopValue = height < 380 ? 30 : 100; 
  return (
    <ScrollView style={styles.screen}>
    <KeyboardAvoidingView style={styles.screen} behavior="position">
    <View style={[styles.rootContainer,{marginTop:marginTopValue}]}>
      <Title>Guess My Number</Title>
    <Card>
      <InstructionText>Enter a Number</InstructionText>
      <TextInput
        style={styles.numberInput}
        maxLength={2}
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
        value={enteredNumber}
        onChangeText={numberInputHandler}
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}><PrimaryButton onPress={resetInputHnadler}>Reset</PrimaryButton></View>
        <View style={styles.buttonContainer}><PrimaryButton onPress={ confirmInputHandler }>Confirm</PrimaryButton></View>
      </View>
    </Card>
    </View>
  </KeyboardAvoidingView>
  </ScrollView>  
  );
};

const styles = StyleSheet.create({
  screen :{
    flex:1,
  },
  rootContainer: {
    flex:1,
    marginTop: 100,
    alignItems: 'center'
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection:'row',
  },
  buttonContainer: {
    flex:1,
  },
});
export default GameStartScreen;
