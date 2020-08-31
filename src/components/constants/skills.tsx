import React from 'react'
import { SiJavascript, SiTypescript, SiReact, SiJava, SiSpring } from 'react-icons/si'

export default [
  {
    id: 1,
    icon: <SiJavascript className="service-icon" />,
    title: 'JavaScript',
    description:
      'JavaScript is a language I have been using professionally for over a year, I love it because I love the internet ' +
      'I love the internet because it is the most user friendly way to share information or build applications.'
  },
  {
    id: 2,
    icon: <SiTypescript className="service-icon" />,
    title: 'TypeScript',
    description:
      'TypeScript is fantastic as it makes my development experience a lot easier, the static type checking helps reduce ' +
      'easily implemented bugs. The type system is truly beautiful when you get generics working correctly.'
  },
  {
    id: 3,
    icon: <SiReact className="service-icon" />,
    title: 'React',
    description:
      'React is my current favourite web framework (I have used Angular and Vue professionally), modern functional React ' +
      'makes reactive web-development a lot less painful. This site is built using Gatsby which is a framework built on top of React.'
  },
  {
    id: 4,
    icon: <SiJava className="service-icon" />,
    title: 'Java',
    description:
      'I find Java great for large scale enterprise development. I am interested in alternatives though. (Python, Go, C, C++, C#)'
  },
  {
    id: 5,
    icon: <SiSpring className="service-icon" />,
    title: 'Spring',
    description:
      "I've used Spring whilst working on professional web applications, Spring made the backend/server-side development " +
      "simple with it's many pre-configurations."
  }
]
