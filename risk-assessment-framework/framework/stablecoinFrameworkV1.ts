import { RiskAssessmentFramework } from "./types";
import { Section1FrameworkGuide } from "./section1";
import { Section2FrameworkGuide } from "./section2";
import { Section3_1_FrameworkGuide } from "./section3_1";
import { Section3_2_FrameworkGuide } from "./section3_2";
import { Section4FrameworkGuide } from "./section4";
import { Section5FrameworkGuide } from "./section5";

export const StablecoinFrameworkV1: RiskAssessmentFramework = {
  id: "stablecoin-framework-v1",
  title: "Stablecoin Risk Assessment Framework V1",
  sections: [
    Section1FrameworkGuide,
    Section2FrameworkGuide,
    Section3_1_FrameworkGuide,
    Section3_2_FrameworkGuide,
    Section4FrameworkGuide,
    Section5FrameworkGuide,
  ],
};

