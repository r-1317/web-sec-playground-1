export interface PasswordStrengthResult {
  score: number; // 0-4 (0: 非常に弱い, 1: 弱い, 2: 普通, 3: 強い, 4: 非常に強い)
  label: string;
  color: string;
  percentage: number;
  suggestions: string[];
}

export const calculatePasswordStrength = (password: string): PasswordStrengthResult => {
  if (!password) {
    return {
      score: 0,
      label: "",
      color: "gray",
      percentage: 0,
      suggestions: []
    };
  }

  let score = 0;
  const suggestions: string[] = [];

  // 長さのチェック
  if (password.length >= 8) {
    score += 1;
  } else {
    suggestions.push("8文字以上にしてください");
  }

  if (password.length >= 12) {
    score += 1;
  } else if (password.length >= 8) {
    suggestions.push("12文字以上にするとより安全です");
  }

  // 小文字のチェック
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    suggestions.push("小文字を含めてください");
  }

  // 大文字のチェック
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    suggestions.push("大文字を含めてください");
  }

  // 数字のチェック
  if (/[0-9]/.test(password)) {
    score += 1;
  } else {
    suggestions.push("数字を含めてください");
  }

  // 特殊文字のチェック
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  } else {
    suggestions.push("特殊文字（!@#$%^&*など）を含めてください");
  }

  // 最大スコアを4に制限
  score = Math.min(score, 4);

  // スコアに基づいてラベルと色を決定
  let label: string;
  let color: string;

  switch (score) {
    case 0:
    case 1:
      label = "非常に弱い";
      color = "red";
      break;
    case 2:
      label = "弱い";
      color = "orange";
      break;
    case 3:
      label = "普通";
      color = "yellow";
      break;
    case 4:
      label = "強い";
      color = "green";
      break;
    default:
      label = "非常に強い";
      color = "green";
      break;
  }

  const percentage = (score / 4) * 100;

  return {
    score,
    label,
    color,
    percentage,
    suggestions: suggestions.slice(0, 3) // 最大3つまでの提案
  };
};
