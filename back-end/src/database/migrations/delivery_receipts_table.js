const createDeliveryReceiptsTable = `
    CREATE TABLE IF NOT EXISTS delivery_receipt(
        delivery_receipt_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        transaction_id UUID REFERENCES transactions(transaction_id),
        uploaded_by UUID REFERENCES users(user_id),
        delivery_services VARCHAR(255) NOT NULL,
        tracking_number VARCHAR(255),
        file_path VARCHAR(255)
    )
`;

module.exports = createDeliveryReceiptsTable;
