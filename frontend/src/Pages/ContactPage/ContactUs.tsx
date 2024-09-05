import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  ActionIcon,
} from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import { ContactIconsList } from './ContactIcons.tsx';
import classes from './ContactUs.module.css';
import FooterLinks from '../Footer/FooterLinks.tsx';

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];

export function ContactUs() {
  const icons = social.map((Icon, index) => (
    <ActionIcon key={index} size={28} className={classes.social} variant="transparent">
      <Icon size="1.4rem" stroke={1.5} />
    </ActionIcon>
  ));

  const pageTitle = "Contact Us | Protocon";
  const pageDescription = "Get in touch with Protocon. We're here to help you connect with the right mentor and achieve your goals.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://protocon.co.uk/contact" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <link rel="canonical" href="https://protocon.co.uk/contact" />
      </Helmet>

      <div className='p-6'>
        <div className={classes.wrapper}>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
            <div>
              <Title className={classes.title}>Contact us</Title>
              <Text className={classes.description} mt="sm" mb={30}>
                Leave your email and we will get back to you within 24 hours
              </Text>
              <ContactIconsList />
              <Group mt="xl">{icons}</Group>
            </div>
            <div className={classes.form}>
              <TextInput
                label="Email"
                placeholder="your@email.com"
                required
                classNames={{ input: classes.input, label: classes.inputLabel }}
                aria-label="Email"
              />
              <TextInput
                label="Name"
                placeholder="John Doe"
                mt="md"
                classNames={{ input: classes.input, label: classes.inputLabel }}
                aria-label="Name"
              />
              <Textarea
                required
                label="Your message"
                placeholder="I want to connect with a mentor"
                minRows={4}
                mt="md"
                classNames={{ input: classes.input, label: classes.inputLabel }}
                aria-label="Your message"
              />
              <Group justify="flex-end" mt="md">
                <Button className={classes.control}>Send message</Button>
              </Group>
            </div>
          </SimpleGrid>
        </div>
        <FooterLinks />
      </div>
    </>
  );
}