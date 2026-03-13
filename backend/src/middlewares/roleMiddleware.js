function roleMiddleware(rolesPermitidas) {

  return (req, res, next) => {

    const userRole = req.user.role

    if (!rolesPermitidas.includes(userRole)) {
      return res.status(403).json({
        message: "Acesso negado"
      })
    }

    next()

  }

}

module.exports = roleMiddleware