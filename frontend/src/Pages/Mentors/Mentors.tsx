import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { ContentContext } from "../../context/ContentContext.tsx";
import {
  Box,
  Flex,
  Button,
  Input,
  Breadcrumbs,
  Anchor,
  ScrollArea,
  Paper,
  Skeleton,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Link } from "react-router-dom";
import {
  IconSmartHome,
  IconWorld,
  IconSearch,
  IconAdjustments,
  IconClock,
  IconStar,
  IconBulb,
  IconPencil,
  IconChartBar,
  IconPalette,
  IconCode,
} from "@tabler/icons-react";
import { createClient } from "@supabase/supabase-js";
import { Helmet } from "react-helmet";
import FilterSearch from "./FilterSearch/FilterSearch.tsx";
import ProfileCard from "../Components/ProfileCard/ProfileCard.tsx";
import axios from "axios";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const categories = [
  { value: "all", label: "All", icon: IconWorld },
  { value: "available", label: "Available ASAP", icon: IconClock },
  { value: "recommended", label: "Recommended", icon: IconStar },
  { value: "softSkills", label: "Soft Skills", icon: IconBulb },
  { value: "contentWriting", label: "Content Writing", icon: IconPencil },
  { value: "dataScience", label: "Data Science", icon: IconChartBar },
  { value: "design", label: "Design", icon: IconPalette },
  { value: "engineering", label: "Engineering", icon: IconCode },
];

const BlurSection = ({ children, id, activeSection, setActiveSection }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(id);
        }
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
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
          ? "filter-none opacity-100 scale-100"
          : "blur-sm opacity-50 scale-95"
      }`}
    >
      {children}
    </div>
  );
};

function Mentors() {
  const { superProfiles, setSuperProfiles } = useContext(ContentContext);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [suggestions, setSuggestions] = useState([]);
  const [activeSection, setActiveSection] = useState("search");

  const handleSetActiveSection = useCallback((section) => {
    setActiveSection(section);
  }, []);

  useEffect(() => {
    fetchSuperProfiles();
  }, []);

  const fetchSuperProfiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) throw error;
      console.log("Fetched profiles:", data);
      setSuperProfiles(data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (event) => {
    const value = event.currentTarget.value;
    setSearchQuery(value);

    if (value) {
      const localMatches = superProfiles.flatMap((profile) => {
        const nameMatches = [
          profile.first_name || "",
          profile.last_name || "",
          profile.job_title || "",
          ...(profile.skills || []),
        ];

        return nameMatches.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase())
        );
      });

      if (localMatches.length > 0) {
        setSuggestions(localMatches);
      } else {
        try {
          const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "user",
                  content: `Suggest names, skills, or job titles based on: ${value}`,
                },
              ],
              max_tokens: 40,
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                "Content-Type": "application/json",
              },
            }
          );

          const suggestionTexts = response.data.choices[0].message.content
            .trim()
            .split("\n");
          setSuggestions(
            suggestionTexts.map((s) => s.replace(/^\d+\.\s*/, ""))
          );
        } catch (error) {
          console.error("Error fetching suggestions from ChatGPT:", error);
          setSuggestions([]);
        }
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleCategorySelect = (categoryValue) => {
    setSelectedCategory(categoryValue);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  };

  const handleBlur = () => {
    setTimeout(() => setSuggestions([]), 200);
  };

  const filteredProfiles = superProfiles.filter((profile) => {
    const matchesCategory =
      selectedCategory === "all" || profile.category === selectedCategory;

    if (!searchQuery) return matchesCategory;

    const firstName = String(profile.first_name || "").toLowerCase();
    const lastName = String(profile.last_name || "").toLowerCase();
    const jobTitle = String(profile.job_title || "").toLowerCase();
    const bio = String(profile.bio || "").toLowerCase();
    const company = String(profile.company || "").toLowerCase();

    const lowerCaseQuery = searchQuery.toLowerCase();
    const matchesSearch =
      firstName.includes(lowerCaseQuery) ||
      lastName.includes(lowerCaseQuery) ||
      jobTitle.includes(lowerCaseQuery) ||
      bio.includes(lowerCaseQuery) ||
      company.includes(lowerCaseQuery);

    return matchesCategory && matchesSearch;
  });

  const renderProfiles = () =>
    filteredProfiles.map((profile) => (
      <ProfileCard
        key={profile.id}
        id={profile.id}
        profilepic={profile.profilepic || "https://via.placeholder.com/150"}
        linkUrl={profile.linkUrl || "#"}
        summary={profile.bio || "No description available"}
        first_name={profile.first_name || "Unknown"}
        last_name={profile.last_name || "User"}
        job={profile.job_title || "No job title"}
        bio={profile.bio || "No bio available"}
        company={profile.company || "No company available"}
        hobbies={profile.hobbies || "No hobbies listed"}
        achievements={profile.achievements || "No achievements listed"}
        contributions={profile.contributions || "No contributions listed"}
        created_at={profile.last_updated || "Date not available"}
        social_media_links={
          profile.social_media_links || "No social media links available"
        }
        bookings={profile.bookings || "No bookings available"}
        badgeText={profile.badgeText || "Default Badge"}
        badgeGradient={profile.badgeGradient || { from: "gray", to: "white" }}
        experience={profile.experience || "5"}
      />
    ));

  const renderSkeletonProfiles = () => (
    <>
      {[...Array(6)].map((_, index) => (
        <Box key={index} mb="md">
          <Skeleton height={200} radius="md" animate={true} />
          <Skeleton
            height={20}
            mt="sm"
            width="60%"
            radius="xl"
            animate={true}
          />
          <Skeleton
            height={15}
            mt="sm"
            width="40%"
            radius="xl"
            animate={true}
          />
          <Skeleton
            height={10}
            mt="sm"
            width="80%"
            radius="xl"
            animate={true}
          />
        </Box>
      ))}
    </>
  );

  const renderSkeletonCategories = () => (
    <Flex gap="sm" style={{ display: "inline-flex" }}>
      {[...Array(8)].map((_, index) => (
        <Skeleton
          key={index}
          height={36}
          width={100}
          radius="md"
          animate={true}
        />
      ))}
    </Flex>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Find Mentors | Your Website Name</title>
        <meta
          name="description"
          content="Explore our curated list of mentors with diverse expertise. Find the perfect mentor to guide you on your journey."
        />
      </Helmet>
      <Flex className="flex-grow">
        {!isMobile && (
          <Box className="w-64 p-5 border-r border-gray-200 dark:border-gray-700">
            <FilterSearch />
          </Box>
        )}
        <Box className="flex-1 flex flex-col overflow-auto my-6">
          <BlurSection
            id="search"
            activeSection={activeSection}
            setActiveSection={handleSetActiveSection}
          >
            <Box className="p-5">
              <Breadcrumbs mb={20}>
                <Link to="/">
                  <IconSmartHome className="text-gray-500" />
                </Link>
                <Anchor>Mentors</Anchor>
              </Breadcrumbs>

              <Flex mb={20}>
                <Input
                  placeholder="Search profiles"
                  leftSection={<IconSearch size={16} />}
                  value={searchQuery}
                  onChange={handleSearch}
                  onBlur={handleBlur}
                  className="flex-1 mr-2"
                />
                <Button
                  leftSection={<IconAdjustments size={16} />}
                  variant="default"
                  color="gray"
                >
                  Filter
                </Button>
              </Flex>

              {suggestions.length > 0 && (
                <Paper className="p-3 absolute z-10 bg-white dark:bg-gray-800 shadow-lg">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {suggestion}
                    </div>
                  ))}
                </Paper>
              )}

              <ScrollArea
                className="overflow-x-auto whitespace-nowrap mb-5"
                scrollbarSize={0}
                type="hover"
                offsetScrollbars
              >
                {loading ? (
                  renderSkeletonCategories()
                ) : (
                  <Flex gap="sm" style={{ display: "inline-flex" }}>
                    {categories.map((cat) => (
                      <Button
                        key={cat.value}
                        color="gray"
                        leftSection={<cat.icon size={16} />}
                        variant={
                          selectedCategory === cat.value ? "filled" : "default"
                        }
                        onClick={() => handleCategorySelect(cat.value)}
                      >
                        {cat.label}
                      </Button>
                    ))}
                  </Flex>
                )}
              </ScrollArea>
            </Box>
          </BlurSection>

          <BlurSection
            id="profiles"
            activeSection={activeSection}
            setActiveSection={handleSetActiveSection}
          >
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-3 mx-4 mt-0">
              {loading ? renderSkeletonProfiles() : renderProfiles()}
            </div>
          </BlurSection>
        </Box>
      </Flex>
      <Box className="p-5 border-t border-gray-200 dark:border-gray-700">
        {/* Footer Links Component */}
      </Box>
    </div>
  );
}

export default Mentors;
