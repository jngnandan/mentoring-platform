import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Container,
  Card,
  Text,
  Badge,
  Button,
  Group,
  Stack,
  Avatar,
  Box,
  Anchor,
  Tabs,
  List,
  ActionIcon,
  Skeleton,
  rem,
  Modal,
  Textarea,
} from "@mantine/core";
import {
  IconBrandLinkedin,
  IconBrandTwitter,
  IconChevronLeft,
  IconBriefcase,
  IconCalendarStats,
  IconClock,
  IconMessage,
} from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import { ContentContext } from "../../context/ContentContext.tsx";
import MentorshipPlans from "./MentorshipPlans.tsx";

const BlurSection: React.FC<BlurSectionProps> = ({
  children,
  id,
  activeSection,
  setActiveSection,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-10% 0px -10% 0px",
        threshold: [0, 0.1, 0.5, 1],
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [id, setActiveSection]);

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-500 ease-out ${
        activeSection === id
          ? "opacity-100 scale-100 blur-none"
          : "opacity-50 scale-95 blur-sm"
      }`}
    >
      {children}
    </div>
  );
};

const MentorsPage = () => {
  const { superProfiles } = useContext(ContentContext);
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const foundProfile = superProfiles.find(
        (profile) => profile.id === parseInt(id)
      );
      setProfile(foundProfile);
      setLoading(false);
    };
    fetchProfile();
  }, [id, superProfiles]);

  const handleSendMessage = () => {
    console.log("Sending message:", messageText);
    setMessageModalOpen(false);
    setMessageText("");
  };

  const renderSkeletonProfile = () => (
    <Container size="lg">
      <Group position="apart" mb="xl">
        <Skeleton height={20} width={100} />
        <Skeleton height={20} width={150} />
      </Group>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <Card withBorder p="lg">
            <Group>
              <Skeleton height={120} circle />
              <Box style={{ flex: 1 }}>
                <Skeleton height={30} width="50%" mb="sm" />
                <Skeleton height={20} width="70%" mb="sm" />
                <Skeleton height={15} width="40%" mb="sm" />
                <Skeleton height={15} width="60%" />
              </Box>
            </Group>

            <Group mt="md" mb="xs">
              {[1, 2, 3].map((_, index) => (
                <Skeleton key={index} height={20} width={60} radius="xl" />
              ))}
            </Group>

            <Skeleton height={200} mt="xl" />
          </Card>

          <Card withBorder mt="xl">
            <Skeleton height={30} width="30%" mb="md" />
            <Group spacing={8}>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Skeleton key={index} height={20} width={80} radius="xl" />
              ))}
            </Group>
          </Card>

          <Card withBorder mt="xl">
            <Skeleton height={30} width="40%" mb="md" />
            <Skeleton height={15} mb="sm" />
            <Skeleton height={15} mb="sm" />
            <Skeleton height={15} />
          </Card>

          <Card withBorder mt="xl">
            <Skeleton height={30} width="35%" mb="md" />
            <Skeleton height={15} mb="sm" />
            <Skeleton height={15} mb="sm" />
            <Skeleton height={15} />
          </Card>
        </div>

        <div className="col-span-1">
          <Skeleton height={400} />
        </div>
      </div>
    </Container>
  );

  if (loading) {
    return renderSkeletonProfile();
  }

  if (!profile) {
    return (
      <Container size="lg">
        <Text align="center" size="xl" weight={700} mt="xl">
          Profile not found
        </Text>
      </Container>
    );
  }

  const skillsArray = profile.skills
    .replace(/[\[\]"]/g, "")
    .split(",")
    .map((skill) => skill.trim());

  return (
    <Container size="lg">
      {/* <BlurSection
        id="header"
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      > */}
      <Group position="apart" mb="lg" mt="xl">
        <Anchor component={Link} to="/mentors" size="sm">
          <Group spacing="xs">
            <IconChevronLeft style={{ width: rem(20), height: rem(20) }} />
            <Text>Find a Mentor</Text>
          </Group>
        </Anchor>
        <Text size="sm" color="dimmed">
          {profile.first_name} {profile.last_name}
        </Text>
      </Group>
      {/* </BlurSection> */}

      <BlurSection
        id="profile"
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      ></BlurSection>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <Card withBorder p="lg">
            <Group className="flex flex-row justify-between">
              <Box>
                <Group>
                  <Avatar
                    src={profile.profilepic}
                    size={120}
                    radius={100}
                    onError={(e) => {
                      e.target.src =
                        "https://example.com/default-profile-pic.jpg";
                    }}
                  />
                  <Box>
                    <Text size="xl" weight={700}>
                      {profile.first_name} {profile.last_name}
                    </Text>
                    <Text color="dimmed">{profile.job}</Text>
                    <Group spacing="xs" mt={4}>
                      <IconBriefcase
                        style={{ width: rem(20), height: rem(20) }}
                      />
                      <Text size="sm" color="dimmed">
                        {profile.company}
                      </Text>
                    </Group>
                    <Group spacing="xs" mt={4}>
                      <IconCalendarStats
                        style={{ width: rem(20), height: rem(20) }}
                      />
                      <Text size="sm" color="dimmed">
                        Active last week
                      </Text>
                    </Group>
                  </Box>
                </Group>
              </Box>

              <ActionIcon
                color="gray"
                variant="default"
                size="xl"
                ml={30}
                onClick={() => setMessageModalOpen(true)}
              >
                <IconMessage size={24} />
              </ActionIcon>
            </Group>

            <div className="flex flex-row justify-between mt-1">
              <Group mt="md" mb="xs">
                <Group mt="md" spacing="xs">
                  {profile.hobbies.map((hobby, index) => (
                    <Badge key={index} variant="light">
                      {hobby}
                    </Badge>
                  ))}
                </Group>
              </Group>

              <Group position="center" spacing="xs" mt="md">
                <ActionIcon
                  component="a"
                  href={profile.x_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  variant="default"
                  radius="xl"
                >
                  <IconBrandTwitter size="1.05rem" stroke={1.5} />
                </ActionIcon>
                <ActionIcon
                  component="a"
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  variant="default"
                  radius="xl"
                >
                  <IconBrandLinkedin size="1.05rem" stroke={1.5} />
                </ActionIcon>
              </Group>
            </div>

            <Tabs defaultValue="overview">
              <Tabs.List>
                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                <Tabs.Tab value="services">Services</Tabs.Tab>
                <Tabs.Tab value="group">Group Sessions</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="overview" pt="xs">
                <Text>{profile.summary}</Text>
              </Tabs.Panel>

              <Tabs.Panel value="services" pt="xs">
                <Card withBorder mt="md">
                  <Text size="lg" weight={700}>
                    $150{" "}
                    <Text span size="sm" color="dimmed">
                      / month
                    </Text>
                  </Text>
                  <Text size="sm" color="dimmed" mb="sm">
                    The most popular way to get mentored, let's work towards
                    your goals!
                  </Text>
                  <List
                    spacing="xs"
                    size="sm"
                    center
                    icon={
                      <ActionIcon color="blue" size={20} radius="xl">
                        <IconClock size="1rem" />
                      </ActionIcon>
                    }
                  >
                    <List.Item>1-on-1 mentorship sessions</List.Item>
                    <List.Item>Career guidance</List.Item>
                    <List.Item>Code reviews</List.Item>
                  </List>
                  <Button fullWidth color="blue" mt="md">
                    Apply now
                  </Button>
                </Card>
              </Tabs.Panel>

              <Tabs.Panel value="group" pt="xs">
                <Text>Group sessions information not available.</Text>
              </Tabs.Panel>
            </Tabs>
          </Card>
          {/* </BlurSection> */}

          {/* <BlurSection
            id="skills"
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          > */}
          <Card withBorder mt="xl">
            <Text size="lg" weight={700} mb="md">
              Skills
            </Text>
            <Group spacing={8}>
              {skillsArray.map((skill, index) => (
                <Badge key={index} variant="light">
                  {skill}
                </Badge>
              ))}
            </Group>
          </Card>
          {/* </BlurSection> */}

          {/* <BlurSection
            id="achievements"
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          > */}
          <Card withBorder mt="xl">
            <Text size="lg" weight={700} mb="md">
              Achievements
            </Text>
            <List>
              {profile.achievements.map((achievement, index) => (
                <List.Item key={index}>{achievement}</List.Item>
              ))}
            </List>
          </Card>
          {/* </BlurSection> */}

          {/* <BlurSection
            id="contributions"
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          > */}
          <Card withBorder mt="xl">
            <Text size="lg" weight={700} mb="md">
              Contributions
            </Text>
            <List>
              {profile.contributions.map((contribution, index) => (
                <List.Item key={index}>{contribution}</List.Item>
              ))}
            </List>
          </Card>
          {/* </BlurSection> */}
        </div>

        {/* <BlurSection
          id="mentorship-plans"
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        > */}
        <MentorshipPlans />
        {/* </BlurSection> */}
      </div>

      <Modal
        opened={messageModalOpen}
        onClose={() => setMessageModalOpen(false)}
        title={
          <Text size="xl" weight={700}>
            Message request
          </Text>
        }
        size="lg"
      >
        <Text mb="md">
          This is the beginning of your conversation with {profile.first_name}.
          This first message will be treated as a request, until the mentor
          accepts, you won't be able to send any more messages. Here are{" "}
          <Anchor>
            some tips to help you introduce yourself best to the mentor
          </Anchor>
          .
        </Text>
        <Text weight={500} mb="xs">
          Your message
        </Text>
        <Textarea
          placeholder="Introduce yourself and give a reason for your request"
          minRows={8}
          value={messageText}
          onChange={(event) => setMessageText(event.currentTarget.value)}
          mb="lg"
        />
        <Button
          fullWidth
          color="blue"
          variant="default"
          onClick={handleSendMessage}
          disabled={!messageText.trim()}
        >
          Send message
        </Button>
      </Modal>

      <BlurSection
        id="footer"
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      >
        <Box component="footer" mt="xl" pb="xl">
          <Text align="center" size="sm" color="dimmed">
            Your trusted source to find highly-vetted mentors & industry
            professionals to move your career ahead.
          </Text>
        </Box>
      </BlurSection>
    </Container>
  );
};

export default MentorsPage;
