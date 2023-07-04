import './App.css'
import { Stage, Layer, Circle } from 'react-konva';
import { useEditorElements } from './core/editor';

function App() {
  const { circles, addCircle } = useEditorElements();

  const handleClickAdd = () => {
    const x = Math.floor(Math.random() * window.innerWidth);
    const y = Math.floor(Math.random() * window.innerHeight);
    addCircle({ x, y })
  }

  return (
    <>
      <button onClick={handleClickAdd}>Add Circle</button>
      <Stage width={window.innerWidth} height={window.innerHeight}>
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
