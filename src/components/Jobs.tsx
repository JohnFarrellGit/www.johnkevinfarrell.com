import React, { useState } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
import { Link } from 'gatsby'
import Title from './Title'
import jobs from './constants/jobs'

const Jobs = () => {
  const [value, setValue] = useState(0)
  const { companyName, position, startDate, endDate, responsibilities } = jobs[value]

  return (
    <section className="section jobs">
      <Title title="experience" />
      <div className="jobs-center">
        <div className="btn-container">
          {jobs.map((job, indx) => {
            return (
              <button key={job.id} onClick={() => setValue(indx)} className={`job-btn ${indx === value && 'active-btn'}`} type="button">
                {job.companyName}
              </button>
            )
          })}
        </div>
        <article className="job-info">
          <h3>{position}</h3>
          <h4>{companyName}</h4>
          <p className="job-date">{`${startDate} - ${endDate}`}</p>
          {responsibilities.map(item => {
            return (
              <div key={item.id} className="job-desc">
                <FaAngleDoubleRight className="job-icon" />
                <p>{item.description}</p>
              </div>
            )
          })}
        </article>
      </div>
      <Link to="/about-me" className="btn center-btn">
        More Info
      </Link>
    </section>
  )
}

export default Jobs
