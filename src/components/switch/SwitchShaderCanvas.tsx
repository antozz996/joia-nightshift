"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

type SwitchShaderCanvasProps = {
  mix: number;
  pointer: { x: number; y: number };
};

const vertex = [
  "attribute vec2 uv;",
  "attribute vec2 position;",
  "varying vec2 vUv;",
  "void main() {",
  "  vUv = uv;",
  "  gl_Position = vec4(position, 0.0, 1.0);",
  "}",
].join("\n");

const fragment = [
  "precision highp float;",
  "uniform float uTime;",
  "uniform float uMix;",
  "uniform vec2 uPointer;",
  "uniform vec2 uResolution;",
  "varying vec2 vUv;",
  "float hash(vec2 p) {",
  "  p = fract(p * vec2(123.34, 456.21));",
  "  p += dot(p, p + 45.32);",
  "  return fract(p.x * p.y);",
  "}",
  "float noise(vec2 p) {",
  "  vec2 i = floor(p);",
  "  vec2 f = fract(p);",
  "  f = f * f * (3.0 - 2.0 * f);",
  "  float a = hash(i);",
  "  float b = hash(i + vec2(1.0, 0.0));",
  "  float c = hash(i + vec2(0.0, 1.0));",
  "  float d = hash(i + vec2(1.0, 1.0));",
  "  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);",
  "}",
  "void main() {",
  "  vec2 uv = vUv;",
  "  float aspect = uResolution.x / max(uResolution.y, 1.0);",
  "  vec2 p = uv - uPointer;",
  "  p.x *= aspect;",
  "  vec3 ivory = vec3(0.953, 0.933, 0.894);",
  "  vec3 champagne = vec3(0.839, 0.741, 0.588);",
  "  vec3 bronze = vec3(0.576, 0.384, 0.243);",
  "  vec3 deep = vec3(0.027, 0.031, 0.024);",
  "  vec3 raised = vec3(0.067, 0.075, 0.059);",
  "  vec3 acid = vec3(0.843, 1.0, 0.0);",
  "  float n = noise(uv * 4.5 + vec2(uTime * 0.015, -uTime * 0.01));",
  "  float radial = smoothstep(0.62, 0.0, length(p));",
  "  float horizon = smoothstep(0.0, 1.0, uv.y);",
  "  vec3 day = mix(ivory, champagne, 0.14 + horizon * 0.18);",
  "  day = mix(day, bronze, n * 0.055);",
  "  vec3 night = mix(deep, raised, 0.25 + n * 0.22);",
  "  night += acid * radial * 0.075;",
  "  float blend = smoothstep(0.0, 1.0, uMix);",
  "  vec3 color = mix(day, night, blend);",
  "  float light = radial * mix(0.12, 0.19, blend);",
  "  color += mix(vec3(1.0, 0.82, 0.56), acid, blend) * light;",
  "  float edge = smoothstep(0.94, 0.35, distance(uv, vec2(0.5)));",
  "  color *= 0.86 + edge * 0.14;",
  "  gl_FragColor = vec4(color, 1.0);",
  "}",
].join("\n");

export function SwitchShaderCanvas({ mix, pointer }: SwitchShaderCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const mixRef = useRef(mix);
  const pointerRef = useRef(pointer);

  useEffect(() => {
    mixRef.current = mix;
  }, [mix]);

  useEffect(() => {
    pointerRef.current = pointer;
  }, [pointer]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const renderer = new Renderer({
      alpha: false,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 1.5),
    });

    const gl = renderer.gl;
    gl.canvas.setAttribute("aria-hidden", "true");
    gl.canvas.className = "nightshift-switch-canvas";
    host.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uMix: { value: mixRef.current },
        uPointer: { value: [pointerRef.current.x, pointerRef.current.y] },
        uResolution: { value: [1, 1] },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(Math.max(1, width), Math.max(1, height));
      program.uniforms.uResolution.value = [Math.max(1, width), Math.max(1, height)];
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    let frame = 0;
    const startedAt = performance.now();

    const render = (now: number) => {
      program.uniforms.uTime.value = (now - startedAt) / 1000;
      program.uniforms.uMix.value += (mixRef.current - program.uniforms.uMix.value) * 0.075;

      const currentPointer = program.uniforms.uPointer.value as number[];
      currentPointer[0] += (pointerRef.current.x - currentPointer[0]) * 0.08;
      currentPointer[1] += (pointerRef.current.y - currentPointer[1]) * 0.08;

      renderer.render({ scene: mesh });
      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      if (gl.canvas.parentElement === host) host.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <div ref={hostRef} className="nightshift-switch-shader" aria-hidden="true" />;
}
