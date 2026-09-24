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
        <CardTitle>{speaker}</CardTitle>
      </CardHeader>
      <CardContent>
        <Flex direction="column" gap="3">
          {sessions.map((session) => (
            <Flex key={session.id} direction="column" gap="1">
              <Link href={`/sessions/${session.id}`}>
                <Text
                  fontWeight="medium"
                  color="var(--accent-hex)"
                  _hover={{ color: "var(--accent-muted)" }}
                >
                  {session.title}
                </Text>
              </Link>
              <Text fontSize="sm" color="var(--text-muted)">
                {session.startTime}
              </Text>
            </Flex>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
