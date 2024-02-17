import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, Dimensions, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import UserTextInput from "../components/UserInput";
import { avatars } from "../utils/avatar";
import {firebaseAuth, firestoreDB} from "../../config/firebase.config";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {setDoc, doc} from "firebase/firestore";

const SignUpScreen = () => {
    // Navigation hook
    const navigation = useNavigation();

    // Component state
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(avatars[0]?.image.asset.url);
    const [isAvatarMenu, setIsAvatarMenu] = useState(false);
    const [getEmailValidationStatus, setGetEmailValidationStatus] = useState(false);

    // Screen dimensions
    const screenWidth = Math.round(Dimensions.get("window").width);
    const screenHeight = Math.round(Dimensions.get("window").height);

    // Function to navigate to login page
    const handleLogIn = () => {
        navigation.navigate("LoginPage");
    }

    // Function to handle avatar selection
    const handleAvatar = (item) => {
        setAvatar(item?.image.asset.url);
        setIsAvatarMenu(false);
    };

    const handleSignUp = async () => {
        if (getEmailValidationStatus && email !== ""){
            await createUserWithEmailAndPassword(firebaseAuth, email, password)
                .then(
                    (userCred => {
                        const data = {
                            _id: userCred?.user.uid,
                            fullName: name,
                            profilePic: avatar,
                            providerData: userCred.user.providerData[0]
                        }

                        {/*Update firestore collection*/}
                        setDoc(doc(firestoreDB,"user", userCred?.user.uid), data)
                            .then(()=>{
                            navigation.navigate("LoginPage")
                        })
                    })
                )
        }
    }

    return (
        <SafeAreaView>

            {/* Avatar selection menu */}
            {isAvatarMenu && (
                <View style={[styles.absoluteFill, { width: screenWidth, height: screenHeight }]}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <BlurView style={[styles.blurContainer, { width: screenWidth, height: screenHeight }]} tint="light" intensity={40}>
                            {avatars?.map((item) => (
                                <TouchableOpacity onPress={() => handleAvatar(item)} key={item._id} style={[styles.avatarItem, { borderColor: styles.primary }]}>
                                    <Image source={{ uri: item?.image.asset.url }} style={styles.avatarImage} resizeMode="contain" />
                                </TouchableOpacity>
                            ))}
                        </BlurView>
                    </ScrollView>
                </View>
            )}

            {/* Main content */}
            <View style={styles.mainContainer}>
                <ScrollView>
                    <View style={styles.centeredContent}>
                        <Image source={require("../../assets/logo.jpg")} style={styles.logo} resizeMode={"contain"} />
                        <Text style={[styles.heading, { color: styles.primaryText }]}>Come In!</Text>

                        {/* Profile image and edit button */}
                        <View style={styles.profileImageContainer}>
                            <TouchableOpacity onPress={() => setIsAvatarMenu(true)} style={[styles.profileImage, { borderColor: styles.primary }]}>
                                <Image source={{ uri: avatar }} style={styles.avatarImage} resizeMode="contain" />
                                <View style={styles.editIcon}>
                                    <MaterialIcons name={"edit"} size={18} color={"#fff"} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Input fields */}
                        <View style={styles.inputContainer}>
                            <UserTextInput placeholder={"Full Name"} isPass={false} setStateValue={setName} />
                            <UserTextInput placeholder={"Email"} isPass={false} setStateValue={setEmail} setGetEmailValidationStatus={setGetEmailValidationStatus} />
                            <UserTextInput placeholder={"Password"} isPass={true} setStateValue={setPassword} />

                            {/* Sign In button */}
                            <TouchableOpacity onPress={handleSignUp} style={[styles.signInButton, { backgroundColor: styles.primary }]}>
                                <Text style={styles.signInText}>Sign Up</Text>
                            </TouchableOpacity>

                            {/* Sign In prompt */}
                            <View style={styles.signInPrompt}>
                                <Text style={[styles.promptText, { color: styles.primaryText }]}>Already have an account?</Text>
                                <TouchableOpacity onPress={handleLogIn}>
                                    <Text style={[styles.signInLink, { color: styles.primaryBold }]}>Sign In here!</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
};

// Styles
const styles = StyleSheet.create({
    // Absolute fill
    absoluteFill: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
    },
    // Blur container
    blurContainer: {
        flex: 1,
        paddingHorizontal: 4,
        paddingVertical: 16,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    // Avatar item
    avatarItem: {
        width: 80,
        height: 80,
        margin: 8,
        padding: 2,
        borderRadius: 40,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    // Avatar image
    avatarImage: {
        width: "100%",
        height: "100%",
        borderRadius: 40,
    },
    // Main container
    mainContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#FFF",
        borderTopLeftRadius: 15,
        paddingHorizontal: 6,
        paddingTop: 36,
        justifyContent: "flex-start",
    },
    // Centered content
    centeredContent: {
        alignItems: "center",
        flex: 1,
    },
    // Logo
    logo: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginBottom: 16,
    },
    // Heading
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    // Profile image container
    profileImageContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: 10,
    },
    // Profile image
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 50,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    // Edit icon
    editIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#43C651",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        right: 0,
    },
    // Input container
    inputContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    // Sign In button
    signInButton: {
        width: "100%",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        marginTop: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    // Sign In text
    signInText: {
        fontSize: 18,
        color: "#FFF",
        fontWeight: "bold",
    },
    // Sign In prompt container
    signInPrompt: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24,
    },
    // Sign In prompt text
    promptText: {
        fontSize: 16,
    },
    // Sign In link
    signInLink: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
    },
    // Colors
    primary: "#43C651",
    primaryBold: "#056526",
    primaryText: "#555",
});

export default SignUpScreen;


