import { OrbitControls, Bounds, useBounds } from "@react-three/drei";
import { levaStore, useControls } from "leva";
import PointsSprite from "./PointsSprite.js";
import { useStore } from "./store/useStore.jsx";

export default function App() {
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
            min: 0.3,
            max: 1,
        },
    });
    // const label = useControls("", { label: false });

    return (
        <>
            <OrbitControls makeDefault />
            <Bounds
                fit
                clip
                observe
                margin={1}
            >
                <SelectToZoom levaActive={layer.layer}>
                    <PointsSprite
                        layer={layer.layer}
                        size={size.size}
                    />
                </SelectToZoom>
            </Bounds>
        </>
    );
}

function SelectToZoom({ children }) {
    const api = useBounds();

    // // Settings for GUI
    // const active = useControls({
    //     city: {
    //         value: "",
    //         onChange: (v) => {
    //             console.log(children);
    //             // e.object.name == v && api.refresh(e.object).fit();

    //             // useStore.setState({ active: e.object.name });
    //             // console.log(levaStore.state);
    //         },
    //     },
    // });

    const handleClick = (e) => {
        e.stopPropagation();
        e.delta <= 2 && api.refresh(e.object).fit();

        useStore.setState({ active: e.object.name });
        console.log(levaStore.state);
    };

    const handleMiss = (e) => {
        e.button === 0 && api.refresh().fit();

        useStore.setState({ active: "" });
    };

    return (
        <group
            onClick={handleClick}
            onPointerMissed={handleMiss}
        >
            {children}
        </group>
    );
}
