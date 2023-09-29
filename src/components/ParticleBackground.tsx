"use client";

import { useCallback } from "react";
import { Container, Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import particlesConfig from "@/config/particlesConfig";

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      zLayers: -10;
    },

    []
  );

  return (
    <Particles
      className="fixed -z-10"
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particlesConfig}
    />
  );
}
