export type FinebankTransactionRow = {
  id: string
  item: string
  shopName: string
  date: string
  paymentMethod: string
  amount: string
  icon: 'gamepad' | 'shirt' | 'biryani' | 'movie' | 'taxi' | 'pizza' | 'keyboard'
}

export const finebankTransactionsAll: FinebankTransactionRow[] = [
  {
    id: 't1',
    item: 'GTR 5',
    shopName: 'Gadget & Gear',
    date: '17 May, 2023',
    paymentMethod: 'Credit Card',
    amount: '$160.00',
    icon: 'gamepad',
  },
  {
    id: 't2',
    item: 'Polo shirt',
    shopName: 'XL fashions',
    date: '17 May, 2023',
    paymentMethod: 'Credit Card',
    amount: '$20.00',
    icon: 'shirt',
  },
  {
    id: 't3',
    item: 'Biriyani',
    shopName: 'Haji Biriyani',
    date: '17 May, 2023',
    paymentMethod: 'Credit Card',
    amount: '$12.00',
    icon: 'biryani',
  },
  {
    id: 't4',
    item: 'Movie ticket',
    shopName: 'Inox',
    date: '17 May, 2023',
    paymentMethod: 'Credit Card',
    amount: '$15.00',
    icon: 'movie',
  },
  {
    id: 't5',
    item: 'Taxi fare',
    shopName: 'Uber',
    date: '17 May, 2023',
    paymentMethod: 'Credit Card',
    amount: '$10.00',
    icon: 'taxi',
  },
  {
    id: 't6',
    item: 'Pizza',
    shopName: 'Pizza Hit',
    date: '17 May, 2023',
    paymentMethod: 'Credit Card',
    amount: '$20.00',
    icon: 'pizza',
  },
  {
    id: 't7',
    item: 'Keyboard',
    shopName: 'Gadget & Gear',
    date: '17 May, 2023',
    paymentMethod: 'Credit Card',
    amount: '$30.00',
    icon: 'keyboard',
  },
]

export const finebankTransactionsRevenue = finebankTransactionsAll.slice(0, 3)
export const finebankTransactionsExpenses = finebankTransactionsAll.slice(3)

