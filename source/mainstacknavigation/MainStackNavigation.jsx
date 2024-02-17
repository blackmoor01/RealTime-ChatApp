import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home";
import LoginScreen from "../screens/Login";
import SignUpScreen from "../screens/SignUp";
import {AddToChatScreen, ChatScreen, ProfileScreen, SplashScreen} from "../screens";


const MainStackNavigator = () => {
    const Stack = createNativeStackNavigator();
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name={"SplashPage"} component={SplashScreen}/>
                <Stack.Screen name={"LoginPage"} component={LoginScreen}/>
                <Stack.Screen name={"SignUpPage"} component={SignUpScreen}/>
                <Stack.Screen name={"HomePage"} component={HomeScreen}/>
                <Stack.Screen name={"AddToChatPage"} component={AddToChatScreen}/>
                <Stack.Screen name={"ChatPage"} component={ChatScreen}/>
                <Stack.Screen name={"ProfilePage"} component={ProfileScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default MainStackNavigator;