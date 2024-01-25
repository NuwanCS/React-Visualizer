import { useCallback, useEffect, useState } from 'react';
import { Canvas } from './components/Canvas';

function App() {
  const [randomArray, setRandomArray] = useState<number[]>([]);

  const generateArray = useCallback((input = 10) => {
    const newArray: number[] = [];
    for (let i = 0; i <= input - 1; i++) {
      const generatedNumber = Math.random();
      newArray.push(generatedNumber);
    }
    setRandomArray(newArray);
    console.log(newArray);
  }, []);

  useEffect(() => {
    generateArray(20);
  }, [generateArray]);
  return (
    <>
      <Canvas height="500px" width="500px" array={randomArray} />
    </>
  );
}

export default App;
