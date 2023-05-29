export const handleCameraPress = async () => {
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
