import { liquidFragSource } from "./shader";

// Shader and defaults adapted from paper-design/liquid-logo, revision
// 689bb38a1e0d5a6a8baf2d34847635eefde19994. License: /licenses/paper-liquid-logo.txt
const vertexSource = `#version 300 es
in vec2 a_position;
out vec2 vUv;
void main() {
  vUv = .5 * (a_position + 1.);
  gl_Position = vec4(a_position, 0., 1.);
}`;

function startRenderer(canvas: HTMLCanvasElement): () => void {
  const shaders: WebGLShader[] = [];
  let gl: WebGL2RenderingContext | null = null;
  let program: WebGLProgram | null = null;
  let buffer: WebGLBuffer | null = null;
  let texture: WebGLTexture | null = null;
  let resizeObserver: ResizeObserver | undefined;
  let intersectionObserver: IntersectionObserver | undefined;
  const image = new Image();
  let disposed = false;
  let loaded = false;
  let visible = false;
  let frame = 0;
  let previousTime: number | undefined;
  let elapsed = 0;
  let timeUniform: WebGLUniformLocation | null = null;

  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    previousTime = undefined;
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    stop();
    delete canvas.dataset.ready;
    image.onload = null;
    image.onerror = null;
    image.removeAttribute("src");
    resizeObserver?.disconnect();
    intersectionObserver?.disconnect();
    document.removeEventListener("visibilitychange", syncPlayback);
    window.removeEventListener("resize", resize);
    canvas.removeEventListener("webglcontextlost", dispose);
    if (gl) {
      // WebGL defers deleting the current program until it is unbound.
      gl.useProgram(null);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      for (const shader of shaders) gl.deleteShader(shader);
    }
  }

  function draw(now: number) {
    frame = 0;
    if (disposed || !gl || !loaded || !visible || document.hidden) return;
    if (previousTime !== undefined) elapsed += (now - previousTime) * 0.3;
    previousTime = now;
    gl.uniform1f(timeUniform, elapsed);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (!canvas.hasAttribute("data-ready")) {
      if (gl.isContextLost() || gl.getError() !== gl.NO_ERROR) {
        dispose();
        return;
      }
      canvas.dataset.ready = "";
    }
    frame = requestAnimationFrame(draw);
  }

  function syncPlayback() {
    if (disposed) return;
    if (loaded && visible && !document.hidden) {
      if (!frame) frame = requestAnimationFrame(draw);
    } else {
      stop();
    }
  }

  function resize() {
    if (disposed || !gl || !program) return;
    const bounds = canvas.getBoundingClientRect();
    // Supersample the shader's internal edges, which WebGL MSAA cannot smooth.
    // Honor retina/zoom density; cap total dimensions rather than pixel ratio.
    const ratio = Math.min(
      Math.max(window.devicePixelRatio || 1, 1) * 2,
      1024 / Math.max(bounds.width, bounds.height, 1),
    );
    const width = Math.max(1, Math.round(bounds.width * ratio));
    const height = Math.max(1, Math.round(bounds.height * ratio));
    // A new program needs this even when a reused canvas is already sized.
    gl.uniform1f(gl.getUniformLocation(program, "u_ratio"), width / height);
    if (canvas.width === width && canvas.height === height) return;
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
    // Resizing clears the drawing buffer, so keep the fallback until redrawn.
    delete canvas.dataset.ready;
    syncPlayback();
  }

  try {
    gl = canvas.getContext("webgl2", { alpha: true, antialias: true });
    if (!gl) return dispose;
    const context = gl;
    function compile(type: number, source: string) {
      const shader = context.createShader(type);
      if (!shader) throw new Error("Cannot create logo shader");
      shaders.push(shader);
      context.shaderSource(shader, source);
      context.compileShader(shader);
      if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
        throw new Error("Cannot compile logo shader");
      }
      return shader;
    }
    program = gl.createProgram();
    if (!program) throw new Error("Cannot create logo program");
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, liquidFragSource));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("Cannot link logo shader");
    gl.useProgram(program);
    buffer = gl.createBuffer();
    texture = gl.createTexture();
    if (!buffer || !texture) throw new Error("Cannot allocate logo resources");
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const defaults = {
      u_patternScale: 2,
      u_refraction: 0.015,
      u_edge: 0.4,
      u_patternBlur: 0.005,
      u_liquid: 0.07,
      u_img_ratio: 951 / 851,
    };
    for (const [name, value] of Object.entries(defaults)) {
      gl.uniform1f(gl.getUniformLocation(program, name), value);
    }
    timeUniform = gl.getUniformLocation(program, "u_time");
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform1i(gl.getUniformLocation(program, "u_image_texture"), 0);

    image.onload = () => {
      if (disposed) return;
      try {
        context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, context.RGBA, context.UNSIGNED_BYTE, image);
        // Average the large bevel mask when rendering the small hero logo.
        context.generateMipmap(context.TEXTURE_2D);
        if (context.getError() !== context.NO_ERROR) throw new Error("Cannot upload logo texture");
        loaded = true;
        syncPlayback();
      } catch {
        dispose();
      }
    };
    image.onerror = dispose;
    canvas.addEventListener("webglcontextlost", dispose);
    document.addEventListener("visibilitychange", syncPlayback);
    window.addEventListener("resize", resize);
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    intersectionObserver.observe(canvas);
    resize();
    image.src = "/logo-liquid.png";
  } catch {
    dispose();
  }
  return dispose;
}

export function mountLiquidLogo(canvas: HTMLCanvasElement): () => void {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let cleanup: (() => void) | undefined;
  function updateMotion() {
    cleanup?.();
    cleanup = reducedMotion.matches ? undefined : startRenderer(canvas);
  }
  updateMotion();
  reducedMotion.addEventListener("change", updateMotion);
  return () => {
    reducedMotion.removeEventListener("change", updateMotion);
    cleanup?.();
  };
}
