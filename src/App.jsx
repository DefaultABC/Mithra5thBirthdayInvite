import React, { useState, useEffect } from "react";
import "./App.css";
import emailjs from "emailjs-com";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const bannerImages = [
    "Mithra1.PNG",
    "Mithra2.jpg",
    "Mithra3.jpg",
    "Mithra4.PNG"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => 
        (prevIndex + 1) % bannerImages.length
      );
    }, 4000); // Change banner every 4 seconds

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await emailjs.send(
      "service_47xh3bn",
      "template_uiskc8f",
      {
        to_name: formData.name,
        to_email: formData.email,
        attending: formData.attending
      },
      "Ip-rA3SasTbJSBoAe"
    );

    setSubmitted(true);
  };

  return (
    <div className="background">
      <audio autoPlay loop>
        <source src="unicorn-music.mp3" type="audio/mp3" />
      </audio>

      <div className="invite-card">
        <div className="banner-container">
          <div className="banner-slider" style={{ transform: `translateX(-${currentBannerIndex * 100}%)` }}>
            {bannerImages.map((image, index) => (
              <div key={index} className="banner-slide">
                <img
                  src={image}
                  alt={`Magical Banner ${index + 1}`}
                  className="banner-image"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=400&fit=crop";
                  }}
                />
                <div className="banner-overlay">
                  <h2 className="banner-title">🦄 I am turning 5! 🦄</h2>
                </div>
              </div>
            ))}
          </div>
          <div className="banner-indicators">
            {bannerImages.map((_, index) => (
              <span 
                key={index} 
                className={`banner-indicator ${index === currentBannerIndex ? 'active' : ''}`}
                onClick={() => setCurrentBannerIndex(index)}
              ></span>
            ))}
          </div>
        </div>

        <h1>🦄 Mithra's Magical Unicorn Birthday Party ✨</h1>
        <p>A magical playground where kids & grownups can play, laugh & make unforgettable memories together! 🌈🎉</p>

        <div className="event-details">
          <div className="detail-item">
            <span className="detail-label">📅 Date:</span>
            <span>March 26, 2026</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">⏰ Time:</span>
            <span>6:00 PM - 10:00 PM</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">📍 Location:</span>
            <span>
              Euphoria World
              <br />
              30, R.V. Nagar, Thiruvalluvar Nagar, VOC Nagar, Annanagar East, Chennai, Tamil Nadu 600102
            </span>
          </div>
          <a 
            href="https://share.google/iIUcV8oX8wGsa5RdM" 
            target="_blank" 
            rel="noopener noreferrer"
            className="map-link"
          >
            🗺️ View on Google Maps
          </a>
        </div>

        <p className="count">💖 RSVP </p>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              onChange={handleChange}
            />

            <select name="attending" required onChange={handleChange}>
              <option value="">Will you attend?</option>
              <option value="Yes">Yes, with sparkle ✨</option>
              <option value="No">Sorry, can't make it 💔</option>
            </select>

            <button type="submit">Send RSVP 🦄</button>
          </form>
        ) : (
          <div className="thank-you">
            🎉 Thank you for your magical response!
          </div>
        )}

        <div className="video-section">
          <h3 className="video-title">🎬 A Magical Preview of the Fun! 🎬</h3>
          <div className="video-container">
            <video 
              className="party-video" 
              controls 
              poster="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=400&fit=crop"
            >
              <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="video-caption">✨ Get ready for an unforgettable magical adventure! ✨</p>
        </div>
      </div>
    </div>
  );
}

export default App;