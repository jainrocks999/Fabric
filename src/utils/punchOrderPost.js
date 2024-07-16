import storage from './storageService';

const data1 = [
  {
    customerName: {
      Partyname: 'Bhatiyaji (46)',
      Partyid: '412',
      Adr1: 'B-303, Ronak Apartment,',
      Adr2: '90 Feet Road, Near Registration Office,',
      Adr3: 'Bhayander (W), Thane-401101',
      Adr4: '',
      Citycode: '0',
      City: '',
      pin: '401101',
      Districtid: 0,
      District: '',
      Statecode: null,
      State: null,
      _index: 0,
    },
    grade: '',
    design: {
      Qualityid: '2022',
      Quality: 'EDGAE',
      Design: 'EDGAE',
      Designid: '4711',
      rate: '.0000',
      Companyid: 6,
      Company: 'Imperise Fabrics Pvt Ltd',
      _index: 0,
    },
    shade: {
      design: 'EDGAE',
      designid: '4711',
      quality: 'EDGAE',
      qualityid: '2022',
      color: '3',
      colorid: '40',
      shade: 'Greyish Blue',
      shadeid: '710',
      _index: 0,
    },
    color: {
      design: 'EDGAE',
      designid: '4711',
      quality: 'EDGAE',
      qualityid: '2022',
      color: '4',
      colorid: '503',
      shade: 'D.Peach',
      shadeid: '518',
      _index: 1,
    },
    price: '30',
    matchoption: '',
    cut: 'new',
    remark: 'remove',
    remark1: 'this',
    quality: {
      Quality: 'EDGAE',
      Qualityid: '2022',
      rate: '.0000',
      companyid: 6,
      Company: 'Imperise Fabrics Pvt Ltd',
      _index: 7,
    },
    address:
      'B-303, Ronak Apartment, 90 Feet Road, Near Registration Office, Bhayander (W), Thane-401101',
    date: '10 jul 2024',
    id: 1,
    compId: '3',
  },
];
export default async value => {
  const data = new FormData();
  const salesman = await storage.getItem(storage.USER);
  data.append(`firstArray[party]`, value[0].customerName.Partyid);
  data.append(`firstArray[remark]`, value[0].remark1);
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
  data.append(`firstArray[rem]`, '');
  data.append(`firstArray[sample1]`, '');
  data.append(`firstArray[srem]`, '');
  data.append(`firstArray[comp]`, value[0].compId);
  data.append(`firstArray[sabid]`, '');
  data.append(`firstArray[udate]`, '');
  data.append('firstArray[add]', value[0].address);
  value.forEach((item, index) => {
    data.append(`secondArray[${index}][Gradeid]`, item.grade);
    data.append(`secondArray[${index}][prodid]`, item.quality.Qualityid);
    data.append(`secondArray[${index}][dsnoid]`, item.design.Designid);
    data.append(`secondArray[${index}][shade]`, item.shade.shadeid);
    data.append(`secondArray[${index}][color]`, item.color.colorid);
    data.append(`secondArray[${index}][pcs]`, '');
    data.append(`secondArray[${index}][qty]`, ' ');
    data.append(`secondArray[${index}][cutper]`, item.cut);
    data.append(`secondArray[${index}][rate]`, item.quality.rate);
    data.append(`secondArray[${index}][sabrowid]`, '');
    data.append(`secondArray[${index}][unit]`, '');
    data.append(`secondArray[${index}][amount]`, item.price);
    data.append(`secondArray[${index}][comp]`, item.compId);
    data.append(`secondArray[${index}][rowid]`, '');
    data.append(`secondArray[${index}][sabid]`, '');
    data.append(`secondArray[${index}][udate]`, '');
    data.append(`secondArray[${index}][remark]`, item.remark);
  });
  return data;
};
{
  /*


;-
data.append('firstArray[remark]', 'wffg');-
data.append('secondArray[0][Gradeid]', '2');-
data.append('secondArray[0][prodid]', '4');-
data.append('secondArray[0][dsnoid]', '4');-
data.append('secondArray[0][[shade]]', '2');-
data.append('secondArray[0][color]', '3');-
data.append('secondArray[0][pcs]', '3');-
data.append('secondArray[0][qty]', '5');-
data.append('secondArray[0][cutper]', '3');-
data.append('secondArray[0][rate]', '68');-
data.append('secondArray[0][sabrowid]', '2');-
data.append('secondArray[0][unit]', '5');-
data.append('secondArray[0][amount]', '35');-
data.append('secondArray[0][comp]', '7')-;
data.append('secondArray[0][rowid]', '4');-
data.append('secondArray[0][sabid]', '8');-
data.append('secondArray[0][udate]', '2455');
data.append('secondArray[0][remark]', 'dgfhffhfhc x csh');
data.append('firstArray[entdt]', '');
data.append('firstArray[pono]', '');
data.append('firstArray[refdt]', '');
data.append('firstArray[brok]', '');
data.append('firstArray[salesman]', '');
data.append('firstArray[hast]', '');
data.append('firstArray[delat]', '');
data.append('firstArray[bkth]', '');
data.append('firstArray[trsp]', '');
data.append('firstArray[deldate]', '');
data.append('firstArray[rem]', '');
data.append('firstArray[sample1]', '');
data.append('firstArray[srem]', '');
data.append('firstArray[comp]', '');
data.append('firstArray[sabid]', '');
data.append('firstArray[udate]', '');
*/
}
