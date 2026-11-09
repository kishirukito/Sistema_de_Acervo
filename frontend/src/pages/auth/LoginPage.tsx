import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../../features/auth/components/LoginForm';
import '../../features/auth/login.css';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="login-layout">
      {/* Left Visual Banner Section - Replicating Figma Design */}
      <section className="login-banner" aria-label="Presentación Sistema de Acervo">
        <div className="login-banner-content">
          {/* SVG Illustration of Books & Open Book matching Figma frame */}
          <div className="login-illustration" aria-hidden="true">
            <svg
              width="280"
              height="180"
              viewBox="0 0 280 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Sparkles / Star dots */}
              <circle cx="45" cy="40" r="2" fill="white" fillOpacity="0.6" />
              <circle cx="120" cy="25" r="1.5" fill="white" fillOpacity="0.5" />
              <circle cx="235" cy="45" r="2" fill="white" fillOpacity="0.6" />
              <circle cx="210" cy="15" r="1.5" fill="white" fillOpacity="0.4" />

              {/* Base Platform / Shelf */}
              <rect
                x="40"
                y="140"
                width="200"
                height="8"
                rx="4"
                fill="white"
                fillOpacity="0.35"
              />

              {/* Book 1 (Tall Dark Blue Book) */}
              <rect
                x="50"
                y="55"
                width="24"
                height="85"
                rx="3"
                fill="#162D4A"
                fillOpacity="0.8"
              />
              <line x1="56" y1="72" x2="68" y2="72" stroke="white" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
              <line x1="56" y1="80" x2="68" y2="80" stroke="white" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />

              {/* Book 2 (Medium Blue-Grey Book) */}
              <rect
                x="77"
                y="68"
                width="22"
                height="72"
                rx="3"
                fill="#2C4E75"
                fillOpacity="0.85"
              />
              <line x1="82" y1="88" x2="94" y2="88" stroke="white" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />

              {/* Book 3 (Short Light Blue Book) */}
              <rect
                x="102"
                y="85"
                width="20"
                height="55"
                rx="3"
                fill="#3B679B"
                fillOpacity="0.9"
              />
              <line x1="106" y1="102" x2="118" y2="102" stroke="white" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
              <line x1="106" y1="110" x2="118" y2="110" stroke="white" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />

              {/* Open Book Outer Frame */}
              <rect
                x="132"
                y="48"
                width="100"
                height="92"
                rx="8"
                fill="white"
                fillOpacity="0.25"
              />
              
              {/* Open Book Spine shadow */}
              <line x1="182" y1="52" x2="182" y2="136" stroke="white" strokeOpacity="0.4" strokeWidth="2" />

              {/* Left Page text lines */}
              <line x1="142" y1="62" x2="172" y2="62" stroke="white" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" />
              <line x1="142" y1="72" x2="172" y2="72" stroke="white" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
              <line x1="142" y1="82" x2="172" y2="82" stroke="white" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
              <line x1="142" y1="92" x2="165" y2="92" stroke="white" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
              <line x1="142" y1="102" x2="172" y2="102" stroke="white" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
              <line x1="142" y1="112" x2="160" y2="112" stroke="white" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />

              {/* Right Page text lines */}
              <line x1="192" y1="62" x2="222" y2="62" stroke="white" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" />
              <line x1="192" y1="72" x2="222" y2="72" stroke="white" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
              <line x1="192" y1="82" x2="222" y2="82" stroke="white" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
              <line x1="192" y1="92" x2="215" y2="92" stroke="white" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
              <line x1="192" y1="102" x2="222" y2="102" stroke="white" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
              <line x1="192" y1="112" x2="210" y2="112" stroke="white" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          <h2 className="login-banner-title">Sistema de Acervo</h2>
          <p className="login-banner-description">
            Gestiona libros, usuarios, préstamos y reportes desde un solo lugar.
          </p>

          {/* Carousel Pagination Dots */}
          <div className="login-dots" aria-label="Indicadores de diapositiva">
            <span className="login-dot" />
            <span className="login-dot login-dot--active" />
            <span className="login-dot" />
          </div>
        </div>
      </section>

      {/* Right Form Section */}
      <main className="login-form-section">
        <LoginForm onSuccessRedirect={(targetUrl) => navigate(targetUrl)} />
      </main>
    </div>
  );
};
