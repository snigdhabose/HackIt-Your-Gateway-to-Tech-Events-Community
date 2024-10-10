import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./Dashboard.css";
import logoImage from '../images/Screenshot 2023-12-14 at 6.55.24 PM.png';
import eventImage from '../images/Event-planning-software-infographic.png'
import community from '../images/All-You-Need-to-Know-For-Creating-a-Tech-Team-From-Scratch.jpg'
const About = () => {
    const userid = useParams().id;
  return (
    <div className="entire-page">
      <div>
        {/* Horizontal Navbar */}
        <div className="navbar-horizontal">
        <Navbar userid={userid} />
        </div>
        <div  className="about-container">
        <img
              src={logoImage}
              alt="External11 Event"
            />
        <div className="about-hackit" style={{margin:'50px', fontSize:'1.5em'}}>
  <h1>About Our Tech Event Platform</h1>
  <p style={{fontSize:'0.8em'}}>
    Welcome to our dynamic technical event management platform, where innovation converges with excitement! We are more than just an events hub; we're a thriving community that empowers tech enthusiasts to dive into the heart of technological advancements.
  
    Immerse yourself in a diverse array of tech events, ranging from hackathons and workshops to conferences and networking sessions. Our curated platform ensures that you stay at the forefront of the ever-evolving tech landscape.
  
    As a user, you are not just a participant – you are a valued contributor. Register for events that align with your interests, share your insights, and become part of a collaborative space that fuels creativity and ingenuity.
  
    Enhance your event experience by rating the ones you attend. Your feedback matters! Ratings provide invaluable insights for organizers and fellow participants, shaping the future of tech gatherings.
 
    Your journey on our platform extends to personalized user profiles. Easily navigate through your registered and bookmarked events, track your tech endeavors, and build a tech portfolio that showcases your engagement.
  
    Organizers, seize the opportunity to showcase your vision. Our platform empowers you to create, modify, and elevate your events, fostering a collaborative and vibrant tech community.
 
    What sets us apart is our commitment to inclusivity. We believe that diversity drives innovation. Our events cater to a wide audience, encouraging participation from all backgrounds and skill levels.

    Stay connected with the latest tech trends, emerging technologies, and influential voices in the tech industry. We provide a space where knowledge is shared, connections are forged, and aspirations are transformed into reality.
  
    Join us on this exciting venture of exploration, connection, and tech excellence. Together, let's shape the future of tech events and make every moment on our platform an unforgettable part of your tech journey.
  </p>
</div>



          </div>

          <div  className="about-container">
          <img style={{width:'800px'}}
              src={eventImage}
              alt="External11 Event"
            />
        <div className="about-hackit" style={{margin:'50px', fontSize:'1.5em'}}>
        <h2>Why Ratings Matter?</h2>
            <p >
              Event ratings provide valuable feedback about the quality of an event. Users can gauge the success and impact of an event based on ratings and reviews. For organizers, it's an opportunity to improve and tailor future events to meet the expectations of the community.
           
              Ratings also serve as a guide for other users. Attendees can make informed decisions about which events to register for based on the experiences of their peers. It creates a transparent and collaborative environment within the tech community.
            </p>
            <br/>
            <h2>Discover More Tech Events</h2>
            <p>
              Our platform not only showcases local events but also recommends exciting tech events from external sources. Explore a diverse range of events to enhance your tech journey.
            </p>
            <br/>
            <h2>Your Tech Profile</h2>
            <p>
              Dive into your tech journey with a personalized profile. View your registered events, bookmarked favorites, and explore your tech engagement.
            </p>
</div>



          </div>
        {/* About Screen Content */}
     
          <div className="about-container">
          {/* User Profile Section */}
       

          {/* Community Collaboration Section */}
          <div className="about-section">
  <h2>Join the Tech Community</h2>
  <p>
    Dive into a vibrant ecosystem of innovation and collaboration! Join our tech community, where passionate individuals converge to explore, learn, and grow together. Engage with fellow tech enthusiasts, share valuable insights, and stay connected with the pulse of the latest trends in the tech world.
 
    Our platform goes beyond being a mere event hub; it's a dynamic community hub where ideas are exchanged, collaborations are born, and friendships are forged. Whether you're a seasoned professional or a tech enthusiast exploring the vast landscape of technology, you'll find a welcoming space to contribute, connect, and thrive.
  
    Immerse yourself in lively discussions, participate in forums, and collaborate on exciting projects. We believe that fostering a sense of community is essential for driving innovation, and we're committed to providing a space that nurtures meaningful connections within the tech sphere.
  
    Embrace the power of networking and build lasting connections that extend beyond events. Our community is your gateway to a supportive network of like-minded individuals who share your passion for technology. Whether you're seeking mentorship, looking to share your expertise, or simply eager to connect with fellow tech enthusiasts, you'll find a welcoming home within our thriving tech community.
  
    Explore exclusive community features, such as specialized interest groups, expert-led webinars, and collaborative coding projects. Your journey in our tech community is not just about events; it's a continuous exploration of knowledge, camaraderie, and endless possibilities.
  
    Join us in shaping the future of technology, one collaborative step at a time. Your presence adds to the diversity and richness of our community, making it a true melting pot of ideas and innovation.
  </p>
  <img
  style={{ width: '100%' }}
  src={community}
  alt="Tech Community"
/>
  
</div>

        </div>
      </div>
      <footer>
        &copy; 2023 Data and Tech Workshop
      </footer>
    </div>
  );
};

export default About;