import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyPage(){

    return(
        <SafeAreaView style={{flex : 1, alignItems : 'center', justifyContent : 'center'}}>
            <View>
                <Text>MY PAGE</Text>
            </View>
        </SafeAreaView>
    )
}