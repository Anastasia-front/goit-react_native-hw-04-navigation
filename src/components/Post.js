import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Post({ img, title, location }) {
  const navigation = useNavigation();
  const route = useRoute();

  const [comments, setComments] = useState(3);
  const [likes, setLikes] = useState(6);
  const [numberOfClicks, setNumberOfClicks] = useState(0);
  const handleLike = () => {
    setLikes(likes + 1);
    setNumberOfClicks(1);
    if (numberOfClicks === 1) {
      setLikes(likes - 1);
      setNumberOfClicks(0);
    }
  };

  return (
    <View>
      <Image style={styles.photo} source={img} />
      <View style={styles.parent}>
        <Text style={styles.text}>{title}</Text>
        <View style={styles.spaceBetween}>
          <View style={styles.rowGap}>
            <View style={styles.row}>
              <Ionicons
                name="list"
                size={25}
                color={comments > 0 ? "#FF6C00" : "#BDBDBD"}
                onPress={() =>
                  navigation.navigate("Comments", {
                    previousScreen: route.name,
                  })
                }
              />
              <Text style={[styles.number, comments > 0 && { color: "#000" }]}>
                {comments}
              </Text>
            </View>
            <View style={styles.row}>
              <Ionicons
                name="heart"
                size={25}
                color={likes > 0 ? "#FF6C00" : "#BDBDBD"}
                onPress={handleLike}
              />
              <Text style={[styles.number, likes > 0 && { color: "#000" }]}>
                {likes}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <Ionicons
              name="navigate"
              size={20}
              color="#BDBDBD"
              onPress={() => navigation.navigate("Map")}
            />
            <TouchableOpacity onPress={() => navigation.navigate("Map")}>
              <Text style={styles.location}>{location}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    paddingRight: 7,
    paddingLeft: 3,
    paddingTop: 3,
  },
  photo: {
    width: "100%",
    height: 240,
    backgroundColor: "#f6f6f6",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  rowGap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },
  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    marginVertical: 7,
    color: "#212121",
    fontWeight: "500",
    fontSize: 18,
  },
  number: { fontWeight: 400, fontSize: 16, color: "#BDBDBD" },
  location: {
    color: "#212121",
    fontWeight: "400",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
