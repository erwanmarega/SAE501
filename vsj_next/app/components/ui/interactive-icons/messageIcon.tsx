"use client";

import React, { useState } from "react";

interface IconProps {
  isSelected: boolean;
  color?: string;
}

const MessageIcon: React.FC<IconProps> = ({ isSelected, color }) => {
  const [hoverEffect, setHoverEffect] = useState(false);
  return (
    <svg
      width="38"
      height="34"
      viewBox="0 0 53 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
      onMouseEnter={() => setHoverEffect(true)}
      onMouseLeave={() => setHoverEffect(false)}
    >
      <path
        d="M8.5325 1.02C13.72 0.345 19.0075 0 24.375 0C29.7425 0 35.03 0.3475 40.2175 1.02C45.0225 1.645 48.445 5.6725 48.73 10.3375C47.8942 10.0591 47.028 9.88196 46.15 9.81C39.1454 9.22853 32.1046 9.22853 25.1 9.81C19.205 10.3 15 15.285 15 20.895V31.61C14.9976 33.6694 15.5644 35.6895 16.6378 37.4471C17.7112 39.2047 19.2493 40.6315 21.0825 41.57L14.45 48.2C14.1878 48.4619 13.8538 48.6402 13.4903 48.7124C13.1268 48.7846 12.7501 48.7475 12.4077 48.6057C12.0653 48.4639 11.7726 48.2239 11.5665 47.9158C11.3605 47.6078 11.2503 47.2456 11.25 46.875V36.8C10.343 36.7036 9.4371 36.5969 8.5325 36.48C3.5125 35.825 0 31.4575 0 26.53V10.97C0 6.045 3.5125 1.6725 8.5325 1.02Z"
        className={`transition-colors ${
          color
            ? "fill-secondary-message"
            : !isSelected && !hoverEffect
            ? "fill-icon-inactive-light dark:fill-icon-inactive-dark"
            : "fill-secondary-message"
        }`}
      />
      <path
        d="M35.625 13.125C32.185 13.125 28.7775 13.2675 25.41 13.5475C21.56 13.8675 18.75 17.1325 18.75 20.8975V31.61C18.75 35.3775 21.57 38.645 25.425 38.96C28.5325 39.215 31.675 39.3525 34.845 39.3725L41.8 46.325C42.0622 46.5869 42.3962 46.7652 42.7597 46.8374C43.1232 46.9096 43.4999 46.8725 43.8423 46.7307C44.1847 46.5889 44.4774 46.3489 44.6835 46.0408C44.8895 45.7328 44.9997 45.3706 45 45V39.025L45.825 38.96C49.68 38.6475 52.5 35.3775 52.5 31.61V20.895C52.5 17.1325 49.6875 13.8675 45.84 13.545C42.4423 13.264 39.0343 13.1239 35.625 13.125Z"
        className={`transition-colors ${
          color
            ? "fill-secondary-message"
            : !isSelected && !hoverEffect
            ? "fill-icon-inactive-light dark:fill-icon-inactive-dark"
            : "fill-secondary-message"
        }`}
      />
    </svg>
  );
};

export default MessageIcon;
