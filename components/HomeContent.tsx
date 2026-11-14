"use client";

import BootSequence from "@/components/home/BootSequence";
import MilkyWayField from "@/components/home/fx/MilkyWayField";
import { useActiveScene } from "@/components/home/fx/hooks/useActiveScene";
import ConnectScene from "@/components/home/scenes/ConnectScene";
import CredentialsScene from "@/components/home/scenes/CredentialsScene";
import FocusScene from "@/components/home/scenes/FocusScene";
import IdentityScene from "@/components/home/scenes/IdentityScene";
import JourneyScene from "@/components/home/scenes/JourneyScene";
import StackScene from "@/components/home/scenes/StackScene";
import SceneRail from "@/components/shell/SceneRail";

export default function HomeContent() {
  useActiveScene();

  return (
    <>
      <MilkyWayField />
      <SceneRail />
      <BootSequence />

      <div className="space-y-12">
        {/* 01 // PROFILE & HERO */}
        <IdentityScene />

        {/* 02 // FOCUS & ENGINEERING DOMAINS */}
        <FocusScene />

        {/* 03 // EXPERIENCE & EDUCATION */}
        <JourneyScene />

        {/* 04 // TECH STACK MATRIX */}
        <StackScene />

        {/* 05 // VERIFIED CREDENTIALS & CERTIFICATES */}
        <CredentialsScene />

        {/* 06 // REPOSITORIES, INTERACTIVE CLI & DIRECT CONTACT */}
        <ConnectScene />
      </div>
    </>
  );
}
