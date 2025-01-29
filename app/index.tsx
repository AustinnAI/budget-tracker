import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; 
import TransactionItem from "./components/TransactionItem";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./_layout"; // ✅ Import navigation types


type Transaction = {
  id: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string; // Use Date if needed
};

export default function HomeScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>(); // ✅ Correctly typed
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetchTransactions = async () => {
      const querySnapshot = await getDocs(collection(db, "transactions"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Transaction[];
      setTransactions(data);
    };

    fetchTransactions();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === "dark" ? "#333" : "#fff" }]}>
      <View style={styles.summary}>
        <Text style={{ color: colorScheme === "dark" ? "#fff" : "#000" }}>
          Total Transactions: {transactions.length}
        </Text>
      </View>
      <Button title="Add Transaction" onPress={() => navigation.navigate("AddTransaction")} /> {/* ✅ Now correctly typed */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  summary: { marginBottom: 16 },
});
