import React from 'react'
import Layout from '../components/Layout'
import ContactForm from '../components/ContactForm'

const contact = () => {
  return (
    <Layout>
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
