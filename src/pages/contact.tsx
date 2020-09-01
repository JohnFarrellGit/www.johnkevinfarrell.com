import React from 'react'
import Layout from '../components/Layout'
import ContactForm from '../components/ContactForm'
import SEO from '../components/SEO'

const contact = () => {
  return (
    <Layout>
      <SEO title="Contact Me" description="Form for contacting John Farrell" />
      <section className="contact-page">
        <article className="contact-form">
          <h3>get in touch</h3>
          <ContactForm />
        </article>
      </section>
    </Layout>
  )
}

export default contact
