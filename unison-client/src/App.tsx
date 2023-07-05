import './App.css'
import { Stage, Layer, Circle, Image } from 'react-konva';
import { useEditorElements } from './core/editor';

function App() {
  const { circles, addCircle, image, onImageSelected } = useEditorElements();

  const handleClickAdd = () => {
    const x = Math.floor(Math.random() * window.innerWidth);
    const y = Math.floor(Math.random() * window.innerHeight);
    addCircle({ x, y })
  }

  const handleChangeFile = onImageSelected

  return (
    <>
      <button onClick={handleClickAdd}>Add Circle</button>
      <input type="file" onChange={handleChangeFile} />
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          { image && <Image image={image} /> }
        </Layer>
        <Layer>
          {circles.map((circle, index) => (
            <Circle key={index} x={circle.x} y={circle.y} radius={50} fill={circle.color} />
          ))}
        </Layer>
      </Stage>

    </>
  )
}

export default App
