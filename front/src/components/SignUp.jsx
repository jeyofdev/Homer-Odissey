import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
        passwordVerif: '',
        name: '',
        lastname: '',
    });
    const [flash, setFlash] = useState({
        success: '',
        error: '',
    });
    const [formisSubmit, setFormIsSubmit] = useState(false);

    const updateEmailField = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post('/auth/signup', user)
            .then((response) => response.data)
            .then(
                (res) => setFlash({ ...flash, success: res.flash }),
                (err) =>
                    setFlash({ ...flash, success: '', error: 'Ooops, problem' })
            );

        setFormIsSubmit(true);
    };

    return (
        <div>
            <code>{JSON.stringify(user, 1, 1)}</code>
            {formisSubmit &&
                (flash.success ? (
                    <p className="alert alert-success">{flash.success}</p>
                ) : (
                    <p className="alert alert-danger">{flash.error}</p>
                ))}

            <p></p>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="email"
                    name="email"
                    onChange={(e) => updateEmailField(e)}
                />
                <input
                    type="password"
                    name="password"
                    onChange={(e) => updateEmailField(e)}
                />
                <input type="passwordVerif" name="passwordVerif" />
                <input
                    type="text"
                    name="name"
                    onChange={(e) => updateEmailField(e)}
                />
                <input
                    type="text"
                    name="lastname"
                    onChange={(e) => updateEmailField(e)}
                />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default SignUp;
