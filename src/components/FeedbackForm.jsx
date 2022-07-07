import { useState } from 'react'

import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'

function FeedbackForm({ handleAdd }) {
  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const handleTextChange = (e) => {
    if(text === '') {
      setButtonDisabled(true)
      setMessage(null)
    } else if (text !== '' && text.trim().length <= 10) {
      setButtonDisabled(true) 
      setMessage('Text must be at least 10 characters')
    } else {
      setButtonDisabled(false)
      setMessage(null)
    }

    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(text.trim().length > 10) {
      const newFeedback = {
        text,
        rating
      }

      handleAdd(newFeedback)

      setText('')
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)}/>
        <div className="input-group">
          <input type="text" placeholder='Write a review' onChange={handleTextChange} value={text} />
          <Button type="submit" isDisabled={buttonDisabled}>Send</Button>
        </div>

        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm