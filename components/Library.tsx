import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Library(){

    return(
        <SafeAreaView style={{flex : 1, alignItems : 'center', justifyContent : 'center'}}>
            <View>
                <Text>LIBRARY</Text>
            </View>
        </SafeAreaView>
    )
}