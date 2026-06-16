export type ExperienceMedia = {
  type: "image" | "video";
  src: string;
  title?: string;
  alt: string;
};

export type Experience = {
  title: string;
  organization: string;
  type: string;
  role: string;
  outcome: string;
  description: string;
  highlights: string[];
  technologies: string[];
  media: ExperienceMedia[] | null;
};

export type WorkSection = {
  title: string;
  description: string;
  items: Experience[];
};

export type AdditionalExperience = {
  title: string;
  organization: string;
  date: string;
  description: string;
  highlights: string[];
  technologies: string[];
};

export const workSections: WorkSection[] = [
  {
    title: "Professional XR Work",
    description:
      "Stakeholder-facing XR, computer vision, and visualization work summarized at a public-safe level.",
    items: [
      {
        title: "Industrial 6D Pose and AR Visualization",
        organization: "Kohler",
        type: "Professional / Stakeholder-Facing Engineering",
        role: "Computer vision and AR visualization prototyping",
        outcome: "High-level spatial review, calibration, and stakeholder-facing visualization workflows",
        description:
          "Worked on computer-vision and AR visualization workflows for aligning sensed physical-world geometry with digital 3D context in an industrial setting.",
        highlights: [
          "Explored RGB-D sensing, point cloud processing, pose alignment, and Unity-based visualization.",
          "Worked with RealSense-style depth data, Open3D/ICP concepts, and AR overlay workflows.",
          "Kept public descriptions high-level and omitted confidential implementation details, assets, and internal context.",
        ],
        technologies: ["Computer Vision", "6D Pose", "RGB-D", "Open3D", "ICP", "Unity", "AR Visualization"],
        media: null,
      },
      {
        title: "Networked VR Collaboration Platform",
        organization: "Kohler / Project work",
        type: "Systems / XR",
        role: "Real-time networking and VR interaction systems",
        outcome: "In-house prototype for shared VR meetings, training, and collaborative media review",
        description:
          "Built an in-house VR collaboration prototype intended to replace an expensive external service for distributed VR meetings and training. Implemented shared scene state, object ownership, and collaborative media workflows.",
        highlights: [
          "Used Unity Netcode for GameObjects for synchronized state and ownership transfer.",
          "Built collaborative affordances including whiteboards, post-its, and shared media handling.",
          "Framed as a professional/stakeholder-facing tool rather than a public game or demo.",
        ],
        technologies: ["Unity", "Netcode for GameObjects", "VR", "RTC", "Collaboration Tools", "C#"],
        media: null,
      },
      {
        title: "UE5 VR Product Visualization Prototype",
        organization: "Kohler",
        type: "Professional / XR Product Visualization",
        role: "VR prototyping and spatial product visualization",
        outcome: "Early stakeholder-facing prototype for evaluating room-scale product presentation",
        description:
          "Created an early room-scale VR prototype for visualizing a high-end sauna product line in residential and wellness spaces, focused on scale, spatial understanding, and stakeholder review.",
        highlights: [
          "Prototyped a VR scene for viewing a templated sauna product at human scale.",
          "Focused on spatial understanding for a product users physically enter and exit.",
          "Explored UE5 as a visualization path for premium product presentation.",
        ],
        technologies: ["UE5", "VR", "Product Visualization", "Spatial Design", "Prototyping"],
        media: null,
      },
    ],
  },
  {
    title: "AR/VR Research",
    description:
      "Public-safe AR interaction research prototypes from University of Illinois Urbana-Champaign.",
    items: [
      {
        title: "AR Gaze-Depth Interaction / FocusFlow",
        organization: "University of Illinois Urbana-Champaign",
        type: "Research",
        role: "AR interaction prototyping and Magic Leap implementation",
        outcome: "Research demos evaluating gaze-depth interaction behavior",
        description:
          "Implemented AR interaction prototypes on Magic Leap exploring gaze-depth as an input channel for spatial target selection and actuation.",
        highlights: [
          "Implemented Unity/Magic Leap prototypes for gaze-depth interaction.",
          "Explored gaze-depth as an input channel for target selection and spatial actuation.",
          "Built demonstration material for AR/VR HCI research presentation.",
        ],
        technologies: ["Magic Leap", "Unity", "Eye Tracking", "HCI", "AR Interaction", "Gaze-Depth"],
        media: [
          {
            type: "video",
            src: "https://www.youtube.com/embed/QLrdxuODvpc",
            title: "AR gaze-depth interaction demo",
            alt: "Embedded AR gaze-depth interaction demo video",
          },
          {
            type: "video",
            src: "https://www.youtube.com/embed/kKao8lfM_RY",
            title: "Earlier AR gaze-depth research demo",
            alt: "Embedded earlier AR gaze-depth research demo video",
          },
        ],
      },
      {
        title: "Gaze-Swipe Typing / Ring Keyboard",
        organization: "University of Illinois Urbana-Champaign",
        type: "Research Prototype",
        role: "Research prototyping and interaction design",
        outcome: "Research prototype and presentation material for evaluating gaze-based text entry",
        description:
          "Built and evaluated a gaze-based text input prototype using a circular keyboard layout, autocomplete support, and time-step gaze clustering.",
        highlights: [
          "Reduced text input into a circular key layout informed by autocomplete support.",
          "Used time-step gaze clustering rather than dwell-based actuation.",
          "Created prototype/demo material for user testing and research presentation.",
        ],
        technologies: ["Eye Tracking", "Unity", "GPT-2", "Text Input", "HCI", "Ring Keyboard", "Gaze Interaction"],
        media: [
          {
            type: "video",
            src: "https://www.youtube.com/embed/29reqAPXCa0",
            title: "Gaze-swipe typing ring keyboard demo",
            alt: "Embedded gaze-swipe typing ring keyboard demo video",
          },
        ],
      },
    ],
  },
];

export const additionalExperience: AdditionalExperience[] = [
  {
    title: "Course Assistant - Introduction to Computer Science",
    organization: "University of Illinois Urbana-Champaign",
    date: "Jan. 2021 - May 2021",
    description:
      "Supported students in UIUC's introductory programming sequence through office hours and coding walkthroughs.",
    highlights: [
      "Helped students debug and understand foundational programming concepts.",
      "Led office-hour support and coding walkthroughs for introductory CS coursework.",
      "Early teaching experience that strengthened communication around technical concepts.",
    ],
    technologies: ["Teaching", "Java", "Intro CS", "Debugging", "Mentorship"],
  },
];
