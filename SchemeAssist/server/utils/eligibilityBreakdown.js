export const getEligibilityBreakdown = (scheme, user) => {
  const matched = [];
  const unmet = [];

  if (scheme.minAge !== undefined) {
    if (user.age >= scheme.minAge) {
      matched.push(`Age ≥ ${scheme.minAge}`);
    } else {
      unmet.push(`Age must be ≥ ${scheme.minAge}`);
    }
  }

  if (scheme.maxAge !== undefined) {
    if (user.age <= scheme.maxAge) {
      matched.push(`Age ≤ ${scheme.maxAge}`);
    } else {
      unmet.push(`Age must be ≤ ${scheme.maxAge}`);
    }
  }

  if (scheme.minIncome !== undefined) {
    if (user.annual_income >= scheme.minIncome) {
      matched.push(`Income ≥ ₹${scheme.minIncome}`);
    } else {
      unmet.push(`Income must be ≥ ₹${scheme.minIncome}`);
    }
  }

  if (scheme.maxIncome !== undefined) {
    if (user.annual_income <= scheme.maxIncome) {
      matched.push(`Income ≤ ₹${scheme.maxIncome}`);
    } else {
      unmet.push(`Income must be ≤ ₹${scheme.maxIncome}`);
    }
  }

  if (scheme.category) {
    if (scheme.category === user.category) {
      matched.push(`Category: ${scheme.category}`);
    } else {
      unmet.push(`Required category: ${scheme.category}`);
    }
  }

  if (scheme.education) {
    if (scheme.education === user.education) {
      matched.push(`Education: ${scheme.education}`);
    } else {
      unmet.push(`Required education: ${scheme.education}`);
    }
  }

  return { matched, unmet };
};
