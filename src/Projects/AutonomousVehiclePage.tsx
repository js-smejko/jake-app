import CaptionedImageRow from '../components/captionedFootage/CaptionedImageRow';
import CaptionedVideo from '../components/captionedFootage/CaptionedVideo';
import Carousel from '../components/carousel/Carousel';
import FloatImage from '../components/captionedFootage/FloatImage';

const AutonomousVehiclePage = () => {
  return <>
    <h2>Autonomous Vehicle Project</h2>
    <i>The University of Nottingham's 1<sup>st</sup> year project 2022-2023</i>
    <h3>Overview</h3>
    <p>
      This project spanned the whole academic year and saw printed circuit boards (PCBs), two motors and a servo eventually self-drive using various microcontrollers and sensors.
    </p>
    <p>
      Work in our first year of university didn't affect our final grades;
      It was used to introduce lab report writing, teamwork, project management and definitely gave a solid first impression for the course.
      It exercised a variety of technologies as the vehicle advanced, including:
    </p>
    <ul>
      <li>Soldering through hole and surface mount components to a premade PCB</li>
      <li>Interfacing sensors to Arduino microcontrollers</li>
      <li>Communication between controllers using I2C</li>
      <li>Implementing basic control algorithms</li>
      <li>Actuation of motors using Pulse Width Modulation (PWM)</li>
      <li>Using OpenCV to implement computer vision on a Raspberry Pi</li>
    </ul>
    <h3>Starting Off</h3>
    <p>
      A strong foundation was provided to kick off the project:
      each student received differential rear motors, servo steering, parallel 3.7V rechargeable cells and an Arduino Nano to control this.
      The PCB and layout were granted at this stage, introducing the cohort to soldering.
    </p>
    <CaptionedImageRow
      maxHeight={200}
      images={[
        { src: '/assets/autonomousVehicle/initial_car.webp', alt: 'Initial vehicle' },
        { src: '/assets/autonomousVehicle/final_car.webp', alt: 'Final vehicle' }
      ]}
      caption="Vehicle at the start (left) and end (right) of the project"
    />
    <h3>Driving in a Straight Line and Distance Acquisition with Rotary Encoders</h3>
    <p>
      Differential rear motors may turn at different speeds,
      potentially due to factory tolerances,
      meaning that even with the steering pointed dead ahead,
      cars might not travel in a straight line, introducing the first challenge: to drive exactly 10 metres in a straight line.
      At this point gyroscopes were not available.
    </p>
    <p>
      Motor speeds could be controlled using pulse width modulation (PWM),
      which left many students trialling different duty cycles, steering offsets and even oscillating steering patterns.
      I recognised that variables such as inclination of the floor could compromise these methods and sought a more dynamic solution.
    </p>
    <CaptionedImageRow
      maxHeight={200}
      images={[
        { src: '/assets/autonomousVehicle/encoders.webp', alt: 'Rotary encoders connecting to the mainboard', caption: true },
      ]}
    />
    <p>
      I counted the rotary encoder readings on each wheel and used the proportional difference between these to increase the duty cycle of the wheel with the lowest count and vice versa.
      The coefficient of the linear relationship between encoder count and distance was quantified for environments where wheelspin was negligible and this was very effective over the 10m stretch.
    </p>
    <h3>Autonomous Parking Solution</h3>
    <FloatImage
      src="/assets/autonomousVehicle/hcsr.webp"
      alt="HC-SR04"
      float="left"
      caption
    />
    <p>
      A single HC-SR04 ultrasonic sensor mounted at the vehicle's rear would then allowed perception of the distance to nearby walls and similar.
      The task at hand assumed the vehicle's starting position was perpendicular to a wall and would see it reverse up to the wall, draw parallel with it, then finally reverse until close to the next wall, ultimately parking in the corner of a confinement.
    </p>
    <FloatImage
      src="/assets/autonomousVehicle/mpu.webp"
      alt="MPU-6050"
      float="right"
      caption
    />
    <p>
      The first step was to reverse until the ultrasonic sensor read a distance below a set threshold, indicating close proximity to the wall.
      At this point, the vehicle would stop and prepare to turn.
    </p>
    <p>
      Pulling parallel with the initial wall made use of a gyroscope housed upon an MCP-6500,
      allowing the polling of the vehicle's current orientation. Both sensors were interfaced to an ESP32.
      This offered an introduction to I2C and the voltage level shifter so that its signals could prompt the Arduino Nano to actuate the motors and servo.
    </p>
    <p>
      A nearly 180-degree turn positioned the vehicle's front end near to the wall that it reversed up to -
      this value was hardcoded and chosen to minimise the distance from the wall while still allowing the steering to then draw parallel with it in the next step.
      Keeping the steering parallel with the wall while proceeding forwards required continuous monitoring of the vehicle's orientation and meant that the vehicle would not stray towards or away from the wall,
      eliminating variables such as wheel slip and the need to time the routine.
    </p>
    <p>
      Once the vehicle was parallel with the first wall, it would poll its distance from the wall at its rear until it was close,
      finally arriving in the corner of the confinement.
    </p>
    <h3>IR Array Track Following</h3>
    <FloatImage
      src="/assets/autonomousVehicle/ir_array.webp"
      alt="IR Array"
      float="left"
      caption
    />
    <p>
      An array of paired infrared (IR) emitters and receivers would then be used to follow a track.
      The track was laid out as black tape on a white surface, causing the IR to reflect with different intensities.
      The minimum and maximum received signal was amplified between the ESP32's ADC limits of 0-3.3 volts
      and the sensor pairs were to run parallel with the vehicle's width, meaning as the vehicle strayed from the track, outmost sensors would read low and vice versa.
    </p>
    <p>
      Steering would then point in the direction of the sensor(s) that read low;
      to keep things simple, when the vehicle left the track,
      the steering full-locked in the direction it was last pointing.
    </p>
    <div className="clear" />
    <p>My design was quite unique, here was its method:</p>
    <ol style={{ textAlign: 'left' }}>
      <li>Staggered the array in an arrow, allowing edge-cases to represent more sheer steering angles.</li>
      <li>Housed a calibration routine on the press of a button which registered average readings for the background, then the track over set durations, establishing minimum and maximum ADC reading thresholds for each receiver.</li>
      <li>Normalised the readings for each receiver using its calibration parameters and took the complement - now the highest value is the sensor hovering the track.</li>
      <li>Used linear interpolation to predict where the track  falls amongst the sensors.</li>
      <li>Scaled this result to a steering angle.</li>
    </ol>
    <p>Here is the result:</p>
    <CaptionedVideo src="/assets/autonomousVehicle/ir_navigation.mp4" autoPlay />
    <h3>Navigation with Computer Vision</h3>
    <p>
      At this stage in the project, the benches we worked at became teams:
      two people would work on maze navigation, the other two on computer vision.
      One Raspberry Pi 3A+ was assigned to each team and a unanimous decision recognised my vehicle as the most fitting host for it.
    </p>
    <p>
      Different colours of tape were now laid out with junctions.
      Now, signs would indicate the track colour that was to be followed,
      using OpenCV for the detection of these signs and carefully chosen HSV thresholds to distinguish the tracks.
    </p>
    <p>
      Now, the signs were to be recognised. At this stage we hadn't yet been introduced to image detection neural networks,
      so laid out was an introductory task that used basic image processing such as finding contours.
      Blurring the images before finding contours and linearly searching for the largest shape bound by the contours distinguished the subject from its background;
      below are three examples (swipeable) of the original image before (top left) and after background removal (bottom left), the determined dominant colour (middle) and some thresholds (right):
    </p>
    <Carousel
      className="carousel"
      style={{
        backgroundColor: window.screen.width >= 600
          ? "#383a5a"
          : "#26284d",
        marginBottom: "1em"
      }}
      gap={32}
    >
      <FloatImage
        src="/assets/autonomousVehicle/blue_apple.webp"
        alt="Blue Apple"
        maxHeight={400}
      />
      <FloatImage
        src="/assets/autonomousVehicle/green_apple.webp"
        alt="Green Apple"
        maxHeight={400}
      />
      <FloatImage
        src="/assets/autonomousVehicle/green_car.webp"
        alt="Green Car"
        maxHeight={400}
      />
    </Carousel>
    <FloatImage
      src="/assets/autonomousVehicle/perspective_transform.webp"
      alt="Perspective transform"
      float="right"
      caption
    />
    <p>
      After approximating the contours of the inner object as a rectangle,
      a perspective transform was applied to the corners within the frame that might contain the symbol.
    </p>
    <p>
      HSV thresholds applied to both the transformed image and the reference image prepared them for comparison.
    </p>
    <div className="clear" />
    <p>
      This is how the reference images looked and the track colours that they represented:
    </p>
    <CaptionedImageRow
      maxHeight={200}
      images={[
        { src: '/assets/autonomousVehicle/circle.webp', alt: 'Circle - Red', caption: true },
        { src: '/assets/autonomousVehicle/star.webp', alt: 'Star - Green', caption: true },
        { src: '/assets/autonomousVehicle/triangle.webp', alt: 'Triangle - Blue', caption: true },
        { src: '/assets/autonomousVehicle/umbrella.webp', alt: 'Umbrella - Yellow', caption: true },
      ]}
    />
    <p>
      Each orientation of the sign was checked against every reference image pixelwise,
      in search of the best match. If this match exceeded a threshold, the sign was deemed to be present.
      The HSV threshold for the track colour was then adjusted accordingly, now, while this track colour was present in the frame,
      it was followed. Otherwise, the HSV threshold will default to black again.
    </p>
    <CaptionedImageRow
      maxHeight={200}
      images={[
        { src: '/assets/autonomousVehicle/raw_star.webp', alt: 'Raw star', caption: true },
        { src: '/assets/autonomousVehicle/processed_star.webp', alt: 'Processed star', caption: true },
        { src: '/assets/autonomousVehicle/processed_star_ref.webp', alt: 'Processed star reference', caption: true },
      ]}
    />
    <p>
      Below, based on the position of the track relative to the raw frame,
      it is clear that the selected track is green, which correctly corresponds with the star sign.
    </p>
    <CaptionedImageRow
      maxHeight={200}
      images={[
        { src: '/assets/autonomousVehicle/raw_tracks.webp', alt: 'Raw tracks', caption: true },
        { src: '/assets/autonomousVehicle/processed_star_ref.webp', alt: 'Detected sign', caption: true },
        { src: '/assets/autonomousVehicle/processed_tracks.webp', alt: 'Selected track', caption: true },
      ]}
    />
    <p>
      Now that the correct track is in view, the average justification of pixels from the centremost column was used to determine the steering angle.
      I2C was then used to communicate this angle to the Arduino Nano, which automatically adjusted the motors' differential in accordance with sharp turns.
    </p>
    <p>
      The result looked similar to the IR navigation video above, however, junctions were now also present and the vehicle would change track accordingly.
    </p>
    <h3>Maze Navigation</h3>
    <FloatImage
      src="/assets/autonomousVehicle/keypad.webp"
      alt="Keypad"
      float="left"
      caption
    />
    <p>
      After completing my task of navigation with computer vision, I paid my full attention to the maze navigation.
      The challenge set out a list of straight line distances and right angled turn directions that the vehicle was to follow,
      with the vehicle's starting position and orientation being known.
      Routes were to be planned in advance, entered by the user via a keypad and LCD display and by the time I came to help,
      these electronics were already interfaced to a teammates' vehicle, leaving only their implementation at hand.
    </p>
    <div className="clear" />
    <p>
      Buttons were laid out as follows, the idea was to replicate the WASD layout for high familiarity with gamers:
    </p>
    <ul>
      <li><code>1 : Backspace</code></li>
      <li><code>2 (W) : Travel forward</code></li>
      <li><code>4 (A) : Turn left 90 degrees</code></li>
      <li><code>6 (D) : Turn right 90 degrees</code></li>
      <li><code>* : Clear</code></li>
      <li><code># : Go</code></li>
    </ul>
    <p>
      After pressing <code>2</code>, the next key press would be interpreted as a distance;
      in multiples of 10cm, opening up the whole range of numbers on the keypad.
    </p>
    <p>
      Performing this routine is something many groups struggled with. For us,
      it was a matter of combining my distance acquisition method in the first challenge with the parking solution.
      My existing functions for turning to specific angles were copied to the host's ESP32 to great effect.
    </p>
  </>;
};

export default AutonomousVehiclePage;