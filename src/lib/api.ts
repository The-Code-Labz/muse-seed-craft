import { Story, GenerateRequest, GenerateResponse } from './types';
import { demoStories } from '@/data/demoStories';

const API_BASE = '/api';

// Simulated delay for demo purposes
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function generateStory(request: GenerateRequest): Promise<GenerateResponse> {
  try {
    const response = await fetch(`${API_BASE}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Failed to generate story');
    }

    return await response.json();
  } catch (error) {
    console.warn('API not available, using mock generation:', error);
    
    // Mock generation with demo data
    await delay(2000);
    
    const mockStory: GenerateResponse = {
      id: `mock-${Date.now()}`,
      seed: request.seed,
      title: `The Tale of ${request.seed}`,
      outline: [
        'Introduction to the concept',
        'Development of the story',
        'Climax and resolution',
      ],
      style: {
        tone: 'whimsical',
        pov: 'third-person',
        audience: 'general',
        pacing: 'moderate',
        imagery: 'vivid',
      },
      image_url: `https://image.pollinations.ai/prompt/${encodeURIComponent(request.seed)}?width=1024&height=576&nologo=true`,
      story_text: `In a world where ${request.seed}, something extraordinary happened. The journey began with a simple moment, but it would change everything.\n\nAs the story unfolded, new discoveries emerged. Each twist and turn brought unexpected revelations, weaving a tapestry of wonder and mystery. The characters found themselves drawn into an adventure they never could have imagined.\n\nThrough trials and triumphs, the essence of ${request.seed} revealed its deeper meaning. What started as a small seed of an idea blossomed into something profound, touching hearts and minds in ways that would last forever.\n\nIn the end, the story came full circle, leaving a lasting impression on all who experienced it.`,
      audio_url: undefined,
      created_at: new Date().toISOString(),
    };

    return mockStory;
  }
}

export async function getStories(limit: number = 12): Promise<Story[]> {
  try {
    const response = await fetch(`${API_BASE}/stories?limit=${limit}`);

    if (!response.ok) {
      throw new Error('Failed to fetch stories');
    }

    return await response.json();
  } catch (error) {
    console.warn('API not available, using demo stories:', error);
    return demoStories.slice(0, limit);
  }
}
