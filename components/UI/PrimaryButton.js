import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Colors from "../../constants/Color";
const PrimaryButton = ({children, onPress}) => {
  return (
      <View style={styles.buttonOutterContainer}>
        <Pressable style={({pressed}) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer } android_ripple={{color:Colors.primary600}} onPress={onPress}>
        <Text style={styles.buttonText}>{children}</Text>
        </Pressable>
      </View>
    
  );
};

const styles = StyleSheet.create({
  buttonOutterContainer: {
    borderRadius: 28,
    margin:4,
    overflow:'hidden',
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },

  buttonText: {
    color:'white',
    textAlign:'center',
  },
  pressed :{
    opacity:0.75,
  }
});
export default PrimaryButton;
