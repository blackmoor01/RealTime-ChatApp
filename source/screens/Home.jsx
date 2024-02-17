import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator
} from "react-native";
import {useSelector} from "react-redux";
import tw from "twrnc"
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import {useLayoutEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {query, collection, orderBy, onSnapshot} from "firebase/firestore"
import {firestoreDB} from "../../config/firebase.config";


const HomeScreen = () => {

    {/*This code snippet fetches the logged-in users credentials*/}
    const user = useSelector(state=> state.user?.user);

    const [isLoading, setIsLoading] = useState(true);
    const [chats, setChats] = useState(null);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        const chatQuery = query(collection(firestoreDB, "chats"), orderBy("_id", "desc"));

        {/*This triggers user edit or deletion of texts or messages*/}
        const unsubscribe = onSnapshot(chatQuery, (querySnapShot) =>{
            const chatRooms = querySnapShot.docs.map(doc => doc.data());
            setChats(chatRooms);
            setIsLoading(false)
        })

        //Return unsubscribe to stop listening to updates
        return unsubscribe

    }, []);


    return(
        <View style={tw `flex-1`}>
            <SafeAreaView>
                <View style={tw `w-full flex-row items-center rounded-full justify-between px-4 py-2`}>
                    <Image source={require("../../assets/logo.jpg")} resizeMode={"contain"} style={tw `w-12 h-12 rounded-full`}/>

                    <TouchableOpacity onPress={()=>navigation.navigate("ProfilePage")} style={[tw `w-12 h-12 rounded-full border-2 flex items-center justify-center`,{borderColor:styles.primary}]}>
                        <Image source={{uri: user?.profilePic}} style={tw `h-full w-full rounded-full`} resizeMode={"contain"}/>
                    </TouchableOpacity>
                </View>

                {/*Scroll-view*/}
                <ScrollView style={tw `w-full h-full px-4 pt-4`}>
                    <View style={tw `w-full`}>
                        {/*Message title*/}

                        <View style={tw `flex-row items-center justify-between px-2 w-full`}>
                            <Text style={[tw `text-base font-extrabold pb-2`,{color:styles.primaryText}]}>
                                Messages
                            </Text>

                            <TouchableOpacity onPress={()=>navigation.navigate("AddToChatPage")}>
                                <Ionicons name={"chatbox"} size={28} color={"#555"}/>
                            </TouchableOpacity>
                        </View>

                        {/*Activity Indicator*/}
                        {isLoading ? (<>
                            <View style={tw `w-full flex items-center justify-center`}>
                                <ActivityIndicator size={"large"} color={"#43C651"}/>
                            </View>
                        </>)
                            :
                            (<>
                                {chats && chats?.length > 0 ? (<>
                                    {chats?.map((room)=>(
                                        <MessageCard key={room._id} room={room}/>
                                    ))}
                                </>):(<>

                                </>)}

                            </>)}
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    )
};

const MessageCard = ({room}) => {
    const navigation = useNavigation();
    return(
        <TouchableOpacity onPress={()=>navigation.navigate("ChatPage",{room:room})} style={tw `w-full flex-row items-center justify-start py-2`}>
            {/*Image*/}
            <View style={[tw `w-16 h-16 rounded-full flex items-center border-2 p-1 justify-center`,{borderColor:styles.primary}]}>
                <FontAwesome5 name={"users"} size={24} color={"#555"}/>
            </View>

            {/*Content*/}
            <View style={tw `flex flex-1 items-start justify-center ml-4`}>
                <Text style={[tw `text-base font-semibold capitalize`,{color:"#333"}]}>
                    {room.chatName}
                </Text>

                <Text style={[tw `text-sm`,{color:styles.primaryText}]}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac velit eget nunc vehicula facilisis.
                </Text>
            </View>

            {/*Time*/}
            <Text style={[tw `px-2 text-base font-semibold`,{color:styles.primary}]}>
                27 min
            </Text>

        </TouchableOpacity>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    primary:"#43C651",
    primaryBold:"#056526",
    primaryText:"#555"
})