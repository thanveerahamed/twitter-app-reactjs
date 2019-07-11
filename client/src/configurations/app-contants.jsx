export const Credentials = {
    ConsumerKey : "sMabYF455xkfUa5jDrjI6HzOK",
    ConsumerSecret: "JVbcVVHTlYtlMpn9YKEHrh6xppi10P88BN0ur86gjI7PRUQP50",
    Token: "1148477272233353216-g7fzIHxvZWWcXYDVlqZ9kGgedgFreS",
    TokenSecret: "VvMRrASU8gxYBaJJvk2T3CAyqENgJ5BKrHwaTBK0pK3Fk",
    BasicAuthCode: "c01hYllGNDU1eGtmVWE1akRyakk2SHpPSzpKVmJjVlZIVGxZdGxNcG45WUtFSHJoNnhwcGkxMFA4OEJOMHVyODZnakk3UFJVUVA1MA=="
}

const hostname = "http://localhost:4000/"

export const AppUrls = {
    User: hostname + "api/user",
    Dashboard: hostname + "api/dashboard",
    Favorite: hostname + "api/like",
    Retweet: hostname + "api/retweet",
    Search: hostname + "api/search"
}

export const ReduxActions = {
    GET_TOKEN_SUCCESS: "GET_TOKEN_SUCCESS"
}