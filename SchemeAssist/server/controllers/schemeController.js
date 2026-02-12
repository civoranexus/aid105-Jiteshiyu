export const generateExplainabilityReport = (scheme, user) => {
  const factors = [];
  let matchScore = 0;
  let totalChecks = 0;

  const addFactor = (label, passed) => {
    totalChecks++;
    if (passed) matchScore++;

    factors.push({
      factor: label,
      matched: passed,
    });
  };

  if (scheme.minAge !== undefined) {
    addFactor(
      `User age ≥ ${scheme.minAge}`,
      user.age >= scheme.minAge
    );
  }

  if (scheme.maxAge !== undefined) {
    addFactor(
      `User age ≤ ${scheme.maxAge}`,
      user.age <= scheme.maxAge
    );
  }

  if (scheme.minIncome !== undefined) {
    addFactor(
      `Income ≥ ₹${scheme.minIncome}`,
      user.annual_income >= scheme.minIncome
    );
  }

  if (scheme.maxIncome !== undefined) {
    addFactor(
      `Income ≤ ₹${scheme.maxIncome}`,
      user.annual_income <= scheme.maxIncome
    );
  }

  if (scheme.category) {
    addFactor(
      `Category matches (${scheme.category})`,
      scheme.category === user.category
    );
  }

  if (scheme.education) {
    addFactor(
      `Education matches (${scheme.education})`,
      scheme.education === user.education
    );
  }

  const overall_match =
    totalChecks === 0
      ? 100
      : Math.round((matchScore / totalChecks) * 100);

  const summary =
    overall_match === 100
      ? "User fully matches scheme eligibility criteria."
      : overall_match >= 70
      ? "User matches most eligibility criteria for this scheme."
      : "User matches some criteria, but may not fully qualify.";

  return {
    summary,
    overall_match,
    factors,
  };
};
