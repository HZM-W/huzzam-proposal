'use client'

import { useState, type CSSProperties } from 'react'
import { ArrowDown, ArrowRight, Heart, Shield, Sparkles, Sword, X } from 'lucide-react'

const thirdQuestionNoMessages = [
  'The walls are down. There is nowhere left to run from forever.',
  'Even Levi agrees: that answer needs another attempt.',
  'Eren tried that response once. The scouts overruled him.',
  'Nice maneuver, but your heart already knows the answer.',
  'The Survey Corps has filed an objection to that selection.',
]

const questions = [
  {
    eyebrow: 'MISSION 01',
    question: 'Will you be my favorite person in every timeline?',
    yes: 'A perfect answer.',
    no: 'Nice try, recruit. That answer is classified.',
  },
  {
    eyebrow: 'MISSION 02',
    question: 'Will you choose me as your partner for every adventure?',
    yes: 'Our greatest expedition starts now.',
    no: 'This button is broken.',
  },
  {
    eyebrow: 'MISSION 03',
    question: 'Will you say yes to forever with me?',
    yes: 'Then it is settled. Forever it is.',
    no: thirdQuestionNoMessages[0],
  },
]

type Screen = 'hero' | 'quote' | 'intro' | 'questions' | 'final'

export function ProposalPage() {
  const [screen, setScreen] = useState<Screen>('hero')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, 'yes' | 'no'>>({})
  const [noRuns, setNoRuns] = useState(0)

  const question = questions[questionIndex]
  const answer = answers[questionIndex]

  function nextScreen() {
    setScreen(screen === 'hero' ? 'quote' : screen === 'quote' ? 'intro' : 'questions')
  }

  function answerQuestion(value: 'yes' | 'no') {
    if (value === 'no' && questionIndex === 0) {
      setNoRuns((current) => current + 1)
      return
    }
    if (value === 'no' && questionIndex === 2) {
      setNoRuns((current) => current + 1)
    }
    setAnswers((current) => ({ ...current, [questionIndex]: value }))
  }

  function continueQuestion() {
    if (questionIndex === questions.length - 1) {
      setScreen('final')
      return
    }
    setQuestionIndex((current) => current + 1)
    setNoRuns(0)
  }

  return (
    <main className="proposal-site">
      <header className="topbar">
        <div className="brand-mark"><Shield size={17} strokeWidth={2.5} /><span>THE SCOUT REGIMENT</span></div>
        <div className="topbar-note">PERSONAL FILE // 001</div>
      </header>

      <div className={`screen-stage screen-${screen}`}>
        {screen === 'hero' && <section className="hero-section" aria-labelledby="proposal-title">
          <div className="hero-copy">
            <p className="kicker"><span className="red-line" /> A SPECIAL REPORT FROM THE WALLS</p>
            <h1 id="proposal-title">To the person<br /><em>I would</em> <span>choose</span><br />in every life.</h1>
            <p className="hero-intro">Some missions are worth risking everything for.</p>
            <button className="scroll-cue" onClick={nextScreen}><ArrowDown size={15} /> CLICK TO GO NEXT</button>
          </div>
          <div className="hero-art-wrap">
            <div className="hero-art-frame"><img src="/aot-proposal-hero.png" alt="Original anime-style scout regiment group portrait" /></div>
            <div className="hero-stamp">FOR<br /><strong>YOU</strong></div>
            <div className="hero-caption"><span>THE ONES WE LOVE</span><span>ARE OUR STRONGEST WEAPONS</span></div>
          </div>
        </section>}

        {screen === 'quote' && <section className="quote-screen" aria-labelledby="quote-title">
          <p className="quote-mark">“</p>
          <h1 id="quote-title">If we don&apos;t fight,<br /><em>we can&apos;t win.</em></h1>
          <p className="quote-subtitle">But this time, we fight for a life together.</p>

          <button className="scroll-cue" onClick={nextScreen}><ArrowDown size={15} /> CLICK TO GO NEXT</button>
        </section>}

        {screen === 'intro' && <section className="intro-screen" aria-labelledby="questions-title">
          <p className="kicker"><span className="red-line" /> THE FINAL OPERATION</p>
          <h2 id="questions-title">Three questions.<br /><em>One</em> very important answer.</h2>
          <p>Your mission is to answer honestly.</p>
          <button className="begin-button" onClick={() => setScreen('questions')}>LET&apos;S BEGIN <ArrowRight size={16} /></button>
        </section>}

        {screen === 'questions' && <section className="questions-section active-question" aria-labelledby="question-title">
          <div className="question-progress">MISSION 0{questionIndex + 1} / 03</div>
          <div className="card-icon">{questionIndex === 0 ? <Heart /> : questionIndex === 1 ? <Sword /> : <Sparkles />}</div>
          <h2 id="question-title">{question.question}</h2>
          <div className="answer-row">
            <button className="answer-button yes-button" onClick={() => answerQuestion('yes')} aria-pressed={answer === 'yes'}><Heart size={16} fill="currentColor" /> YES</button>
            <button className={`answer-button no-button ${questionIndex === 0 && noRuns ? 'runaway' : ''}`} onClick={() => answerQuestion('no')} onMouseEnter={() => questionIndex === 0 && setNoRuns((current) => current + 1)} style={questionIndex === 0 && noRuns ? { '--run-x': `${(noRuns % 3) * 85 - 85}px`, '--run-y': `${noRuns % 2 ? 55 : -45}px` } as CSSProperties : undefined}><X size={16} /> NO</button>
          </div>
          {answer && <p className="answer-note" role="status">{answer === 'yes' ? question.yes : questionIndex === 2 ? thirdQuestionNoMessages[(noRuns - 1) % thirdQuestionNoMessages.length] : question.no}</p>}
          {answer === 'yes' && <button className="next-question" onClick={continueQuestion}>{questionIndex === questions.length - 1 ? 'RECEIVE TRANSMISSION' : 'CLICK TO GO NEXT'} <ArrowRight size={15} /></button>}
          {questionIndex === 1 && answer === 'no' && <p className="broken-note" role="status">This button is broken.</p>}
        </section>}

        {screen === 'final' && <section className="final-section final-screen" aria-live="polite">
          <div className="final-image"><img src="/image-to-1.jpg" alt="Special moment together" /></div>
          <div className="final-copy"><p className="kicker"><span className="red-line" /> TRANSMISSION RECEIVED</p><h2>Then let&apos;s make our own legend.</h2><p>The walls can wait. Our next adventure begins with a yes.</p><div className="signature"><span>WITH ALL MY HEART,</span><strong>YOUR SCOUT</strong></div></div>
        </section>}
      </div>

      <footer className="site-footer"><span>LOVE BEYOND THE WALLS</span><span><Heart size={13} fill="currentColor" /> MADE FOR ONE VERY SPECIAL PERSON</span><span>EST. TODAY</span></footer>
    </main>
  )
}

export default ProposalPage
