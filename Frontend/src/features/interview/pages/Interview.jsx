import React, { useState } from 'react'
import '../style/interview.scss'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions' },
    { id: 'behavioral', label: 'Behavioral Questions' },
    { id: 'roadmap', label: 'Road Map' },
]

const QuestionCard = ({ question, answer }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className="q-card">
            <div
                className="q-card__header"
                onClick={() => setOpen(!open)}
            >
                <p>{question}</p>
            </div>

            {open && (
                <div className="q-card__body">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    )
}

const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')

    return (
        <div className="interview-page">
            <div className="interview-layout">

                {/* Left Sidebar */}
                <nav className="interview-nav">
                    <div className="nav-content">
                        <p className="interview-nav__label">Sections</p>

                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`interview-nav__item ${
                                    activeNav === item.id
                                        ? 'interview-nav__item--active'
                                        : ''
                                }`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <button className="button primary-button">
                        Download Resume
                    </button>
                </nav>

                <div className="interview-divider" />

                {/* Center Content */}
                <main className="interview-content">

                    {activeNav === 'technical' && (
                        <section>
                            <div className="content-header">
                                <h2>Technical Questions</h2>
                            </div>

                            <div className="q-list">
                                <QuestionCard
                                    question="What is React?"
                                    answer="React is a JavaScript library for building user interfaces."
                                />

                                <QuestionCard
                                    question="What are Hooks?"
                                    answer="Hooks allow functional components to use state and lifecycle features."
                                />
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className="content-header">
                                <h2>Behavioral Questions</h2>
                            </div>

                            <div className="q-list">
                                <QuestionCard
                                    question="Tell me about yourself."
                                    answer="Provide a concise overview of your background and experience."
                                />

                                <QuestionCard
                                    question="Describe a challenge you faced."
                                    answer="Use the STAR method to explain the situation."
                                />
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className="content-header">
                                <h2>Preparation Road Map</h2>
                            </div>

                            <div className="roadmap-list">
                                <div className="roadmap-day">
                                    <h3>Day 1</h3>
                                    <p>Revise HTML, CSS and JavaScript fundamentals.</p>
                                </div>

                                <div className="roadmap-day">
                                    <h3>Day 2</h3>
                                    <p>Practice React concepts and projects.</p>
                                </div>

                                <div className="roadmap-day">
                                    <h3>Day 3</h3>
                                    <p>Mock interview and problem solving.</p>
                                </div>
                            </div>
                        </section>
                    )}

                </main>

                <div className="interview-divider" />

                {/* Right Sidebar */}
                <aside className="interview-sidebar">

                    <div className="match-score">
                        <p className="match-score__label">
                            Match Score
                        </p>

                        <div className="match-score__ring">
                            <span className="match-score__value">
                                85
                            </span>
                            <span className="match-score__pct">
                                %
                            </span>
                        </div>

                        <p className="match-score__sub">
                            Strong match for this role
                        </p>
                    </div>

                    <div className="sidebar-divider" />

                    <div className="skill-gaps">
                        <p className="skill-gaps__label">
                            Skill Gaps
                        </p>

                        <div className="skill-gaps__list">
                            <span className="skill-tag">
                                Docker
                            </span>

                            <span className="skill-tag">
                                AWS
                            </span>

                            <span className="skill-tag">
                                System Design
                            </span>
                        </div>
                    </div>

                </aside>

            </div>
        </div>
    )
}

export default Interview