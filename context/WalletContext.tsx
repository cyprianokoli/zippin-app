// context/WalletContext.tsx
import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Transaction = {
  id: string;
  type: "add" | "ride";
  amount: number;
  date: string;
  duration?: number;
  distance?: number;
  co2Saved?: number;
};

type WalletContextType = {
  balance: number;
  transactions: Transaction[];
  addFunds: (amount: number) => void;
  deductFunds: (amount: number, rideDetails?: Partial<Transaction>) => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(12.42);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const persistData = async (
    newTransactions: Transaction[],
    newBalance: number
  ) => {
    setTransactions(newTransactions);
    setBalance(newBalance);
    await AsyncStorage.setItem("transactions", JSON.stringify(newTransactions));
    await AsyncStorage.setItem("balance", JSON.stringify(newBalance));
  };

  const addFunds = (amount: number) => {
    const newBalance = balance + amount;
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: "add",
      amount,
      date: new Date().toISOString(),
    };
    persistData([newTransaction, ...transactions], newBalance);
  };

  const deductFunds = (amount: number, rideDetails?: Partial<Transaction>) => {
    const newBalance = balance - amount;
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: "ride",
      amount,
      date: new Date().toISOString(),
      ...rideDetails,
    };
    persistData([newTransaction, ...transactions], newBalance);
  };

  return (
    <WalletContext.Provider
      value={{ balance, transactions, addFunds, deductFunds }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used inside WalletProvider");
  return context;
};
