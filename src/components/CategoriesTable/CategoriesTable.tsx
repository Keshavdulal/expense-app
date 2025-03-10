import { useState, useEffect } from 'react'

import CategoryRow from './CategoryRow'
import CategoryAdditionForm from './CategoryAdditionForm'
import styles from './CategoriesTable.module.scss'

import useCategories from '../../hooks/useCategories'
import useTransactions from '../../hooks/useTransactions'

import { Category } from 'src/store/reducers/categories'

const emptyFormState: Category = {
  id: 0, // autoIncrement
  label: '',
}

const CategoriesTable = (): JSX.Element => {
  const { categories, addCategory, removeCategory } = useCategories() // from global store
  const { transactions } = useTransactions() // from global store
  const [userInput, setUserInput] = useState<Category>(emptyFormState) // controlled form data

  useEffect(() => resetForm(), [categories])

  // ------------------------ TABLE METHODS ------------------------

  const handleInputChange = event => {
    const newUserInput = { ...userInput, [event?.target?.name]: event?.target?.value }
    setUserInput(newUserInput)
  }

  const handleFormSubmission = event => {
    event.preventDefault()

    if (categories.length === 0) addCategory(userInput)

    // check unique id & categories
    let idExists = false
    let labelExists = false

    for (let i = 0; i < categories.length; i++) {
      if (userInput.id === categories[i].id) {
        idExists = true // enable flag
        resetForm()
        alert('Enter Unique ID') // the user
        break // the loop
      } else if (userInput.label === categories[i].label) {
        labelExists = true // enable flag
        resetForm()
        alert('Enter Unique Label') // the user
        break // the loop
      }
    }

    // safe insertion after finishing the loop
    if (!idExists && !labelExists) {
      addCategory(userInput) // to global store
    }
  }

  const resetForm = () => {
    // factor in prepopulated values to autogenerate ID
    if (categories.length > 0) {
      setUserInput({ ...emptyFormState, id: categories.at(-1)?.id + 1 })
    } else setUserInput(emptyFormState)
  }

  const handleDelBtnOnPress = event => {
    // if category has no transactions yet -> delete
    let transactionExists = false

    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].categoryId == event?.target?.id) {
        transactionExists = true
        break
      }
    }

    if (!transactionExists) {
      // safe delete
      removeCategory(event?.target?.id)
    } else if (transactionExists) {
      // TODO: provide option to merge with another category
      // Typically handled by backend as relates to data-structure

      // use modal based alerts or libs
      const message = `Transaction exists with a category called ${event?.target?.name}`

      alert(message)
    }
  }

  // ------------------------ JSX RENDERING ------------------------

  return (
    <section>
      <h2>Categories Table</h2>
      <form onSubmit={handleFormSubmission}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th>ID</th>
              <th>Label</th>
            </tr>
          </thead>
          <tbody>
            {/* Render Categories */}
            <CategoryRow handleDelBtnOnPress={handleDelBtnOnPress} />

            {/* Transaction addition Form */}
            <CategoryAdditionForm
              userInput={userInput}
              handleInputChange={handleInputChange}
              handleFormSubmission={handleFormSubmission}
            />
          </tbody>
        </table>
      </form>
    </section>
  )
}

export default CategoriesTable
