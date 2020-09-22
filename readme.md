# What is this?
This is a reworked UI made in Electron of a tool used by game administrators.
## Why?
The official one was made back in 2006 and has many flaws that nobody is ever going to fix. Plus some simple features were missing.
## Screenshots
### Main window
![The main window](https://github.com/JVancata/gm-tool/blob/master/screenshots/main_window.png?raw=true)  
Window used to log in user, open other sub-windows and select community from config.
### Teleport window
![Teleport window](https://github.com/JVancata/gm-tool/blob/master/screenshots/teleport.png?raw=true)  
This is the main reason this whole project was made. This window allows admin to teleport a bunch of users at once. The game servers are being loaded right from the game server and teleport locations can be edited in the config.
### Message window
![Message window](https://github.com/JVancata/gm-tool/blob/master/screenshots/message.png?raw=true)  
Writing a private message to one or more users at once.
### Kick window
![Kick window](https://github.com/JVancata/gm-tool/blob/master/screenshots/kick.png?raw=true)  
Kick one or more users at once.
### Chat ban window
![Chat ban window](https://github.com/JVancata/gm-tool/blob/master/screenshots/chat_ban.png?raw=true)  
Muting users for a period of time (in minutes).
## Can I run it?
This repository contains only the electron user interface, it won't work without the TCP library that connects to the game server. It is not currently public yet. So the answer is no unless you write your own packet library.
## Commit history
The original commit history is unfortunately private due to the fact that it contained a lot of hard-coded personal information.
## Todo
Announce and monster spawn features are still missing.  
Reduce the bundle size