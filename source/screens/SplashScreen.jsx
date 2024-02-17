import {View, ActivityIndicator, Image} from "react-native";
import tw from "twrnc";
import {useLayoutEffect} from "react";
import {firebaseAuth, firestoreDB} from "../../config/firebase.config";
import {useNavigation} from "@react-navigation/native";
import {doc, getDoc} from "firebase/firestore";
import {SET_USER} from "../../context/actions/userActions";
import {useDispatch} from "react-redux";

const SplashScreen = ()=> {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        checkLoggedUser();
    }, []);

    const checkLoggedUser = async () => {
        firebaseAuth.onAuthStateChanged((userCred)=>{
            if(userCred?.uid){
                getDoc(doc(firestoreDB, "users", userCred?.uid))
                    .then((docSnap)=>{
                        if(docSnap.exists()){
                            console.log("User Data:",docSnap.data())
                            dispatch(SET_USER(docSnap.data()))
                        }
                    })
                    .then(()=> {
                        setTimeout(()=> {
                            navigation.replace("HomePage")
                        },2000)
                })
            }else{
                navigation.replace("LoginPage")
            }
        })
    }
    return(
        <View style={tw `flex-1 items-center justify-center`}>
            <Image source={require("../../assets/logo.jpg")} resizeMode={"contain"} style={tw `w-24 h-24 mb-20 rounded-xl`}/>
            <ActivityIndicator size={"large"} color={"#43C651"}/>
        </View>
    )
};

export default SplashScreen;