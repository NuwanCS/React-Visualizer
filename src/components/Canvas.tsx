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

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    const cols = [];
    const n = props.array.length;
    if (canvas) {
      const spacing = (canvas.width - margin * 2) / n;

      for (let i = 0; i < props.array.length - 1; i++) {
        const x = i * spacing + spacing / 2 + margin;
        const y = canvas.height - margin - i * 3;
        const width = spacing - columnSpacing;
        const height = (canvas.height - margin * 2) * props.array[i];
        cols[i] = new Column(x, y, width, height);
        if (context) {
          cols[i].draw(context);
        }
      }
    }
  }, [props.array, props.width, props.height]);

  return <canvas ref={canvasRef} {...props} />;
};
