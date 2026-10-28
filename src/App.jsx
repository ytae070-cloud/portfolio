import { useEffect, useSyncExternalStore } from 'react'
import './App.css'

function subscribeToNavigation(onChange) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function getCurrentLocation() {
  return window.location.hash
}

function App() {
  const currentLocation = useSyncExternalStore(subscribeToNavigation, getCurrentLocation)
  const isPortfolioPage = currentLocation === '#/portfolio'
  const isAboutPage = currentLocation === '#/about' || currentLocation === '#about'

  useEffect(() => {
    document.title = isPortfolioPage ? '작품 | 나의 포트폴리오' : isAboutPage ? '자기소개 | 나의 포트폴리오' : '나의 포트폴리오'

    if (isPortfolioPage || isAboutPage) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.getElementById(isPortfolioPage ? 'portfolio-title' : 'about-page-title')?.focus({ preventScroll: true })
    } else {
      const targetId = currentLocation.slice(1) || 'home'
      document.getElementById(targetId)?.scrollIntoView({ block: 'start' })
    }
  }, [currentLocation, isPortfolioPage, isAboutPage])

  return (
    <>
      <a className="skip-link" href="#main" onClick={(event) => {
        event.preventDefault()
        document.getElementById('main')?.focus()
        document.getElementById('main')?.scrollIntoView({ block: 'start' })
      }}>본문으로 바로가기</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#home" aria-label="나의 포트폴리오 홈">
            <span className="brand-symbol" aria-hidden="true">L</span>
            <span>my portfolio<span className="brand-dot">.</span></span>
          </a>
          <nav aria-label="주요 메뉴">
            <a href="#home">홈</a>
            <a href="#/about" aria-current={isAboutPage ? 'page' : undefined}>자기소개</a>
            <a href="#/portfolio" aria-current={isPortfolioPage ? 'page' : undefined}>작품</a>
          </nav>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        {!isPortfolioPage && !isAboutPage && <section className="home-hero page-width" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> 나를 소개합니다</p>
            <h1 id="hero-title">음악과 그림을 좋아하는<br /><span>Luciel</span>입니다.</h1>
            <p className="hero-description">저의 관심사와 직접 만든 그림을 소개할게요.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#/about">자기소개 보기 <span aria-hidden="true">→</span></a>
              <a className="button button-secondary" href="#/portfolio">작품 보기 <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-frame"><span className="art-letter">L</span><span className="art-line" /><span className="art-dot" /></div>
            <span className="art-caption">Luciel</span>
          </div>
        </section>}

        {isAboutPage && <section className="about-page page-width" aria-labelledby="about-page-title">
          <a className="text-link list-back" href="#home"><span aria-hidden="true">←</span> 홈으로</a>
          <header className="page-heading">
            <p className="eyebrow">자기소개</p>
            <h1 id="about-page-title" tabIndex={-1}>음악과 그림을 좋아하는<br /><span>Luciel</span>입니다.</h1>
            <p className="page-lead">저의 관심사와 잘하는 것, 앞으로 해보고 싶은 일을 소개합니다.</p>
          </header>
          <div className="about-grid">
            <article className="info-card">
              <span className="card-number">01</span>
              <h2>관심사와 취미</h2>
              <p>음악 듣기를 좋아해요.</p>
            </article>
            <article className="info-card">
              <span className="card-number">02</span>
              <h2>잘하는 것</h2>
              <p>그림 그리기를 잘해요.</p>
            </article>
            <article className="info-card">
              <span className="card-number">03</span>
              <h2>배우고 싶은 것</h2>
              <p>그림을 더 잘 그리고 싶어요.</p>
            </article>
            <article className="info-card goal-card">
              <span className="card-number">04</span>
              <h2>앞으로의 목표</h2>
              <p>새로운 취미를 시작해 보고 싶어요.</p>
            </article>
          </div>
          <a className="button button-primary about-cta" href="#/portfolio">직접 만든 그림 보기 <span aria-hidden="true">→</span></a>
        </section>}

        {isPortfolioPage && <section className="portfolio-page page-width" aria-labelledby="portfolio-title">
          <a className="text-link list-back" href="#home"><span aria-hidden="true">←</span> 홈으로</a>
          <header className="page-heading">
            <p className="eyebrow">작품</p>
            <h1 id="portfolio-title" tabIndex={-1}>직접 만든 그림</h1>
            <p className="page-lead">Luciel이 그린 그림을 소개하는 공간입니다.</p>
          </header>
          <article className="artwork-placeholder">
            <div className="placeholder-mark" aria-hidden="true">＋</div>
            <h2>그림을 이곳에 소개해 주세요</h2>
            <p>작품 사진이나 이미지 파일을 준비하면 이 공간에 추가할 수 있어요.</p>
          </article>
        </section>}
      </main>

      <footer className="site-footer page-width">
        <a className="footer-wordmark" href="#home">my portfolio<span className="brand-dot">.</span></a>
        <p>Luciel의 자기소개</p>
        <a className="back-top" href="#home">맨 위로 <span aria-hidden="true">↑</span></a>
      </footer>
    </>
  )
}

export default App
