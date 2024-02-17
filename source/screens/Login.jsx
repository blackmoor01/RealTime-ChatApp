import {View, Text, SafeAreaView, Image, Dimensions,StyleSheet, TouchableOpacity} from "react-native";
import tw from "twrnc";
import UserTextInput from "../components/UserInput";
import {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import {signInWithEmailAndPassword} from "firebase/auth";
import {firebaseAuth, firestoreDB} from "../../config/firebase.config";
import {getDoc, doc} from "firebase/firestore";
import {useDispatch} from "react-redux";
import {SET_USER} from "../../context/actions/userActions";

const LoginScreen = () => {
    //const screenWidth = Math.round(Dimensions.get("window").width)
    const navigation = useNavigation();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [getEmailValidationStatus, setGetEmailValidationStatus] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const dispatch = useDispatch()
    const handleSignUp = () => {
        navigation.navigate("SignUpPage")
    };

    const handleLogIn = async () => {
        if (getEmailValidationStatus && email !== ""){
            await signInWithEmailAndPassword(firebaseAuth, email, password)
                .then((userCred)=>{
                    if(userCred){
                        console.log("User Id:",userCred?.user.uid);
                        getDoc(doc(firestoreDB, "user", userCred?.user.uid))
                            .then((docSnap)=>{
                                if(docSnap.exists()){
                                    console.log("User Data:",docSnap.data())
                                    dispatch(SET_USER(docSnap.data()))
                                }
                            })
                    }

                }).catch(err =>{
                    console.log("Error:",err.message);
                    if (err.message.includes("wrong-password")){
                        setAlert(true);
                        setAlertMessage("Password Mismatch")
                    } else if ("user-not-found"){
                        setAlert(true);
                        setAlertMessage("User Not Found");
                    } else  {
                        setAlert(true);
                        setAlertMessage("Invalid Email Address")
                    }
                    setTimeout(()=>{
                        setAlert(false)
                    },5000)
                })
        }
    }
    return(
        <SafeAreaView>
            <View style={tw `items-center justify-center`}>
                <Image source={require("../../assets/3903.jpg")} resizeMode={"cover"} style={tw `h-60 w-full`}/>
            </View>

            {/*Main View*/}
            <View style={tw `w-full h-full bg-white rounded-tl-15 -mt-20 flex justify-start items-center py-6 px-6`}>
                <Image source={require("../../assets/logo.jpg")} style={tw `h-16 w-16 rounded-xl`} resizeMode={"contain"}/>

                <Text style={[tw `py-2 font-semibold text-xl`,{color:styles.primaryText}]}>Welcome Back!</Text>

                <View style={tw `w-full flex items-center justify-center`}>

                    {/*Alert*/}
                    {alert && <Text style={tw `text-base text-red-600`}>{alertMessage}</Text> }

                    {/*Email entry*/}
                    <UserTextInput placeholder={"Email"} isPass={false} setStateValue={setEmail} setGetEmailValidationStatus={setGetEmailValidationStatus}/>

                    {/*Password entry*/}
                    <UserTextInput placeholder={"Password"} isPass={true} setStateValue={setPassword}/>

                    {/*Login Button */}
                    <TouchableOpacity onPress={handleLogIn} style={[tw `w-full px-4 py-2 rounded-xl my-3 items-center justify-center `,{backgroundColor:styles.primary}]}>
                        <Text style={tw `py-2 text-white text-xl font-semibold`}>Sign In</Text>
                    </TouchableOpacity>

                    <View style={tw `w-full py-12 flex-row items-center justify-center`}>
                        <Text style={[tw `text-base `,{color:styles.primaryText}]}>Don't have an account?</Text>
                        <TouchableOpacity onPress={handleSignUp}>
                            <Text style={[tw `ml-3 text-base font-semibold`,{color:styles.primaryBold}]}>Create Here!</Text>
                        </TouchableOpacity>
                    </View>


                </View>

            </View>
        </SafeAreaView>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    primary:"#43C651",
    primaryBold:"#056526",
    primaryText:"#555"
})