const ActionButton = ({ status }) => {
  switch (status) {
    case 'waiting_for_delivery':
      return 'Payment Details';
    case 'on_the_way':
      return 'Payment Details & Delivery Details';
    case 'success':
      return 'Payment Details & Delivery Details';
    default:
      return 'No Action Needs';
  }
};

export default ActionButton;
