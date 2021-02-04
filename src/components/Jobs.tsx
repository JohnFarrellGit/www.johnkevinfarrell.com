import React, { useState } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
import { Link } from 'gatsby'
import Title from './Title'

interface JobI {
  allContentfulPreviousWork: {
    work: {
      companyName: string;
      jobRoles?: string[];
      jobTitle: string;
      startDate: string;
      endDate?: string;
    }[]
  }
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Jobs = (jobs: JobI) => {

  const [value, setValue] = useState(0)
  const { companyName, jobTitle, startDate, endDate, jobRoles } = jobs.allContentfulPreviousWork.work[value]

  const startDateDisplay = `${months[new Date(startDate).getMonth()]} ${new Date(startDate).getUTCFullYear()}`
  const endDateDisplay = endDate ? `${months[new Date(endDate).getMonth()]} ${new Date(endDate).getUTCFullYear()}` : 'Present'

  return (
    <section className="section jobs">
      <Title title="experience" />
      <div className="jobs-center">
        <div className="btn-container">
          {jobs.allContentfulPreviousWork.work.map((job, indx) => {
            return (
              <button key={indx} onClick={() => setValue(indx)} className={`job-btn ${indx === value && 'active-btn'}`} type="button">
                {job.companyName}
              </button>
            )
          })}
        </div>
        <article className="job-info">
          <h3>{jobTitle}</h3>
          <h4>{companyName}</h4>
          <p className="job-date">{`${startDateDisplay} - ${endDateDisplay}`}</p>
          {jobRoles && jobRoles.map((item, index) => {
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon" />
                <p>{item}</p>
              </div>
            )
          })}
        </article>
      </div>
      <Link to="/about-me" className="btn center-btn">
        more info about me
      </Link>
    </section>
  )
}

export default Jobs
