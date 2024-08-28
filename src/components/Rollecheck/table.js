import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {DataTable, Text} from 'react-native-paper';
import colors from '../../assets/colors';

const data = [
  {
    entno: '000005',
    ENTDT: '2024-04-01 00:00:00',
    Party: 'Inr',
    partyid: 3465,
    qualityid: '1097',
    DESIGNid: '1706',
    shadeid: '1369',
    SHADE: 'T.Blue/L.Maroon',
    colorid: '303',
    color: '1',
    qty: '3.1000',
    SABROWID: '2571318',
    barcode: '750000031',
    COMPANY: 'Infino Clothing Llp',
    COMPANYid: 7,
  },
  {
    entno: '000005',
    ENTDT: '2024-04-01 00:00:00',
    Party: 'Inr',
    partyid: 3465,
    qualityid: '1097',
    DESIGNid: '1706',
    shadeid: '1369',
    SHADE: 'T.Blue/L.Maroon',
    colorid: '303',
    color: '1',
    qty: '14.1000',
    SABROWID: '2571318',
    barcode: '750000031',
    COMPANY: 'Infino Clothing Llp',
    COMPANYid: 7,
  },
  // Add more items if needed
];

const TableComponent = ({data1}) => {
  console.log('hjjgjhgj', data);
  const renderItem = ({item}) => (
    <DataTable.Row style={styles.row}>
      <DataTable.Cell style={[styles.cell, {alignItems: 'center'}]}>
        <Text style={[styles.cellText, {marginLeft: '-6%'}]}>
          {item.barcode}
        </Text>
        {console.log('dfjkjfksjf', item)}
      </DataTable.Cell>
      <View style={{borderWidth: 0.3, borderColor: 'grey'}} />
      <DataTable.Cell style={styles.cell}>
        <Text style={styles.cellText}>{item.DESIGNid}</Text>
      </DataTable.Cell>
      <View style={{borderWidth: 0.3, borderColor: 'grey'}} />
      <DataTable.Cell style={styles.cell}>
        <Text style={styles.cellText}>{item.SHADE}</Text>
      </DataTable.Cell>
      <View style={{borderWidth: 0.3, borderColor: 'grey'}} />
      <DataTable.Cell style={styles.cell}>
        <Text style={[styles.cellText, {marginLeft: '16%'}]}>
          {parseFloat(item?.qty)?.toFixed(2)}
        </Text>
      </DataTable.Cell>
    </DataTable.Row>
  );

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title
            textStyle={styles.headerText}
            style={styles.headerCell}>
            {'Barcode   '}
          </DataTable.Title>
          <View style={{borderWidth: 0.3, borderColor: 'grey'}} />
          <DataTable.Title
            textStyle={styles.headerText}
            style={styles.headerCell}>
            Design
          </DataTable.Title>
          <View style={{borderWidth: 0.3, borderColor: 'grey'}} />
          <DataTable.Title
            textStyle={styles.headerText}
            style={styles.headerCell}>
            Shade
          </DataTable.Title>
          <View style={{borderWidth: 0.3, borderColor: 'grey'}} />
          <DataTable.Title
            textStyle={styles.headerText}
            style={styles.headerCell}>
            {'     Quantity'}
          </DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={data1}
          renderItem={renderItem}
          keyExtractor={item => item.barcode.toString()}
        />
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    // backgroundColor: '#f4f4f4',
    marginTop: '5%',
  },
  tableHeader: {
    backgroundColor: colors.color1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerCell: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  headerText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  row: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1.5,
    borderBottomColor: '#d3d3d3',
  },
  cell: {
    // borderWidth: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    color: '#333333',
    fontSize: 13,
    // marginLeft: -3,
  },
});

export default TableComponent;

// import React from 'react';
// import {View, Text, StyleSheet, FlatList} from 'react-native';
// import {DataTable} from 'react-native-paper';

// const data = [
//   {
//     entno: '000005',
//     ENTDT: '2024-04-01 00:00:00',
//     Party: 'Inr',
//     partyid: 3465,
//     qualityid: '1097',
//     DESIGNid: '1706',
//     shadeid: '1369',
//     SHADE: 'T.Blue/L.Maroon',
//     colorid: '303',
//     color: '1',
//     qty: '.1000',
//     SABROWID: '2571318',
//     barcode: '750000031',
//     COMPANY: 'Infino Clothing Llp',
//     COMPANYid: 7,
//   },
//   // Add more items if needed
// ];

// const TableComponent = () => {
//   const renderItem = ({item}) => (
//     <DataTable.Row style={styles.row}>
//       <DataTable.Cell style={styles.cell}>{item.barcode}</DataTable.Cell>
//       <DataTable.Cell style={styles.cell}>{item.DESIGNid}</DataTable.Cell>
//       <DataTable.Cell style={styles.cell}>{item.SHADE}</DataTable.Cell>
//       <DataTable.Cell style={styles.cell}>{item.qty}</DataTable.Cell>
//     </DataTable.Row>
//   );

//   return (
//     <View style={styles.container}>
//       <DataTable>
//         <DataTable.Header style={styles.tableHeader}>
//           <DataTable.Title textStyle={styles.headerText}>
//             Barcode
//           </DataTable.Title>
//           <DataTable.Title textStyle={styles.headerText}>
//             Design
//           </DataTable.Title>
//           <DataTable.Title textStyle={styles.headerText}>Shade</DataTable.Title>
//           <DataTable.Title textStyle={styles.headerText}>
//             Quantity (Meter)
//           </DataTable.Title>
//         </DataTable.Header>

//         <FlatList
//           data={data}
//           renderItem={renderItem}
//           keyExtractor={item => item.barcode.toString()}
//         />
//       </DataTable>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 0,
//     backgroundColor: '#f9f9f9',
//     marginTop: '5%',
//   },
//   tableHeader: {
//     backgroundColor: 'grey',
//     borderWidth: 0.5,
//     borderColor: 'black',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   headerText: {
//     color: '#ffffff',
//     fontWeight: 'bold',
//   },
//   cell: {
//     padding: 8,
//     borderWidth: 1,
//     borderColor: '#d3d3d3',
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default TableComponent;
