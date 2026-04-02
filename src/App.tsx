import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import contentData from './content.json';
import LiveStats from './LiveStats';
import FreedomCalculator from './FreedomCalculator';
import WhitepaperViewer from './WhitepaperViewer';
import Modal from './Modal';
import FragmentedShape from './FragmentedShape';
import GlobeComponent from './components/GlobeComponent';
import CountryInfo from './components/CountryInfo';
import { getBitcoinNodeDistribution, getBitcoinPrice } from './services/bitcoinService';
import type { NodeDistribution } from './services/bitcoinService';

// --- Interfaces ---
interface ContentItem {
  year?: string;
  title: string;
  content: string;
  icon?: string;
  detailedContent?: string;
}

interface GlossaryItem {
  term: string;
  definition: string;
  detailedContent?: string;
}

interface Section {
  id: string;
  title: string;
  description?: string;
  items: ContentItem[];
}

interface Content {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  sections: Section[];
  glossary: GlossaryItem[];
}

const content = contentData as Content;

// --- Main App Component ---
const App: React.FC = () => {
  const [modalContent, setModalContent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const countryInfoRef = useRef<HTMLDivElement>(null);
  
  // Globe state
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);
  const [nodesData, setNodesData] = useState<NodeDistribution[]>([]);
  const [btcPrice, setBtcPrice] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const nodes = await getBitcoinNodeDistribution();
      const price = await getBitcoinPrice();
      setNodesData(nodes);
      setBtcPrice(price);
    };
    loadData();
    const interval = setInterval(loadData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCountrySelect = (country: any) => {
    if (country) {
      setSelectedCountryCode(country.properties.finalCode);
    } else {
      setSelectedCountryCode(null);
    }
  };

  const selectedCountryNodes = nodesData.find(n => n.country === selectedCountryCode);

  const openModal = (item: any) => {
    setModalContent(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className="app-container">
      <header>
        <a href="#home" className="logo-link">
          <div className="logo">₿ BitcoinFreedom</div>
        </a>
        <nav>
          <ul>
            <li><a href="#evolucion">Evolución</a></li>
            <li><a href="#historia">Historia</a></li>
            <li><a href="#naturaleza">Naturaleza</a></li>
            <li><a href="#tecnologia">Tecnología</a></li>
            <li><a href="#red-global">Red Global</a></li>
            <li><a href="#calculadora">Calculadora</a></li>
            <li><a href="#whitepaper">Whitepaper</a></li>
            <li><a href="#glosario">Glosario</a></li>
          </ul>
        </nav>
      </header>

      <main>
        {/* --- Sections --- */}
        <section id="home" className="hero">
          <h1>{content.hero.title}</h1>
          <p>{content.hero.subtitle}</p>
          <a href="#evolucion" className="cta-button">{content.hero.cta}</a>
          <LiveStats />
        </section>

        {/* --- Evolution Prototype --- */}
        <section id="evolucion">
          <div className="section-header">
            <h2>Evolución de la Forma</h2>
            <p className="section-desc">Bitcoin no es solo código; es una idea que transmuta para servir a la humanidad.</p>
          </div>
          <FragmentedShape />
        </section>

        {content.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <div className="section-header">
              <h2>{section.title}</h2>
              {section.description && <p className="section-desc">{section.description}</p>}
            </div>
            
            <div className={section.id === 'historia' ? 'timeline' : 'grid'}>
              {section.items.map((item, idx) => (
                <div 
                  key={idx} 
                  className={section.id === 'historia' ? 'timeline-item' : 'card clickable'}
                  onClick={() => item.detailedContent && openModal({title: item.title, content: item.content, detailedContent: item.detailedContent})}
                >
                  {item.year && <span className="year">{item.year}</span>}
                  <div className="item-body">
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section id="red-global">
          <div className="section-header">
            <h2>Red Global de Nodos</h2>
            <p className="section-desc">Bitcoin es la primera red financiera global, descentralizada y sin fronteras. Explora la distribución de nodos en tiempo real.</p>
            {btcPrice && (
              <div className="btc-price-badge-small">
                Precio BTC: <span>${btcPrice.toLocaleString()} USD</span>
              </div>
            )}
          </div>
          <div className="globe-section-container">
            <GlobeComponent 
              onCountrySelect={handleCountrySelect} 
              selectedCountryCode={selectedCountryCode}
              nodesData={nodesData}
            />
            <CountryInfo 
              ref={countryInfoRef} 
              countryCode={selectedCountryCode} 
              nodesCount={selectedCountryNodes?.count || 0}
              onClose={() => setSelectedCountryCode(null)} 
            />
          </div>
        </section>

        <section id="calculadora">
          <div className="section-header">
            <h2>Calculadora de Libertad</h2>
            <p className="section-desc">Visualiza el impacto de la inflación frente a la escasez digital de Bitcoin en tu poder adquisitivo.</p>
          </div>
          <FreedomCalculator />
        </section>

        <section id="whitepaper">
          <div className="section-header">
            <h2>El Documento Fundacional</h2>
            <p className="section-desc">Explora el Whitepaper original de Satoshi Nakamoto con una traducción interactiva.</p>
          </div>
          <WhitepaperViewer />
        </section>

        <section id="glosario">
          <div className="section-header">
            <h2>Biblioteca de Conocimiento</h2>
          </div>
          <div className="grid">
            {content.glossary.map((item, idx) => (
              <div 
                key={idx} 
                className="card clickable"
                onClick={() => item.detailedContent && openModal({title: item.term, content: item.definition, detailedContent: item.detailedContent})}
              >
                <h3>{item.term}</h3>
                <p>{item.definition}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 Bitcoin: El Manifiesto de la Libertad. Construido para la soberanía individual.</p>
      </footer>

      {isModalOpen && modalContent && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={closeModal}
          title={modalContent.title}
          content={modalContent.content}
          detailedContent={modalContent.detailedContent}
        />
      )}
    </div>
  );
};

export default App;
