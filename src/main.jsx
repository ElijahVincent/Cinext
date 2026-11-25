import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import "./year-wheel.css";

const posters = [
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=85"
];

const dramas = [
  {year:2026,title:"The East Palace",genre:"Historical fantasy · Action · Mystery",tag:"SPIRITS & SWORDS",desc:"A swordsman who hunts spirits and a court lady who hears the dead investigate a curse threatening the royal family.",mood:"fantasy"},
  {year:2026,title:"My Royal Nemesis",genre:"Fantasy · Comedy · Romance",tag:"A VILLAINESS REBORN",desc:"A Joseon-era villainess finds herself navigating modern life, bringing historical cunning into a contemporary setting.",mood:"romance"},
  {year:2026,title:"The WONDERfools",genre:"Superpowers · Action · Comedy",tag:"UNEXPECTED POWERS",desc:"Ordinary people unexpectedly gain extraordinary abilities and find themselves in unusual situations.",mood:"action"},
  {year:2026,title:"If Wishes Could Kill",genre:"Supernatural · Thriller",tag:"BE CAREFUL WHAT YOU WISH FOR",desc:"A mysterious app turns wishes into deadly consequences.",mood:"dark"},
  {year:2026,title:"Shining",genre:"Fantasy · Romance",tag:"A LOVE THROUGH TIME",desc:"A time-spanning relationship with an emotional story.",mood:"romance"},
  {year:2025,title:"The Haunted Palace",genre:"Historical fantasy · Romance · Comedy",tag:"THE PALACE IS HAUNTED",desc:"A shaman, an ancient serpent spirit and a royal palace haunted by a vengeful ghost.",mood:"fantasy"},
  {year:2025,title:"Moon River",genre:"Historical fantasy · Romance · Comedy",tag:"TWO SOULS, ONE FATE",desc:"A crown prince and a mysterious woman unexpectedly swap souls.",mood:"romance"},
  {year:2025,title:"Bon Appétit, Your Majesty",genre:"Historical fantasy · Romance · Comedy",tag:"A ROYAL RECIPE",desc:"A modern chef travels back in time and ends up cooking for a tyrannical king.",mood:"royal"},
  {year:2025,title:"The First Night with the Duke",genre:"Historical fantasy · Romance · Comedy",tag:"INSIDE THE STORY",desc:"A university student wakes up inside a romance novel and becomes involved with its male lead.",mood:"romance"},
  {year:2025,title:"Head Over Heels",genre:"Supernatural · Romance · Mystery",tag:"FATE HAS OTHER PLANS",desc:"A high-school girl who secretly works as a shaman tries to save the life of the boy she loves.",mood:"fantasy"},
  {year:2025,title:"Twelve",genre:"Supernatural · Action · Fantasy",tag:"TWELVE GUARDIANS",desc:"Twelve guardian angels representing the zodiac fight evil forces threatening humanity.",mood:"action"},
  {year:2025,title:"Cashero",genre:"Superpowers · Action · Comedy",tag:"POWER HAS A PRICE",desc:"A man becomes stronger depending on how much cash he carries, making heroism expensive.",mood:"action"},
  {year:2025,title:"Genie, Make a Wish",genre:"Fantasy · Romance · Comedy",tag:"THREE WISHES",desc:"A mysterious genie returns after a thousand years and encounters a woman with an unusual personality.",mood:"fantasy"},
  {year:2025,title:"Dear Hongrang",genre:"Historical · Mystery · Romance",tag:"THE LOST HEIR",desc:"A merchant family's missing son returns after twelve years, but his identity is questioned.",mood:"royal"},
  {year:2025,title:"The Murky Stream",genre:"Historical · Action · Crime",tag:"A LAWLESS WORLD",desc:"Three people become entangled in corruption and lawlessness around the Gyeonggang River.",mood:"action"},
  {year:2025,title:"The Queen Who Crowns",genre:"Historical · Palace politics",tag:"POWER HAS A CROWN",desc:"A powerful queen navigates royal ambition, betrayal and the struggle to establish a dynasty.",mood:"royal"},
  {year:2024,title:"Love Song for Illusion",genre:"Historical fantasy · Romance",tag:"TWO SIDES OF A PRINCE",desc:"A crown prince with two personalities becomes involved with an assassin seeking revenge.",mood:"royal"},
  {year:2024,title:"Knight Flower",genre:"Historical · Action · Comedy",tag:"THE NIGHT VIGILANTE",desc:"A widow secretly becomes a masked vigilante who protects people at night.",mood:"action"},
  {year:2024,title:"Captivating the King",genre:"Historical · Romance · Politics",tag:"A GAME OF POWER",desc:"A king caught between political enemies and a woman initially seeking revenge against him.",mood:"royal"},
  {year:2024,title:"Queen Woo",genre:"Historical · Action · Politics",tag:"24 HOURS TO SURVIVE",desc:"After the king dies, the queen has only 24 hours to secure her position among the royal princes.",mood:"royal"},
  {year:2024,title:"The Judge from Hell",genre:"Supernatural · Action · Romance",tag:"HELL HAS A NEW JUDGE",desc:"A demon takes over a judge's body and punishes criminals who escape justice.",mood:"dark"},
  {year:2024,title:"Lovely Runner",genre:"Time travel · Romance · Comedy",tag:"TURN BACK TIME",desc:"A woman travels back in time to save her favourite celebrity.",mood:"romance"},
  {year:2024,title:"The Atypical Family",genre:"Superpowers · Romance · Drama",tag:"A FAMILY OF POWERS",desc:"A family loses its supernatural abilities because of modern-day problems.",mood:"fantasy"},
  {year:2024,title:"A Shop for Killers",genre:"Action · Thriller",tag:"INHERIT THE DANGER",desc:"A young woman inherits her uncle's mysterious shopping mall and discovers its real purpose.",mood:"dark"},
  {year:2024,title:"Light Shop",genre:"Supernatural · Mystery · Drama",tag:"A LIGHT IN THE DARK",desc:"Strangers with mysterious circumstances are drawn to a shop that sells lights.",mood:"dark"},
  {year:2024,title:"Marry My Husband",genre:"Time travel · Revenge · Romance",tag:"REWRITE YOUR DESTINY",desc:"A betrayed woman gets another chance at life and carefully rewrites her future.",mood:"romance"},
  {year:2024,title:"The Midnight Studio",genre:"Supernatural · Romance · Comedy",tag:"A STUDIO FOR GHOSTS",desc:"A photographer runs a studio that serves ghosts, and a lawyer becomes involved.",mood:"fantasy"},
  {year:2023,title:"Arthdal Chronicles: The Sword of Aramun",genre:"Epic fantasy · War · Politics",tag:"THE FATE OF A CONTINENT",desc:"Rival leaders, ancient civilizations, powerful warriors and mythical beings struggle for control. Watch Season 1 first.",mood:"epic"},
  {year:2023,title:"Moving",genre:"Superpowers · Action · Romance",tag:"HIDDEN ABILITIES",desc:"Young people inherit extraordinary abilities from their parents while dangerous forces hunt them.",mood:"action"},
  {year:2023,title:"Revenant",genre:"Horror · Supernatural · Mystery",tag:"SOMETHING IS WITHIN",desc:"A woman becomes possessed by an evil spirit, and a folklore professor investigates mysterious deaths.",mood:"dark"},
  {year:2023,title:"Alchemy of Souls: Light and Shadow",genre:"Fantasy · Magic · Romance · Martial arts",tag:"THE ART OF MAGIC",desc:"Magic, soul-shifting, powerful mages and political rivalries. Watch Part 1 before this continuation.",mood:"fantasy"},
  {year:2023,title:"My Dearest",genre:"Historical · War · Romance",tag:"LOVE IN A TIME OF WAR",desc:"During the Qing invasion of Joseon, two people find love amid war and political turmoil.",mood:"royal"},
  {year:2023,title:"Twinkling Watermelon",genre:"Time travel · Romance · Comedy · Music",tag:"BACK TO 1995",desc:"A music-loving student travels back to 1995 and meets his father as a teenager.",mood:"romance"},
  {year:2023,title:"The Story of Park's Marriage Contract",genre:"Time travel · Romance · Comedy",tag:"A CONTRACT ACROSS TIME",desc:"A Joseon woman is transported to modern Korea and enters a contractual marriage.",mood:"romance"},
  {year:2023,title:"Island",genre:"Demons · Supernatural · Action",tag:"THE ISLAND OF EVIL",desc:"A demon hunter, a wealthy heiress and a priest fight supernatural evil on Jeju Island.",mood:"action"},
  {year:2023,title:"My Demon",genre:"Fantasy · Romance · Comedy",tag:"A DEMON IN LOVE",desc:"A demon loses his powers after becoming entangled with a wealthy heiress.",mood:"fantasy"},
  {year:2023,title:"See You in My 19th Life",genre:"Reincarnation · Fantasy · Romance",tag:"NINETEEN LIVES",desc:"A woman remembers all her previous lives and tries to reconnect with someone from her eighteenth life.",mood:"romance"}
];

const posterOverrides = {
  "The East Palace": "https://resource02.ulifestyle.com.hk/ulcms/content/article/image/w1280/2026/07/20260708133945_9bb24f8ac765abd9f4f0d9379784e0cde597cf1d.jpg",
  "The Midnight Studio": "https://image.tmdb.org/t/p/original/9glDgJlg7rczcPAWANH8KJGcnUL.jpg",
  "Arthdal Chronicles: The Sword of Aramun": "https://entertainimg.kbsmedia.co.kr/cms/uploads/BBSIMAGE_20230808091333_2e9867f41ee9777f964b7b33dfc33d36.jpg",
  "Bon Appétit, Your Majesty": "https://0.soompi.io/wp-content/uploads/2025/07/30013134/bon-appetit.jpeg",
  "My Royal Nemesis": "https://images.plex.tv/photo?scale=2&size=large-480&url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2F1O4z2HMlg0hRPljmAf8TzgUaGls.jpg",
  "Shining": "https://rakyatcirebon.disway.id/upload/390bc7f13a95ba753b9684e1aa16d3dd.jpg",
  "The Haunted Palace": "https://0.soompi.io/wp-content/uploads/2025/03/12200737/the-haunted-palace.jpeg",
  "Moon River": "https://wimg.mk.co.kr/news/cms/202510/14/news-p.v1.20251014.29221135305d453a86f1714dc732b447_P1.jpeg",
  "The First Night with the Duke": "https://0.soompi.io/wp-content/uploads/2025/05/30091824/The-First-Night-With-the-Duke_3840x2160_V1.jpg",
  "Head Over Heels": "https://static.tvmaze.com/uploads/images/original_untouched/575/1439215.jpg",
  "Twelve": "https://dimg.donga.com/wps/SPORTS/IMAGE/2025/07/17/132017118.1.jpg",
  "Cashero": "https://pbs.twimg.com/media/G74vdl5asAEw4Vt.jpg",
  "Genie, Make a Wish": "https://m.media-amazon.com/images/M/MV5BYjU3NjgzOTAtMTYyNy00ZDNmLWE4YWQtODRkZWViNWJhYzgwXkEyXkFqcGc%40._V1_.jpg",
  "Dear Hongrang": "https://0.soompi.io/wp-content/uploads/2025/05/04130302/dear-hongrang.jpeg",
  "The Murky Stream": "https://0.soompi.io/wp-content/uploads/2025/12/06002140/murky-stream.jpg",
  "The Queen Who Crowns": "https://0.soompi.io/wp-content/uploads/2025/01/02233903/queen-who-crowns.jpg",
  "Love Song for Illusion": "https://64.media.tumblr.com/33f9fd41c92aa1b410bd496baff7d349/ebc4cce06e6fb56b-b5/s1280x1920/9558999ea2bf04f8819649ebc1305a0acd78a955.webp",
  "Knight Flower": "https://i1.wp.com/kocowablog.imgix.net/2024/02/8-3.jpg?ssl=1",
  "Captivating the King": "https://cdn.medcom.id/images/library/img/hiburan/2023/Captivating_The_King-p1.jpg",
  "Queen Woo": "https://images.justwatch.com/poster/323328103/s718/queen-woo.jpg",
  "The Judge from Hell": "https://image.news.livedoor.com/newsimage/stf/0/3/034b2_1215_06636ad3_034b2d77-sq.jpg",
  "Lovely Runner": "https://www.filmtv.it/imgbank/articoli/inline/67a9bdea558c4-168767557-0ojb6t.jpg",
  "The Atypical Family": "https://awsimages.detik.net.id/community/media/visual/2024/05/06/sinopsis-drakor-atypical-family.jpeg?w=1200",
  "A Shop for Killers": "https://koreanindo.net/wp-content/uploads/2024/03/A-Shop-For-Killers.jpg",
  "Light Shop": "https://www.mafab.hu/static/2024/336/13/663642_1733142597.6352.jpg",
  "Marry My Husband": "https://thethaovanhoa.mediacdn.vn/372676912336973824/2023/12/18/5a-17028747739341152483737.jpeg",
  "Moving": "https://cdns.klimg.com/kapanlagi.com/p/fullsize234photodfghj1713494moving.jpg",
  "Revenant": "https://m.media-amazon.com/images/M/MV5BZjI1OTVmYmYtMDRiNi00NzcxLWE5YjctOGFlMmNmYzM2OTA4XkEyXkFqcGc%40._V1_.jpg",
  "Alchemy of Souls: Light and Shadow": "https://www.onbuub.com/sites/default/files/2022-12/%D9%85%D8%B3%D9%84%D8%B3%D9%84-%D8%AE%D9%8A%D9%85%D9%8A%D8%A7%D8%A1%20%D8%A7%D9%84%D8%A3%D8%B1%D9%88%D8%A7%D8%AD-%D8%A7%D9%84%D9%85%D9%84%D8%B5%D9%82%20%D8%A7%D9%84%D8%B1%D8%B3%D9%85%D9%8A%20%D9%84%D9%84%D8%AC%D8%B2%D8%A1%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A.jpg",
  "My Dearest": "https://d263ao8qih4miy.cloudfront.net/wp-content/uploads/2023/07/largephoto1684684.jpg",
  "Twinkling Watermelon": "https://m.media-amazon.com/images/M/MV5BZDg4MTI4OGQtNzdlYy00NzE4LTlhODYtYTM4MWYyMjQ3MWExXkEyXkFqcGc%40._V1_.jpg",
  "The Story of Park's Marriage Contract": "https://s3.cosmopolitan.co.id/1703029460.webp",
  "Island": "https://a.ksd-i.com/a/2023-03-11/146380-967515.jpeg",
  "My Demon": "https://s1.afisha.ru/mediastorage/30/d8/78bed02352ba4039ad8ac814d830.jpg",
  "See You in My 19th Life": "https://cdns.klimg.com/kapanlagi.com/p/seeu19klymv5byja3mwe5njctnjdhzs00zmjmlwe.jpg",
  "If Wishes Could Kill": "https://assets.gadgets360cdn.com/pricee/assets/product/202604/If_Wishes_Could_Kill_1_1775543723.jpg",
  "The WONDERfools": "https://images.ctfassets.net/4cd45et68cgf/C2sTxgyjJ9Ryrp6AIYZ58/4b832282de14b21060c447c3ec724fd7/en_us_wdf_main_date_announcement_ka_vertical_27x40_rgb_predate_1.jpg?w=1200"
};

const initialWatched = ["No Tail to Tell","The Remarried Empress","Perfect Crown","The Ordinary Jackpot","Teach You a Lesson","Agent Kim Reactivated"];
const STORE = "dramaverse-status-v1";
const PROGRESS_STORE = "dramaverse-progress-v1";
const FAV_STORE = "dramaverse-favorites-v1";
const YEAR_OPTIONS = ["2026", "2025", "2024", "2023"];

function App() {
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORE) || "{}"); } catch { return {}; }
  });
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("2026");
  const [filter, setFilter] = useState("All");
  const [paused, setPaused] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [favorites, setFavorites] = useState(() => { try { return JSON.parse(localStorage.getItem(FAV_STORE) || "[]"); } catch { return []; } });
  const [progress, setProgress] = useState(() => { try { return JSON.parse(localStorage.getItem(PROGRESS_STORE) || "{}"); } catch { return {}; } });
  const [touchStart, setTouchStart] = useState(null);
  const [mobileOnly, setMobileOnly] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const visible = useMemo(() => dramas.filter(d => {
    const s = status[d.title] || "Want to watch";
    return (!mobileOnly || favorites.includes(d.title)) && (year === "All" || String(d.year) === year) &&
      (filter === "All" || s === filter) &&
      (d.title.toLowerCase().includes(query.toLowerCase()) || d.genre.toLowerCase().includes(query.toLowerCase()));
  }), [query, year, filter, status, mobileOnly, favorites]);

  useEffect(() => { localStorage.setItem(STORE, JSON.stringify(status)); }, [status]);
  useEffect(() => { localStorage.setItem(FAV_STORE, JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem(PROGRESS_STORE, JSON.stringify(progress)); }, [progress]);
  useEffect(() => {
    if (paused || query || year !== "All" || filter !== "All") return;
    const timer = setInterval(() => setActive(v => (v + 1) % dramas.length), 5600);
    return () => clearInterval(timer);
  }, [paused, query, year, filter]);

  const current = dramas[active];
  const watched = dramas.filter(d => status[d.title] === "Watched").length;
  const watching = dramas.filter(d => status[d.title] === "Watching").length;

  const move = (direction) => setActive(v => (v + direction + dramas.length) % dramas.length);
  const setCurrentStatus = (value) => setStatus(old => ({...old, [current.title]: value}));
  const toggleFavorite = (title) => setFavorites(old => old.includes(title) ? old.filter(x => x !== title) : [...old, title]);
  const setEpisodeProgress = (title, value) => setProgress(old => ({...old, [title]: Math.max(0, Math.min(999, Number(value) || 0))}));
  const swipeStart = (e) => setTouchStart(e.touches[0].clientX);
  const swipeEnd = (e) => { if (touchStart === null) return; const delta=e.changedTouches[0].clientX-touchStart; if(Math.abs(delta)>45) { move(delta<0?1:-1); setPaused(true); } setTouchStart(null); };

  const cardStyle = (d, index, offset) => {
    const distance = Math.abs(offset);
    return {
      "--offset": offset,
      "--distance": distance,
      "--poster": `url("${posterOverrides[d.title] || posters[index % posters.length]}")`,
      "--accent": d.mood === "royal" ? "#4b83b5" : d.mood === "fantasy" || d.mood === "epic" ? "#668bd0" : d.mood === "dark" ? "#547b9e" : d.mood === "action" ? "#397eaa" : "#719ec7"
    };
  };

  return <main className="app-shell">
    <div className="ambient ambient-one"></div><div className="ambient ambient-two"></div>
    <header className="topbar">
      <a className="brand" href="#"><span className="brand-mark">C</span><span>CINE<span className="brand-light">XT</span></span></a>
      <div className="top-links"><span>YOUR PERSONAL DRAMA UNIVERSE</span><span className="live-dot"></span><button className="year-wheel" type="button" aria-label={`Selected year ${year}. Scroll to change year`} title="Scroll to change year" onClick={() => setYear("2026")} onWheelCapture={e => { e.preventDefault(); e.stopPropagation(); const current = YEAR_OPTIONS.indexOf(year); const next = Math.max(0, current < 0 ? 0 : Math.min(YEAR_OPTIONS.length - 1, current + (e.deltaY > 0 ? 1 : -1))); setYear(YEAR_OPTIONS[next]); }} onKeyDown={e => { if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); const current = YEAR_OPTIONS.indexOf(year); const step = e.key === "ArrowDown" ? 1 : -1; setYear(YEAR_OPTIONS[(Math.max(0, current) + step + YEAR_OPTIONS.length) % YEAR_OPTIONS.length]); } }}>{year === "All" ? "2026" : year}</button></div>
    </header>

    <section className="intro-row">
      <div><p className="kicker">THE NEXT EPISODE STARTS HERE</p><h1>Find your next<br/><em>obsession.</em></h1><p className="intro-copy">A handpicked universe of fantasy, palace intrigue, supernatural powers and stories worth staying up for.</p></div>
      <div className="stats-card"><div><strong>{dramas.length}</strong><span>DRAMAS</span></div><div><strong>{watched}</strong><span>COMPLETED</span></div><div><strong>{watching}</strong><span>WATCHING</span></div><div className="progress-track"><span style={{width: `${watched / dramas.length * 100}%`}}></span></div><small>{Math.round(watched / dramas.length * 100)}% of your list completed</small></div>
    </section>

    <section className="showcase" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="showcase-glow"></div>
      <div className="carousel-top"><span>01 / FEATURED COLLECTION</span><span className="auto-label"><i></i> {paused ? "PAUSED" : "AUTO PLAY"}</span></div>
      <div className="carousel-stage" onTouchStart={swipeStart} onTouchEnd={swipeEnd}>
        {dramas.map((d,index) => {
          let offset = (index - active + dramas.length) % dramas.length;
          if (offset > dramas.length / 2) offset -= dramas.length;
          if (Math.abs(offset) > 3) return null;
          return <button key={d.title} className={`poster-card ${offset === 0 ? "is-active" : ""}`} style={cardStyle(d,index,offset)} onClick={() => {setActive(index);setPaused(true);}} aria-label={`Select ${d.title}`}>
            <div className="poster-image"></div><div className="poster-vignette"></div>
            <div className="poster-top"><span>DV ORIGINALS</span><b>{String(d.year).slice(2)}</b></div>
            <div className="poster-bottom"><span className="poster-tag">{d.tag}</span><strong>{d.title}</strong><small>{d.genre.split(" · ").slice(0,2).join("  /  ")}</small></div>
            {offset === 0 && <span className="focus-ring"></span>}
          </button>;
        })}
      </div>
      <div className="carousel-controls"><button onClick={() => move(-1)} aria-label="Previous drama">←</button><div className="carousel-progress"><span style={{width:`${(active+1)/dramas.length*100}%`}}></span></div><span className="counter">{String(active+1).padStart(2,"0")} <i>/</i> {String(dramas.length).padStart(2,"0")}</span><button onClick={() => move(1)} aria-label="Next drama">→</button></div>
    </section>

    <section className="featured-details">
      <div className="feature-copy"><div className="feature-meta"><span className="year-pill">{current.year}</span><span>{current.genre}</span></div><h2>{current.title}</h2><p>{current.desc}</p></div>
      <div className="feature-actions"><button className="view-details-button" onClick={()=>setDetailsOpen(true)}>VIEW DRAMA DETAILS <span>↗</span></button><button className={favorites.includes(current.title)?"favorite-toggle active":"favorite-toggle"} onClick={()=>toggleFavorite(current.title)}>{favorites.includes(current.title)?"♥ SAVED TO FAVOURITES":"♡ ADD TO FAVOURITES"}</button><label htmlFor="current-status">YOUR WATCH STATUS</label><select id="current-status" value={status[current.title] || "Want to watch"} onChange={e=>setCurrentStatus(e.target.value)}><option>Want to watch</option><option>Watching</option><option>Watched</option><option>Dropped</option></select><label htmlFor="current-episode">EPISODE PROGRESS</label><div className="episode-control"><input id="current-episode" type="number" min="0" max="999" value={progress[current.title] || 0} onChange={e=>setEpisodeProgress(current.title,e.target.value)} /><span>episodes watched</span></div><button className="details-next" onClick={() => move(1)}>NEXT DRAMA <span>↗</span></button></div>
    </section>

    <section className="library">
      <div className="library-heading"><div><p className="kicker">THE FULL COLLECTION</p><h2>Explore the library<span>.</span></h2></div><div className="library-count">{visible.length} TITLES FOUND</div></div>
      <div className="filters"><div className="search-box"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search titles or genres..."/></div><div className="year-filters">{["All","2026","2025","2024","2023"].map(y=><button className={year===y?"selected":""} onClick={()=>setYear(y)} key={y}>{y}</button>)}</div><select className="status-filter" value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option><option>Want to watch</option><option>Watching</option><option>Watched</option><option>Dropped</option></select><button className={mobileOnly?"favorite-filter selected":"favorite-filter"} onClick={()=>setMobileOnly(v=>!v)}>♥ FAVOURITES</button></div>
      <div className="library-grid">{visible.slice(0,showAll?visible.length:12).map(d=><article className="library-card" key={d.title}><button className="mini-poster" style={{"--poster":`url("${posterOverrides[d.title] || posters[dramas.indexOf(d)%posters.length]}")`}} onClick={()=>{setActive(dramas.indexOf(d));window.scrollTo({top:0,behavior:"smooth"});}}><span>{d.year}</span><b>{d.title}</b></button><div className="library-card-info"><strong>{d.title}</strong><small>{d.genre}</small><button className="card-details-link" onClick={()=>{setActive(dramas.indexOf(d));setDetailsOpen(true);}}>VIEW DETAILS ↗</button><div className="library-card-tools"><button className={favorites.includes(d.title)?"mini-favorite active":"mini-favorite"} onClick={()=>toggleFavorite(d.title)} aria-label="Toggle favourite">{favorites.includes(d.title)?"♥":"♡"}</button><label className="mini-episode">EP <input aria-label={"Episodes watched for "+d.title} type="number" min="0" max="999" value={progress[d.title] || 0} onChange={e=>setEpisodeProgress(d.title,e.target.value)}/></label></div><select aria-label={`Status for ${d.title}`} value={status[d.title] || "Want to watch"} onChange={e=>setStatus(old=>({...old,[d.title]:e.target.value}))}><option>Want to watch</option><option>Watching</option><option>Watched</option><option>Dropped</option></select></div></article>)}</div>
      {visible.length>12 && <button className="load-more" onClick={()=>setShowAll(v=>!v)}>{showAll?"SHOW LESS":"SHOW ALL "+visible.length+" DRAMAS"} <span>↓</span></button>}
      {visible.length===0 && <div className="no-results">No dramas found. Try another search or filter.</div>}
    </section>
    {detailsOpen && <div className="details-backdrop" role="presentation" onClick={()=>setDetailsOpen(false)}>
      <section className="details-modal" role="dialog" aria-modal="true" aria-labelledby="details-title" onClick={e=>e.stopPropagation()}>
        <button className="details-close" onClick={()=>setDetailsOpen(false)} aria-label="Close details">×</button>
        <div className="details-art" style={{"--detail-poster":`url("${posterOverrides[current.title] || posters[active % posters.length]}")`}}>
          <div className="details-art-shade"></div>
          <span className="details-eyebrow">CINEXT • DRAMA GUIDE</span>
          <div className="details-art-title"><span>{current.tag}</span><h2 id="details-title">{current.title}</h2><p>{current.year} <i>•</i> {current.genre}</p></div>
        </div>
        <div className="details-content">
          <div className="details-section-title"><span>THE STORY</span><span className="details-year">{current.year}</span></div>
          <p className="details-synopsis">{current.desc}</p>
          <div className="details-facts">
            <div><span>GENRES</span><strong>{current.genre.split(" · ").join(" / ")}</strong></div>
            <div><span>YOUR STATUS</span><strong>{status[current.title] || "Want to watch"}</strong></div>
            <div><span>EPISODES TRACKED</span><strong>{progress[current.title] || 0} watched</strong></div>
            <div><span>YOUR LIST</span><strong>{favorites.includes(current.title) ? "♥ Favourite" : "Not favourited"}</strong></div>
          </div>
          <div className="details-modal-actions">
            <button className={favorites.includes(current.title)?"favorite-toggle active":"favorite-toggle"} onClick={()=>toggleFavorite(current.title)}>{favorites.includes(current.title)?"♥ IN YOUR FAVOURITES":"♡ ADD TO FAVOURITES"}</button>
            <label>WATCH STATUS<select value={status[current.title] || "Want to watch"} onChange={e=>setCurrentStatus(e.target.value)}><option>Want to watch</option><option>Watching</option><option>Watched</option><option>Dropped</option></select></label>
            <label>EPISODES WATCHED<input type="number" min="0" max="999" value={progress[current.title] || 0} onChange={e=>setEpisodeProgress(current.title,e.target.value)}/></label>
          </div>
          <p className="details-note">Personal drama guide • Add your own progress as you watch</p>
        </div>
      </section>
    </div>}
    <footer><a className="brand footer-brand" href="#"><span className="brand-mark">D</span><span>DRAMA<span className="brand-light">VERSE</span></span></a><span>MADE FOR THE NEXT BINGE SESSION.</span><span>YOUR LIST. YOUR PACE.</span></footer>
  </main>;
}

createRoot(document.getElementById("root")).render(<App />);
