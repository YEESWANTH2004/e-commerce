import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
  id: '1',
  deliveryTime: 7,
  priceCents: 0
},{
  id: '2',
  deliveryTime: 3,
  priceCents: 499
},{
  id: '3',
  deliveryTime: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;

    deliveryOptions.forEach((option) => {
      if(option.id === deliveryOptionId){
        deliveryOption = option;
      }
    });

    return deliveryOption;
  }

  function isWeekend(date){
    const dayWeek = date.format('dddd');
    return dayWeek === 'Saturday' || dayWeek === 'Sunday';
  }

  export function calculateDeliveryDate(deliveryOption){
      let remainingDays = deliveryOption.deliveryTime;
      let deliveryDate = dayjs();

      while(remainingDays > 0) {
        deliveryDate = deliveryDate.add(1, 'day');

        if(!isWeekend(deliveryDate)){
          remainingDays--;
        }
      }
      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );

      return dateString;
  }