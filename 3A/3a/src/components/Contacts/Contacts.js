import React, { useEffect, useState, useContext } from 'react'
import { firebase, db, auth } from '../../firebase'
import styles from './contacts.module.css'
import { Link, useHistory } from 'react-router-dom'
import { ThemeContext } from '../themeContext/ThemeContext'


const Contacts = () => {
    const [contacts, setContacts] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    let filteredContact = Object.keys(contacts).map((key) => contacts[key]);
    const history = useHistory()
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };
    const people = filteredContact.map((contact) => {
        return contact.username
    })

    useEffect(() => {
        db.collection('Users')
            .get()
            .then(snapshot => {
                const users = []
                snapshot.forEach(doc => {
                    const data = doc.data()
                    users.push(data)
                })
                setContacts(users)
            })
            .catch(error => console.log(error))
    }, []);

    useEffect(() => {
        const results = people.filter(contact =>
            contact.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [searchTerm]);
    const startMsg = () => {
        history.push('/message')
        console.log('Adnaaaaaaan')
    }
    return (
        <div className={styles.contacts}>
            <h3>Search User</h3>
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
            />

            {searchTerm ? searchResults.map(item => (
                <h4 onClick={startMsg} className={styles.search}> {item}</h4>
            )) : null}

            {!searchTerm ? contacts.map((contact) => {
                return <h4 onClick={startMsg} >{contact.username}</h4>
            }) : null}
        </div>
    )
}
export default Contacts