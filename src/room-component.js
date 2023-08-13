import { createRef, useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { SoftShadows, Float, CameraControls, Sky, PerformanceMonitor } from "@react-three/drei"
import { useControls } from "leva"
import { Perf } from "r3f-perf"
import { easing } from "maath"
import { Model as Room } from "./Room"
import { Color } from "three"
import { LEDStrip } from "./led-tools"

function Light() {
  const ref = useRef()
  useFrame((state, delta) => {
    easing.dampE(ref.current.rotation, [(state.pointer.y * Math.PI) / 50, (state.pointer.x * Math.PI) / 20, 0], 0.2, delta)
  })
  return (
    <group ref={ref}>
      <directionalLight position={[5, 5, -8]} castShadow intensity={0} shadow-mapSize={2048} shadow-bias={-0.001}>
        <orthographicCamera attach="shadow-camera" args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]} />
      </directionalLight>
    </group>
  )
}

export default function RoomCool(props) {
  const [bad, set] = useState(false)
  const references = [];
  const { impl, debug, enabled, samples, ...config } = useControls({
    debug: true,
    enabled: true,
    size: { value: 35, min: 0, max: 100, step: 0.1 },
    focus: { value: 0.5, min: 0, max: 2, step: 0.1 },
    samples: { value: 16, min: 1, max: 40, step: 1 }
  })

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
     references.push(createRef())
    }
  }, [])

  return (
    <Canvas shadows camera={{ position: [5, 2, 10], fov: 50 }}>
      {debug && <Perf position="top-left" />}
      <PerformanceMonitor onDecline={() => set(true)} />
      {enabled && <SoftShadows {...config} samples={bad ? Math.min(6, samples) : samples} />}
      <CameraControls makeDefault />
      <color attach="background" args={["#d0d0d0"]} />
      <fog attach="fog" args={["#d0d0d0", 8, 35]} />
      <ambientLight intensity={0.2} />

      {
        props.LEDStrip.LEDs.map((strip, index) => {
          if (index > 10) {
            return null
          }

          return (
            <pointLight ref={references.at(index)} distance={4} castShadow={false} color={new Color(255 - index * 2, index * 2, 255)} position={[index * 2 - 5, -2, -5]} intensity={0.05} />
          )
        })
      }
      <Light />
      <Room scale={0.5} position={[0, -1, 0]} />
      <Sky inclination={0.52} scale={20} />
    </Canvas>
  )
}

