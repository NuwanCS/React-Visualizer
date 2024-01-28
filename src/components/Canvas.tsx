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
          swapped = true;
          [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
          trackedMoves.push({
            indicies: [i - 1, i],
            swap: true,
          });
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
  const cols: Column[] = [];
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    const n = props.array.length;

    if (canvas && context) {
      const spacing = (canvas.width - margin * 2) / n;

      for (let i = 0; i < props.array.length; i++) {
        const x = i * spacing + spacing / 2 + margin;
        const y = canvas.height - margin - i * 3;
        const width = spacing - columnSpacing;
        const height = (canvas.height - margin * 2) * props.array[i];
        cols[i] = new Column(x, y, width, height);
      }

      const animate = () => {
        let changed = false;
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < cols.length; i++) {
          changed = cols[i].draw(context) || changed;
        }

        if (!changed && moves.length > 0) {
          const move = moves.shift();
          if (move) {
            const [i, j] = move.indicies;
            if (move.swap) {
              cols[i].moveToLocation(cols[j]);
              cols[j].moveToLocation(cols[i], -1);
              [cols[i], cols[j]] = [cols[j], cols[i]];
            } else {
              //todo
            }
          }
        }
        requestAnimationFrame(() => animate());
      };
      moves = bubbleSort(props.array);
      animate();
    }
  }, [props.array, props.width, props.height]);

  return <canvas ref={canvasRef} {...props} />;
};
