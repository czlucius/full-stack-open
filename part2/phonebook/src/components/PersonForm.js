
const PersonForm = ({newName, onNameChange, newPhone, onPhoneChange, submitForm}) => (<form>
        <div>
          name: <input value={newName} onChange={onNameChange} />
        </div>
        <div>phone: <input value={newPhone} onChange={onPhoneChange} type="tel"/></div>

        <div>
          <button type="submit" onClick={submitForm}>add</button>
        </div>
      </form>
                                                                          )



                                                                      
export default PersonForm

