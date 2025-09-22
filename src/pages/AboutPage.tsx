import CaptionedImageRow from "../components/CaptionedImageRow";

const AboutPage = () => {
  return <>
    <h1>Jake Smejko</h1>
    <h2>About Me</h2>
    <CaptionedImageRow
      images={[
        { src: "/assets/general/cousins.webp", alt: "My cousin and I at a wedding" },
        { src: "/assets/general/grad_ball.webp", alt: "My friends and I at the Grad Ball" },
        { src: "/assets/general/laney.webp", alt: "My family's dog, Laney" }
      ]}
      maxHeight={200}
    />
    <div style={{ display: "flex", gap: 10 }}>
      <div style={{ flex: 1 }}>
        <h3>Background</h3>
        <p>
          My surname is Ukrainian, but I am a British and Australian citizen.
          I am currently based in the East Midlands, England, and face no imposition relocating.
        </p>
        <h3>Character</h3>
        <p>
          I approach new challenges by first taking the time to deeply understand the problem. 
          For me, the real progress often comes in a single eureka moment — a turning point that tends to take just as long to reach in small projects as it does in larger, more complex ones. 
          Because of this, I'm especially well-suited to tackling ambitious, multi-layered problems that reward patience and thorough analysis, even if I'm less at home in rapid-fire, reaction-based tasks.
        </p>
        <p>
          Outside of work, I like to think I've slowly introduced more of an appreciation for musical instruments to my friends.
          In my spare time, I'll summon them for jam sessions and we always try to base our social gatherings where there's live music.
        </p>
        <p>
          I reserve Sundays for a family dog walk and roast dinner and make an effort to take the dog walking with a friend once a week.
          Where I find time, I go to the gym then scatter in personal project work and guitar practice.
        </p>
      </div>
      <div style={{ flex: 1 }}>
        <h3>Music</h3>
        <p>
          My fantastic guitar teacher, Nigel Harris helped me to attain a distinction in grade 8 acoustic guitar playing, with emphasis on fingerstyle steel-string guitar.
          His incredible variety of music taste was infectious and it means that, in my own time, I will learn Don McLean one day and attempt heavy metal such as Periphery the next.
        </p>
        <p>
          I formed a band with friends from school around 2019 and a few months later we stole the show at a local fundraiser event.
          When university came about, our members ended up distributed across the country and we disbanded,
          which leaves me keen to join or form a new band down the track.
        </p>
        <p>
          In the past I have created riffs with the idea of making original songs with a strict policy for uniqueness, 
          which must be my teacher's perfectionism rubbing off on me. In the meantime, a patient process of learning to sing alongside my playing ensues.
        </p>
      </div>
    </div>
  </>
};

export default AboutPage;