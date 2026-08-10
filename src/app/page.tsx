"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bookmark,
  Check,
  Copy,
  Menu,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { materialOfficeAsset } from "../../library/sections/material-office/metadata";
import { selectedWorksAsset } from "../../library/sections/selected-works/metadata";

type AssetKind = "Visual" | "Prompt" | "Section";
type AssetFilter = "All" | "Visuals" | "Prompts" | "Sections";

type Asset = {
  id: number;
  title: string;
  description?: string;
  kind: AssetKind;
  category: string;
  stack: string;
  access: "Free" | "Premium";
  accent: string;
  thumbnail: string;
  placeholder?: boolean;
  previewImage?: string;
  previewUrl?: string;
  previewVideo?: string;
  promptUrl?: string;
};

// Placeholder entries keep the catalog visible while the first real releases are being built.
const ASSETS: Asset[] = [
  {
    id: 0,
    title: materialOfficeAsset.title,
    description: "A video-ready studio hero with an editorial menu overlay.",
    kind: "Section",
    category: materialOfficeAsset.category,
    stack: "Next.js",
    access: materialOfficeAsset.access,
    accent: "moss",
    thumbnail: "material-office",
    previewImage: materialOfficeAsset.preview,
    previewVideo: materialOfficeAsset.previewVideo,
    previewUrl: materialOfficeAsset.route,
    promptUrl: "/library/sections/material-office/master-prompt.md",
  },
  {
    id: 7,
    title: selectedWorksAsset.title,
    description: "An editorial selected-work section with four nested project detail pages.",
    kind: "Section",
    category: selectedWorksAsset.category,
    stack: "Next.js",
    access: selectedWorksAsset.access,
    accent: "moss",
    thumbnail: "selected-works",
    previewImage: selectedWorksAsset.preview,
    previewUrl: selectedWorksAsset.route,
  },
  {
    id: 1,
    title: "SaaS launch system",
    description: "A focused launch page system for product-led teams.",
    kind: "Section",
    category: "SaaS",
    stack: "Next.js",
    access: "Free",
    accent: "lime",
    thumbnail: "placeholder",
    placeholder: true,
  },
  {
    id: 2,
    title: "Editorial portfolio",
    description: "A quiet, image-first portfolio direction for independent makers.",
    kind: "Section",
    category: "Portfolio",
    stack: "React",
    access: "Premium",
    accent: "violet",
    thumbnail: "placeholder",
    placeholder: true,
  },
  {
    id: 3,
    title: "Commerce rhythm",
    description: "A considered storefront foundation with room for product stories.",
    kind: "Section",
    category: "Ecommerce",
    stack: "Next.js",
    access: "Premium",
    accent: "orange",
    thumbnail: "placeholder",
    placeholder: true,
  },
  {
    id: 4,
    title: "Studio signal",
    description: "A confident agency starting point with a sharper editorial edge.",
    kind: "Section",
    category: "Agency",
    stack: "Astro",
    access: "Premium",
    accent: "blue",
    thumbnail: "placeholder",
    placeholder: true,
  },
  {
    id: 5,
    title: "Aurora field",
    description: "A visual direction for hero atmospheres, backgrounds, and overlays.",
    kind: "Visual",
    category: "Hero visual",
    stack: "WebP",
    access: "Free",
    accent: "pink",
    thumbnail: "placeholder",
    placeholder: true,
  },
  {
    id: 6,
    title: "Launch copy direction",
    description: "A prompt scaffold for finding a clearer voice before the first build.",
    kind: "Prompt",
    category: "SaaS",
    stack: "Prompt",
    access: "Free",
    accent: "lime",
    thumbnail: "placeholder",
    placeholder: true,
  },
];

const ASSET_FILTERS: AssetFilter[] = [
  "All",
  "Visuals",
  "Prompts",
  "Sections",
];
const WEBSITE_CATEGORIES = [
  "SaaS",
  "Ecommerce",
  "Portfolio",
  "Agency",
  "Dashboard",
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const HERO_REVEAL = {
  hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const SECTION_REVEAL = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const SECTION_VIEWPORT = { once: true, amount: 0.35 };
const CARD_VIEWPORT = { once: true, amount: 0.12 };
const CARD_REVEAL = {
  hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const HEADING_WORDS = ["Start", "from", "something", "worth", "building."];

export default function Home() {
  const [filter, setFilter] = useState<AssetFilter>("All");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [savedAssetIds, setSavedAssetIds] = useState<number[]>([]);
  const [copiedAssetId, setCopiedAssetId] = useState<number | null>(null);

  const visibleAssets = useMemo(() => {
    const normalizedQuery = query.toLowerCase();

    return ASSETS.filter((asset) => {
      const matchesFilter = filter === "All" || `${asset.kind}s` === filter;
      const matchesQuery = `${asset.title} ${asset.category} ${asset.stack}`
        .toLowerCase()
        .includes(normalizedQuery);

      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  function scrollToLibrary() {
    document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });
  }

  function toggleSavedAsset(assetId: number) {
    setSavedAssetIds((assetIds) =>
      assetIds.includes(assetId)
        ? assetIds.filter((id) => id !== assetId)
        : [...assetIds, assetId],
    );
  }

  async function copyPrompt(asset: Asset) {
    try {
      let prompt = `Create a ${asset.category.toLowerCase()} website inspired by ${asset.title}. Use a refined ${asset.stack} implementation with a premium, editorial visual direction.`;

      if (asset.promptUrl) {
        const response = await fetch(asset.promptUrl);
        if (!response.ok) throw new Error("Unable to load prompt");
        prompt = await response.text();
      }

      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(prompt);
      setCopiedAssetId(asset.id);
      window.setTimeout(() => setCopiedAssetId(null), 1800);
    } catch {
      setCopiedAssetId(null);
    }
  }

  return (
    <div className="framefield-site">
      <Navigation
        menuOpen={menuOpen}
        onCloseMenu={() => setMenuOpen(false)}
        onScrollToLibrary={scrollToLibrary}
        onToggleMenu={() => setMenuOpen((isOpen) => !isOpen)}
      />

      <main className="editorial-page">
        <div className="navbar-slot" aria-hidden="true">
          <SectionSeparator />
        </div>
        <Hero
          onScrollToLibrary={scrollToLibrary}
          onBrowsePrompts={() => setFilter("Prompts")}
        />
        <SectionSeparator />

        <Library
          assets={visibleAssets}
          copiedAssetId={copiedAssetId}
          filter={filter}
          query={query}
          savedAssetIds={savedAssetIds}
          onCopyPrompt={copyPrompt}
          onFilterChange={setFilter}
          onQueryChange={setQuery}
          onToggleSavedAsset={toggleSavedAsset}
        />
        <SectionSeparator />

        <Pricing onScrollToLibrary={scrollToLibrary} />
        <SectionSeparator />
        <Footer />
      </main>
    </div>
  );
}

function FrameDetails() {
  return (
    <>
      <i className="frame-corner frame-corner-tl" aria-hidden="true" />
      <i className="frame-corner frame-corner-tr" aria-hidden="true" />
      <i className="frame-corner frame-corner-bl" aria-hidden="true" />
      <i className="frame-corner frame-corner-br" aria-hidden="true" />
    </>
  );
}

function SectionSeparator() {
  return <div className="stripe-separator" aria-hidden="true" />;
}

type HeroProps = {
  onBrowsePrompts: () => void;
  onScrollToLibrary: () => void;
};

function Hero({ onBrowsePrompts, onScrollToLibrary }: HeroProps) {
  return (
    <section className="hero-shell editorial-frame" id="top">
      <FrameDetails />
      <div className="hero-noise" />
      <div className="hero-arc hero-arc-one" />
      <div className="hero-arc hero-arc-two" />

      <div className="hero-content">
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.48, ease: EASE_OUT }}
        >
          <BrandSpark />
          Curated for modern builders
        </motion.div>

        <AnimatedHeading />

        <motion.p
          initial="hidden"
          animate="visible"
          variants={HERO_REVEAL}
          transition={{ duration: 0.52, delay: 0.92, ease: EASE_OUT }}
        >
          Art-directed website builds, reusable sections, and visual prompts for your next launch.
        </motion.p>

        <div className="hero-actions">
          <motion.button
            className="primary-button"
            onClick={onScrollToLibrary}
            initial="hidden"
            animate="visible"
            variants={HERO_REVEAL}
            transition={{ duration: 0.48, delay: 1.08, ease: EASE_OUT }}
            style={{ willChange: "transform, opacity, filter" }}
          >
            <RollingText>Explore library</RollingText> <ArrowDownRight size={18} />
          </motion.button>
          <motion.button
            className="secondary-button"
            onClick={onBrowsePrompts}
            initial="hidden"
            animate="visible"
            variants={HERO_REVEAL}
            transition={{ duration: 0.48, delay: 1.2, ease: EASE_OUT }}
            style={{ willChange: "transform, opacity, filter" }}
          >
            <RollingText>Browse prompts</RollingText>
          </motion.button>
        </div>
      </div>

      <div className="hero-footer">
        <span>Scroll to explore</span>
        <ArrowDownRight size={14} />
      </div>
    </section>
  );
}

type NavigationProps = {
  menuOpen: boolean;
  onCloseMenu: () => void;
  onScrollToLibrary: () => void;
  onToggleMenu: () => void;
};

function Navigation({
  menuOpen,
  onCloseMenu,
  onScrollToLibrary,
  onToggleMenu,
}: NavigationProps) {
  return (
    <motion.nav
      className="nav"
      aria-label="Main navigation"
      initial={{ opacity: 0, y: -24, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.56, delay: 0.08, ease: EASE_OUT }}
      style={{ willChange: "transform, opacity, filter" }}
    >
      <FrameDetails />
      <BrandLink ariaLabel="Framefield home" />
      <div className="desktop-links">
        <a href="#library">Library</a>
        <a href="#pricing">Pricing</a>
      </div>
      <div className="nav-actions">
        <button className="nav-cta" onClick={onScrollToLibrary}>
          <RollingText>Explore library</RollingText> <ArrowUpRight size={15} />
        </button>
        <button
          className="icon-button mobile-menu"
          aria-label="Toggle menu"
          onClick={onToggleMenu}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            className="mobile-links"
            initial={{ opacity: 0, y: -12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
            transition={{ duration: 0.2 }}
          >
            <a href="#library" onClick={onCloseMenu}>
              Library
            </a>
            <a href="#pricing" onClick={onCloseMenu}>
              Pricing
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

type LibraryProps = {
  assets: Asset[];
  copiedAssetId: number | null;
  filter: AssetFilter;
  query: string;
  savedAssetIds: number[];
  onCopyPrompt: (asset: Asset) => void;
  onFilterChange: (filter: AssetFilter) => void;
  onQueryChange: (query: string) => void;
  onToggleSavedAsset: (assetId: number) => void;
};

function Library({
  assets,
  copiedAssetId,
  filter,
  query,
  savedAssetIds,
  onCopyPrompt,
  onFilterChange,
  onQueryChange,
  onToggleSavedAsset,
}: LibraryProps) {
  return (
    <section className="library-section editorial-frame" id="library">
      <FrameDetails />
      <div className="section-heading">
        <div>
          <motion.p
            className="section-kicker"
            initial="hidden"
            whileInView="visible"
            viewport={SECTION_VIEWPORT}
            variants={SECTION_REVEAL}
            transition={{ duration: 0.42, ease: EASE_OUT }}
          >
            The library
          </motion.p>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={SECTION_VIEWPORT}
            variants={SECTION_REVEAL}
            transition={{ duration: 0.52, delay: 0.1, ease: EASE_OUT }}
          >
            Pick a better starting point.
          </motion.h2>
        </div>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
          variants={SECTION_REVEAL}
          transition={{ duration: 0.48, delay: 0.2, ease: EASE_OUT }}
        >
          Every asset includes a clear path from inspiration to implementation.
        </motion.p>
      </div>

      <div className="library-toolbar">
        <motion.div
          className="filter-tabs"
          role="tablist"
          aria-label="Asset type"
          initial="hidden"
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
          variants={SECTION_REVEAL}
          transition={{ duration: 0.46, delay: 0.3, ease: EASE_OUT }}
        >
          {ASSET_FILTERS.map((item) => (
            <button
              key={item}
              role="tab"
              aria-selected={filter === item}
              className={filter === item ? "active" : ""}
              onClick={() => onFilterChange(item)}
            >
              {item}
            </button>
          ))}
        </motion.div>
        <motion.label
          className="search-box"
          initial="hidden"
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
          variants={SECTION_REVEAL}
          transition={{ duration: 0.46, delay: 0.4, ease: EASE_OUT }}
        >
          <Search size={17} />
          <input
            id="library-search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search the library"
          />
        </motion.label>
      </div>

      <div className="asset-grid">
        {assets.map((asset, index) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            index={index}
            isCopied={copiedAssetId === asset.id}
            isSaved={savedAssetIds.includes(asset.id)}
            onCopyPrompt={onCopyPrompt}
            onToggleSavedAsset={onToggleSavedAsset}
          />
        ))}
      </div>

      {assets.length === 0 && (
        <div className="empty-state">
          <Search size={20} />
          <p>No assets found. Try a different search.</p>
        </div>
      )}
    </section>
  );
}

type AssetCardProps = {
  asset: Asset;
  index: number;
  isCopied: boolean;
  isSaved: boolean;
  onCopyPrompt: (asset: Asset) => void;
  onToggleSavedAsset: (assetId: number) => void;
};

function AssetCard({
  asset,
  index,
  isCopied,
  isSaved,
  onCopyPrompt,
  onToggleSavedAsset,
}: AssetCardProps) {
  const thumbnailTitle = asset.placeholder
    ? "Coming soon."
    : asset.thumbnail === "noon"
      ? "Make a quiet impact."
      : asset.title.split("—")[0];
      return (
    <motion.article
      className="asset-card"
      initial="hidden"
      whileInView="visible"
      viewport={CARD_VIEWPORT}
      variants={CARD_REVEAL}
      transition={{ duration: 0.5, delay: index * 0.09, ease: EASE_OUT }}
      style={{ willChange: "transform, opacity, filter" }}
    >
      <div className={`thumbnail ${asset.thumbnail} ${asset.accent}`}>
        {asset.previewVideo ? (
          <video
            className="thumbnail-video"
            src={asset.previewVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={`${asset.title} preview`}
          />
        ) : asset.previewImage ? (
          <img
            className="thumbnail-image"
            src={asset.previewImage}
            alt={`${asset.title} preview`}
          />
        ) : (
          <>
            <div className="browser-bar">
              <i />
              <i />
              <i />
              <span />
            </div>
            <div className="thumb-content">
              <span className="thumb-word">{thumbnailTitle}</span>
              <div className="thumb-lines">
                <i />
                <i />
                <i />
              </div>
              <div className="thumb-block" />
            </div>
          </>
        )}
        <span
          className={`asset-access ${asset.placeholder ? "placeholder" : asset.access === "Free" ? "free" : ""}`}
        >
          {asset.placeholder || asset.access === "Free" ? (
            <Sparkles size={12} />
          ) : (
            <span className="lock" />
          )}
          {asset.placeholder ? "Coming soon" : asset.access}
        </span>
        <button
          className={isSaved ? "save-button saved" : "save-button"}
          aria-label={`Save ${asset.title}`}
          onClick={() => onToggleSavedAsset(asset.id)}
        >
          <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="card-copy">
        <div>
          <p>
            {asset.kind} · {asset.category}
          </p>
          <h3>{asset.title}</h3>
        </div>
        <span className="stack-tag">{asset.stack}</span>
      </div>

      <div className="card-actions">
        {asset.previewUrl ? (
          <a
            className="text-action"
            href={asset.previewUrl}
          >
            Preview <ArrowUpRight size={15} />
          </a>
        ) : (
          <button className="text-action" disabled={asset.placeholder}>
            {asset.placeholder ? "Preview soon" : "Preview"} <ArrowUpRight size={15} />
          </button>
        )}
        {asset.placeholder ? (
          <button className="copy-action" disabled>
            Source soon
          </button>
        ) : asset.kind === "Prompt" ? (
          <button className="copy-action" onClick={() => onCopyPrompt(asset)}>
            {isCopied ? (
              <>
                <Check size={14} /> Copied
              </>
            ) : (
              <>
                <Copy size={14} /> Copy Prompt
              </>
            )}
          </button>
        ) : (
          <button className="copy-action" onClick={() => onCopyPrompt(asset)}>
            {isCopied ? (
              <>
                <Check size={14} /> Copied
              </>
            ) : (
              <>
                <Copy size={14} /> Copy Prompt
              </>
            )}
          </button>
        )}
      </div>
    </motion.article>
  );
}

function Pricing({ onScrollToLibrary }: { onScrollToLibrary: () => void }) {
  return (
    <section className="pricing-section editorial-frame" id="pricing">
      <FrameDetails />
      <div className="pricing-heading">
        <p className="section-kicker">Pricing</p>
        <h2>Start free. Upgrade when you need more.</h2>
        <p>Browse the library now. Premium access will unlock the complete source and prompt collection.</p>
      </div>

      <div className="pricing-grid">
        <article className="pricing-card">
          <span className="pricing-label">Free</span>
          <strong>$0</strong>
          <p>For exploring curated sections and visual releases.</p>
          <ul>
            <li><Check size={15} /> Free section previews</li>
            <li><Check size={15} /> Selected source releases</li>
            <li><Check size={15} /> Community updates</li>
          </ul>
              <button className="secondary-button" onClick={onScrollToLibrary}>
                <RollingText>Explore free</RollingText>
              </button>
        </article>

        <article className="pricing-card pricing-card-featured">
          <span className="pricing-label">Unlimited</span>
          <strong>Coming soon</strong>
          <p>For builders who want every build, prompt, and visual drop.</p>
          <ul>
            <li><Check size={15} /> Complete build library</li>
            <li><Check size={15} /> Copy-ready prompts</li>
            <li><Check size={15} /> Production source code</li>
          </ul>
              <button className="primary-button" onClick={onScrollToLibrary}>
                <RollingText>Browse the library</RollingText>
              </button>
        </article>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer editorial-frame" id="footer">
      <FrameDetails />
      <span className="footer-wordmark" aria-hidden="true">
        Framefield
      </span>

      <div className="footer-main">
        <div className="footer-mark">
          <img src="/framefield-mark.png" alt="" />
        </div>
        <h2>
          Get connected
          <br />
          with Framefield.
        </h2>
        <p>New builds, sections, and visual drops—sent occasionally.</p>
        <div className="social-links" aria-label="Social links">
          <a href="https://x.com" target="_blank" rel="noreferrer">
            X / Twitter <ArrowUpRight size={14} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram <ArrowUpRight size={14} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn <ArrowUpRight size={14} />
          </a>
          <a href="mailto:hello@example.com">
            Contact <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <nav aria-label="Footer navigation">
          <a href="#library">Library</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <span>© 2026 Framefield. All rights reserved.</span>
        <a className="back-to-top" href="#top">
          Back to top <ArrowUpRight size={13} />
        </a>
      </div>
    </footer>
  );
}

function BrandLink({ ariaLabel }: { ariaLabel?: string }) {
  return (
    <a className="brand" href="#top" aria-label={ariaLabel}>
      <img className="brand-logo" src="/framefield-mark.png" alt="" />
      <span>Framefield</span>
    </a>
  );
}

function BrandSpark() {
  return (
    <svg className="brand-spark" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 1.25 9.24 5.8 13.8 7.04 9.24 8.28 8 12.84 6.76 8.28 2.2 7.04 6.76 5.8 8 1.25Z" />
      <path d="m12.7 10.5.48 1.76 1.77.48-1.77.48-.48 1.77-.48-1.77-1.77-.48 1.77-.48.48-1.76Z" />
    </svg>
  );
}

function RollingText({ children }: { children: string }) {
  return (
    <>
      <span className="sr-only">{children}</span>
      <span className="rolling-text" aria-hidden="true">
        {Array.from(children).map((character, index) => {
          if (character === " ") {
            return <span className="rolling-space" key={`space-${index}`} />;
          }

          return (
            <span
              className="rolling-glyph"
              key={`${character}-${index}`}
              style={{ "--roll-delay": `${index * 18}ms` } as CSSProperties}
            >
              <span className="rolling-glyph-track">
                <span className="rolling-glyph-current">{character}</span>
                <span className="rolling-glyph-next">{character}</span>
              </span>
            </span>
          );
        })}
      </span>
    </>
  );
}

function AnimatedHeading() {
  return (
    <h1 className="hero-heading" aria-label="Start from something worth building.">
      <span className="heading-line">
        {HEADING_WORDS.slice(0, 2).map((word, index) => (
          <AnimatedWord key={word} delay={0.18 + index * 0.12}>
            {word}
          </AnimatedWord>
        ))}
      </span>
      <span className="heading-line headline-last-line">
        <AnimatedWord delay={0.42}>{HEADING_WORDS[2]}</AnimatedWord>
        <AnimatedWord delay={0.54}>{HEADING_WORDS[3]}</AnimatedWord>
        <AnimatedWord delay={0.66} className="hero-heading-emphasis">
          {HEADING_WORDS[4]}
        </AnimatedWord>
        <AnimatedWord delay={0.78}>
          <TypeTicker />
        </AnimatedWord>
      </span>
    </h1>
  );
}

function AnimatedWord({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
}) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.56, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.span>
  );
}

function TypeTicker() {
  const [activeIndex, setActiveIndex] = useState(0);

  // A fixed-width shell keeps the headline stable while letter-level motion changes the category.
  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % WEBSITE_CATEGORIES.length);
    }, 2800);

    return () => window.clearInterval(interval);
  }, []);

  const category = WEBSITE_CATEGORIES[activeIndex];

  return (
    <span className="type-ticker" aria-label={`Website category: ${category}`}>
      <span className="type-ticker-glow" />
      <span className="type-ticker-window">
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={category}
            className="type-ticker-word"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: {},
              visible: {
                transition: { delayChildren: 0.12, staggerChildren: 0.065 },
              },
              exit: {
                transition: { staggerChildren: 0.035, staggerDirection: -1 },
              },
            }}
          >
            {category.split("").map((character, index) => (
              <motion.span
                key={`${category}-${index}`}
                className="type-ticker-letter"
                variants={{
                  hidden: { y: "115%", opacity: 0, filter: "blur(4px)" },
                  visible: {
                    y: "0%",
                    opacity: 1,
                    filter: "blur(0px)",
                    transition: { type: "spring", duration: 0.38, bounce: 0 },
                  },
                  exit: {
                    y: "-115%",
                    opacity: 0,
                    filter: "blur(4px)",
                    transition: { duration: 0.18, ease: "easeIn" },
                  },
                }}
              >
                {character}
              </motion.span>
            ))}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
