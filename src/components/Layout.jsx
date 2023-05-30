/* eslint-disable react/prop-types */
import { useTheme } from "@emotion/react";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  Group,
  Footer,
  Flex,
  Button,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import {
  IconBackpack,
  IconHome,
  IconInfoCircle,
  IconRotate360,
  IconUserCircle,
} from "@tabler/icons-react";
import { NavLink } from "react-router-dom";

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
          paddingRight: 0,
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
        <NavItem name={"Home"} to={"/"}>
          <IconHome size={24} />
        </NavItem>
        <NavItem name={"Spin it"} to={"/spin"}>
          <IconRotate360 size={24} />
        </NavItem>
        <NavItem name={"Profile"} to={"/profile"}>
          <IconUserCircle size={24} />
        </NavItem>
        <NavItem name={"About us"} to={"/about"}>
          <IconInfoCircle size={24} />
        </NavItem>
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
            TravelSpinner
          </Text>
        </Flex>
        <Button component="a" href="/about">
          <Text>Contact us</Text>
        </Button>
      </Group>
    </Header>
  );
};

// eslint-disable-next-line no-unused-vars
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

const NavItem = ({ name, children, to }) => {
  return (
    <Tooltip label={name} position="right">
      <NavLink
        to={to}
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        <ActionIcon title={name} variant="subtle">
          {children}
        </ActionIcon>
      </NavLink>
    </Tooltip>
  );
};

export default Layout;
