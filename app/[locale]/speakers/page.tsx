import { SpeakerCard } from "@/app/[locale]/speakers/_components/speaker-card";
import { PageHeading } from "@/components/atoms/page-heading";
import { fetchSessions } from "@/services/sessions";
import { groupSessionsBySpeaker } from "@/utils/speaker-sessions";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";

export default async function SpeakersPage() {
  const t = await getTranslations("SpeakersPage");
  const sessions = await fetchSessions();
  const speakers = groupSessionsBySpeaker(sessions);

  return (
    <Flex direction="column" gap="8" flex="1" width="full">
      <PageHeading title={t("heading")}>{t("subheading")}</PageHeading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="4">
        {speakers.map(({ speaker, sessions }) => (
          <SpeakerCard key={speaker} speaker={speaker} sessions={sessions} />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
