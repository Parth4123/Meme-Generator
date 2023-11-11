import React, { useRef } from "react";

// Define the Meme component
export default function Meme() {
  // Initialize state for the meme and all memes
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemes, setAllMemes] = React.useState([]);

  // Fetch all memes on component mount
  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  // Function to get a random meme image
  function getMemeImage() {
    let randomNumber;
    let url;
    do {
      randomNumber = Math.floor(Math.random() * allMemes.length);
      url = allMemes[randomNumber].url;
    } while (url === meme.randomImage);

    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  // Function to handle changes in the input fields
  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  // Create a ref for the meme div
  const memeRef = useRef();

  // Function to download the meme
  function downloadMeme() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = meme.randomImage;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    
      // Set the font, color, and shadow
      ctx.font = "bold 50px Karla";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
    
      // Set the shadow
      ctx.shadowColor = "black";
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 4;
      ctx.shadowBlur = 7;
    
      ctx.fillText(meme.topText, canvas.width / 2, 50);
      ctx.fillText(meme.bottomText, canvas.width / 2, img.height - 20);
      const dataUrl = canvas.toDataURL("image/jpeg");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "meme.jpg";
      a.click();
    };
  }

  // Render the form and the meme
  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top Text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom Text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a New meme Image
        </button>
      </div>
      <div className="meme" ref={memeRef}>
        <img src={meme.randomImage} alt="meme" className="meme--image" />
        <h2 className="meme--top-text">{meme.topText}</h2>
        <h2 className="meme--bottom-text">{meme.bottomText}</h2>
      </div>
        <button className="form--button-download" onClick={downloadMeme}>
          Download Meme
        </button>
    </main>
  );
}
