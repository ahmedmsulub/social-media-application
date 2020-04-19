import React, { useContext } from 'react';
import { ThemeContext } from '../themeContext/ThemeContext'
import { firebase, auth, db } from '../../firebase'
import { Link } from 'react-router-dom'
import styles from './registerUser.module.css'
import { useForm } from 'react-hook-form'


const RegistertUser = (props) => {
    const store = useContext(ThemeContext);
    const { register, errors, handleSubmit } = useForm()

    const registerNewUser = (data) => {
        db.collection('Users').add({
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username,
            password: data.password,
        });
        store.user.set(true);
    }

    return (
        <div className={styles.registerUser} style={{ background: store.mainTheme.get, color: store.color.get }}>
            <p>Register new user</p>
            <form name="form" onSubmit={handleSubmit(registerNewUser)} >
                <div >
                    <label htmlFor="firstname">First Name:</label>
                    <input ref={register({ required: true, minLength: 4 })} placeholder="You'r First Name Here" type="text" name="firstname" />
                    {errors.firstname && <p className={styles.errors}>First name is required</p>}
                </div>
                <div>
                    <label htmlFor="lastname">Last Name:</label>
                    <input ref={register({ required: true, minLength: 4 })} placeholder="You'r Last Name Here" type="text" name="lastname" />
                    {errors.lastname && <p className={styles.errors}> Last name is required</p>}
                </div>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input ref={register({ required: true, minLength: 6 })} placeholder="You'r User Name Here" type="text" name="username" />
                    {errors.username && <p className={styles.errors}> User name is required</p>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input ref={register({ required: true, minLength: 6 })} placeholder="You'r Password Here" type="password" name="password" />
                    {errors.password && <p className={styles.errors}> Password is required</p>}
                </div>
                <div >
                    <button type="submit" >Register</button>
                    <Link to={LoginComponent => ({ ...LoginComponent, pathname: "/login" })} >Cancel</Link>
                </div>
            </form>
        </div >
    )
}



export default RegistertUser;

