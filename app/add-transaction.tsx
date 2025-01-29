import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { collection, addDoc } from "firebase/firestore"; // Firestore functions
import { db } from "../firebaseConfig"; // Firestore database reference
import { NativeStackScreenProps } from "@react-navigation/native-stack"; // Navigation props
import { RootStackParamList } from "./_layout"; // Navigation types

// Define navigation props type
type AddTransactionScreenProps = NativeStackScreenProps<RootStackParamList, "AddTransaction">;

export default function AddTransactionScreen({ navigation }: AddTransactionScreenProps) {
  const [amount, setAmount] = useState(""); // State for amount
  const [type, setType] = useState("income"); // State for type (default: income)
  const [category, setCategory] = useState(""); // State for category
  const [loading, setLoading] = useState(false); // Loading state to prevent duplicate submissions

  // Function to handle adding a transaction
  const handleAddTransaction = async () => {
    // Validate inputs
    if (!amount || !category) {
      Alert.alert("Error", "Please fill out all fields"); // Alert if fields are empty
      return;
    }

    setLoading(true); // Show loading spinner while processing

    try {
      // Add a new transaction to Firestore
      await addDoc(collection(db, "transactions"), {
        amount: parseFloat(amount), // Parse amount to a number
        type,
        category,
        date: new Date().toISOString(), // Add current timestamp
      });

      Alert.alert("Success", "Transaction added successfully!"); // Alert success
      navigation.goBack(); // Navigate back to the home screen
    } catch (error) {
      console.error("Error adding transaction:", error); // Log error for debugging
      Alert.alert("Error", "Failed to add transaction. Please try again."); // Alert failure
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric" // Numeric keyboard for amount input
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
      />

      <Text style={styles.label}>Type</Text>
      <TextInput
        style={styles.input}
        value={type}
        onChangeText={setType}
        placeholder="income or expense" // Input placeholder for type
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="e.g., Rent, Groceries" // Input placeholder for category
      />

      {loading ? ( // Show spinner when loading
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Add Transaction" onPress={handleAddTransaction} /> // Submit button
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9", // Light background
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#fff", // White background for inputs
  },
});
