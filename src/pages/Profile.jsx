import {
  Accordion,
  Anchor,
  Badge,
  Container,
  Group,
  List,
  Paper,
  Rating,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

function Profile() {
  const [data, setData] = useLocalStorage({
    key: "places-data",
    defaultValue: [],
  });
  console.log(data);
  return (
    <Container py={"md"}>
      <Title>Saved journeys</Title>
      <Space h={"lg"} />
      <Accordion spacing={"md"} variant="contained">
        {data.map(({ mrt, places }) => (
          <Accordion.Item
            key={mrt.stop_id}
            withBorder
            shadow="sm"
            p={"md"}
            value={mrt.stop_id}
          >
            <Accordion.Control>
              <Title order={3}>
                {mrt.name} ({mrt.stop_id})
              </Title>
            </Accordion.Control>
            <Accordion.Panel>
              {places.map((place) => (
                <Paper key={place.uuid} withBorder shadow="sm" p={"md"}>
                  <Stack spacing={"xs"}>
                    <Group>
                      <Anchor
                        href={`https://www.google.com/maps/search/?api=1&query=${addressToString(
                          place.address
                        )}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <Title order={4}>{place.name}</Title>
                      </Anchor>
                      <Badge>{place.categoryDescription}</Badge>
                    </Group>
                    <Rating value={place.rating} fractions={3} readOnly />
                    <Text size={"sm"}>
                      <strong>Tags:</strong> {place.tags.join(", ")}
                    </Text>
                  </Stack>
                </Paper>
              ))}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}

const addressToString = (address) => {
  return Object.values(address)
    .filter((x) => x)
    .join(", ");
};

export default Profile;
