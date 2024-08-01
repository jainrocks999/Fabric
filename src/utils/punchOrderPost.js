import storage from './storageService';

export default async value => {
  console.log(value);
  const data = new FormData();
  const salesman = await storage.getItem(storage.USER);
  data.append(`firstArray[party]`, value[0].customerName.Partyid);
  data.append(`firstArray[entdt]`, '');
  data.append(`firstArray[pono]`, '');
  data.append(`firstArray[refdt]`, '');
  data.append(`firstArray[brok]`, '');
  data.append(`firstArray[salesman]`, salesman.salesmanid);
  data.append(`firstArray[hast]`, '');
  data.append(`firstArray[delat]`, '');
  data.append(`firstArray[bkth]`, '');
  data.append(`firstArray[trsp]`, '');
  data.append(`firstArray[deldate]`, '');
  data.append(
    `firstArray[rem]`,
    value[0].remark1 == '' ? 'NA' : value[0].remark1,
  );
  data.append(`firstArray[sample1]`, '');
  data.append(`firstArray[srem]`, '');
  data.append(`firstArray[comp]`, value[0].compId);
  data.append(`firstArray[sabid]`, '');
  data.append(`firstArray[udate]`, value[0].currentDate); //yy-mm-dd
  data.append('firstArray[add]', value[0].address);
  value.forEach((item, index) => {
    data.append(`secondArray[${index}][Gradeid]`, item.grade);
    data.append(`secondArray[${index}][prodid]`, item.quality.Qualityid); //
    data.append(`secondArray[${index}][dsnoid]`, item.design.Designid);
    data.append(`secondArray[${index}][shade]`, item.shade.shadeid);
    data.append(`secondArray[${index}][color]`, item.color.colorid);
    data.append(`secondArray[${index}][pcs]`, '');
    data.append(`secondArray[${index}][qty]`, ' ');
    data.append(`secondArray[${index}][cutper]`, item.cut);
    data.append(`secondArray[${index}][rate]`, item.design.rate); // design rate
    data.append(`secondArray[${index}][sabrowid]`, '');
    data.append(`secondArray[${index}][unit]`, '');
    data.append(`secondArray[${index}][amount]`, item.price);
    data.append(`secondArray[${index}][comp]`, item.compId);
    data.append(`secondArray[${index}][rowid]`, '');
    data.append(`secondArray[${index}][sabid]`, '');
    data.append(`secondArray[${index}][udate]`, item.currentDate); //current date
    data.append(
      `secondArray[${index}][remark]`,
      item.remark != '' ? item.remark : 'NA',
    );
  });
  return data;
};
{
  /*

Raju firstArray[party]:3897
firstArray[add]:address
//firstArray[remark]:today test  order
secondArray[0][Gradeid]:
secondArray[0][prodid]:2020
secondArray[0][dsnoid]:4713
secondArray[0][shade]:532
secondArray[0][color]:303
secondArray[0][pcs]:00
secondArray[0][qty]:00
secondArray[0][cutper]:5.00
secondArray[0][rate]:00
secondArray[0][sabrowid]:
secondArray[0][unit]:
secondArray[0][amount]:6
secondArray[0][comp]:6
//secondArray[0][rowid]:
secondArray[0][sabid]:
secondArray[0][udate]:2024-8-1
secondArray[0][remark]:first Agust test order
firstArray[entdt]:
firstArray[pono]:
firstArray[refdt]:
firstArray[brok]:
firstArray[salesman]:1
firstArray[hast]:
firstArray[delat]:
firstArray[bkth]:
firstArray[trsp]:
firstArray[deldate]:
firstArray[rem]:first Agust test order
firstArray[sample1]:
firstArray[srem]:
firstArray[comp]:6
firstArray[sabid]:
firstArray[udate]:2024-8-1

*/
}
