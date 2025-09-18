import BlockFloatContent from "../components/BlockFloatContent";
import FloatImage from "../components/FloatImage";
import HighlightsTabs from "../components/HighlightsTabs";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Jake Smejko</h1>
      <BlockFloatContent
        src="/assets/general/graduation_with_dad.webp"
        alt="My dad and I at graduation"
        float="left"
      >
        <FloatImage
          src="/assets/general/graduation_with_mum.webp"
          alt="My mum and I at graduation"
          float="left"
        />
        <p>
          My name is Jake Smejko and this website is a portfolio of my projects and skills from a first person, relatively colloquial perspective.
          I graduated from the University of Nottingham on the 29<sup>th</sup> of July, 2025 in Electrical and Computer Engineering,
          which posed challenges that sent many into despair but only grew my interest.
        </p>
        <p>
          My drive for results means that methods which met my course's grading criteria came with maintainable, working end-products:
          as a result, I don't have to beat around the bush when it comes to showcasing outcomes and articulating my methods.
        </p>
        <p>
          Please feel free to have a look at my
          <Link to="/cv"> CV </Link>
          and/or get in contact via
          <a href="mailto:jsmejko@outlook.com"> Email</a>.
        </p>
      </BlockFloatContent>
      <h3><Link to="projects">Project</Link> Highlight Videos</h3>
      <HighlightsTabs />
    </div>
  );
};

export default HomePage;