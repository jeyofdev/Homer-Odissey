import React, { useState } from 'react';

const SignUp = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
        passwordVerif: '',
        name: '',
        lastname: '',
    });

    const updateEmailField = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
    };

    return (
        <div>
            <h1>{JSON.stringify(user, 1, 1)}</h1>
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
