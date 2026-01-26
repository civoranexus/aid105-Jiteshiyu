export const filterEligibleSchemes = (schemes, user) => {
  return schemes.filter((scheme) => {
    if (scheme.minIncome && user.annual_income < scheme.minIncome)
      return false;

    if (scheme.maxIncome && user.annual_income > scheme.maxIncome)
      return false;

    if (scheme.minAge && user.age < scheme.minAge) return false;

    if (scheme.maxAge && user.age > scheme.maxAge) return false;

    return true;
  });
};
