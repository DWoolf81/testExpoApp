import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import * as ImapePicker from "expo-image-picker";

import CircleButton from "./components/CircleButton";
import IconButton from "./components/IconButton";

import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";

import { useState } from "react";

const PlaceHolderImage = require("./assets/images/background-image.png");

export default function App() {
  const [pickedEmoji, setPickedEmoji] = useState(null)

  const [isModelVisible, setIsModalVisible] =  useState(false)

  const [showAppOptions, setShowAppOptions] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const pickImageAsync = async () => {


    let result = await ImapePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    console.log(result)

    
    // if result.canceled == false then it's true
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select an image");
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };
 

  const onSaveImageAsync = () => {
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceHolderImage}
          selectedImage={selectedImage}
        />
        { pickedEmoji !== 'null' ?
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          :
          null }
  
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            theme="primary"
            label="Choose A Photo"
            onPress={pickImageAsync}
          />
          <Button
            label="Use This Photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker isVisible={isModelVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },

  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
