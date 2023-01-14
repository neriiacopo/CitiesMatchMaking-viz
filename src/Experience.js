import {
    Html,
    PivotControls,
    OrbitControls,
    TransformControls,
    Text,
    Float,
    MeshReflectorMaterial,
} from "@react-three/drei";
import { useRef } from "react";

export default function Experience() {
    const cubeRef = useRef();
    const sphereRef = useRef();
    const planeRef = useRef();

    return (
        <>
            <OrbitControls
                makeDefault //make the default control so that other helps will deactive it if necessary (GIZMO conflict)
                enableDamping={false}
            />

            <directionalLight
                position={[1, 2, 3]}
                intensity={1.5}
            />
            <ambientLight intensity={0.5} />

            <mesh
                ref={sphereRef}
                position-x={-2}
            >
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>
            <TransformControls
                mode="scale"
                object={sphereRef}
            />

            <PivotControls
                anchor={[0, 0, 0]} // d from centroid to bbox sides
                depthTest={false}
                lineWidth={2}
                axisColors={["#9381ff", "#ff4d6d", "#7ae582"]}
                // scale={100}
                // fixed={true}
            >
                <mesh
                    position-x={2}
                    scale={1.5}
                >
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" />
                    <Html
                        position={[0, 0, 0]}
                        wrapperClass="label"
                        center
                        distanceFactor={8}
                        occlude={[sphereRef, planeRef]}
                    >
                        That is a Cube ! 👌
                    </Html>
                </mesh>
            </PivotControls>

            <mesh
                ref={planeRef}
                position-y={-1}
                rotation-x={-Math.PI * 0.5}
                scale={10}
            >
                <planeGeometry />
                <MeshReflectorMaterial
                    resolution={512}
                    blur={[1000, 1000]}
                    mixBlur={1}
                    mirror={1}
                    // color="greenyellow"
                />
            </mesh>

            <Float
                speed={5}
                floatIntensity={1}
            >
                <Text
                    font="./silkscreen-v1-latin-regular.woff"
                    fontSize={1}
                    color="salmon"
                    position-y={1.5}
                    textAlign="center"
                >
                    TEXT Shape
                    <meshNormalMaterial />
                </Text>
            </Float>
        </>
    );
}
