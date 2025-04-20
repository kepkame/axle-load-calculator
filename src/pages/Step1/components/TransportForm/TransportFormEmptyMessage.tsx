interface TransportFormEmptyMessageProps {
  className: string;
}

export const TransportFormEmptyMessage: React.FC<TransportFormEmptyMessageProps> = ({
  className,
}) => {
  return (
    <p className={className}>
      Для указания значений нагрузки на оси, пожалуйста, заполните данные тягача и полуприцепа.
    </p>
  );
};
