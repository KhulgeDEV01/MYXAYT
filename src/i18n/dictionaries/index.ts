import type { Localized } from '../types';
import { mn } from './mn';
import type { Dictionary } from './mn';
import { en } from './en';

export type { Dictionary };

export const dictionaries: Localized<Dictionary> = { mn, en };
