export interface User {
    id: string,
    username: string,
}

export interface Modpack {
    id: string,
    name: string,
    description: string,
    image: string,
    loader: string,
    inherits: string,
    version: string,
    creator: string,
    created: string,
    updated: string,
}

export interface MinecraftAccount {
    email: string,
    access_token: string,
    username: string,
    uuid: string,
    client_id: string,
    refresh_token: string,
    app_id: string,
    redirect_uri: string,
    xuid: string,
}
