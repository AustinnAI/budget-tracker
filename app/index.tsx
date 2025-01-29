import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; 
import TransactionItem from "./components/TransactionItem";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./_layout";

type Transaction = {
  id: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
};

export default function HomeScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "transactions"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Transaction[];
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false); // Ensure loading state updates
      }
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
      <Button title="Add Transaction" onPress={() => navigation.navigate("AddTransaction")} />
      
      {loading ? ( // Show loading indicator
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  summary: { marginBottom: 16 },
});
