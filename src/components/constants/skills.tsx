import React from 'react'
import { SiJavascript, SiTypescript, SiReact, SiJava, SiSpring, SiNodeDotJs } from 'react-icons/si'
import { AiFillGithub } from 'react-icons/ai'

export default [
  {
    id: 1,
    icon: <SiJavascript className="skill-icon" />,
    title: 'JavaScript',
    description:
      'JavaScript is a language I have been using professionally for over a year, I love it because I love the internet. ' +
      'I love the internet because it is the most user friendly way to share information or build applications.'
  },
  {
    id: 2,
    icon: <SiTypescript className="skill-icon" />,
    title: 'TypeScript',
    description:
      'TypeScript is fantastic as it makes my development experience a lot easier, the static type checking helps reduce ' +
      'easily implemented bugs. The type system is truly beautiful when you get generics working correctly.'
  },
  {
    id: 3,
    icon: <SiReact className="skill-icon" />,
    title: 'React',
    description:
      'React is my current favourite web framework (I have used Angular and Vue professionally), I find modern functional React makes ' +
      'reactive web-development a lot less painful. I built this site using Gatsby which is a framework built on top of React.'
  },
  {
    id: 4,
    icon: <SiNodeDotJs className="skill-icon" />,
    title: 'Node',
    description:
      "I'm a big fan of the node ecosystem. I love using one language across the whole development stack. I find with node I can get a " +
      "project started extremely quickly. It's also nice that when working in a team everybody knows the languages used across the stack."
  },
  {
    id: 5,
    icon: <SiJava className="skill-icon" />,
    title: 'Java',
    description: 'I find Java great for large scale enterprise development. I am interested in alternatives though (Python, Go, C, C++, C#)'
  },
  {
    id: 6,
    icon: <SiSpring className="skill-icon" />,
    title: 'Spring',
    description:
      "I've used Spring whilst working on professional web applications, Spring made the backend/server-side development " +
      'simple with its many pre-configurations.'
  },
  {
    id: 7,
    icon: <AiFillGithub className="skill-icon" />,
    title: 'Git',
    description:
      "Every project I've worked on professionally has used Git for version control, I also use Git for my personal projects, " +
      'you can of course check out my GitHub.',
    link: {
      url: 'https://github.com/JohnFarrellDev/',
      display: 'GitHub'
    }
  }
]
