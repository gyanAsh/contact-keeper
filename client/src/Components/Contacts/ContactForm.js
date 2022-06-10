import React,{useState,useContext,useEffect} from 'react'
import ContactContext from '../../Context/Contact/ContactContext';
const ContactForm = () => {

    const contactContext = useContext(ContactContext);
    const {current,clearCurrent} = contactContext;

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type:'personal'
    });

    useEffect(() => {
        if (current != null) {
          setContact(current)
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type:'personal'
            })
        }
        // eslint-disable-next-line
    }, [contactContext,current])

    const { name, email, phone, type } = contact;
    const onChange = e => setContact({
        ...contact,
        [e.target.name]:e.target.value
    })

    const clearAll = () => {
        clearCurrent();
    }

    const onSubmit = e => {
        e.preventDefault();
        if (current == null) {
            contactContext.addContact(contact);
        }
        else {
            contactContext.updateContact(contact);
        }
        clearAll();
    }
  return (
      <form onSubmit={onSubmit}>
          <h2 className="text-primary">{current ? "Edit Contact":"Add Contact"}</h2>
          <input
              type='text'
              placeholder="Enter Name"
              name='name'
              value={name}
              onChange={onChange} />
          <input
              type='email'
              placeholder="Enter Email"
              name='email'
              value={email}
              onChange={onChange} />
          <input
              type='text'
              placeholder="Enter Phone No."
              value={phone}
              name='phone'
              onChange={onChange} />
          <h5>Contact Type</h5>
          <label >
          <input id="personal" type="radio" name="type" value='personal' checked={type === 'personal'} onChange={onChange} />
          {' '}Personal{'   '}
          </label>
          <label>
          <input  type="radio" name="type" value='professional' checked={type === 'professional'} onChange={onChange} />
          {' '}Professional{' '}
          </label>
          <div>
              <input type='submit' value={current ?"Update Contact":"Add Contact"}
              className="btn btn-primary btn-block"/>
          </div>
          {
              current && (
                  <div>
                      <button className='btn btn-light btn-block' onClick={clearAll}>
                          Clear
                      </button>
                  </div>
              )
          }
    </form>
  )
}

export default ContactForm