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
  image_url: string;
  story_text: string;
  audio_url?: string;
  created_at: string;
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
