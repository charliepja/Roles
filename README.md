# Roles

Roles is a Discord bot using JavaScript, Node.JS, Discord.JS, and SQLite. The purpose of this bot is to allow users to simply write out the name of the role they in a pre-determined channel. To avoid users accessing roles that they shouldn't, all roles must first be added to the system.


# Getting Started

To obtain a copy of this project on your local machine simply clone this repository with your preferred method. More details of this can be found [Here](https://docs.github.com/en/github/using-git/which-remote-url-should-i-use)

## Prerequisites

In order to run this project you will need to have the following software:

```

node v12.x.x

npm v6.x.x

Both can be obtained by downloading node [here](https://nodejs.org/en/download/)

```
To check what version of the software you are running, run `node -v` and `npm -v` in your chosen terminal.

## Installing

After installing node and npm, navigate to your project folder in your terminal.

To install all the npm modules run:

```
npm install

```

To create a `.env` file:

```
Create a new file at the root of your project directory called .env

Copy the keys from .env_example

```

## Deployment

First create a bot application at https://discord.com/developers/applications/

Click `New Application` and give your application a name of your choosing, then press `create`

That will take you to the general information page of your new application, on the left hand side press `Bot` then `Add Bot`

Here you can give your bot application a different username or a profile picture, however the important part is the `bot token`

Click `Copy` which is located under `Token` and paste that value into `TOKEN` that is located in the `.env` file. It is important that this is never shared with anyone.

Then on the left hand side click `OAuth2`, and under `scopes` check `bot` under `bot permissions` you can choose which permissions you require a bot to have in a guild for it to function. The minimum that Roles will require to work is `View Channels`, `Send Messages`, `Read Message History`, and `Manage Roles`.

Then under `scopes` copy the url and proceed to that url where you can select which guild you wish the bot to join. Press `continue` and then `Authorize`

The bot is now added to the guild, and the next thing to do is bring the bot online.

For the bot to stay on 24/7 it is recommended to use a VPS or a Dedicated Server, otherwise your local machine will need to stay on 24/7.

To bring the bot online on your local machine you can simply run the following command in your terminal `npm run bot` or use a process manager of your choice.

## Usage

The default prefix for the bot is `!` and to change this, you could need to use the `setting` command, e.g. `!setting set prefix ?`

The setting command is used to view, set or update the prefix or role channel. When setting the role channel using the command, it needs to be called `role_channel` i.e `!setting set role_channel <channel_id>` and the channel id must be supplied for it to work.

The role command allows you to add a self-assignable role that users can give themselves. This also has the options of view, set, or update, and when using the command, you must use the role's name i.e `!role view Crew`

For users to add the role, they need to type out the role in the channel that has been defined as the role channel. If either the role channel has not been defined, or the role has not been set as self-assignable, then users will not be able to add the role.

## Built With

* discord.js
* better-sqlite3

## Contributing

All contributes are welcome, this is an open source project and contributing guidelines will follow

## Author

* Charlie Anderson

## License

This project is licensed under GNU GPLv3 --- See LICENSE.md for more details
