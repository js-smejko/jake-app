import FloatImage from "../components/captionedFootage/FloatImage";
import HighlightsCarousel from "../components/HighlightsCarousel";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Home</h1>
      <FloatImage
        src="/assets/general/graduation_with_dad.webp"
        alt="My dad and I at graduation"
        float="left"
      />
      <FloatImage
        src="/assets/general/graduation_with_mum.webp"
        alt="My mum and I at graduation"
        float="left"
      />
      <p>
        My name is Jake Smejko and this website is a portfolio of my projects and skills.
        I graduated from the University of Nottingham on the 29<sup>th</sup> of July, 2025 in Electrical and Computer Engineering,
        which posed challenges that sent some of my colleagues into despair but thankfully only served to grow my interest. <Link to="about">Find out more about me here...</Link>
      </p>
      <p>
        My drive for results means that I wasn't content with using methods which would only meet the bare minimum of my course's grading criteria, but instead I strived to create maintainable, working end-products:
        as a result, I can confidently showcase outcomes and articulate my methods. <Link to="projects">See for yourself here...</Link>
      </p>
      <p>
        Please feel free to have a look at my
        <Link to="/cv"> CV </Link>
        and/or get in contact via
        <a href="mailto:jsmejko@outlook.com"> Email</a>.
      </p>
      <h3><Link to="projects">Project</Link> Highlight Videos</h3>
      <HighlightsCarousel />
    </div>
  );
};

export default HomePage;