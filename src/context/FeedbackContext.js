import { createContext, useState } from "react"
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This item is from context',
      rating: 10
    },
    {
      id: 2,
      text: 'This item is from context',
      rating: 9
    },
    {
      id: 3,
      text: 'This item is from context',
      rating: 5
    }
  ])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  const deleteFeedback = (id) => {
    if(window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter(o => o.id !== id))
    }
  }

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  const updateFeedback = (id, updatedItem) => {
    setFeedback(feedback.map((item) => {
      return item.id === id ? { ...item, ...updatedItem} : item
    }))
  }
  
  return <FeedbackContext.Provider 
    value={{
      feedback, //feedback: feedback,
      feedbackEdit,
      deleteFeedback, 
      addFeedback,
      editFeedback,
      updateFeedback
    }}
  >
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext