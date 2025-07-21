import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ContactContainer = styled.section`
  min-height: 100vh;
  padding: 100px 50px;
  background: linear-gradient(180deg, #16213e 0%, #0a0a0a 100%);
  position: relative;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 80px 20px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const LeftContent = styled(motion.div)``;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 2rem;
  background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 3rem;
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const ContactText = styled.div`
  h4 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 5px;
    font-size: 1.1rem;
  }
  
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 20px;
  margin-top: 2rem;
`;

const SocialLink = styled(motion.a)`
  width: 50px;
  height: 50px;
  background: rgba(0, 212, 255, 0.1);
  border: 2px solid rgba(0, 212, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-3px);
  }
`;

const FormContainer = styled(motion.div)`
  background: rgba(26, 26, 46, 0.8);
  padding: 40px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 0.9rem;
`;

const Input = styled(motion.input)`
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    background: rgba(0, 0, 0, 0.5);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const TextArea = styled(motion.textarea)`
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    background: rgba(0, 0, 0, 0.5);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  border: none;
  padding: 15px 30px;
  border-radius: 10px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover:before {
    left: 100%;
  }
`;

const BackgroundAnimation = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingShape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(0, 212, 255, 0.1), rgba(255, 107, 53, 0.1));
  filter: blur(2px);
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  const contactItems = [
    { icon: '📧', title: 'Email', text: 'hello@yourname.com' },
    { icon: '📱', title: 'Phone', text: '+62 123 456 7890' },
    { icon: '📍', title: 'Location', text: 'Jakarta, Indonesia' }
  ];

  const socialLinks = [
    { icon: '🐙', href: '#', label: 'GitHub' },
    { icon: '💼', href: '#', label: 'LinkedIn' },
    { icon: '🐦', href: '#', label: 'Twitter' },
    { icon: '📷', href: '#', label: 'Instagram' }
  ];

  return (
    <ContactContainer>
      <BackgroundAnimation>
        {[...Array(5)].map((_, i) => (
          <FloatingShape
            key={i}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              width: `${50 + i * 20}px`,
              height: `${50 + i * 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </BackgroundAnimation>

      <Container>
        <ContentGrid>
          <LeftContent
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionTitle variants={itemVariants}>
              Let's Work Together
            </SectionTitle>
            
            <Description variants={itemVariants}>
              I'm always excited to work on new projects and collaborate with amazing people. 
              Whether you have a project in mind or just want to chat about technology, 
              feel free to reach out!
            </Description>

            <ContactInfo variants={itemVariants}>
              {contactItems.map((item, index) => (
                <ContactItem
                  key={item.title}
                  whileHover={{ x: 10 }}
                  className="hoverable"
                >
                  <ContactIcon>{item.icon}</ContactIcon>
                  <ContactText>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </ContactText>
                </ContactItem>
              ))}
            </ContactInfo>

            <SocialLinks variants={itemVariants}>
              {socialLinks.map((link) => (
                <SocialLink
                  key={link.label}
                  href={link.href}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="hoverable"
                >
                  {link.icon}
                </SocialLink>
              ))}
            </SocialLinks>
          </LeftContent>

          <FormContainer
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="message">Message</Label>
                <TextArea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </InputGroup>

              <SubmitButton
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hoverable"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </SubmitButton>
            </Form>
          </FormContainer>
        </ContentGrid>
      </Container>
    </ContactContainer>
  );
};

export default Contact;