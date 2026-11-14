import type { Metadata } from "next";
import CvContent from "@/components/CvContent";

export const metadata: Metadata = {
  title: "CV & Engineering Specification",
  description:
    "Academic and engineering curriculum vitae of Yohannes Marcel Lalopua — Informatics Student at UKWMS (NRP 5803025050).",
};

export default function CvPage() {
  return <CvContent />;
}
