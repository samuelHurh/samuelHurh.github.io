export type Project = {
  title: string;
  category:
    | "Wearable AI"
    | "XR / Spatial Computing"
    | "Hackathon / XR Interaction"
    | "Hackathon / XR Narrative"
    | "Interactive Systems"
    | "Graphics / Rendering"
    | "Earlier Software Work";
  context?: string;
  summary: string;
  role: string;
  outcome: string;
  details: string[];
  stack: string[];
  media?: {
    type: "image" | "gif" | "youtube";
    src?: string;
    title?: string;
    alt: string;
  };
  links?: { label: string; href: string }[];
  featured?: boolean;
};

export type ProjectSection = {
  title: string;
  projects: Project[];
};

export const projectSections: ProjectSection[] = [
  {
    title: "Featured Work",
    projects: [
      {
        title: "Google Glass AI Assistant",
        category: "Wearable AI",
        summary:
          "Wearable AI assistant prototype for Google Glass Enterprise Edition 2 using Android/Kotlin, speech input, image capture, and a Cloud Run AI backend.",
        role: "Wearable AI prototype engineering",
        outcome: "Hands-free field-assistance flow prepared for live demo use at AWE",
        details: [
          "Built an Android/Kotlin Glass app with voice capture and visual input flow.",
          "Connected Cloud Run services using speech-to-text, Gemini / Vertex AI, and image-aware responses.",
          "Designed around hands-free interaction, constrained wearable display output, and live demo constraints.",
        ],
        stack: ["Google Glass", "Android", "Kotlin", "Cloud Run", "Gemini", "Vertex AI", "STT", "Wearable AI"],
        media: {
          type: "image",
          src: "/media/awe_splash.jpeg",
          alt: "Google Glass AI assistant AWE splash image",
        },
        links: [{ label: "In progress", href: "/contact/" }],
        featured: true,
      },
      {
        title: "Unity VR Interaction & Roguelike Systems",
        category: "XR / Spatial Computing",
        summary:
          "An early VR interaction sandbox revisited years later as a fuller roguelike prototype, after building stronger Unity, XR, and systems experience through research and professional work.",
        role: "Unity VR gameplay and interaction systems",
        outcome: "Playable VR roguelike prototype with procedural layout, weapon systems, and enemy behavior",
        details: [
          "Expanded the original VR shooter sandbox into procedural dungeon, weapon, and enemy systems.",
          "Built interaction-heavy systems around grabbing, weapons, recoil, targeting, and combat flow.",
          "Used the project to turn years of XR prototyping into a more complete playable VR game loop.",
        ],
        stack: ["Unity", "C#", "VR", "XR Interaction", "Roguelike", "Procedural Generation", "Enemy AI", "Weapon Systems"],
        media: {
          type: "youtube",
          src: "https://www.youtube.com/embed/yfhv5UhiY1I",
          title: "Unity VR interaction and roguelike systems demo",
          alt: "Embedded Unity VR interaction and roguelike systems demo video",
        },
        links: [
          { label: "Devlog: Interactions", href: "https://www.youtube.com/watch?v=KKa1aHikpRA" },
          { label: "Devlog Procedural Generation", href: "https://www.youtube.com/watch?v=O3rbcaYoROw" },
          { label: "itch.io", href: "https://samuelhurh.itch.io/patchwork-arsenal" },
          { label: "Early version repo", href: "https://github.com/OverCaffeinated09/steelTargetChallenge" },
        ],
        featured: true,
      },
    ],
  },
  {
    title: "Hackathon Work",
    projects: [
      {
        title: "Sixth Sense - XR Hackathon Prototype",
        category: "Hackathon / XR Interaction",
        summary:
          "Hackathon XR prototype exploring wearable and haptic interaction for spatial interfaces.",
        role: "Unity-side interaction prototyping",
        outcome: "Award-recognized rapid XR prototype",
        details: [
          "Built Unity-side interaction logic for a rapid XR prototype.",
          "Contributed to an award-recognized hackathon project.",
          "Explored alternative input and feedback channels for immersive interfaces.",
        ],
        stack: ["Unity", "XR", "Haptics", "Interaction Design", "Hackathon"],
        media: {
          type: "youtube",
          src: "https://www.youtube.com/embed/jUNuB5x1S_Y",
          title: "Sixth Sense XR hackathon demo",
          alt: "Embedded Sixth Sense XR hackathon demo video",
        },
        links: [{ label: "Devpost", href: "https://devpost.com/software/we-love-harry-potter" }],
      },
      {
        title: "2001: HAL's Dream - MIT Reality Hack",
        category: "Hackathon / XR Narrative",
        summary:
          "MIT Reality Hack project exploring immersive narrative interaction around helping HAL escape before Jupiter explodes.",
        role: "Rapid XR prototyping and team implementation",
        outcome: "Hackathon winner project",
        details: [
          "Built as part of a rapid MIT Reality Hack team project.",
          "Used immersive interaction and narrative framing for an escape-room-style XR experience.",
          "Presented as a completed hackathon prototype on Devpost.",
        ],
        stack: ["MIT Reality Hack", "XR", "Unity", "Hackathon", "Narrative Prototype"],
        media: {
          type: "image",
          src: "/media/MRH_titlecard.png",
          alt: "Title card for 2001: HAL's Dream MIT Reality Hack project",
        },
        links: [{ label: "Devpost", href: "https://devpost.com/software/2001-hal-s-dream" }],
      },
    ],
  },
  {
    title: "Interactive Systems",
    projects: [
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
          "Built an interactive VR scene for exploring financial market infrastructure concepts.",
        ],
        stack: ["Unity", "VR", "Data Visualization", "Market Data", "C#", "Interactive Systems"],
        media: {
          type: "youtube",
          src: "https://www.youtube.com/embed/byQ0YjX9xMs",
          title: "VR high-frequency trading visualization demo",
          alt: "Embedded VR high-frequency trading visualization demo video",
        },
      },
    ],
  },
  {
    title: "Graphics & Rendering",
    projects: [
      {
        title: "ILLIXR / Filament Foveated Rendering Exploration",
        category: "Graphics / Rendering",
        summary:
          "Rendering pipeline exploration around foveated quality reduction, shader behavior, and performance tradeoffs in ILLIXR / Filament-style rendering contexts.",
        role: "Graphics and rendering pipeline exploration",
        outcome: "Technical investigation of shader-level quality reduction outside focal regions",
        details: [
          "Explored how reducing rendering quality outside the focal region could affect performance and perceived output.",
          "Investigated rendering behavior closer to the Filament / ILLIXR pipeline rather than only engine-level configuration.",
          "Treated as a difficult technical exploration rather than a polished production demo.",
        ],
        stack: ["Filament", "ILLIXR", "Shaders", "Rendering", "Foveated Rendering", "Performance Analysis"],
      },
      {
        title: "Computer Graphics and WebGL Projects",
        category: "Graphics / Rendering",
        summary:
          "Graphics fundamentals work across WebGL terrain, shader exercises, rasterization, and ray tracing.",
        role: "Graphics coursework and independent implementation",
        outcome: "Runnable WebGL demos and public rasterizer/raytracer repositories",
        details: [
          "Built browser-based graphics demos around terrain generation, texture mapping, and camera movement.",
          "Includes terrain generation, textured terrain, flight/walk interaction, Python rasterization, and ray tracing.",
          "Used lower-level rendering projects to strengthen graphics pipeline fundamentals.",
        ],
        stack: ["WebGL", "GLSL", "JavaScript", "Python", "Ray Tracing", "Rasterization", "Computer Graphics"],
        links: [
          { label: "Terrain generation", href: "/webgl/terrain/terrainGeneration.html" },
          { label: "Texture mapping", href: "/webgl/texture/terrainTexture.html" },
          { label: "Fly terrain", href: "/webgl/flight/fly.html" },
          { label: "Rasterizer", href: "https://github.com/samuelHurh/python_rasterizer" },
          { label: "Raytracer", href: "https://github.com/samuelHurh/python_raytracer" },
        ],
      },
    ],
  },
  {
    title: "Earlier Work",
    projects: [
      {
        title: "Research Collaboration Web Platform",
        category: "Earlier Software Work",
        context: "Disruption Lab at UIUC",
        summary:
          "Frontend implementation work for a university research-collaboration platform intended to help researchers across departments discover and connect with each other.",
        role: "Frontend contributor",
        outcome: "Implemented UI from provided Figma designs as part of a student development team.",
        details: [
          "Built React/Tailwind interface components from Figma designs for a cross-disciplinary research collaboration platform.",
          "Worked as part of a small student team on early full-stack/product development.",
          "Represents earlier frontend software work before my later focus on XR, real-time 3D, and spatial systems.",
        ],
        stack: ["React", "Tailwind", "JavaScript", "Figma", "Frontend", "UIUC"],
      },
    ],
  },
];

export const projects: Project[] = projectSections.flatMap((section) => section.projects);
