import './App.css'

import { Stage, Layer, Circle } from 'react-konva';

function App() {
  return (
    <>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Circle x={100} y={100} radius={50} fill="blue" />
          <Circle x={200} y={100} radius={50} fill="yellow" />
          <Circle x={300} y={100} radius={50} fill="red" />
        </Layer>
      </Stage>
    </>
  )
}

export default App
