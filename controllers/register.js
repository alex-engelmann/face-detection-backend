function validateEmail(email) 
{
    //this regex accepts unicode email addresses, 
    //but is relatively lax (not RFC2822 compliant)
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
    return re.test(email);
}

const handleRegister = (req, res, pgDatabase, bcrypt, saltRounds) => {
    //prevents bad user info from registering
    const { email, name, password } = req.body;
    if (!email || !name || !password){
        return res.status(400).json('incorrect form submission');
    }
    if (!validateEmail(email)) {
        return res.status(400).json('invalid email address');
    }

    const hash = bcrypt.hashSync(password, saltRounds)
    pgDatabase.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0])
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('unable to register'))

}

module.exports = {
    handleRegister: handleRegister
}