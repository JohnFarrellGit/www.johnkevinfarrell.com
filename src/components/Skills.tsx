import React from 'react'
import { Link } from 'gatsby'
import Title from './Title'
import skills from './constants/skills'

const Skills = () => {
  return (
    <section className="section bg-grey">
      <Title title="Tech Skills" />
      <div className="section-center skills-center">
        {skills.map(skill => {
          const { id, title, description, icon, link } = skill
          return (
            <article key={id} className="skill">
              {icon}
              <h4>{title}</h4>
              <div className="underline" />
              <p>{description}</p>
              {link && (
                <Link to={link.url} className="btn">
                  {link.display}
                </Link>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Skills
