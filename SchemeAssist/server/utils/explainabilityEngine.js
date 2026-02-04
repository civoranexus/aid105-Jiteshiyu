const MATCH_LEVELS = {
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW",
};

const FACTOR_WEIGHTS = {
  Income: 0.35,
  Age: 0.30,
  Category: 0.20,
  Education: 0.15,
};

const getMatchLevel = (isMatch) => {
  return isMatch ? MATCH_LEVELS.HIGH : MATCH_LEVELS.LOW;
};

export const generateExplainabilityReport = (scheme, user) => {
  const factors = [];
  let totalScore = 0;

  if (scheme.maxIncome) {
    const isMatch = user.annual_income <= scheme.maxIncome;
    const contribution = FACTOR_WEIGHTS.Income * (isMatch ? 100 : 20);

    factors.push({
      factor: "Income",
      user_value: `₹${user.annual_income}`,
      scheme_requirement: `≤ ₹${scheme.maxIncome}`,
      match_level: getMatchLevel(isMatch),
      contribution: Math.round(contribution),
      message: isMatch
        ? "Your income falls within the eligible threshold."
        : "Income exceeds the scheme threshold.",
    });

    totalScore += contribution;
  }

  if (scheme.minAge && scheme.maxAge) {
    const isMatch =
      user.age >= scheme.minAge && user.age <= scheme.maxAge;

    const contribution = FACTOR_WEIGHTS.Age * (isMatch ? 100 : 20);

    factors.push({
      factor: "Age",
      user_value: `${user.age}`,
      scheme_requirement: `${scheme.minAge}-${scheme.maxAge}`,
      match_level: getMatchLevel(isMatch),
      contribution: Math.round(contribution),
      message: isMatch
        ? "Your age is within the scheme’s target range."
        : "Age does not fall within the scheme range.",
    });

    totalScore += contribution;
  }

  if (scheme.category) {
    const isMatch = scheme.category === user.category;
    const contribution = FACTOR_WEIGHTS.Category * (isMatch ? 100 : 20);

    factors.push({
      factor: "Category",
      user_value: user.category,
      scheme_requirement: scheme.category,
      match_level: getMatchLevel(isMatch),
      contribution: Math.round(contribution),
      message: isMatch
        ? "Your category matches the scheme eligibility group."
        : "Scheme is targeted at a different category.",
    });

    totalScore += contribution;
  }

  if (scheme.education) {
    const isMatch = scheme.education === user.education;
    const contribution = FACTOR_WEIGHTS.Education * (isMatch ? 100 : 20);

    factors.push({
      factor: "Education",
      user_value: user.education,
      scheme_requirement: scheme.education,
      match_level: getMatchLevel(isMatch),
      contribution: Math.round(contribution),
      message: isMatch
        ? "Your education level aligns with scheme requirements."
        : "Education requirement differs from your profile.",
    });

    totalScore += contribution;
  }

  const overall_match = Math.min(100, Math.round(totalScore));

  const summary =
    overall_match >= 80
      ? "Highly relevant based on strong profile alignment."
      : overall_match >= 50
      ? "Moderately relevant with partial eligibility alignment."
      : "Low relevance due to weak eligibility match.";

  return {
    summary,
    overall_match,
    factors: factors.sort((a, b) => b.contribution - a.contribution),
  };
};
