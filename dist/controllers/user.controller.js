const getUserData = (req, res) => {
    return res.render("user/userList.ejs");
};
const getCreateUserForm = (req, res) => {
    return res.render("user/createUser.ejs");
};
const createUser = (req, res) => {
    const { name, email, age } = req.body;
    console.log("Check data", req.body);
    return res.redirect("/users");
};
export { getUserData, createUser, getCreateUserForm };
//# sourceMappingURL=user.controller.js.map