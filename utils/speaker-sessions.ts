import type { Session } from "@/types/session";

export interface SpeakerSessions {
  speaker: string;
  sessions: Session[];
}

/**
 * The closing panel uses this as its speaker value — it is not a real speaker
 * and must be excluded from the speakers listing.
 */
const PANEL_SPEAKER = "Full speaker lineup";

/**
 * Groups sessions by speaker, sorted alphabetically by speaker name.
 * Excludes the closing panel entry.
 */
export function groupSessionsBySpeaker(sessions: Session[]): SpeakerSessions[] {
  const map = new Map<string, Session[]>();

  for (const session of sessions) {
    if (!session.speaker || session.speaker === PANEL_SPEAKER) continue;

    const existing = map.get(session.speaker);
    if (existing) {
      existing.push(session);
    } else {
      map.set(session.speaker, [session]);
    }
  }

  return Array.from(map.entries())
    .map(([speaker, sessions]) => ({ speaker, sessions }))
    .sort((a, b) => a.speaker.localeCompare(b.speaker));
}
