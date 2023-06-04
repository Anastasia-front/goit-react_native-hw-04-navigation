import { View, ImageBackground, Image, Text, StyleSheet } from "react-native";
import OverlayImage from "../components/OverlayImage";
import Post from "../components/Post";
import { Ionicons } from "@expo/vector-icons";
import { selectAvatar, selectName } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";

const ProfileScreen = ({ onLogin }) => {
  const name = useSelector(selectName);
  const avatar = useSelector(selectAvatar);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../img/Photo-BG.jpg")}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.overlayContainer}>
          <OverlayImage top={-50} />
          <Image style={styles.photoImage} source={{ uri: avatar }} />
          <Ionicons
            name="ios-log-out"
            size={35}
            color="grey"
            style={styles.icon}
            onPress={onLogin}
          />
          <View
            style={{
              marginTop: -620,
            }}
          >
            <Text style={styles.name}>{name}</Text>
            <Post
              img={require("../img/Photo-BG.jpg")}
              title="forest"
              location="Сarpathians"
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFill,
  },
  imageBackground: {
    flex: 1,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFill,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    position: "absolute",
    // top: 150,
    // right: 30,
    top: "28%",
    right: 0,
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  photoImage: {
    width: 120,
    height: 120,
    position: "absolute",
    // top: 90,
    // left: 130,
    top: "18%",
    left: "48%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    borderRadius: 16,
  },
  name: {
    fontWeight: "500",
    fontSize: 30,
    textAlign: "center",
    letterSpacing: 0.01,
    marginBottom: 20,
  },
});

export default ProfileScreen;
