import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(incomeTransaction => incomeTransaction.value)
      .reduce((acc = 0, incomeTransaction) => {
        return acc + incomeTransaction;
      }, 0);
    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(outcomeTransaction => outcomeTransaction.value)
      .reduce((acc, outcomeTransaction) => {
        return acc + outcomeTransaction;
      }, 0);
    const total = income - outcome;
    const balance = { income, outcome, total };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
