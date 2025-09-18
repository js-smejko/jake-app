import FloatImage from '../components/FloatImage';

const PulseOximeterPage = () => {
  return <>
    <h2>Pulse Oximeter Project</h2>
    <i>The University of Nottingham's 2<sup>nd</sup> year project in 2023</i>
    <h3>Overview</h3>
    <FloatImage
      src={"/assets/pulseOximeter/banner_from_moodle.webp"}
      alt="Pulse Oximeter Banner from Moodle"
      caption="An outline of the project gathered from my University's Moodle page"
    />
    <p>
      A pulse oximeter is a device that measures both heart rate and Sp02 (blood oxygen saturation) levels.
      As the heart pumps, the amount of light absorbed by blood in the end of a finger changes; 
      monitoring these changes allows the heart rate to be calculated.
      At the same time, the relative difference between red and infrared light absorbed by the blood can be used to determine Sp02 levels.
    </p>
    <p>
      Time was extremely constrained compared to the objectives outlined in this project,
      which placed focus on the design of its components rather than their implementation.
      This left lots of breadboarded prototypes which don't lend themselves well to photographs.
    </p>
    <p>
      Teams of four were initially responsible for the analogue processing of the IR receiver's signal,
      which included a transimpedance amplifier, high-pass and low-pass filters, and a second stage amplifier.
      This would meet ADC acquisition firmware on a STM32 microcontroller, which met my individual task: to perform a Fast Fourier Transform (FFT).
    </p>
    <h3>Reading Heart Rate</h3>
    <p>
      Once our oscilloscope was displaying a clear PPG trace, I had to make design decisions about the FFT binning and sample rate.
      Initially I researched the minimum and maximum reasonable human heart rates:
      The sample rate would use Nyquist's theorem on the maximum possible heart rate and the product of this and the number of bins would meet the time period of the minimum heart rate,
      which naturally became the time interval between FFT calculations, meaning less bins minimised the latency before the first reading.
      On the flipside, the resolution of the FFT increased with the number of bins and this was currently &plusmn;30 BPM or so.
    </p>
    <p>
      Research led me to pad the samples up to a resolution of &plusmn;0.5 BPM and window them, before excluding the DC component in the FFT and linearly searching for the bin of the highest magnitude.
      The index of the bin corresponded with the frequency and a BPM reading was printed to the C debugging console to the nearest integer. 
      Our product's BPM readings were identical to the example product provided and actually appeared with less latency.
    </p>
    <h3>Displaying the Readings</h3>
    <p>
      7-segment displays would then be driven by a Complex Programmable Logic Device (CPLD) to show the heart rate readings.
      My team was assigned to the create the hardware around my work on the CPLD logic,
      which I created in Intel Quartus Prime Lite. 
      I independently designed and simulated a clock divider, control state machine, serial to parallel shift register.
      Logic was also in work for a BCD to 7-segment decoder, but this remained untested.
    </p>
    <p>
      Unfortunately, time constraints left the hardware unready and our display never came into fruition.
      However, I am proud of my work on the CPLD, which was completely new to me at the time.
      I also don't know of anyone else who overcame the resolution challenges of the FFT readings.
    </p>
  </>
};

export default PulseOximeterPage;