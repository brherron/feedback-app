import { createContext, useEffect, useState } from "react"

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  //Fetch data.
  const fetchFeedback = async () => {
    const response = await fetch("/feedback?_sort=id&_order=desc")

    const data = await response.json()
    
    setFeedback(data)
    setLoading(false)
  }

  const deleteFeedback = async (id) => {
    if(window.confirm('Are you sure you want to delete?')) {
      await fetch(`/feedback/${id}`, {
        method: 'DELETE'
      })

      setFeedback(feedback.filter(o => o.id !== id))
    }
  }

  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback)
    })

    const data = await response.json()

    setFeedback([data, ...feedback])
  }

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  const updateFeedback = async (id, updatedItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedItem)
    })

    const data = await response.json()

    setFeedback(feedback.map((item) => {
      return item.id === id ? { ...item, ...data} : item
    }))
  }
  
  return <FeedbackContext.Provider 
    value={{
      feedback, //feedback: feedback,
      feedbackEdit,
      loading,
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