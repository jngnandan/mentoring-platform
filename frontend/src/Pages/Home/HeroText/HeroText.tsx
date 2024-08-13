import { Title, Text, Button, Container } from '@mantine/core';
import { Dots } from './Dots.tsx';
import classes from './HeroText.module.css';
import { Link } from 'react-router-dom';

export function HeroText() {
  return (
    <Container className={classes.wrapper} size={1400} my={80}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Welcome to{' '}
          <Text component="span" className={classes.highlight} inherit>
            Mentoring!
          </Text>{' '}
          {/* for any stack */}
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
          Empowering growth through personalized mentorship – connect, learn, and succeed with our tailored mentoring platform.          </Text>
        </Container>

        <div className={classes.controls}>
          <Button className={classes.control} size="md" variant="default" color="gray">
          <Link to='/mentors'>

            View Mentors
            </Link>

          </Button>

          <Button className={classes.control} size="md">
          <Link to='/about'>

            Know More
            </Link>

          </Button>
        </div>
      </div>
    </Container>
  );
}