import React from 'react';
import { Container, Title, Text, List, Paper, Box, Divider, Space } from '@mantine/core';

function Privacy() {
  return (
    <Container size="md" className="my-20">
      <Paper shadow="xs" p="xl" withBorder>
        <Title order={1} align="center" mb="xl">
          Privacy Policy for Protocon
        </Title>
        <Text align="center" color="dimmed" mb="xl">
          Effective Date: October 10, 2024
        </Text>

        <Divider my="lg" />

        {[
          {
            title: "1. Introduction",
            content: "Welcome to Protocon, a mentorship application designed to connect mentors and mentees. At Protocon, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and protect your information when you use our application. By using Protocon, you agree to the collection and use of information in accordance with this policy. We encourage you to read this policy carefully to understand our practices regarding your personal data."
          },
          {
            title: "2. Information We Collect",
            content: (
              <>
                <Text mb="md">We collect several types of information for various purposes to provide and improve our service to you:</Text>
                <List spacing="sm">
                  <List.Item>
                    <Text weight={500}>Personal Information:</Text> This includes information you provide when registering or using our service, such as your name, email address, phone number, professional background, and areas of expertise or interest.
                  </List.Item>
                  <List.Item>
                    <Text weight={500}>Profile Information:</Text> Any additional information you choose to add to your profile, such as your photo, bio, education history, or professional achievements.
                  </List.Item>
                  <List.Item>
                    <Text weight={500}>Usage Data:</Text> Information about how you access and use the application, including your IP address, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access our service.
                  </List.Item>
                  <List.Item>
                    <Text weight={500}>Communication Data:</Text> Information from your communications with us or other users through the platform, such as emails, messages, or video calls. Please note that we do not store the content of your video calls, but we may keep metadata such as call duration and participants.
                  </List.Item>
                  <List.Item>
                    <Text weight={500}>Payment Information:</Text> If you make payments through our platform, we collect information necessary to process your payment. This may include your payment card details, bank account information, or other financial information. However, we do not store complete payment information on our servers. This data is securely handled through our trusted payment processor.
                  </List.Item>
                </List>
              </>
            )
          },
          {
            title: "3. How We Use Your Information",
            content: (
              <>
                <Text mb="md">We use the collected information for various purposes to provide, maintain, and improve our services. These purposes include:</Text>
                <List>
                  <List.Item>To facilitate and manage mentor-mentee relationships within our platform</List.Item>
                  <List.Item>To provide and maintain our service, including troubleshooting and supporting you when you have questions</List.Item>
                  <List.Item>To notify you about changes to our service, terms, or policies</List.Item>
                  <List.Item>To allow you to participate in interactive features of our service when you choose to do so</List.Item>
                  <List.Item>To provide customer support and respond to your inquiries</List.Item>
                  <List.Item>To gather analysis and valuable information to improve our application and user experience</List.Item>
                  <List.Item>To monitor the usage of our application for technical and security purposes</List.Item>
                  <List.Item>To detect, prevent, and address technical issues or potential misuse of our service</List.Item>
                  <List.Item>To send you newsletters, marketing communications, and other information that may be of interest to you. You may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send</List.Item>
                </List>
              </>
            )
          },
          {
            title: "4. Disclosure of Your Information",
            content: (
              <>
                <Text mb="md">We may share your information in the following situations:</Text>
                <List>
                  <List.Item>With service providers: We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work. Examples include payment processing, data analysis, email delivery, hosting services, customer service, and marketing efforts.</List.Item>
                  <List.Item>For business transfers: We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</List.Item>
                  <List.Item>With your consent: We may disclose your personal information for any other purpose with your consent.</List.Item>
                  <List.Item>Legal requirements: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</List.Item>
                </List>
              </>
            )
          },
          {
            title: "5. Security of Your Information",
            content: "The security of your personal information is important to us. We strive to use commercially acceptable means to protect your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security. We implement a variety of security measures when a user enters, submits, or accesses their information to maintain the safety of your personal information."
          },
          {
            title: "6. Your Data Protection Rights",
            content: "Depending on your location, you may have certain rights regarding your personal information. These may include the right to access, update, or delete the information we have on you. Whenever made possible, you can update your personal information directly within your account settings section. If you are unable to change your personal information, please contact us to make the required changes. If you wish to be informed about what personal information we hold about you and if you want it to be removed from our systems, please contact us. In certain circumstances, you may have the following data protection rights: The right to access, update or delete the information we have on you; The right of rectification; The right to object; The right of restriction; The right to data portability; The right to withdraw consent. Please note that we may ask you to verify your identity before responding to such requests."
          },
          {
            title: "7. Third-Party Links",
            content: "Our application may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services."
          },
          {
            title: "8. Changes to This Privacy Policy",
            content: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Effective Date' at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page."
          },
          {
            title: "9. Contact Us",
            content: "If you have any questions about this Privacy Policy, please contact us at privacy@protocon.com or by mail at: Protocon Inc., 123 Tech Street, San Francisco, CA 94105, United States."
          }
        ].map((section, index) => (
          <Box key={index} mb="xl" pl="lg">
            <Title order={2} mb="md">{section.title}</Title>
            {typeof section.content === 'string' ? (
              <Text>{section.content}</Text>
            ) : (
              section.content
            )}
            {index < 8 && <Divider my="lg" />}
          </Box>
        ))}
      </Paper>
    </Container>
  );
}

export default Privacy;