import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { groupSessionsBySpeaker } from "./speaker-sessions";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "a-session",
    title: "A session",
    speaker: "A speaker",
    track: "React",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("groupSessionsBySpeaker", () => {
  it("returns nothing for an empty session list", () => {
    expect(groupSessionsBySpeaker([])).toEqual([]);
  });

  it("groups sessions belonging to the same speaker", () => {
    const result = groupSessionsBySpeaker([
      session({ id: "s1", title: "Talk One", speaker: "Alice" }),
      session({ id: "s2", title: "Talk Two", speaker: "Alice" }),
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].speaker).toBe("Alice");
    expect(result[0].sessions).toHaveLength(2);
  });

  it("sorts speakers alphabetically by name", () => {
    const result = groupSessionsBySpeaker([
      session({ speaker: "Zara" }),
      session({ speaker: "Alice" }),
      session({ speaker: "Marta" }),
    ]);

    expect(result.map((s) => s.speaker)).toEqual(["Alice", "Marta", "Zara"]);
  });

  it("excludes the closing panel entry", () => {
    const result = groupSessionsBySpeaker([
      session({ speaker: "Alice" }),
      session({ speaker: "Full speaker lineup" }),
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].speaker).toBe("Alice");
  });

  it("excludes sessions with an empty speaker string", () => {
    const result = groupSessionsBySpeaker([
      session({ speaker: "Alice" }),
      session({ speaker: "" }),
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].speaker).toBe("Alice");
  });

  it("keeps each speaker's sessions in the order they were returned", () => {
    const morning = session({
      id: "s1",
      title: "Morning Talk",
      speaker: "Alice",
      startTime: "09:00",
    });
    const afternoon = session({
      id: "s2",
      title: "Afternoon Talk",
      speaker: "Alice",
      startTime: "14:00",
    });

    const result = groupSessionsBySpeaker([morning, afternoon]);

    expect(result[0].sessions[0].id).toBe("s1");
    expect(result[0].sessions[1].id).toBe("s2");
  });
});
