import { useTheme } from "@emotion/react";
import {
  AppShell,
  Navbar,
  Header,
  NavLink,
  Text,
  Group,
  Footer,
  Container,
  Flex,
  Button,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import {
  IconBackpack,
  IconHome,
  IconInfoCircle,
  IconUserCircle,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <AppShell
      navbar={<MyNavbar />}
      header={<MyHeader />}
      //   footer={<MyFooter />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          paddingTop: 60,
          paddingLeft: 56,
        },
      })}
    >
      <div>{children}</div>
    </AppShell>
  );
};

const MyNavbar = () => {
  return (
    <Navbar width={{ sm: 56, xs: 56, base: 56 }} py={"sm"} fixed>
      <Navbar.Section
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Tooltip label="Home" position="right">
          <Link to="/">
            <ActionIcon title="Home" variant="subtle">
              <IconHome size={24} />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Link to="/profile">
          <Tooltip label="Profile" position="right">
            <ActionIcon title="Profile" variant="subtle">
              <IconUserCircle size={24} />
            </ActionIcon>
          </Tooltip>
        </Link>
        <Link to="/about">
          <Tooltip label="About us" position="right">
            <ActionIcon title="About us" variant="subtle">
              <IconInfoCircle size={24} />
            </ActionIcon>
          </Tooltip>
        </Link>
      </Navbar.Section>
    </Navbar>
  );
};

const MyHeader = () => {
  const theme = useTheme();
  return (
    <Header height={60} p="xs" fixed>
      <Group sx={{ height: "100%" }} px={20} position="apart">
        <Flex align={"center"} gap={6}>
          <IconBackpack size={24} color={theme.colors.red[9]} />
          <Text size={"lg"} weight={600}>
            Lorem Ipsum
          </Text>
        </Flex>
        <Button>
          <Text>Login</Text>
        </Button>
      </Group>
    </Header>
  );
};

const MyFooter = () => {
  return (
    <Footer
      height={32}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text size={"xs"}>NUS Computing - Lifehack 2023</Text>
    </Footer>
  );
};

export default Layout;
