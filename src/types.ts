export type SkinType = 'oily' | 'dry' | 'combination' | 'sensitive' | 'normal';
export type AcneSeverity = 'mild' | 'moderate' | 'severe';
export type AcneType = 'whiteheads' | 'blackheads' | 'papules' | 'pustules' | 'nodules' | 'cystic acne';

export interface UserProfile {
  age: string;
  gender: string;
  skinType: SkinType;
  acneSeverity: AcneSeverity;
  acneType: AcneType[];
  lifestyle: {
    diet: string;
    sleep: string;
    stress: string;
    waterIntake: string;
  };
  currentProducts: string;
  isResearcher: boolean;
}
