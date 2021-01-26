import React, { useState } from 'react';
import { useBox } from 'use-cannon';
import * as textures from '../textures';

export const Cube = ({ position, texture, ...props }) => {
  const [hover, setHover] = useState(null);
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
    ...props,
  }));

  const color = texture === 'glass' ? 'skyblue'  : 'white';

  return (
    <mesh
      castShadow
      ref={ref}
      onPointerMove={(e) => {
        e.stopPropagation();
        const face = e.faceIndex / 2;
        setHover(Math.floor(face));
      }}
      onPointerOut={(e) => {
        setHover(null);
      }}
    >
      {[...Array(6)].map((_, index) => (
        <meshStandardMaterial
          attachArray='material'
          map={textures[texture]}
          key={index}
          color={hover === index ? 'gray' : color}
        />
      ))}
      <boxBufferGeometry attach="geometry" />
    </mesh>
  );
};
