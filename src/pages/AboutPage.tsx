import CaptionedImageRow from "../components/CaptionedImageRow";

const AboutPage = () => {
  return <>
    <h1>Jake Smejko</h1>
    <h2>About Me</h2>
    <CaptionedImageRow
      images={[
        { src: "/assets/general/cousins.webp", alt: "My cousin and I at a wedding" },
        { src: "/assets/general/grad_ball.webp", alt: "My friends and I at the Grad Ball" },
        { src: "/assets/general/holiday.webp", alt: "Holiday with friends" }
      ]}
      maxHeight={200}
    />
    <div style={{ display: "flex", gap: 10 }}>
      <div style={{ flex: 1 }}>
        <h3>Background</h3>
        <p>
          My surname is Ukrainian, but I am a British national who also holds Australian citizenship.
          I am based in the East Midlands, England, and face no imposition relocating.
        </p>
        <h3>Character</h3>
        <p>
          In between University semesters, I have only ever really had superiors in the workplace,
          which means that while I love to portray my ideas, I know my place.
          Equally, I remember once getting a blazing hot, glass jug from the glass washer at work and telling my colleague that we should use something else for cold drinks while it cools.
          They laughed, took it from me and... it shattered under the cold tap, so I suppose I also learned when to step up.
        </p>
        <p>
          Outside of work, I like to think I've slowly introduced more of an appreciation for musical instruments to my friends.
          In my spare time, I'll summon them for jam sessions and I love it when a weekend drinking session spirals into karaoke.
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
          In the meantime, a patient process of learning to sing alongside my playing ensues.
        </p>
        <p>
          In the past I have created riffs with the idea of making original songs.
          They try to combine Metallica's soft-heavy-soft song structures like Fade to Black with exotic melodies like Cavatina from the Deer Hunter soundtrack,
          with a strict policy for uniqueness, which must be my teacher's perfectionism rubbing off on me.
        </p>
      </div>
    </div>
  </>
};

export default AboutPage;