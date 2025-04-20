import React from 'react';

interface ITransportFormEmptyMessageProps {
  className: string;
}

export const TransportFormEmptyMessage: React.FC<ITransportFormEmptyMessageProps> = ({
  className,
}) => {
  return (
    <p className={className}>
      Для указания значений нагрузки на оси, пожалуйста, заполните данные тягача и полуприцепа.
    </p>
  );
};
