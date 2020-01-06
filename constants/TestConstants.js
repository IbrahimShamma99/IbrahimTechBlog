const TestRoutes = {
    Register: 'api/register',
    Login: 'api/login',
    AddArticle: 'api/article'

};
const ValidUser = {
    user: {
        username: "Ibrahim",
        email: "i.abushammah@gmail.com",
        password: "Password$1234",
        age: 21,
        contacts: {
            PhoneNumber: "+962799547633",
            LinkedInAccount: "",
            FacebookAccount: "",
            InstegramAccount: ""
        }
    }
};
const MistakenlyWrittenValidUser = {
    user: {
        username: "Ibrahim",
        email: "i.abushammah@gmail.com",
        password: "Password$12345",
        age: 21,
        contacts: {
            PhoneNumber: "+962799547633",
            LinkedInAccount: "",
            FacebookAccount: "",
            InstegramAccount: ""
        }
    }
};

const NotValidUser = {
    user: {
        email: "mrJaws@gmail",
        password: "Password$1234",
        age: 21
    }
};

module.exports = {
    TestRoutes,
    ValidUser,
    MistakenlyWrittenValidUser,
    NotValidUser
};