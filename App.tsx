import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import MediaLibrary from 'expo-media-library';

export default function App(){

  const [image, setImage] = useState(null);
  const [camera, setCamera] = useState<Camera>(null);
  const [permission, setPermission] = useState(null);
  const [capturedimage, setCapturedimage] = useState(null);


  useEffect(() =>{

    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setPermission(cameraStatus.status === 'granted');
    })();
  },[]);

  async function takePicture(){
    if (camera) {

    const photo = await camera.takePictureAsync();
    console.log(photo.uri)

    await MediaLibrary.saveToLibraryAsync(photo.uri);

    }
  }

  return(
    <View style={styles.container}>
      <Camera 
        ref={(ref) =>setCamera(ref)}
        style={styles.styleCamera}
        type={CameraType.back}
        ratio={'1:1'}
      />
      <Button title="Capturar Foto" onPress={() => {takePicture()}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },

  styleCamera: {
    aspectRatio: 1,
    flex: 1
  }

});