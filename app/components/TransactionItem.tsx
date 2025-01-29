import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TransactionItem({ transaction }) {
  return (
    <View style={styles.container}>
      <Text>{transaction.category}</Text>
      <Text>${transaction.amount}</Text>
      <Text>{transaction.type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
  },
});
