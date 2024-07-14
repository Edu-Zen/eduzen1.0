import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import axios from "axios";
import exampleImage from "../assets/logo.png";
import Icon from "react-native-vector-icons/Ionicons";
import { API_URL } from "@env";

const ScreenB = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handleContinue = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      console.log(API_URL);
      const response = await axios.post(
        `${API_URL}/api/students/register`,
        {
          email,
          password,
          confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Assuming response.data contains the JSON response from the server
      Alert.alert(
        "Success",
        "Registration successful, please check your email for verification code"
      );
      navigation.navigate("ScreenC", { email });
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        if (errorMessage === "Student with given email already exists!") {
          Alert.alert("Error", "Email already exists. Redirecting to login.");
          navigation.navigate("ScreenLogin");
        } else {
          Alert.alert("Error", errorMessage || "Registration failed");
        }
      } else if (error.request) {
        Alert.alert(
          "Error",
          "No response received from server. Please try again."
        );
      } else {
        console.error("Error", error.message);
        Alert.alert("Error", "An error occurred. Please try again.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Image source={exampleImage} style={styles.logo} />
      <Text style={styles.title}>Créez votre profil</Text>
      <Text style={styles.subtitle}>Configurez votre identification</Text>
      {console.log(API_URL)}

      <TextInput
        style={styles.input}
        placeholder="Adresse email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Mot de passe"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.iconContainer}
        >
          <Icon
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Vérifiez votre mot de passe"
          secureTextEntry={!isConfirmPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={toggleConfirmPasswordVisibility}
          style={styles.iconContainer}
        >
          <Icon
            name={isConfirmPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continuer</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ScreenLogin")}>
        <Text style={styles.loginText}>Already have an account? Sign-in</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width , height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  logo: {
    width: width * 0.35,
    height: height * 0.2,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 10,
    height: "100%",
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#20AD96",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  loginText: {
    color: "#20AD96",
    fontSize: width * 0.045,
  },
});

export default ScreenB;
