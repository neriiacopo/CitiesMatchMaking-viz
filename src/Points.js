import * as THREE from "three";
import { useEffect, useState } from "react";
import { Html, Text } from "@react-three/drei";
import { presetsObj } from "@react-three/drei/helpers/environment-assets";

export default function Points() {
    const [points, setPoints] = useState([]);
    const [textures, setTextures] = useState([]);
    const [db, setDb] = useState([]);

    async function getJSON() {
        // Clean fetching API
        const response = await fetch("./json/Built_3D.json");
        const result = await response.json();

        const db = [];

        // const positions = new Float32Array(3);
        let points = [];
        let paths = [];
        let iter = 0;

        for (let i = 0; i < result.length; i++) {
            const positions = [...Array(3)];
            const p = result[i];
            const path = result[i].path;
            const meta = path.split("/")[3].split(".")[0].split("_");

            const texture = new THREE.TextureLoader().load(path);

            for (let j = 0; j < 3; j++) {
                positions[j] = (p.point[j] - 0.5) * 50;
            }

            // positions[2] = -i * 0.01;

            const obj = {
                id: meta[1],
                name: meta[2],
                point: positions,
                texture: texture,
            };

            db.push(obj);
            // points.push(positions);
            // textures.push(texture);
        }

        // setTextures(textures);
        // setPoints(points);
        setDb(db);
    }

    useEffect(() => {
        getJSON();
    }, []);

    let pts = [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2],
    ];

    return (
        <>
            <group>
                {db.map(function f(obj, index) {
                    return (
                        <mesh
                            key={obj.id}
                            position={obj.point}
                            scale={1}
                        >
                            <planeGeometry args={[1, 1]} />
                            <meshBasicMaterial map={obj.texture} />
                            <Html
                                position={[0, 0, 0]}
                                wrapperClass="label"
                                center
                                distanceFactor={8}
                            >
                                {obj.name}
                            </Html>

                            {/* <Text
                                font="./silkscreen-v1-latin-regular.woff"
                                fontSize={1}
                                color="salmon"
                                position-y={1.5}
                                textAlign="center"
                            >
                                {obj.name}
                                <meshNormalMaterial />
                            </Text> */}
                        </mesh>
                    );
                })}
            </group>
        </>
    );
}
