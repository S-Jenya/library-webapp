export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user.jwt)

    if (user && user.jwt) {
        return {
            Authorization: 'Bearer ' + user.jwt
        };
    } else {
        return {};
    }
}
