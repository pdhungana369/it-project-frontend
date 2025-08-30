const formatMoney = (text: string | number) => {
  if (!text) return;
  return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
export default formatMoney;
