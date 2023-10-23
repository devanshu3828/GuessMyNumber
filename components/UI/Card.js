import { View, StyleSheet, Dimensions } from "react-native"
import Colors from "../../constants/Color"

const Card = ({children}) => {
  return (
    <View style={styles.container}>{children}</View>
  )
}

const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        marginTop: deviceWidth < 380 ? 18 : 36 ,
        marginHorizontal: 24,
        borderRadius: 8,
        backgroundColor: Colors.primary800,
        elevation: 80,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
      },
})
export default Card