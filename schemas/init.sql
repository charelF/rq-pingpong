DROP TABLE IF EXISTS games;  -- this one first due to foreign key constraints
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(20) PRIMARY KEY
);
CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    winner VARCHAR(20) NOT NULL,
    loser VARCHAR(20) NOT NULL,
    dt datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (winner) REFERENCES users(username),
    FOREIGN KEY (loser) REFERENCES users(username)
);



