import React, { useState, useEffect } from "react";
import "./App.css";
import emailjs from "emailjs-com";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attendees: "",
    attending: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const bannerImages = [
    "MITHRA2.PNG",
    "MITHRA1.PNG",
    "MITHRA3.PNG",
    "MITHRA4.PNG",
    "MITHRA5.PNG"
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError("");
    setShowConfirmModal(true);
  };

  const confirmSubmit = async () => {
    try {
      setIsSending(true);
      setSubmitError("");

      await emailjs.send(
        "service_47xh3bn",
        "template_uiskc8f",
        {
          to_name: formData.name,
          to_email: formData.email,
          attendees: formData.attendees,
          attending: formData.attending
        },
        "Ip-rA3SasTbJSBoAe"
      );

      setSubmitted(true);
      setShowConfirmModal(false);
      setFormData({
        name: "",
        email: "",
        attendees: "",
        attending: ""
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitError("❌ Sorry, something went wrong while sending your RSVP. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const cancelSubmit = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="background">
      <audio autoPlay loop>
        <source src="unicorn-music.mp3" type="audio/mp3" />
      </audio>

      <div className="invite-card">
        <div className="banner-container">
          <div
            className="banner-slider"
            style={{ transform: `translateX(-${currentBannerIndex * 100}%)` }}
          >
            {bannerImages.map((image, index) => (
              <div key={index} className="banner-slide">
                <img
                  src={image}
                  alt={`Magical Banner ${index + 1}`}
                  className="banner-image"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=400&fit=crop";
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
                className={`banner-indicator ${index === currentBannerIndex ? "active" : ""}`}
                onClick={() => setCurrentBannerIndex(index)}
              ></span>
            ))}
          </div>
        </div>

        <h1>🦄 Mithra's Magical Unicorn Birthday Party ✨</h1>

        <p>
          We’re excited to celebrate our daughter Mithra’s 5th birthday! 🦄✨
          Please join us for a magical unicorn-themed party filled with fun,
          playtime, and sweet treats as we celebrate this special day together.
        </p>

        <img src="FAMILY.png" alt="Mithra Family" className="magic-image" />

        <div className="event-details">
          <div className="detail-item">
            <span className="detail-label">📅 Date:</span>
            <span>March 26, 2026</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">⏰ Magical Schedule:</span>
            <div className="timeline">
              <div className="timeline-item">
                <span className="timeline-time">✨ Magical Playtime:</span>
                <span>6:00 PM - 7:30 PM</span>
              </div>
              <div className="timeline-item">
                <span className="timeline-time">🦄 Cake Magic & Feast:</span>
                <span>7:30 PM</span>
              </div>
            </div>
          </div>

          <div className="detail-item">
            <span className="detail-label">📍 Location:</span>
            <span>
              Euphoria World
              <br />
              30, R.V. Nagar, Thiruvalluvar Nagar, VOC Nagar, Annanagar East,
              Chennai, Tamil Nadu 600102
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

        <p className="count">💖 RSVP</p>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="number"
              name="attendees"
              placeholder="How many magical guests?"
              min="1"
              max="10"
              required
              value={formData.attendees}
              onChange={handleChange}
            />

            <select
              name="attending"
              required
              value={formData.attending}
              onChange={handleChange}
            >
              <option value="">Will you join the magic? ✨</option>
              <option value="Yes">Yes, with sparkle ✨</option>
              <option value="No">Sorry, can't make it 💔</option>
            </select>

            <button type="submit">Send RSVP 🦄</button>
          </form>
        ) : (
          <div className="thank-you-message">
            <h3>🦄 Thank You for Your RSVP! ✨</h3>
            <p>
              Your response has been received with love, and we’re so happy you
              took the time to reply.
            </p>
            <p>
              We can’t wait to celebrate Mithra’s magical 5th birthday with joy,
              laughter, sparkle, and beautiful memories together! 🌈🎉
            </p>
          </div>
        )}

        {submitError && <div className="error-message">{submitError}</div>}

        {showConfirmModal && (
          <div className="modal-backdrop">
            <div className="confirm-modal">
              <h3>🦄 Confirm Your RSVP</h3>
              <p className="confirm-text">
                Please review your magical RSVP details before sending.
              </p>

              <div className="confirm-details">
                <div>
                  <strong>Name:</strong> {formData.name}
                </div>
                <div>
                  <strong>Email:</strong> {formData.email}
                </div>
                <div>
                  <strong>Guests:</strong> {formData.attendees}
                </div>
                <div>
                  <strong>Attending:</strong> {formData.attending}
                </div>
              </div>

              <div className="confirm-buttons">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={cancelSubmit}
                  disabled={isSending}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="confirm-btn"
                  onClick={confirmSubmit}
                  disabled={isSending}
                >
                  {isSending ? "Sending..." : "Confirm RSVP ✨"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="video-section">
          <h3 className="video-title">
            🎬 🦄 From Tiny Star to Magical Five – Mithra’s Journey 🎬
          </h3>
          <div className="video-container">
            <video
              className="party-video"
              controls
              poster="UNICORN.PNG"
            >
              <source src="MITHUVIDEO.mp4" type="video/mp4" />
              <source src="MITHUVIDEO.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="video-caption">
            ✨ Get ready for an unforgettable magical adventure! ✨
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;