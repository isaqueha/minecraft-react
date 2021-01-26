import React, { useState } from 'react';
import { useBox } from 'use-cannon';
import * as textures from '../textures';

export const Cube = ({ position, type, ...props }) => {
  const [hover, setHover] = useState(null);
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
    ...props,
  }));

  return (
    <mesh
      castShadow
      ref={ref}
      onPointerMove={(e) => {
        e.stopPropagation();
        const face = e.faceIndex / 2;
        setHover(Math.floor(face));
      }}
    >
      {[...Array(6)].map((_, index) => (
        <meshStandardMaterial
          attachArray="material"
          map={textures[type]}
          key={index}
          color={hover === index ? 'gray'  : 'white'}
        />
      ))}
      <boxBufferGeometry attach="geometry" />
    </mesh>
  );
};
