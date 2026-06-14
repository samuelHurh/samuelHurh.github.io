export type Project = {
  title: string;
  category:
    | "XR / Spatial Computing"
    | "Graphics / Rendering"
    | "Interactive Systems"
    | "Technical Experiments";
  summary: string;
  role: string;
  outcome: string;
  details: string[];
  stack: string[];
  media?: {
    type: "image" | "gif" | "youtube";
    src?: string;
    alt: string;
  };
  links?: { label: string; href: string }[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "AR Gaze-Depth Interaction Research",
    category: "XR / Spatial Computing",
    summary:
      "UIUC research prototype studying gaze-depth as an input channel for AR target selection and actuation.",
    role: "Unity AR interaction prototyping",
    outcome: "Public demo exploring gaze-depth target selection and actuation",
    details: [
      "Built Unity-based AR interaction prototypes for gaze-depth target selection.",
      "Explored how depth-aware gaze input can support spatial interaction beyond 2D cursor-style pointing.",
      "Presented as a public demo while keeping department source private.",
    ],
    stack: ["AR", "HCI", "Unity", "Computer vision", "Interaction design"],
    media: {
      type: "youtube",
      src: "https://img.youtube.com/vi/kKao8lfM_RY/hqdefault.jpg",
      alt: "Thumbnail from AR gaze-depth interaction research demo",
    },
    links: [
      { label: "Demo video", href: "https://www.youtube.com/watch?v=kKao8lfM_RY" },
      { label: "Featured video", href: "https://www.youtube.com/embed/QLrdxuODvpc" },
    ],
    featured: true,
  },
  {
    title: "Networked VR Collaboration Platform",
    category: "Interactive Systems",
    summary:
      "Multi-user VR collaboration environment with synchronized interaction state and shared workspace tools.",
    role: "Real-time networking + VR systems",
    outcome: "Shared object ownership, whiteboards, post-its, and media state across clients",
    details: [
      "Implemented multiplayer interaction patterns with Unity Netcode for GameObjects.",
      "Handled ownership transfer and shared state for collaborative objects in a VR scene.",
      "Focused on predictable interaction behavior when multiple users manipulate the same space.",
    ],
    stack: ["Unity", "C#", "Netcode for GameObjects", "VR", "Shared state"],
    featured: true,
  },
  {
    title: "VR Roguelike Shooter and Modular Weapon Generation",
    category: "XR / Spatial Computing",
    summary:
      "Procedural VR systems project combining XR interaction, dungeon generation, and modular weapon behavior.",
    role: "Unity VR gameplay systems",
    outcome: "Playable VR prototype with procedural layout and modular weapon generation",
    details: [
      "Built core VR interaction and weapon systems in Unity using VRIF / BNG patterns.",
      "Implemented procedural generation systems for replayable spatial layouts.",
      "Used the project to connect XR interaction, level generation, and rapid gameplay iteration.",
    ],
    stack: ["Unity", "C#", "VRIF / BNG", "Procedural generation", "XR interaction"],
    media: {
      type: "gif",
      src: "/target_clip.gif",
      alt: "VR target interaction clip from Unity prototype",
    },
    links: [
      { label: "Devlog channel", href: "https://www.youtube.com/@OverCaffeinated-fu1sn/featured" },
      { label: "Source", href: "https://github.com/OverCaffeinated09/steelTargetChallenge" },
    ],
    featured: true,
  },
  {
    title: "ILLIXR / Filament Foveated Rendering Exploration",
    category: "Graphics / Rendering",
    summary:
      "Rendering experiments around foveated quality reduction, shader behavior, and performance tradeoffs.",
    role: "Graphics / rendering experiments",
    outcome: "Investigation of shader-level quality reduction outside focal regions",
    details: [
      "Explored how reducing rendering quality outside the focal region affects performance and perceived output.",
      "Worked close to Filament and ILLIXR rendering behavior rather than only engine-level configuration.",
    ],
    stack: ["Filament", "ILLIXR", "Shaders", "Rendering", "Performance analysis"],
    featured: true,
  },
  {
    title: "VR High-Frequency Trading Visualization",
    category: "Interactive Systems",
    summary:
      "VR data visualization prototype for order book dynamics and packet-transfer behavior between exchanges.",
    role: "Unity VR data visualization",
    outcome: "Immersive view of historical/live order book data and exchange packet flow",
    details: [
      "Visualized historical market order book data and live crypto order book feeds.",
      "Represented packet transfer behavior using historical packet information.",
    ],
    stack: ["Unity", "VR", "Data visualization", "Market data"],
    media: {
      type: "youtube",
      src: "https://img.youtube.com/vi/byQ0YjX9xMs/hqdefault.jpg",
      alt: "Thumbnail from VR high-frequency trading visualization demo",
    },
    links: [{ label: "Video", href: "https://www.youtube-nocookie.com/embed/byQ0YjX9xMs" }],
  },
  {
    title: "Computer Graphics and WebGL Projects",
    category: "Graphics / Rendering",
    summary:
      "Graphics fundamentals work across WebGL terrain, shader exercises, rasterization, and ray tracing.",
    role: "Graphics coursework + independent implementation",
    outcome: "Runnable WebGL demos and public rasterizer/raytracer repositories",
    details: [
      "Built browser-based graphics demos around terrain generation, texture mapping, and camera movement.",
      "Includes terrain generation, textured terrain, flight/walk interaction, Python rasterization, and ray tracing.",
    ],
    stack: ["WebGL", "GLSL", "JavaScript", "Python", "Ray tracing", "Rasterization"],
    media: {
      type: "image",
      src: "/bg.jpg",
      alt: "Computer graphics background image from the existing portfolio assets",
    },
    links: [
      { label: "Terrain generation", href: "/webgl/terrain/terrainGeneration.html" },
      { label: "Texture mapping", href: "/webgl/texture/terrainTexture.html" },
      { label: "Fly terrain", href: "/webgl/flight/fly.html" },
      { label: "Python rasterizer", href: "https://github.com/samuelHurh/python_rasterizer" },
      { label: "Python raytracer", href: "https://github.com/samuelHurh/python_raytracer" },
    ],
  },
  {
    title: "Python Rasterizer and Raytracer",
    category: "Technical Experiments",
    summary:
      "Rendering fundamentals implemented directly in Python, separate from engine-level graphics APIs.",
    role: "Independent graphics implementation",
    outcome: "Public repositories for rasterization and ray tracing fundamentals",
    details: [
      "Implemented core rendering concepts in Python to strengthen graphics pipeline fundamentals.",
      "Used as supporting evidence for shader, rasterization, and ray tracing coursework.",
    ],
    stack: ["Python", "Rasterization", "Ray tracing", "Computer graphics"],
    links: [
      { label: "Rasterizer", href: "https://github.com/samuelHurh/python_rasterizer" },
      { label: "Raytracer", href: "https://github.com/samuelHurh/python_raytracer" },
    ],
  },
];
