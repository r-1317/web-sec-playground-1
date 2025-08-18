import React from "react";
import { calculatePasswordStrength, PasswordStrengthResult } from "@/app/_utils/passwordStrength";

interface PasswordStrengthIndicatorProps {
  password: string;
  className?: string;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
  className = ""
}) => {
  const strength: PasswordStrengthResult = calculatePasswordStrength(password);

  if (!password) {
    return null;
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case "red":
        return "bg-red-500 text-red-700 border-red-200";
      case "orange":
        return "bg-orange-500 text-orange-700 border-orange-200";
      case "yellow":
        return "bg-yellow-500 text-yellow-700 border-yellow-200";
      case "green":
        return "bg-green-500 text-green-700 border-green-200";
      default:
        return "bg-gray-500 text-gray-700 border-gray-200";
    }
  };

  const getProgressBarColor = (color: string) => {
    switch (color) {
      case "red":
        return "bg-red-500";
      case "orange":
        return "bg-orange-500";
      case "yellow":
        return "bg-yellow-500";
      case "green":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className={`mt-2 ${className}`}>
      {/* プログレスバー */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">パスワード強度</span>
          <span className={`text-sm font-medium ${strength.color === 'red' ? 'text-red-600' : 
            strength.color === 'orange' ? 'text-orange-600' : 
            strength.color === 'yellow' ? 'text-yellow-600' : 
            strength.color === 'green' ? 'text-green-600' : 'text-gray-600'}`}>
            {strength.label}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(strength.color)}`}
            style={{ width: `${strength.percentage}%` }}
          />
        </div>
      </div>

      {/* 改善提案 */}
      {strength.suggestions.length > 0 && (
        <div className="text-sm text-gray-600">
          <div className="font-medium mb-1">改善提案：</div>
          <ul className="list-disc list-inside space-y-1">
            {strength.suggestions.map((suggestion, index) => (
              <li key={index} className="text-xs">
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
