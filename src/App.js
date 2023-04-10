import { NavBar, NoteUICollection, CreateNote, UpdateNote } from './ui-components'
import { useState } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
//import { DataStore } from 'aws-amplify'

function App({ signOut }) {
  // returns current state and function to change state
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [updateNote, setUpdateNote] = useState()
  return (
    <>
      <NavBar 
        width="100%" marginBottom='20px'
        overrides={{
          // set showCreateModal to true, then display CreateNote if haven't already
          Button31632483: { onClick: () => setShowCreateModal(true)},
          Button31632487: { 
            onClick: async () => { 
              //await DataStore.clear()
              signOut()
            }
          }
        }} 
      />
      <div className='container'>
        <NoteUICollection overrideItems={({item, idx}) => {
          return {
            overrides: {
              EditButton: {
                //as : 'button',
                // when 'edit' botton clicked, display UpdateNote modal and set 
                // note instance to update
                onClick: () => {
                  setShowUpdateModal(true)
                  setUpdateNote(item)
                }
              }
            }
          }
        }}
        />
      </div>
      <div className='modal' style={{display: showCreateModal === false && 'none'}} >
        <CreateNote overrides={{
          MyIcon: {
            as: 'button',
            // when X icon clicked, hide CreateNote modal
            onClick: () => setShowCreateModal(false)
          }
        }}
        />
      </div>
      <div className='modal' style={{display: showUpdateModal === false && 'none'}}>
        <UpdateNote 
          note={updateNote} overrides={{
            MyIcon: {
              as: 'button',
              // when X icon clicked, hide UpdateNote modal
              onClick: () => setShowUpdateModal(false)
            }
          }}
        />
      </div>
    </>
  );
}

export default withAuthenticator(App);
