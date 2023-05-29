/* eslint-disable react/prop-types */
import {
  Anchor,
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Group,
  Image,
  Paper,
  Rating,
  Select,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";

const SUPABASE_ANON_API_KEY = import.meta.env.VITE_SUPABASE_ANON_API_KEY;
const RANDOM_MRT_API_URL = import.meta.env.VITE_RANDOM_MRT_API_URL;
const PLACES_API_URL = import.meta.env.VITE_PLACES_API_URL;
const PLACES_API_KEY = import.meta.env.VITE_PLACES_API_KEY;

function Spin() {
  const [mrt, setMrt] = useState(null);
  const [places, setPlaces] = useState([]);
  const [placesLoading, setPlacesLoading] = useState(false);
  const form = useForm({
    initialValues: {
      region: "any",
      loading: false,
    },
    validate: {
      region: (value) => {
        return value ? null : "Region is required";
      },
    },
  });

  useEffect(() => {}, []);

  const handleSubmit = async (values) => {
    try {
      form.setFieldValue("loading", true);
      const response = await axios.post(
        RANDOM_MRT_API_URL,
        {
          region: values.region,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${SUPABASE_ANON_API_KEY}`,
          },
        }
      );
      setMrt(response.data?.randomMrt);
    } catch (err) {
      showNotification({
        title: "Error",
        message: err.response.data.error || "Cannot find module!",
        color: "red",
        icon: <IconX />,
      });
    }
    form.setFieldValue("loading", false);
  };

  const handleGeneratePlaces = async () => {
    try {
      setPlacesLoading(true);
      const response = await axios.get(PLACES_API_URL, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": PLACES_API_KEY,
        },
        params: {
          location: `${mrt.lat},${mrt.lng}`,
          radius: 3000,
        },
      });
      console.log(response.data.data);
      setPlaces(response.data?.data);
    } catch (err) {
      console.log(err);
      showNotification({
        title: "Error",
        message: err.response.data.error || "Cannot generate suggested places!",
        color: "red",
        icon: <IconX />,
      });
    }
    setPlacesLoading(false);
  };

  return (
    <>
      <Container py={"md"}>
        <Title>Spin your journey</Title>
        <Space h="md" />
        <Paper withBorder shadow="sm" p={"lg"} maw={320}>
          <Box
            component="form"
            onSubmit={form.onSubmit(handleSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: "16px",
            }}
          >
            <Select
              label={"Choose a region"}
              placeholder="e.g. Central Region"
              data={[
                { value: "any", label: "Any" },
                { value: "CR", label: "Central Region" },
                { value: "ER", label: "East Region" },
                { value: "NR", label: "North Region" },
                { value: "NER", label: "North-East Region" },
                { value: "WR", label: "West Region" },
              ]}
              {...form.getInputProps("region", { type: "select" })}
            />
            <Button type="submit" loading={form.values.loading}>
              Spin
            </Button>
          </Box>
        </Paper>
        <Space h="lg" />
        {mrt && (
          <Paper withBorder shadow="sm" p={"lg"}>
            <Title order={3}>
              {mrt.name} ({mrt.stop_id})
            </Title>
            <Text>
              Region: {mrt.REGION_N} - {mrt.PLN_AREA_N}
            </Text>
            <Space h="md" />
            <iframe
              width="100%"
              height="400"
              src={`https://maps.google.com/maps?width=100%25;height=600&hl=en&q=${mrt.name}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
            ></iframe>
            <Space h="md" />
            <Button onClick={handleGeneratePlaces} loading={placesLoading}>
              Generate suggested places
            </Button>
          </Paper>
        )}
        <Space h="lg" />
        {places.length ? <PlaceList places={places} /> : <></>}
      </Container>
    </>
  );
}

const PlaceList = ({ places }) => {
  return (
    <Stack>
      <Title order={3}>Suggested places</Title>
      {places.map((place) => {
        return (
          <Paper key={place.uuid} withBorder shadow="sm" p={"md"}>
            <Stack spacing={"xs"}>
              <Group>
                <Title order={4}>{place.name}</Title>
                <Badge>{place.categoryDescription}</Badge>
              </Group>
              <Rating value={place.rating} fractions={3} readOnly />

              <Text>{addressToString(place.address)}</Text>
              <Text size={"sm"}>
                <strong>Tags:</strong> {place.tags.join(", ")}
              </Text>
              <Anchor
                href={`http://www.google.com/maps/place/${place.location.latitude},${place.location.longitude}`}
                rel="noreferrer"
                target="_blank"
              >
                Link to Map
              </Anchor>
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );
};

const addressToString = (address) => {
  return Object.values(address)
    .filter((x) => x)
    .join(", ");
};

export default Spin;
