import {View, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import tw from "twrnc";
import {Entypo, MaterialIcons} from "@expo/vector-icons";
import {useLayoutEffect, useState} from "react";

const UserTextInput = ({placeholder, isPass, setStateValue, setGetEmailValidationStatus}) => {
    const [value, setValue] = useState("");
    const [showPass, setShowPass] = useState(true);
    const [icons,setIcons] = useState(null);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const handleTextChanged = (text) => {
        setValue(text)
        setStateValue(value)

        if (placeholder === "Email"){
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const status = emailRegex.test(value);
            console.log(status);
            setIsEmailValid(status);
            setGetEmailValidationStatus(status);
        }
    }

    useLayoutEffect(()=>{
        switch(placeholder){
            case "Full Name":
                return setIcons("person")
            case "Email":
                return setIcons("email")
            case "Password":
                return setIcons("lock")
        }
    })

    return(
        <View style={tw `border rounded-2xl px-4 py-4 flex-row items-center justify-between my-2 ${!isEmailValid && placeholder === "Email" && value.length > 0 ? "border-red-500" : "border-gray-200"}`}>
            <MaterialIcons name={icons} size={24} color={"#6C6D83"}/>
            <TextInput
                style={[tw `flex-1 text-base font-semibold -mt-1 ml-5`,{color:styles.primaryText}] }
                value={value}
                onChangeText={handleTextChanged}
                secureTextEntry={isPass && showPass}
                autoCapitalize="none"
                placeholder={placeholder}/>

            {isPass && (
                <TouchableOpacity onPress={()=>setShowPass(!showPass)}>
                    <Entypo name={`${showPass? "eye":"eye-with-line"}`} size={24} color={"#6C6D83"}/>
                </TouchableOpacity>
            )}

        </View>
    )
};

export default UserTextInput;

const styles = StyleSheet.create({
    primary:"#43C651",
    primaryBold:"#056526",
    primaryText:"#555"
})