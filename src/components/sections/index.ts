/**
 * Sections Module
 *
 * Export section types, utilities, and the React RichText component.
 * Astro components should be imported directly from their .astro files.
 *
 * Usage:
 *   // For types and utilities
 *   import { sectionToProps, getBackgroundClass } from '@/components/sections';
 *
 *   // For Astro components (import directly)
 *   import SectionsRenderer from '@/components/sections/SectionsRenderer.astro';
 *   import HeroSection from '@/components/sections/HeroSection.astro';
 */

// Types and utilities
export {
  type SectionProps,
  type SectionType,
  type BackgroundStyle,
  type Section,
  type Locale,
  sectionToProps,
  getBackgroundClass,
} from './types';

// React components (server-rendered, no client JS)
export { RichText } from './RichText';
