import React from 'react'
import "../style/home.scss"

const Home = () => {
    return (
        <div className='home-page'>

            <header className='page-header'>
                <h1>
                    Create Your Custom
                    <span className='highlight'> Interview Plan</span>
                </h1>
                <p>
                    Let our AI analyze the job requirements and your unique
                    profile to build a winning strategy.
                </p>
            </header>

            <div className='interview-card'>
                <div className='interview-card__body'>

                    {/* Left Panel */}
                    <div className='panel panel--left'>
                        <div className='panel__header'>
                            <h2>Target Job Description</h2>
                            <span className='badge badge--required'>
                                Required
                            </span>
                        </div>

                        <textarea
                            className='panel__textarea'
                            placeholder='Paste the full job description here...'
                        />

                        <div className='char-counter'>
                            0 / 5000 chars
                        </div>
                    </div>

                    <div className='panel-divider' />

                    {/* Right Panel */}
                    <div className='panel panel--right'>

                        <div className='panel__header'>
                            <h2>Your Profile</h2>
                        </div>

                        <div className='upload-section'>
                            <label className='section-label'>
                                Upload Resume
                                <span className='badge badge--best'>
                                    Best Results
                                </span>
                            </label>

                            <label className='dropzone'>
                                <p className='dropzone__title'>
                                    Click to upload or drag & drop
                                </p>

                                <p className='dropzone__subtitle'>
                                    PDF or DOCX (Max 5MB)
                                </p>

                                <input
                                    hidden
                                    type='file'
                                    accept='.pdf,.docx'
                                />
                            </label>
                        </div>

                        <div className='or-divider'>
                            <span>OR</span>
                        </div>

                        <div className='self-description'>
                            <label
                                className='section-label'
                                htmlFor='selfDescription'
                            >
                                Quick Self Description
                            </label>

                            <textarea
                                id='selfDescription'
                                className='panel__textarea panel__textarea--short'
                                placeholder='Briefly describe yourself...'
                            />
                        </div>

                        <div className='info-box'>
                            <p>
                                Either a <strong>Resume</strong> or a
                                <strong> Self Description</strong> is required
                                to generate a personalized plan.
                            </p>
                        </div>

                    </div>
                </div>

                <div className='interview-card__footer'>
                    <span className='footer-info'>
                        AI-Powered Strategy Generation • Approx 30s
                    </span>

                    <button className='generate-btn'>
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>

            {/* Demo Recent Reports */}
            <section className='recent-reports'>
                <h2>My Recent Interview Plans</h2>

                <ul className='reports-list'>

                    <li className='report-item'>
                        <h3>Frontend Developer</h3>
                        <p className='report-meta'>
                            Generated on 10 June 2026
                        </p>
                        <p className='match-score score--high'>
                            Match Score: 88%
                        </p>
                    </li>

                    <li className='report-item'>
                        <h3>MERN Stack Developer</h3>
                        <p className='report-meta'>
                            Generated on 8 June 2026
                        </p>
                        <p className='match-score score--mid'>
                            Match Score: 72%
                        </p>
                    </li>

                </ul>
            </section>

            <footer className='page-footer'>
                <a href='#'>Privacy Policy</a>
                <a href='#'>Terms of Service</a>
                <a href='#'>Help Center</a>
            </footer>

        </div>
    )
}

export default Home