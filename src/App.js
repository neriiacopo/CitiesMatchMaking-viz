import { OrbitControls } from "@react-three/drei";
import Points from "./Points.js";

export default function App() {
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

            {/* <mesh scale={0.1}>
                <sphereGeometry />
                <meshBasicMaterial />
            </mesh> */}

            <Points />
        </>
    );
}
