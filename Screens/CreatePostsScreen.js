import { Ionicons } from "@expo/vector-icons";
import Input from "../components/InputCreatePost";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import { Camera } from "expo-camera";
import CustomButton, { UnactiveButton } from "../components/Button";
import { ActionSheetIOS } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { saveLocationAction } from "../redux/locationActions";

export default function CreatePostsScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [name, setName] = useState("");
  const [writtenLocation, setWrittenLocation] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [buttonPressCount, setButtonPressCount] = useState(0);
  const [type, setType] = useState(Camera.Constants.Type.back);

  //   useEffect(() => {
  //     setName(""), setWrittenLocation("");
  //   }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      dispatch(saveLocationAction(coords)).catch((error) => {
        console.log("Ошибка при сохранении местоположения:", error);
      });
    })();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        const { height } = event.endCoordinates;
        setKeyboardHeight(height - 300);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleCameraPress = async () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Сделать фото", "Выбрать из галереи", "Отмена"],
        cancelButtonIndex: 2,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          // Проверяем доступность камеры
          const { status } = await Camera.requestCameraPermissionsAsync();
          if (status === "granted") {
            if (buttonPressCount === 0) {
              const { uri } = await cameraRef.takePictureAsync();
              await MediaLibrary.createAssetAsync(uri);
              console.log(uri);
              console.log(selectedPhoto);
              setSelectedPhoto(uri);
            } else if (buttonPressCount === 1) {
              setSelectedPhoto(null);
              const { uri } = await cameraRef.takePictureAsync();
              await MediaLibrary.createAssetAsync(uri);
              console.log(uri);
              console.log(selectedPhoto);
              setSelectedPhoto(uri);
            }
          } else {
            // Разрешение на использование камеры не было предоставлено
            console.log(
              "Разрешение на использование камеры не было предоставлено"
            );
          }
        } else if (buttonIndex === 1) {
          // Выбрать из галереи
          const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status === "granted") {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });

            if (!result.canceled) {
              const selectedAsset = await MediaLibrary.createAssetAsync(
                result.assets[0].uri
              );
              const selectedUri = await MediaLibrary.getAssetInfoAsync(
                selectedAsset
              );
              setSelectedPhoto(selectedUri.uri);
              //   console.log(selectedUri.uri);
            }
          }
        }
        setButtonPressCount(1);
      }
    );
  };

  const handleSubmit = () => {
    navigation.navigate("Posts");
    handleDelete();
  };
  const handleDelete = () => {
    setName("");
    setWrittenLocation("");
    setSelectedPhoto(null);

    console.log(name, writtenLocation, selectedPhoto);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.main}>
        <View style={styles.parent}>
          <View>
            {selectedPhoto ? (
              <>
                <ImageBackground
                  source={{ uri: selectedPhoto }}
                  style={styles.camera}
                  ref={setCameraRef}
                >
                  <View style={styles.photoViewSelected}>
                    <TouchableOpacity
                      style={styles.cameraButtonSelected}
                      onPress={handleCameraPress}
                    >
                      <Ionicons name="camera" size={30} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </>
            ) : (
              <Camera style={styles.camera} type={type} ref={setCameraRef}>
                <View style={styles.photoView}>
                  <TouchableOpacity
                    style={styles.flipContainer}
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }}
                  >
                    <Ionicons name="git-compare" size={20} color="#BDBDBD" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cameraButton}
                    onPress={handleCameraPress}
                    // onPress={async () => {
                    //   if (cameraRef) {
                    //     const { uri } = await cameraRef.takePictureAsync();
                    //     await MediaLibrary.createAssetAsync(uri);
                    //   }
                    // }}
                  >
                    <Ionicons name="camera" size={30} color="#BDBDBD" />
                  </TouchableOpacity>
                </View>
              </Camera>
            )}
          </View>

          {selectedPhoto !== null ? (
            <Text style={styles.text}>Редагувати фото</Text>
          ) : (
            <Text style={styles.text}>Завантажте фото</Text>
          )}

          <View style={{ marginTop: -keyboardHeight }}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <Input
                placeholder="Назва..."
                value={name}
                onChangeText={setName}
              />
              <Ionicons
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                }}
                name="attach"
                size={25}
                color="#BDBDBD"
              />
              <Input
                placeholder="Місцевість..."
                value={writtenLocation}
                onChangeText={setWrittenLocation}
              />
              <Ionicons
                style={{
                  position: "absolute",
                  top: 80,
                  left: 10,
                }}
                name="navigate"
                size={20}
                color="#BDBDBD"
              />
            </KeyboardAvoidingView>
          </View>
          {name !== "" && writtenLocation !== "" && selectedPhoto !== null ? (
            <CustomButton text="Опублікувати" onPress={handleSubmit} />
          ) : (
            <UnactiveButton text="Опублікувати" />
          )}

          <View style={styles.delete}>
            <UnactiveButton width={70} onPress={handleDelete} />
            <Ionicons
              style={{
                position: "absolute",
                top: 25,
                left: 22,
              }}
              name="trash"
              size={25}
              color="#BDBDBD"
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

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
    marginVertical: 40,
  },
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: 350,
    height: 240,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  cameraButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: "50%",
  },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  cameraButtonSelected: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3);",
    borderRadius: "50%",
  },
  photoViewSelected: {
    flex: 1,
    backgroundColor: "transparent",
    marginTop: 90,
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
  },
  flipContainer: {
    position: "absolute",
    top: 10,
    right: -120,
  },
  text: {
    color: "#BDBDBD",
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  placeholderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  placeholderText: {
    marginLeft: 5,
    color: "#BDBDBD",
  },
  delete: {
    position: "absolute",
    bottom: -180,
    left: 130,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
