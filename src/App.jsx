import { useState, useEffect, useRef } from "react";

const MENU = {
  Entrées: [
    { name: "Choriço Flambé", price: "15,00 €", desc: "" },
    { name: "Melon et Jambon du Pays", price: "8,00 €", desc: "" },
    { name: "Demi Choriço Grillé", price: "8,50 €", desc: "" },
    { name: "Tabua Do Régalade", price: "21,00 €", desc: "Mini beignets, salade de poulpe, charcuterie, fromage" },
    { name: "Assortiment de Beignets", price: "8,00 €", desc: "" },
    { name: "Salade de Poulpe", price: "9,00 €", desc: "" },
    { name: "Cocktail Sauce aux Crevettes", price: "10,00 €", desc: "" },
    { name: "Grande Tabua Charcuterie", price: "18,00 €", desc: "" },
    { name: "Assiette de Charcuterie", price: "7,50 €", desc: "" },
    { name: "Tabua Spécial La Régalade", price: "25,00 €", desc: "Chorizo, mini beignets, fromage, salade poulpe, charcuterie" },
    { name: "Salade de Chèvre Chaude", price: "8,00 €", desc: "" },
    { name: "Gambas du Chef", price: "13,00 €", desc: "" },
    { name: "Calamar Sauce Cocktail", price: "7,50 €", desc: "" },
  ],
  Viandes: [
    { name: "Demi Poulet Grillé", price: "13,00 €", desc: "Frites, riz, salade" },
    { name: "Travers de Porc", price: "17,00 €", desc: "Frites, riz, salade" },
    { name: "Bife À Portuguesa", price: "18,50 €", desc: "Frites, riz, faux filet, jambon blanc et œuf au plat" },
    { name: "Rumsteck", price: "17,50 €", desc: "Pommes sautées, salade, sauce poivre" },
    { name: "Brochette de Bœuf", price: "23,00 €", desc: "Pommes sautées, salade, sauce poivre" },
    { name: "Brochette Terre et Mer", price: "25,00 €", desc: "Pommes sautées, salade, crevette, rumsteck, sauce poivre" },
    { name: "Carne Alentejana", price: "18,00 €", desc: "Viande de porc, pommes de terre, coquillages" },
    { name: "Carne Alentejana & Gambas", price: "19,00 €", desc: "Viande de porc, pommes de terre, gambas" },
    { name: "Francesinha", price: "17,00 €", desc: "Faux filet, saucisse, chorizo, fromage, jambon blanc, sauce francesinha" },
    { name: "Naco ou Picanha Na Pedra", price: "21,00 €", desc: "Frites, riz" },
    { name: "Bancon Cheeseburguer du Régalade", price: "15,00 €", desc: "Frites" },
    { name: "Posta À Mirandesa", price: "22,00 €", desc: "Entrecôte, pommes sautées, haricot vert" },
    { name: "Côte de Bœuf 500g", price: "27,00 €", desc: "Frites, salade, sauce poivre" },
    { name: "Tartare de Bœuf", price: "15,00 €", desc: "Frites" },
    { name: "Faux Filet Grillé", price: "17,50 €", desc: "Pommes sautées, salade, faux filet, sauce poivre" },
  ],
  Poissons: [
    { name: "Morue A Brás", price: "16,00 €", desc: "Œufs, morue effilée, pommes pailles, persillade, olives noires" },
    { name: "Morue Zé Do Pipo", price: "21,00 €", desc: "Pavé de morue, oignons, huile d'olive, pomme rondelle, olives noires" },
    { name: "Morue Braga", price: "21,00 €", desc: "Pavé de morue, pommes rondelle, sauce oignons, poivrons rouge et verts, sauce tomate" },
    { name: "Morue Grillée", price: "22,00 €", desc: "Pavé morue, batata à murro, sauce huile d'olive, poivrons, ail" },
  ],
  Salades: [
    { name: "Salade Océane", price: "14,00 €", desc: "Salade, tomate, avocats, crevettes, pamplemousse, sauce cocktail" },
    { name: "Salade au Croustillant de Chèvre Chaud", price: "13,00 €", desc: "Salade, tomate, noix, miel, fromage chèvre" },
    { name: "Salade Parisienne", price: "13,00 €", desc: "Salade, tomate, fromage, jambon blanc, œuf dur" },
    { name: "Salade Tuna", price: "13,00 €", desc: "Salade, tomate, riz, thon, œuf dur, olives noires" },
  ],
  Cocktails: [
    { name: "Caipirinha", price: "9,00 €", desc: "" },
    { name: "Mojito", price: "9,00 €", desc: "" },
    { name: "Caipirão", price: "9,00 €", desc: "" },
    { name: "Caipiblack", price: "9,00 €", desc: "" },
    { name: "Tequila Sunrise", price: "9,00 €", desc: "" },
    { name: "Sex On The Beach", price: "9,00 €", desc: "" },
    { name: "Ti-Punch", price: "9,00 €", desc: "" },
    { name: "Pina Colada", price: "9,00 €", desc: "" },
    { name: "Blue Lagoon", price: "9,00 €", desc: "" },
    { name: "Gin Tonic", price: "9,00 €", desc: "" },
    { name: "Cocktail du Chef", price: "12,00 €", desc: "" },
  ],
};

const CATEGORY_ICONS = {
  Entrées: "🐙",
  Viandes: "🥩",
  Poissons: "🐟",
  Salades: "🥗",
  Cocktails: "🍹",
};

export default function LaRegalade() {
  const [activeTab, setActiveTab] = useState("Entrées");
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToMenu = () => menuRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: "#0d0b08", color: "#f2ede4", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Outfit:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d0b08; }
        ::-webkit-scrollbar-thumb { background: #8b6914; border-radius: 2px; }

        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 20px 48px;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.4s ease;
        }
        .nav.scrolled {
          background: rgba(13,11,8,0.95);
          backdrop-filter: blur(12px);
          padding: 14px 48px;
          border-bottom: 1px solid rgba(139,105,20,0.2);
        }
        .nav-logo { font-size: 22px; font-weight: 300; letter-spacing: 0.08em; color: #e8c96d; }
        .nav-logo span { font-style: italic; }
        .nav-links { display: flex; gap: 36px; align-items: center; }
        .nav-link {
          font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 400;
          letter-spacing: 0.15em; text-transform: uppercase; color: rgba(242,237,228,0.7);
          cursor: pointer; transition: color 0.2s; text-decoration: none;
          background: none; border: none;
        }
        .nav-link:hover { color: #e8c96d; }
        .nav-reserve {
          font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 500;
          letter-spacing: 0.15em; text-transform: uppercase;
          background: #8b6914; color: #0d0b08; border: none;
          padding: 10px 22px; border-radius: 2px; cursor: pointer;
          transition: all 0.2s;
        }
        .nav-reserve:hover { background: #e8c96d; transform: translateY(-1px); }

        .hero {
          min-height: 100vh; position: relative;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 30% 50%, rgba(139,105,20,0.12) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 20%, rgba(180,60,20,0.08) 0%, transparent 50%),
                      linear-gradient(180deg, #0d0b08 0%, #130f08 50%, #0d0b08 100%);
        }
        .hero-pattern {
          position: absolute; inset: 0; opacity: 0.04;
          background-image: repeating-linear-gradient(
            45deg, #e8c96d 0, #e8c96d 1px, transparent 0, transparent 50%
          );
          background-size: 30px 30px;
        }
        .hero-content {
          position: relative; z-index: 1; text-align: center; padding: 0 24px;
          opacity: 0; transform: translateY(30px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-content.visible { opacity: 1; transform: translateY(0); }
        .hero-flag {
          font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 400;
          letter-spacing: 0.3em; text-transform: uppercase; color: #8b6914;
          margin-bottom: 24px; display: flex; align-items: center; justify-content: center; gap: 16px;
        }
        .hero-flag::before, .hero-flag::after {
          content: ''; display: block; width: 40px; height: 1px; background: #8b6914;
        }
        .hero-title {
          font-size: clamp(52px, 10vw, 96px); font-weight: 300; line-height: 1;
          color: #f2ede4; margin-bottom: 8px; letter-spacing: -0.01em;
        }
        .hero-title em { font-style: italic; color: #e8c96d; }
        .hero-subtitle {
          font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 300;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: rgba(242,237,228,0.5); margin-bottom: 48px;
        }
        .hero-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .btn-primary {
          font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase;
          background: #8b6914; color: #0d0b08; border: none;
          padding: 16px 36px; border-radius: 2px; cursor: pointer;
          transition: all 0.3s; box-shadow: 0 4px 24px rgba(139,105,20,0.3);
        }
        .btn-primary:hover { background: #e8c96d; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(232,201,109,0.3); }
        .btn-outline {
          font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 400;
          letter-spacing: 0.2em; text-transform: uppercase;
          background: transparent; color: rgba(242,237,228,0.8);
          border: 1px solid rgba(242,237,228,0.25);
          padding: 16px 36px; border-radius: 2px; cursor: pointer;
          transition: all 0.3s;
        }
        .btn-outline:hover { border-color: #e8c96d; color: #e8c96d; }

        .info-bar {
          background: #8b6914; padding: 14px 48px;
          display: flex; align-items: center; justify-content: center; gap: 48px;
          flex-wrap: wrap;
        }
        .info-item {
          font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 400;
          letter-spacing: 0.12em; text-transform: uppercase; color: #0d0b08;
          display: flex; align-items: center; gap: 8px;
        }
        .info-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(13,11,8,0.4); }

        .section { padding: 100px 48px; }
        .section-label {
          font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 400;
          letter-spacing: 0.3em; text-transform: uppercase; color: #8b6914;
          margin-bottom: 16px;
        }
        .section-title { font-size: 48px; font-weight: 300; line-height: 1.1; margin-bottom: 24px; }
        .section-title em { font-style: italic; color: #e8c96d; }

        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; max-width: 1100px; margin: 0 auto; }
        .about-text { font-size: 18px; font-weight: 300; line-height: 1.8; color: rgba(242,237,228,0.75); }
        .about-text p { margin-bottom: 20px; }
        .about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .stat-card {
          background: rgba(139,105,20,0.08); border: 1px solid rgba(139,105,20,0.2);
          padding: 28px; border-radius: 4px;
        }
        .stat-num { font-size: 42px; font-weight: 300; color: #e8c96d; line-height: 1; margin-bottom: 8px; }
        .stat-label { font-family: 'Outfit', sans-serif; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(242,237,228,0.5); }

        .menu-section { background: #0a0907; padding: 100px 48px; }
        .menu-header { text-align: center; margin-bottom: 64px; }
        .menu-tabs {
          display: flex; gap: 0; justify-content: center; margin-bottom: 56px;
          border-bottom: 1px solid rgba(139,105,20,0.2); flex-wrap: wrap;
        }
        .menu-tab {
          font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 400;
          letter-spacing: 0.15em; text-transform: uppercase;
          background: none; border: none; color: rgba(242,237,228,0.45);
          padding: 14px 28px; cursor: pointer; transition: all 0.25s;
          border-bottom: 2px solid transparent; margin-bottom: -1px;
          display: flex; align-items: center; gap: 8px;
        }
        .menu-tab:hover { color: rgba(242,237,228,0.8); }
        .menu-tab.active { color: #e8c96d; border-bottom-color: #e8c96d; }

        .menu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; max-width: 900px; margin: 0 auto; }
        .menu-item {
          padding: 20px 0; border-bottom: 1px solid rgba(139,105,20,0.1);
          display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;
          transition: background 0.2s; padding-left: 16px; padding-right: 16px;
        }
        .menu-item:hover { background: rgba(139,105,20,0.05); }
        .item-name { font-size: 17px; font-weight: 400; color: #f2ede4; margin-bottom: 4px; }
        .item-desc { font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 300; color: rgba(242,237,228,0.45); line-height: 1.5; max-width: 280px; }
        .item-price { font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 500; color: #e8c96d; white-space: nowrap; padding-top: 2px; }

        .reserve-section {
          background: linear-gradient(135deg, #130f08 0%, #1a1408 100%);
          padding: 100px 48px; text-align: center;
          border-top: 1px solid rgba(139,105,20,0.2);
        }
        .reserve-section .section-title { font-size: 56px; }

        .contact-info {
          display: flex; gap: 48px; justify-content: center; flex-wrap: wrap;
          margin: 48px 0;
        }
        .contact-item {
          font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 300;
          color: rgba(242,237,228,0.7); display: flex; align-items: center; gap: 10px;
        }
        .contact-icon { font-size: 18px; }

        .rating-badge {
          display: inline-flex; align-items: center; gap: 10px;
          background: rgba(139,105,20,0.1); border: 1px solid rgba(139,105,20,0.3);
          padding: 10px 20px; border-radius: 40px; margin-bottom: 48px;
          font-family: 'Outfit', sans-serif; font-size: 13px; color: #e8c96d;
        }

        .footer {
          background: #070605; padding: 40px 48px;
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;
          border-top: 1px solid rgba(139,105,20,0.1);
        }
        .footer-copy { font-family: 'Outfit', sans-serif; font-size: 12px; color: rgba(242,237,228,0.3); letter-spacing: 0.05em; }

        .modal-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(7,6,5,0.9); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px; animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .modal {
          background: #130f08; border: 1px solid rgba(139,105,20,0.3);
          border-radius: 8px; padding: 48px; max-width: 480px; width: 100%;
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .modal-title { font-size: 32px; font-weight: 300; margin-bottom: 8px; }
        .modal-title em { font-style: italic; color: #e8c96d; }
        .modal-sub { font-family: 'Outfit', sans-serif; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(242,237,228,0.4); margin-bottom: 36px; }
        .modal-field { margin-bottom: 20px; }
        .modal-label { font-family: 'Outfit', sans-serif; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(242,237,228,0.5); margin-bottom: 8px; display: block; }
        .modal-input {
          width: 100%; background: rgba(139,105,20,0.06); border: 1px solid rgba(139,105,20,0.2);
          border-radius: 4px; padding: 12px 16px; color: #f2ede4;
          font-family: 'Outfit', sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s;
        }
        .modal-input:focus { border-color: rgba(139,105,20,0.5); }
        .modal-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .modal-actions { display: flex; gap: 12px; margin-top: 32px; }
        .modal-close {
          position: absolute; top: 20px; right: 20px; background: none; border: none;
          color: rgba(242,237,228,0.4); cursor: pointer; font-size: 20px; transition: color 0.2s;
        }
        .modal-close:hover { color: #f2ede4; }

        .divider {
          width: 60px; height: 1px; background: linear-gradient(90deg, transparent, #8b6914, transparent);
          margin: 24px auto;
        }

        @media (max-width: 768px) {
          .nav { padding: 16px 24px; }
          .nav.scrolled { padding: 12px 24px; }
          .nav-links { display: none; }
          .section { padding: 64px 24px; }
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
          .menu-section { padding: 64px 24px; }
          .menu-grid { grid-template-columns: 1fr; }
          .reserve-section { padding: 64px 24px; }
          .info-bar { padding: 14px 24px; gap: 20px; }
          .footer { padding: 32px 24px; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-logo">La <em>Régalade</em></div>
        <div className="nav-links">
          <button className="nav-link" onClick={scrollToMenu}>Notre Menu</button>
          <button className="nav-link" onClick={() => document.getElementById('contact').scrollIntoView({behavior:'smooth'})}>Contact</button>
          <button className="nav-reserve" onClick={() => setReservationOpen(true)}>Réserver</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-pattern" />
        <div className={`hero-content${visible ? " visible" : ""}`}>
          <div className="hero-flag">Restaurant Portugais · Courtry</div>
          <h1 className="hero-title">La<br /><em>Régalade</em></h1>
          <p className="hero-subtitle">Saveurs authentiques · Cuisine généreuse · Ambiance chaleureuse</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => setReservationOpen(true)}>Réserver une table</button>
            <button className="btn-outline" onClick={scrollToMenu}>Voir le menu</button>
          </div>
        </div>
      </section>

      {/* INFO BAR */}
      <div className="info-bar">
        <div className="info-item">📍 18 Rue de la Régale, 77181 Courtry</div>
        <div className="info-dot" />
        <div className="info-item">📞 01 60 06 27 26</div>
        <div className="info-dot" />
        <div className="info-item">🕐 Ouvert · Ferme à 23h30</div>
        <div className="info-dot" />
        <div className="info-item">⭐ 4,9/5 · Google</div>
      </div>

      {/* ABOUT */}
      <section className="section">
        <div className="about-grid">
          <div>
            <div className="section-label">Notre histoire</div>
            <h2 className="section-title">Une cuisine du<br /><em>cœur</em></h2>
            <div className="about-text">
              <p>Niché à Courtry, L'Atelier du Portugal vous invite à un voyage culinaire au cœur de la gastronomie portugaise. Chaque plat est une déclaration d'amour aux saveurs authentiques de la péninsule ibérique.</p>
              <p>De nos bacalhaus mijotés à nos viandes grillées à la perfection, nous mettons l'âme du Portugal dans chaque assiette. Venez partager un moment unique, comme à la maison.</p>
            </div>
          </div>
          <div className="about-stats">
            <div className="stat-card">
              <div className="stat-num">4,9★</div>
              <div className="stat-label">Note Google</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">100%</div>
              <div className="stat-label">Fait Maison</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">5★</div>
              <div className="stat-label">Pages Jaunes</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">+20</div>
              <div className="stat-label">Plats au Menu</div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section className="menu-section" ref={menuRef}>
        <div className="menu-header">
          <div className="section-label">À la carte</div>
          <h2 className="section-title">Notre <em>Menu</em></h2>
          <div className="divider" />
        </div>
        <div className="menu-tabs">
          {Object.keys(MENU).map(cat => (
            <button
              key={cat}
              className={`menu-tab${activeTab === cat ? " active" : ""}`}
              onClick={() => setActiveTab(cat)}
            >
              <span>{CATEGORY_ICONS[cat]}</span> {cat}
            </button>
          ))}
        </div>
        <div className="menu-grid">
          {MENU[activeTab].map((item, i) => (
            <div key={i} className="menu-item">
              <div>
                <div className="item-name">{item.name}</div>
                {item.desc && <div className="item-desc">{item.desc}</div>}
              </div>
              <div className="item-price">{item.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* RESERVE */}
      <section className="reserve-section" id="contact">
        <div className="rating-badge">
          ⭐ 4,9 / 5 sur Google · 20 avis vérifiés
        </div>
        <div className="section-label">Réservation</div>
        <h2 className="section-title">Réservez votre<br /><em>table</em></h2>
        <div className="divider" />
        <div className="contact-info">
          <div className="contact-item"><span className="contact-icon">📞</span> 01 60 06 27 26</div>
          <div className="contact-item"><span className="contact-icon">📍</span> 18 Rue de la Régale, 77181 Courtry</div>
          <div className="contact-item"><span className="contact-icon">🕐</span> Ouvert · Ferme à 23h30</div>
        </div>
        <button className="btn-primary" style={{fontSize:'13px', padding:'18px 48px'}} onClick={() => setReservationOpen(true)}>
          Réserver en ligne
        </button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="nav-logo" style={{fontSize:'16px'}}>La <em>Régalade</em></div>
        <div className="footer-copy">© 2025 La Régalade · Courtry, Seine-et-Marne</div>
      </footer>

      {/* MODAL RÉSERVATION */}
      {reservationOpen && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setReservationOpen(false)}>
          <div className="modal" style={{position:'relative'}}>
            <button className="modal-close" onClick={() => setReservationOpen(false)}>✕</button>
            <h3 className="modal-title">Réserver<br /><em>une table</em></h3>
            <p className="modal-sub">La Régalade · Courtry</p>
            <div className="modal-row">
              <div className="modal-field">
                <label className="modal-label">Prénom & Nom</label>
                <input className="modal-input" placeholder="Jean Dupont" />
              </div>
              <div className="modal-field">
                <label className="modal-label">Téléphone</label>
                <input className="modal-input" placeholder="06 00 00 00 00" />
              </div>
            </div>
            <div className="modal-row">
              <div className="modal-field">
                <label className="modal-label">Date</label>
                <input className="modal-input" type="date" />
              </div>
              <div className="modal-field">
                <label className="modal-label">Heure</label>
                <input className="modal-input" type="time" defaultValue="20:00" />
              </div>
            </div>
            <div className="modal-field">
              <label className="modal-label">Nombre de personnes</label>
              <select className="modal-input">
                {[1,2,3,4,5,6,7,8].map(n => <option key={n}>{n} personne{n>1?'s':''}</option>)}
              </select>
            </div>
            <div className="modal-field">
              <label className="modal-label">Message (optionnel)</label>
              <input className="modal-input" placeholder="Anniversaire, allergie, demande spéciale..." />
            </div>
            <div className="modal-actions">
              <button className="btn-outline" style={{flex:1,padding:'14px'}} onClick={() => setReservationOpen(false)}>Annuler</button>
              <button className="btn-primary" style={{flex:2,padding:'14px'}} onClick={() => { alert("Réservation envoyée ! Nous vous confirmons par téléphone."); setReservationOpen(false); }}>
                Confirmer la réservation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
