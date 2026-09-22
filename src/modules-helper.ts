// Helper to define MODULES - will be imported in page.tsx
import type { LearningModule } from './app/page'
import { ADDITIONAL_MODULES } from './data/additional-modules'

// This file is a workaround - export BASE_MODULES reference
export const createModules = (baseModules: LearningModule[]): LearningModule[] => {
  return [...baseModules, ...ADDITIONAL_MODULES]
}
