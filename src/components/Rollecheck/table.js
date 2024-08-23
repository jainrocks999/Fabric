import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {DataTable} from 'react-native-paper';

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
    qty: '.1000',
    SABROWID: '2571318',
    barcode: '750000031',
    COMPANY: 'Infino Clothing Llp',
    COMPANYid: 7,
  },
  // Add more items if needed
];

const TableComponent = () => {
  const renderItem = ({item}) => (
    <DataTable.Row>
      <DataTable.Cell style={styles.cell}>{item.barcode}</DataTable.Cell>
      <DataTable.Cell style={styles.cell}>{item.DESIGNid}</DataTable.Cell>
      <DataTable.Cell style={styles.cell}>{item.SHADE}</DataTable.Cell>
      <DataTable.Cell style={styles.cell}>{item.qty}</DataTable.Cell>
    </DataTable.Row>
  );

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title textStyle={styles.headerText}>
            Barcode
          </DataTable.Title>
          <DataTable.Title textStyle={styles.headerText}>
            Design
          </DataTable.Title>
          <DataTable.Title textStyle={styles.headerText}>Shade</DataTable.Title>
          <DataTable.Title textStyle={styles.headerText}>
            Quantity (Meter)
          </DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={data}
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
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  tableHeader: {
    backgroundColor: '#6200ee',
  },
  headerText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  cell: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
});

export default TableComponent;
