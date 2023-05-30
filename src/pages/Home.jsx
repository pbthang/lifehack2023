import {
  Title,
  Text,
  Button,
  BackgroundImage,
  Container,
  Flex,
  Space,
  SimpleGrid,
  Card,
  Image,
  Group,
  Badge,
} from "@mantine/core";
import heroBackground from "../assets/hero.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  return (
    <>
      <Hero />
      <Space h={40} />
      <Introduction />
      <Space h={40} />
      <News />
      <Space h={40} />

      {/* TODO: Create news section */}
      {/* TODO: Create suggestion section */}
    </>
  );
}

const Hero = () => {
  return (
    <BackgroundImage
      src={heroBackground}
      py={60}
      mih={240}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text size={32} weight={600} align={"center"}>
        Want to travel but don&apos;t know where to go?
      </Text>
      <Text size={28} align={"center"}>
        Fear no more, spin the wheel and go now!
      </Text>
      <Flex position="center" mt={20} gap={"xl"} wrap={"wrap"}>
        <Link to={"/spin"}>
          <Button size="md">Spin it</Button>
        </Link>
        {/* <Button size="md">Filter</Button> */}
      </Flex>
    </BackgroundImage>
  );
};

const Introduction = () => {
  return (
    <Container>
      <Title order={3} align={"center"}>
        🌍 Welcome to the Travel Route Random Generator app!
      </Title>
      <Space h={12} />
      <Text align={"center"}>
        🗺️✈️ Embark on an exciting journey to satisfy your post-pandemic travel
        cravings and explore the vibrant city of Singapore! 🌆 Our app is here
        to make your travel dreams come true in the most fun and adventurous way
        possible!
      </Text>
      <Space h={12} />

      <Text align={"center"}>
        🔀 With just a tap, our app generates random routes based on the regions
        you select, taking you on unexpected and thrilling adventures across the
        island. 🎲 Let the magic of spontaneity guide you to hidden gems and
        amazing discoveries!
      </Text>
      <Space h={12} />
      <Text align={"center"}>
        🚇🚌 Explore the city like a local! Our app suggests potential MRT or
        bus stops along your route, making it easy for you to navigate and hop
        on the next adventure. 📍🚆
      </Text>
      <Space h={12} />
      <Text align={"center"}>
        🎉 But wait, there&apos;s more! We offer a wide array of activities for
        you to choose from at each stop. Whether you&apos;re a foodie, an
        adrenaline junkie, a history enthusiast, or a nature lover, we&apos;ve
        got something exciting for everyone! 🍔🎢📚🌳
      </Text>
      <Space h={12} />
      <Text align={"center"}>
        🤩 And here&apos;s the best part - the app is tailored to your
        preferences! By incorporating your likes and interests, we create
        personalized travel itineraries that suit your unique style and maximize
        your enjoyment. 🎈✨
      </Text>
      <Space h={12} />
      <Text align={"center"}>
        So, what are you waiting for? Grab your phone, let the Travel Route
        Random Generator app be your guide, and embark on a thrilling adventure
        through Singapore like never before! 🌟🗺️
      </Text>
      <Text align={"center"}>
        <Space h={12} />
        Start exploring now and create memories that will last a lifetime! ✈️🌍
      </Text>
      <Space h={12} />
      <Text align={"center"}>Safe travels and have a blast! 🌈🌴🌞</Text>
    </Container>
  );
};

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("/data/news.json")
      .then((response) => response.json())
      .then((data) => setNews(data.news))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container>
      <Group position="center" align="center" spacing={"xs"}>
        <Title order={1} align={"center"} color="#b5b5b5">
          Latest
        </Title>
        <Title order={1} align={"center"}>
          News
        </Title>
      </Group>
      <Space h={24} />
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "48rem", cols: 1 }]}>
        {news.map((newsItem, i) => (
          <Card shadow="sm" padding="lg" radius="md" withBorder key={i}>
            <Card.Section>
              <Image
                src={newsItem.imgUrl}
                height={160}
                alt="With default placeholder"
              />
            </Card.Section>

            <Group position="center" mt="md" mb="xs">
              <Text weight={500}>{newsItem.name}</Text>
              <Badge color="pink" variant="light">
                {newsItem.category}
              </Badge>
            </Group>

            <Text size="sm" color="dimmed" lineClamp={3}>
              {newsItem.description}
            </Text>

            <Button
              variant="light"
              color="blue"
              fullWidth
              mt="md"
              radius="md"
              href={newsItem.url}
              component="a"
              target="_blank"
              rel="noopener noreferrer"
            >
              Find out more
            </Button>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Home;
