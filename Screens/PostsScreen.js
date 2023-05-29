import { View, Text, Image, StyleSheet } from "react-native";
import { getVariable } from "../utils/isLogIn";
import Post from "../components/Post";

const PostsScreen = () => {
  return (
    <View style={styles.main}>
      <View style={styles.parent}>
        <View style={styles.person}>
          <Image style={styles.image} source={require("../img/Photo.jpg")} />
          <View style={styles.text}>
            <Text style={styles.name}>Natali Romanova</Text>
            <Text style={styles.email}>example@email.com</Text>
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <Post
            img={require("../img/Photo-BG.jpg")}
            title="forest"
            location="Carpathians"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "grey",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  parent: {
    marginHorizontal: 20,
    marginVertical: 30,
  },
  person: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  image: {
    width: 60,
    height: 60,
  },
  text: {
    letterSpacing: -0.2,
  },
  name: {
    fontSize: 15,
    fontWeight: 700,
  },
  email: { fontSize: 13, fontWeight: 400 },
});

export default PostsScreen;
