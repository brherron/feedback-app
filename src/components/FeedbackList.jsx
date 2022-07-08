import { motion, AnimatePresence } from 'framer-motion'
import { useContext } from 'react'
import FeedbackItem from "./FeedbackItem"
import FeedbackContext from '../context/FeedbackContext'
import { FaSpinner } from 'react-icons/fa'

function FeedbackList() {
  const { feedback, loading } = useContext(FeedbackContext)

  if (!loading && (!feedback || feedback.length === 0)) {
    return <p>No feedback yet.</p>
  }

  return loading ? ( <FaSpinner className='spinner' style={{fontSize: '48px', display: 'block', margin: 'auto'}} /> ) : 
  ( 
    <div className='feedback-list'>
      <AnimatePresence>
        {feedback.map((item) => (
          <motion.div
            key={item.id}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
          >
            <FeedbackItem key={item.id} item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )

  // return (
  //   <div className='feedback-list'>
  //     {feedback.map((item) => (
  //       <FeedbackItem key={item.id} item={item} handleDelete={handleDelete}/>
  //     ))}
  //   </div>
  // )
}

export default FeedbackList