const createTransferReceiptTable = `
    CREATE TABLE IF NOT EXISTS payment_receipt(
        transfer_receipt_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        transaction_id UUID REFERENCES transactions(transaction_id),
        uploaded_by UUID REFERENCES users(user_id),
        payment_amount NUMERIC NOT NULL,
        payment_method VARCHAR(255) NOT NULL,
        file_path VARCHAR(255) NOT NULL
    )
`;

module.exports = createTransferReceiptTable;
