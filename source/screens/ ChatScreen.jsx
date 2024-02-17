import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator
} from "react-native";
import tw from "twrnc";
import {Entypo, FontAwesome, FontAwesome5, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {useLayoutEffect, useRef, useState} from "react";
import {collection, onSnapshot, orderBy, query, serverTimestamp} from "firebase/firestore";
import {useSelector} from "react-redux";
import {addDoc,doc} from "firebase/firestore";
import {firestoreDB} from "../../config/firebase.config";

const ChatScreen = ({route}) => {
    const {room} = route.params;
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const user = useSelector((state)=>state.user?.user)
    const [messages, setMessages] = useState(null)

    const textInputRef = useRef(null);

    {/*Handles the emojis of the keyboard*/}
    const handleKeyboardEmoji = () => {
        if(textInputRef.current){
            textInputRef.current.focus();
        }
    }

    const handleSendMessage = async () =>{
        const timeStamp = serverTimestamp();
        const id = `${Date.now()}`;
        const _doc = {
            _id : id,
            roomId : room._id,
            timeStamp : timeStamp,
            message : message,
            user : user,
        }
        {/*Added as sub collection*/}
        setMessage("") // Allows a user to effect changes to any message
        await addDoc(collection(doc(firestoreDB,"chats", room._id),"message"), _doc)
            .then(()=>{})
            .catch((error)=>alert(error))
    }

    //Displaying the messages from the firestore
    useLayoutEffect(() => {
        const msgQuery = query(collection(firestoreDB, "chats", room?._id, "message"),
            orderBy("timeStamp", "asc")
        )

        //Calling the above as  a function.
        const unsubscribe = onSnapshot(msgQuery, (querySnap)=>{
            const upMsg = querySnap.docs.map((doc) => doc.data());
            setMessages(upMsg);
            setIsLoading(false)
        });
        return unsubscribe;

    }, []);



    return(
        <View style={tw `flex-1`}>
            <View style={[tw `w-full px-4 py-5 flex-0.25`, {backgroundColor:styles.primary}]}>
                <View style={tw `flex-row items-center justify-between w-full px-4 py-12`}>
                    {/*Go Back*/}
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <MaterialIcons name={"chevron-left"} size={32} color={"#fbfbfb"}/>
                    </TouchableOpacity>

                    <View style={[tw `flex-row items-center border-2 justify-center space-x-3`,{borderColor:styles.primary}]}>
                        <View style={tw `w-12 h-12 rounded-full border border-white flex items-center justify-center`}>
                            <FontAwesome5 name={"users"} size={24} color={"#fbfbfb"}/>
                        </View>

                        <View style={tw `mx-2`}>
                            <Text style={tw `text-gray-50 text-base font-semibold capitalize`}>{room.chatName.length > 16 ? `${room.chatName.slice(0,16)}...` : room.chatName}{" "}</Text>
                            <Text style={tw `text-gray-300 text-sm font-semibold capitalize`}>Online</Text>
                        </View>
                    </View>

                    {/*Icons*/}
                    <View style={[tw `flex-row items-center justify-center`]}>
                        <TouchableOpacity>
                            <FontAwesome5 name={"video"} size={24} color={"#fbfbfb"}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={tw `mx-3`}>
                            <FontAwesome name={"phone"} size={24} color={"#fbfbfb"}/>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Entypo name={"dots-three-vertical"} size={24} color={"#fbfbfb"}/>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>

            {/*Bottom View*/}
            <View style={tw `w-full bg-white px-4 py-6 rounded-3xl flex-1 rounded-t-[50px] -mt-10`}>
                <KeyboardAvoidingView style={tw `flex-1`} behavior={Platform.OS === "ios"? "padding": "height"} keyboardVerticalOffset={160}>
                    <>
                        <ScrollView>
                            {isLoading ? (<>
                                <View style={tw `w-full flex items-center justify-center`}>
                                    <ActivityIndicator size={"large"} color={"#46C651"}/>
                                </View>
                            </>)
                                :
                                (<>
                                    {/*Messages section*/}
                                    {messages?.map((msg, i)=> msg.user.providerData.email === user.providerData.email ? (
                                            <View style={tw `m-1`} key={i}>
                                                <View style={[tw `px-4 py-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl w-auto relative`,{backgroundColor:styles.primary,alignSelf:"flex-end"}]}>
                                                    <Text style={tw `text-semibold text-base text-white`}>
                                                        {msg.message}
                                                    </Text>
                                                </View>
                                                <View style={{alignSelf:"flex-end"}}>
                                                    {msg?.timeStamp?.seconds && (
                                                        <Text style={tw `font-semibold text-[12px] text-black`}>
                                                            {new Date(parseInt(msg?.timeStamp?.seconds) * 1000).toLocaleTimeString("en-US", {
                                                                hour:"numeric",
                                                                minute:"numeric",
                                                                hour12:true
                                                            })}
                                                        </Text>
                                                    )}

                                                </View>
                                            </View>
                                    ):(
                                        //Receiver message display
                                        <><View style={tw `m-1 flex-start flex items-center justify-start mx-2`}>
                                            <View style={tw `flex-row justify-center items-center mx-2`}>
                                                {/*Profile Image*/}
                                                <Image source={{uri: msg?.user?.profilePic}} style={tw `w-12 h-12 rounded-full`} resizeMode={"contain"}/>

                                                {/*Message*/}
                                                <View style={tw `m-1`}>
                                                    <View style={[tw `px-4 py-2 rounded-tl-2xl rounded-tr-2xl bg-gray-200 rounded-bl-2xl w-auto relative`]}>
                                                        <Text style={tw `text-semibold text-base text-black`}>
                                                            {msg.message}
                                                        </Text>
                                                    </View>
                                                    <View style={{alignSelf:"flex-start"}}>
                                                        {msg?.timeStamp?.seconds && (
                                                            <Text style={tw `font-semibold text-[12px] text-black`}>
                                                                {new Date(parseInt(msg?.timeStamp?.seconds) * 1000).toLocaleTimeString("en-US", {
                                                                    hour:"numeric",
                                                                    minute:"numeric",
                                                                    hour12:true
                                                                })}
                                                            </Text>
                                                        )}

                                                    </View>
                                                </View>


                                            </View>

                                        </View></>
                                    ))}

                                </>)}

                        </ScrollView>

                        {/*Keyboard section*/}
                        <View style={tw `w-full flex-row px-8 items-center justify-center`}>
                            <View style={tw `bg-gray-200 rounded-2xl px-4 space-x-4 py-2 flex-row justify-between items-center`}>
                                <TouchableOpacity onPress={handleKeyboardEmoji}>
                                    <Entypo name={"emoji-happy"} size={24} color={"#555"}/>
                                </TouchableOpacity>

                                <TextInput style={[tw `flex-1 h-8 text-base font-bold ml-3`,{color:styles.primaryText}]}
                                           placeholder={"Type here..."} placeholderTextColor={"#999"} value={message}
                                           onChangeText={(text)=>setMessage(text)}
                                />

                                {/*Recording Icon*/}
                                <TouchableOpacity>
                                    <Entypo name={"mic"} size={24} color={"#43C651"}/>
                                </TouchableOpacity>
                            </View>

                            {/*Send Icon*/}
                            <TouchableOpacity style={tw `pl-4`} onPress={handleSendMessage}>
                                <FontAwesome name={"send"} size={24} color={"#555"}/>
                            </TouchableOpacity>

                        </View>
                    </>
                </KeyboardAvoidingView>
            </View>
        </View>
    )
};

export default ChatScreen;

const styles = StyleSheet.create({
    primary:"#43C651",
    primaryBold:"#056526",
    primaryText:"#555"
})
