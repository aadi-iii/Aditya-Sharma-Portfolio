// Import React hooks and components
import { useEffect, useMemo, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { ThreeElements } from "@react-three/fiber";
import { clone } from "three/addons/utils/SkeletonUtils.js";
import type { Group, Mesh } from "three";

// Import the 3D model file for the plane
import planeScene from "../assets/3d/plane.glb";

type PlaneProps = ThreeElements["mesh"] & {
  isRotating: boolean;
};

// Plane component definition
const Plane = ({ isRotating, ...props }: PlaneProps) => {
  // Create a reference for the plane mesh
  const ref = useRef<Mesh>(null);
  const floatRef = useRef<Group>(null);

  // Load the 3D model and animations using useGLTF and useAnimations hooks
  const { scene, animations } = useGLTF(planeScene);
  const clonedScene = useMemo(() => clone(scene), [scene]);
  const { actions } = useAnimations(animations, ref);

  // Aerodynamic gentle float and subtle cursor response
  useFrame((state) => {
    if (floatRef.current) {
      // Gentle ambient floating bob
      floatRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
      // Slight pitch and roll responsive to pointer
      const targetRoll = -state.pointer.x * 0.08;
      const targetPitch = state.pointer.y * 0.05;
      floatRef.current.rotation.z +=
        (targetRoll - floatRef.current.rotation.z) * 0.05;
      floatRef.current.rotation.x +=
        (targetPitch - floatRef.current.rotation.x) * 0.05;
    }
  });

  // Use useEffect to play or stop the animation based on the isRotating prop
  useEffect(() => {
    // Play the animation if isRotating is true, otherwise stop it
    if (isRotating) {
      actions["Take 001"]?.play();
    } else {
      actions["Take 001"]?.stop();
    }
  }, [actions, isRotating]);

  // Return the JSX for the Plane component with mesh and primitive
  return (
    <mesh {...props} ref={ref} dispose={null}>
      <group ref={floatRef}>
        <primitive object={clonedScene} />
      </group>
    </mesh>
  );
};

// Export the Plane component as the default export
export default Plane;
