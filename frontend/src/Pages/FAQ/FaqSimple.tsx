import { Container, Title, Accordion } from '@mantine/core';
import classes from './FaqSimple.module.css';

export function FaqSimple() {
  return (
    <Container size="sm" className={classes.wrapper}>
      <Title ta="center" className={classes.title}>
        Frequently Asked Questions
      </Title>

      <Accordion variant="separated">
        <Accordion.Item className={classes.item} value="book-session">
          <Accordion.Control>How do I book a mentoring session?</Accordion.Control>
          <Accordion.Panel>
            To book a mentoring session, browse the list of available mentors, select a mentor
            that suits your needs, and choose an available time slot from their calendar. 
            Once you confirm the booking, you will receive an email with the session details.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="cancel-session">
          <Accordion.Control>Can I cancel or reschedule a session?</Accordion.Control>
          <Accordion.Panel>
            Yes, you can cancel or reschedule a session up to 24 hours before the scheduled time.
            To do so, go to your account dashboard, find the session you want to change, and select 
            the option to cancel or reschedule. Please note that last-minute cancellations may be 
            subject to a fee.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="session-preparation">
          <Accordion.Control>How should I prepare for a mentoring session?</Accordion.Control>
          <Accordion.Panel>
            Before your session, review your goals and any specific topics you want to discuss. 
            It can be helpful to write down questions or points you'd like to cover. Make sure 
            you are in a quiet, distraction-free environment with a stable internet connection 
            if the session is online.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="session-duration">
          <Accordion.Control>How long does a mentoring session last?</Accordion.Control>
          <Accordion.Panel>
            The duration of a mentoring session typically ranges from 30 minutes to an hour, 
            depending on the mentor's schedule and the format of the session. You can check 
            the specific duration when booking a session.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="session-followup">
          <Accordion.Control>What happens after a mentoring session?</Accordion.Control>
          <Accordion.Panel>
            After your session, your mentor may provide follow-up notes or resources. 
            You will also have the opportunity to reflect on the session and set action 
            steps for your next meeting. If you have additional questions, you can 
            schedule another session or reach out to your mentor through the platform.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
