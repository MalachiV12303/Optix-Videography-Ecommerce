import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

type Props = {
  intensity?: number;
  /** smoothing factor (0..1). larger = snappier, smaller = smoother. */
  damping?: number;
  children?: React.ReactNode;
};

export const MousePanGroup: React.FC<Props> = ({
  intensity = 0.25,
  damping = 0.08,
  children,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const targetPos = useRef(new THREE.Vector3());
  const tmp = useRef(new THREE.Vector3());
  const { viewport } = useThree();

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const mx = state.mouse.x; // -1 to 1
    const my = state.mouse.y;

    // world-space offset relative to viewport size
    const offsetX = mx * (viewport.width / 2) * intensity;
    const offsetY = my * (viewport.height / 2) * intensity;
    targetPos.current.set(offsetX, offsetY, 0);

    // smooth lerp
    const lerpFactor = 1 - Math.pow(1 - damping, Math.min(1, delta * 60));
    tmp.current.copy(group.position).lerp(targetPos.current, lerpFactor);
    group.position.copy(tmp.current);
  });

  return <group ref={groupRef}>{children}</group>;
};

export default MousePanGroup;