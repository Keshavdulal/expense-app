import { useGlobalStore } from '../store'

import bindActions from '../store/bindActions'
import transactionsReducer, { Transaction } from '../store/reducers/transactions'

// Custom Hook to expose all the props and binded actions
const useTransactions = () => {
  const { state, dispatch } = useGlobalStore()

  // List of Props
  const transactions: Transaction[] = state?.transactions

  // List of Actions
  const addTransaction = transactionsReducer?.actions?.addTransaction
  const addMultipleTransactions = transactionsReducer?.actions?.addMultipleTransactions
  const resetTransactions = transactionsReducer?.actions?.resetTransactions

  // Bind all Actions to globalDispatch (important)
  const boundActions = bindActions(
    {
      addTransaction,
      addMultipleTransactions,
      resetTransactions,
    },
    dispatch
  )

  // expose
  return { transactions, ...boundActions } as any
}

export default useTransactions
