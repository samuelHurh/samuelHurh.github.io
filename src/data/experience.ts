export type Experience = {
  title: string;
  organization: string;
  type: string;
  role: string;
  outcome: string;
  description: string;
  highlights: string[];
  technologies: string[];
  media: {
    type: "image";
    src?: string;
    alt: string;
  } | null;
};

export const experiences: Experience[] = [
  {
    title: "AR/XR Manufacturing Visualization Work",
    organization: "Kohler",
    type: "Professional / stakeholder-facing engineering",
    role: "Stakeholder-facing XR prototyping",
    outcome: "Unity-based spatial visualization work in a manufacturing environment",
    description:
      "Contributed to AR/XR prototyping and visualization work in a manufacturing context, involving spatial interfaces, sensed physical-world data, and Unity-based review workflows.",
    highlights: [
      "Worked on practical Unity workflows for reviewing spatial information with non-research stakeholders.",
      "Kept the work focused on usable visualization and communication rather than a public case-study artifact.",
    ],
    technologies: ["Unity", "AR/XR prototyping", "Spatial visualization", "Sensed data"],
    media: null,
  },
  {
    title: "AR Gaze-Depth Interaction Research",
    organization: "University of Illinois Urbana-Champaign",
    type: "Research",
    role: "Unity AR interaction prototyping",
    outcome: "Research demo evaluating gaze-depth target interaction",
    description:
      "Explored gaze-depth interaction as an additional input channel for AR interfaces.",
    highlights: [
      "Built prototypes supporting spatial interaction and target selection research.",
      "Worked at the intersection of XR systems, perception, and human-computer interaction.",
    ],
    technologies: ["AR", "Unity", "HCI", "Computer vision"],
    media: {
      type: "image",
      src: "https://img.youtube.com/vi/kKao8lfM_RY/hqdefault.jpg",
      alt: "AR gaze-depth interaction research video thumbnail",
    },
  },
  {
    title: "Networked VR Collaboration",
    organization: "Project work",
    type: "Systems / XR",
    role: "Real-time networking and interaction systems",
    outcome: "Shared VR scene state with object ownership and collaboration tools",
    description:
      "Implemented a multi-user VR collaboration platform with shared object state and collaborative media tools.",
    highlights: [
      "Used Unity Netcode for GameObjects for synchronized state and ownership transfer.",
      "Built collaborative affordances including whiteboards, post-its, and shared media handling.",
    ],
    technologies: ["Unity", "Netcode for GameObjects", "C#", "VR"],
    media: null,
  },
];
