export const MAIN_NAVIGATION_PARAMS = [
  {
    link: { title: "Home", link: "" },
    subLinks: [
      { title: "About Me", link: "about" },
      { title: "Curriculum Vitae", link: "cv" }
    ]
  },
  {
    link: { title: "Projects", link: "projects" },
    subLinks: [
      { title: "Dissertation", link: "dissertation", img: "assets/dissertation/fish_2048.webp" },
      { title: "Autonomous Vehicle", link: "autonomous-vehicle", img: "assets/autonomousVehicle/final_car.webp" },
      { title: "Pulse Oximeter", link: "pulse-oximeter", img: "assets/pulseOximeter/pulse_oximeter_clip.webp" },
      { title: "CAD Software", link: "cad-software", img: "assets/CADSoftware/pedal_selected.webp" },
      { title: "Service Management Software", link: "kroyair", img: "assets/kroyair/kroyair_van.webp" },
      { title: "Eye Tracking", link: "eye-tracking", img: "assets/eyeTracking/eye_tracking.webp" }
    ]
  },
  {
    link: { title: "Documents", link: "documents" },
    subLinks: [
      { title: "Dissertation", link: "/assets/documents/dissertation.pdf", isIndependent: true },
      { title: "Dissertation Feedback", link: "/assets/documents/feedback.pdf", isIndependent: true },
      { title: "Degree Certificate", link: "/assets/documents/degree_certificate.pdf", isIndependent: true },
      { title: "Degree Transcript", link: "/assets/documents/degree_transcript.pdf", isIndependent: true },
      { title: "Guitar Grade 8 Certificate", link: "/assets/documents/guitar_grade_8.pdf", isIndependent: true }
    ]
  }
];