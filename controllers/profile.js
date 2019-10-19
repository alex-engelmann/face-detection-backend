const handleProfileGet = (req, res, pgDatabase) => {
    const { id } = req.params;

    pgDatabase.select('*').from('users').where({
        id: id
    })
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('not found')
            }

        })
        .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
    handleProfileGet: handleProfileGet
}