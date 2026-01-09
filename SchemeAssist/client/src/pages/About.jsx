import "./About.css";

function About() {
  return (
    <main className="about">

      <section className="about__header">
        <h1>About SchemeAssist AI</h1>
        <p className="about__intro">
          SchemeAssist AI is an independent, technology-driven initiative
          focused on improving citizens’ access to government welfare
          information through clarity, structure, and eligibility-based guidance.
        </p>
      </section>

      <section className="about__section">
        <h2>Purpose of the Platform</h2>
        <p>
          Governments publish a wide range of welfare schemes targeting
          specific demographics. However, many eligible citizens remain
          unaware or confused due to fragmented information, complex
          eligibility rules, and inconsistent documentation requirements.
        </p>
        <p>
          SchemeAssist AI addresses this gap by organizing scheme information
          around eligibility criteria rather than scheme names or departments.
        </p>
      </section>

      <section className="about__section about__section--alt">
        <h2>How SchemeAssist AI Works</h2>
        <ul className="about__list">
          <li>
            Scheme data is structured using clearly defined eligibility
            parameters such as income range, occupation, category, age,
            location, and special conditions.
          </li>
          <li>
            User inputs are evaluated against these parameters using
            deterministic logic combined with AI-assisted explanations.
          </li>
          <li>
            The system highlights relevant schemes and explains why a scheme
            may or may not apply to the user.
          </li>
        </ul>
      </section>

      <section className="about__section">
        <h2>Role of Artificial Intelligence</h2>
        <p>
          AI within SchemeAssist is used to enhance understanding—not to make
          final eligibility or approval decisions. Its role includes:
        </p>
        <ul className="about__list">
          <li>Simplifying complex eligibility language</li>
          <li>Providing contextual explanations</li>
          <li>Assisting users in interpreting scheme requirements</li>
        </ul>
        <p>
          All eligibility matching remains rule-based and transparent.
        </p>
      </section>

      <section className="about__section about__section--alt">
        <h2>Independence and Disclaimer</h2>
        <p>
          SchemeAssist AI is not affiliated with, endorsed by, or operated by
          any government authority. The platform does not process applications
          or guarantee scheme approval.
        </p>
        <p>
          Final eligibility verification, documentation review, and approval
          are conducted solely by the respective government departments.
        </p>
      </section>

    </main>
  );
}

export default About;
