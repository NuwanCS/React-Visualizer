import React from 'react';

interface CanvasProps {
  width: string;
  height: string;
}
export const Canvas: React.FC<CanvasProps> = (props) => {
  return <canvas {...props} />;
};
