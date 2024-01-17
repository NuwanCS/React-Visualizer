import { useCallback, useEffect, useState } from 'react';
import { Canvas } from './components/Canvas';

function App() {
  const [randomArray, setRandomArray] = useState<number[]>([]);

  const generateArray = useCallback((input = 10) => {
    const newArray: number[] = [];
    for (let i = 0; i <= input - 1; i++) {
      const generatedNumber = Math.floor(Math.random() * input);
      newArray.push(generatedNumber);
    }
    setRandomArray(newArray);
    console.log(randomArray);
  }, []);

  useEffect(() => {
    generateArray(20);
  }, [generateArray]);
  return (
    <>
      <Canvas height="100px" width="100px" />
    </>
  );
}

export default App;
