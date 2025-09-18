import { Link } from "react-router";

const CVPage = () => {
  return (
    <div>
      <h1>Curriculum Vitae</h1>
      <p>
        Known for honesty, reliability, and a willingness to help.
        Quick to familiarise with both team dynamics and individual challenges.
        Approachable and solution-oriented, with a genuine enjoyment of problem-solving.
        Take pride in delivering high-quality work and strive for perfection,
        while remaining flexible and deadline-driven to ensure the best possible outcomes.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
        <div>
          <h2>University of Nottingham</h2>
          <p>
            IET Accredited 2:1 BEng qualification in Electrical and Computer Engineering. 
            <Link to="/projects"> Projects</Link> undertaken at university include the development of:
          </p>
          <ul>
            <li>
              Miniature, <Link to="/projects/autonomous-vehicle">autonomous vehicle</Link> using various electronic sensors including <strong>computer vision</strong> using OpenCV. 
              A Raspberry Pi prompted an Arduino microcontroller via I2C to actuate differential motors through DAC and steer using servo.
            </li>
            <li>
              <Link to="/projects/pulse-oximeter">pulse oximeter</Link>, implementing amplification, analogue and digital filtering and the Fast Fourier Transform on a <strong>STM32</strong> chip.
            </li>
            <li>
              <Link to="/projects/cad-software">Computer Aided Design</Link> interface in C++, a group project which I led to enable the viewing of STL files on desktop and Virtual Reality.
            </li>
          </ul>
          <p>
            <Link to="/projects/dissertation">Final year project</Link> involved the creation of a novel system that attained appraisal from my moderator, 
            quote: <i>“Jake has to be one of the most enthusiastic communicators / advocates for a project I've ever seen. 
            Jake really sold the project both technically and scientifically”</i> - 
            Dr. P. Christopher.
          </p>
          <h2>Chellaston Academy</h2>
          <h3>A-Levels:</h3>
          <ul>
            <li>Mathematics - A</li>
            <li>Physics - A</li>
            <li>Computer Science - A</li>
          </ul>
          <h3>9 GCSE passes including:</h3>
          <ul>
            <li>Grade 8 Mathematics</li>
            <li>Grade 7 Combined Science</li>
          </ul>
        </div>
        <div>
          <h2>Work Experience</h2>
          <p>
            2024 summer break working for 
            <a href="https://www.kroyair.co.uk" target="_blank" rel="noopener noreferrer"> Kroyair </a> 
            as a Heating, Ventilation and Air Conditioning (HVAC) engineer, 
            troubleshooting cooling systems such as fridges through analysis of their gas pressure levels and electrical circuitry. 
            A company vehicle was used to travel all around the UK.
          </p>
          <p>
            Ad hoc labourer and groundwork for 
            <Link to="https://www.peekspaving.co.uk/" target="_blank" rel="noopener noreferrer"> Peeks Paving </Link> 
            (Summer job), liaising with customers to understand their specific requirements and work alongside building contractors to complete different paving jobs on time and to budget.
          </p>
          <p>
            Regular bar work on Saturday evenings at 
            <Link to="https://www.themaltataston.co.uk/" target="_blank" rel="noopener noreferrer"> The Malt at Aston </Link> 
            which involved dealing with people 
            and handling transactions.
          </p>
          <h2>Other Certifications</h2>
          <ul>
            <li>
              <Link to="/assets/documents/guitar_grade_8.pdf" target="_blank" rel="noopener noreferrer">
                UWLQ Level 3 Certificate in Music Performance: 
                distinction in acoustic guitar playing at grade 8.
              </Link>
            </li>
            <li>Full UK drivers' licence since 03/12/2021</li>
          </ul>
          <h2>Other Skills</h2>
          <p>
            Adept programmer having learnt C and C++, Python and its popular libraries such as NumPy, Pandas, PyTorch, scikit-learn and Ultralytics for analyses with AI. 
            Familiar with MATLAB and Simulink from university.
          </p>
          <p>
            At home React.js and React Native were learned through Udemy and exercised in <Link to="/projects/kroyair">projects with C# at the backend</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CVPage;