import { Anchor, Container, Space, Text, Title } from "@mantine/core";
import { Image } from "@mantine/core";
import aboutImg from "../assets/about.png";

function About() {
  return (
    <Container py={"md"}>
      <Image src={aboutImg} alt="About us" />
      <Title>About us</Title>
      <Space h={"md"} />
      <Text>Welcome to TravelSpinner!</Text>
      <Text>
        We specialize in creating personalized itineraries for exploring
        Singapore. Our unique platform randomly selects MRT stops and activities
        to provide exciting and customized experiences. With each spin, discover
        new adventures, iconic landmarks, cultural hotspots, and hidden gems.
        Let TravelSpinner be your guide to an unforgettable journey in
        Singapore. Start spinning now!
      </Text>
      <Space h={"md"} />
      <Anchor href={"https://github.com/pbthang/lifehack2023"}>
        Learn more about this project &rarr;{" "}
      </Anchor>
    </Container>
  );
}

export default About;
