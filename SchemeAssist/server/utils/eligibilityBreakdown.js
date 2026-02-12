export const filterEligibleSchemes = (schemes, user) => {
  return schemes.filter((scheme) => {
    if (scheme.minAge !== undefined && user.age < scheme.minAge)
      return false;

    if (scheme.maxAge !== undefined && user.age > scheme.maxAge)
      return false;

    if (
      scheme.minIncome !== undefined &&
      user.annual_income < scheme.minIncome
    )
      return false;

    if (
      scheme.maxIncome !== undefined &&
      user.annual_income > scheme.maxIncome
    )
      return false;

    if (scheme.category && scheme.category !== user.category)
      return false;

    if (scheme.education && scheme.education !== user.education)
      return false;

    return true;
  });
};

export const getEligibilityBreakdown = (scheme, user) => {
  const matched = [];
  const unmet = [];

  if (scheme.minAge !== undefined) {
    user.age >= scheme.minAge
      ? matched.push(`Age ≥ ${scheme.minAge}`)
      : unmet.push(`Age must be ≥ ${scheme.minAge}`);
  }

  if (scheme.maxAge !== undefined) {
    user.age <= scheme.maxAge
      ? matched.push(`Age ≤ ${scheme.maxAge}`)
      : unmet.push(`Age must be ≤ ${scheme.maxAge}`);
  }

  if (scheme.minIncome !== undefined) {
    user.annual_income >= scheme.minIncome
      ? matched.push(`Income ≥ ₹${scheme.minIncome}`)
      : unmet.push(`Income must be ≥ ₹${scheme.minIncome}`);
  }

  if (scheme.maxIncome !== undefined) {
    user.annual_income <= scheme.maxIncome
      ? matched.push(`Income ≤ ₹${scheme.maxIncome}`)
      : unmet.push(`Income must be ≤ ₹${scheme.maxIncome}`);
  }

  if (scheme.category) {
    scheme.category === user.category
      ? matched.push(`Category: ${scheme.category}`)
      : unmet.push(`Required category: ${scheme.category}`);
  }

  if (scheme.education) {
    scheme.education === user.education
      ? matched.push(`Education: ${scheme.education}`)
      : unmet.push(`Required education: ${scheme.education}`);
  }

  return { matched, unmet };
};
