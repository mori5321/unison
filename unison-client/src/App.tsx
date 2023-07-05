import './App.css'
import { Stage, Layer, Circle, Image, Text } from 'react-konva';
import { useEditorElements } from './core/editor';

function App() {
  const { circles, addCircle, image, onImageSelected, addText, texts } = useEditorElements();

  const handleClickAddCircle = () => {
    const x = Math.floor(Math.random() * window.innerWidth);
    const y = Math.floor(Math.random() * window.innerHeight);
    addCircle({ x, y })
  }

  const handleClickAddText = () => {
    const x = Math.floor(Math.random() * window.innerWidth);
    const y = Math.floor(Math.random() * window.innerHeight);
    addText({ x, y, text: 'Hello' })
  }

  const handleChangeFile = onImageSelected

  return (
    <>
      <button onClick={handleClickAddCircle}>Add Circle</button>
      <button onClick={handleClickAddText}>Add Text</button>
      <input type="file" onChange={handleChangeFile} />
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {image && <Image image={image} />}
        </Layer>
        <Layer>
          {/* 単純に挿入順に並べた方が良さそう */}
          {circles.map((circle, index) => (
            <Circle key={index} x={circle.x} y={circle.y} radius={50} fill={circle.color} />
          ))}
          {texts.map((text, index) => (
            <Text key={index} x={text.x} y={text.y} text={text.text} fontSize={text.fontSize} fill={text.color} />
          ))}
        </Layer>
      </Stage>

    </>
  )
}

export default App
