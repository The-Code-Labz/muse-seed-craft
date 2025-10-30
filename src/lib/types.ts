export interface Story {
  id: string;
  seed: string;
  title: string;
  outline: string[];
  style: {
    tone: string;
    pov: string;
    audience: string;
    pacing: string;
    imagery: string;
  };
  imageUrl: string;
  content: string;
  audioUrl?: string;
  createdAt: string;
}

export interface GenerateRequest {
  seed: string;
}

export interface GenerateResponse extends Story {}

export type LoadingStep = 
  | 'idle'
  | 'scaffolding'
  | 'generating-image'
  | 'writing-story'
  | 'creating-narration'
  | 'complete';
