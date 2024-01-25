import React, { useEffect, useRef } from 'react';
import { Column } from './Column';

interface CanvasProps {
  width: string;
  height: string;
  array: number[];
}
export const Canvas: React.FC<CanvasProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const margin = 30;
  const columnSpacing = 4;
  let moves: { indicies: [number, number]; swap: boolean }[] = [];

  const bubbleSort = (arr: number[]) => {
    const trackedMoves = [];
    const len = arr.length;
    let swapped;

    do {
      swapped = false;

      for (let i = 1; i < len; i++) {
        if (arr[i - 1] > arr[i]) {
          // Swap elements if they are in the wrong order
          [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
          trackedMoves.push({
            indicies: [i - 1, i],
            swap: true,
          });
          swapped = true;
        } else {
          trackedMoves.push({
            indicies: [i - 1, i],
            swap: false,
          });
        }
      }
    } while (swapped);

    return trackedMoves;
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    const cols: Column[] = [];
    const n = props.array.length;
    if (canvas && context) {
      const animate = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < cols.length; i++) {
          cols[i].draw(context);
        }

        if (moves.length > 0) {
          const move = moves.shift();
          if (move) {
            const [i, j] = move.indicies;

            console.log('i, j', i, j, cols[j]);

            if (move?.swap) {
              cols[i].moveToLocation(cols[j]);
              cols[j].moveToLocation(cols[i]);
              [cols[i], cols[j]] = [cols[j], cols[i]];
            } else {
              //todo
            }
          }
        }
        requestAnimationFrame(animate);
      };
      const spacing = (canvas.width - margin * 2) / n;

      for (let i = 0; i < props.array.length - 1; i++) {
        const x = i * spacing + spacing / 2 + margin;
        const y = canvas.height - margin - i * 3;
        const width = spacing - columnSpacing;
        const height = (canvas.height - margin * 2) * props.array[i];
        cols[i] = new Column(x, y, width, height);
        // if () {
        cols[i].draw(context);
        // }
      }
      moves = bubbleSort(props.array);
      console.log(moves);

      animate();
    }
  }, [props.array, props.width, props.height]);

  return <canvas ref={canvasRef} {...props} />;
};
