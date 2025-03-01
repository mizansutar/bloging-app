import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Avatar, Chip } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
// Define a keyframe animation for fading in
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Define a keyframe animation for scaling up
const scaleUp = keyframes`
  from { transform: scale(0.9); }
  to { transform: scale(1); }
`;

// Styled container with animations
const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  animation: `${fadeIn} 1s ease-in-out`,
}));

// Styled header section
const HeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

// Styled avatar with animation
const AnimatedAvatar = styled(Avatar)(({ theme }) => ({
  marginRight: theme.spacing(2),
  backgroundColor: theme.palette.error,
  animation: `${scaleUp} 0.5s ease-in-out`,
}));

// Styled section title
const SectionTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
  fontWeight: 'bold',
  textDecoration: 'underline',
}));

// Styled card with hover effect
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: 'auto',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

// Styled chip with animation
const AnimatedChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  animation: `${fadeIn} 0.5s ease-in-out`,
}));
const About = () => {
    // Sample data for projects and skills
    const projects = [
      {
        title: 'Project One',
        description: 'A brief description of Project One.',
        image: 'https://via.placeholder.com/140',
      },
      {
        title: 'Project Two',
        description: 'A brief description of Project Two.',
        image: 'https://via.placeholder.com/140',
      },
      // Add more projects as needed
    ];
  
    const skills = ['JavaScript', 'React', 'Material UI', 'Node.js', 'CSS'];
  
    return (
      <StyledContainer>
        {/* Header Section */}
        <HeaderSection>
          <AnimatedAvatar>
            <PersonIcon />
          </AnimatedAvatar>
          <Typography variant="h2" component="h1">
            About Me
          </Typography>
        </HeaderSection>
        <Typography variant="body1" paragraph>
          Welcome to my portfolio! I am a passionate developer with experience in building dynamic web applications.
        </Typography>
  
        {/* Projects Section */}
        <SectionTitle variant="h4">
          <CodeIcon /> Projects
        </SectionTitle>
        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="140"
                  image={project.image}
                  alt={project.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {project.description}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
  
        {/* Skills Section */}
        <SectionTitle variant="h4">
          <BuildIcon /> Skills
        </SectionTitle>
        <Box>
          {skills.map((skill, index) => (
            <AnimatedChip
              key={index}
              label={skill}
              color="primary"
            />
          ))}
        </Box>
      </StyledContainer>
    );
  };
  
  export default About;
  