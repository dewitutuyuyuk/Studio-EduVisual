
export type ProductType = 'Worksheet' | 'Poster' | 'Flashcard' | 'Infographic' | 'Coloring Page' | 'Classroom Banner';

export type VisualStyle = 
  | 'Flat Design' 
  | '3D Render' 
  | 'Watercolor' 
  | 'Minimalist' 
  | 'Vintage/Retro' 
  | 'Comic/Cartoon' 
  | 'Realistic' 
  | '3D Claymation' 
  | 'Papercut' 
  | 'Doodle' 
  | '3D Pixar';

export type AspectRatio = '1:1' | '3:4' | '4:3' | '9:16' | '16:9';

export type TargetAudience = 'Preschool' | 'Elementary' | 'Middle School' | 'High School' | 'Adult Learners';

export interface PromptPart {
  label: string;
  content: string;
}

export interface GenerationResult {
  refinedPrompt: string; // Keep for backward compatibility/copying
  refinedPromptParts: PromptPart[];
  imageUrl?: string;
  explanation: string;
}

export interface PromptConfig {
  productType: ProductType;
  style: VisualStyle;
  ratio: AspectRatio;
  colorPalette: string;
  topic: string;
  audience: TargetAudience;
  language: 'Indonesian' | 'English';
  contentFormat: string;
  layoutStructure: string;
  moodAndTone: string;
  watermarkText: string;
  watermarkPosition: string;
}
