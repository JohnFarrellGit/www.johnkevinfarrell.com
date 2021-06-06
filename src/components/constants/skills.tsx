import React from 'react'
import { SiJavascript, SiTypescript, SiReact, SiNodeDotJs, SiCsharp, SiDotNet } from 'react-icons/si'
import { AiFillGithub } from 'react-icons/ai'

export default [
  {
    id: 1,
    icon: <SiJavascript className="skill-icon" />,
    title: 'JavaScript',
    description:
      'JavaScript is a language I have been using professionally for a few years, I love it because I love the internet. ' +
      'I love the internet because it is the most user friendly way to share information or build applications.'
  },
  {
    id: 2,
    icon: <SiTypescript className="skill-icon" />,
    title: 'TypeScript',
    description:
      'TypeScript is fantastic as it makes my development experience a lot easier, the static type checking helps reduce ' +
      'easily implemented bugs. The type system is truly beautiful.'
  },
  {
    id: 3,
    icon: <SiCsharp className="skill-icon" />,
    title: 'C#',
    description: 'I find C# great for enterprise development when working as part of a team. C# enables good software development patterns' +
      ' that makes it relatively simple to produce useful applications.'
  },
  {
    id: 4,
    icon: <SiReact className="skill-icon" />,
    title: 'React',
    description:
      'React is my current favourite web framework (I have used Angular and Vue professionally), I find modern functional React makes ' +
      'stateful web-development a lot less painful. I built this site using Gatsby which is a framework built on top of React.'
  },
  {
    id: 5,
    icon: <SiDotNet className="skill-icon" />,
    title: 'ASP.net',
    description: "I've worked with ASP.net to build backend web APIs utlising RESTful architecture exposing underlying database CRUD functionality."
  },
  {
    id: 6,
    icon: <SiNodeDotJs className="skill-icon" />,
    title: 'Node',
    description:
      "I'm a big fan of the node ecosystem. I love using one language across the whole development stack. I find with node I can get a " +
      "project started extremely quickly. It's also nice that when working in a team everybody knows the languages used across the stack."
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
