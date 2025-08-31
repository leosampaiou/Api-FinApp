CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'transactions_type') THEN
        CREATE TYPE transactions_type AS ENUM ('EARNING', 'EXPENSE', 'INVESTMENT');
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, 
    name VARCHAR(100) NOT NULL,
    transaction_date DATE NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    type transactions_type NOT NULL
);
