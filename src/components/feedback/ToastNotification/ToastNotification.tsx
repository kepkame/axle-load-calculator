interface ToastNotificationProps {
  type: string;
  message: string;
  duration: number;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  type = 'success',
  message = 'Данные успешно сохранены',
  duration = 5000,
}) => {
  return (
    <div>
      <div>{type}</div>
      <div>{message}</div>
      <div>{duration}</div>
    </div>
  );
};
