import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

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
    cursor: pointer;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
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

const StatusMessage = styled(motion.div)`
  padding: 15px;
  border-radius: 10px;
  margin-top: 15px;
  text-align: center;
  font-weight: 600;
  
  &.success {
    background: rgba(0, 212, 170, 0.1);
    border: 1px solid rgba(0, 212, 170, 0.3);
    color: #00d4aa;
  }
  
  &.error {
    background: rgba(255, 107, 107, 0.1);
    border: 1px solid rgba(255, 107, 107, 0.3);
    color: #ff6b6b;
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
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // EmailJS Configuration
  const EMAILJS_SERVICE_ID = 'service_210wqre'; // Replace with your EmailJS service ID
  const EMAILJS_TEMPLATE_ID = 'template_ho872c7'; // Replace with your EmailJS template ID
  const EMAILJS_PUBLIC_KEY = 'pg9Bngw0vT3zhIlmH'; // Replace with your EmailJS public key

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ type: '', text: '' });

    try {
      // Method 1: EmailJS (Recommended for React)
      if (EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID') {
        const result = await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          form.current,
          EMAILJS_PUBLIC_KEY
        );
        
        if (result.status === 200) {
          setStatusMessage({
            type: 'success',
            text: 'Message sent successfully! I\'ll get back to you soon.'
          });
          setFormData({ user_name: '', user_email: '', subject: '', message: '' });
        }
      } else {
        // Method 2: Formspree (Fallback)
        const response = await fetch('https://formspree.io/f/mdkdevkj', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.user_name,
            email: formData.user_email,
            subject: formData.subject,
            message: formData.message,
            _replyto: formData.user_email,
            _subject: `Portfolio Contact: ${formData.subject}`,
          }),
        });

        if (response.ok) {
          setStatusMessage({
            type: 'success',
            text: 'Message sent successfully! I\'ll get back to you soon.'
          });
          setFormData({ user_name: '', user_email: '', subject: '', message: '' });
        } else {
          throw new Error('Network response was not ok');
        }
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatusMessage({
        type: 'error',
        text: 'Sorry, there was an error sending your message. Please try again or contact me directly at lauja2608@gmail.com'
      });
    } finally {
      setIsSubmitting(false);
      
      // Clear status message after 5 seconds
      setTimeout(() => {
        setStatusMessage({ type: '', text: '' });
      }, 5000);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setStatusMessage({
        type: 'success',
        text: 'Email copied to clipboard!'
      });
      
      setTimeout(() => {
        setStatusMessage({ type: '', text: '' });
      }, 2000);
    });
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
    { 
      title: 'Email', 
      text: 'lauja2608@gmail.com',
      icon: '📧',
      action: () => copyToClipboard('lauja2608@gmail.com')
    },
    { 
      title: 'Discord', 
      text: 'mr.l777',
      icon: '💬',
      action: () => copyToClipboard('mr.l777')
    },
    { 
      title: 'Location', 
      text: 'Building on Ethereum',
      icon: '🌍',
      action: null
    }
  ];

  const socialLinks = [
    { 
      href: 'https://github.com/laudzakusuma', 
      label: 'GitHub',
      icon: '⚡'
    },
    { 
      href: 'https://twitter.com/yourusername', 
      label: 'Twitter',
      icon: '🐦'
    },
    { 
      href: 'https://linkedin.com/in/yourusername', 
      label: 'LinkedIn',
      icon: '💼'
    },
    { 
      href: 'https://youtube.com/@yourusername', 
      label: 'YouTube',
      icon: '📺'
    }
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
              Let's Build Together
            </SectionTitle>
            
            <Description variants={itemVariants}>
              Ready to build the future of Web3 together? Whether you have a groundbreaking DeFi idea, 
              need a custom smart contract, or want to discuss the latest in blockchain technology, 
              I'm always excited to connect with fellow crypto enthusiasts and innovators.
            </Description>

            <ContactInfo variants={itemVariants}>
              {contactItems.map((item, index) => (
                <ContactItem
                  key={item.title}
                  whileHover={{ x: 10 }}
                  className="hoverable"
                  onClick={item.action}
                  style={{ cursor: item.action ? 'pointer' : 'default' }}
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
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="hoverable"
                  title={link.label}
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
            <Form ref={form} onSubmit={handleSubmit}>
              <InputGroup>
                <Label htmlFor="user_name">Name</Label>
                <Input
                  type="text"
                  id="user_name"
                  name="user_name"
                  placeholder="Your full name"
                  value={formData.user_name}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="user_email">Email</Label>
                <Input
                  type="email"
                  id="user_email"
                  name="user_email"
                  placeholder="your.email@example.com"
                  value={formData.user_email}
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

              {/* Hidden fields for EmailJS */}
              <input type="hidden" name="to_email" value="lauja2608@gmail.com" />
              <input type="hidden" name="reply_to" value={formData.user_email} />

              <SubmitButton
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hoverable"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </SubmitButton>

              {statusMessage.text && (
                <StatusMessage
                  className={statusMessage.type}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {statusMessage.text}
                </StatusMessage>
              )}
            </Form>
          </FormContainer>
        </ContentGrid>
      </Container>
    </ContactContainer>
  );
};

export default Contact;