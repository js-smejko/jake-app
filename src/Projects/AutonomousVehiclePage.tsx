import BlockFloatContent from '../components/BlockFloatContent';
import CaptionedImageRow from '../components/CaptionedImageRow';
import CaptionedVideo from '../components/CaptionedVideo';
import FloatImage from '../components/FloatImage';

const AutonomousVehiclePage = () => {
  const ASSETS = import.meta.env.BASE_URL + "assets/autonomousVehicle/";

  return <>
    <h2>Autonomous Vehicle Project</h2>
    <i>The University of Nottingham's 1<sup>st</sup> year project 2022-2023</i>
    <h3>Overview</h3>
    <p>
      Work in our first year of university didn't affect our final grades;
      It was used to introduce lab report writing, teamwork, project management and definitely gave a solid first impression for the course.
      The project spanned the whole academic year and exercised a variety of technologies as the vehicle advanced, including:
    </p>
    <ul>
      <li>Soldering through hole and surface mount components to a premade PCB</li>
      <li>Interfacing sensors to Arduino microcontrollers</li>
      <li>Communication between controllers using I2C</li>
      <li>Implementing basic control algorithms</li>
      <li>Actuation of motors using Pulse Width Modulation (PWM)</li>
      <li>Using OpenCV to implement computer vision on Raspberry Pi OS (Linux based)</li>
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
        { src: ASSETS + 'initial_car.webp', alt: 'Initial vehicle' },
        { src: ASSETS + 'final_car.webp', alt: 'Final vehicle' }
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
      leaving many using trial and error with different duty cycles,
      while others used steering offsets; even oscillating steering patterns.
      I recognised that variables such as battery fullness and floor flatness could invalidate these methods and sought a more dynamic solution.
    </p>
      <CaptionedImageRow
        maxHeight={200}
        images={[
          { src: ASSETS + 'encoders.webp', alt: 'Rotary encoders connecting to the mainboard', caption: true },
        ]}
      />
    <p>
      Unaware of PI control at this stage, I counted the rotary encoder readings on each wheel and used the proportional difference between these to increase the duty cycle of the wheel with the lowest count and vice versa.
      Encoder count totals were taken over a measured 10 metre stretch and it was safely assumed that this would remain constant.
    </p>
    <h3>Autonomous Parking Solution</h3>
    <p>
      <FloatImage
        src={ASSETS + 'hcsr.webp'}
        alt='HC-SR04'
        float='left'
        caption
      />
      A single HC-SR04 ultrasonic sensor mounted at the vehicle's rear would then allowed perception of the distance to nearby walls and similar.
      The task at hand assumed the vehicle's starting position was perpendicular to a wall and would see it reverse up to the wall, draw parallel with it, then finally reverse until close to the next wall, ultimately parking in the corner of a confinement.
    </p>
    <p>
      <FloatImage
        src={ASSETS + 'mpu.webp'}
        alt='MPU-6050'
        float='right'
        caption
      />
      The first step was to reverse until the ultrasonic sensor read a distance below a threshold, indicating proximity to the wall.
      At this point, the vehicle would stop and prepare to turn.
    </p>
    <p>
      Pulling parallel with the initial wall made use of a gyroscope housed upon an MCP-6500,
      allowing the polling of the vehicle's current orientation. Both sensors were interfaced to an ESP32.
      This offered an introduction to I2C and the voltage level shifter as signals would prompt the Arduino Nano to actuate the motors and servo.
    </p>
    <p>
      Once the vehicle was within, assuming the other wall was to its left,
      it would perform what was nearly a 180-degree turn to the right.
      The exact angle was hardcoded and carefully chosen such that the frontend of the vehicle was close to this wall.
      When the gyroscope rotated to this threshold, the wheels were drawn parallel with the wall and remained this way until the whole vehicle followed,
      ensuring that the vehicle wouldn't stray from or crash into the wall.
    </p>
    <h3>Track Following with IR Array</h3>
    <BlockFloatContent
      src={ASSETS + 'ir_array.webp'}
      alt='IR Array'
      float='left'
      caption
    >
      <p>
        An array of paired infrared (IR) emitters and receivers would then be used to follow a track.
        The track was laid out as black tape on a white surface,
        causing the IR to reflect with different intensities and the minimum and maximum received signal was amplified between the ESP32's ADC limits of 0-3.3 volts.
        The sensor pairs were to run parallel with the vehicle's width, meaning as the vehicle strayed from the track, outmost sensors would read low and vice versa.
      </p>
      <p>
        Steering would then point in the direction of the sensor(s) that read low;
        to keep things simple, when the vehicle would leave the track,
        the steering would full lock in the direction it was last pointing.
      </p>
    </BlockFloatContent>
    <p>My design was quite unique, here was its method:</p>
    <ol style={{ textAlign: 'left' }}>
      <li>Staggered the array in an arrow, allowing edge-cases to represent more sheer steering angles.</li>
      <li>Housed a calibration routine on the press of a button which registered average readings for the background, then the track over set durations, establishing minimum and maximum ADC reading thresholds for each receiver.</li>
      <li>Normalised the readings for each receiver using its calibration parameters and took the complement - now the highest value is the sensor hovering the track.</li>
      <li>Used linear interpolation to predict where the track  falls amongst the sensors.</li>
      <li>Scaled this result to a steering angle.</li>
    </ol>
    <p>Here is the result:</p>
    <CaptionedVideo src={ASSETS + 'ir_navigation.mp4'} />
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
      At this stage, blurring the images before finding contours and linearly searching for the largest in area in the image worked;
      here were the results:
    </p>
    <CaptionedImageRow
      maxHeight={200}
      images={[
        { src: ASSETS + 'blue_apple.webp', alt: 'Blue apple' },
        { src: ASSETS + 'green_apple.webp', alt: 'Green apple' },
        { src: ASSETS + 'green_car.webp', alt: 'Green car' },
      ]}
      caption="Determining the colour of the dominant object in the image."
    />
    <BlockFloatContent
      src={ASSETS + 'perspective_transform.webp'}
      alt='Perspective transform'
      float="right"
      caption
    >
      <p>
        After approximating the contours of the inner object as a rectangle,
        a perspective transform was applied to the corners within the frame that might contain the symbol.
      </p>
      <p>
        HSV thresholds applied to both the transformed image and the reference image prepared them for comparison.
      </p>
    </BlockFloatContent>
    <p>
      This is how the reference images looked and the track colours that they represented:
    </p>
    <CaptionedImageRow
      maxHeight={200}
      images={[
        { src: ASSETS + 'circle.webp', alt: 'Circle - Red', caption: true },
        { src: ASSETS + 'star.webp', alt: 'Star - Green', caption: true },
        { src: ASSETS + 'triangle.webp', alt: 'Triangle - Blue', caption: true },
        { src: ASSETS + 'umbrella.webp', alt: 'Umbrella - Yellow', caption: true },
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
        { src: ASSETS + 'raw_star.webp', alt: 'Raw star', caption: true },
        { src: ASSETS + 'processed_star.webp', alt: 'Processed star', caption: true },
        { src: ASSETS + 'processed_star_ref.webp', alt: 'Processed star reference', caption: true },
      ]}
    />
    <p>
      Below, based on the position of the track relative to the raw frame,
      it is clear here that the selected track is green, which corresponds with the star sign.
    </p>
    <CaptionedImageRow
      maxHeight={200}
      images={[
        { src: ASSETS + 'raw_tracks.webp', alt: 'Raw tracks', caption: true },
        { src: ASSETS + 'processed_star_ref.webp', alt: 'Detected sign', caption: true },
        { src: ASSETS + 'processed_tracks.webp', alt: 'Selected track', caption: true },
      ]}
    />
    <p>
      Now that the correct track is in view, the average justification of pixels from the centremost column was used to determine the steering angle.
      I2C was then used to communicate this angle to the Arduino Nano, which automatically adjusted the motors' differential in accordance with sharp turns.
    </p>
    <h3>Maze Navigation</h3>
    <BlockFloatContent
      src={ASSETS + 'keypad.webp'}
      alt="Keypad"
      float="left"
      caption
    >
      <p>
        After completing the task at hand, I paid my full attention to the maze navigation.
        The challenge set out a list of straight line distances and right angled turn directions that the vehicle was to follow,
        with the vehicle's starting position and orientation being known.
        Routes were to be planned in advance, entered by the user via a keypad and LCD display and by the time I came to help,
        these electronics were already interfaced to a teammates' vehicle, leaving only their implementation at hand.
      </p>
    </BlockFloatContent>
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