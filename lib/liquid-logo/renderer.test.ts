import { afterEach, expect, mock, test } from "bun:test";
import { mountLiquidLogo } from "./renderer";

const restore: (() => void)[] = [];
afterEach(() => {
  for (const reset of restore.reverse()) reset();
  restore.length = 0;
});

function replaceGlobal(name: string, value: unknown) {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, name);
  Object.defineProperty(globalThis, name, { configurable: true, value });
  restore.push(() => {
    if (descriptor) Object.defineProperty(globalThis, name, descriptor);
    else Reflect.deleteProperty(globalThis, name);
  });
}

function setup(reduced = false, webgl = true, size = { width: 89.4, height: 80 }, density = 3, fps?: number) {
  const media = Object.assign(new EventTarget(), { matches: reduced });
  const document = Object.assign(new EventTarget(), { hidden: false });
  const window = Object.assign(new EventTarget(), { devicePixelRatio: density, matchMedia: () => media });
  const frames = new Map<number, FrameRequestCallback>();
  let nextFrame = 0;
  let intersect: (entries: { isIntersecting: boolean }[]) => void = () => {};
  const disconnect = mock(() => {});
  const images: FakeImage[] = [];
  class FakeImage {
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    src = "";
    constructor() { images.push(this); }
    removeAttribute() {}
  }
  const uniforms = new Map<string, number>();
  const draw = mock(() => {});
  const release = mock(() => {});
  const loseContext = mock(() => {});
  const explicit = {
    NO_ERROR: 0,
    createProgram: () => { uniforms.clear(); return {}; },
    createShader: () => ({}),
    createBuffer: () => ({}),
    createTexture: () => ({}),
    getShaderParameter: () => true,
    getProgramParameter: () => true,
    getUniformLocation: (_program: unknown, name: string) => name,
    uniform1f: (name: string, value: number) => uniforms.set(name, value),
    getError: () => 0,
    isContextLost: () => false,
    drawArrays: draw,
    deleteProgram: release,
    getExtension: (name: string) => name === "WEBGL_lose_context" ? { loseContext } : null,
  };
  // Only browser plumbing is stubbed; exercise the real renderer lifecycle.
  const gl = new Proxy(explicit, {
    get(target, key) { return Reflect.get(target, key) ?? (() => {}); },
  });
  const canvas = Object.assign(new EventTarget(), {
    width: 300, height: 150,
    isConnected: true,
    dataset: {} as Record<string, string>,
    getContext: () => webgl ? gl : null,
    getBoundingClientRect: () => size,
    hasAttribute: () => "ready" in canvas.dataset,
  });
  replaceGlobal("window", window);
  replaceGlobal("document", document);
  replaceGlobal("Image", FakeImage);
  replaceGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    frames.set(++nextFrame, callback);
    return nextFrame;
  });
  replaceGlobal("cancelAnimationFrame", (id: number) => frames.delete(id));
  replaceGlobal("ResizeObserver", class { observe() {} disconnect = disconnect; });
  replaceGlobal("IntersectionObserver", class {
    constructor(callback: typeof intersect) { intersect = callback; }
    observe() {} disconnect = disconnect;
  });
  // This test double implements the canvas methods used by the renderer.
  const cleanup = mountLiquidLogo(canvas as unknown as HTMLCanvasElement, fps);
  restore.push(cleanup);
  return {
    canvas, uniforms, images, frames, draw, release, disconnect, cleanup, loseContext,
    motion(matches: boolean) { media.matches = matches; media.dispatchEvent(new Event("change")); },
    visibility(hidden: boolean) { document.hidden = hidden; document.dispatchEvent(new Event("visibilitychange")); },
    intersection(visible: boolean) { intersect([{ isIntersecting: visible }]); },
    tick(now: number) {
      const pending = [...frames.values()];
      frames.clear();
      for (const callback of pending) callback(now);
    },
  };
}

test("reduced motion avoids initialization and restart initializes an already sized canvas", () => {
  const s = setup(true);
  expect(s.images).toHaveLength(0);
  s.motion(false);
  s.images[0].onload?.();
  s.intersection(true);
  s.tick(100);
  expect(s.canvas.dataset.ready).toBe("");
  expect([s.canvas.width, s.canvas.height]).toEqual([536, 480]);
  s.motion(true);
  expect(s.canvas.dataset.ready).toBeUndefined();
  expect(s.frames.size).toBe(0);
  s.motion(false);
  expect(s.uniforms.get("u_ratio")).toBe(536 / 480);
  s.images[1].onload?.();
  s.intersection(true);
  s.tick(200);
  expect(s.canvas.dataset.ready).toBe("");
});

test("pausing freezes animation time and cleanup cancels work", () => {
  const s = setup();
  s.images[0].onload?.();
  s.intersection(true);
  s.tick(100);
  s.tick(200);
  expect(s.uniforms.get("u_time")).toBe(30);
  s.intersection(false);
  expect(s.frames.size).toBe(0);
  s.intersection(true);
  s.tick(10000);
  expect(s.uniforms.get("u_time")).toBe(30);
  s.visibility(true);
  expect(s.frames.size).toBe(0);
  s.visibility(false);
  s.tick(20000);
  expect(s.uniforms.get("u_time")).toBe(30);
  s.cleanup();
  s.cleanup();
  expect(s.release).toHaveBeenCalledTimes(1);
  expect(s.disconnect).toHaveBeenCalledTimes(2);
  expect(s.frames.size).toBe(0);
  expect(s.images[0].onload).toBeNull();
  expect(s.canvas.dataset.ready).toBeUndefined();
  s.motion(false);
  expect(s.images).toHaveLength(1);
});

test("texture failure and context loss retain the fallback", () => {
  const s = setup();
  s.images[0].onerror?.();
  expect(s.canvas.dataset.ready).toBeUndefined();
  expect(s.release).toHaveBeenCalledTimes(1);
  s.motion(true);
  s.motion(false);
  s.images[1].onload?.();
  s.intersection(true);
  s.tick(100);
  s.canvas.dispatchEvent(new Event("webglcontextlost"));
  expect(s.canvas.dataset.ready).toBeUndefined();
  expect(s.frames.size).toBe(0);
  expect(s.release).toHaveBeenCalledTimes(2);
});

test("unavailable WebGL keeps the static logo", () => {
  const s = setup(false, false);
  expect(s.canvas.dataset.ready).toBeUndefined();
  expect(s.frames.size).toBe(0);
  expect(s.draw).not.toHaveBeenCalled();
});

test("supersamples standard density displays", () => {
  const s = setup(false, true, { width: 89.4, height: 80 }, 1);
  expect([s.canvas.width, s.canvas.height]).toEqual([179, 160]);
});

test("bounds GPU allocation at high zoom without stretching the logo", () => {
  const s = setup(false, true, { width: 894, height: 800 }, 4);
  expect([s.canvas.width, s.canvas.height]).toEqual([1024, 916]);
  expect(s.uniforms.get("u_ratio")).toBeCloseTo(894 / 800, 3);
});

const flush = () => new Promise((resolve) => setTimeout(resolve));

test("unmounting releases the WebGL context instead of waiting for collection", async () => {
  const s = setup();
  s.images[0].onload?.();
  s.intersection(true);
  s.tick(100);
  s.cleanup();
  s.canvas.isConnected = false;
  await flush();
  expect(s.loseContext).toHaveBeenCalledTimes(1);
});

// A lost context cannot be re-acquired on the same element, so the paths that
// rebuild on this canvas -- the reduced-motion restart and the StrictMode
// remount -- must leave it intact.
test("teardown that reuses the canvas keeps the context", async () => {
  const s = setup();
  s.images[0].onload?.();
  s.intersection(true);
  s.tick(100);
  s.motion(true);
  s.motion(false);
  s.images[1].onload?.();
  s.intersection(true);
  s.tick(200);
  await flush();
  expect(s.loseContext).not.toHaveBeenCalled();
  expect(s.canvas.dataset.ready).toBe("");
  // The canvas React keeps on a StrictMode remount is still in the document.
  s.cleanup();
  await flush();
  expect(s.loseContext).not.toHaveBeenCalled();
});

test("a frame cap skips redraws while keeping animation speed", () => {
  const s = setup(false, true, { width: 89.4, height: 80 }, 3, 30);
  s.images[0].onload?.();
  s.intersection(true);
  s.tick(0);
  expect(s.draw).toHaveBeenCalledTimes(1);
  // Inside the 33.3ms gap: the frame is rescheduled but nothing is redrawn.
  s.tick(20);
  expect(s.draw).toHaveBeenCalledTimes(1);
  expect(s.frames.size).toBe(1);
  // Past the gap: one redraw, advanced by the whole elapsed time rather than
  // by the portion since the last skipped frame.
  s.tick(40);
  expect(s.draw).toHaveBeenCalledTimes(2);
  expect(s.uniforms.get("u_time")).toBe(12);
});

test("an uncapped instance redraws every frame", () => {
  const s = setup();
  s.images[0].onload?.();
  s.intersection(true);
  s.tick(0);
  s.tick(20);
  expect(s.draw).toHaveBeenCalledTimes(2);
  expect(s.uniforms.get("u_time")).toBe(6);
});
