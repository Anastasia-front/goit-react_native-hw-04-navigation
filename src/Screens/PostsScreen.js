import { View, Text, Image, StyleSheet } from "react-native";
import Post from "../components/Post";
import {
  selectEmail,
  selectAvatar,
  selectName,
  selectPostLocation,
  selectPostName,
  selectPostPhoto,
} from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
// import { PostsList } from "../components/PostList";

const PostsScreen = () => {
  const name = useSelector(selectName);
  const avatar = useSelector(selectAvatar);
  const email = useSelector(selectEmail);
  const postName = useSelector(selectPostName);
  const postPhoto = useSelector(selectPostPhoto);
  const postLocation = useSelector(selectPostLocation);
  // const photo = require(`${avatar}`);

  return (
    <View style={styles.main}>
      <View style={styles.parent}>
        <View style={styles.person}>
          <Image style={styles.image} source={{ uri: avatar }} />
          <View style={styles.text}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          {/* <PostsList /> */}
          <Post
            img={{ uri: postPhoto }}
            title={postName}
            location={postLocation}
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
