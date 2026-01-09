import "./Privacy.css";

function Privacy() {
  return (
    <main className="privacy">

      <section className="privacy__header">
        <h1>Privacy Policy</h1>
        <p className="privacy__intro">
          This Privacy Policy explains how SchemeAssist AI collects, uses,
          stores, and protects information when you use the platform.
        </p>
      </section>

      <section className="privacy__section">
        <h2>Scope of This Policy</h2>
        <p>
          This policy applies solely to information collected through the
          SchemeAssist AI website and related services. It does not apply to
          external websites or government portals linked from this platform.
        </p>
      </section>

      <section className="privacy__section privacy__section--alt">
        <h2>Information We Collect</h2>
        <p>
          SchemeAssist AI is designed to minimize data collection. Depending on
          how you use the platform, we may collect the following categories of
          information:
        </p>
        <ul className="privacy__list">
          <li>
            <strong>User-provided information:</strong> Details voluntarily
            entered for eligibility guidance, such as age range, income range,
            occupation category, location (state/district), or other
            non-identifying attributes.
          </li>
          <li>
            <strong>Technical information:</strong> Basic, non-identifying data
            such as browser type, device type, and anonymized usage statistics,
            collected for performance and security purposes.
          </li>
        </ul>
        <p>
          The platform does not require users to provide sensitive personal
          identifiers such as Aadhaar numbers, bank details, or official
          identification documents.
        </p>
      </section>

      <section className="privacy__section">
        <h2>How We Use Information</h2>
        <p>
          Information collected through SchemeAssist AI is used strictly for
          the following purposes:
        </p>
        <ul className="privacy__list">
          <li>Providing eligibility-based scheme guidance</li>
          <li>Improving platform functionality and user experience</li>
          <li>Ensuring platform security and preventing misuse</li>
        </ul>
        <p>
          Information is not used for advertising, profiling, or commercial
          marketing purposes.
        </p>
      </section>

      <section className="privacy__section privacy__section--alt">
        <h2>AI Processing and Automation</h2>
        <p>
          SchemeAssist AI may process user-provided inputs using automated
          systems to generate eligibility explanations and guidance.
        </p>
        <p>
          These processes are designed to be assistive and explanatory. They do
          not make legally binding decisions, and no automated process replaces
          official government verification.
        </p>
      </section>

      <section className="privacy__section">
        <h2>Data Storage and Retention</h2>
        <p>
          Data is retained only for as long as necessary to provide the
          intended functionality or to meet technical and security
          requirements.
        </p>
        <p>
          Where possible, data is anonymized or aggregated to reduce privacy
          risk.
        </p>
      </section>

      <section className="privacy__section privacy__section--alt">
        <h2>Data Sharing and Disclosure</h2>
        <p>
          SchemeAssist AI does not sell, rent, or trade user information.
        </p>
        <p>
          Information may be disclosed only if required by law or to protect
          the security and integrity of the platform.
        </p>
      </section>

      <section className="privacy__section">
        <h2>Data Security</h2>
        <p>
          Reasonable technical and organizational measures are implemented to
          protect information against unauthorized access, alteration, or
          misuse.
        </p>
        <p>
          However, no method of electronic transmission or storage is entirely
          secure, and absolute security cannot be guaranteed.
        </p>
      </section>

      <section className="privacy__section privacy__section--alt">
        <h2>User Responsibility</h2>
        <p>
          Users are advised not to submit sensitive personal information or
          official identification numbers through the platform.
        </p>
        <p>
          SchemeAssist AI is intended for guidance only and does not require
          document uploads or identity verification.
        </p>
      </section>

      <section className="privacy__section">
        <h2>Policy Updates</h2>
        <p>
          This Privacy Policy may be updated periodically to reflect changes in
          platform functionality or legal requirements.
        </p>
        <p>
          Continued use of the platform after updates constitutes acceptance
          of the revised policy.
        </p>
      </section>

    </main>
  );
}

export default Privacy;
