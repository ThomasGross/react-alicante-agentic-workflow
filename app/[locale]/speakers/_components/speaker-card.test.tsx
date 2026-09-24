import { describe, expect, it, vi } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";

import { SpeakerCard } from "./speaker-card";

vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  usePathname: vi.fn(() => "/"),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
}));

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "opening-keynote",
    title: "Opening Keynote",
    speaker: "Marta Fernandez",
    track: "React",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    level: "beginner",
    ...overrides,
  };
}

describe("SpeakerCard", () => {
  it("renders the speaker's name", () => {
    render(<SpeakerCard speaker="Marta Fernandez" sessions={[session()]} />);
    expect(screen.getByText("Marta Fernandez")).toBeInTheDocument();
  });

  it("renders each session title and its start time", () => {
    const sessions = [
      session({ id: "s1", title: "Opening Keynote", startTime: "09:00" }),
      session({ id: "s2", title: "Closing Keynote", startTime: "17:00" }),
    ];

    render(<SpeakerCard speaker="Marta Fernandez" sessions={sessions} />);

    expect(screen.getByText("Opening Keynote")).toBeInTheDocument();
    expect(screen.getByText("09:00")).toBeInTheDocument();
    expect(screen.getByText("Closing Keynote")).toBeInTheDocument();
    expect(screen.getByText("17:00")).toBeInTheDocument();
  });

  it("links each session title to its session page with a descriptive label", () => {
    render(
      <SpeakerCard
        speaker="Marta Fernandez"
        sessions={[session({ id: "opening-keynote" })]}
      />,
    );

    // aria-label disambiguates same-titled sessions across different speakers.
    const link = screen.getByRole("link", {
      name: "Opening Keynote — Marta Fernandez",
    });
    expect(link).toHaveAttribute("href", "/en/sessions/opening-keynote");
  });

  it("renders nothing in the session list when sessions array is empty", () => {
    render(<SpeakerCard speaker="Marta Fernandez" sessions={[]} />);

    expect(screen.getByText("Marta Fernandez")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
