import CaptionedVideo from '../components/captionedFootage/CaptionedVideo';
import FloatImage from '../components/captionedFootage/FloatImage';

const KroyairPage = () => {
  return <>
    <h2>Service Management Software Project</h2>
    <i style={{ display: 'block', marginBottom: 16 }}>
      During the 2024 summer break I worked for Kroyair as a field engineer and recognised room for improved efficiency in some of the software they were using.
    </i>
    <FloatImage
      src="/assets/kroyair/kroyair_van.webp"
      alt="Kroyair Van"
    />
    <h3>Overview</h3>
    <p>
      <a
        href="https://www.kroyair.co.uk/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Kroyair
      </a>
      &nbsp;is a heating, ventilation and air conditioning (HVAC) company with offices in Birmingham and Leicestershire. They operate commercially across the entirety of the UK.
      The software that they are using as of 2024 is a combination of off-the-shelf products that don't quite fit their use case.
    </p>
    <p>
      I volunteered to create a bespoke system to better suit their needs outside of my on-site engineering work, with no company time or cost commitment, which they gladly accepted.
      The new software decrease their ongoing subscription costs, automate the recording of timesheets and mileage, and track their assets more strictly.
      There is no expectation for this project to reach completion, and it can absolutely be parked when I gain employment.
      I am primarily doing this as a learning exercise in full-stack development,
      with the benefit of a clear progression trajectory compared to alternative project ideas.
    </p>
    <h3>The Problem</h3>
    <p>
      The software they were using included Joblogic for distribution of work orders, Sage for accounting, Google Docs or equivalent for their assets and Samsara for fleet management,
      none of which communicated with each other. The primary issue that I had with this was the recording of mileage and timesheets to Joblogic, which is information that can be derived using Samsara.
    </p>
    <p>
      Mistakes like timestamping jobs to the wrong date were common and irreversible, reducing the reliability of the data.
      Notes were appended to jobs to indicate the work that was undertaken, assisting future work on particular sites,
      however, this was the only place to clarify amendments to earlier misinputs, which compromised the conciseness of the engineering notes.
    </p>
    <h3>The Solution</h3>
    <i>
      The solution is still in progress: results were tested using my own company vehicle and only published to the server's console.
    </i>
    <ul>
      <li>
        A single server was setup in C# to poll the fleet's GPS location using Samsara's API and use a list of known clients' sites to determine when a vehicle was on-site.
        This produced accurate recommended times/dates for engineers' timestamping.
      </li>
      <li>
        MongoDB was used to store details about the engineers, which might later be migrated to a Sage API implementation.
        It will later contain the asset list, exposing only necessary read/write functionality to engineers and management,
        increasing the fidelity of the data. Timesheets for engineers will be stored here too, eliminating the need for Joblogic.
      </li>
      <li>
        React Native was used to produce a mobile app for the field engineers to use.
        This would implement the suggested timestamps and strongly tie assets to their corresponding sites and jobs.
      </li>
      <li>
        React.js is to be used to produce a web app for management to view the data and assign jobs.
        This currently exists as a skeleton using Vite, written in TypeScript.
      </li>
    </ul>
    <h3>Demonstration</h3>
    <CaptionedVideo
      src="/assets/kroyair/mobile_timings.mp4"
      caption="A screen recording of the mobile app (hosted on Expo Go) on an iOS device"
      maxHeight="600px"
      float="left"
      autoPlay
    />
    <p>
      A demonstration of the mobile app showing recommended timings for AI generated jobs.
      These are grouped by location, allowing the linear interpolation of recommended timings across numerous jobs completed in the same visit.
      Styling is currently minimal.
    </p>
  </>;
};

export default KroyairPage;