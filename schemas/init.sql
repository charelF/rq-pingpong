-- DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    username varchar(20) PRIMARY KEY
);

DROP TABLE IF EXISTS games;
CREATE TABLE IF NOT EXISTS games (
    winner varchar(20) NOT NULL,
    loser varchar(20) NOT NULL,
    datetime datetime DEFAULT (datetime('now')),
    FOREIGN KEY (winner) REFERENCES users(username),
    FOREIGN KEY (loser) REFERENCES users(username)
);



