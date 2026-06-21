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
          "Wearable AI assistant prototype on Google Glass Enterprise Edition 2, pairing an Android/Kotlin device app with a Google Cloud backend for real-time AI interaction.",
        role: "Wearable AI prototype engineering",
        outcome: "A continuously iterating AI field assistant smart device harnessing the audio and visual sensors of the Google Glass EE2 to augment my capabilities and perception",
        details: [
          "Built an Android/Kotlin Glass app with voice capture and visual input flow.",
          "Connected Cloud Run services using speech-to-text, Gemini 2.5 flash / Vertex AI, and image-aware responses.",
          "Designed around the constraints of Google Glass EE2’s touchpad and display by making voice the primary input path.",
          "Funded by Google Cloud credits awarded from MIT Reality Hack 2026",
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
        role: "Unity VR gameplay and interaction systems development",
        outcome: "Playable VR roguelike prototype with procedural levels, randomized weapons, and role-based enemy AI tuned for repeatable combat encounters.",
        details: [
          "Revisited a 2023 VR sandbox and expanded it into a playable roguelike prototype with a complete gameplay loop.",
          "Addressed project timeline constraints by integrating and tuning VRIF around custom gameplay systems, replacing an older XRI-based interaction stack from the original Unity prototype.",
          "Built a procedural dungeon generation system allowing players to traverse an entire level from start to finish.",
          "Paired scaling room difficulty with scaling player capability. As the player progresses, enemies are tougher and more numerous, but more powerful weapons are made available.",
          "Built lightweight and readable enemy AI systems for role-based combat behavior",
          "Deployed the project for native runtime on the Meta Quest 3 platform made publicly available through itch.io",
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
        title: "Sixth Sense - Immerse the Bay (2025)",
        category: "Hackathon / XR Interaction",
        summary:
          "Hackathon XR prototype exploring wearable and haptic interaction for spatial interfaces. Built at Stanford's Immerse the Bay XR hackathon (2025)",
        role: "Primary Unity Developer/Project Lead",
        outcome: "Award-recognized rapid XR prototype",
        details: [
          "Built Unity-side interaction logic for a rapid XR prototype.",
          "Built a hand-tracking based VR game controller for integration with Afference's pseudohaptic wearables",
          "Integrated and tuned XRI's XR hands package for custom gesture recognition.",
          "Explored alternative input and feedback channels for immersive interfaces.",
        ],
        stack: ["Unity", "XR", "Haptics", "Interaction Design"],
        media: {
          type: "youtube",
          src: "https://www.youtube.com/embed/jUNuB5x1S_Y",
          title: "Sixth Sense XR hackathon demo",
          alt: "Embedded Sixth Sense XR hackathon demo video",
        },
        links: [{ label: "Devpost", href: "https://devpost.com/software/we-love-harry-potter" }],
      },
      {
        title: "2001: HAL's Dream - MIT Reality Hack (2026)",
        category: "Hackathon / XR Narrative",
        summary:
          "MIT Reality Hack project exploring immersive narrative interaction with Google Gemini integration for narrative gameplay systems",
        role: "Unity VR developer",
        outcome: "Award Recognized XR prototype for the Gemini Live API track",
        details: [
          "Integrated Google Gemini's Live API with Unity to trigger gameplay events allowing player interaction through intent detection within the player's spoken responses.",
          "Used immersive interaction and narrative framing for an escape-room-style XR experience.",
          "Presented as a completed hackathon prototype on Devpost.",
        ],
        stack: ["MIT Reality Hack", "XR", "Unity", "Narrative Prototype"],
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
        title: "VR Financial Systems Visualization",
        category: "Interactive Systems",
        summary:
          "VR data visualization prototype for order book dynamics and packet-transfer behavior between exchanges.",
        role: "Unity VR Data Visualization Developer",
        outcome: "Immersive view of historical/live order book data and exchange packet flow",
        details: [
          "Built data ingestion logic for live crypto order book streams and historical market data snapshots.",
          "Visualized historical market order book data for top market performers and live crypto order book feeds through the Alpaca API.",
          "Represented packet transfer behavior using historical packet information among major exchanges in the United States.",
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
