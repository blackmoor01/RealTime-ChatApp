import {View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image} from "react-native";
import tw from "twrnc";
import {useNavigation} from "@react-navigation/native";
import {Entypo, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {useSelector} from "react-redux";

const Profile = () => {
    const navigation = useNavigation();
    const user = useSelector((state)=>state.user?.user);

    return (
        <SafeAreaView style={tw `flex-1 items-center justfiy-start`}>
            {/*Icons*/}
            <View style={tw `w-full flex-row items-center justify-between px-4`}>
                <TouchableOpacity onPress={()=>navigation.goBack()} style={tw ``}>
                    <MaterialIcons name={"chevron-left"} size={32} color={"#555"}/>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Entypo name={"dots-three-vertical"} size={24} color={"#555"}/>
                </TouchableOpacity>
            </View>

            {/*Profile section*/}
            <View style={tw `items-center justify-center`}>
                <View style={[tw `relative border-2 p-1 rounded-full`,{borderColor:styles.primary}]}>
                    <Image source={{uri: user?.profilePic}} style={tw `w-24 h-24 rounded-full`} resizeMode={"contain"}/>
                </View>

                <Text style={[tw `text-xl font-semibold pt-3`,{color:styles.primaryBold}]}>
                    {user?.fullName}
                </Text>

                <Text style={[tw `text-base font-semibold`,{color:styles.primaryText}]}>
                    {user?.providerData.email}
                </Text>
            </View>

            {/*Icons section*/}
            <View style={tw `flex-row w-full items-center justify-evenly py-6 `}>
                <View style={tw `items-center justify-center`}>
                    <TouchableOpacity style={tw `items-center justify-center w-12 h-12 rounded-lg bg-gray-300`}>
                        <MaterialIcons name={"messenger-outline"} size={24} color={"#555"}/>
                    </TouchableOpacity>
                    <Text style={[tw `text-sm py-1`,{color:styles.primaryText}]}>Message</Text>
                </View>

                <View style={tw `items-center justify-center`}>
                    <TouchableOpacity style={tw `items-center justify-center w-12 h-12 rounded-lg bg-gray-300`}>
                        <Ionicons name={"ios-videocam-outline"} size={24} color={"#555"}/>
                    </TouchableOpacity>
                    <Text style={[tw `text-sm py-1`,{color:styles.primaryText}]}>Video Call</Text>
                </View>

                <View style={tw `items-center justify-center`}>
                    <TouchableOpacity style={tw `items-center justify-center w-12 h-12 rounded-lg bg-gray-300`}>
                        <Ionicons name={"call-outline"} size={24} color={"#555"}/>
                    </TouchableOpacity>
                    <Text style={[tw `text-sm py-1`,{color:styles.primaryText}]}>Call</Text>
                </View>

                <View style={tw `items-center justify-center`}>
                    <TouchableOpacity style={tw `items-center justify-center w-12 h-12 rounded-lg bg-gray-300`}>
                        <Entypo name={"dots-three-horizontal"} size={24} color={"#555"}/>
                    </TouchableOpacity>
                    <Text style={[tw `text-sm py-1`,{color:styles.primaryText}]}>More</Text>
                </View>
            </View>
            {/*Media Section*/}
            <View style={tw `w-full px-6 my-3`}>
                <View style={tw `w-full flex-row items-center justify-between`}>
                    <Text style={[tw `text-base font-semibold`,{color:styles.primaryText}]}>
                        Shared
                    </Text>

                    <TouchableOpacity>
                        <Text style={[tw `text-base font-semibold uppercase `,{color:styles.primaryText}]}>
                          View All
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={tw `w-full flex-row items-center justify-between`}>
                    <TouchableOpacity style={tw `w-24 h-24 m-1 rounded-xl overflow-hidden bg-gray-300`}>
                        <Image source={{uri:"https://cdn.pixabay.com/photo/2023/06/29/10/33/lion-8096155_1280.png"}} resizeMode={"cover"} style={tw `w-full h-full`}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={tw `w-24 h-24 m-1 rounded-xl overflow-hidden bg-gray-300`}>
                        <Image source={{uri:"https://cdn.pixabay.com/photo/2023/06/29/10/33/lion-8096155_1280.png"}} resizeMode={"cover"} style={tw `w-full h-full`}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={tw `w-24 h-24 m-1 rounded-xl overflow-hidden bg-gray-300`}>
                        <Image source={{uri:"https://cdn.pixabay.com/photo/2023/06/29/10/33/lion-8096155_1280.png"}} resizeMode={"cover"} style={tw `w-full h-full`}/>

                        <View style={[tw `absolute w-full h-full items-center justify-center bg-[#00000068]`]}>
                            <Text style={tw `text-base text-white font-semibold`}>
                                250+
                            </Text>

                        </View>
                    </TouchableOpacity>
                </View>

            </View>



        </SafeAreaView>
    )
};

export default Profile;
const styles = StyleSheet.create({
    primary:"#43C651",
    primaryBold:"#056526",
    primaryText:"#555"
})