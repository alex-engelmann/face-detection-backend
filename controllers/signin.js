const handleSignIn = (req, res, pgDatabase, bcrypt, saltRounds) => {
    const { email, password } = req.body;
    //prevents bad user sign in
    if (!email || !password){
        return res.status(400).json('incorrect form submission');
    }

    pgDatabase.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid){
            return pgDatabase.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
            
        } else {
            res.status(400).json('wrong credentials')
        }
    })
    .catch(err => res.status(400).json('wrong credentials'))

}

module.exports = {
    handleSignIn: handleSignIn
}