import type { Metadata } from "next";
import ProjectsContent from "@/components/ProjectsContent";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Engineering & Creative Suite — Autonomous AI Agents, n8n Automation, ESP32 Computer Vision Robotics, 3D WebGL, and UI/UX Design.",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
