import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput} from "react-native";
import tw from "twrnc"
import {FontAwesome, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {useState} from "react";
import {doc, setDoc} from "firebase/firestore";
import {firestoreDB} from "../../config/firebase.config";

const AddToChatScreen = () => {
    const navigation = useNavigation();
    const user = useSelector(state => state.user?.user);
    const [addChat, setAddChat] = useState("");

    const handleCreateNewChat = async ()=> {
        let id = `${Date.now()}`
        const _doc = {
            _id : id,
            user : user,
            chatName: addChat,
        }

        if (addChat !== ""){
            setDoc(doc(firestoreDB, "chats", id),_doc)
                .then(()=>{
                    setAddChat("")
                    navigation.replace("HomePage")
                })
                .catch((err)=>{
                    alert("Error:",err)
                })
        }

    }
    return(
        <View style={tw `flex-1`}>
            <View style={[tw `w-full px-4 py-6 flex-0.3`, {backgroundColor:styles.primary}]}>
                <View style={tw `flex-row items-center justify-between w-full px-4 py-12`}>
                    {/*Go Back*/}
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <MaterialIcons name={"chevron-left"} size={32} color={"#fbfbfb"}/>
                    </TouchableOpacity>

                    {/*User Profile Pic*/}
                    <TouchableOpacity style={[tw `flex-row items-center border-2 justify-center space-x-3`,{borderColor:styles.primary}]}>
                        <Image source={{uri:user?.profilePic}} style={tw `w-12 h-12 rounded-full`} resizeMode={"contain"}/>
                    </TouchableOpacity>
                </View>
            </View>

            {/*Bottom View*/}
            <View style={tw `w-full bg-white px-4 py-6 rounded-3xl flex-1 rounded-t-[50px] -mt-10`}>
                <View style={tw `w-full px-4 py-4`}>
                    <View style={tw `w-full px-4 flex-row items-center justify-between py-3 rounded-xl border border-gray-200 space-x-3`}>
                        {/*Icon*/}
                        <Ionicons name={"chatbubbles"} size={24} color={"#777"}/>

                        {/*Text Input*/}
                        <TextInput value={addChat} onChangeText={(text)=>setAddChat(text)} style={[tw `flex-1 text-lg -mt-2 ml-1 h-12 w-full`,{color:styles.primaryText}]} placeholderTextColor={"#999"} placeholder={"Create a chat"}/>

                        {/*Icon*/}
                        <TouchableOpacity onPress={handleCreateNewChat}>
                            <FontAwesome name={"send"} size={24} color={"#777"}/>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        </View>
    )
};

export default AddToChatScreen;

const styles = StyleSheet.create({
    primary:"#43C651",
    primaryBold:"#056526",
    primaryText:"#555"
})