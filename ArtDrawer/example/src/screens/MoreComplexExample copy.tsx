import React, { useRef } from 'react';
import { Button, View } from 'react-native';
import { Canvas, CanvasRef } from '@benjeau/react-native-draw';
import { Text } from 'react-native-svg';
import { captureRef } from 'react-native-view-shot';
import ViewShot from "react-native-view-shot";

import { }
export default () => {
  const imageRef = useRef();
  const canvasRef = useRef<CanvasRef>(null);

  const handleUndo = () => {
    canvasRef.current?.undo();
  };

  const handleClear = () => {
    canvasRef.current?.clear();
  };
  const handleSave = () => {
   captureRef(imageRef, {
      format: "jpg",
      quality: 0.8,
      result: "tmpfile",
      snapshotContentContainer: false
    }).then(
      uri => console.log("Image saved to", uri),
      error => console.error("Oops, snapshot failed", error)
    );
  };

  return (
    <>
    <ViewShot ref={imageRef} options={{ fileName: "Your-File-Name", format: "jpg", quality: 0.9 }}>
    <Text>...Something to rasterize...</Text>
  </ViewShot>
      <Canvas
        ref={canvasRef}
        height={600}
        color="red"
        thickness={20}
        opacity={0.6}
        style={{ backgroundColor: 'black' }}
      />
      <Button title="Undo" onPress={handleUndo} />
      <Button title="Clear" onPress={handleClear} />
      <Button title="Save" onPress={handleSave} />
    </>
  );
};
