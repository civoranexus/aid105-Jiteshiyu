import "./Terms.css";

function Terms() {
  return (
    <main className="terms">

      <section className="terms__header">
        <h1>Terms of Use</h1>
        <p className="terms__intro">
          These Terms of Use govern access to and use of the SchemeAssist AI
          platform. By accessing or using this platform, you agree to be bound
          by these terms.
        </p>
      </section>

      <section className="terms__section">
        <h2>Acceptance of Terms</h2>
        <p>
          By accessing, browsing, or using SchemeAssist AI, you acknowledge
          that you have read, understood, and agreed to these Terms of Use.
          If you do not agree, you must discontinue use of the platform.
        </p>
      </section>

      <section className="terms__section terms__section--alt">
        <h2>Purpose of the Platform</h2>
        <p>
          SchemeAssist AI is an informational and guidance platform intended to
          help users understand government welfare schemes and eligibility
          criteria.
        </p>
        <p>
          The platform does not process applications, provide official approvals,
          or replace government portals or authorities.
        </p>
      </section>

      <section className="terms__section">
        <h2>User Responsibilities</h2>
        <p>
          Users agree to:
        </p>
        <ul className="terms__list">
          <li>Provide accurate and truthful information when using the platform</li>
          <li>Use the platform solely for lawful and informational purposes</li>
          <li>Independently verify scheme details from official sources</li>
        </ul>
        <p>
          Users must not misuse the platform, attempt unauthorized access, or
          interfere with its operation.
        </p>
      </section>

      <section className="terms__section terms__section--alt">
        <h2>AI-Assisted Guidance</h2>
        <p>
          SchemeAssist AI uses automated systems and artificial intelligence
          to assist in explaining eligibility conditions and scheme information.
        </p>
        <p>
          AI-generated outputs are informational only and do not constitute
          legal, financial, or official advice.
        </p>
      </section>

      <section className="terms__section">
        <h2>Accuracy of Information</h2>
        <p>
          While reasonable efforts are made to maintain accurate and current
          information, SchemeAssist AI does not guarantee the completeness,
          accuracy, or reliability of any content.
        </p>
        <p>
          Government schemes and eligibility rules may change without notice.
        </p>
      </section>

      <section className="terms__section terms__section--alt">
        <h2>Intellectual Property</h2>
        <p>
          All content, software, design elements, and documentation on this
          platform are the intellectual property of SchemeAssist AI unless
          otherwise stated.
        </p>
        <p>
          Users may not copy, reproduce, distribute, or modify platform content
          without prior written permission.
        </p>
      </section>

      <section className="terms__section">
        <h2>Limitation of Liability</h2>
        <p>
          SchemeAssist AI shall not be liable for any direct, indirect,
          incidental, or consequential damages arising from the use of or
          inability to use the platform.
        </p>
        <p>
          Use of the platform is at the user’s sole discretion and risk.
        </p>
      </section>

      <section className="terms__section terms__section--alt">
        <h2>Termination of Access</h2>
        <p>
          SchemeAssist AI reserves the right to suspend or terminate access
          to the platform at any time, without notice, for conduct that
          violates these Terms of Use or applicable laws.
        </p>
      </section>

      <section className="terms__section">
        <h2>Changes to These Terms</h2>
        <p>
          These Terms of Use may be updated periodically. Continued use of
          the platform after changes constitutes acceptance of the revised
          terms.
        </p>
      </section>

      <section className="terms__section terms__section--alt">
        <h2>Governing Law</h2>
        <p>
          These Terms of Use shall be governed by and interpreted in
          accordance with applicable local laws, without regard to conflict
          of law principles.
        </p>
      </section>

    </main>
  );
}

export default Terms;
