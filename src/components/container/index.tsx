import React from 'react';

interface IProps {
  className?: string;
  children: React.ReactNode;
  isSection?: boolean;
}

export default function Container({
  children,
  className,
  isSection = false,
}: IProps) {
  return isSection ? (
    <section
      className={`container mx-auto w-full sm:max-w-[720px] md:max-w-[960px] lg:max-w-[1180px] ${className}`}
    >
      {children}
    </section>
  ) : (
    <div
      className={`container mx-auto w-full sm:max-w-[720px] md:max-w-[960px] lg:max-w-[1180px] ${className}`}
    >
      {children}
    </div>
  );
}
