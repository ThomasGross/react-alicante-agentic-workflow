import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { Flex, Text } from "@chakra-ui/react";

interface SpeakerCardProps {
  speaker: string;
  sessions: Session[];
}

export function SpeakerCard({ speaker, sessions }: SpeakerCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">{speaker}</CardTitle>
      </CardHeader>
      <CardContent>
        <Flex
          as="ul"
          direction="column"
          gap="3"
          listStyleType="none"
          margin="0"
          padding="0"
        >
          {sessions.map((session) => (
            <Flex as="li" key={session.id} direction="column" gap="1">
              <Link
                href={`/sessions/${session.id}`}
                aria-label={`${session.title} — ${speaker}`}
              >
                <Text
                  fontWeight="medium"
                  color="var(--accent-hex)"
                  _hover={{ color: "var(--accent-muted)" }}
                >
                  {session.title}
                </Text>
              </Link>
              <time dateTime={session.startTime}>
                <Text fontSize="sm" color="var(--text-muted)">
                  {session.startTime}
                </Text>
              </time>
            </Flex>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
