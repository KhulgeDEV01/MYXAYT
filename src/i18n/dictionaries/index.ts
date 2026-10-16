/**
 * dictionaries/index.ts — Бүх хэлний орчуулгын толийг нэг дор цуглуулна.
 *
 * mn.ts нь "эх загвар" — en.ts нь яг ижил бүтэцтэй байх ёстой (TypeScript шалгадаг).
 * Иймээс mn.ts-д шинэ текст нэмбэл en.ts-д ч заавал нэмнэ, эс тэгвээс build алдаа заана.
 */
import type { Localized } from '../types';
import { mn } from './mn';
import type { Dictionary } from './mn';
import { en } from './en';

export type { Dictionary };

/** Хэлний кодоор толь авах: dictionaries['mn'], dictionaries['en']. */
export const dictionaries: Localized<Dictionary> = { mn, en };
