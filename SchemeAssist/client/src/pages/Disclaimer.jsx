import "./Disclaimer.css";

function Disclaimer() {
  return (
    <main className="disclaimer">

      <section className="disclaimer__header">
        <h1>Disclaimer</h1>
        <p className="disclaimer__intro">
          Please read this disclaimer carefully before using the SchemeAssist AI
          platform.
        </p>
      </section>

      <section className="disclaimer__section">
        <h2>Independent Platform</h2>
        <p>
          SchemeAssist AI is an independent, privately developed platform and is
          not affiliated with, endorsed by, sponsored by, or operated by any
          government authority, ministry, department, or agency.
        </p>
        <p>
          All references to government schemes are provided solely for
          informational and educational purposes.
        </p>
      </section>

      <section className="disclaimer__section disclaimer__section--alt">
        <h2>No Guarantee of Eligibility or Approval</h2>
        <p>
          The platform does not guarantee eligibility, approval, enrollment, or
          receipt of benefits under any government scheme.
        </p>
        <p>
          Eligibility results shown on the platform are indicative and based on
          user-provided information and publicly available scheme criteria.
          Final eligibility determination is made exclusively by the respective
          government authorities.
        </p>
      </section>

      <section className="disclaimer__section">
        <h2>Use of Artificial Intelligence</h2>
        <p>
          SchemeAssist AI uses artificial intelligence to assist users in
          understanding eligibility conditions and scheme descriptions.
        </p>
        <p>
          AI-generated explanations are intended to simplify complex information
          and should not be interpreted as legal, financial, or official advice.
        </p>
      </section>

      <section className="disclaimer__section disclaimer__section--alt">
        <h2>Data Accuracy and Updates</h2>
        <p>
          While reasonable efforts are made to keep scheme information accurate
          and up to date, SchemeAssist AI does not warrant the completeness,
          reliability, or timeliness of the information provided.
        </p>
        <p>
          Government schemes, eligibility criteria, and benefits are subject to
          change without notice.
        </p>
      </section>

      <section className="disclaimer__section">
        <h2>User Responsibility</h2>
        <p>
          Users are responsible for verifying all scheme details directly from
          official government portals or authorized sources before applying.
        </p>
        <p>
          The platform should be used as a guidance tool and not as a substitute
          for official documentation or instructions.
        </p>
      </section>

      <section className="disclaimer__section disclaimer__section--alt">
        <h2>Limitation of Liability</h2>
        <p>
          SchemeAssist AI shall not be held liable for any loss, damage, or
          inconvenience arising from reliance on the information provided on
          this platform.
        </p>
        <p>
          Use of the platform is entirely at the user’s own risk.
        </p>
      </section>

    </main>
  );
}

export default Disclaimer;
