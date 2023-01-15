import { OrbitControls } from "@react-three/drei";
import { useControls, buttonGroup, Leva } from "leva";
import { useEffect, useState } from "react";
import PointsSprite from "./PointsSprite.js";
import PointsFrame from "./PointsFrame.js";

export default function App() {
    // Settings for GUI
    const layer = useControls({
        layer: {
            value: "built",
            options: {
                built: "built",
                landform: "landform",
                NDVI: "NDVI",
                landuse: "landuse",
                "soil water": "soil water",
                "night time light": "night lights",
            },
        },
    });
    const size = useControls("", {
        size: {
            value: 1,
            min: 0,
            max: 2,
        },
    });
    const label = useControls("", { label: false });

    return (
        <>
            <OrbitControls />
            {/* <directionalLight
                position={[1, 2, 3]}
                intensity={1.5}
            />
            <ambientLight intensity={0.5} /> */}
            <PointsSprite
                layer={layer.layer}
                size={size.size}
                label={label.label}
            />
            {/* <PointsFrame
                layer={layer.layer}
                size={size.size}
                label={label.label}
            /> */}
        </>
    );
}
