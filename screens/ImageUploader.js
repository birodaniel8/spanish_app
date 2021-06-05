import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { auth, storage } from "../firebase";
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-elements';
import { styles } from '../Styles';

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  
  const pickImage = async () => {
    // handle permissions:
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    // select image:
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: false,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }

    console.log(result)
  };

  const uploadImage = async () => {
    // upload the photo:
    const imageName = image.substring(image.lastIndexOf('/') + 1)
    console.log(imageName)
    const response = await fetch(image);
    const blob = await response.blob();
    await storage.ref(imageName).put(blob)
    // var storageRef = storage.ref(imageName);
    // storageRef.put(image, {contentType: 'image/png'}). then(res => console.log(res));
    // console.log(storage)
  }

  return (
    <View style={styles.container}>
      <Button containerStyle={styles.buttonContainer} title="Pick an image from camera roll" onPress={pickImage} />
      <Button containerStyle={styles.buttonContainer} title="upload" onPress={uploadImage} />
    </View>
  )
}

export default ImageUploader
